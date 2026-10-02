import { useState } from "react";
import { useTranslation } from "react-i18next";
import { nextRotation } from "../lib/nextRotation";
import { pickPrize } from "../lib/pickPrize";
import type { Prize } from "../types";
import "./Wheel.css";

interface WheelProps {
  prizes: Prize[];
  colors: string[];
  onWin: (prize: Prize) => void;
}

export const Wheel = ({ prizes, colors, onWin }: WheelProps) => {
  const { t } = useTranslation();
  const [rotation, setRotation] = useState(0);
  const [pending, setPending] = useState<Prize | null>(null);
  const available = prizes.filter((prize) => prize.quantity > 0);
  const sliceAngle = 360 / available.length;
  const spinning = pending !== null;

  const sliceColor = (index: number) => {
    const isLast = index === available.length - 1;
    if (isLast && index > 0 && index % colors.length === 0) return colors[1];
    return colors[index % colors.length];
  };

  const slices = available
    .map((_, index) => {
      const start = index * sliceAngle;
      return `${sliceColor(index)} ${start}deg ${start + sliceAngle}deg`;
    })
    .join(", ");

  const spin = () => {
    if (spinning || available.length === 0) return;

    const winner = pickPrize(available);
    const index = available.indexOf(winner);

    setRotation(nextRotation(rotation, index, sliceAngle));
    setPending(winner);
  };

  const handleSpinEnd = () => {
    if (!pending) return;
    onWin(pending);
    setPending(null);
  };

  return (
    <section className="wheel-section">
      <div className="wheel-frame">
        <div className="wheel-pointer" aria-hidden="true" />

        <div
          className="wheel"
          style={{
            background: `conic-gradient(from ${-sliceAngle / 2}deg, ${slices})`,
            transform: `rotate(${rotation}deg)`,
          }}
          onTransitionEnd={handleSpinEnd}
        >
          {available.map((prize, index) => (
            <div
              key={prize.id}
              className="wheel-label"
              style={{ transform: `rotate(${index * sliceAngle}deg)` }}
            >
              <img src={prize.image} alt="" />
              <span>{t(`prizes.${prize.id}`, prize.name)}</span>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="wheel-button"
          onClick={spin}
          disabled={spinning || available.length === 0}
        >
          {t("wheel.spin")}
        </button>
      </div>

      <p aria-live="polite">
        {available.length === 0
          ? t("wheel.allClaimed")
          : spinning
            ? t("wheel.spinning")
            : t("wheel.instruction")}
      </p>
    </section>
  );
};

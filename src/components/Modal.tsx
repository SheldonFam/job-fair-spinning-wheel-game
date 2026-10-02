import { useEffect } from "react";
import confetti from "canvas-confetti";
import { useTranslation } from "react-i18next";
import type { Prize, Tier } from "../types";
import "./Modal.css";

const CONFETTI: Record<Tier, confetti.Options> = {
  grand: { particleCount: 300, spread: 160, colors: ["#FFB800", "#FFFFFF"] },
  second: { particleCount: 120, spread: 90, colors: ["#9CC3FF", "#C9D1E0"] },
  consolation: {
    particleCount: 30,
    spread: 360,
    shapes: ["star"],
    colors: ["#5EE6C9"],
  },
};

interface ModalProps {
  prize: Prize | null;
  onClose: () => void;
}

export const Modal = ({ prize, onClose }: ModalProps) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (!prize) return;

    confetti({
      ...CONFETTI[prize.tier],
      zIndex: 1100,
      disableForReducedMotion: true,
    });

    return () => {
      confetti.reset();
    };
  }, [prize]);

  useEffect(() => {
    if (!prize) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prize, onClose]);

  if (!prize) return;

  return (
    <div className="modal-overlay">
      <div
        className={`modal-card modal-card--${prize.tier}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <h2 id="modal-title">{t(`modal.headline.${prize.tier}`)}</h2>
        <img src={prize.image} alt="" width={120} height={120} />
        <p>{t("modal.youWon")}</p>
        <p className="modal-prize-name">
          {t(`prizes.${prize.id}`, prize.name)}
        </p>
        <p>{t("modal.collect")}</p>

        <div className="modal-actions">
          <button type="button" onClick={onClose}>
            {t("modal.playAgain")}
          </button>
          <button type="button" onClick={onClose}>
            {t("modal.close")}
          </button>
        </div>
      </div>
    </div>
  );
};

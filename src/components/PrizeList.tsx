import { useTranslation } from "react-i18next";
import type { Prize } from "../types";
import "./PrizeList.css";

const LOW_STOCK = 3;

interface PrizeListProps {
  prizes: Prize[];
}

export const PrizeList = ({ prizes }: PrizeListProps) => {
  const { t } = useTranslation();
  const totalLeft = prizes.reduce((sum, prize) => sum + prize.quantity, 0);

  return (
    <aside className="prize-container">
      <div className="prize-header">
        <h2>{t("prizeList.title")}</h2>
        <p>{t("prizeList.prizesLeft", { count: totalLeft })}</p>
      </div>

      <ul className="prize-list">
        {prizes.map((prize) => {
          const soldOut = prize.quantity <= 0;
          const almostGone = !soldOut && prize.quantity <= LOW_STOCK;

          return (
            <li
              key={prize.id}
              className={
                soldOut ? "prize-item prize-item--sold-out" : "prize-item"
              }
            >
              <img className="prize-image" src={prize.image} alt="" />

              <div className="prize-info">
                <p className="prize-name">
                  {t(`prizes.${prize.id}`, prize.name)}
                </p>
                <p className={`prize-tier prize-tier--${prize.tier}`}>
                  {t(`tier.${prize.tier}`)}
                </p>
              </div>

              <div
                className={
                  almostGone ? "prize-stock prize-stock--low" : "prize-stock"
                }
              >
                <p>
                  {soldOut
                    ? t("prizeList.outOfStock")
                    : t("prizeList.left", { count: prize.quantity })}
                </p>
                {almostGone && <p>{t("prizeList.almostGone")}</p>}
              </div>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

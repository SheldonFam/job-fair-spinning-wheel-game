import { useEffect, useState } from "react";
import "./App.css";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Modal } from "./components/Modal";
import { PrizeList } from "./components/PrizeList";
import { Wheel } from "./components/Wheel";
import type { GameConfig, Prize } from "./types";

const App = () => {
  const [config, setConfig] = useState<GameConfig | null>(null);
  const [prizes, setPrizes] = useState<Prize[]>([]);
  const [winner, setWinner] = useState<Prize | null>(null);

  useEffect(() => {
    fetch("/data/prizes.json")
      .then((response) => response.json())
      .then((data: GameConfig) => {
        setConfig(data);
        const saved = localStorage.getItem("prizes");
        setPrizes(saved ? JSON.parse(saved) : data.prizes);
        document.documentElement.style.setProperty("--gold", data.theme.gold);
      });
  }, []);

  const handleWin = (prize: Prize) => {
    const updated = prizes.map((item) =>
      item.id === prize.id ? { ...item, quantity: item.quantity - 1 } : item,
    );

    setPrizes(updated);
    localStorage.setItem("prizes", JSON.stringify(updated));
    setWinner(prize);
  };

  return (
    <>
      <Header title={config?.event.title || "Spin & Win"} />

      {config && (
        <main className="App-main">
          <Wheel
            prizes={prizes}
            colors={config.theme.sliceColors}
            onWin={handleWin}
          />
          <PrizeList prizes={prizes} />
        </main>
      )}

      <Footer />

      <Modal prize={winner} onClose={() => setWinner(null)} />
    </>
  );
};

export default App;

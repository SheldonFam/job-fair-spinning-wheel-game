import { useTranslation } from "react-i18next";
import type { Lang } from "../types";

const LANGUAGES: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "ms", label: "BM" },
  { code: "zh", label: "中文" },
];

export const Header = ({ title }: { title: string }) => {
  const { t, i18n } = useTranslation();

  return (
    <header className="App-header">
      <div className="App-header-left">
        <div>
          <h1>{title}</h1>
          <p>{t("header.subtitle")}</p>
        </div>
      </div>

      <nav className="App-header-right" aria-label="Language">
        {LANGUAGES.map((language) => (
          <button
            key={language.code}
            type="button"
            aria-pressed={i18n.language === language.code}
            onClick={() => i18n.changeLanguage(language.code)}
          >
            {language.label}
          </button>
        ))}
      </nav>
    </header>
  );
};

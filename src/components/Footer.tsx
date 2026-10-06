import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="App-footer">
      <p>{t("footer.rules")}</p>
      <p>{t("footer.copyright")}</p>
    </footer>
  );
};

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enGB from "./src/i18n/enGB";
import ptPT from "./src/i18n/ptPT";

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		debug: true,
		fallbackLng: "en-GB",
		interpolation: {
			escapeValue: false,
		},
		resources: {
			"en-GB": enGB,
			"pt-PT": ptPT,
		},
	});

export default i18n;

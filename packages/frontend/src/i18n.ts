import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import ptPT from "./i18n/ptPT.json";
import enGB from "./i18n/enGB.json";

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
			"en-GB": { translation: enGB },
			"pt-PT": { translation: ptPT },
		},
	});

export default i18n;

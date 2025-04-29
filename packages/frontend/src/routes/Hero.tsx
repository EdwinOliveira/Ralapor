import { useTranslation } from "react-i18next";

const Hero = () => {
	const { t } = useTranslation();

	return t("greeting");
};

export default Hero;

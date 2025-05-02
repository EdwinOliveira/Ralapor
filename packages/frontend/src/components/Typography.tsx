import "./Typography.css";
import { useTranslation } from "react-i18next";

export type TypographyProps = {
	content: string;
	segment: string;
};

const Typography: React.FC<TypographyProps> = ({ content, segment }) => {
	const { t } = useTranslation();

	return <span className={segment}>{t(content)}</span>;
};

export default Typography;

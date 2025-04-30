import "./Typography.css";
import { useTranslation } from "react-i18next";

type TypographySegment = "header" | "sub-header" | "paragraph" | "label";

export type TypographyProps = {
	content: string;
	segment: TypographySegment;
};

const Typography: React.FC<TypographyProps> = ({ content, segment }) => {
	const { t } = useTranslation();

	return <span className={segment}>{t(content)}</span>;
};

export default Typography;

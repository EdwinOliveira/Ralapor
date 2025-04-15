import "./Typography.css";

export type TypographySegment =
	| "form-header"
	| "group-header"
	| "button"
	| "link";

export type TypographyColor = "default" | "default-inverse";

export type TypographyProps = {
	content: string;
	segment: TypographySegment;
	color: TypographyColor;
};

const Typography: React.FC<TypographyProps> = ({ content, segment, color }) => {
	return <span className={`${segment} ${color}`}>{content}</span>;
};

export default Typography;

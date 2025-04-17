import "./Typography.css";

export type TypographySegment =
	| "form-header"
	| "group-header"
	| "header"
	| "button"
	| "link"
	| "text";

export type TypographyColor = "default" | "default-inverse";

export type TypographyProps = {
	content: string;
	segment: TypographySegment;
	color: TypographyColor;
};

const Typography: React.FC<TypographyProps> = ({ content, segment, color }) => {
	return (
		<label htmlFor={content} className={`${segment} ${color}`}>
			{content}
		</label>
	);
};

export default Typography;

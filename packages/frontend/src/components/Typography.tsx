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

export default function Typography({
	content,
	segment,
	color,
}: TypographyProps) {
	return <span className={`${segment} ${color}`}>{content}</span>;
}

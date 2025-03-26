import "./Typography.css";

export type TypographySegment = "brand" | "button";
export type TypographyColor = "brand-primary" | "brand-secondary" | "default";

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

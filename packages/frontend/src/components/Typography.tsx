import "./Typography.css";

type TypographyProps = {
	content: string;
	segment: "brand";
	color: "brand-primary" | "brand-secondary";
};

export default function Typography({
	content,
	segment,
	color,
}: TypographyProps) {
	return <span className={`${segment} ${color}`}>{content}</span>;
}

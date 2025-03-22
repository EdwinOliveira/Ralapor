import "./Typography.css";

export type TypographyProps = {
	text: string;
	segment: "brand" | "sub-brand" | "button";
};

export default function Typography({ text, segment }: TypographyProps) {
	return <span className={segment}>{text}</span>;
}

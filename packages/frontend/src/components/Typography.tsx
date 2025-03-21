import "./Typography.css";

export type TypographyProps = {
	content: string;
	segment:
		| "header"
		| "sub-header"
		| "designation"
		| "description"
		| "button"
		| "link";
};

export default function Typography({ content, segment }: TypographyProps) {
	return <span className={segment}>{content}</span>;
}

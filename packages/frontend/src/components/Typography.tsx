import "./Typography.css";

export type TypographyProps = {
	content: string;
	signature: "brand" | "header" | "subheader" | "label" | "paragraph";
};

export default function Typography({ content, signature }: TypographyProps) {
	return (
		<>
			<p id="typography" className={signature}>
				{content}
			</p>
		</>
	);
}

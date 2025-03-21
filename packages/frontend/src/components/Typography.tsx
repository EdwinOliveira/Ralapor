import "./Typography.css";

export type TypographyProps = {
	text: string;
	segment: "brand";
};

export default function Typography({ text, segment }: TypographyProps) {
	return (
		<span id="typography" className={segment}>
			{text}
		</span>
	);
}

import Typography from "./Typography";

export type FormParagraphProps = {
	content: string;
};

export default function FormParagraph({ content }: FormParagraphProps) {
	return (
		<>
			<Typography content={content} signature="paragraph" />
		</>
	);
}

import Typography from "./Typography";

export type FormLabelProps = {
	content: string;
};

export default function FormLabel({ content }: FormLabelProps) {
	return (
		<>
			<Typography content={content} signature="label" />
		</>
	);
}

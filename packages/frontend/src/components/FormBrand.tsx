import Typography from "./Typography";

export type FormBrandProps = {
	content: string;
};

export default function FormBrand({ content }: FormBrandProps) {
	return (
		<>
			<div id="form-header">
				<Typography content={content} signature="brand" />
			</div>
		</>
	);
}

import FormInput, { type FormInputProps } from "./FormInput";
import type { FormParagraphProps } from "./FormParagraph";
import FormParagraph from "./FormParagraph";

export type FormControlProps = {
	formParagraph: FormParagraphProps;
	formInput: FormInputProps;
};

export default function FormControl({
	formParagraph,
	formInput,
}: FormControlProps) {
	return (
		<>
			<FormParagraph content={formParagraph.content} />
			<FormInput placeholder={formInput.placeholder} type={formInput.type} />
		</>
	);
}

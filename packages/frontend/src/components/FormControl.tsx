import FormInput, { type FormInputProps } from "./FormInput";
import type { FormParagraphProps } from "./FormParagraph";
import FormParagraph from "./FormParagraph";
import "./FormControl.css";

export type FormControlProps = {
	id?: number;
	formParagraph: FormParagraphProps;
	formInput: FormInputProps;
};

export default function FormControl({
	formParagraph,
	formInput,
}: FormControlProps) {
	return (
		<>
			<div id="form-control">
				<FormParagraph content={formParagraph.content} />
				<FormInput placeholder={formInput.placeholder} type={formInput.type} />
			</div>
		</>
	);
}

import FormControl, { type FormControlProps } from "./FormControl";
import FormLabel, { type FormLabelProps } from "./FormLabel";

export type FormGroupProps = {
	id?: string;
	formLabel: FormLabelProps;
	formControl: FormControlProps;
};

export default function FormGroup({ formLabel, formControl }: FormGroupProps) {
	return (
		<>
			<FormLabel content={formLabel.content} />
			<FormControl
				formParagraph={formControl.formParagraph}
				formInput={formControl.formInput}
			/>
		</>
	);
}

import "./FormGroup.css";
import FormControl, { type FormControlProps } from "./FormControl";
import FormLabel, { type FormLabelProps } from "./FormLabel";

export type FormGroupProps = {
	id?: number;
	formLabel: FormLabelProps;
	formControls: Array<FormControlProps>;
};

export default function FormGroup({ formLabel, formControls }: FormGroupProps) {
	return (
		<>
			<div id="form-group">
				<FormLabel content={formLabel.content} />
				{formControls.map((formControl) => (
					<FormControl
						key={formControl.id}
						formParagraph={formControl.formParagraph}
						formInput={formControl.formInput}
					/>
				))}
			</div>
		</>
	);
}

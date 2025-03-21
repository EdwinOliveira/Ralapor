import "./FormGroup.css";
import FormControl, { type FormControlProps } from "./FormControl";
import Typography from "./Typography";

export type FormGroupProps = {
	id?: number;
	field: string;
	content: string;
	formControls: Array<FormControlProps>;
};

export default function FormGroup({
	field,
	content,
	formControls,
}: FormGroupProps) {
	return (
		<div id={`form-group_${field}`}>
			<Typography content={content} segment="designation" />
			<div id="form-group_controls">
				{formControls.map((formControl) => (
					<FormControl key={formControl.id} {...formControl} />
				))}
			</div>
		</div>
	);
}

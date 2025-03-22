import FormControl, {
	type FormControlProps,
} from "../form-control/form-control";
import Typography from "../typography/typography";

export type FormGroupProps = {
	id?: number;
	text: string;
	formControls: Array<FormControlProps>;
};

export default function FormGroup({ text, formControls }: FormGroupProps) {
	return (
		<div id="form-group">
			<Typography text={text} segment="groupText" />
			<div id="form-group__controls">
				{formControls.map((formControl) => (
					<FormControl key={formControl.id} input={formControl.input} />
				))}
			</div>
		</div>
	);
}

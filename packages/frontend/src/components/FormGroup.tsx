import "./FormGroup.css";
import Typography, { type TypographyProps } from "./Typography";
import FormControl, { type FormControlProps } from "./FormControl";

export type FormGroupProps = {
	id: number;
	typography: TypographyProps;
	formControls: Record<string, FormControlProps>;
};

const FormGroup: React.FC<FormGroupProps> = ({ typography, formControls }) => {
	return (
		<div id="form-group">
			<Typography {...typography} />
			<div id="form-group__controls">
				{Object.values(formControls).map((formControl) => (
					<FormControl key={formControl.id} {...formControl} />
				))}
			</div>
		</div>
	);
};

export default FormGroup;

import "./FormGroup.css";

import FormControl, { type FormControlProps } from "./FormControl";
import Typography, { type TypographyProps } from "./Typography";

export type FormGroupProps = {
	id?: number;
	typography: TypographyProps;
	formControls: Array<FormControlProps>;
};

const FormGroup: React.FC<FormGroupProps> = ({ typography, formControls }) => {
	return (
		<div id="form-group">
			<Typography
				content={typography.content}
				segment={typography.segment}
				color={typography.color}
			/>
			<div id="form-controls">
				{formControls.map((formControl) => (
					<FormControl key={formControl.id} {...formControl} />
				))}
			</div>
		</div>
	);
};

export default FormGroup;

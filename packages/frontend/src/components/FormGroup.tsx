import "./FormGroup.css";
import FormInput, { type FormInputProps } from "./FormInput";
import Typography, { type TypographyProps } from "./Typography";

export type FormGroupProps = {
	id: number;
	typography: TypographyProps;
	formInputs: Record<string, FormInputProps>;
};

const FormGroup: React.FC<FormGroupProps> = ({ typography, formInputs }) => {
	return (
		<div id="form-group">
			<Typography {...typography} />
			<div id="form-group__inputs">
				{Object.values(formInputs).map((formInput) => (
					<FormInput key={formInput.id} {...formInput} />
				))}
			</div>
		</div>
	);
};

export default FormGroup;

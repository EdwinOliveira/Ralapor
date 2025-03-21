import FormInput, { type FormInputProps } from "./FormInput";
import "./FormControl.css";

export type FormControlProps = {
	id?: number;
	formInput: FormInputProps;
};

export default function FormControl({ formInput }: FormControlProps) {
	return (
		<>
			<div id="form-control">
				<FormInput placeholder={formInput.placeholder} type={formInput.type} />
			</div>
		</>
	);
}

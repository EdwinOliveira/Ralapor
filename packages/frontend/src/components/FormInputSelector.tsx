import "./FormInputSelector.css";
import FormInput, { type FormInputProps } from "./FormInput";
import FormSelector, { type FormSelectorProps } from "./FormSelector";

export type FormInputSelectorProps = {
	formInput: FormInputProps;
	formSelector: FormSelectorProps;
};

const FormInputSelector: React.FC<FormInputSelectorProps> = ({
	formInput,
	formSelector,
}) => {
	return (
		<div id="form-input-selector">
			<FormSelector {...formSelector} />
			<FormInput {...formInput} />
		</div>
	);
};

export default FormInputSelector;

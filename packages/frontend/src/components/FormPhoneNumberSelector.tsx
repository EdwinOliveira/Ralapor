import "./FormPhoneNumberSelector.css";
import FormInput, { type FormInputProps } from "./FormInput";
import FormSelector, { type FormSelectorProps } from "./FormSelector";

export type FormPhoneNumberSelectorProps = {
	formInput: FormInputProps;
	formSelector: FormSelectorProps;
};

const FormPhoneNumberSelector: React.FC<FormPhoneNumberSelectorProps> = ({
	formInput,
	formSelector,
}) => {
	return (
		<div id="form-phone-number-selector">
			<FormSelector {...formSelector} />
			<FormInput {...formInput} />
		</div>
	);
};

export default FormPhoneNumberSelector;

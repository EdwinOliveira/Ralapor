import "./FormPhoneNumberCode.css";
import FormInput, { type FormInputProps } from "./FormInput";
import FormSelector, { type FormSelectorProps } from "./FormSelector";

export type FormPhoneNumberCodeProps = {
	formInput: FormInputProps;
	formSelector: FormSelectorProps;
};

const FormPhoneNumberCode: React.FC<FormPhoneNumberCodeProps> = ({
	formInput,
	formSelector,
}) => {
	return (
		<div id="form-phone-number-code">
			<FormSelector {...formSelector} />
			<FormInput {...formInput} />
		</div>
	);
};

export default FormPhoneNumberCode;

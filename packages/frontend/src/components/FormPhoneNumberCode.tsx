import "./FormPhoneNumberCode.css";
import FormInput, { type FormInputProps } from "./formInput";
import FormSelector, { type FormSelectorProps } from "./formSelector";

export type FormPhoneNumberCodeProps = {
	formInputControl: FormInputProps;
	formSelectorControl: FormSelectorProps;
};

export default function FormPhoneNumberCode({
	formInputControl,
	formSelectorControl,
}: FormPhoneNumberCodeProps) {
	return (
		<div id="form-phone-number-code">
			<FormSelector {...formSelectorControl} />
			<FormInput {...formInputControl} />
		</div>
	);
}

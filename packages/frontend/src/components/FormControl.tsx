import FormInput, { type FormInputProps } from "./FormInput";
import FormPhoneNumberSelector from "./FormPhoneNumberCode";
import FormSelector, { type FormSelectorProps } from "./FormSelector";

export type FormControlProps = {
	id?: number;
} & (FormInputSignature | FormControlSignature | FormPhoneNumberCodeSignature);

type FormInputSignature = {
	signature: "formInput";
	formInput: FormInputProps;
};

type FormControlSignature = {
	signature: "formSelector";
	formSelector: FormSelectorProps;
};

type FormPhoneNumberCodeSignature = {
	signature: "formPhoneNumberCode";
	formInput: FormInputProps;
	formSelector: FormSelectorProps;
};

export default function FormControl(props: FormControlProps) {
	const isFormInputGuard = (
		props: FormControlProps,
	): props is FormInputSignature => props.signature === "formInput";

	const isFormSelectorGuard = (
		props: FormControlProps,
	): props is FormControlSignature => props.signature === "formSelector";

	const isFormPhoneNumberCodeGuard = (
		props: FormControlProps,
	): props is FormPhoneNumberCodeSignature =>
		props.signature === "formPhoneNumberCode";

	const dynamicComponent = () => {
		if (isFormInputGuard(props)) {
			return <FormInput {...props.formInput} />;
		}

		if (isFormSelectorGuard(props)) {
			return <FormSelector {...props.formSelector} />;
		}

		if (isFormPhoneNumberCodeGuard(props)) {
			return (
				<FormPhoneNumberSelector
					formInput={props.formInput}
					formSelector={props.formSelector}
				/>
			);
		}
	};

	return dynamicComponent();
}

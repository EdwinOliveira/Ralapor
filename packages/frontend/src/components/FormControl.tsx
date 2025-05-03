import "./FormControl.css";
import FormInput, { type FormInputProps } from "./FormInput";
import FormPhoneNumberSelector, {
	type FormPhoneNumberSelectorProps,
} from "./FormPhoneNumberSelector";
import FormSelector, { type FormSelectorProps } from "./FormSelector";

export type FormControlProps = {
	id?: number;
} & (FormControlInput | FormControlSelector | FormControlPhoneNumberSelector);

type FormControlInput = {
	type: "formControlInput";
	formInputProps: FormInputProps;
};

type FormControlSelector = {
	type: "formControlSelector";
	formSelectorProps: FormSelectorProps;
};

type FormControlPhoneNumberSelector = {
	type: "formControlPhoneNumberSelector";
	formInputSelectorProps: FormPhoneNumberSelectorProps;
};

export default function FormControl(props: FormControlProps) {
	const isFormInputGuard = (
		props: FormControlProps,
	): props is FormControlInput => props.type === "formControlInput";

	const isFormSelectorGuard = (
		props: FormControlProps,
	): props is FormControlSelector => props.type === "formControlSelector";

	const isFormInputSelectorGuard = (
		props: FormControlProps,
	): props is FormControlPhoneNumberSelector =>
		props.type === "formControlPhoneNumberSelector";

	const dynamicComponent = () => {
		if (isFormInputGuard(props)) {
			return <FormInput {...props.formInputProps} />;
		}

		if (isFormSelectorGuard(props)) {
			return <FormSelector {...props.formSelectorProps} />;
		}

		if (isFormInputSelectorGuard(props)) {
			return <FormPhoneNumberSelector {...props.formInputSelectorProps} />;
		}
	};

	return dynamicComponent();
}

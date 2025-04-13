import "./FormControl.css";
import FormInput, { type FormInputProps } from "./formInput";
import FormPhoneNumberCode, {
	type FormPhoneNumberCodeProps,
} from "./formPhoneNumberCode";
import FormSelector, { type FormSelectorProps } from "./formSelector";

export type FormControlProps = {
	id?: number;
} & (FormControlInput | FormControlSelector | FormControlPhoneNumberCode);

type FormControlInput = {
	type: "input";
	formInputProps: FormInputProps;
};

type FormControlSelector = {
	type: "selector";
	formSelectorProps: FormSelectorProps;
};

type FormControlPhoneNumberCode = {
	type: "phoneNumberCode";
	formPhoneNumberCodeProps: FormPhoneNumberCodeProps;
};

export default function FormControl(props: FormControlProps) {
	const isFormInputGuard = (
		props: FormControlProps,
	): props is FormControlInput => props.type === "input";

	const isFormSelectorGuard = (
		props: FormControlProps,
	): props is FormControlSelector => props.type === "selector";

	const isFormPhoneNumberCodeGuard = (
		props: FormControlProps,
	): props is FormControlPhoneNumberCode => props.type === "phoneNumberCode";

	const dynamicComponent = () => {
		if (isFormInputGuard(props)) {
			return <FormInput {...props.formInputProps} />;
		}

		if (isFormSelectorGuard(props)) {
			return <FormSelector {...props.formSelectorProps} />;
		}

		if (isFormPhoneNumberCodeGuard(props)) {
			return <FormPhoneNumberCode {...props.formPhoneNumberCodeProps} />;
		}
	};

	return dynamicComponent();
}

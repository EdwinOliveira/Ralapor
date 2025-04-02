import "./FormControl.css";
import FormInput, { type FormInputProps } from "./FormInput";
import FormSelector, { type FormSelectorProps } from "./FormSelector";

export type FormControlProps = {
	id?: number;
} & (FormControlInput | FormControlSelector);

type FormControlInput = {
	type: "input";
	formInputProps: FormInputProps;
};

type FormControlSelector = {
	type: "selector";
	formSelectorProps: FormSelectorProps;
};

export default function FormControl(props: FormControlProps) {
	const isFormInputGuard = (
		props: FormControlProps,
	): props is FormControlInput => props.type === "input";

	const isFormSelectorGuard = (
		props: FormControlProps,
	): props is FormControlSelector => props.type === "selector";

	const dynamicComponent = () => {
		if (isFormInputGuard(props)) {
			return <FormInput {...props.formInputProps} />;
		}

		if (isFormSelectorGuard(props)) {
			return <FormSelector {...props.formSelectorProps} />;
		}
	};

	return dynamicComponent();
}

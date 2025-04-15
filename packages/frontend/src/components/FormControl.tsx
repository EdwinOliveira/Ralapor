import FormInput, { type FormInputProps } from "./FormInput";
import Formdropdown, { type FormDropdownProps } from "./FormDropdown";
import FormSelector, { type FormSelectorProps } from "./FormSelector";

export type FormControlProps = {
	id?: number;
} & (FormControlInput | FormControlSelector | FormControlDropdown);

type FormControlInput = {
	type: "input";
	formInputProps: FormInputProps;
};

type FormControlSelector = {
	type: "selector";
	formSelectorProps: FormSelectorProps;
};

type FormControlDropdown = {
	type: "dropdown";
	formDropdownProps: FormDropdownProps;
};

const FormControl: React.FC<FormControlProps> = (props) => {
	const isFormInputGuard = (
		props: FormControlProps,
	): props is FormControlInput => props.type === "input";

	const isFormSelectorGuard = (
		props: FormControlProps,
	): props is FormControlSelector => props.type === "selector";

	const isFormdropdownGuard = (
		props: FormControlProps,
	): props is FormControlDropdown => props.type === "dropdown";

	const dynamicComponent = () => {
		if (isFormInputGuard(props)) {
			return <FormInput {...props.formInputProps} />;
		}

		if (isFormSelectorGuard(props)) {
			return <FormSelector {...props.formSelectorProps} />;
		}

		if (isFormdropdownGuard(props)) {
			return <Formdropdown {...props.formDropdownProps} />;
		}
	};

	return dynamicComponent();
};

export default FormControl;

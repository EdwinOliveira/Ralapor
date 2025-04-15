import "./FormDropdown.css";

import FormInput, { type FormInputProps } from "./FormInput";
import FormSelector, { type FormSelectorProps } from "./FormSelector";

export type FormDropdownProps = {
	formInputControl: FormInputProps;
	formSelectorControl: FormSelectorProps;
};

const FormDropdown: React.FC<FormDropdownProps> = ({
	formInputControl,
	formSelectorControl,
}) => {
	return (
		<div id="form-dropdown">
			<FormSelector {...formSelectorControl} />
			<FormInput {...formInputControl} />
		</div>
	);
};

export default FormDropdown;

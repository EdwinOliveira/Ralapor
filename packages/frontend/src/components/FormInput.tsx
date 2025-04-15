import "./FormInput.css";

import type { HTMLInputTypeAttribute } from "react";

export type FormInputProps = {
	name: string;
	type: HTMLInputTypeAttribute;
	placeholder: string;
};

const FormInput: React.FC<FormInputProps> = ({ type, name, placeholder }) => {
	return (
		<input
			id={`form-input__${name}`}
			type={type}
			name={name}
			placeholder={placeholder}
		/>
	);
};

export default FormInput;

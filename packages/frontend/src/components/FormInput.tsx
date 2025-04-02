import "./FormInput.css";
import type { HTMLInputTypeAttribute } from "react";

export type FormInputProps = {
	name: string;
	type: HTMLInputTypeAttribute;
	placeholder: string;
};

export default function FormInput({ type, name, placeholder }: FormInputProps) {
	return <input type={type} name={name} placeholder={placeholder} />;
}

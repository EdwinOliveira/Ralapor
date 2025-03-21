import type { HTMLInputTypeAttribute } from "react";
import "./FormInput.css";

export type FormInputProps = {
	placeholder: string;
	type: HTMLInputTypeAttribute;
};

export default function FormInput({ placeholder, type }: FormInputProps) {
	return (
		<>
			<input type={type} placeholder={placeholder} />
		</>
	);
}

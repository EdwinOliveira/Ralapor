import "./FormInput.css";
import type { HTMLInputTypeAttribute } from "react";

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

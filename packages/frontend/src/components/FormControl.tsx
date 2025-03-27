import type { HTMLInputTypeAttribute } from "react";
import "./FormControl.css";

export type FormControlProps = {
	id?: number;
	name: string;
	type: HTMLInputTypeAttribute;
	placeholder: string;
};

export default function FormControl({
	type,
	name,
	placeholder,
}: FormControlProps) {
	return <input type={type} name={name} placeholder={placeholder} />;
}

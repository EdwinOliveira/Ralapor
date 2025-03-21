import type { HTMLInputTypeAttribute } from "react";

export type FormControlProps = {
	id?: number;
	type: HTMLInputTypeAttribute;
	placeholder: string;
};

export default function FormControl({ type, placeholder }: FormControlProps) {
	return <input type={type} placeholder={placeholder} />;
}

import "./input.css";
import type { HTMLInputTypeAttribute } from "react";

export type InputProps = {
	type: HTMLInputTypeAttribute;
	placeholder: string;
};

export default function Input({ type, placeholder }: InputProps) {
	return <input type={type} placeholder={placeholder} />;
}

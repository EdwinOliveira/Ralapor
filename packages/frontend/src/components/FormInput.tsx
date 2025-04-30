import type { HTMLInputTypeAttribute } from "react";
import { useTranslation } from "react-i18next";

export type FormInputProps = {
	id: number;
	name: string;
	type: HTMLInputTypeAttribute;
	placeholder: string;
};

const FormInput: React.FC<FormInputProps> = ({ name, type, placeholder }) => {
	const { t } = useTranslation();

	return (
		<input
			id={`form-input__${name}`}
			type={type}
			placeholder={t(placeholder)}
		/>
	);
};

export default FormInput;

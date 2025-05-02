import "./FormInput.css";
import { useTranslation } from "react-i18next";

export type FormInputProps = {
	id: number;
	name: string;
	type: string;
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

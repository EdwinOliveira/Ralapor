import type { ReactElement } from "react";
import "./FormSelector.css";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import Select from "react-select";

export type FormSelectorOption = {
	value: string;
	label: ReactElement;
};

export type FormSelectorProps = {
	name: string;
	selectorOptions: Array<FormSelectorOption>;
};

export default function FormSelector({
	name,
	selectorOptions,
}: FormSelectorProps) {
	const customStyles = {
		control: (provided) => ({
			...provided,
			height: "100%",
			width: "8rem",
		}),
		option: (provided) => ({
			...provided,
			display: "flex",
			gap: "0.5rem",
		}),
		singleValue: (provided) => ({
			...provided,
			display: "flex",
			gap: "0.5rem",
		}),
		placeholder: (provided) => ({
			...provided,
			display: "flex",
			gap: "0.5rem",
		}),
	};

	return (
		<Select
			options={selectorOptions}
			styles={customStyles}
			name={name}
			defaultValue={selectorOptions[0]}
			placeholder={selectorOptions[0].label}
			isSearchable={false}
		/>
	);
}

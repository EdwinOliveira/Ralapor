import type { ReactElement } from "react";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import Select from "react-select";
import PortugueseFlagIcon from "./PortugueseFlagIcon";
import EnglandFlagIcon from "./EnglandFlagIcon";
import Typography, { type TypographyProps } from "./Typography";

export type FormSelectorOption = {
	value: string;
	placeholder: {
		icon: string;
		typography: TypographyProps;
	};
};

export type FormSelectorProps = {
	name: string;
	selectorOptions: Record<string, FormSelectorOption>;
};

const FormSelector: React.FC<FormSelectorProps> = ({
	name,
	selectorOptions,
}) => {
	const customStyles = {
		control: (provided) => ({
			...provided,
			height: "100%",
			width: "8rem",
			boxShadow: "0 0 0 0.010rem currentColor",
			border: "none",
			"&:hover": {
				border: "none",
			},
			fontSize: "clamp(0.70rem, 0.70rem + 0.25vw, 0.95rem)",
			borderRadius: "0.025rem",
			cursor: "pointer",
		}),
		option: (provided) => ({
			...provided,
			display: "flex",
			gap: "0.5rem",
			backgroundColor: "var(--default-inverse)",
			"&:hover": {
				backgroundColor: "var(--default-inverse)",
			},
			fontSize: "clamp(0.70rem, 0.70rem + 0.25vw, 0.95rem)",
			cursor: "pointer",
		}),
		singleValue: (provided) => ({
			...provided,
			display: "flex",
			gap: "0.5rem",
			fontSize: "clamp(0.70rem, 0.70rem + 0.25vw, 0.95rem)",
		}),
		placeholder: (provided) => ({
			...provided,
			display: "flex",
			gap: "0.5rem",
			fontSize: "clamp(0.70rem, 0.70rem + 0.25vw, 0.95rem)",
		}),
	};

	const getDynamicIcon = (index = 0): ReactElement => {
		switch (selectorOptions[index].placeholder.icon) {
			case "PortugueseFlagIcon": {
				return <PortugueseFlagIcon />;
			}
			case "EnglandFlagIcon": {
				return <EnglandFlagIcon />;
			}
			default: {
				return <EnglandFlagIcon />;
			}
		}
	};

	const getPlaceholder = (index = 0) => {
		return (
			<>
				{getDynamicIcon(index)}
				<Typography {...selectorOptions[index].placeholder.typography} />
			</>
		);
	};

	const defaultOption = () => {
		return {
			value: selectorOptions[0].value,
			label: getPlaceholder(0),
		};
	};

	const options = () => {
		const options = Object.values(selectorOptions).map(
			(selectorOption, index) => ({
				value: selectorOption.value,
				label: getPlaceholder(index),
			}),
		);

		return options;
	};

	return (
		<Select
			options={options()}
			styles={customStyles}
			name={name}
			defaultValue={defaultOption()}
			placeholder={getPlaceholder()}
			isSearchable={false}
		/>
	);
};

export default FormSelector;

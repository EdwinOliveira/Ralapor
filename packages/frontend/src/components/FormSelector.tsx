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

	const dynamicIcon = (): ReactElement => {
		switch (selectorOptions[0].placeholder.icon) {
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

	const buildPlaceholder = (): ReactElement => {
		return (
			<>
				{dynamicIcon()}
				<Typography {...selectorOptions[0].placeholder.typography} />
			</>
		);
	};

	return (
		<Select
			options={Object.values(selectorOptions)}
			styles={customStyles}
			name={name}
			defaultValue={selectorOptions[0]}
			placeholder={buildPlaceholder()}
			isSearchable={false}
		/>
	);
};

export default FormSelector;

import "./FormSelector.css";

export type FormSelectorOption = {
	id?: number;
	value: string;
	designation: string;
	isPlaceholder: boolean;
};

export type FormSelectorProps = {
	selectorOptions: Array<FormSelectorOption>;
};

export default function FormSelector({ selectorOptions }: FormSelectorProps) {
	return (
		<select>
			{selectorOptions.map((selectorOption) => (
				<option
					key={selectorOption.id}
					value={selectorOption.value}
					selected={selectorOption.isPlaceholder}
					hidden={selectorOption.isPlaceholder}
					disabled={selectorOption.isPlaceholder}
				>
					{selectorOption.designation}
				</option>
			))}
		</select>
	);
}

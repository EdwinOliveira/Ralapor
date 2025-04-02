import "./FormSelector.css";

export type FormSelectorOption = {
	id?: number;
	value: string;
	designation: string;
};

export type FormSelectorProps = {
	name: string;
	selectorOptions: Array<FormSelectorOption>;
};

export default function FormSelector({
	name,
	selectorOptions,
}: FormSelectorProps) {
	return (
		<select name={name}>
			{selectorOptions.map((selectorOption) => (
				<option key={selectorOption.id} value={selectorOption.value}>
					{selectorOption.designation}
				</option>
			))}
		</select>
	);
}

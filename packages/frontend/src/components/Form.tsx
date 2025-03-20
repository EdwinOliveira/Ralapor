import FormGroup, { type FormGroupProps } from "./FormGroup";

type FormProps = {
	formGroups: Array<FormGroupProps>;
};

export default function Form({ formGroups }: FormProps) {
	return (
		<>
			<div id="form">
				{formGroups.map((formGroup) => (
					<FormGroup
						key={formGroup.id}
						formLabel={formGroup.formLabel}
						formControl={formGroup.formControl}
					/>
				))}
			</div>
		</>
	);
}

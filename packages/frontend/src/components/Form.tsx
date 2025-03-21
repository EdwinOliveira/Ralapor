import "./Form.css";
import FormGroup, { type FormGroupProps } from "./FormGroup";
import FormBrand, { type FormBrandProps } from "./FormBrand";

type FormProps = {
	formBrand: FormBrandProps;
	formGroups: Array<FormGroupProps>;
};

export default function Form({ formBrand, formGroups }: FormProps) {
	return (
		<>
			<div id="form">
				<FormBrand {...formBrand} />
				{formGroups.map((formGroup) => (
					<FormGroup
						key={formGroup.id}
						formLabel={formGroup.formLabel}
						formControls={formGroup.formControls}
					/>
				))}
			</div>
		</>
	);
}

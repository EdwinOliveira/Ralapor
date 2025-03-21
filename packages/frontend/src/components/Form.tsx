import "./Form.css";
import FormGroup, { type FormGroupProps } from "./FormGroup";
import FormBrand, { type FormBrandProps } from "./FormBrand";
import FormAction, { type FormActionProps } from "./FormAction";

type FormProps = {
	formBrand: FormBrandProps;
	formGroups: Array<FormGroupProps>;
	formAction: FormActionProps;
};

export default function Form({ formBrand, formGroups, formAction }: FormProps) {
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
				<FormAction
					formButtons={formAction.formButtons}
					formLinks={formAction.formLinks}
				/>
			</div>
		</>
	);
}

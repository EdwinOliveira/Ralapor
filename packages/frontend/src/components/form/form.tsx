import type { FormGroupProps } from "../form-group/form-group";
import FormGroup from "../form-group/form-group";
import FormHeader, { type FormHeaderProps } from "../form-header/form-header";
import "./form.css";

export type FormProps = {
	formHeader: FormHeaderProps;
	formGroups: Array<FormGroupProps>;
	formButtons: Array<FormButtonsProps>;
	formLinks: Array<FormLinksProps>;
};

export default function Form({ formHeader, formGroups }: FormProps) {
	return (
		<div id="form">
			<div id="form__header">
				<FormHeader text={formHeader.text} />
			</div>
			<div id="form__groups">
				{formGroups.map((formGroup) => (
					<FormGroup
						key={formGroup.id}
						text={formGroup.text}
						formControls={formGroup.formControls}
					/>
				))}
			</div>
			<div id="form__buttons" />
			<div id="form__links" />
		</div>
	);
}

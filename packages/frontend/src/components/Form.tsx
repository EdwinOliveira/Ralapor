import "./Form.css";
import FormAction, { type FormActionProps } from "./FormAction";
import FormGroup, { type FormGroupProps } from "./FormGroup";
import FormHeader, { type FormHeaderProps } from "./FormHeader";

type FormProps = {
	formHeader: FormHeaderProps;
	formGroups: Array<FormGroupProps>;
	formAction: FormActionProps;
};

export default function Form({
	formHeader,
	formGroups,
	formAction,
}: FormProps) {
	return (
		<div id="form">
			<FormHeader {...formHeader} />
			{formGroups.map((formGroup) => (
				<FormGroup key={formGroup.id} {...formGroup} />
			))}
			<FormAction
				formButtons={formAction.formButtons}
				formLinks={formAction.formLinks}
			/>
		</div>
	);
}

import "./Form.css";
import FormAction, { type FormActionProps } from "./formAction";
import FormGroup, { type FormGroupProps } from "./formGroup";
import FormHeader, { type FormHeaderProps } from "./formHeader";

type FormProps = {
	formHeader: FormHeaderProps;
	formGroups: Array<FormGroupProps>;
	formAction: FormActionProps;
	onAction: (data: FormData) => void;
};

export default function Form({
	formHeader,
	formGroups,
	formAction,
	onAction,
}: FormProps) {
	return (
		<form id="form" action={onAction}>
			<FormHeader {...formHeader} />
			{formGroups.map((formGroup) => (
				<FormGroup key={formGroup.id} {...formGroup} />
			))}
			<FormAction
				formButtons={formAction.formButtons}
				formLinks={formAction.formLinks}
			/>
		</form>
	);
}

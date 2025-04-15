import "./Form.css";

import FormAction, { type FormActionProps } from "./FormAction";
import FormGroup, { type FormGroupProps } from "./FormGroup";
import FormHeader, { type FormHeaderProps } from "./FormHeader";

type FormProps = {
	formHeader: FormHeaderProps;
	formGroups: Array<FormGroupProps>;
	formAction: FormActionProps;
	onAction: (data: FormData) => void;
};

const Form: React.FC<FormProps> = ({
	formHeader,
	formGroups,
	formAction,
	onAction,
}) => {
	return (
		<form id="form" action={onAction}>
			<FormHeader {...formHeader} />
			<div id="form-groups">
				{formGroups.map((formGroup) => (
					<FormGroup key={formGroup.id} {...formGroup} />
				))}
			</div>
			<div id="form-actions">
				<FormAction
					formButtons={formAction.formButtons}
					formLinks={formAction.formLinks}
				/>
			</div>
		</form>
	);
};

export default Form;

import FormAction, { type FormActionProps } from "./FormAction";
import FormGroup, { type FormGroupProps } from "./FormGroup";
import FormHeader, { type FormHeaderProps } from "./FormHeader";

type FormProps = {
	name: string;
	formHeader: FormHeaderProps;
	formGroups: Array<FormGroupProps>;
	formAction: FormActionProps;
	onSubmit: (formEvent: React.FormEvent) => void;
};

const Form: React.FC<FormProps> = ({
	name,
	formHeader,
	formGroups,
	formAction,
	onSubmit,
}) => {
	return (
		<form id="form" name={name} onSubmit={onSubmit}>
			<FormHeader {...formHeader} />
			{formGroups.map((formGroup) => (
				<FormGroup key={formGroup.id} {...formGroup} />
			))}
			<FormAction {...formAction} />
		</form>
	);
};

export default Form;

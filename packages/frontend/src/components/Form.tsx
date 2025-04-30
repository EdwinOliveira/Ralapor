import FormAction, { type FormActionProps } from "./FormAction";
import FormGroup, { type FormGroupProps } from "./FormGroup";
import FormHeader, { type FormHeaderProps } from "./FormHeader";

type FormProps = {
	formHeader: FormHeaderProps;
	formGroups: Record<string, FormGroupProps>;
	formAction: FormActionProps;
	onSubmit: (formEvent: React.FormEvent) => void;
};

const Form: React.FC<FormProps> = ({
	formHeader,
	formGroups,
	formAction,
	onSubmit,
}) => {
	return (
		<form onSubmit={onSubmit}>
			<FormHeader {...formHeader} />
			{Object.values(formGroups).map((formGroup) => (
				<FormGroup key={formGroup.id} {...formGroup} />
			))}
			<FormAction {...formAction} />
		</form>
	);
};

export default Form;

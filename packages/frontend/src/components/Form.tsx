import "./Form.css";
import FormAction from "./FormAction";
import FormGroup, { type FormGroupProps } from "./FormGroup";
import FormHeader, { type FormHeaderProps } from "./FormHeader";

type FormProps = {
	formHeader: FormHeaderProps;
	formGroups: Array<FormGroupProps>;
};

export default function Form({ formHeader, formGroups }: FormProps) {
	return (
		<div id="form">
			<FormHeader {...formHeader} />
			{formGroups.map((formGroup) => (
				<FormGroup key={formGroup.id} {...formGroup} />
			))}
			<FormAction />
		</div>
	);
}

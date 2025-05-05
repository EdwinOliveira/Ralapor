import "./Form.css";
import type { FormEvent } from "react";
import FormAction, { type FormActionProps } from "./FormAction";
import FormGroup, { type FormGroupProps } from "./FormGroup";
import FormHeader, { type FormHeaderProps } from "./FormHeader";
import { withPreventDefault } from "../pipes/withPreventDefault";

type FormProps = {
	formHeader: FormHeaderProps;
	formGroups: Record<string, FormGroupProps>;
	formAction: FormActionProps;
	onSubmit: (formEvent: FormEvent<HTMLFormElement>) => void;
};

const Form: React.FC<FormProps> = ({
	formHeader,
	formGroups,
	formAction,
	onSubmit,
}) => {
	return (
		<form id="form" onSubmit={withPreventDefault(onSubmit)}>
			<FormHeader {...formHeader} />
			<div id="form__groups">
				{Object.values(formGroups).map((formGroup) => (
					<FormGroup key={formGroup.id} {...formGroup} />
				))}
			</div>
			<FormAction {...formAction} />
		</form>
	);
};

export default Form;

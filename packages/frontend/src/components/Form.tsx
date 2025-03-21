import "./Form.css";

import FormHeader, { type FormHeaderProps } from "./FormHeader";
import FormGroup, { type FormGroupProps } from "./FormGroup";
import FormButton, { type FormButtonProps } from "./FormButton";
import FormLink, { type FormLinkProps } from "./FormLink";

export type FormProps = {
	formHeader: FormHeaderProps;
	formGroups: Array<FormGroupProps>;
	formButtons: Array<FormButtonProps>;
	formLinks: Array<FormLinkProps>;
};

export default function Form({
	formHeader,
	formGroups,
	formButtons,
	formLinks,
}: FormProps) {
	return (
		<div id="form">
			<FormHeader {...formHeader} />
			<div id="form-groups">
				{formGroups.map((formGroup) => (
					<FormGroup key={formGroup.id} {...formGroup} />
				))}
			</div>
			<div id="form-buttons">
				{formButtons.map((formButton) => (
					<FormButton key={formButton.id} {...formButton} />
				))}
			</div>
			<div id="form-links">
				{formLinks.map((formLink) => (
					<FormLink key={formLink.id} {...formLink} />
				))}
			</div>
		</div>
	);
}

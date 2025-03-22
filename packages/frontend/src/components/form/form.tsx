import FormButton, { type FormButtonProps } from "../form-button/form-button";
import FormGroup, { type FormGroupProps } from "../form-group/form-group";
import FormHeader, { type FormHeaderProps } from "../form-header/form-header";
import FormLink, { type FormLinkProps } from "../form-link/form-link";
import "./form.css";

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
			<div id="form__buttons">
				{formButtons.map((formButton) => (
					<FormButton
						key={formButton.id}
						text={formButton.text}
						onClick={formButton.onClick}
					/>
				))}
			</div>
			<div id="form__links">
				{formLinks.map((formLink) => (
					<FormLink
						key={formLink.id}
						text={formLink.text}
						href={formLink.href}
					/>
				))}
			</div>
		</div>
	);
}

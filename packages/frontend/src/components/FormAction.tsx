import FormButton, { type FormButtonProps } from "./FormButton";
import FormLink, { type FormLinkProps } from "./FormLink";
import "./FormAction.css";

export type FormActionProps = {
	formButtons: Array<FormButtonProps>;
	formLinks: Array<FormLinkProps>;
};

export default function FormAction({
	formLinks,
	formButtons,
}: FormActionProps) {
	return (
		<div id="form-action">
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

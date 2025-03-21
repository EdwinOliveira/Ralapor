import "./FormAction.css";
import FormButton, { type FormButtonProps } from "./FormButton";
import FormLink, { type FormLinkProps } from "./FormLink";

export type FormActionProps = {
	formButtons: Array<FormButtonProps>;
	formLinks: Array<FormLinkProps>;
};

export default function FormAction({
	formButtons,
	formLinks,
}: FormActionProps) {
	return (
		<>
			<div id="form-action">
				<div id="form-buttons">
					{formButtons.map((formButton) => (
						<FormButton
							key={formButton.id}
							content={formButton.content}
							onAction={formButton.onAction}
						/>
					))}
				</div>
				<div id="form-links">
					{formLinks.map((formLink) => (
						<FormLink
							key={formLink.id}
							content={formLink.content}
							href={formLink.href}
						/>
					))}
				</div>
			</div>
		</>
	);
}

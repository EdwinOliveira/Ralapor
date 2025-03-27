import type { FormButtonProps } from "./FormButton";
import FormButton from "./FormButton";
import type { FormLinkProps } from "./FormLink";
import FormLink from "./FormLink";

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
					<FormButton key={formButton.id} typography={formButton.typography} />
				))}
			</div>
			<div id="form-links">
				{formLinks.map((formLink) => (
					<FormLink key={formLink.id} />
				))}
			</div>
		</div>
	);
}

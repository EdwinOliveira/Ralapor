import FormButton, { type FormButtonProps } from "./FormButton";
import FormLink, { type FormLinkProps } from "./FormLink";

export type FormActionProps = {
	id: number;
	formButtons: Array<FormButtonProps>;
	formLinks: Array<FormLinkProps>;
};

const FormAction: React.FC<FormActionProps> = ({ formButtons, formLinks }) => {
	return (
		<div id="form-action">
			{formButtons.map((formButton) => (
				<FormButton key={formButton.id} {...formButton} />
			))}
			{formLinks.map((formLink) => (
				<FormLink key={formLink.id} {...formLink} />
			))}
		</div>
	);
};

export default FormAction;

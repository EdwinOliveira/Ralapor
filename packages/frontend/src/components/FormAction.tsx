import "./FormAction.css";
import FormButton, { type FormButtonProps } from "./FormButton";
import FormLink, { type FormLinkProps } from "./FormLink";

export type FormActionProps = {
	formButtons: Record<string, FormButtonProps>;
	formLinks: Record<string, FormLinkProps>;
};

const FormAction: React.FC<FormActionProps> = ({ formButtons, formLinks }) => {
	return (
		<div id="form-action">
			<div id="form-action__buttons">
				{Object.values(formButtons).map((formButton) => (
					<FormButton key={formButton.id} {...formButton} />
				))}
			</div>
			<div id="form-action__links">
				{Object.values(formLinks).map((formLink) => (
					<FormLink key={formLink.id} {...formLink} />
				))}
			</div>
		</div>
	);
};

export default FormAction;

import "./FormAction.css";

import FormButton, { type FormButtonProps } from "./FormButton";
import FormLink, { type FormLinkProps } from "./FormLink";

export type FormActionProps = {
	formButtons: Array<FormButtonProps>;
	formLinks: Array<FormLinkProps>;
};

const FormAction: React.FC<FormActionProps> = ({ formLinks, formButtons }) => {
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
};

export default FormAction;

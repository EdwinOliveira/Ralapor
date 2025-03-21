import "./CreateUser.css";

import Form from "../../components/Form";
import type { FormHeaderProps } from "../../components/FormHeader";
import type { FormGroupProps } from "../../components/FormGroup";
import type { FormButtonProps } from "../../components/FormButton";
import type { FormLinkProps } from "../../components/FormLink";

export default function CreateUser() {
	const formHeader: FormHeaderProps = {
		content: "Create User",
	};

	const formGroups: Array<FormGroupProps> = [
		{
			id: 1,
			content: "User Information",
			field: "user-information",
			formControls: [
				{
					id: 1,
					type: "text",
					placeholder: "Username...",
				},
				{
					id: 2,
					type: "email",
					placeholder: "Email...",
				},
				{
					id: 3,
					type: "tel",
					placeholder: "Phone Number...",
				},
			],
		},
	];

	const formButtons: Array<FormButtonProps> = [
		{
			id: 1,
			content: "Continue",
			onAction: () => {},
		},
	];

	const formLinks: Array<FormLinkProps> = [
		{
			id: 1,
			content: "Already have an access code? Click here",
			href: "/access-user",
		},
		{
			id: 2,
			content: "Forgot your access code? Click here",
			href: "/recover-user",
		},
	];

	return (
		<div id="create-user">
			<Form
				formHeader={formHeader}
				formGroups={formGroups}
				formButtons={formButtons}
				formLinks={formLinks}
			/>
		</div>
	);
}

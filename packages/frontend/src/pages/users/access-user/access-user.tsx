import "./access-user.css";
import type { FormGroupProps } from "../../../components/form-group/form-group";
import type { FormHeaderProps } from "../../../components/form-header/form-header";
import type { FormButtonProps } from "../../../components/form-button/form-button";
import type { FormLinkProps } from "../../../components/form-link/form-link";
import Form from "../../../components/form/form";

export default function AccessUser() {
	const formHeader: FormHeaderProps = {
		text: "Access User",
	};

	const formGroups: Array<FormGroupProps> = [
		{
			text: "User Credentials",
			formControls: [
				{
					id: 1,
					designation: "access-code",
					input: { type: "password", placeholder: "Access Code..." },
				},
			],
		},
	];

	const formButtons: Array<FormButtonProps> = [
		{
			text: "Continue",
			onClick: () => {},
		},
	];

	const formLinks: Array<FormLinkProps> = [
		{
			text: "Click here to create your user.",
			href: "/create-user",
		},
		{
			text: "Click here to recover your user.",
			href: "/recover-user",
		},
	];

	return (
		<div id="access-user">
			<Form
				formHeader={formHeader}
				formGroups={formGroups}
				formButtons={formButtons}
				formLinks={formLinks}
			/>
		</div>
	);
}

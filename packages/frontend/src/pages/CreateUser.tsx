import "./CreateUser.css";
import Form from "../components/Form";
import type { FormGroupProps } from "../components/FormGroup";
import type { FormBrandProps } from "../components/FormBrand";
import type { FormActionProps } from "../components/FormAction";

export default function CreateUser() {
	const formBrand: FormBrandProps = {
		content: "Create your Ralapor User",
	};

	const formGroups: Array<FormGroupProps> = [
		{
			id: 1,
			formLabel: { content: "User Information" },
			formControls: [
				{
					id: 1,
					formInput: { type: "text", placeholder: "Username..." },
				},
				{
					id: 2,
					formInput: { type: "email", placeholder: "Email..." },
				},
				{
					id: 3,
					formInput: { type: "tel", placeholder: "Phone Number..." },
				},
			],
		},
	];

	const formAction: FormActionProps = {
		formButtons: [
			{
				id: 1,
				content: "Continue",
				onAction: () => {},
			},
		],
		formLinks: [
			{
				id: 1,
				content: "Already have an user? Click here.",
				href: "/access-user",
			},
			{
				id: 2,
				content: "Forgot your access code? Click here.",
				href: "/recover-user",
			},
		],
	};

	return (
		<>
			<div id="create-user">
				<Form
					formBrand={formBrand}
					formGroups={formGroups}
					formAction={formAction}
				/>
			</div>
		</>
	);
}

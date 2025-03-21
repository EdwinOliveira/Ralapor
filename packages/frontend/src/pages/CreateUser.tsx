import Form from "../components/Form";
import type { FormGroupProps } from "../components/FormGroup";
import type { FormBrandProps } from "../components/FormBrand";
import "./CreateUser.css";

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
					formParagraph: { content: "Username" },
					formInput: { type: "text", placeholder: "Username..." },
				},
				{
					id: 2,
					formParagraph: { content: "Email" },
					formInput: { type: "email", placeholder: "Email..." },
				},
				{
					id: 3,
					formParagraph: { content: "Phone Number" },
					formInput: { type: "tel", placeholder: "Phone Number..." },
				},
			],
		},
	];

	return (
		<>
			<div id="create-user">
				<Form formBrand={formBrand} formGroups={formGroups} />
			</div>
		</>
	);
}

import Form from "../components/Form";
import type { FormGroupProps } from "../components/FormGroup";
import "./CreateUser.css";

export default function CreateUser() {
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
			<Form formGroups={formGroups} />
		</>
	);
}

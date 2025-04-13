import "./CreateProfile.css";
import type { FormActionProps } from "../components/formAction";
import type { FormGroupProps } from "../components/formGroup";
import type { FormHeaderProps } from "../components/formHeader";
import Form from "../components/form";
import { useNavigate } from "react-router";
import { useCreateProfile } from "../hooks/useCreateProfile";

export default function CreateProfile() {
	const navigate = useNavigate();
	const { createProfile } = useCreateProfile();

	const formHeader: FormHeaderProps = {
		typography: {
			content: "Create Ralapor Profile",
			color: "default",
			segment: "form-header",
		},
	};

	const formGroups: Array<FormGroupProps> = [
		{
			id: 1,
			typography: {
				content: "Profile Information",
				color: "default",
				segment: "group-header",
			},
			formControls: [
				{
					id: 1,
					type: "input",
					formInputProps: {
						name: "firstName",
						type: "text",
						placeholder: "First Name...",
					},
				},
				{
					id: 2,
					type: "input",
					formInputProps: {
						name: "lastName",
						type: "text",
						placeholder: "Last Name...",
					},
				},
				{
					id: 3,
					type: "input",
					formInputProps: {
						name: "dateBirth",
						type: "date",
						placeholder: "Date Birth...",
					},
				},
			],
		},
	];

	const formAction: FormActionProps = {
		formButtons: [
			{
				id: 1,
				typography: {
					content: "Continue",
					segment: "button",
					color: "default-inverse",
				},
				isLoading: false,
			},
		],
		formLinks: [],
	};

	const onAction = async (formData: FormData) => {
		createProfile({
			userId: 1,
			firstName: formData.get("firstName")?.toString() || "",
			lastName: formData.get("lastName")?.toString() || "",
			dateBirth: formData.get("dateBirth")?.toString() || "",
		});
	};

	return (
		<div id="wrapper">
			<div id="wrapper__form">
				<Form
					formHeader={formHeader}
					formGroups={formGroups}
					formAction={formAction}
					onAction={onAction}
				/>
			</div>
			<div id="wrapper__background">hello</div>
		</div>
	);
}

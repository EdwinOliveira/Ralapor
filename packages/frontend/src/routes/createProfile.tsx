import "./CreateProfile.css";
import type { FormActionProps } from "../components/FormAction";
import type { FormGroupProps } from "../components/FormGroup";
import type { FormHeaderProps } from "../components/FormHeader";
import Form from "../components/Form";
import { useDispatch } from "react-redux";
import { ProfileState } from "../state/profileState";
import { useNavigate } from "react-router";

export default function CreateProfile() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { addProfile } = ProfileState();

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

	const onAction = async (formData: FormData) => {};

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

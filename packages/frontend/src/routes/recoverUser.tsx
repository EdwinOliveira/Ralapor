import { useNavigate } from "react-router";
import Form from "../components/form";
import type { FormActionProps } from "../components/formAction";
import type { FormGroupProps } from "../components/formGroup";
import type { FormHeaderProps } from "../components/formHeader";
import "./RecoverUser.css";
import { useUpdateUserByUsernameOrEmailOrPhoneNumber } from "../hooks/useUpdateUserByUsernameOrEmailOrPhoneNumber";

export default function RecoverUser() {
	const navigate = useNavigate();
	const { updateUserByUsernameOrEmailOrPhoneNumber } =
		useUpdateUserByUsernameOrEmailOrPhoneNumber();

	const formHeader: FormHeaderProps = {
		typography: {
			content: "Recover Ralapor User",
			color: "default",
			segment: "form-header",
		},
	};

	const formGroups: Array<FormGroupProps> = [
		{
			id: 1,
			typography: {
				content: "User Information",
				color: "default",
				segment: "group-header",
			},
			formControls: [
				{
					id: 1,
					type: "input",
					formInputProps: {
						name: "username",
						type: "text",
						placeholder: "Username...",
					},
				},
				{
					id: 2,
					type: "input",
					formInputProps: {
						name: "email",
						type: "email",
						placeholder: "Email...",
					},
				},
				{
					id: 3,
					type: "input",
					formInputProps: {
						name: "phoneNumber",
						type: "tel",
						placeholder: "Phone Number...",
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
		formLinks: [
			{
				id: 1,
				routePath: "/access-user",
				typography: {
					content: "Already have an access code? Click here to access it!",
					segment: "link",
					color: "default",
				},
			},
			{
				id: 2,
				routePath: "/create-user",
				typography: {
					content: "Don't have an access code? Click here to create it!",
					segment: "link",
					color: "default",
				},
			},
		],
	};

	const onAction = async (formData: FormData) => {
		await updateUserByUsernameOrEmailOrPhoneNumber({
			username: formData.get("username")?.toString() || "",
			email: formData.get("email")?.toString() || "",
			phoneNumber: formData.get("phoneNumber")?.toString() || "",
		});

		await navigate("/access-user");
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

import { useNavigate } from "react-router";
import Form from "../components/Form";
import type { FormActionProps } from "../components/FormAction";
import type { FormGroupProps } from "../components/FormGroup";
import type { FormHeaderProps } from "../components/FormHeader";
import "./RecoverUser.css";
import { UpdateUserAccessCodeByUsernameOrEmailOrPhoneNumberUseCase } from "../useCases/users/UpdateUserAccessCodeByUsernameOrEmailOrPhoneNumberUseCase";

export default function RecoverUser() {
	const navigate = useNavigate();
	const { updateUserAccessCodeByUsernameOrEmailOrPhoneNumber } =
		UpdateUserAccessCodeByUsernameOrEmailOrPhoneNumberUseCase();

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
		const usernameRaw = formData.get("username");
		const username = usernameRaw ? usernameRaw.toString() : "";

		const emailRaw = formData.get("email");
		const email = emailRaw ? emailRaw.toString() : "";

		const phoneNumberRaw = formData.get("phoneNumber");
		const phoneNumber = phoneNumberRaw ? phoneNumberRaw.toString() : "";

		await updateUserAccessCodeByUsernameOrEmailOrPhoneNumber({
			username,
			email,
			phoneNumber,
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

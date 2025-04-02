import { useNavigate } from "react-router";
import Form from "../components/Form";
import type { FormActionProps } from "../components/FormAction";
import type { FormGroupProps } from "../components/FormGroup";
import type { FormHeaderProps } from "../components/FormHeader";
import "./CreateUser.css";
import { CreateUserUseCase } from "../useCases/users/CreateUserUseCase";

export default function CreateUser() {
	const navigate = useNavigate();
	const { createUser } = CreateUserUseCase();

	const formHeader: FormHeaderProps = {
		typography: {
			content: "Create Ralapor User",
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
					type: "phoneNumberCode",
					formPhoneNumberCodeProps: {
						formInputControl: {
							name: "phoneNumber",
							type: "tel",
							placeholder: "Phone Number...",
						},
						formSelectorControl: {
							name: "phoneNumberCode",
							selectorOptions: [
								{
									id: 1,
									value: "+351",
									designation: "+351",
								},
								{
									id: 2,
									value: "+44",
									designation: "+44",
								},
							],
						},
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
				routePath: "/recover-user",
				typography: {
					content: "Forgot your access accode? Click here to recover it!",
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

		const phoneNumberCodeRaw = formData.get("phoneNumberCode");
		const phoneNumberCode = phoneNumberCodeRaw
			? phoneNumberCodeRaw.toString()
			: "";

		await createUser({ username, email, phoneNumber, phoneNumberCode });
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

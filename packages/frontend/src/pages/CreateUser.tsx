import { useNavigate } from "react-router";
import Form from "../components/Form";
import type { FormActionProps } from "../components/FormAction";
import type { FormGroupProps } from "../components/FormGroup";
import type { FormHeaderProps } from "../components/FormHeader";
import "./CreateUser.css";
import { UserState } from "../state/UserState";
import { useDispatch } from "react-redux";
import { CreateUserUseCase } from "../useCases/users/CreateUserUseCase";

export default function CreateUser() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { addUser } = UserState();
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
					name: "username",
					type: "text",
					placeholder: "Username...",
				},
				{
					id: 2,
					name: "email",
					type: "email",
					placeholder: "Email...",
				},
				{
					id: 3,
					name: "phoneNumber",
					type: "tel",
					placeholder: "Phone Number...",
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
		try {
			const response = await createUser({
				username: formData.get("username") as string,
				email: formData.get("email") as string,
				phoneNumber: formData.get("phoneNumber") as string,
				phoneNumberCode: "+351",
			});

			console.log(response);

			// dispatch(addUser(user));
			// await navigate("/access-user");
		} catch (error) {
			console.log(error);
		}
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

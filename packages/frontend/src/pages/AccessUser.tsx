import { useNavigate } from "react-router";
import Form from "../components/Form";
import type { FormActionProps } from "../components/FormAction";
import type { FormGroupProps } from "../components/FormGroup";
import type { FormHeaderProps } from "../components/FormHeader";
import "./AccessUser.css";
import { FindUserByAccessCodeUseCase } from "../useCases/users/FindUserByAccessCodeUseCase";
import { useDispatch } from "react-redux";
import { UserState } from "../state/UserState";
import { useState } from "react";

export default function AccessUser() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { addUser } = UserState();
	const { findUserByAccessCode } = FindUserByAccessCodeUseCase();
	const [isLoading, setLoading] = useState<boolean>(false);

	const formHeader: FormHeaderProps = {
		typography: {
			content: "Access Ralapor User",
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
						name: "accessCode",
						type: "password",
						placeholder: "Access Code...",
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
				isLoading: isLoading,
			},
		],
		formLinks: [
			{
				id: 1,
				routePath: "/create-user",
				typography: {
					content: "Don't have an access code? Click here to create it!",
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
		setLoading(true);

		const user = await findUserByAccessCode({
			accessCode: formData.get("accessCode")?.toString() || "",
		});

		dispatch(addUser(user));

		setLoading(false);
		await navigate("/create-profile");
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

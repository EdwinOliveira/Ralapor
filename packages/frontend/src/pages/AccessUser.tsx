import Form from "../components/Form";
import type { FormActionProps } from "../components/FormAction";
import type { FormGroupProps } from "../components/FormGroup";
import type { FormHeaderProps } from "../components/FormHeader";
import "./AccessUser.css";

export default function AccessUser() {
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
					name: "access-code",
					type: "password",
					placeholder: "Access Code...",
				},
			],
		},
	];

	const formAction: FormActionProps = {
		formButtons: [],
		formLinks: [],
	};

	return (
		<div id="wrapper">
			<div id="wrapper__form">
				<Form
					formHeader={formHeader}
					formGroups={formGroups}
					formAction={formAction}
				/>
			</div>
			<div id="wrapper__background">hello</div>
		</div>
	);
}

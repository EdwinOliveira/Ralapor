import "./access-user.css";
import type { FormGroupProps } from "../../../components/form-group/form-group";
import type { FormHeaderProps } from "../../../components/form-header/form-header";
import Form from "../../../components/form/form";

export default function AccessUser() {
	const formHeader: FormHeaderProps = {
		text: "Header",
	};

	const formGroups: Array<FormGroupProps> = [
		{
			text: "User Credentials",
			formControls: [
				{
					id: 1,
					designation: "access-code",
					input: { type: "password", placeholder: "Access Code..." },
				},
			],
		},
	];

	return (
		<div id="access-user">
			<Form
				formHeader={formHeader}
				formGroups={formGroups}
				formButtons={[]}
				formLinks={[]}
			/>
		</div>
	);
}

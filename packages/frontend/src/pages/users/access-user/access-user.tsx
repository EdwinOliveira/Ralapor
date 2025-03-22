import type { FormGroupProps } from "../../../components/form-group/form-group";
import type { FormHeaderProps } from "../../../components/form-header/form-header";
import Form from "../../../components/form/form";

export default function AccessUser() {
	const formHeader: FormHeaderProps = {
		text: "Header",
	};

	const formGroups: Array<FormGroupProps> = [
		{
			text: "User Information",
			formControls: [
				{
					id: 1,
					input: { type: "password", placeholder: "Access Code..." },
				},
			],
		},
	];

	return (
		<div id="wrapper">
			<Form
				formHeader={formHeader}
				formGroups={formGroups}
				formButtons={[]}
				formLinks={[]}
			/>
		</div>
	);
}

import "./Hero.css";
import Form from "../components/Form";
import type { FormGroupProps } from "../components/FormGroup";
import type { FormHeaderProps } from "../components/FormHeader";

export default function Hero() {
	const formHeader: FormHeaderProps = {
		typography: {
			content: "Ralapor",
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
					placeholder: "Ralapor code...",
				},
			],
		},
	];

	return (
		<div id="hero">
			<Form formHeader={formHeader} formGroups={formGroups} />
		</div>
	);
}

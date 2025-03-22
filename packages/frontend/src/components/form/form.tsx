import "./form.css";

export type FormProps = {
	formHeader: FormHeaderProps;
	formGroups: Array<FormGroupProps>;
	formButtons: Array<FormButtonsProps>;
	formLinks: Array<FormLinksProps>;
};

export default function Form() {
	return (
		<div id="form">
			<div id="form__header" />
			<div id="form__groups" />
			<div id="form__buttons" />
			<div id="form__links" />
		</div>
	);
}

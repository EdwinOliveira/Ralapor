import Typography from "../typography/typography";

export type FormHeaderProps = {
	text: string;
};

export default function FormHeader({ text }: FormHeaderProps) {
	return <Typography text={text} segment="header" />;
}

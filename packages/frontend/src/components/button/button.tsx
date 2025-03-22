import Typography from "../typography/typography";
import "./button.css";

export type ButtonProps = {
	text: string;
	onClick: () => void;
};

export default function Button({ text, onClick }: ButtonProps) {
	return (
		<button id="button" type="button" onClick={onClick}>
			<Typography text={text} segment="button" />
		</button>
	);
}

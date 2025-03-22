import Typography from "../typography/typography";
import "./form-button.css";

export type FormButtonProps = {
	id?: number;
	text: string;
	onClick: () => void;
};

export default function FormButton({ text, onClick }: FormButtonProps) {
	return (
		<button id="form-button" type="button" onClick={onClick}>
			<Typography text={text} segment="button" />
		</button>
	);
}

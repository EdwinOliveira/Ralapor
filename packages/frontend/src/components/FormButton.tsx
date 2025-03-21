import "./FormButton.css";
import Typography from "./Typography";

export type FormButtonProps = {
	id?: number;
	content: string;
	onAction: () => void;
};

export default function FormButton({ content, onAction }: FormButtonProps) {
	return (
		<>
			<button type="button" onClick={onAction}>
				<Typography content={content} signature="placeholder" />
			</button>
		</>
	);
}

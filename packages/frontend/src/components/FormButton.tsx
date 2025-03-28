import Typography, { type TypographyProps } from "./Typography";
import "./FormButton.css";

export type FormButtonProps = {
	id?: number;
	typography: TypographyProps;
	onAction: () => Promise<void>;
};

export default function FormButton({ typography, onAction }: FormButtonProps) {
	return (
		<div id="form-button">
			<button type="button" onClick={onAction}>
				<Typography
					content={typography.content}
					color={typography.color}
					segment={typography.segment}
				/>
			</button>
		</div>
	);
}

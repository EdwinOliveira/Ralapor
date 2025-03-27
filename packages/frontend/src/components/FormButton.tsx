import Typography, { type TypographyProps } from "./Typography";
import "./FormButton.css";

export type FormButtonProps = {
	id?: number;
	typography: TypographyProps;
};

export default function FormButton({ typography }: FormButtonProps) {
	return (
		<div id="form-button">
			<button type="button">
				<Typography
					content={typography.content}
					color={typography.color}
					segment={typography.segment}
				/>
			</button>
		</div>
	);
}

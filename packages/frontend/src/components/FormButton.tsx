import "./FormButton.css";
import Typography, { type TypographyProps } from "./Typography";

export type FormButtonProps = {
	id: number;
	typography: TypographyProps;
};

const FormButton: React.FC<FormButtonProps> = ({ typography }) => {
	return (
		<button type="button" id="form-button">
			<Typography {...typography} />
		</button>
	);
};

export default FormButton;

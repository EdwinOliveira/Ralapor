import "./FormButton.css";
import Typography, { type TypographyProps } from "./Typography";

export type FormButtonProps = {
	id: number;
	typography: TypographyProps;
};

const FormButton: React.FC<FormButtonProps> = ({ typography }) => {
	return (
		<div id="form-button">
			<Typography {...typography} />
		</div>
	);
};

export default FormButton;

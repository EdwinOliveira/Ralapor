import "./FormButton.css";
import "./Button.css";
import Typography, { type TypographyProps } from "./Typography";
import Loader from "./Loader";

export type ButtonProps = {
	id?: number;
	typography: TypographyProps;
	isLoading: boolean;
};

const FormButton: React.FC<ButtonProps> = ({ typography, isLoading }) => {
	return (
		<button id="button" type="submit">
			{isLoading === false ? (
				<Typography
					content={typography.content}
					color={typography.color}
					segment={typography.segment}
				/>
			) : (
				<Loader isLoading={isLoading} />
			)}
		</button>
	);
};

export default FormButton;

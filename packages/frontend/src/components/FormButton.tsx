import "./FormButton.css";

import Typography, { type TypographyProps } from "./Typography";
import Loader from "./Loader";

export type FormButtonProps = {
	id?: number;
	typography: TypographyProps;
	isLoading: boolean;
};

const FormButton: React.FC<FormButtonProps> = ({ typography, isLoading }) => {
	return (
		<button id="form-button" type="submit">
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

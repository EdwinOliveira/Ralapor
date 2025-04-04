import Typography, { type TypographyProps } from "./Typography";
import "./FormButton.css";
import Loader from "./Loader";

export type FormButtonProps = {
	id?: number;
	typography: TypographyProps;
	isLoading: boolean;
};

export default function FormButton({ typography, isLoading }: FormButtonProps) {
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
}

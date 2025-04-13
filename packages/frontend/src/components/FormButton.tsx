import Typography, { type TypographyProps } from "./typography";
import "./FormButton.css";
import Loader from "./loader";

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

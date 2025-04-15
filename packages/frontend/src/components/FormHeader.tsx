import Typography, { type TypographyProps } from "./Typography";

export type FormHeaderProps = {
	typography: TypographyProps;
};

const FormHeader: React.FC<FormHeaderProps> = ({ typography }) => {
	return (
		<div id="form-header">
			<Typography
				content={typography.content}
				segment={typography.segment}
				color={typography.color}
			/>
		</div>
	);
};

export default FormHeader;

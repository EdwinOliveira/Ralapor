import Typography, { type TypographyProps } from "./typography";

export type FormHeaderProps = {
	typography: TypographyProps;
};

export default function FormHeader({ typography }: FormHeaderProps) {
	return (
		<div id="form-header">
			<Typography
				content={typography.content}
				segment={typography.segment}
				color={typography.color}
			/>
		</div>
	);
}

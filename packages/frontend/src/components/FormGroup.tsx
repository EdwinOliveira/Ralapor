import FormControl, { type FormControlProps } from "./FormControl";
import Typography, { type TypographyProps } from "./Typography";

export type FormGroupProps = {
	id?: number;
	typography: TypographyProps;
	formControls: Array<FormControlProps>;
};

export default function FormGroup({
	typography,
	formControls,
}: FormGroupProps) {
	return (
		<div id="form-group">
			<Typography
				content={typography.content}
				segment={typography.segment}
				color={typography.color}
			/>
			{formControls.map((formControl) => (
				<FormControl key={formControl.id} {...formControl} />
			))}
		</div>
	);
}

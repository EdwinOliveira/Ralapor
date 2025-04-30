import type { TypographyProps } from "./Typography";
import Typography from "./Typography";

export type FormHeaderProps = {
	typography: TypographyProps;
};

const FormHeader: React.FC<FormHeaderProps> = ({ typography }) => {
	return (
		<div id="form-header">
			<Typography {...typography} />
		</div>
	);
};

export default FormHeader;

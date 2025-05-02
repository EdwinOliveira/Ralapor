import "./FormLink.css";
import Typography, { type TypographyProps } from "./Typography";

export type FormLinkProps = {
	id: number;
	typography: TypographyProps;
	href: string;
};

const FormLink: React.FC<FormLinkProps> = ({ typography, href }) => {
	return (
		<a id="form-link" href={href}>
			<Typography {...typography} />
		</a>
	);
};

export default FormLink;

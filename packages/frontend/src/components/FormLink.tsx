import { Link } from "react-router";
import "./FormLink.css";
import Typography, { type TypographyProps } from "./Typography";

export type FormLinkProps = {
	id: number;
	typography: TypographyProps;
	href: string;
};

const FormLink: React.FC<FormLinkProps> = ({ typography, href }) => {
	return (
		<Link id="form-link" to={href}>
			<Typography {...typography} />
		</Link>
	);
};

export default FormLink;

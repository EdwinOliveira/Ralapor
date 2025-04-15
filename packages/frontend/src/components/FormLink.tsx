import { Link } from "react-router";

import Typography, { type TypographyProps } from "./Typography";

export type FormLinkProps = {
	id?: number;
	routePath: string;
	typography: TypographyProps;
};

const FormLink: React.FC<FormLinkProps> = ({ routePath, typography }) => {
	return (
		<Link to={routePath}>
			<Typography {...typography} />
		</Link>
	);
};

export default FormLink;

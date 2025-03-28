import { Link } from "react-router";
import Typography, { type TypographyProps } from "./Typography";

export type FormLinkProps = {
	id?: number;
	routePath: string;
	typography: TypographyProps;
};

export default function FormLink({ routePath, typography }: FormLinkProps) {
	return (
		<Link to={routePath}>
			<Typography {...typography} />
		</Link>
	);
}

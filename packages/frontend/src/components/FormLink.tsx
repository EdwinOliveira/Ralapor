import "./FormLink.css";
import { Link } from "react-router-dom";
import Typography from "./Typography";

export type FormLinkProps = {
	id?: number;
	content: string;
	href: string;
};

export default function FormLink({ content, href }: FormLinkProps) {
	return (
		<Link to={href}>
			<Typography content={content} segment="designation" />
		</Link>
	);
}

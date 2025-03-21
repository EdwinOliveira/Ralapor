import "./FormLink.css";
import Typography from "./Typography";

export type FormLinkProps = {
	id?: number;
	content: string;
	href: string;
};

export default function FormLink({ content, href }: FormLinkProps) {
	return (
		<>
			<a href={href}>
				<Typography content={content} signature="link" />
			</a>
		</>
	);
}

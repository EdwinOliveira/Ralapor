import * as router from "react-router-dom";
import Typography from "../typography/typography";
import "./link.css";

export type LinkProps = {
	text: string;
	href: string;
};

export default function Link({ text, href }: LinkProps) {
	return (
		<router.Link id="link" to={href}>
			<Typography text={text} segment="link" />
		</router.Link>
	);
}

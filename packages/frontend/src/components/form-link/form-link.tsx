import Link from "../link/link";

export type FormLinkProps = {
	id?: number;
	text: string;
	href: string;
};

export default function FormLink({ text, href }: FormLinkProps) {
	return <Link text={text} href={href} />;
}

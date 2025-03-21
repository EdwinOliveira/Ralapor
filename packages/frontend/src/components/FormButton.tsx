import Typography from "./Typography";

export type FormButtonProps = {
	id?: number;
	content: string;
	onAction: () => void;
};

export default function FormButton({ content }: FormButtonProps) {
	return (
		<button type="button">
			<Typography content={content} segment="designation" />
		</button>
	);
}

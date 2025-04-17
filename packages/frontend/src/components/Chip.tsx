import "./Chip.css";
import Typography from "./Typography";

export type ChipProps = {
	id: number;
	name: string;
	content: string;
};

const Chip: React.FC<ChipProps> = ({ name, content }: ChipProps) => {
	const onClick = () => {
		console.log("hello");
	};

	return (
		<div id="chip">
			<input type="checkbox" id={name} onClick={onClick} />
			<Typography
				content={content.toLocaleLowerCase()}
				segment="text"
				color="default"
			/>
		</div>
	);
};

export default Chip;

import Input, { type InputProps } from "../input/input";

export type FormControlProps = {
	id?: number;
	designation: string;
	input: InputProps;
};

export default function FormControl({ designation, input }: FormControlProps) {
	return (
		<div id={`form-control__${designation}`}>
			<Input {...input} />
		</div>
	);
}

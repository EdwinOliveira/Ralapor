import Input, { type InputProps } from "../input/input";

export type FormControlProps = {
	id?: number;
	input: InputProps;
};

export default function FormControl({ input }: FormControlProps) {
	return (
		<div id="form-control">
			<Input {...input} />
		</div>
	);
}

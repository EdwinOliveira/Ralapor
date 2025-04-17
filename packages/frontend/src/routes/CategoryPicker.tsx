import "./CategoryPicker.css";
import Chip, { type ChipProps } from "../components/Chip";
import Button, { type ButtonProps } from "../components/Button";
import Typography, { type TypographyProps } from "../components/Typography";

const CategoryPicker = () => {
	const chips: Array<ChipProps> = [
		{ id: 1, name: "drama", content: "Drama" },
		{ id: 2, name: "romance", content: "Romance" },
		{ id: 3, name: "comedy", content: "Comedy" },
		{ id: 4, name: "action", content: "Action" },
		{ id: 5, name: "gore", content: "Gore" },
	];

	const buttonProps: ButtonProps = {
		id: 1,
		typography: {
			content: "Continue",
			segment: "button",
			color: "default-inverse",
		},
		isLoading: false,
	};

	const headerTypographyProps: TypographyProps = {
		content: "Pick your favorite categories",
		segment: "header",
		color: "default",
	};

	return (
		<div className="category-picker">
			<div className="category-picker__header">
				<Typography {...headerTypographyProps} />
			</div>
			<div className="category-picker__chips">
				{chips.map((chip) => (
					<Chip key={chip.id} {...chip} />
				))}
			</div>
			<div id="category-picker__submit">
				<Button {...buttonProps} />
			</div>
		</div>
	);
};

export default CategoryPicker;

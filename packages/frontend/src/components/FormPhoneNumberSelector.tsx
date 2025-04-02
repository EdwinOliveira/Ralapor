import "./FormPhoneNumberSelector.css";
import type { FormControlProps } from "./FormControl";
import FormControl from "./FormControl";

export type FormPhoneNumberSelectorProps = {
	id?: number;
	formControl: FormControlProps;
};

export default function FormPhoneNumberSelector({
	formControl,
}: FormPhoneNumberSelectorProps) {
	return (
		<>
			<select name="phone-number-selector" id="form-phone_number_selector">
				<option selected disabled hidden>
					Phone Number Code
				</option>
				<option value="+351">+351</option>
				<option value="+41">+41</option>
			</select>
			<FormControl {...formControl} />
		</>
	);
}

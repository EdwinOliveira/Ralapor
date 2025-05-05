import "./RecoverUser.css";
import Form from "../components/Form";
import { useForm } from "../hooks/useForm";
import { useNavigate } from "react-router";
import type { FormEvent } from "react";
import { useUpdateUserByUsernameOrEmailOrPhoneNumber } from "../state/users/useCases/useUpdateUserByUsernameOrEmailOrPhoneNumber";

const RecoverUser = () => {
	const { recoverUserForm } = useForm();
	const { updateUserByUsernameOrEmailOrPhoneNumber } =
		useUpdateUserByUsernameOrEmailOrPhoneNumber();
	const navigateTo = useNavigate();

	const onSubmit = async (formEvent: FormEvent<HTMLFormElement>) => {
		const formData = new FormData(formEvent.currentTarget);

		await updateUserByUsernameOrEmailOrPhoneNumber({
			username: formData.get("username")?.toString() ?? "",
			email: formData.get("email")?.toString() ?? "",
			phoneNumber: formData.get("phoneNumber")?.toString() ?? "",
		});

		await navigateTo("/access-user");
	};

	return (
		<div id="recover-user">
			<Form {...recoverUserForm} onSubmit={onSubmit} />
		</div>
	);
};

export default RecoverUser;

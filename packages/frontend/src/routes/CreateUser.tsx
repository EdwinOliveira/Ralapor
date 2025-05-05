import "./CreateUser.css";
import type { FormEvent } from "react";
import Form from "../components/Form";
import { useForm } from "../hooks/useForm";
import { useNavigate } from "react-router";
import { useCreateUser } from "../state/users/useCases/useCreateUser";

const CreateUser = () => {
	const { createUserForm } = useForm();
	const { createUser } = useCreateUser();
	const navigateTo = useNavigate();

	const onSubmit = async (formEvent: FormEvent<HTMLFormElement>) => {
		const formData = new FormData(formEvent.currentTarget);

		await createUser({
			username: formData.get("username")?.toString() ?? "",
			email: formData.get("email")?.toString() ?? "",
			phoneNumber: formData.get("phoneNumber")?.toString() ?? "",
			phoneNumberCode: formData.get("phoneNumberCode")?.toString() ?? "",
		});

		await navigateTo("/access-user");
	};

	return (
		<div id="create-user">
			<Form {...createUserForm} onSubmit={onSubmit} />
		</div>
	);
};

export default CreateUser;

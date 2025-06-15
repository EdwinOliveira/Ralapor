import "./AccessUser.css";
import Form from "../components/Form";
import { useForm } from "../hooks/useForm";
import type { FormEvent } from "react";
import { useNavigate } from "react-router";
import { useCreateUserSession } from "../state/users/useCases/useCreateUserSession";

const AccessUser = () => {
	const { createUserSession } = useCreateUserSession();
	const { accessUserForm } = useForm();
	const navigateTo = useNavigate();

	const onSubmit = async (formEvent: FormEvent<HTMLFormElement>) => {
		const formData = new FormData(formEvent.currentTarget);

		await createUserSession({
			accessCode: formData.get("accessCode")?.toString() ?? "",
		});

		await navigateTo("/dashboard");
	};

	return (
		<div id="access-user">
			<Form {...accessUserForm} onSubmit={onSubmit} />
		</div>
	);
};

export default AccessUser;

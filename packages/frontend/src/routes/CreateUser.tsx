import "./CreateUser.css";
import Form from "../components/Form";
import { useForm } from "../hooks/useForm";
import { useNavigate } from "react-router";

const CreateUser = () => {
	const { createUserForm } = useForm();
	const navigateTo = useNavigate();

	const onSubmit = async (formEvent: React.FormEvent) => {
		await navigateTo("/access-user");
	};

	return (
		<div id="create-user">
			<Form {...createUserForm} onSubmit={onSubmit} />
		</div>
	);
};

export default CreateUser;

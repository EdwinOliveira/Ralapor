import "./CreateUser.css";
import Form from "../components/Form";
import { useForm } from "../hooks/useForm";

const CreateUser = () => {
	const { createUserForm } = useForm();

	const onSubmit = (formEvent: React.FormEvent) => {};

	return (
		<div id="create-user">
			<Form {...createUserForm} onSubmit={onSubmit} />
		</div>
	);
};

export default CreateUser;

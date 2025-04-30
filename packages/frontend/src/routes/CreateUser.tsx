import Form from "../components/Form";
import { useForm } from "../hooks/useForm";

const CreateUser = () => {
	const { createUserForm } = useForm();

	const onSubmit = (formEvent: React.FormEvent) => {};

	return (
		<div id="create-user">
			<Form
				formHeader={createUserForm["form-header"]}
				formGroups={createUserForm["form-groups"]}
				formAction={createUserForm["form-action"]}
				onSubmit={onSubmit}
			/>
		</div>
	);
};

export default CreateUser;

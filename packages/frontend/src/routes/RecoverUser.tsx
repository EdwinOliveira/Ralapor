import "./RecoverUser.css";
import Form from "../components/Form";
import { useForm } from "../hooks/useForm";

const RecoverUser = () => {
	const { recoverUserForm } = useForm();

	const onSubmit = (formEvent: React.FormEvent) => {};

	return (
		<div id="recover-user">
			<Form {...recoverUserForm} onSubmit={onSubmit} />
		</div>
	);
};

export default RecoverUser;

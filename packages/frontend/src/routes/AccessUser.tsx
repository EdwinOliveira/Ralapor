import "./AccessUser.css";
import Form from "../components/Form";
import { useForm } from "../hooks/useForm";

const AccessUser = () => {
	const { accessUserForm } = useForm();

	const onSubmit = (formEvent: React.FormEvent) => {};

	return (
		<div id="access-user">
			<Form {...accessUserForm} onSubmit={onSubmit} />
		</div>
	);
};

export default AccessUser;

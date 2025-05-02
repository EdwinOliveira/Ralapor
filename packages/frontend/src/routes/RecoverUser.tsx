import "./RecoverUser.css";
import Form from "../components/Form";
import { useForm } from "../hooks/useForm";
import { useNavigate } from "react-router";

const RecoverUser = () => {
	const { recoverUserForm } = useForm();
	const navigateTo = useNavigate();

	const onSubmit = async (formEvent: React.FormEvent) => {
		await navigateTo("/access-user");
	};

	return (
		<div id="recover-user">
			<Form {...recoverUserForm} onSubmit={onSubmit} />
		</div>
	);
};

export default RecoverUser;

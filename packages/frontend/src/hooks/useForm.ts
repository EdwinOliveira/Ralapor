import createUserForm from "./../forms/createUserForm.json";
import accessUserForm from "./../forms/accessUserForm.json";
import recoverUserForm from "./../forms/recoverUserForm.json";

const useForm = () => {
	return { createUserForm, accessUserForm, recoverUserForm };
};

export { useForm };

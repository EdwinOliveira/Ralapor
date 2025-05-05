import type { FormEvent } from "react";

const withPreventDefault = (
	callback: (event: FormEvent<HTMLFormElement>) => unknown,
) => {
	return (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		callback(event);
	};
};

export { withPreventDefault };

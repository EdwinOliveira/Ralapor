import { DotLoader } from "react-spinners";

type LoaderProps = {
	isLoading: boolean;
};

export default function Loader({ isLoading }: LoaderProps) {
	return (
		<div id="loader">
			<DotLoader loading={isLoading} size={35} color="#fff" />
		</div>
	);
}

import { DotLoader } from "react-spinners";

type LoaderProps = {
	isLoading: boolean;
};

const Loader: React.FC<LoaderProps> = ({ isLoading }) => {
	return (
		<div id="loader">
			<DotLoader loading={isLoading} size={35} color="#fff" />
		</div>
	);
};

export default Loader;

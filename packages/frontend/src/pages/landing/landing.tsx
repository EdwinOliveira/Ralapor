import { useNavigate } from "react-router-dom";
import Brand from "../../components/brand/brand";
import Button from "../../components/button/button";
import "./Landing.css";
import Typography from "../../components/typography/typography";

export default function Landing() {
	const navigate = useNavigate();

	return (
		<div id="wrapper">
			<div id="wrapper__brand">
				<div id="wrapper__brand--block">
					<Brand />
					<Typography
						text="Start creating and sharing your own stories"
						segment="sub-brand"
					/>
				</div>
				<div id="wrapper__brand--buttons">
					<Button text="Access User" onClick={() => navigate("/access-user")} />
					<Button text="Create User" onClick={() => navigate("/create-user")} />
				</div>
			</div>
		</div>
	);
}

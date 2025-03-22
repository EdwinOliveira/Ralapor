import { useNavigate } from "react-router-dom";
import Brand from "../../components/brand/brand";
import Button from "../../components/button/button";
import "./Landing.css";
import Typography from "../../components/typography/typography";

export default function Landing() {
	const navigate = useNavigate();

	return (
		<div id="landing">
			<div id="landing__brand">
				<div id="landing__brand--block">
					<Brand />
					<Typography
						text="Create and share your own stories"
						segment="sub-brand"
					/>
				</div>
				<div id="landing__brand--buttons">
					<Button text="Access User" onClick={() => navigate("/access-user")} />
					<Button text="Create User" onClick={() => navigate("/create-user")} />
				</div>
			</div>
		</div>
	);
}

import Brand from "../components/brand/Brand";
import Typography from "../components/typography/Typography";
import "./HeroPage.css";

export default function HeroPage() {
	return (
		<div id="hero-page">
			<div id="hero-page__brand">
				<Brand />
				<Typography
					content="Write and share your stories on Ralapor"
					segment="brand-sub-header"
					color="default"
				/>
			</div>
		</div>
	);
}

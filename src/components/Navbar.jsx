import headerIcon from "../assets/Images/Troll-Face.png";

export function Navbar() {
	return (
		<header>
			<nav>
				<img src={headerIcon} alt="animated cartoon troll image" className="Navbar-trollFaceIcon" />
				<h3 className="Navbar-header">Meme Generator</h3>
				<p className="Navbar-title">React Course - Project 3</p>
			</nav>
		</header>
	);
}

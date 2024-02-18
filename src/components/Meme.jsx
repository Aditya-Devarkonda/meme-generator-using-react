import React from "react";

export function Meme() {
	const [inputData, setInputData] = React.useState({
		topText: "",
		bottomText: "",
		memeUrl: "",
		prevMemeUrl: "",
	});

	const [memeArray, setMemeArray] = React.useState([]);

	React.useEffect(() => {
		fetch("https://api.imgflip.com/get_memes")
			.then((res) => res.json())
			.then((data) => setMemeArray(() => data.data.memes));
	}, []);

	function getRandomMemeImage() {
		const number = Math.floor(Math.random() * memeArray.length);
		const imgUrl = memeArray[number].url;
		setInputData((prevData)=>({
			...prevData,
			prevMemeUrl: inputData.memeUrl
		}))
		setInputData((prevdata) => ({
			...prevdata,
			memeUrl: imgUrl,
		}));
	}

	function getPreviousMemeImage() {
		setInputData((prevdata) => ({
			...prevdata,
			memeUrl: inputData.prevMemeUrl,
		}));
	}

	function handleInputChnage(event) {
		const { name, value } = event.target;
		setInputData((prevdata) => ({
			...prevdata,
			[name]: value,
		}));
	}

	return (
		<main className="Meme-div">
			<div className="Meme-form">
				<div>
					<label className="Meme-left-lebel" htmlFor="lebel1">
						Add text to meme
					</label>
					<input
						type="text"
						placeholder=""
						className="Meme-left-input"
						id="lebel1"
						name="topText"
						onChange={handleInputChnage}
						value={inputData.topText}
					/>
				</div>
				<div>
					<label className="Meme-right-lebel" htmlFor="lebel2">
						Add bottom text
					</label>
					<input
						type="text"
						placeholder=""
						className="Meme-right-input"
						id="lebel2"
						name="bottomText"
						onChange={handleInputChnage}
						value={inputData.bottomText}
					/>
				</div>
				<button className="Meme-new button" onClick={getRandomMemeImage}>
					Get a new meme image 🖼
				</button>
				<button className="Meme-prev button" onClick={getPreviousMemeImage}>
					Previous meme image
				</button>
			</div>
			<div className="memeImageContainer">
				<img className="memeImage" src={inputData.memeUrl}></img>
				<h2 className="memeText top">{inputData.topText}</h2>
				<h2 className="memeText bottom">{inputData.bottomText}</h2>
			</div>
		</main>
	);
}

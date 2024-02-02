import React from "react";

export function Meme() {
	// https://api.imgflip.com/get_memes
	const [inputData, setInputData] = React.useState({
		topText: "",
		bottomText: "",
		memeUrl: "https://i.imgflip.com/1ur9b0.jpg",
	});

	const [memeArray, setMemeArray] = React.useState([]);

	React.useEffect(()=>{
		fetch("https://api.imgflip.com/get_memes")
		.then(res => res.json())
		.then(data => setMemeArray(data.data.memes))
	},[])

	function getRandomMemeImage(){
		const number = Math.floor(Math.random() * memeArray.length)
		const imgUrl = memeArray[number].url
		setInputData(prevdata => ({
			...prevdata,
			memeUrl: imgUrl
		})
	}

	return (
		<main className="Meme-div">
			<div className="Meme-form">
				<div>
					<lebel className="Meme-left-lebel" for="lebel1">
						Top text
					</lebel>
					<input type="text" placeholder="Shut up" className="Meme-left-input" id="lebel1" value={inputData.topText}/>
				</div>
				<div>
					<lebel className="Meme-right-lebel" for="lebel2">
						Bottom text
					</lebel>
					<input
						type="text"
						placeholder="And take my money"
						className="Meme-right-input"
						id="lebel2"
						value={inputData.bottomText}
					/>
				</div>
				<button className="Meme-submit-button" onClick={getRandomMemeImage}>Get a new meme image 🖼</button>
			</div>
			<img className="memeImage" src={inputData.memeUrl}></img>
		</main>
	);
}

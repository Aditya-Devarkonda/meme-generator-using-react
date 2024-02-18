import React from "react";

export function Meme() {
	const [inputData, setInputData] = React.useState({
		topText: "",
		bottomText: "",
		memeUrl: "",
	});

	const [memeArray, setMemeArray] = React.useState([]);
	const [randomNumberArray, setRandomNumberArray] = React.useState([0]);
	const canvasRef = React.useRef(null);

	React.useEffect(() => {
		fetch("https://api.imgflip.com/get_memes")
			.then((res) => res.json())
			.then((data) => setMemeArray(() => data.data.memes));
	}, []);

	function addnewRandomNumberToArray() {
		const number = Math.floor(Math.random() * memeArray.length);
		setRandomNumberArray((prevdata) => {
			const updatedArray = [...prevdata, number];
			addUrlToInputData(updatedArray);
			return updatedArray;
		});
	}

	function addUrlToInputData(updatedRandomNumberArray) {
		if (updatedRandomNumberArray < 1) {
			return;
		}
		const imgUrl = memeArray[updatedRandomNumberArray[updatedRandomNumberArray.length - 1]].url;
		setInputData((prevdata) => ({
			...prevdata,
			memeUrl: imgUrl,
		}));
		console.log(randomNumberArray);
	}

	function removeLastRandomNumberfromArray() {
		setRandomNumberArray((prevRandomArray) => {
			const updatedArray = prevRandomArray.slice(0, -1);
			addUrlToInputData(updatedArray);
			return updatedArray;
		});
	}

	function handleInputChnage(event) {
		const { name, value } = event.target;
		setInputData((prevdata) => ({
			...prevdata,
			[name]: value,
		}));
	}

	function shareMeme() {
		// Create a canvas element
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");

		// Set canvas size to match image dimensions
		const img = new Image();
		img.crossOrigin = "anonymous";
		img.onload = function () {
			canvas.width = img.width;
			canvas.height = img.height;

			// Draw meme image onto canvas
			ctx.drawImage(img, 0, 0);

			// Add top text
			ctx.fillStyle = "white";
			ctx.font = "30px Arial";
			ctx.textAlign = "center";
			ctx.fillText(inputData.topText, canvas.width / 2, 40);

			// Add bottom text
			ctx.fillText(inputData.bottomText, canvas.width / 2, canvas.height - 20);

			// Convert canvas content to data URL representing the JPG image
			const dataUrl = canvas.toDataURL("image/jpeg");

			// Create a download link
			const a = document.createElement("a");
			a.href = dataUrl;
			a.download = "meme.jpg";
			a.click();

			// Share the image using navigator.share API if available
			if (navigator.share) {
				navigator
					.share({
						title: "Shared Meme",
						text: "Check out this meme!",
						url: dataUrl,
					})
					.then(() => console.log("Shared successfully"))
					.catch((error) => console.error("Error sharing:", error));
			}
		};
		img.src = inputData.memeUrl;
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
				<button className="Meme-new button" onClick={addnewRandomNumberToArray}>
					Click for RANDOM meme image
				</button>
				<button className="Meme-prev button" onClick={removeLastRandomNumberfromArray}>
					Previous meme image
				</button>
			</div>
			<div className="memeImageContainer">
				<canvas ref={canvasRef} style={{ display: "none" }}></canvas>
				<img className="memeImage" src={inputData.memeUrl}></img>
				<h2 className="memeText top">{inputData.topText}</h2>
				<h2 className="memeText bottom">{inputData.bottomText}</h2>
			</div>
			<button className="Meme-share button" onClick={shareMeme}>
				Download meme
			</button>
		</main>
	);
}

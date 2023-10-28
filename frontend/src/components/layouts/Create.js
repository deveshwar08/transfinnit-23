import React, { useState } from "react";
import axios from "axios";

import { NFTStorage, File } from "nft.storage";

import { mintNFT } from "../../actions";
import { useDispatch } from "react-redux";

import config from "../../config";

const client = new NFTStorage({ token: config.storageAPIKey });

const Create = ({ Tezos }) => {
	const dispatch = useDispatch();

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [prompt, setPrompt] = useState("");
	const [symbol, setSymbol] = useState("");
	const [amount, setAmount] = useState("0");
	const [image, setImage] = useState(null);
	const [error, setError] = useState("");
	const [loadingPrompt, setLoadingPrompt] = useState(false);
	const [loadingSubmit, setLoadingSubmit] = useState(false);

	const onPrompt = (e) => {
		e.preventDefault();
		if (prompt === "") {
			setError("Provided prompt is empty. Please prompt!");
			return;
		}
		setLoadingPrompt(true);
		setError("");

		(async () => {
			const imageResponse = await axios.post("https://api.wizmodel.com/sdapi/v1/txt2img", {
				"prompt": prompt,
				"steps": 30
			});
			const imageBlob = await imageResponse.blob();
			setImage(imageBlob);
			setLoadingPrompt(false);
		})();
	}

	const onSubmit = (e) => {
		e.preventDefault();
		if (
			name === "" ||
			description === "" ||
			prompt === "" ||
			symbol === "" ||
			amount === "" ||
			!/^-?\d+$/.test(amount) ||
			image === null
		) {
			setError("Some Error Occurred. Please check entered details.");
			return;
		}
		setLoadingSubmit(true);
		setError("");

		(async () => {
			const metadata = await client.store({
				name: name,
				description: description,
				decimals: 0,
				symbol: symbol,
				image: new File(
					[image],
					'filename.jpg',
					{ type: "image/jpg" }
				),
			});
			console.log(metadata);
			dispatch(mintNFT({ Tezos, amount, metadata: metadata.url }))

			setLoadingSubmit(false);
			setName("");
			setAmount("0");
			setDescription("");
			setPrompt("");
			setSymbol("");
		})();
	};

	return (
		<div>
			<form className="ui form error">
				<div
					className={`field required ${loadingSubmit ? "disabled" : ""
						}`}
				>
					<label>Token Name</label>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Tez Bytes"
					/>
				</div>
				{name.length > 30 ? (
					<div className="ui error message">
						<div className="header">Too long!</div>
						<p>The name must be less than 30 letters.</p>
					</div>
				) : null}
				<div
					className={`field required ${loadingSubmit ? "disabled" : ""
						}`}
				>
					<label>Description</label>
					<input
						type="text"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder="A digital art piece!"
					/>
				</div>
				{description.length > 300 ? (
					<div className="ui error message">
						<div className="header">Too long!</div>
						<p>The Description must be less than 300 letters.</p>
					</div>
				) : null}
				<div
					className={`field required ${loadingSubmit ? "disabled" : ""
						}`}
				>
					<label>Symbol</label>
					<input
						type="text"
						value={symbol}
						onChange={(e) => setSymbol(e.target.value)}
						placeholder="TBY"
					/>
				</div>
				{Symbol.length > 10 ? (
					<div className="ui error message">
						<div className="header">Too long!</div>
						<p>The Symbol must be less than 10 letters.</p>
					</div>
				) : null}
				<div
					className={`field required ${loadingSubmit ? "disabled" : ""
						}`}
				>
					<label>
						Selling Amount (Mutez) (There is a 3% service fee)
					</label>
					<input
						type="text"
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
						placeholder="Amount"
					/>
				</div>
				{!/^-?\d+$/.test(amount) && amount !== "" ? (
					<div className="ui error message">
						<div className="header">Only number allowed</div>
						<p>The amount must be a valid Mutez value.</p>
					</div>
				) : null}
				{/* <div
                    className={`field required ${
                        loadingSubmit ? "disabled" : ""
                    }`}
                >
                    <label>Image</label>
                    <button
                        type="button"
                        className="ui basic button"
                        onClick={(event) => {
                            openFileSelector();
                            event.preventDefault();
                        }}
                    >
                        Select files{" "}
                    </button>
                    {filesContent.length > 0 ? filesContent[0].name : ""}
                </div> */}
				<div>
					<label>Prompt for your AI Image</label>
					<input
						type="text"
						value={prompt}
						onChange={(e) => setPrompt(e.target.value)}
						placeholder="Generate random image"
					/>
					<button
						className={`ui button ${loadingPrompt ? "loading" : ""}`}
						onClick={(e) => onPrompt(e)}
					>
						Generate image
					</button>
				</div>
				{image &&
					<div>
						<img src={URL.createObjectURL(image)} alt="" />
					</div>
				}
				{error ? (
					<div className="ui error message">
						<div className="header">Error</div>
						<p>{error}</p>
					</div>
				) : null}

				<button
					className={`ui button ${loadingSubmit ? "loading" : ""}`}
					onClick={(e) => onSubmit(e)}
					type="submit"
				>
					Mint
				</button>
			</form>
		</div>
	);
};

export default Create;

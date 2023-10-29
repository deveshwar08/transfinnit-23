import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./styles/create.module.css";
import { NFTStorage, File } from "nft.storage";

import { mintNFT } from "../../actions";
import { useDispatch } from "react-redux";

import {
  Button,
  Box,
  Container,
  Alert,
  BackgroundImage,
  Loader,
} from "@mantine/core";

import config from "../../config";

const client = new NFTStorage({ token: config.storageAPIKey });

const Create = ({ Tezos }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [prompt, setPrompt] = useState("");
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
      const imageResponse = await axios.post(
        `${config.serverAPI}/generate`,
        {
          prompt: prompt,
        },
        { responseType: "arraybuffer" }
      );
      const base64ImageString = Buffer.from(
        imageResponse.data,
        "binary"
      ).toString("base64");
      setImage("data:image/png;base64," + base64ImageString);
      setLoadingPrompt(false);
    })();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === "" || description === "" || prompt === "" || image === null) {
      setError("Some Error Occurred. Please check entered details.");
      return;
    }
    setLoadingSubmit(true);
    setError("");

    (async () => {
      const resp = await fetch(image);
      const imageBlob = await resp.blob();
      const metadata = await client.store({
        name: name,
        description: description,
        decimals: 0,
        image: new File([imageBlob], `${name}.jpg`, { type: imageBlob.type }),
      });
      console.log(metadata);
      dispatch(mintNFT({ Tezos, metadata: metadata.url, prompt }));

      setLoadingSubmit(false);
      setName("");
      setDescription("");
      setPrompt("");
    })();
  };

  return (
    <BackgroundImage src="/bg.png">
      <Container
        style={{
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          color: "white",
          justifyContent: "space-evenly",
          alignItems: "center",
          fontFamily: "inter",
        }}
      >
        <Box
          style={{
            fontFamily: "monoton",
            fontSize: "3rem",
          }}
        >
          CREATE YOUR <br></br>NFTs
          <Box
            style={{
              fontFamily: "roboto condensed",
              fontSize: "1.2rem",
              marginTop: "1rem",
              width: "70%",
            }}
          >
            All it takes is a prompt and a click to mint your own NFTs and turn
            them into a piece of art!
          </Box>
        </Box>
        <form>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              width: "95%",
              marginBottom: "2rem",
              gap: "1rem",
            }}
          >
            {image ? (
              <img src={image} alt="Generated Image" />
            ) : (
              <>
                <input
                  className={styles.input}
                  placeholder="Token Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loadingSubmit}
                  required
                  error={
                    name.length > 30
                      ? "The name must be less than 30 letters."
                      : null
                  }
                />

                <textarea
                  className={styles.input}
                  rows={3}
                  placeholder="Token Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={loadingSubmit}
                  required
                />

                <textarea
                  row={3}
                  className={styles.input}
                  placeholder="Prompt For your Image"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </>
            )}
          </Box>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "95%",
            }}
          >
            {image ? (
              <button
                className={styles.button}
                onClick={onSubmit}
                type="submit"
              >
                {loadingSubmit ? "Minting..." : "Mint NFT"}
              </button>
            ) : (
              <button onClick={onPrompt} className={styles.button}>
                {loadingPrompt ? "Loading..." : "Generate Image"}
              </button>
            )}
          </Box>
        </form>
      </Container>
    </BackgroundImage>
  );
};

export default Create;
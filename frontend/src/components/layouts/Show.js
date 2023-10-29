import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { collectNFT, publish_nft, updateNFT } from "../../actions";
import styles from "./styles/show.module.css";
import { Container, Box, BackgroundImage } from "@mantine/core";
import { Link } from "react-router-dom";
import { Loader } from "@mantine/core";
import Tilt from "react-parallax-tilt";
const Show = ({ Tezos }) => {
  const selector = useSelector((state) => state.tokenData);
  const userAddress = useSelector((state) => state.walletConfig.user);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [opened, setOpened] = useState(false);
  const inputRef = useRef();

  const handleClose = () => {
    setOpened(false);
  };
  console.log(opened);

  useEffect(() => {
    const temp = selector[parseInt(id)];
    if (temp) {
      setData(temp);
    }
  }, [selector, id]);
  return (
    <BackgroundImage src="/bg.png">
      <Link to="/market">
        <div
          className={styles.left}
          style={{
            position: "absolute",
            top: "60px",
            left: "100px",
            height: "50px",
            width: "50px",
            background: `url("/left.png")`,
            backgroundSize: "cover",
            cursor: "pointer",
          }}
        ></div>
      </Link>
      {opened ? (
        <Container
          onClick={handleClose}
          style={{
            width: "100%",
            height: "100vh",
            position: "absolute",
            zIndex: "100",
            backgroundColor: "#00000066",
          }}
        ></Container>
      ) : (
        <></>
      )}

      <div
        className={styles.modal}
        style={{
          display: opened ? "flex" : "none",
          position: "absolute",
          zIndex: "1000",
          width: "300px",
          height: "300px",
          backgroundColor: "#1a1a1a",
          top: "30%",
          left: "40%",
          borderRadius: "30px",
          justifyContent: "center",
          gap: "1em",
          alignItems: "center",
          fontSize: "2rem",
          flexDirection: "column",
        }}
      >
        {" "}
        <div onClick={handleClose} className={styles.close}>
          X
        </div>
        <label for={styles.input}>Amount</label>
        <input ref={inputRef} id={styles.input}></input>
        <button
          className={styles.button}
          onClick={() => {
            handleClose();
            if (data.collectable) {
              dispatch(
                updateNFT({
                  Tezos: Tezos,
                  amount: inputRef.current.value,
                  id: data.token_id,
                })
              );
            } else {
              dispatch(
                publish_nft({
                  Tezos: Tezos,
                  amount: inputRef.current.value,
                  id: id,
                })
              );
            }
          }}
        >
          Publish
        </button>
      </div>
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
        {data !== null ? (
          <>
            <Tilt>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  fontSize: "0.7rem",
                  gap: "1em",
                }}
              >
                <img
                  className={styles.img}
                  src={`https://ipfs.io/ipfs/${data.image.split("ipfs://")[1]}`}
                  alt={data.description}
                  style={{
                    borderRadius: "30px",
                  }}
                />
                Token {data.token_id}
              </Box>
            </Tilt>

            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                fontFamily: "roboto condensed",
              }}
            >
              <Box
                style={{
                  backgroundColor: "#1a1a1a",
                  color: "white",
                  width: "400px",
                  height: "500px",
                  display: "flex",
                  flexDirection: "column",
                  paddingTop: "2em",
                  padding: "2em",
                  alignItems: "center",
                  gap: "2em",
                  boxSizing: "border-box",
                  marginBottom: "-4rem",
                }}
              >
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "2rem",
                    width: "100%",
                  }}
                >
                  <Box>{data.name}</Box>
                </Box>
                <Box
                  style={{
                    display: "flex",
                    width: "100%",
                    flexDirection: "column",
                  }}
                >
                  <span>DESCRIPTION</span>
                  <p className={styles.p}>{data.description}</p>
                  <span>PROMPT</span>
                  <p className={styles.p}>{data.prompt}</p>
                </Box>
              </Box>
              <Box
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  fontFamily: "inter",
                  fontWeight: "bold",
                  color: "#ffffff",
                }}
              >
                <Box
                  style={{
                    fontSize: "2em",
                  }}
                >
                  {data.amount}{" "}
                  <span
                    style={{
                      fontSize: "0.7rem",
                    }}
                  >
                    {" "}
                    Mutez
                  </span>
                </Box>
                <button
                  className={styles.button}
                  onClick={() => {
                    if (
                      data.collectable &&
                      data.holder !== userAddress.userAddress
                    ) {
                      dispatch(
                        collectNFT({
                          Tezos: Tezos,
                          amount: data.amount,
                          id: data.token_id,
                        })
                      );
                    } else {
                      setOpened(true);
                    }
                  }}
                >
                  {data.collectable
                    ? data.holder === userAddress.userAddress
                      ? "Update Value"
                      : "Buy Now"
                    : "Publish"}
                </button>
              </Box>
            </Box>
          </>
        ) : null}
      </Container>
    </BackgroundImage>
  );
};

export default Show;

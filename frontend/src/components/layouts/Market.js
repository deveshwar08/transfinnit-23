import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./styles/market.module.css";
import {
  Container,
  Box,
  Button,
  MantineProvider,
  BackgroundImage,
} from "@mantine/core";
import { collectNFT } from "../../actions";
import Token from "../sections/TokenCard";
import { Search } from "../layouts/Search";

const Market = ({ Tezos }) => {
  const selector = useSelector((state) => state.tokenData);
  const userAddress = useSelector((state) => state.walletConfig.user);
  const [market, setmarket] = useState(true);
  const [explore, setExplore] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const css = `.input{
	font-size: 5rem;
  }`;

  const tokens = selector.map((obj, idx) => (
    <Token
      key={idx}
      item={obj}
      onCollect={() =>
        dispatch(collectNFT({ Tezos, amount: obj.amount, id: obj.token_id }))
      }
      onClick={() => navigate(`/show/${obj.token_id}`)}
    />
  ));

  const filteredTokens = selector.filter(
    (obj) => obj.holder === userAddress.userAddress
  );

  const collectedTokens = filteredTokens.map((obj, idx) => (
    <Token
      key={idx}
      item={obj}
      onCollect={() =>
        dispatch(
          collectNFT({
            Tezos,
            amount: obj.amount,
            id: obj.token_id,
          })
        )
      }
      onClick={() => navigate(`/show/${obj.token_id}`)}
    />
  ));

  const listedTokens = selector.filter(
    (obj) => obj.collectable === true && obj.holder !== userAddress.userAddress
  );
  const showlistedTokens = listedTokens.map((obj, idx) => (
    <Token
      key={idx}
      item={obj}
      onCollect={() =>
        dispatch(
          collectNFT({
            Tezos,
            amount: obj.amount,
            id: obj.token_id,
          })
        )
      }
      onClick={() => navigate(`/show/${obj.token_id}`)}
    />
  ));

  return (
    <MantineProvider>
      <BackgroundImage src="/bg.png">
        <Container
          style={{
            width: "100%",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            overflowX: "hidden",
          }}
        >
          <style>{css}</style>
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              fontSize: "4rem",
              color: "#ffffff",
              padding: "1rem",
              gap: "2rem",
            }}
          >
            PIXEL VAULT <Box>MARKET</Box>
          </Box>
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              fontSize: "1.25rem",
              color: "#ffffff",
              padding: "1rem",
              gap: "1em",
              fontFamily: "Roboto Condensed",
            }}
          >
            <Box
              onClick={() => {
                setmarket(false);
                setExplore(true);
              }}
              className={styles.section}
              style={{
                fontSize: "1.5rem",
                color: explore ? "#00E29E" : "#ffffff",
                textDecoration: explore ? "underline" : "none",
                cursor: "pointer",
              }}
            >
              Explore
            </Box>
            <Box
              onClick={() => {
                setmarket(true);
                setExplore(false);
              }}
              className={styles.section}
              style={{
                fontSize: "1.5rem",
                textDecoration: market ? "underline" : "none",
                color: market ? "#00E29E" : "#ffffff",
                cursor: "pointer",
              }}
            >
              Market
            </Box>
            <Box
              onClick={() => {
                setmarket(false);
                setExplore(false);
              }}
              className={styles.section}
              style={{
                fontSize: "1.5rem",
                color: explore ? "" : market ? "#ffffff" : "#00E29E",
                textDecoration: explore ? "" : market ? "none" : "underline",
                cursor: "pointer",
              }}
            >
              Collections
            </Box>
          </Box>
          {explore ? (
            <Search />
          ) : (
            <Container
              style={{
                width: "100vw",
                minHeight: "100vh",
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "10em",
                padding: "2em 10em",
                boxSizing: "border-box",
              }}
            >
              {market ? showlistedTokens : collectedTokens}
            </Container>
          )}
        </Container>
      </BackgroundImage>
    </MantineProvider>
  );
};

export default Market;

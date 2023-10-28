import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Button,
  MantineProvider,
  BackgroundImage,
} from "@mantine/core";
import { collectNFT } from "../../actions";
import Token from "../sections/TokenCard";

const Market = ({ Tezos }) => {
  const selector = useSelector((state) => state.tokenData);
  const userAddress = useSelector((state) => state.walletConfig.user);
  const [market, setmarket] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const listedTokens = selector.filter((obj) => obj.collectable === true && obj.holder!== userAddress.userAddress);
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
          }}
        >
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              fontSize: "4rem",
              color: "#ffffff",
              padding: "1rem",
            }}
          >
            PIXEL VAULT MARKET
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
              onClick={() => setmarket(true)}
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
              onClick={() => setmarket(false)}
              style={{
                fontSize: "1.5rem",
                color: market ? "#ffffff" : "#00E29E",
                textDecoration: market ? "none" : "underline",
                cursor: "pointer"
              }}
            >
              Collections
            </Box>
          </Box>

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
        </Container>
      </BackgroundImage>
    </MantineProvider>
  );
};

export default Market;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToggle } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { Container, Box, Button, MantineProvider } from "@mantine/core";
import { collectNFT } from "../../actions";
import Token from "../sections/TokenCard";

const Market = ({ Tezos }) => {
  const selector = useSelector((state) => state.tokenData);
  const userAddress = useSelector((state) => state.walletConfig.user);
  const [value, toggle] = useToggle(["SHOW COLLECTED", "SHOW MARKET"]);

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

  const filteredTokens = selector.filter((obj) => obj.holder === userAddress.userAddress);

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

  const listedTokens = selector.filter((obj) => obj.collectable === true);
  const showlistedTokens = listedTokens.map((obj,idx) => (
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
      <Container
        style={{
          width: "100%",
          minHeight: "100vh",
          backgroundColor: "#111",
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
          EXPLORE THE ART WORLD
        </Box>
        <Button
          style={{
            width: "fit-content",
            padding: "0.5em 1em",
            fontSize: "1em",
          }}
          onClick={toggle}
        >
          {value}
        </Button>
        <Container
          style={{
            width: "100vw",
            minHeight: "100vh",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "10em",
            padding: "2em 10em",
            boxSizing: "border-box",
            backgroundColor: "#1a1a1a",
          }}
        >
          {value === "SHOW COLLECTED" ? (
            showlistedTokens
          ) : (
            collectedTokens
          )}
        </Container>
      </Container>
    </MantineProvider>
  );
};

export default Market;

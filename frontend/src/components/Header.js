import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, MantineProvider, Button } from "@mantine/core";
import { connectWallet, disconnectWallet } from "../actions";
import { Link } from "react-router-dom";

const Header = ({ Tezos, wallet, setTezos }) => {
  const selector = useSelector((state) => {
    return state.walletConfig.user;
  });
  const dispatch = useDispatch();

  const onClick = (event) => {
    event.preventDefault();
    if (selector.userAddress === "") {
      dispatch(connectWallet({ Tezos, wallet }));
    } else {
      dispatch(disconnectWallet({ wallet, setTezos }));
    }
  };

  return (
    <MantineProvider>
      <Box
        style={{
          backgroundColor: "transparent",
          position: "absolute",
          fontFamily: "inter",
          display: "flex",
          width: "100%",
          top: "2.5em",
          right: "2em",
          pointerEvents: "all",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link to="./">
          <img
            style={{
              height: "5em",
              width: "5em",
              borderRadius: "50%",
              marginLeft: "3em",
              cursor: "pointer",
            }}
            src="/icon.jpeg"
          ></img>
        </Link>

        <Button
          onClick={onClick}
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "#00E29E",
            fontSize: "1.5rem",
            border: "2px solid #00E29E",
            padding: "0.5rem 1rem",
            cursor: "pointer",
          }}
        >
          {selector.userAddress === "" ? "Connect Wallet" : "Disconnect Wallet"}
        </Button>
      </Box>
    </MantineProvider>
  );
};

export default Header;

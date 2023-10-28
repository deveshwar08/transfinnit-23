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
          flexDirection: "row-reverse",
          top: "2.5em",
          right: "2em",
          pointerEvents: "all"
        }}
      >
        <Button
          onClick={onClick}
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "#00E29E",
            fontSize: "1.5rem",
            border: "2px solid #00E29E",
            padding: "0.5rem 1rem",
            "&:hover": {
              backgroundColor: "#00E29E",
              color: "#000000",
              cursor: "pointer",
            },
          }}
        >
          {selector.userAddress === "" ? "Connect Wallet" : "Disconnect Wallet"}
        </Button>
      </Box>
    </MantineProvider>
  );
};

export default Header;

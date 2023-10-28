import React from "react";
import {
  Image,
  Button,
  Container,
  Paper,
  Box,
  Text,
  MantineProvider,
} from "@mantine/core";

const TokenCard = ({ item, onClick, onCollect }) => {
  return (
    <MantineProvider>
      <Box
        style={{
          color: "white",
          fontFamily: "inter",
        }}
      >
        <Box
          width="100%"
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: "2rem",
            padding: "1em",
          }}
        >
          {item.name}
        </Box>
        <Image
          onClick={onClick}
          style={{
            width: "100%",
            aspectRatio: "1/1",

            "&:hover": {
              cursor: "pointer",
            },
          }}
          src={`https://ipfs.io/ipfs/${item.image.split("ipfs://")[1]}`}
          alt={item.description}
        />
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width:"100%",

          }}
        >
          <Box
            style={{
              fontSize: "2rem",
              padding: "1em 0em",
            }}
          >
            {item.amount}
          </Box>

          <Button
            onClick={onCollect}
            disabled={!item.collectable}
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "#00E29E",
              fontSize: "1rem",
              border: "2px solid #00E29E",
              padding: "0.5rem 1rem",
              "&:hover": {
                backgroundColor: "#00E29E",
                color: "#000000",
                cursor: "pointer",
              },
            }}
          >
            {item.collectable ? "Buy Now" : "Sold Out"}
          </Button>
        </Box>
      </Box>
    </MantineProvider>
  );
};

export default TokenCard;

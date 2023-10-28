import React from "react";
import { useSelector } from "react-redux";
import { Image, Button, Box, MantineProvider } from "@mantine/core";
import Tilt from "react-parallax-tilt";

const TokenCard = ({ item, onClick, onCollect }) => {
  const userAddress = useSelector((state) => state.walletConfig.user);
  return (
    <MantineProvider>
      <Tilt>
        <Box
          style={{
            color: "white",
            backgroundColor: "#131313",
            height: "450px",
            padding: "2em",
            borderRadius: "30px",
          }}
        >
          <Box
            width="100%"
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "2rem",
              paddingBottom: "0.5em",
            }}
          >
            {item.name}
          </Box>
          <Image
            onClick={onClick}
            style={{
              width: "100%",
              aspectRatio: "1/1",
              borderRadius: "30px",
              cursor: "pointer",
            }}
            src={`https://ipfs.io/ipfs/${item.image.split("ipfs://")[1]}`}
            alt={item.description}
          />
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
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
              disabled={!item.collectable}
              onClick={onClick}
              style={{
                backgroundColor: "#00E29E",
                border: "none",
                color: "black",
                fontSize: "1rem",
                border: "2px solid #00E29E",
                padding: "0.5rem 1rem",
                cursor: "pointer",
              }}
            >
              view
            </Button>
          </Box>
        </Box>
      </Tilt>
    </MantineProvider>
  );
};

export default TokenCard;

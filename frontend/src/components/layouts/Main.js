import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  MantineProvider,
  Box,
  Image,
  Button,
  BackgroundImage,
} from "@mantine/core";
import styles from "./styles/main.module.css";

const Main = () => {
  return (
    <MantineProvider>
      <BackgroundImage src="/bg.png">
        <Container
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "100vh",
            width: "100vw",
            padding: "2rem",
            boxSizing: "border-box",
            gap: "15%",
            color: "#ffffff",
          }}
        >
          <Container
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "15%",
              width: "100%",
            }}
          >
            <Container
              className={styles.heading}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "start",
                fontSize: "5rem",
              }}
            >
              <span id={styles.heading}>PIXEL VAULT</span>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "start",
                  fontFamily: "inter",
                  fontSize: "5rem",
                }}
              >
                NFTs
              </Box>
              <Box
                style={{
                  paddingTop: "2rem",
                  fontFamily: "inter",
                  fontSize: "2rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                Powered BY <Image src="/tezos.png" width="50px" />
              </Box>
              <Container
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5%",
                  width: "100%",
                  paddingTop: "5rem",
                  boxSizing: "border-box",
                }}
              >
                <Link to="/create">
                  <button id={styles.mint}>Mint Now</button>
                </Link>
                <Link to="/market">
                  <button id={styles.explore}>Explore</button>
                </Link>
              </Container>
            </Container>
            <Container
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "start",
                fontSize: "1rem",
              }}
            ></Container>
            <Image
              style={{
                width: "300px",
                aspectRatio: "1/1",
                objectFit: "cover",
                borderRadius: "50%",
              }}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVbNjT8_wWvO8hxWtBPryh33aHNiEvDyN_D2yz4qnNmNjySP47wAvoikOOj_QePEU3RHk&usqp=CAU"
            />
          </Container>
        </Container>
      </BackgroundImage>
      <BackgroundImage src="/bg.png">
        <Container
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "start",
            minHeight: "100vh",
            width: "100vw",
            padding: "2rem",
            boxSizing: "border-box",
            gap: "5%",
            color: "#black",
            fontFamily: "inter",
          }}
        >
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1em",
              width: "25%",
              fontSize: "2em",
              color: "white",
            }}
          >
            <Image
              src="https://th.bing.com/th/id/OIG.V7cKkuAthucPHKBNjzLz?pid=ImgGn"
              style={{
                borderRadius: "0px",
                width: "100%",
                aspectRatio: "1/1",
              }}
            ></Image>
            Mint NFT masterpieces that defy the rules of time and space, as you
            embark on your Creative Journey.
          </Box>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1em",
              width: "25%",
              fontSize: "2em",
              color: "white",
            }}
          >
            <Image
              src="https://th.bing.com/th/id/OIG.AAnZuWZJygU0cpga68kE?w=270&h=270&c=6&r=0&o=5&dpr=2&pid=ImgGn"
              style={{
                borderRadius: "0px",
                width: "100%",
                aspectRatio: "1/1",
              }}
            ></Image>
            Trade in a thrilling environment where NFT Enthusiasts from every
            corner of the universe gather.
          </Box>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1em",
              width: "25%",
              fontSize: "2em",
              color: "white",
            }}
          >
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVbNjT8_wWvO8hxWtBPryh33aHNiEvDyN_D2yz4qnNmNjySP47wAvoikOOj_QePEU3RHk&usqp=CAU"
              style={{
                borderRadius: "0px",
                width: "100%",
                aspectRatio: "1/1",
              }}
            ></Image>
            Sell your NFTs at electrifying prices and fuel your passion for the
            digital art realm.
          </Box>
        </Container>
      </BackgroundImage>
    </MantineProvider>
  );
};

export default Main;

# Pixel Vault

## Introduction
Pixel Vault is a cutting-edge NFT marketplace that empowers users to unleash their creative potential through the fusion of artificial intelligence and digital art. With Pixel Vault, you can easily generate unique images prompted by AI and then seamlessly transform them into coveted NFTs.

Part of the Transfinitte Hackathon 2023 - TZ02 Problem Statement.

![Home Page](https://github.com/deveshwar08/transfinnit-23/assets/105509441/c426ac62-74ed-492a-9652-6e4cdb4bbae9)

## Check it out!
- [MarketPlace](https://marketplace-deveshwar08.cloud.okteto.net)
- [API](https://api-deveshwar08.cloud.okteto.net)
- [PPT and Demo](https://drive.google.com/drive/folders/1mKKp7VaB3OXrgNXvPIBO5fo9-EB6DHs_)

## Environment Configuration Files

### Frontend (src/config/index.js)

Here is an example structure for the `src/config/index.js` file:

```env
serverAPI: "YOUR_SERVER_URL",
contractAddress: "YOUR_MARKETPLACE_CONTRACT_ADDRESS",
tokenAddress: "YOUR_TOKEN_CONTRACT_ADDRESS",
storageAPIKey: "IPFS_STORAGE_KEY",
```
### Backend (.env)

Here is an example structure for the `.env` file:

```env
SERVER_EXTERNAL_PORT=<YOUR_SERVER_PORT>
FRONTEND_EXTERNAL_PORT=<YOUR_FRONTEND_PORT_HERE>
FRONTEND_URL=<YOUR_FRONTEND_URL>
API_KEY=<STABLE_DIFFUSION_API_KEY>
```

## Getting Started
- Clone the repo.
- Use the docker-compose to get started:
```
docker-compose build
docker-compose up
```
- Make sure to fill all .env files before executing

## Built With
- Tezos Blockchain
- React
- Mantine
- SmartPy
- FastAPI
- Beacon
- IPFS Storage
- Stable Diffusion

## Built by
Team: Smart Pointers
- Aadarsh A
- Shubham Agarwal
- Deveshwar
- K S Srisowrirajan
- Nitish N
- Bhoopesh M

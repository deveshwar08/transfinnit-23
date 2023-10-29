import algoliasearch from 'algoliasearch/lite';
import {
	InstantSearch,
	SearchBox,
	Hits,
	Pagination,
	Configure,
} from 'react-instantsearch';
import Token from "../sections/TokenCard";
import { useNavigate } from "react-router-dom";
import { Container, Button, Box, Image } from '@mantine/core';
import styles from './styles/search.module.css';
import Tilt from "react-parallax-tilt";

const client = algoliasearch('RC9QU0XNET', '92a8dc1696d49f7c4c93eab4c8979043');

const HitComponent = ({ hit }) => {
	const navigate = useNavigate();
	return (
		<div style={{
			padding: "2em",
		}}>
			<Tilt>
				<Box
					onClick={() => navigate(`/show/${hit.token_id}`)}
					style={{
						color: "white",
						backgroundColor: "#131313",
						padding: "2em",
						borderRadius: "30px",
						cursor: "pointer",
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
						{hit.name}
					</Box>
					<Image
						style={{
							width: "100%",
							aspectRatio: "1/1",
							borderRadius: "30px",
							"&:hover": {
								cursor: "pointer",
							},
						}}
						src={`https://ipfs.io/ipfs/${hit.image.split("ipfs://")[1]}`}
						alt={hit.description}
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
							{hit.amount}
						</Box>
						<Button
							disabled={!hit.collectable}
							onClick={() => navigate(`/show/${hit.token_id}`)}
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
							View
						</Button>
					</Box>
				</Box>
			</Tilt>
		</div>

	);
};

export const Search = () => {
	return (
		<InstantSearch searchClient={client} indexName="nfts">
			<Container
				style={{
					width: "100vw",
					display: "grid",
					placeItems: "center"
				}}
			>
				<SearchBox />
				<Hits hitComponent={HitComponent} className={styles.listItems} />
			</Container>
		</InstantSearch>
	);
};

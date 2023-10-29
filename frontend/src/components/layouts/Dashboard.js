import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { collectNFT, publish_nft } from "../../actions";
import Token from "../sections/TokenCard";

const Dashboard = ({ Tezos }) => {
    let selector = useSelector((state) => state.tokenData);
    const address = useSelector((state) => {
      return state.walletConfig.user;
    });  

    selector = selector.filter((obj)=>{
        return obj.holder === address.userAddress;
    })
    
    console.log(selector)
    console.log(address)
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tokens = selector.map((obj, idx) => (
      <Token
        key={idx}
        item={obj}
        onCollect={() =>
          dispatch(collectNFT({ Tezos, amount: obj.amount, id: obj.token_id }))
        }
        onClick={() =>
          dispatch(publish_nft({ Tezos, amount: 50000, token_id: obj.token_id }))
        }
      />
    ));

    return <div className="ui link three column grid cards">{tokens}</div>;
};

export default Dashboard;

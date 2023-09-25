import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { server } from '..'
import { Container, HStack,Button, RadioGroup, Radio} from '@chakra-ui/react';
import Loader from './Loader';
import Error from './Error';
import CoinCard from './CoinCard';

const Coin = () => {

const [Coins,setCoins] = useState([]);
const [loading,setLoading] = useState(true);
const [error,setError] = useState(false);
const [page, setPage] = useState(1);
const [currency,setCurrency] = useState("inr");


const currencySymbol = currency==="inr"?"₹": currency==="eur"?"€":"$";


const btns = new Array(132).fill(1);

const changePage = (page) =>
{
    setPage(page);
    setLoading(true);
}

useEffect(() => {
    
        const fetchCoins = async ()=>{
            try{
            const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);

            console.log(data);
            setCoins(data);
            window.scrollTo({ top: 0, behavior: "smooth" });
            setLoading(false);
          
        } catch(error)
        {
            setError(true);
            setLoading(false);
        }
    };
          fetchCoins();
        },[currency,page]);
  
if(error) return <Error message ={"error while fetching Coins"} />;

  return (
    <Container maxW={"container.xl"}>
        {loading? <Loader/> : <>
        

    <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
        <HStack spacing={"4"}>
            <Radio value={"inr"}>INR</Radio>
            <Radio value={"usd"}>USD</Radio>
            <Radio value={"eur"}>EUR</Radio>
        </HStack>
    </RadioGroup>

        <HStack wrap={"wrap"}
        justifyContent={"space-evenly"}>
            {
                Coins.map((i)=>(
                    <CoinCard 
                    key={i.id}
                    id ={i.id}
                    name={i.name} 
                    image={i.image}
                    symbol={i.symbol}
                    price={i.current_price}
                    currencySymbol={currencySymbol}
                     />
                )
            )}
        </HStack>

        <HStack 
        w={"full"}
        overflow={"auto"}
        p={"8"}>
            {
                btns.map((item, index) => (
                <Button
                key={index}
                backgroundColor={"blackAlpha.900"}
                color={"white"}
                onClick={() => changePage(index + 1)}>
                {index + 1}
                </Button>
  ))
}

        </HStack>
        </> }
    </Container>
  )
}

export default Coin


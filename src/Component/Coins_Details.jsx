import { useState,useEffect } from 'react';
import React  from 'react'
import Loader from './Loader';
import {HStack, Progress, Box, Container,RadioGroup,Radio,Stat,StatLabel, VStack,Text,Image, StatNumber, StatHelpText, StatArrow, Badge, Button } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { server } from "../index";
import Error from './Error';
import Chart from './Chart';


const Coins_Details = () => {
const params = useParams();
const [Coins,setCoins] = useState([]);
const [loading,setLoading] = useState(true);
const [error,setError] = useState(false);
const [page, setPage] = useState(1);
const [currency,setCurrency] = useState("inr");
const [Days,setDays] = useState("24h");
const [chartArray,setChartArray] = useState([]);

const currencySymbol = currency==="inr"?"₹": currency==="eur"?"€":"$";

const btns = ["24h","7d","14d","30d","60d","200d","365d","max"];

const switchCharStats =(val)=>{
  switch (val) {
      case "7d":
      setDays("7d");
      setLoading(true);
      break;

      case "14d":
      setDays("14d");
      setLoading(true);
      break;

      case "30d":
      setDays("30d");
      setLoading(true);
      break;

      case "60d":
      setDays("200d");
      setLoading(true);
      break;

      case "365d":
      setDays("365d");
      setLoading(true);
      break;

      case "max":
      setDays("max");
      setLoading(true);
      break;

    default:
      setDays("24h");
      setLoading(true);
      break;
  }
};

useEffect(() => {
  const fetchCoins = async () => {
    try {
      const { data } = await axios.get(`${server}/coins/${params.id}`);


      const {data:chartData} = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${Days}`);
      

      setCoins(data);
      setChartArray(chartData.prices);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };
  fetchCoins();
}, [params.id,currency,Days]);

 
  if(error) return <Error message ={"Error while fetching Coin"} />;

  return <Container maxW={"container.xl"}>
    {
      loading?<Loader />:(
        <>
        
        <Box width= {"full"} borderWidth={1}>
        <Chart arr={chartArray} currency={currencySymbol} days={Days} />
        </Box>

        <HStack p="4" wrap={"wrap"} overflowX={"auto"}>
          {
            btns.map((i)=>(
              <Button key={i} onClick={()=>switchCharStats(i)}>{i}</Button>
            
            ))
            }
        </HStack>
        <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
        <HStack spacing={"4"}>
            <Radio value={"inr"}>INR</Radio>
            <Radio value={"usd"}>USD</Radio>
            <Radio value={"eur"}>EUR</Radio>
        </HStack>
    </RadioGroup>


    <VStack spacing={"4"} p="16" alignItems={"flex-start"}>
            <Text fontSize={"small"} alignSelf="center" opacity={0.7}>
              Last Updated On{" "}
              {Date(Coins.market_data.last_updated).split("G")[0]}
            </Text>


      <Image src={Coins.image.large} w={"16"} h={"16"} objectFit={"contain"}/>
      
        <Stat>
          <StatLabel>{Coins.name}</StatLabel>
          <StatNumber>{currencySymbol}{Coins.market_data.current_price[currency]}
          </StatNumber>
          <StatHelpText>
            <StatArrow type={
              Coins.market_data.price_change_percentage_24h > 0 ? "increase" : "decrease"
            }/>
            {Coins.market_data.price_change_percentage_24h}%
          </StatHelpText>
        </Stat>
          <Badge fontSize={"2x1"} backgroundColor={"blackAlpha.800"} color={"white"}>
            {`#${Coins.market_cap_rank}`}
          </Badge>
    
            <CustomBar high={`${currencySymbol}${Coins.market_data.high_24h[currency]}`}
              low={`${currencySymbol}${Coins.market_data.low_24h[currency]}`}/>

            <Box w={"full"} p="4" >
              <Item title = {"Max Supply"} value={Coins.market_data.max_supply} />
              <Item title = {"Circulating Supply"} value={Coins.market_data.circulating_supply} />
              <Item title = {"Market Cap"} value={`${currencySymbol}${Coins.market_data.market_cap[currency]}`} />
              <Item title = {"All Time Low"} value={`${currencySymbol}${Coins.market_data.atl[currency]}`} />
            
              <Item title = {"All Time High"} value={`${currencySymbol}${Coins.market_data.ath[currency]}`} />
            </Box>
    
    
    </VStack>
        </>      
        
      )}
  </Container>
};


const Item =({title,value})=> (

  <HStack justifyContent={'space-between'} w={"full"} ny={"4"}>
    <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>{title}</Text>
    <Text>{value}</Text>
  </HStack>
);

const CustomBar = ({ high, low }) => {
  return (
    <VStack w={"full"}>
      <Progress value={50} colorScheme={"teal"} w={"full"} />
      <HStack justifyContent={"space-between"} w={"full"}>
        <Badge children={low} colorScheme={"red"} />
        <Text fontSize={"sm"}>24H Range</Text>
        <Badge children={high} colorScheme={"green"} />
      </HStack>
    </VStack>
  );
};

export default Coins_Details

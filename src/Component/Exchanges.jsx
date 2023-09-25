import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { server } from '..'
import { Container, HStack, Heading, VStack,Text,Image,Button } from '@chakra-ui/react';
import Loader from './Loader';
import Error from './Error';

const Exchanges = () => {

const [exchanges,setExchanges] = useState([]);
const [loading,setLoading] = useState(true);
const [page, setPage] = useState(1);
const [error,setError] = useState(false);


const btns = new Array(7).fill(1);

const changePage = async (page) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${server}exchanges?page=${page}`);
      setPage(page);
      setExchanges(data);
      window.scrollTo({ top: 0, behavior: "smooth" });
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };
  

useEffect(() => {
    
        const fetchExchanges = async ()=>{
            try{
            const { data } = await axios.get(`${server}exchanges?page=${page}`);
            setExchanges(data);
            setLoading(false);
          
        } catch(error)
        {
            setError(true);
            setLoading(false);
        }
    };
          fetchExchanges();
        },[page]);
  
if(error) return <Error message ={"error while fetching Exchanges"} />;

  return (
    <Container maxW={"container.xl"}>
        {loading? <Loader/> : <>
        
        <HStack wrap={"wrap"}
        justifyContent={"space-evenly"}>
            {
                exchanges.map((i)=>(
                    <ExchangeCard name={i.name} image={i.image} rank={i.trust_score_rank} url={i.url} />
                )
            )}
        </HStack>
     
        <HStack w={"full"} overflow={"auto"} p={"8"}  alignItems={"center"} justifyContent={"center"}>
  {btns.map((item, index) => (
    <Button
      key={index}
      backgroundColor={index + 1 === page ? "blue.500" : "blackAlpha.900"}
      color={index + 1 === page ? "white" : "gray.300"}
      onClick={() => changePage(index + 1)}
    >
      {index + 1}
    </Button>
  ))}
</HStack>
        </> }
    </Container>
  )
}


const ExchangeCard = ({name,image,rank,url}) => (
    <a href={url} target={"blank"}>
        <VStack w={"52"} shadow={"lg"} p={"8"} borderRadius={"lg"}
        transition={"all 0.3s"} m={"4"}
        css={{
            "&:hover":{
                transform:"scale(1.1)"
            }
        }}>
            <Image src={image} 
            w={"10"} 
            objectFit={"contain"} 
            alt={"Exchange"} />

            <Heading size={"md"} noOfLines={1}>{rank}</Heading>
            <Text noOfLines={1}>{name}</Text>
        </VStack>

    </a>

)


export default Exchanges


import React from 'react'
import {Box, Text, Stack, VStack,Avatar} from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom";
import AvatarSrc from "../assests/pic.png"

const Footrr = () => {
  return <Box bgColor={"blackAlpha.900"} color={"whiteAlpha.700"}
  minH={"48"} px={"16"} py={["16", "8"]}>


    <Stack
    direction={["columm","row"]}
    h={"full"}
    alignItems={"center"}
    >
        <VStack w={"full"} alignItems={["center","flex-start"]}>

        <Text fontWeight={"bold"}>About Us</Text>  
        <Text fontSize={"sm"}
            letterSpacing={"widest"}
            textAlign={["center", "left"]}>We strive to provide you with accurate, up-to-date information, insightful analysis, and valuable resources to help you make informed decisions in the crypto space.</Text>
        </VStack>

        <VStack>
          <RouterLink as={RouterLink} to="https://github.com/Kshitiz-monkecoder">
            <Avatar boxSize={"28"} mt={["4", "0"]} src={AvatarSrc} />
          </RouterLink>
          <Text>Our Founder</Text>
        </VStack>
    </Stack>

  </Box>
}

export default Footrr


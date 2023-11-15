import { Box, Button, Input, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios"

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import { CreateShortenerURL, GetShortenerURL } from "../Utilis/api";
const LinkCreater = () => {
   

const [data,setData]=useState([])
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl,setShortUrl]=useState("")
  const [finalLink,setFinalLink]=useState("")
const [flag,setFlag]=useState(false);
  const HandleSubmit=()=>{
    let obj={
        RedirectedUrl:longUrl,
        ShortenedUrl:shortUrl.toLowerCase(),
        createdAt:Date(),
        VisitedCount:0
    };

 CreateShortenerURL(obj).then((res)=>setFinalLink(res.data.msg))
   .catch((err)=>setFinalLink("Error"))

   setLongUrl("");
   setShortUrl("")
   setFlag(!flag)
  }


  useEffect(()=>{
GetShortenerURL().then(res=>setData(res.data))
  },[flag])

let url="https://url-shortener-jsff.onrender.com/";

  return (
    <Box w={"70%"} m={"auto"}>
      <Text fontSize={25} m={"10px"}>
        URL Shortener
      </Text>
      <Box>
      <Input
        m={"10px"}
        type="url"
        placeholder="Enter Your Long Url"
        name="url"
        value={longUrl}
        onChange={(e) => setLongUrl( e.target.value )}
        required
      ></Input>
      <Input

        m={"10px"}
        type="url"
        placeholder="Enter Your Short Url Endpoint"
        value={shortUrl}
        onChange={(e) => setShortUrl(e.target.value )}
        required
      ></Input>
      <Button display={"block"} m={"10px auto"} w={"30%"} onClick={HandleSubmit}>GENERATE LINK</Button>
      </Box>
      {finalLink && <Text m={"auto"} textTransform={"capitalize"}>{finalLink}</Text>}
      <TableContainer>
  <Table size='lg'>
    <Thead>
      <Tr>
        <Th>Time</Th>
        <Th >Short URl</Th>
        <Th>Long URL</Th>
 
      </Tr>
    </Thead>
    <Tbody >
      {data.length!=0 && data.map((el)=><Tr key={el._id}>
        <Td>{el.createdAt}</Td>
        <Td >{url}{el.ShortenedUrl}</Td>
        <Td >{el.RedirectedUrl}</Td>
  
      </Tr>)}
      
    </Tbody>
    
  </Table>
</TableContainer>
    </Box>
  );
};

export default LinkCreater;

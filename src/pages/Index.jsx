import React, { useState } from "react";
import { Box, Button, Flex, Heading, Image, Input, Stack, Text, VStack } from "@chakra-ui/react";
import { FaGavel, FaTag } from "react-icons/fa";

const products = [
  {
    id: 1,
    name: "Vintage Camera",
    image: "https://images.unsplash.com/photo-1601854266103-c1dd42130633?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwY2FtZXJhfGVufDB8fHx8MTcxNDUwODk3MHww&ixlib=rb-4.0.3&q=80&w=1080",
    description: "A perfect vintage camera for photography enthusiasts.",
    startingBid: 50,
    fixedPrice: 100,
  },
  {
    id: 2,
    name: "Antique Vase",
    image: "https://images.unsplash.com/photo-1474221550179-c492fb337327?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxhbnRpcXVlJTIwdmFzZXxlbnwwfHx8fDE3MTQ1MDg5NzF8MA&ixlib=rb-4.0.3&q=80&w=1080",
    description: "A beautiful antique vase to decorate your living room.",
    startingBid: 70,
    fixedPrice: 150,
  },
];

const Index = () => {
  const [bids, setBids] = useState({});

  const placeBid = (productId, bid) => {
    setBids((prevBids) => ({
      ...prevBids,
      [productId]: Math.max(bid, prevBids[productId] || 0),
    }));
  };

  return (
    <VStack spacing={8} p={5}>
      <Heading as="h1" size="xl">
        Marketplace Auction
      </Heading>
      {products.map((product) => (
        <Box key={product.id} p={5} shadow="md" borderWidth="1px">
          <Flex align="center">
            <Image boxSize="150px" objectFit="cover" src={product.image} alt={product.name} mr={4} />
            <Stack>
              <Text fontWeight="bold">{product.name}</Text>
              <Text>{product.description}</Text>
              <Text>Starting Bid: SAR {product.startingBid}</Text>
              <Text>Buy Now: SAR {product.fixedPrice}</Text>
              <Flex align="center">
                <Input placeholder="Enter your bid" width="100px" mr={2} type="number" onChange={(e) => placeBid(product.id, parseInt(e.target.value))} />
                <Button leftIcon={<FaGavel />} onClick={() => placeBid(product.id, bids[product.id] || product.startingBid)}>
                  Bid
                </Button>
                <Button leftIcon={<FaTag />} ml={2} colorScheme="green">
                  Buy Now
                </Button>
              </Flex>
              <Text fontWeight="bold">Highest Bid: SAR {bids[product.id] || product.startingBid}</Text>
            </Stack>
          </Flex>
        </Box>
      ))}
    </VStack>
  );
};

export default Index;

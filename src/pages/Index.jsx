import React, { useState, useEffect } from "react";
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

const translations = {
  en: {
    marketplaceAuction: "Marketplace Auction",
    startingBid: "Starting Bid: SAR",
    buyNow: "Buy Now",
    bid: "Bid",
    highestBid: "Highest Bid: SAR",
    enterYourBid: "Enter your bid",
  },
  ar: {
    marketplaceAuction: "مزاد السوق",
    startingBid: "المزايدة الابتدائية: ر.س",
    buyNow: "اشترِ الآن",
    bid: "مزايدة",
    highestBid: "أعلى مزايدة: ر.س",
    enterYourBid: "أدخل مزايدتك",
  },
};

const Index = () => {
  const [bids, setBids] = useState({});
  const [language, setLanguage] = useState("en");
  const [text, setText] = useState(translations.en);

  useEffect(() => {
    setText(translations[language]);
  }, [language]);

  const placeBid = (productId, bid) => {
    setBids((prevBids) => ({
      ...prevBids,
      [productId]: Math.max(bid, prevBids[productId] || 0),
    }));
  };

  return (
    <VStack spacing={8} p={5}>
      <Button onClick={() => setLanguage(language === "en" ? "ar" : "en")} mb={4}>
        {language === "en" ? "عربي" : "English"}
      </Button>
      <Heading as="h1" size="xl" style={{ direction: language === "ar" ? "rtl" : "ltr" }}>
        {text.marketplaceAuction}
      </Heading>
      {products.map((product) => (
        <Box key={product.id} p={5} shadow="md" borderWidth="1px">
          <Flex align="center">
            <Image boxSize="150px" objectFit="cover" src={product.image} alt={product.name} mr={4} />
            <Stack>
              <Text fontWeight="bold">{product.name}</Text>
              <Text>{product.description}</Text>
              <Text>
                {text.startingBid} {product.startingBid}
              </Text>
              <Text>
                {text.buyNow}: SAR {product.fixedPrice}
              </Text>
              <Flex align="center" direction={language === "ar" ? "rtl" : "ltr"}>
                <Input placeholder={text.enterYourBid} width="100px" mr={2} type="number" onChange={(e) => placeBid(product.id, parseInt(e.target.value))} />
                <Button leftIcon={<FaGavel />} onClick={() => placeBid(product.id, bids[product.id] || product.startingBid)}>
                  {text.bid}
                </Button>
                <Button leftIcon={<FaTag />} ml={2} colorScheme="green">
                  {text.buyNow}
                </Button>
              </Flex>
              <Text fontWeight="bold">
                {text.highestBid} {bids[product.id] || product.startingBid}
              </Text>
            </Stack>
          </Flex>
        </Box>
      ))}
    </VStack>
  );
};

export default Index;

import React, { useState } from 'react';
import { 
  Card, 
  CardHeader, 
  CardBody, 
  Stack, 
  Heading, 
  Box, 
  StackDivider, 
  Text, 
  Button, 
  Badge 
} from '@chakra-ui/react';
// import { DownloadIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { useFirebase } from '../context/Firebase';

const CustomCard = ({ abstract, email, journal, manuscriptsDocURL, name, title, date, paperID }) => {
  const firebase = useFirebase();
  const downloadManuscript = (manuscriptsDocURL, title) => {
    firebase.downloadManuscript(manuscriptsDocURL, title);
  };

  const [showFullText, setShowFullText] = useState(false);

  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  return (
    <Box m={4} _hover={{ boxShadow: 'lg' }} transition="all 0.2s">
      <Card bg="white" shadow="xl" borderRadius="lg" overflow="hidden" border="1px" borderColor="gray.200">
        <CardHeader bg="red.500" color="white" p={6}>
          <Heading size={[,"lg",'md']} fontFamily={"sans-serif"}>{title}</Heading>
          {/* <Text fontSize="lg" mt={2}>{journal}</Text> */}
        </CardHeader>

        <CardBody p={6}>
          <Stack divider={<StackDivider borderColor="gray.200" />} spacing={6}>
            <Box>
              <Heading size='md'>Paper ID</Heading>
              <Text pt={2} fontSize='lg'>
                {paperID}
              </Text>
            </Box>
            <Box>
              <Heading size='md'>Author</Heading>
              <Text pt={2} fontSize='lg'>
                {name}
              </Text>
            </Box>

            <Box>
              <Heading size='md'>Abstract</Heading>
              <Text
                pt={2}
                fontSize='md'
                noOfLines={showFullText ? null : 3}
              >
                {abstract}
              </Text>
              <Box width={"100%"} display={"flex"} justifyContent={"center"}>
                <Button 
                  mt={2} 
                  size="sm" 
                  variant="ghost" 
                  onClick={toggleText} 
                  // rightIcon={showFullText ? <ChevronUpIcon /> : <ChevronDownIcon />}
                >
                  {showFullText ? 'Show Less' : 'Show More'}
                </Button>
              </Box>
            </Box>

            <Box>
              <Heading size='md'>Contact</Heading>
              <Text pt={2} fontSize='md'>
                {email}
              </Text>
            </Box>

            <Box>
              <Heading size='md'>Date</Heading>
              <Text pt={2} fontSize='md'>
                {date}
              </Text>
            </Box>

            <Box textAlign="center">
              <Button 
                onClick={() => downloadManuscript(manuscriptsDocURL, title)} 
                colorScheme="red" 
                fontSize="1em" 
                p={2} 
                // leftIcon={<DownloadIcon />}
              >
                Download Manuscript
              </Button>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </Box>
  );
};

export default CustomCard;

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
  Badge, 
  useToast
} from '@chakra-ui/react';
// import { DownloadIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { useFirebase } from '../context/Firebase';
// import { sendCopyrightMail } from '../helpers/sendCopyrightMail';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CustomCard = ({ abstract, email, journal, manuscriptsDocURL, name, title, date, paperID }) => {
  const params=useParams()
  const toast=useToast()
  const firebase = useFirebase();
  const downloadManuscript = (manuscriptsDocURL, title) => {
    firebase.downloadManuscript(manuscriptsDocURL, title);
  };

  const [showFullText, setShowFullText] = useState(false);

  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  const sendCopyrightMail=async(name,paperID,title,params,email)=>{
    console.log("in sendCopyrightMail"+ email)
    const jounralID=params.id
    console.log(jounralID)
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/sendCopyrightFormEmailFromAdminPanel`,{name,paperID,title,jounralID,email});
      toast({
        title: `We have send the link for the publishing agreement to the ${name} with paper id ${paperID}`,
        position: "top",
        status: 'success',
        duration: 9000,
        isClosable: true,
    });
} catch (error) {
    console.error("Error submitting agreement: ", error);
    toast({
        title: 'There was an issue sending the mail to the user',
        position: "top",
        status: 'error',
        duration: 9000,
        isClosable: true,
    });
}
  }

  return (
    <Box m={4} _hover={{ boxShadow: 'lg' }} transition="all 0.2s">
      <Card bg="white" shadow="xl" borderRadius="lg" overflow="hidden" border="1px" borderColor="gray.200">
        <CardHeader display={"flex"} gap={'1'} justifyContent={"space-between"} bg="red.500" color="white" p={6}>
          <Heading size={[,"lg",'md']} maxWidth={"550"}  fontFamily={"sans-serif"}>{title}</Heading>
          <Button onClick={()=>sendCopyrightMail(name,paperID,title,params,email)}>Send Mail</Button>
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

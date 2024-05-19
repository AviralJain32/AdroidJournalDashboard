import React from 'react'
import { Card, CardHeader, CardBody, Stack, Heading, Box, StackDivider, Text, Link, Badge, Button } from '@chakra-ui/react'
import { useFirebase } from '../context/Firebase'

const CustomCard = ({ abstract, email, journal, manuscriptsDocURL, name, title, date }) => {
    const firebase=useFirebase();
    const downloadManuScript=(manuscriptsDocURL,title)=>{
        firebase.downloadManuscript(manuscriptsDocURL,title)
    }
  return (
    <Box m={4} >
      <Card bg="white" shadow="xl" borderRadius="lg" overflow="hidden" border="1px" borderColor="gray.200">
        <CardHeader bg="red.500" color="white" p={6}>
          <Heading size='lg'>{title}</Heading>
          <Text fontSize="lg" mt={2}>{journal}</Text>
        </CardHeader>

        <CardBody p={6}>
          <Stack divider={<StackDivider borderColor="gray.200" />} spacing={6}>
            <Box>
              <Heading size='md'>Author</Heading>
              <Text pt={2} fontSize='lg'>
                {name}
              </Text>
            </Box>

            <Box>
              <Heading size='md'>Abstract</Heading>
              <Text pt={2} fontSize='md' noOfLines={3}>
                {abstract}
              </Text>
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
              {/* <Link href={manuscriptsDocURL} isExternal> */}
                <Button onClick={()=>downloadManuScript(manuscriptsDocURL,title)} colorScheme="red" fontSize="1em" p={2}>
                  Download Manuscript
                </Button>
              {/* </Link> */}
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </Box>
  )
}

export default CustomCard

import { Heading, WrapItem, Container, Grid, GridItem, Stack, Box, Flex, Spacer, Avatar, Text } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
        <Container maxW="container.xl" py={8}>
      {/* Header */}
      <Flex alignItems="center" mb={8} py={4} borderBottom="1px" borderColor="gray.200">
        <Avatar size="lg" name="Adroid Publications" mr={4} />
        <Heading as='h1' size='lg'>
          Adroid Publications Dashboard
        </Heading>
        <Spacer />
        {/* <Text fontSize="lg" color="gray.600">
          Welcome, [User Name]
        </Text> */}
      </Flex>

      {/* <Heading as='h2' size='2xl' mb={8} textAlign="center">
        Submissions
      </Heading> */}


      <Outlet/>

    </Container>
  )
}

export default App;

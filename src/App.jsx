import { Heading, WrapItem, Container, Grid, GridItem, Stack, Box, Flex, Spacer, Avatar, Text } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
        <Container maxW={"90vw"} py={8}>
      {/* Header */}
      <Flex alignItems="center" mb={8} py={4} >
        <Avatar size="lg" name="Adroid Publications" mr={4} />
        <Heading as='h1' size='lg'>
          Adroid Publications Dashboard
        </Heading>
        {/* <Spacer /> */}
      </Flex>
      <Outlet/>

    </Container>
  )
}

export default App;

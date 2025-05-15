import {
  Heading,
  Container,
  Flex,
  Avatar,
  Button,
  Spacer,
} from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();

  return (
    <Container maxW={"90vw"} py={8}>
      {/* Header */}
      <Flex alignItems="center" mb={8} py={4}>
        <Avatar size="lg" name="Adroid Publications" mr={4} />
        <Heading as='h1' size='lg'>
          Adroid Publications Dashboard
        </Heading>
        <Spacer />
        <Button colorScheme="blue" onClick={() => navigate("/adroidFoundation")}>
          Add Adroid Program
        </Button>
      </Flex>

      <Outlet />
    </Container>
  );
};

export default App;

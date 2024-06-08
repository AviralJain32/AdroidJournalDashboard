import React from 'react';
import { useFirebase } from '../context/Firebase';
import { Box, Button, Stack, Center, Container, Wrap } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const ButtonsPage = () => {
  const navigate = useNavigate();
    const { journals } = useFirebase();


  return (
      <Container maxW="container.xl">
        <Stack direction="column" spacing="24px" align="center">
          {journals?.map((journal, index) => (
            <Box key={index} w={["90%","90%","60%"]} h="10rem">
              <Button colorScheme="red" w="100%" h="100%" sx={{"textWrap":"wrap"}} size={"lg"} onClick={()=>navigate(`/journal/${journal.shortForm}`)}>
                {journal.shortForm} ({journal.title})
              </Button>
            </Box>
          ))}
        </Stack>
      </Container>
  )
}

export default ButtonsPage

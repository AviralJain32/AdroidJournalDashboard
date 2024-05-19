import { Heading, WrapItem, Container, Grid, GridItem, Stack, Box, Flex, Spacer, Avatar, Text } from "@chakra-ui/react";
import Card from "./components/card";
import { useFirebase } from "./context/Firebase";
import { useState, useEffect } from "react";

function App() {
  const { Submissions } = useFirebase();
  const [sortedSubmissions, setSortedSubmissions] = useState([]);

  // Helper function to parse date string into Date object
  function parseDate(dateStr) {
    // Normalize the date string to handle different ordinal suffixes
    dateStr = dateStr.replace(/(\d+)(st|nd|rd|th)/, '$1');
    return new Date(dateStr);
  }

  // Function to sort documents by date
  function getMostRecentDocument(documents) {
    // Check if the documents array is empty
    if (documents.length === 0) {
      return [];
    }

    // Sort the documents by the parsed date in descending order
    return documents.sort((a, b) => parseDate(b.date) - parseDate(a.date));
  }

  // useEffect to update sorted submissions when Submissions changes
  useEffect(() => {
    if (Submissions && Submissions.length > 0) {
      const sortedDocs = getMostRecentDocument(Submissions);
      setSortedSubmissions(sortedDocs);
    }
  }, [Submissions]);

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

      <Heading as='h2' size='2xl' mb={8} textAlign="center">
        Submissions
      </Heading>

      <Stack spacing={6}>
        <Box>
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(2, 1fr)' }} gap={6}>
            {sortedSubmissions.map((submission) => (
              <GridItem key={submission.id}>
                <Card {...submission} />
              </GridItem>
            ))}
          </Grid>
        </Box>
      </Stack>
    </Container>
  );
}

export default App;

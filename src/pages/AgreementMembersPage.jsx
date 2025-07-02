import {
  Heading,
  Text,
  Grid,
  GridItem,
  Box,
  Stack,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import App from "../App";
import Card from "./Card";

const db = getFirestore(App);

const AgreementMemberPage = () => {
  const { id } = useParams(); // e.g., 'ijaimd'
  const collectionName = `${id.toLowerCase()}Agreement`; // e.g., 'ijaimdAgreement'

  const [agreements, setAgreements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgreements = async () => {
      try {
        const colRef = collection(db, collectionName);
        const snapshot = await getDocs(colRef);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAgreements(data);
      } catch (error) {
        console.error("Error fetching agreements:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgreements();
  }, [collectionName]);

  return (
    <Box>
      <Heading as="h2" size="xl" mb={6} textAlign="center">
        {id.toUpperCase()} Agreement Submissions
      </Heading>

      {loading ? (
        <Center py={20}>
          <Spinner size="xl" color="blue.500" />
        </Center>
      ) : agreements.length > 0 ? (
        <Stack spacing={6}>
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
            {agreements.map((agreement) => (
              <GridItem key={agreement.id}>
                <Card {...agreement} />
              </GridItem>
            ))}
          </Grid>
        </Stack>
      ) : (
        <Text textAlign="center" fontSize="xl" color="gray.500">
          No Agreements Found
        </Text>
      )}
    </Box>
  );
};

export default AgreementMemberPage;

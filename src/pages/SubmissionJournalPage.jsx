import { Heading, WrapItem, Container, Grid, GridItem, Stack, Box, Flex, Spacer, Avatar, Text } from "@chakra-ui/react";
import Card from "../components/Card";
import { useState, useEffect } from "react";
import { useFirebase } from "../context/Firebase";
import { useParams } from "react-router-dom";

const SubmissionJournalPage = () => {
    const { Submissions, journals } = useFirebase();
    const { id: journalShortForm } = useParams();
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

    useEffect(() => {
        if (Submissions && journals && journalShortForm) {
            // Find the journal that matches the short form
            const matchingJournal = journals.find(journal => journal.shortForm === journalShortForm);

            if (matchingJournal) {
                // Filter submissions by the matching journal title
                const filteredSubmissions = Submissions.filter(submission => submission.journal === matchingJournal.title);

                // Sort the filtered submissions by date
                const sortedDocs = getMostRecentDocument(filteredSubmissions);
                setSortedSubmissions(sortedDocs);
            }
        }
    }, [Submissions, journals, journalShortForm]);

    return (
        <>
        <Heading as='h2' size='2xl' mb={8} textAlign="center">
            {journalShortForm} Submissions
        </Heading>
        {sortedSubmissions.length > 0 ? (
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
         ) : (<Text textAlign="center" fontSize="xl" color="gray.500">No Submissions Present</Text>)}
        </>
    )
}

export default SubmissionJournalPage;


import {
  Box,
  Text,
  Heading,
  Stack,
  Badge,
  Icon,
  Flex,
  Divider,
} from "@chakra-ui/react";
import {
  Mail,
  Calendar,
  User,
  Phone,
  Building,
  FileText,
  List,
  Landmark,
  MapPin,
} from "lucide-react";

const Card = ({
  correspondingAuthorName,
  email,
  phone,
  manuscriptTitle,
  authorNames,
  affiliation,
  address,
  signatureDate,
  submittedAt,
  agreementVersion,
}) => {
  return (
    <Box
      p={6}
      borderWidth="1px"
      borderRadius="lg"
      bg="white"
      boxShadow="md"
      _hover={{ boxShadow: "lg", borderColor: "blue.400" }}
      transition="0.3s"
    >
      <Stack spacing={4}>
        {/* Header */}
        <Flex justify="space-between" align="center">
          <Heading size="md" color="blue.600">
            {manuscriptTitle || "Untitled Manuscript"}
          </Heading>
          <Badge colorScheme="blue">{agreementVersion}</Badge>
        </Flex>

        <Divider />

        {/* Author Info */}
        <Stack spacing={2}>
          <Flex align="center">
            <Icon as={User} boxSize={4} mr={2} color="gray.500" />
            <Text fontWeight="medium">{correspondingAuthorName}</Text>
          </Flex>

          <Flex align="center">
            <Icon as={Mail} boxSize={4} mr={2} color="gray.500" />
            <Text>{email}</Text>
          </Flex>

          {phone && (
            <Flex align="center">
              <Icon as={Phone} boxSize={4} mr={2} color="gray.500" />
              <Text>{phone}</Text>
            </Flex>
          )}

          <Flex align="center">
            <Icon as={Building} boxSize={4} mr={2} color="gray.500" />
            <Text>{affiliation}</Text>
          </Flex>

          <Flex align="center">
            <Icon as={MapPin} boxSize={4} mr={2} color="gray.500" />
            <Text>{address}</Text>
          </Flex>
        </Stack>

        <Divider />

        {/* Authors & Dates */}
        <Stack spacing={2}>
          <Flex align="center">
            <Icon as={List} boxSize={4} mr={2} color="gray.500" />
            <Text>Authors: {authorNames}</Text>
          </Flex>

          <Flex align="center">
            <Icon as={Calendar} boxSize={4} mr={2} color="gray.500" />
            <Text>
              Signature Date:{" "}
              {new Date(signatureDate).toLocaleDateString("en-IN")}
            </Text>
          </Flex>

          <Flex align="center">
            <Icon as={Calendar} boxSize={4} mr={2} color="gray.500" />
            <Text>
              Submitted At:{" "}
              {new Date(submittedAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </Text>
          </Flex>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Card;

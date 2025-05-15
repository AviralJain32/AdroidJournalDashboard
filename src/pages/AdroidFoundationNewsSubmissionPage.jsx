import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { useFirebase } from '../context/Firebase';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Image,
  useToast,
} from '@chakra-ui/react';

const AdroidProgramForm = () => {
  const { addProgramForAdroidFoundations, uploadImageToStorage } = useFirebase();

  const [date, setDate] = useState('');
  const [headingText, setHeadingText] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  console.log(date)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!headingText || !description || !date) {
      toast({
        title: "Please fill all required fields.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setLoading(true);
      let imageUrl = '';

      if (imageFile) {
        imageUrl = await uploadImageToStorage(imageFile);
      }

      await addProgramForAdroidFoundations({
        date,
        heading: headingText,
        imageUrl,
        description,
      });

      toast({
        title: "Program submitted successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Reset form
      setDate('');
      setHeadingText('');
      setImageFile(null);
      setDescription('');
    } catch (error) {
      console.error('Submission failed:', error);
      toast({
        title: "Submission failed.",
        description: "Something went wrong. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="800px" mx="auto" p={6} borderRadius="md" boxShadow="md" bg="white">
      <Heading mb={6} textAlign="center" fontSize="2xl">
        Add Adroid Program
      </Heading>

      <form onSubmit={handleSubmit}>
        <VStack spacing={5} align="stretch">
          <FormControl isRequired>
            <FormLabel>Date</FormLabel>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Heading</FormLabel>
            <Input
              placeholder="Program Title"
              value={headingText}
              onChange={(e) => setHeadingText(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Upload Image</FormLabel>
            <Input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
            {imageFile && (
              <Image
                src={URL.createObjectURL(imageFile)}
                alt="Preview"
                mt={3}
                maxH="200px"
                objectFit="contain"
              />
            )}
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Program Description</FormLabel>
            <ReactQuill
              value={description}
              onChange={setDescription}
              style={{ height: '200px', marginBottom: '20px' }}
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme="blue"
            isLoading={loading}
            loadingText="Submitting..."
            size="lg"
          >
            Submit
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default AdroidProgramForm;

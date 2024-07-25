import React, { useEffect } from 'react';
import { useId } from 'react';
import uniqid from 'uniqid';
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  FormControl, 
  FormLabel, 
  Input, 
  Textarea, 
  Button, 
  VStack, 
  FormErrorMessage, 
  FormHelperText, 
  useToast, 
  Select
} from '@chakra-ui/react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useFirebase } from '../context/Firebase';
import moment from 'moment';
import { useParams } from 'react-router-dom';


const SubmitPaperForm = () => {
  const {createNewPublicationListing} = useFirebase();
  const toast = useToast();

  const params=useParams()
  console.log(params.id)

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
    watch
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'papers',
  });

  const typeOfArticle = ["Review Article", "Research Article"];

  const onSubmit = async (data) => {
    try {
      const {issueTitle,journalImage,issueName,guestEditor,aboutConference,papers}=data
      console.log(papers)
      const countOfPaper=[]
      const newPapers=papers.map((paper)=>{
        const id=uniqid()
        const countObj={
          articleId:id,
          articleOpenCount:0,
          manuscriptDownloadCount:0,
        }
        countOfPaper.push(countObj)
        return {
          ...paper,
          articleId:id
        }
      })
      const response=await createNewPublicationListing(params.id,issueTitle,journalImage[0],issueName,guestEditor,aboutConference,newPapers,countOfPaper)
      toast({
        title: response.success==true? 'Publication Submitted Successfully':"Publication failed",
        description: response.message,
        status: response.success==true ? "success":"error",
        duration: 9000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: 'Publication not Submitted',
        description: `There is the error while submitting the publication with issue `+error,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      console.log("Error while Submiting the form data : ",error)
    }
  };
  const typeOfIssue=["Special Issue"]
  const selectedTypeOfIssue = watch(`typeOfIssue`);
  return (
    <Container maxW="container.lg" p={6}>
      <Box 
        display="flex" 
        flexDirection="column" 
        justifyContent="center" 
        alignItems="center" 
        fontFamily="body" 
        w="full" 
        mb={10}
      >
        <Heading size="xl" mb={3}>Issue for the Journal</Heading>
      </Box>

      <Box p={6} borderRadius="md" bg="gray.100">
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4}>
            
            {/* ISSUE TITLE */}
            <FormControl isInvalid={errors.issueTitle}>
              <FormLabel mt={1} fontSize="lg" color="black">Issue Title</FormLabel>
              <Input 
                type="text" 
                focusBorderColor="teal.300" 
                placeholder="Enter Issue Title" 
                bg="white" 
                color="black" 
                fontSize="md" 
                {...register('issueTitle', {
                  required: 'Issue Title is a required field',
                  minLength: { value: 4, message: 'Please Enter a Valid Issue Title' },
                })} 
              />
              {errors.issueTitle && (
                <FormErrorMessage>{errors.issueTitle.message}</FormErrorMessage>
              )}
              <FormHelperText>Enter Issue Title like VOL. 5 NO. 1 (2024) </FormHelperText>

            </FormControl>

           {/* ISSUE Journal Image */}
            <FormControl isInvalid={errors.journalImage}>
                <FormLabel mt={1} fontSize="lg" color="black">Issue Journal Image</FormLabel>
                <Input 
                    type="file" 
                    p={1} 
                    focusBorderColor="teal.300" 
                    bg="white" 
                    color="black" 
                    fontSize="md" 
                    accept="image/*" 
                    {...register(`journalImage`, {
                        validate: {
                            acceptedFormats: (files) =>
                                ["image/jpeg", "image/png", "image/gif"].includes(
                                    files[0]?.type
                                ) || "Only JPEG, PNG, and GIF formats are allowed",
                        },
                    })} 
                />
                {errors.journalImage && (
                    <FormErrorMessage>{errors.journalImage.message}</FormErrorMessage>
                )}
                {!errors.journalImage && (
                    <FormHelperText>Upload journal Image in JPEG, PNG, or GIF format only</FormHelperText>
                )}
            </FormControl>


              {/* ISSUE PAPER TYPE */}
              <FormControl isInvalid={errors.typeOfIssue} id="name">
                    <FormLabel mt={1} fontSize="lg" color="black" _disabled>Select the type of Article</FormLabel>
                    <Select 
                      variant='filled' 
                      borderColor='teal.300' 
                      bgColor="white" 
                      placeholder='Select type of Issue' 
                      {...register(`typeOfIssue`, {
                        // required: 'Please Select a type of article',
                      })}
                    >
                      {typeOfIssue.map((issueType, idx) => (
                        <option key={idx} value={issueType}>{issueType}</option>
                      ))}
                    </Select>
                    {errors.typeOfIssue && (
                      <FormErrorMessage>{errors.typeOfIssue.message}</FormErrorMessage>
                    )}
                  </FormControl> 


                  {/* Issue Name*/}
                  {selectedTypeOfIssue === "Special Issue" && (
                    <>
                      <FormControl isInvalid={errors.issueName}>
                        <FormLabel mt={1} fontSize="lg" color="black">Special Issue Name</FormLabel>
                        <Input 
                          focusBorderColor="teal.300" 
                          placeholder="Enter Special Issue Name" 
                          bg="white" 
                          color="black" 
                          fontSize="md" 
                          {...register(`issueName`, {
                            // required: 'Guest Editor is a required field',
                            // minLength: { value: 4, message: 'Please Enter a Valid Guest Editor' },
                          })} 
                        />
                        {errors.issueName && (
                          <FormErrorMessage>{errors.issueName.message}</FormErrorMessage>
                        )}
                      </FormControl>

                      <FormControl isInvalid={errors.guestEditor}>
                        <FormLabel mt={1} fontSize="lg" color="black">Guest Editors</FormLabel>
                        <Textarea 
                          focusBorderColor="teal.300" 
                          placeholder="Enter Guest Editors" 
                          bg="white" 
                          color="black" 
                          fontSize="md" 
                          {...register(`guestEditor`, {
                            // required: 'Guest Editor is a required field',
                            // minLength: { value: 4, message: 'Please Enter a Valid Guest Editor' },
                          })} 
                        />
                    <FormHelperText>Seperate Guest Editor Field with - . Eg : Dr. Avimanyou Vatsa, Fairleigh Dickinson University, USA - dr. ABCD,USA</FormHelperText>
                        {errors.guestEditor && (
                          <FormErrorMessage>{errors.guestEditor.message}</FormErrorMessage>
                        )}
                      </FormControl>

                      <FormControl isInvalid={errors.aboutConference}>
                        <FormLabel mt={1} fontSize="lg" color="black">Enter About Conference</FormLabel>
                        <Textarea 
                          focusBorderColor="teal.300" 
                          placeholder="Enter About Conference" 
                          bg="white" 
                          color="black" 
                          fontSize="md" 
                          {...register(`aboutConference`, {
                            // required: 'About Conference is a required field',
                            // minLength: { value: 4, message: 'Please Enter Valid Information About the Conference' },
                          })} 
                        />
                        {errors.aboutConference && (
                          <FormErrorMessage>{errors.aboutConference.message}</FormErrorMessage>
                        )}
                      </FormControl>
                    </>
                  )}

            <Box>
              <Heading size="lg" fontWeight="semibold">Add Papers</Heading>
            </Box>

            {fields.map((field, index) => {
              return (
                <Box key={field.id} p={4} bg="white" borderRadius="md" boxShadow="md" w="100%">
                  <Heading size="md" mb={4}>Paper {index + 1}</Heading>

                  {/* ISSUE PAPER TYPE */}
                  <FormControl isInvalid={errors.papers?.[index]?.typeOfArticle} id="name">
                    <FormLabel mt={1} fontSize="lg" color="black">Select the type of Article</FormLabel>
                    <Select 
                      variant='filled' 
                      borderColor='teal.300' 
                      bgColor="white" 
                      placeholder='Select article' 
                      {...register(`papers.${index}.typeOfArticle`, {
                        // required: 'Please Select a type of article',
                      })}
                    >
                      {typeOfArticle.map((articleType, idx) => (
                        <option key={idx} value={articleType}>{articleType}</option>
                      ))}
                    </Select>
                    {errors.papers?.[index]?.typeOfArticle && (
                      <FormErrorMessage>{errors.papers?.[index]?.typeOfArticle.message}</FormErrorMessage>
                    )}
                  </FormControl> 

                  {/* Paper Title */}
                  <FormControl isInvalid={errors.papers?.[index]?.title}>
                    <FormLabel mt={1} fontSize="lg" color="black">Paper Title</FormLabel>
                    <Input 
                      type="text" 
                      focusBorderColor="teal.300" 
                      placeholder="Enter Paper Title" 
                      bg="white" 
                      color="black" 
                      fontSize="md" 
                      {...register(`papers.${index}.title`, {
                        // required: 'Paper Title is a required field',
                        // minLength: { value: 4, message: 'Please Enter a Valid Paper Title' },
                      })} 
                    />
                    {errors.papers?.[index]?.title && (
                      <FormErrorMessage>{errors.papers[index].title.message}</FormErrorMessage>
                    )}
                  </FormControl>

                  {/* Paper Authors */}
                  <FormControl isInvalid={errors.papers?.[index]?.authors}>
                    <FormLabel mt={1} fontSize="lg" color="black">Paper Authors</FormLabel>
                    <Textarea 
                      type="text" 
                      focusBorderColor="teal.300" 
                      placeholder="Enter Paper Authors" 
                      bg="white" 
                      color="black" 
                      fontSize="md" 
                      {...register(`papers.${index}.authors`, {
                        // required: 'Paper Authors are required field',
                        // minLength: { value: 4, message: 'Please Enter Valid Paper Authors' },
                      })} 
                    />
                    {errors.papers?.[index]?.authors && (
                      <FormErrorMessage>{errors.papers[index].authors.message}</FormErrorMessage>
                    )}
                    <FormHelperText>Seperate paper Author With $$ .Eg: Vishesh Baghel $$ Department of Computer Science and Engineering $$ ABC</FormHelperText>
                  </FormControl>

                  {/* Paper Corresponding Author */}
                  <FormControl isInvalid={errors.papers?.[index]?.correspondingAuthor}>
                    <FormLabel mt={1} fontSize="lg" color="black">Corresponding Author</FormLabel>
                    <Input 
                      type="text" 
                      focusBorderColor="teal.300" 
                      placeholder="Enter Corresponding Author" 
                      bg="white" 
                      color="black" 
                      fontSize="md" 
                      {...register(`papers.${index}.correspondingAuthor`, {
                        // required: 'Paper Authors are required field',
                        // minLength: { value: 4, message: 'Please Enter Valid Paper Authors' },
                      })} 
                    />
                    {errors.papers?.[index]?.correspondingAuthor && (
                      <FormErrorMessage>{errors.papers[index].correspondingAuthor.message}</FormErrorMessage>
                    )}
                    <FormHelperText>Seperate corresponding paper Author With $$ .Eg: Vishesh Baghel $$ Department of Computer Science and Engineering $$ ABC</FormHelperText>

                  </FormControl>


                   {/* Paper Keyword */}
                   <FormControl isInvalid={errors.papers?.[index]?.keywords}>
                    <FormLabel mt={1} fontSize="lg" color="black">Paper Keywords</FormLabel>
                    <Textarea 
                      type="text" 
                      focusBorderColor="teal.300" 
                      placeholder="Enter paper keywords" 
                      bg="white" 
                      color="black" 
                      fontSize="md" 
                      {...register(`papers.${index}.keywords`, {
                        // required: 'Paper Authors are required field',
                        // minLength: { value: 4, message: 'Please Enter Valid Paper Authors' },
                      })} 
                    />
                    {errors.papers?.[index]?.keywords && (
                      <FormErrorMessage>{errors.papers[index].keywords.message}</FormErrorMessage>
                    )}
                    <FormHelperText>Paste as it is seperated by commas</FormHelperText>
                  </FormControl>

                  {/* Paper DOI */}
                  <FormControl isInvalid={errors.papers?.[index]?.doi}>
                    <FormLabel mt={1} fontSize="lg" color="black">Paper DOI</FormLabel>
                    <Input 
                      type="text" 
                      focusBorderColor="teal.300" 
                      placeholder="Enter DOI" 
                      bg="white" 
                      color="black" 
                      fontSize="md" 
                      {...register(`papers.${index}.doi`, {
                        // required: 'Paper DOI is a required field',
                        // minLength: { value: 4, message: 'Please Enter a Valid Paper DOI' },
                        
                      })} 
                    />
                    {errors.papers?.[index]?.doi && (
                      <FormErrorMessage>{errors.papers[index].doi.message}</FormErrorMessage>
                    )}
                    <FormHelperText>Enter Link</FormHelperText>

                  </FormControl>

                  {/* Paper Abstract */}
                  <FormControl isInvalid={errors.papers?.[index]?.abstract}>
                    <FormLabel mt={1} fontSize="lg" color="black">Paper Abstract</FormLabel>
                    <Textarea 
                      focusBorderColor="teal.300" 
                      placeholder="Enter Paper Abstract" 
                      bg="white" 
                      color="black" 
                      fontSize="md" 
                      {...register(`papers.${index}.abstract`, {
                        // required: 'Paper Abstract is a required field',
                        // minLength: { value: 4, message: 'Please Enter a Valid Paper Abstract' },
                      })} 
                    />
                    {errors.papers?.[index]?.abstract && (
                      <FormErrorMessage>{errors.papers[index].abstract.message}</FormErrorMessage>
                    )}
                    <FormHelperText>Paste as it is</FormHelperText>
                  </FormControl>

                  {/* Manuscript Upload */}
                  <FormControl isInvalid={errors.papers?.[index]?.manuscripts}>
                    <FormLabel mt={1} fontSize="lg" color="black">Manuscript</FormLabel>
                    <Input 
                      type="file" 
                      p={1} 
                      focusBorderColor="teal.300" 
                      bg="white" 
                      color="black" 
                      fontSize="md" 
                      {...register(`papers.${index}.manuscripts`, {
                        validate: {
                          acceptedFormats: (files) =>
                            ["application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/pdf"].includes(
                              files[0]?.type
                            ) || "Only PDF and Document formats are allowed",
                        },
                      })} 
                    />
                    {errors.papers?.[index]?.manuscripts && (
                      <FormErrorMessage>{errors.papers[index].manuscripts.message}</FormErrorMessage>
                    )}
                    {!errors.papers?.[index]?.manuscripts && (
                      <FormHelperText>Upload manuscript in document or PDF format only</FormHelperText>
                    )}
                  </FormControl>

                  {/* Paper References */}
                  <FormControl isInvalid={errors.papers?.[index]?.references}>
                    <FormLabel mt={1} fontSize="lg" color="black">References</FormLabel>
                    <Textarea 
                      focusBorderColor="teal.300" 
                      placeholder="Enter References" 
                      bg="white" 
                      color="black" 
                      fontSize="md" 
                      {...register(`papers.${index}.references`, {
                        // required: 'References is a required field',
                        // minLength: { value: 4, message: 'Please Enter Valid References' },
                      })} 
                    />
                    {errors.papers?.[index]?.references && (
                      <FormErrorMessage>{errors.papers[index].references.message}</FormErrorMessage>
                    )}
                    <FormHelperText>Enter reference seperated with $$ . Eg: ref1 $$ ref2 $$ ref3</FormHelperText>
                  </FormControl>

                  {/* Citation Information */}
                  <FormControl isInvalid={errors.papers?.[index]?.citationInformation}>
                    <FormLabel mt={1} fontSize="lg" color="black">Citation Information</FormLabel>
                    <Textarea 
                      focusBorderColor="teal.300" 
                      placeholder="Enter Citation Information" 
                      bg="white" 
                      color="black" 
                      fontSize="md" 
                      {...register(`papers.${index}.citationInformation`, {
                        // required: 'References is a required field',
                        // minLength: { value: 4, message: 'Please Enter Valid References' },
                      })} 
                    />
                    {errors.papers?.[index]?.citationInformation && (
                      <FormErrorMessage>{errors.papers[index].citationInformation.message}</FormErrorMessage>
                    )}
                    <FormHelperText>Enter Citation Information Like : ACM $$ info $$ ACS $$ info</FormHelperText>
                  </FormControl>

                  <Button mt={4} colorScheme="red" onClick={() => remove(index)}>
                    Remove Paper
                  </Button>
                </Box>
              );
            })}

            <Button 
              mt={4} 
              colorScheme="teal" 
              onClick={() => append({ title: '', authors: '', abstract: '', manuscripts: [], references: '', doi: '' })}
            >
              Add Paper
            </Button>

            <Button colorScheme="red" type="submit" isLoading={isSubmitting} fontSize="lg">
              Send Message
            </Button>
          </VStack>
        </form>
      </Box>
    </Container>
  );
}

export default SubmitPaperForm;

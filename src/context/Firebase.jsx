import { initializeApp } from "firebase/app";
import { createContext, useContext, useEffect, useState } from "react";
import { addDoc, collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import conf from "../conf/conf";
import moment from "moment";
import uniqid from "uniqid";
const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: conf.apiKey,
  authDomain: conf.authDomain,
  projectId: conf.projectId,
  storageBucket:conf.storageBucket ,
  messagingSenderId:conf.messagingSenderId ,
  appId: conf.appId
};
  

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);
const firestore=getFirestore(FirebaseApp)
const storage=getStorage(FirebaseApp)

export const useFirebase=()=>useContext(FirebaseContext)

export const FirebaseProvider=(props)=>{
    const [Submissions, setSubmissions] = useState([]);
    const [journals, setJournals] = useState([])
    useEffect(() => {
        try {
            const SubmissionsFetching = async () => {
              const Submissionsdocs = await getDocs(collection(firestore, 'paperSubmissions'));
              const SubmissionsObjects = Submissionsdocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          
              setSubmissions(SubmissionsObjects);
            };
            SubmissionsFetching();

        } catch (error) {
            console.log("Error while fetching Submissions :: ",error);
        }
      
      }, []);

      useEffect(() => {
        try {
            const JournalFetching = async () => {
              const Journaldocs = await getDocs(collection(firestore, 'journals'));
              const JournalObjects = Journaldocs.docs.map((doc) => ({ id: doc.id, shortForm: doc.data().shortForm,
                title: doc.data().title }));
          
              setJournals(JournalObjects);
            };
            JournalFetching();

        } catch (error) {
            console.log("Error while fetching Journals :: ",error);
        }
      
      }, []);
      

    const downloadManuscript=async(manuscriptsDocURL,title)=>{
        try {
          const downloadLink=await getDownloadURL(ref(storage,manuscriptsDocURL))
          const a=document.createElement('a');
          a.style.display="none",
          a.href=downloadLink;
          const nameSplit=title;
          a.download=""+nameSplit+"";
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(downloadLink)
        } catch (error) {
          console.log(error);
        }
  }

  const getVersionOfPublications=async(journalID)=>{
    try {
      const collectionRef=collection(firestore,"journals",String(journalID),'publications')
      const result=await getDocs(collectionRef)
      const VersionsOfPublications = result.docs.map((doc) => ({...doc.data() }));
      return VersionsOfPublications
    } catch (error) {
      console.log("ERROR WHILE FETCHING Version Of Publications",error);
    }
  }

        const createNewPublicationListing=async(JournalShortForm,issueTitle,journalImage,issueName,guestEditor,aboutConference,papersArray,countOfPaper)=>{
          try {

            //upoad all the journalImages to the database
            console.log(journalImage)
            const imageRef=ref(storage,`uploads/JournalImagesForIssues/${Date.now()}-${journalImage.name}`)
            const uploadResultOfJournalImage=await uploadBytes(imageRef,journalImage);



            //upload all the manuscript to the database
            const paperUploadingPromises =papersArray.map(async(paper)=>{
              const imageRef=ref(storage,`uploads/publishedVolumePapers/${Date.now()}-${paper.manuscripts[0].name}`)
                const uploadResult=await uploadBytes(imageRef,paper.manuscripts[0]);

                return {...paper,manuscripts:uploadResult.ref.fullPath}
          })
          const Updatedpapers = await Promise.all(paperUploadingPromises); 


            // Search for the journal based on the journal short form
            const journalQuery = query(collection(firestore, 'journals'), where('shortForm', '==', JournalShortForm));
            const journalQuerySnapshot = await getDocs(journalQuery);

            if (journalQuerySnapshot.empty) {
              console.log('No matching journal found');
              return;
            }

            const journalDoc = journalQuerySnapshot.docs[0];
            const journalId = journalDoc.id;

            // Create the subdocument for the publication

            //idhar scope hai changing ka
            const publicationData = {
              issueTitle: issueTitle,
              journalImageForIssues:uploadResultOfJournalImage.ref.fullPath || null,
              issueName:issueName || null,
              guestEditor:guestEditor || null,
              aboutConference:aboutConference || null,
              papers: Updatedpapers,
              timestamp: moment().format(),
            };

            // Add the document to the publications subcollection of the found journal
            await addDoc(collection(firestore, 'journals', journalId, 'publications'), publicationData);

            console.log('Publication added successfully');

            const paperCounterPromises=countOfPaper.map(async(Counterpaper)=>{
              await addDoc(collection(firestore, 'CountArticleOpenAndDownload'),Counterpaper);
          })
          await Promise.all(paperCounterPromises);

            console.log("Counter data for article added successfully.");

            return {success:true,message:`Your Publication with issue ${issueTitle} has been submitted successfully to database`}
          } catch (error) {
            console.error('Error creating publication:', error);
            return {success:false,message:`There is the error while submitting the publication with issue ${issueTitle} and the error is `+error}
          }
      }

      const addProgramForAdroidFoundations = async (programData) => {
        try {
          await addDoc(collection(firestore, 'adroidFoundationPrograms'), programData);
        } catch (error) {
          console.error('Error adding document: ', error);
        }
      };

      
      const uploadImageToStorage = async (file) => {
        const storageRef = ref(storage, `adroidFoundationPrograms/${Date.now()}_${file.name}`);
        await uploadBytes(storageRef, file);
        return await getDownloadURL(storageRef);
      };
    return (
        <FirebaseContext.Provider value={{Submissions,downloadManuscript,journals,createNewPublicationListing,addProgramForAdroidFoundations,uploadImageToStorage}}>
            {props.children}
        </FirebaseContext.Provider>
    )
}

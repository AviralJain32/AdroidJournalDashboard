import { initializeApp } from "firebase/app";
import { createContext, useContext, useEffect, useState } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import conf from "../conf/conf";
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
    return (
        <FirebaseContext.Provider value={{Submissions,downloadManuscript,journals}}>
            {props.children}
        </FirebaseContext.Provider>
    )
}

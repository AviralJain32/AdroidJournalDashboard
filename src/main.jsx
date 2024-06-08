import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import App from './App.jsx'
import { FirebaseProvider } from './context/Firebase.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import ButtonsPage from './pages/ButtonsPage.jsx'
import SubmissionJournalPage from './pages/SubmissionJournalPage.jsx'

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index element={<ButtonsPage/>} />  
        <Route path='/journal/:id' element={<SubmissionJournalPage/>}/>
       {/*<Route path='/aboutus' element={<AboutUsPage/>}/>
      <Route path='/contactus' element={<ContactUsPage/>}/>
      <Route path='/journals' element={<JournalsPage/>}/>
      <Route path='/submitform' element={<SubmitPaperForm/>}/> */}
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
    <FirebaseProvider>
    <ChakraProvider>
      {/* <App /> */}
      <RouterProvider router={router}/>
    </ChakraProvider>
    </FirebaseProvider>
)

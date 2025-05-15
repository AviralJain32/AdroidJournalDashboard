import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, Tabs } from '@chakra-ui/react'
import App from './App.jsx'
import { FirebaseProvider } from './context/Firebase.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import ButtonsPage from './pages/ButtonsPage.jsx'
import SubmissionJournalPage from './pages/SubmissionJournalPage.jsx'
import TabsOfDashBoard from './pages/TabsOfDashBoard.jsx'
import AdroidProgramForm from './pages/AdroidFoundationNewsSubmissionPage.jsx'

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index element={<ButtonsPage/>} />  
      <Route path='/journal/:id' element={<TabsOfDashBoard/>}/>
      <Route path='/adroidFoundation' element={<AdroidProgramForm />}/>
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

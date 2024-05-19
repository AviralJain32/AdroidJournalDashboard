import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import App from './App.jsx'
import { FirebaseProvider } from './context/Firebase.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FirebaseProvider>
    <ChakraProvider>
      <App />
    </ChakraProvider>
    </FirebaseProvider>
  </React.StrictMode>,
)

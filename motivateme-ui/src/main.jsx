import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App/App'
import 'bootstrap/dist/css/bootstrap.css';
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import theme from "./components/theme"
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = String(import.meta.env.VITE_CLIENT_ID)

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
)

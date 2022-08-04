import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App/App'
import 'bootstrap/dist/css/bootstrap.css';
import './index.css'
import ('typeface-assistant')
import {ChakraProvider} from '@chakra-ui/react'
import theme from "./components/theme"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
    <App />
    </ChakraProvider>
  </React.StrictMode>
)

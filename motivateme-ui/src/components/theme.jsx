import { extendTheme } from '@chakra-ui/react'

// theme.js


// 2. Add your color mode config
const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

// 3. extend the theme
const theme = extendTheme({ config, colors:{
 
    100:'#34B3F1'
  
} })


export default theme
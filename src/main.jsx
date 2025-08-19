
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from "@/components/ui/provider"
import { BrowserRouter } from 'react-router'
import { ChakraProvider } from '@chakra-ui/react'
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { StrictMode } from 'react'

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});



createRoot(document.getElementById('root')).render(
  <>

 <StrictMode>
  <ThemeProvider theme={darkTheme}>
    <Provider >
      <BrowserRouter>
        <CssBaseline /> 
        <App />
      </BrowserRouter>
    </Provider>
    </ThemeProvider>
    </StrictMode>
    
   
  </>

)
//  import React from "react"
// import ReactDOM from "react-dom/client"
// import { Provider } from "@/components/ui/provider"  // new Chakra v3 provider
// import { ThemeProvider } from "next-themes"           // handles dark mode
// import App from "./App"
// import { system } from "./system"

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <ThemeProvider attribute="class" defaultTheme="dark"> 
//       <Provider value={system}>
//         <App />
//       </Provider>
//     </ThemeProvider>
//   </React.StrictMode>
// )

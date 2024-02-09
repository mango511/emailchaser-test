import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        primary: {
            main: '#1079fc'
        }
    },
    typography: {
        subtitle2: {
            fontSize: '26px'
        }
    },
    components:{
        MuiButton:{
            styleOverrides:{
                root:{
                    padding: '8px 20px',
                    borderRadius: 9999,
                    minWidth: '100px',
                    textTransform: 'capitalize',
                },
                contained: {
                    backgroundColor: '#1079fc !important',   
                    color: 'white',                     
                },
            }
        }
    }
  });
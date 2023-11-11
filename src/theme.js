import { createTheme } from "@mui/material"

const theme = createTheme({
    palette:{
        primary:{
            main:"#0C1DEA",
            mediumMain:"#6F7AF7",
            medium:"#B7BDFB",
            light:"#EDEEFE"
        },
        secondary:{
            main:"#AC4D16",
            mediumMain:"E57737",
            light:"#F7D6C3",
            medium:"6E320E",
            dark:"3D1C08",
            
        },
        success:{
            main:"#16AC4D",
            dark:"#0B5627",
            mediumMain:"#5FEA92",
            medium:"#9BF2BB",
            light:"#EBFCF1"
        },
        background:{
            dark:"#000000",
            main:"#373737",
            mediumMain:"#6D6D6D",
            medium:"#A4A4A4",
            medium_2:"#D4D4D4",
            light:"EDEDED"
        }
    }
})

export default theme;
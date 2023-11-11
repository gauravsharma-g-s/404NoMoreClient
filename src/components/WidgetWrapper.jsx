import { Box } from "@mui/material";
import { styled } from "@mui/system";

const WidgetWrapper = styled(Box)(({ theme }) => ({
    paddding: "1.5rem 1.5rem 0.5rem",
    backgroundColor: theme.palette.primary.light
}))

export default WidgetWrapper;
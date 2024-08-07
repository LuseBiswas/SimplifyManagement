import { Grid, Typography, Box } from "@mui/material";

const Footer = () => {
    return (
        <Box sx={{ backgroundColor: "black", color: "green", padding: "20px 0", marginTop: "50px" }}>
            <Grid container spacing={2} justifyContent="center">
                <Grid item>
                    <Typography variant="h6" component="div" sx={{ color: "orange", fontWeight: "bold" }}>
                        Simplyfy Manage
                    </Typography>
                </Grid>
                
            </Grid>
            <Typography variant="body2" align="center" sx={{ color: "white", marginTop: "10px" }}>
                © 2024 Simplify Task.
            </Typography>
        </Box>
    );
}

export default Footer;

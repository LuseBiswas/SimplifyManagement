
import { Grid, Typography, Link, Box } from "@mui/material";

const Footer = () => {
    return (
        <Box sx={{ backgroundColor: "black", color: "green", padding: "20px 0", marginTop: "50px" }}>
            <Grid container spacing={2} justifyContent="center">
                <Grid item>
                    <Typography variant="h6" component="div" sx={{ color: "orange", fontWeight: "bold" }}>
                        Task Management
                    </Typography>
                </Grid>
                <Grid item>
                    <Link href="#" underline="none" sx={{ color: "green", '&:hover': { color: "orange" } }}>
                        Home
                    </Link>
                </Grid>
                <Grid item>
                    <Link href="#" underline="none" sx={{ color: "green", '&:hover': { color: "orange" } }}>
                        About
                    </Link>
                </Grid>
                <Grid item>
                    <Link href="#" underline="none" sx={{ color: "green", '&:hover': { color: "orange" } }}>
                        Contact
                    </Link>
                </Grid>
                <Grid item>
                    <Link href="#" underline="none" sx={{ color: "green", '&:hover': { color: "orange" } }}>
                        Privacy Policy
                    </Link>
                </Grid>
            </Grid>
            <Typography variant="body2" align="center" sx={{ color: "green", marginTop: "10px" }}>
                © 2024 Task Management. All rights reserved.
            </Typography>
        </Box>
    );
}

export default Footer;

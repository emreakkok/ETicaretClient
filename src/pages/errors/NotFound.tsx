import { Container, Typography, Button } from "@mui/material";
import { Link } from "react-router";

export default function NotFound() {
    return (
        <Container sx={{ mt: 4, textAlign: "center" }}>
            <Typography variant="h4" color="error" gutterBottom>
                404 - Sayfa Bulunamadı
            </Typography>
            <Typography variant="body1" gutterBottom>
                Aradığınız sayfa mevcut değil veya taşınmış olabilir.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/"
                sx={{ mt: 2 }}
            >
                Ana Sayfaya Dön
            </Button>
        </Container>
    );
}

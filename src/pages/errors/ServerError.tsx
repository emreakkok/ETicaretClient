import { Container, Typography } from "@mui/material";
import { useLocation } from "react-router";

export default function ServerError() {
    const { state } = useLocation();

    return (
        <Container sx={{ mt: 4 }}>
            {state?.error ? (
                <>
                    <Typography variant="h5" color="error" gutterBottom>
                        {state.error.title}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Status: {state.status}
                    </Typography>
                    {state.error.detail && (
                        <Typography variant="body2" color="text.secondary">
                            {state.error.detail}
                        </Typography>
                    )}
                </>
            ) : (
                <Typography>Beklenmeyen bir hata oluştu.</Typography>
            )}
        </Container>
    );
}

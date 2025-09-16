import { useState } from "react";
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Paper,
    Avatar,
    CircularProgress
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import requests from "../../api/request";


export default function RegisterPage() {
    const [name, setName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        try {
            await requests.Account.register({ name, userName, email, password });
            toast.success("Kayıt başarılı! Lütfen giriş yapın.");
            navigate("/login");
        } catch (error: any) {
            if (Array.isArray(error)) {
                error.forEach((e: any) => toast.error(e.description || e));
            } else {
                toast.error("Kayıt sırasında bir hata oluştu.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={6} sx={{ mt: 10, p: 4, borderRadius: 3 }}>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <PersonAddIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" gutterBottom>
                        Kayıt Ol
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: "100%" }}>
                        <TextField
                            label="İsim"
                            fullWidth
                            margin="normal"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <TextField
                            label="Kullanıcı Adı"
                            fullWidth
                            margin="normal"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                        <TextField
                            label="Email"
                            type="email"
                            fullWidth
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <TextField
                            label="Şifre"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : "Kayıt Ol"}
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}

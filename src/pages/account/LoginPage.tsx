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
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import requests from "../../api/request";
import { useDispatch } from "react-redux";
import { login as loginAction } from "../../pages/counter/authSlice";

export default function LoginPage() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await requests.Account.login({ userName, password });

            if (response?.token) {
                // Token'ı localStorage'a kaydet
                localStorage.setItem("jwt", response.token);
                localStorage.setItem("userName", userName);

                // Redux state'i güncelle
                dispatch(loginAction(userName));

                toast.success("Giriş başarılı!");
                navigate("/");
            } else {
                toast.error("Beklenmeyen bir hata oluştu!");
            }
        } catch (error: any) {
            console.error("Login error:", error);
            // Hata mesajını daha detaylı göster
            const errorMessage = error?.data?.title ||
                error?.message ||
                "Kullanıcı adı veya şifre hatalı!";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={6} sx={{ mt: 10, p: 4, borderRadius: 3 }}>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" gutterBottom>
                        Giriş Yap
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: "100%" }}>
                        <TextField
                            label="Kullanıcı Adı"
                            fullWidth
                            margin="normal"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                            disabled={loading}
                        />
                        <TextField
                            label="Şifre"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : "Giriş Yap"}
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}
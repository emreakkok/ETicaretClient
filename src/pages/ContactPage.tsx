import {
    Box,
    Container,
    Paper,
    Typography,
    Grid2,
    TextField,
    Button,
    Card,
    CardContent,
    Fade,
    IconButton,
} from "@mui/material";
import {
    Phone,
    Email,
    LocationOn,
    Schedule,
    Send,
    ArrowBack,
    WhatsApp,
    Instagram,
    Facebook
} from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function ContactPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Form gönderme işlemi burada yapılacak
        console.log('Form gönderildi:', formData);
        // Toast mesajı veya başarı bildirimi eklenebilir
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                py: 4
            }}
        >
            <Container maxWidth="lg">
                {/* Back Button */}
                <Fade in={true} timeout={600}>
                    <Box sx={{ mb: 3 }}>
                        <IconButton
                            onClick={() => navigate(-1)}
                            sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                color: '#667eea',
                                backdropFilter: 'blur(10px)',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                '&:hover': {
                                    backgroundColor: 'white',
                                    transform: 'scale(1.05)'
                                },
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <ArrowBack />
                        </IconButton>
                    </Box>
                </Fade>

                <Fade in={true} timeout={800}>
                    <Paper
                        elevation={20}
                        sx={{
                            borderRadius: 6,
                            overflow: "hidden",
                            background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                            boxShadow: '0 20px 60px rgba(0,0,0,0.15)'
                        }}
                    >
                        {/* Header */}
                        <Box
                            sx={{
                                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                                p: 6,
                                textAlign: 'center',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: -50,
                                    right: -50,
                                    width: 200,
                                    height: 200,
                                    backgroundColor: 'rgba(255,255,255,0.05)',
                                    borderRadius: '50%'
                                }}
                            />
                            <Typography
                                variant="h2"
                                sx={{
                                    fontWeight: 900,
                                    color: 'white',
                                    textShadow: '0 4px 8px rgba(0,0,0,0.3)',
                                    mb: 2,
                                    fontSize: { xs: '2.5rem', md: '4rem' }
                                }}
                            >
                                İletişim
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{
                                    color: 'rgba(255,255,255,0.9)',
                                    fontWeight: 500,
                                    maxWidth: 600,
                                    mx: 'auto'
                                }}
                            >
                                Bizimle iletişime geçin! Sorularınız, önerileriniz ve talepleriniz için her zaman buradayız.
                            </Typography>
                        </Box>

                        <Box sx={{ p: { xs: 4, md: 6 } }}>
                            <Grid2 container spacing={6}>
                                {/* Sol taraf: İletişim Bilgileri */}
                                <Grid2 size={{ xs: 12, md: 6 }}>
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            fontWeight: 800,
                                            color: '#1a202c',
                                            mb: 4
                                        }}
                                    >
                                        İletişim Bilgileri
                                    </Typography>

                                    <Box sx={{ mb: 4 }}>
                                        {/* Telefon */}
                                        <Card
                                            sx={{
                                                mb: 3,
                                                background: 'linear-gradient(135deg, #e0f2fe, #b3e5fc)',
                                                border: '2px solid #29b6f6',
                                                borderRadius: 3,
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: '0 8px 25px rgba(41, 182, 246, 0.3)'
                                                }
                                            }}
                                        >
                                            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                                                <Box
                                                    sx={{
                                                        background: 'linear-gradient(135deg, #29b6f6, #0277bd)',
                                                        borderRadius: '50%',
                                                        p: 2,
                                                        color: 'white'
                                                    }}
                                                >
                                                    <Phone sx={{ fontSize: 28 }} />
                                                </Box>
                                                <Box>
                                                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#0277bd' }}>
                                                        Telefon
                                                    </Typography>
                                                    <Typography variant="body1" sx={{ color: '#455a64' }}>
                                                        +90 (212) 555 0123
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ color: '#78909c' }}>
                                                        Hafta içi 09:00 - 18:00
                                                    </Typography>
                                                </Box>
                                            </CardContent>
                                        </Card>

                                        {/* Email */}
                                        <Card
                                            sx={{
                                                mb: 3,
                                                background: 'linear-gradient(135deg, #f3e5f5, #e1bee7)',
                                                border: '2px solid #ba68c8',
                                                borderRadius: 3,
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: '0 8px 25px rgba(186, 104, 200, 0.3)'
                                                }
                                            }}
                                        >
                                            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                                                <Box
                                                    sx={{
                                                        background: 'linear-gradient(135deg, #ba68c8, #8e24aa)',
                                                        borderRadius: '50%',
                                                        p: 2,
                                                        color: 'white'
                                                    }}
                                                >
                                                    <Email sx={{ fontSize: 28 }} />
                                                </Box>
                                                <Box>
                                                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#8e24aa' }}>
                                                        Email
                                                    </Typography>
                                                    <Typography variant="body1" sx={{ color: '#455a64' }}>
                                                        info@company.com
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ color: '#78909c' }}>
                                                        24 saat içinde yanıt
                                                    </Typography>
                                                </Box>
                                            </CardContent>
                                        </Card>

                                        {/* Adres */}
                                        <Card
                                            sx={{
                                                mb: 3,
                                                background: 'linear-gradient(135deg, #e8f5e8, #c8e6c9)',
                                                border: '2px solid #66bb6a',
                                                borderRadius: 3,
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: '0 8px 25px rgba(102, 187, 106, 0.3)'
                                                }
                                            }}
                                        >
                                            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                                                <Box
                                                    sx={{
                                                        background: 'linear-gradient(135deg, #66bb6a, #388e3c)',
                                                        borderRadius: '50%',
                                                        p: 2,
                                                        color: 'white'
                                                    }}
                                                >
                                                    <LocationOn sx={{ fontSize: 28 }} />
                                                </Box>
                                                <Box>
                                                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#388e3c' }}>
                                                        Adres
                                                    </Typography>
                                                    <Typography variant="body1" sx={{ color: '#455a64' }}>
                                                        Maslak Mahallesi, Büyükdere Cd.
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ color: '#78909c' }}>
                                                        No:123, Şişli/İstanbul
                                                    </Typography>
                                                </Box>
                                            </CardContent>
                                        </Card>

                                        {/* Çalışma Saatleri */}
                                        <Card
                                            sx={{
                                                background: 'linear-gradient(135deg, #fff3e0, #ffe0b2)',
                                                border: '2px solid #ffb74d',
                                                borderRadius: 3,
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: '0 8px 25px rgba(255, 183, 77, 0.3)'
                                                }
                                            }}
                                        >
                                            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                                                <Box
                                                    sx={{
                                                        background: 'linear-gradient(135deg, #ffb74d, #f57c00)',
                                                        borderRadius: '50%',
                                                        p: 2,
                                                        color: 'white'
                                                    }}
                                                >
                                                    <Schedule sx={{ fontSize: 28 }} />
                                                </Box>
                                                <Box>
                                                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#f57c00' }}>
                                                        Çalışma Saatleri
                                                    </Typography>
                                                    <Typography variant="body1" sx={{ color: '#455a64' }}>
                                                        Pazartesi - Cuma: 09:00 - 18:00
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ color: '#78909c' }}>
                                                        Cumartesi: 10:00 - 15:00
                                                    </Typography>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Box>

                                    {/* Sosyal Medya */}
                                    <Box>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 700,
                                                color: '#1a202c',
                                                mb: 2
                                            }}
                                        >
                                            Sosyal Medya
                                        </Typography>
                                        <Box sx={{ display: 'flex', gap: 2 }}>
                                            <IconButton
                                                sx={{
                                                    background: 'linear-gradient(135deg, #25d366, #128c7e)',
                                                    color: 'white',
                                                    '&:hover': {
                                                        transform: 'scale(1.1)',
                                                        boxShadow: '0 8px 20px rgba(37, 211, 102, 0.4)'
                                                    }
                                                }}
                                            >
                                                <WhatsApp />
                                            </IconButton>
                                            <IconButton
                                                sx={{
                                                    background: 'linear-gradient(135deg, #e4405f, #c13584)',
                                                    color: 'white',
                                                    '&:hover': {
                                                        transform: 'scale(1.1)',
                                                        boxShadow: '0 8px 20px rgba(228, 64, 95, 0.4)'
                                                    }
                                                }}
                                            >
                                                <Instagram />
                                            </IconButton>
                                            <IconButton
                                                sx={{
                                                    background: 'linear-gradient(135deg, #1877f2, #42a5f5)',
                                                    color: 'white',
                                                    '&:hover': {
                                                        transform: 'scale(1.1)',
                                                        boxShadow: '0 8px 20px rgba(24, 119, 242, 0.4)'
                                                    }
                                                }}
                                            >
                                                <Facebook />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                </Grid2>

                                {/* Sağ taraf: İletişim Formu */}
                                <Grid2 size={{ xs: 12, md: 6 }}>
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            fontWeight: 800,
                                            color: '#1a202c',
                                            mb: 4
                                        }}
                                    >
                                        Mesaj Gönder
                                    </Typography>

                                    <Card
                                        sx={{
                                            background: 'linear-gradient(135deg, #ffffff, #f8fafc)',
                                            border: '1px solid #e2e8f0',
                                            borderRadius: 4,
                                            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                                        }}
                                    >
                                        <CardContent sx={{ p: 4 }}>
                                            <Box component="form" onSubmit={handleSubmit}>
                                                <TextField
                                                    fullWidth
                                                    label="Adınız Soyadınız"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    required
                                                    sx={{
                                                        mb: 3,
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: 3,
                                                            '&:hover fieldset': {
                                                                borderColor: '#667eea',
                                                            },
                                                            '&.Mui-focused fieldset': {
                                                                borderColor: '#667eea',
                                                            },
                                                        },
                                                    }}
                                                />
                                                <TextField
                                                    fullWidth
                                                    label="Email Adresiniz"
                                                    name="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    required
                                                    sx={{
                                                        mb: 3,
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: 3,
                                                            '&:hover fieldset': {
                                                                borderColor: '#667eea',
                                                            },
                                                            '&.Mui-focused fieldset': {
                                                                borderColor: '#667eea',
                                                            },
                                                        },
                                                    }}
                                                />
                                                <TextField
                                                    fullWidth
                                                    label="Konu"
                                                    name="subject"
                                                    value={formData.subject}
                                                    onChange={handleInputChange}
                                                    required
                                                    sx={{
                                                        mb: 3,
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: 3,
                                                            '&:hover fieldset': {
                                                                borderColor: '#667eea',
                                                            },
                                                            '&.Mui-focused fieldset': {
                                                                borderColor: '#667eea',
                                                            },
                                                        },
                                                    }}
                                                />
                                                <TextField
                                                    fullWidth
                                                    label="Mesajınız"
                                                    name="message"
                                                    multiline
                                                    rows={6}
                                                    value={formData.message}
                                                    onChange={handleInputChange}
                                                    required
                                                    sx={{
                                                        mb: 4,
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: 3,
                                                            '&:hover fieldset': {
                                                                borderColor: '#667eea',
                                                            },
                                                            '&.Mui-focused fieldset': {
                                                                borderColor: '#667eea',
                                                            },
                                                        },
                                                    }}
                                                />
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    size="large"
                                                    fullWidth
                                                    startIcon={<Send />}
                                                    sx={{
                                                        borderRadius: 4,
                                                        py: 2,
                                                        textTransform: "none",
                                                        fontWeight: 700,
                                                        fontSize: '1.1rem',
                                                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                                                        boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
                                                        '&:hover': {
                                                            background: 'linear-gradient(135deg, #5a67d8, #6b46c1)',
                                                            boxShadow: '0 12px 35px rgba(102, 126, 234, 0.6)',
                                                            transform: 'translateY(-2px)',
                                                        },
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                >
                                                    Mesajı Gönder
                                                </Button>
                                            </Box>
                                        </CardContent>
                                    </Card>

                                    <Box
                                        sx={{
                                            mt: 4,
                                            p: 3,
                                            background: 'linear-gradient(135deg, #e0f7fa, #b2ebf2)',
                                            borderRadius: 4,
                                            border: '1px solid #4dd0e1',
                                            textAlign: 'center'
                                        }}
                                    >
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: '#00695c',
                                                fontWeight: 500
                                            }}
                                        >
                                            💬 Mesajınızı aldığımızda, 24 saat içinde size geri dönüş yapacağız.
                                        </Typography>
                                    </Box>
                                </Grid2>
                            </Grid2>
                        </Box>
                    </Paper>
                </Fade>
            </Container>
        </Box>
    );
}
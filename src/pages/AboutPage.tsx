import {
    Box,
    Container,
    Paper,
    Typography,
    Grid2,
    Card,
    CardContent,
    Fade,
    IconButton,
    Avatar,
    Chip
} from "@mui/material";
import {
    ArrowBack,
    Lightbulb,
    Group,
    Star,
    TrendingUp,
    Security,
    Speed,
    Support,
    EmojiEvents,
    Handshake
} from "@mui/icons-material";
import { useNavigate } from "react-router";

export default function AboutPage() {
    const navigate = useNavigate();

    const values = [
        {
            icon: <Lightbulb sx={{ fontSize: 32 }} />,
            title: "İnovasyon",
            description: "Sürekli gelişim ve yenilikçi çözümlerle sektörde öncü olmayı hedefliyoruz.",
            color: "#ffd54f"
        },
        {
            icon: <Group sx={{ fontSize: 32 }} />,
            title: "Müşteri Odaklılık",
            description: "Müşterilerimizin memnuniyeti bizim için her şeyden önce gelir.",
            color: "#4fc3f7"
        },
        {
            icon: <Star sx={{ fontSize: 32 }} />,
            title: "Kalite",
            description: "En yüksek kalite standartlarını koruyarak hizmet vermeyi ilke edindik.",
            color: "#ba68c8"
        },
        {
            icon: <Handshake sx={{ fontSize: 32 }} />,
            title: "Güvenilirlik",
            description: "Sözümüzün arkasında durarak uzun soluklu partnerlikler kuruyoruz.",
            color: "#66bb6a"
        }
    ];

    const features = [
        {
            icon: <TrendingUp sx={{ fontSize: 28 }} />,
            title: "Sürekli Büyüme",
            description: "Her geçen yıl daha fazla müşteriye ulaşıyor ve portföyümüzü genişletiyoruz."
        },
        {
            icon: <Security sx={{ fontSize: 28 }} />,
            title: "Güvenli Alışveriş",
            description: "256-bit SSL şifreleme ile alışverişlerinizi güvence altına alıyoruz."
        },
        {
            icon: <Speed sx={{ fontSize: 28 }} />,
            title: "Hızlı Teslimat",
            description: "Siparişlerinizi aynı gün kargoya vererek hızlı teslimat sağlıyoruz."
        },
        {
            icon: <Support sx={{ fontSize: 28 }} />,
            title: "7/24 Destek",
            description: "Müşteri hizmetlerimiz her zaman yanınızda olmaya hazır."
        }
    ];

    const stats = [
        { number: "50K+", label: "Mutlu Müşteri" },
        { number: "10K+", label: "Ürün Çeşidi" },
        { number: "15+", label: "Yıllık Deneyim" },
        { number: "99%", label: "Müşteri Memnuniyeti" }
    ];

    const team = [
        {
            name: "Ahmet Yılmaz",
            position: "Genel Müdür",
            description: "15 yıllık e-ticaret deneyimi",
            avatar: "A"
        },
        {
            name: "Ayşe Kaya",
            position: "Pazarlama Müdürü",
            description: "Dijital pazarlama uzmanı",
            avatar: "A"
        },
        {
            name: "Mehmet Demir",
            position: "Teknoloji Müdürü",
            description: "Full-stack geliştirici",
            avatar: "M"
        },
        {
            name: "Fatma Şen",
            position: "Müşteri Hizmetleri Müdürü",
            description: "Müşteri deneyimi uzmanı",
            avatar: "F"
        }
    ];

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
                                    left: -50,
                                    width: 200,
                                    height: 200,
                                    backgroundColor: 'rgba(255,255,255,0.05)',
                                    borderRadius: '50%'
                                }}
                            />
                            <Box
                                sx={{
                                    position: 'absolute',
                                    bottom: -30,
                                    right: -30,
                                    width: 150,
                                    height: 150,
                                    backgroundColor: 'rgba(255,255,255,0.03)',
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
                                Hakkımızda
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{
                                    color: 'rgba(255,255,255,0.9)',
                                    fontWeight: 500,
                                    maxWidth: 800,
                                    mx: 'auto'
                                }}
                            >
                                Kalite ve müşteri memnuniyetini önceleyerek, e-ticaret dünyasında güvenilir bir marka olmak için çalışıyoruz.
                            </Typography>
                        </Box>

                        <Box sx={{ p: { xs: 4, md: 6 } }}>
                            {/* Hikayemiz */}
                            <Box sx={{ mb: 8 }}>
                                <Typography
                                    variant="h3"
                                    sx={{
                                        fontWeight: 800,
                                        color: '#1a202c',
                                        mb: 4,
                                        textAlign: 'center'
                                    }}
                                >
                                    Hikayemiz
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontSize: '1.2rem',
                                        lineHeight: 1.8,
                                        color: '#4a5568',
                                        textAlign: 'center',
                                        maxWidth: 900,
                                        mx: 'auto',
                                        mb: 4
                                    }}
                                >
                                    2008 yılında küçük bir ekip olarak başladığımız yolculuğumuzda, müşterilerimize en kaliteli ürünleri
                                    en uygun fiyatlarla sunmayı hedefledik. Bugün 50,000'den fazla mutlu müşteriyle, Türkiye'nin önde
                                    gelen e-ticaret platformlarından biri haline geldik.
                                </Typography>
                            </Box>

                            {/* İstatistikler */}
                            <Box sx={{ mb: 8 }}>
                                <Typography
                                    variant="h3"
                                    sx={{
                                        fontWeight: 800,
                                        color: '#1a202c',
                                        mb: 6,
                                        textAlign: 'center'
                                    }}
                                >
                                    Rakamlarla Biz
                                </Typography>
                                <Grid2 container spacing={4}>
                                    {stats.map((stat, index) => (
                                        <Grid2 size={{ xs: 6, md: 3 }} key={index}>
                                            <Card
                                                sx={{
                                                    background: `linear-gradient(135deg, ${['#e1f5fe', '#f3e5f5', '#e8f5e8', '#fff3e0'][index]}, ${['#b3e5fc', '#e1bee7', '#c8e6c9', '#ffe0b2'][index]})`,
                                                    border: `2px solid ${['#29b6f6', '#ba68c8', '#66bb6a', '#ffb74d'][index]}`,
                                                    borderRadius: 4,
                                                    textAlign: 'center',
                                                    transition: 'all 0.3s ease',
                                                    '&:hover': {
                                                        transform: 'translateY(-5px)',
                                                        boxShadow: `0 12px 30px ${['rgba(41, 182, 246, 0.3)', 'rgba(186, 104, 200, 0.3)', 'rgba(102, 187, 106, 0.3)', 'rgba(255, 183, 77, 0.3)'][index]}`
                                                    }
                                                }}
                                            >
                                                <CardContent sx={{ py: 4 }}>
                                                    <Typography
                                                        variant="h2"
                                                        sx={{
                                                            fontWeight: 900,
                                                            color: ['#0277bd', '#8e24aa', '#388e3c', '#f57c00'][index],
                                                            mb: 1
                                                        }}
                                                    >
                                                        {stat.number}
                                                    </Typography>
                                                    <Typography
                                                        variant="h6"
                                                        sx={{
                                                            fontWeight: 600,
                                                            color: '#455a64'
                                                        }}
                                                    >
                                                        {stat.label}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid2>
                                    ))}
                                </Grid2>
                            </Box>

                            {/* Değerlerimiz */}
                            <Box sx={{ mb: 8 }}>
                                <Typography
                                    variant="h3"
                                    sx={{
                                        fontWeight: 800,
                                        color: '#1a202c',
                                        mb: 6,
                                        textAlign: 'center'
                                    }}
                                >
                                    Değerlerimiz
                                </Typography>
                                <Grid2 container spacing={4}>
                                    {values.map((value, index) => (
                                        <Grid2 size={{ xs: 12, md: 6 }} key={index}>
                                            <Card
                                                sx={{
                                                    background: 'linear-gradient(135deg, #ffffff, #f8fafc)',
                                                    border: '1px solid #e2e8f0',
                                                    borderRadius: 4,
                                                    height: '100%',
                                                    transition: 'all 0.3s ease',
                                                    '&:hover': {
                                                        transform: 'translateY(-5px)',
                                                        boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
                                                        border: `2px solid ${value.color}`
                                                    }
                                                }}
                                            >
                                                <CardContent sx={{ p: 4, display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                                                    <Box
                                                        sx={{
                                                            backgroundColor: value.color,
                                                            borderRadius: '50%',
                                                            p: 2,
                                                            color: 'white',
                                                            boxShadow: `0 4px 15px ${value.color}40`
                                                        }}
                                                    >
                                                        {value.icon}
                                                    </Box>
                                                    <Box sx={{ flex: 1 }}>
                                                        <Typography
                                                            variant="h5"
                                                            sx={{
                                                                fontWeight: 700,
                                                                color: '#1a202c',
                                                                mb: 2
                                                            }}
                                                        >
                                                            {value.title}
                                                        </Typography>
                                                        <Typography
                                                            variant="body1"
                                                            sx={{
                                                                color: '#4a5568',
                                                                lineHeight: 1.7
                                                            }}
                                                        >
                                                            {value.description}
                                                        </Typography>
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        </Grid2>
                                    ))}
                                </Grid2>
                            </Box>

                            {/* Özelliklerimiz */}
                            <Box sx={{ mb: 8 }}>
                                <Typography
                                    variant="h3"
                                    sx={{
                                        fontWeight: 800,
                                        color: '#1a202c',
                                        mb: 6,
                                        textAlign: 'center'
                                    }}
                                >
                                    Neden Bizi Tercih Etmelisiniz?
                                </Typography>
                                <Grid2 container spacing={4}>
                                    {features.map((feature, index) => (
                                        <Grid2 size={{ xs: 12, md: 6 }} key={index}>
                                            <Card
                                                sx={{
                                                    background: `linear-gradient(135deg, ${['#e3f2fd', '#f1f8e9', '#fce4ec', '#fff8e1'][index]}, ${['#bbdefb', '#dcedc8', '#f8bbd9', '#fff3c4'][index]})`,
                                                    border: `1px solid ${['#2196f3', '#4caf50', '#e91e63', '#ff9800'][index]}`,
                                                    borderRadius: 4,
                                                    height: '100%',
                                                    transition: 'all 0.3s ease',
                                                    '&:hover': {
                                                        transform: 'translateY(-3px)',
                                                        boxShadow: `0 10px 25px ${['rgba(33, 150, 243, 0.2)', 'rgba(76, 175, 80, 0.2)', 'rgba(233, 30, 99, 0.2)', 'rgba(255, 152, 0, 0.2)'][index]}`
                                                    }
                                                }}
                                            >
                                                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                                                    <Box
                                                        sx={{
                                                            backgroundColor: ['#2196f3', '#4caf50', '#e91e63', '#ff9800'][index],
                                                            borderRadius: '50%',
                                                            p: 2,
                                                            color: 'white',
                                                            display: 'inline-flex',
                                                            mb: 3,
                                                            boxShadow: `0 4px 15px ${['rgba(33, 150, 243, 0.4)', 'rgba(76, 175, 80, 0.4)', 'rgba(233, 30, 99, 0.4)', 'rgba(255, 152, 0, 0.4)'][index]}`
                                                        }}
                                                    >
                                                        {feature.icon}
                                                    </Box>
                                                    <Typography
                                                        variant="h6"
                                                        sx={{
                                                            fontWeight: 700,
                                                            color: '#1a202c',
                                                            mb: 2
                                                        }}
                                                    >
                                                        {feature.title}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            color: '#4a5568'
                                                        }}
                                                    >
                                                        {feature.description}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid2>
                                    ))}
                                </Grid2>
                            </Box>

                            {/* Ekibimiz */}
                            <Box>
                                <Typography
                                    variant="h3"
                                    sx={{
                                        fontWeight: 800,
                                        color: '#1a202c',
                                        mb: 6,
                                        textAlign: 'center'
                                    }}
                                >
                                    Ekibimiz
                                </Typography>
                                <Grid2 container spacing={4}>
                                    {team.map((member, index) => (
                                        <Grid2 size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                                            <Card
                                                sx={{
                                                    background: 'linear-gradient(135deg, #ffffff, #f8fafc)',
                                                    border: '1px solid #e2e8f0',
                                                    borderRadius: 4,
                                                    textAlign: 'center',
                                                    transition: 'all 0.3s ease',
                                                    '&:hover': {
                                                        transform: 'translateY(-5px)',
                                                        boxShadow: '0 15px 35px rgba(0,0,0,0.1)'
                                                    }
                                                }}
                                            >
                                                <CardContent sx={{ p: 4 }}>
                                                    <Avatar
                                                        sx={{
                                                            width: 80,
                                                            height: 80,
                                                            background: 'linear-gradient(135deg, #667eea, #764ba2)',
                                                            fontSize: '2rem',
                                                            fontWeight: 700,
                                                            mx: 'auto',
                                                            mb: 3,
                                                            boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)'
                                                        }}
                                                    >
                                                        {member.avatar}
                                                    </Avatar>
                                                    <Typography
                                                        variant="h6"
                                                        sx={{
                                                            fontWeight: 700,
                                                            color: '#1a202c',
                                                            mb: 1
                                                        }}
                                                    >
                                                        {member.name}
                                                    </Typography>
                                                    <Chip
                                                        label={member.position}
                                                        sx={{
                                                            background: 'linear-gradient(135deg, #667eea, #764ba2)',
                                                            color: 'white',
                                                            fontWeight: 600,
                                                            mb: 2
                                                        }}
                                                    />
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            color: '#4a5568'
                                                        }}
                                                    >
                                                        {member.description}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid2>
                                    ))}
                                </Grid2>
                            </Box>

                            {/* Call to Action */}
                            <Box
                                sx={{
                                    mt: 8,
                                    p: 6,
                                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                                    borderRadius: 6,
                                    textAlign: 'center',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: -30,
                                        left: -30,
                                        width: 120,
                                        height: 120,
                                        backgroundColor: 'rgba(255,255,255,0.05)',
                                        borderRadius: '50%'
                                    }}
                                />
                                <EmojiEvents
                                    sx={{
                                        fontSize: 48,
                                        color: 'white',
                                        mb: 2,
                                        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
                                    }}
                                />
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontWeight: 800,
                                        color: 'white',
                                        mb: 2,
                                        textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                                    }}
                                >
                                    Bizimle Alışverişe Başlayın!
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
                                    Kaliteli ürünler, uygun fiyatlar ve mükemmel hizmet için doğru adrestesiniz.
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Fade>
            </Container>
        </Box>
    );
}
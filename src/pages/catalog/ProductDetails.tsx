import {
    Box,
    Button,
    CardMedia,
    Chip,
    CircularProgress,
    Divider,
    Grid2,
    Typography,
    Container,
    Paper,
    Fade,
    IconButton
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import type { IProduct } from "../../model/IProduct";
import { ShoppingCart, ArrowBack, LocalOffer, Inventory } from "@mui/icons-material";
import requests from "../../api/request";
import NotFound from "../errors/NotFound";
import { useAppDispatch } from "../../hooks/hooks";
import { addItemToCart } from "../counter/cartSlite";

export default function ProductDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProducts] = useState<IProduct | null>(null);
    const [loading, setLoading] = useState(true);

    // Redux dispatch hook'unu kullanıyoruz
    const dispatch = useAppDispatch();

    useEffect(() => {
        id && requests.Catalog.details(parseInt(id))
            .then((data) => setProducts(data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                }}
            >
                <CircularProgress
                    size={80}
                    thickness={4}
                    sx={{
                        color: 'white',
                        mb: 3,
                        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
                    }}
                />
                <Typography
                    variant="h5"
                    sx={{
                        color: 'white',
                        fontWeight: 600,
                        textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                    }}
                >
                    Ürün detayları yükleniyor...
                </Typography>
            </Box>
        );
    }

    if (!product) return <NotFound />;

    // `requests.Cart.addItem` yerine Redux eylemini dispatch ediyoruz
    function handleAddItem(productId: number) {
        dispatch(addItemToCart({ productId }));
    }

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
                        <Grid2 container spacing={0}>
                            {/* Sol taraf: Görsel */}
                            <Grid2 size={{ xs: 12, md: 6 }}>
                                <Box
                                    sx={{
                                        position: 'relative',
                                        height: { xs: 400, md: 600 },
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        p: 2,
                                    }}
                                >
                                    <Paper
                                        elevation={12}
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: 4,
                                            overflow: 'hidden',
                                            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                            '&:hover': {
                                                transform: 'scale(1.03)',
                                                boxShadow: '0 30px 60px rgba(0,0,0,0.25)',
                                            }
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            image={
                                                product.imageUrl
                                                    ? `https://localhost:7141/images/${product.imageUrl}`
                                                    : "https://localhost:7141/images/urunGorseliYok.jpg"
                                            }
                                            alt={product.name}
                                            sx={{
                                                objectFit: "cover",
                                                width: '100%',
                                                height: '100%',
                                                transition: 'transform 0.5s ease',
                                            }}
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                if (target.src !== "https://localhost:7141/images/urunGorseliYok.jpg") {
                                                    target.src = "https://localhost:7141/images/urunGorseliYok.jpg";
                                                }
                                            }}
                                        />
                                        {/* Soft gradient overlay */}
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                bottom: 0,
                                                background: 'linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.1))',
                                            }}
                                        />
                                    </Paper>
                                </Box>
                            </Grid2>

                            {/* Sağ taraf: Detaylar */}
                            <Grid2 size={{ xs: 12, md: 6 }}>
                                <Box sx={{ p: { xs: 4, md: 6 }, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <Box>
                                        {/* Header */}
                                        <Box sx={{ mb: 4 }}>
                                            <Typography
                                                variant="h3"
                                                sx={{
                                                    fontWeight: 800,
                                                    color: '#1a202c',
                                                    lineHeight: 1.2,
                                                    mb: 2,
                                                    fontSize: { xs: '2rem', md: '3rem' }
                                                }}
                                            >
                                                {product.name}
                                            </Typography>

                                            <Chip
                                                label={product.isActive ? "Stokta Mevcut" : "Stokta Yok"}
                                                color={product.isActive ? "success" : "error"}
                                                size="medium"
                                                sx={{
                                                    fontWeight: 700,
                                                    fontSize: '0.875rem',
                                                    px: 2,
                                                    py: 0.5,
                                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                                }}
                                            />
                                        </Box>

                                        {/* Description */}
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                color: '#4a5568',
                                                lineHeight: 1.7,
                                                fontSize: '1.1rem',
                                                mb: 4
                                            }}
                                        >
                                            {product.description || "Bu ürün için detaylı açıklama henüz eklenmemiş."}
                                        </Typography>

                                        <Divider sx={{ my: 3, borderColor: '#e2e8f0' }} />

                                        {/* Price Section */}
                                        <Box
                                            sx={{
                                                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                                                borderRadius: 4,
                                                p: 3,
                                                mb: 4,
                                                textAlign: 'center',
                                                boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
                                                position: 'relative',
                                                overflow: 'hidden'
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    top: -20,
                                                    right: -20,
                                                    width: 60,
                                                    height: 60,
                                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                                    borderRadius: '50%'
                                                }}
                                            />
                                            <LocalOffer
                                                sx={{
                                                    color: 'white',
                                                    fontSize: 32,
                                                    mb: 1,
                                                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                                                }}
                                            />
                                            <Typography
                                                variant="h2"
                                                sx={{
                                                    fontWeight: 900,
                                                    color: 'white',
                                                    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                                                    mb: 1,
                                                    fontSize: { xs: '2.5rem', md: '3.5rem' }
                                                }}
                                            >
                                                {product.price.toFixed(2)} ₺
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: 'rgba(255,255,255,0.9)',
                                                    fontWeight: 500
                                                }}
                                            >
                                                KDV Dahil • Ücretsiz Kargo
                                            </Typography>
                                        </Box>

                                        {/* Stock Warning */}
                                        {product.stock <= 10 && product.stock > 0 && (
                                            <Box
                                                sx={{
                                                    background: 'linear-gradient(135deg, #fed7aa, #fdba74)',
                                                    borderRadius: 3,
                                                    p: 3,
                                                    mb: 4,
                                                    border: '2px solid #fb923c',
                                                    boxShadow: '0 4px 20px rgba(251, 146, 60, 0.2)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 2
                                                }}
                                            >
                                                <Inventory sx={{ color: '#ea580c', fontSize: 28 }} />
                                                <Box>
                                                    <Typography
                                                        variant="h6"
                                                        sx={{
                                                            fontWeight: 800,
                                                            color: '#ea580c',
                                                            mb: 0.5
                                                        }}
                                                    >
                                                        ⚠️ Son {product.stock} Ürün!
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{ color: '#c2410c' }}
                                                    >
                                                        Stoklar tükenmeden önce sipariş verin
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        )}
                                    </Box>

                                    {/* Add to Cart Button */}
                                    <Box>
                                        <Button
                                            variant="contained"
                                            size="large"
                                            fullWidth
                                            startIcon={<ShoppingCart />}
                                            disabled={product.stock === 0}
                                            onClick={() => handleAddItem(product.id)}
                                            sx={{
                                                borderRadius: 4,
                                                py: 2,
                                                px: 4,
                                                textTransform: "none",
                                                fontWeight: 700,
                                                fontSize: '1.2rem',
                                                background: product.stock === 0
                                                    ? 'linear-gradient(135deg, #9ca3af, #6b7280)'
                                                    : 'linear-gradient(135deg, #10b981, #059669)',
                                                boxShadow: product.stock === 0
                                                    ? 'none'
                                                    : '0 8px 25px rgba(16, 185, 129, 0.4)',
                                                '&:hover': {
                                                    background: product.stock === 0
                                                        ? 'linear-gradient(135deg, #9ca3af, #6b7280)'
                                                        : 'linear-gradient(135deg, #059669, #047857)',
                                                    boxShadow: product.stock === 0
                                                        ? 'none'
                                                        : '0 12px 35px rgba(16, 185, 129, 0.6)',
                                                    transform: product.stock === 0 ? 'none' : 'translateY(-2px)',
                                                },
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            {product.stock === 0 ? "Stokta Yok" : "Sepete Ekle"}
                                        </Button>
                                    </Box>
                                </Box>
                            </Grid2>
                        </Grid2>
                    </Paper>
                </Fade>
            </Container>
        </Box>
    );
}
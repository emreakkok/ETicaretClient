import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Box,
    Chip
} from "@mui/material";
import { ShoppingCart, Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../hooks/hooks";
import { addItemToCart } from "../../pages/counter/cartSlite";
import type { IProduct } from "../../model/IProduct";

interface ProductCardProps {
    product: IProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation(); // Card tıklamasını engellemek için
        dispatch(addItemToCart({ productId: product.id }) as any);
    };

    const handleProductDetail = () => {
        navigate(`/catalog/${product.id}`);
    };

    return (
        <Card
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 4,
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 8px 40px rgba(0,0,0,0.15)",
                },
            }}
            onClick={handleProductDetail}
        >
            <CardMedia
                component="img"
                height="240"
                image={
                    product.imageUrl
                        ? `https://localhost:7141/images/${product.imageUrl}`
                        : "https://localhost:7141/images/urunGorseliYok.jpg"
                }
                alt={product.name}
                sx={{
                    objectFit: "cover",
                    borderRadius: "16px 16px 0 0",
                }}
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src !== "https://localhost:7141/images/urunGorseliYok.jpg") {
                        target.src = "https://localhost:7141/images/urunGorseliYok.jpg";
                    }
                }}
            />
            <CardContent
                sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    p: 3,
                }}
            >
                <Box sx={{ mb: 2 }}>
                    <Typography
                        variant="h6"
                        component="h2"
                        sx={{
                            fontWeight: 700,
                            color: "text.primary",
                            mb: 1,
                            minHeight: "3rem",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                        }}
                    >
                        {product.name}
                    </Typography>

                    <Chip
                        label={product.isActive ? "Stokta Mevcut" : "Stokta Yok"}
                        color={product.isActive ? "success" : "error"}
                        size="small"
                        sx={{ mb: 2 }}
                    />
                </Box>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        flexGrow: 1,
                        mb: 2,
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                    }}
                >
                    {product.description || "Bu ürün için detaylı açıklama henüz eklenmemiş."}
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: "auto",
                        gap: 2,
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 800,
                            color: "primary.main",
                        }}
                    >
                        {product.price.toFixed(2)} ₺
                    </Typography>

                    <Box sx={{ display: "flex", gap: 1 }}>
                        <Button
                            variant="outlined"
                            startIcon={<Visibility />}
                            onClick={handleProductDetail}
                            sx={{
                                borderRadius: 3,
                                textTransform: "none",
                                fontWeight: 600,
                                minWidth: "auto",
                                px: 2,
                            }}
                        >
                            Detay
                        </Button>

                        <Button
                            variant="contained"
                            startIcon={<ShoppingCart />}
                            onClick={handleAddToCart}
                            disabled={product.stock === 0}
                            sx={{
                                borderRadius: 3,
                                textTransform: "none",
                                fontWeight: 600,
                                px: 3,
                                py: 1,
                                background: product.stock === 0
                                    ? "linear-gradient(135deg, #9ca3af, #6b7280)"
                                    : "linear-gradient(135deg, #10b981, #059669)",
                                "&:hover": {
                                    background: product.stock === 0
                                        ? "linear-gradient(135deg, #9ca3af, #6b7280)"
                                        : "linear-gradient(135deg, #059669, #047857)",
                                    transform: product.stock === 0 ? "none" : "scale(1.05)",
                                },
                            }}
                        >
                            Sepete Ekle
                        </Button>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}
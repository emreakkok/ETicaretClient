import { useEffect, useState } from "react";
import type { IProduct } from "../../model/IProduct";
import ProductList from "../../components/productListComponent/ProductList";
import requests from "../../api/request";
import { Box, CircularProgress, Container, Typography, Alert, AlertTitle } from "@mui/material";

export default function CatalogPage() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        requests.Catalog.list()
            .then((data) => {
                setProducts(data);
                setError(null);
            })
            .catch((err) => {
                console.error(err);
                setError("Ürünler yüklenirken bir sorun oluştu.");
            })
            .finally(() => setLoading(false));
    }, []);

    // Yükleme durumu
    if (loading) {
        return (
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: "grey.50" // Temadan renk kullanımı
                }}
            >
                <CircularProgress
                    size={60}
                    thickness={4}
                    sx={{
                        color: 'primary.main', // Temadan renk kullanımı
                        mb: 3
                    }}
                />
                <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ fontWeight: 500 }}
                >
                    Ürünler yükleniyor...
                </Typography>
                <Box
                    sx={{
                        mt: 2,
                        width: 200,
                        height: 2,
                        background: (theme) => `linear-gradient(90deg, transparent, ${theme.palette.primary.main}, transparent)`,
                        borderRadius: 1,
                        animation: 'pulse 2s infinite',
                        '@keyframes pulse': {
                            '0%': { transform: 'scaleX(0)' },
                            '50%': { transform: 'scaleX(1)' },
                            '100%': { transform: 'scaleX(0)' },
                        }
                    }}
                />
            </Box>
        );
    }

    // Hata durumu
    if (error) {
        return (
            <Container maxWidth="sm" sx={{ py: 8 }}>
                <Alert severity="error" variant="filled" sx={{ borderRadius: 2, p: 3, boxShadow: 3 }}>
                    <AlertTitle>Hata Oluştu</AlertTitle>
                    <Typography variant="body1">
                        {error}
                    </Typography>
                </Alert>
            </Container>
        );
    }

    return <ProductList products={products} />;
}
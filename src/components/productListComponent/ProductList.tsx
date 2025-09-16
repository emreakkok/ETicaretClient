import type { IProduct } from "../../model/IProduct";
import { Grid2, Container, Box, Typography, Fade } from "@mui/material";
import ProductCard from "../productCardComponent/ProductCard";

interface ProductListProps {
    products: IProduct[];
}

export default function ProductList({ products }: ProductListProps) {
    if (products.length === 0) {
        return (
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Box
                    sx={{
                        textAlign: 'center',
                        background: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)',
                        borderRadius: 4,
                        p: 6,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            color: '#6b7280',
                            fontWeight: 600,
                            mb: 2
                        }}
                    >
                        Henüz ürün bulunamadı
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Yeni ürünler yakında eklenecek...
                    </Typography>
                </Box>
            </Container>
        );
    }

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                py: 4
            }}
        >
            <Container maxWidth="xl">
                {/* Header Section */}
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 800,
                            background: 'linear-gradient(135deg, #667eea, #764ba2)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            mb: 2,
                            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                    >
                        Ürün Kataloğu
                    </Typography>
                    <Box
                        sx={{
                            width: 80,
                            height: 4,
                            background: 'linear-gradient(135deg, #667eea, #764ba2)',
                            borderRadius: 2,
                            mx: 'auto',
                            mb: 2
                        }}
                    />
                    <Typography
                        variant="h6"
                        color="text.secondary"
                        sx={{ fontWeight: 500 }}
                    >
                        {products.length} ürün bulundu
                    </Typography>
                </Box>

                {/* Products Grid */}
                <Fade in={true} timeout={800}>
                    <Grid2
                        container
                        spacing={4}
                        sx={{
                            px: 2,
                            justifyContent: 'center'
                        }}
                    >
                        {products.map((product, index) => (
                            <Fade
                                key={product.id}
                                in={true}
                                timeout={600 + (index * 100)}
                                style={{ transitionDelay: `${index * 50}ms` }}
                            >
                                <Grid2
                                    size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                                    sx={{
                                        display: 'flex',
                                        minHeight: '400px'
                                    }}
                                >
                                    <ProductCard product={product} />
                                </Grid2>
                            </Fade>
                        ))}
                    </Grid2>
                </Fade>

                {/* Bottom Decoration */}
                <Box
                    sx={{
                        mt: 8,
                        textAlign: 'center',
                        py: 4
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            height: 2,
                            background: 'linear-gradient(90deg, transparent, #667eea, #764ba2, transparent)',
                            borderRadius: 1,
                            mb: 3
                        }}
                    />
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontStyle: 'italic' }}
                    >
                        Daha fazla ürün için sayfayı takip etmeye devam edin
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}
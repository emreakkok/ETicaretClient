import {
    Container,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Box,
    Divider,
    IconButton,
    Button,
    Chip,
    Avatar,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { useAppDispatch } from "../../hooks/hooks";
import {
    addItemToCart,
    decreaseItemQuantity,
    getCartAsync,
} from "../counter/cartSlite";
import { useEffect } from "react";
import { Link } from "react-router";

export default function ShoppingCartPage() {
    const dispatch = useAppDispatch();
    const cart = useSelector((state: RootState) => state.cart.cart);
    const status = useSelector((state: RootState) => state.cart.status);

    useEffect(() => {
        dispatch(getCartAsync() as any);
    }, [dispatch]);

    // güvenli şekilde cartItems al
    const cartItems = cart?.cartItems || [];

    if (cartItems.length === 0) {
        return (
            <Container sx={{ textAlign: "center", mt: 8 }}>
                <Box
                    sx={{
                        background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
                        borderRadius: 4,
                        p: 6,
                        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{ mb: 2, fontWeight: 600, color: "text.secondary" }}
                    >
                        Sepetiniz Boş 🛒
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Alışverişe başlamak için ürünleri keşfedin!
                    </Typography>
                </Box>
            </Container>
        );
    }

    const total = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const handleIncreaseQuantity = (productId: number) => {
        dispatch(addItemToCart({ productId, quantity: 1 }) as any);
    };

    const handleDecreaseQuantity = (productId: number) => {
        dispatch(decreaseItemQuantity({ productId, quantity: 1 }) as any);
    };

    return (
        <Container sx={{ mt: 4, mb: 4 }}>
            <Paper
                elevation={6}
                sx={{
                    borderRadius: 4,
                    overflow: "hidden",
                    bgcolor: "background.paper",
                }}
            >
                {/* Header */}
                <Box
                    sx={{
                        background: "linear-gradient(135deg, #667eea, #764ba2)",
                        color: "white",
                        p: 4,
                        textAlign: "center",
                    }}
                >
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 700,
                            mb: 1,
                            textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                        }}
                    >
                        🛒 Sepetim
                    </Typography>
                    <Chip
                        label={`${totalItems} Ürün`}
                        sx={{
                            backgroundColor: "rgba(255,255,255,0.2)",
                            color: "white",
                            fontWeight: 600,
                            backdropFilter: "blur(10px)",
                        }}
                    />
                </Box>

                <Box sx={{ p: { xs: 1, md: 3 } }}>
                    <Table>
                        <TableHead>
                            <TableRow
                                sx={{
                                    bgcolor: "grey.100",
                                    "& .MuiTableCell-head": {
                                        fontWeight: 700,
                                        color: "text.primary",
                                        fontSize: "1rem",
                                    },
                                }}
                            >
                                <TableCell>Ürün</TableCell>
                                <TableCell align="center">Adet</TableCell>
                                <TableCell align="center">Birim Fiyat</TableCell>
                                <TableCell align="center">Toplam</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cartItems.map((item) => (
                                <TableRow
                                    key={item.productId}
                                    sx={{
                                        transition: "all 0.2s ease",
                                        "&:hover": {
                                            bgcolor: "grey.50",
                                            transform: "scale(1.01)",
                                        },
                                    }}
                                >
                                    <TableCell>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                                            <Avatar
                                                src={
                                                    item.imageUrl
                                                        ? `https://localhost:7141/images/${item.imageUrl}`
                                                        : "https://localhost:7141/images/urunGorseliYok.jpg"
                                                }
                                                alt={item.name}
                                                sx={{
                                                    width: 70,
                                                    height: 70,
                                                    borderRadius: 3,
                                                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                                }}
                                            />
                                            <Typography
                                                variant="subtitle1"
                                                sx={{ fontWeight: 600, color: "text.primary" }}
                                            >
                                                {item.name}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                gap: 1,
                                                bgcolor: "grey.200",
                                                borderRadius: 3,
                                                p: "4px",
                                                maxWidth: 120,
                                                mx: "auto",
                                            }}
                                        >
                                            <IconButton
                                                size="small"
                                                onClick={() => handleDecreaseQuantity(item.productId)}
                                                disabled={status === "pending"}
                                                sx={{
                                                    bgcolor: "error.main",
                                                    color: "white",
                                                    "&:hover": { bgcolor: "error.dark" },
                                                }}
                                            >
                                                <RemoveCircleOutlineIcon fontSize="small" />
                                            </IconButton>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontWeight: 700,
                                                    minWidth: 30,
                                                    textAlign: "center",
                                                    color: "text.primary",
                                                }}
                                            >
                                                {item.quantity}
                                            </Typography>
                                            <IconButton
                                                size="small"
                                                onClick={() => handleIncreaseQuantity(item.productId)}
                                                disabled={status === "pending"}
                                                sx={{
                                                    bgcolor: "success.main",
                                                    color: "white",
                                                    "&:hover": { bgcolor: "success.dark" },
                                                }}
                                            >
                                                <AddCircleOutlineIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography
                                            variant="h6"
                                            sx={{ fontWeight: 600, color: "text.secondary" }}
                                        >
                                            {item.price.toFixed(2)} ₺
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 700,
                                                color: "success.main",
                                                fontSize: "1.1rem",
                                            }}
                                        >
                                            {(item.price * item.quantity).toFixed(2)} ₺
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <Divider sx={{ mt: 4, mb: 3 }} />

                    {/* Footer */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            bgcolor: "grey.50",
                            p: 3,
                            borderRadius: 3,
                            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                        }}
                    >
                        <Box>
                            <Typography
                                variant="h4"
                                sx={{ fontWeight: 800, color: "text.primary", mb: 0.5 }}
                            >
                                Toplam: {total.toFixed(2)} ₺
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ fontWeight: 500 }}
                            >
                                {totalItems} ürün • KDV dahil
                            </Typography>
                        </Box>
                        <Button
                            variant="contained"
                            size="large"
                            component={Link} to="/checkout"
                            startIcon={<ShoppingCartCheckoutIcon />}
                            sx={{
                                borderRadius: 3,
                                px: 4,
                                py: 1.5,
                                fontSize: "1.1rem",
                                fontWeight: 700,
                                textTransform: "none",
                                background: "linear-gradient(135deg, #10b981, #059669)",
                                boxShadow: "0 8px 25px rgba(16, 185, 129, 0.4)",
                                "&:hover": {
                                    background: "linear-gradient(135deg, #059669, #047857)",
                                    boxShadow: "0 12px 35px rgba(16, 185, 129, 0.6)",
                                    transform: "translateY(-2px)",
                                },
                            }}
                        >
                            Satın Al
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}

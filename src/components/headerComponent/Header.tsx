import {
    AccountCircle,
    ShoppingCart,
    Store,
    Home,
    Category,
    Info,
    ContactMail,
    Login,
    PersonAdd,
    Logout
} from "@mui/icons-material";
import {
    AppBar,
    Badge,
    Box,
    Button,
    IconButton,
    Toolbar,
    Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/store";
import { logout } from "../../pages/counter/authSlice";
import { clearCart } from "../../pages/counter/cartSlite";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";

export default function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isAuthenticated = useSelector(
        (state: RootState) => state.auth.isAuthenticated
    );

    // Redux state'ten sepet verisini al
    const cart = useSelector((state: RootState) => state.cart.cart);

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    const handleLogout = () => {
        dispatch(logout());
        dispatch(clearCart());
        toast.info("Oturum kapatıldı.");
        navigate("/login");
    };

    // ✅ cart ve cartItems null olabilir, bu yüzden güvenli hesaplama
    const cartItemCount =
        cart?.cartItems?.reduce((total, item) => total + item.quantity, 0) ?? 0;

    const menuItems = [
        { label: "Ana Sayfa", path: "/", icon: <Home /> },
        { label: "Katalog", path: "/catalog", icon: <Category /> },
        { label: "Hakkımızda", path: "/about", icon: <Info /> },
        { label: "İletişim", path: "/contact", icon: <ContactMail /> },
    ];

    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                backdropFilter: "blur(20px)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            }}
        >
            <Toolbar
                sx={{
                    justifyContent: "space-between",
                    minHeight: { xs: 64, sm: 70 },
                    px: { xs: 2, sm: 3 },
                    gap: 2,
                }}
            >
                {/* Sol Taraf - Logo */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        cursor: "pointer",
                        "&:hover": {
                            "& .logo-icon": { transform: "rotate(10deg) scale(1.1)" },
                            "& .logo-text": {
                                textShadow: "0 4px 12px rgba(255,255,255,0.3)",
                            },
                        },
                        transition: "all 0.3s ease",
                    }}
                    onClick={() => handleNavigation("/")}
                >
                    <Store
                        className="logo-icon"
                        sx={{
                            fontSize: { xs: 28, sm: 36 },
                            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
                            transition: "transform 0.3s ease",
                        }}
                    />
                    <Typography
                        className="logo-text"
                        variant="h5"
                        component="h1"
                        sx={{
                            fontWeight: 800,
                            display: { xs: "none", sm: "block" },
                            background: "linear-gradient(45deg, #ffffff, #e2e8f0)",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            fontSize: { sm: "1.3rem", md: "1.5rem" },
                            letterSpacing: "0.5px",
                            transition: "all 0.3s ease",
                        }}
                    >
                        E-Ticaret Client
                    </Typography>
                </Box>

                {/* Orta Kısım - Menü */}
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        gap: { xs: 1, sm: 2 },
                        maxWidth: { xs: "100%", md: "70%" },
                    }}
                >
                    {menuItems.map((item) => (
                        <Button
                            key={item.path}
                            color="inherit"
                            startIcon={item.icon}
                            onClick={() => handleNavigation(item.path)}
                            sx={{
                                textTransform: "none",
                                fontWeight: 600,
                                px: { xs: 1, sm: 2 },
                                py: 1,
                                borderRadius: 3,
                                "&:hover": {
                                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                                    transform: "translateY(-2px)",
                                },
                                transition: "all 0.3s ease",
                            }}
                        >
                            {item.label}
                        </Button>
                    ))}
                </Box>

                {/* Sağ Taraf */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {!isAuthenticated && (
                        <>
                            <Button
                                color="inherit"
                                startIcon={<Login />}
                                onClick={() => handleNavigation("/login")}
                                sx={{ textTransform: "none", fontWeight: 600 }}
                            >
                                Giriş Yap
                            </Button>
                            <Button
                                color="inherit"
                                startIcon={<PersonAdd />}
                                onClick={() => handleNavigation("/register")}
                                sx={{ textTransform: "none", fontWeight: 600 }}
                            >
                                Kayıt Ol
                            </Button>
                        </>
                    )}

                    {/* Sepet */}
                    <IconButton
                        color="inherit"
                        size="large"
                        title="Sepetim"
                        component={Link}
                        to="/cart"
                        sx={{
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                            "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
                            transition: "all 0.3s ease",
                        }}
                    >
                        <Badge
                            badgeContent={cartItemCount}
                            color="error"
                            sx={{
                                "& .MuiBadge-badge": {
                                    backgroundColor: "#ef4444",
                                    color: "white",
                                    fontWeight: 700,
                                    fontSize: "0.75rem",
                                },
                            }}
                        >
                            <ShoppingCart />
                        </Badge>
                    </IconButton>

                    {isAuthenticated && (
                        <IconButton
                            color="inherit"
                            size="large"
                            title="Hesabım"
                            component={Link}
                            to="/orders"
                            sx={{
                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
                                transition: "all 0.3s ease",
                            }}
                        >
                            <AccountCircle />
                        </IconButton>
                    )}

                    {isAuthenticated && (
                        <Button
                            color="inherit"
                            startIcon={<Logout />}
                            onClick={handleLogout}
                            sx={{ textTransform: "none", fontWeight: 600 }}
                        >
                            Çıkış Yap
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}

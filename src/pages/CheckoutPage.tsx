import { useState, useEffect } from "react";
import {
    Container,
    Typography,
    TextField,
    Button,
    Box,
    Paper,
    Divider,
    Grid,
    Stepper,
    Step,
    StepLabel,
    Alert,
    CircularProgress,
    Avatar,
    InputAdornment,
    IconButton,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function CheckoutPage() {
    // State variables
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [showCVC, setShowCVC] = useState(false);

    // Form states
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [addressLine, setAddressLine] = useState("");

    // Payment states
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvc, setCvc] = useState("");
    const [cardHolderName, setCardHolderName] = useState("");

    const [activeStep, setActiveStep] = useState(0);
    const steps = ['Kişisel Bilgiler', 'Adres Bilgileri', 'Ödeme Bilgileri', 'Onay'];

    useEffect(() => {
        // Gerçek API çağrısı
        const fetchCart = async () => {
            try {
                // requests.Cart.get() kullanarak sepeti getir
                const response = await fetch('https://localhost:7141/api/cart', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setCartItems(data.cartItems || []);
                } else {
                    // Mock data for testing if API fails
                    const mockCartItems = [
                        { productId: 1, name: "iPhone 15 Pro", price: 45000, quantity: 1, imageUrl: "iphone.jpg" },
                        { productId: 2, name: "AirPods Pro", price: 8500, quantity: 2, imageUrl: "airpods.jpg" }
                    ];
                    setCartItems(mockCartItems);
                }
            } catch (error) {
                console.error('Cart fetch error:', error);
                // Mock data for testing
                const mockCartItems = [
                    { productId: 1, name: "iPhone 15 Pro", price: 45000, quantity: 1, imageUrl: "iphone.jpg" },
                    { productId: 2, name: "AirPods Pro", price: 8500, quantity: 2, imageUrl: "airpods.jpg" }
                ];
                setCartItems(mockCartItems);
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, []);

    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // Card number formatting
    const formatCardNumber = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = matches && matches[0] || '';
        const parts = [];
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        if (parts.length) {
            return parts.join(' ');
        } else {
            return v;
        }
    };

    // Expiry date formatting
    const formatExpiryDate = (value: string) => {
        const v = value.replace(/\D/g, '');
        if (v.length >= 2) {
            return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
        }
        return v;
    };

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatCardNumber(e.target.value);
        if (formatted.length <= 19) { // 16 digits + 3 spaces
            setCardNumber(formatted);
        }
    };

    const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatExpiryDate(e.target.value);
        if (formatted.length <= 5) { // MM/YY
            setExpiryDate(formatted);
        }
    };

    const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        if (value.length <= 4) {
            setCvc(value);
        }
    };

    const validateStep = (step: number) => {
        switch (step) {
            case 0:
                return firstName && lastName && phone;
            case 1:
                return city && addressLine;
            case 2:
                return cardNumber && expiryDate && cvc && cardHolderName;
            default:
                return true;
        }
    };

    const handleNext = () => {
        if (validateStep(activeStep)) {
            setActiveStep((prevStep) => prevStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!cartItems.length) return setError("Sepetiniz boş.");

        setSubmitting(true);
        setError("");

        try {
            const orderData = {
                firstName,
                lastName,
                phone,
                city,
                addressLine,
                cardNumber: cardNumber.replace(/\s/g, ''),
                expiryDate,
                cvc,
                cardHolderName
            };

            // Gerçek API çağrısı
            const response = await fetch('https://localhost:7141/api/order/CreateOrder', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Order created successfully:", result);
                setSuccess(true);
                setActiveStep(4); // Success step
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Sipariş oluşturulamadı.");
            }
        } catch (err: any) {
            console.error('Order creation error:', err);
            setError("Bağlantı hatası oluştu. Lütfen tekrar deneyin.");
        } finally {
            setSubmitting(false);
        }
    };

    const renderStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <PersonIcon color="primary" />
                            Kişisel Bilgiler
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Ad"
                                    fullWidth
                                    required
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    sx={{ mb: 2 }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Soyad"
                                    fullWidth
                                    required
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    sx={{ mb: 2 }}
                                />
                            </Grid>
                        </Grid>
                        <TextField
                            label="Telefon"
                            fullWidth
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="05XX XXX XX XX"
                        />
                    </Box>
                );

            case 1:
                return (
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <LocationOnIcon color="primary" />
                            Adres Bilgileri
                        </Typography>
                        <TextField
                            label="Şehir"
                            fullWidth
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Adres"
                            fullWidth
                            required
                            multiline
                            rows={3}
                            value={addressLine}
                            onChange={(e) => setAddressLine(e.target.value)}
                            placeholder="Tam adresinizi giriniz..."
                        />
                    </Box>
                );

            case 2:
                return (
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CreditCardIcon color="primary" />
                            Ödeme Bilgileri
                        </Typography>
                        <TextField
                            label="Kart Üzerindeki İsim"
                            fullWidth
                            required
                            value={cardHolderName}
                            onChange={(e) => setCardHolderName(e.target.value)}
                            sx={{ mb: 2 }}
                            placeholder="AD SOYAD"
                        />
                        <TextField
                            label="Kart Numarası"
                            fullWidth
                            required
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            sx={{ mb: 2 }}
                            placeholder="1234 5678 9012 3456"
                            inputProps={{ maxLength: 19 }}
                        />
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    label="Son Kullanma"
                                    fullWidth
                                    required
                                    value={expiryDate}
                                    onChange={handleExpiryChange}
                                    placeholder="MM/YY"
                                    inputProps={{ maxLength: 5 }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="CVC"
                                    fullWidth
                                    required
                                    type={showCVC ? "text" : "password"}
                                    value={cvc}
                                    onChange={handleCvcChange}
                                    placeholder="123"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowCVC(!showCVC)}
                                                    edge="end"
                                                >
                                                    {showCVC ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                    inputProps={{ maxLength: 4 }}
                                />
                            </Grid>
                        </Grid>
                        <Alert severity="info" sx={{ mt: 2 }}>
                            Test kartı: 5528 7900 0000 0008, 12/30, CVC: 123
                        </Alert>
                    </Box>
                );

            case 3:
                return (
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>Sipariş Özeti</Typography>
                        <Paper sx={{ p: 2, mb: 2, bgcolor: 'grey.50' }}>
                            <Typography variant="subtitle2" color="text.secondary">Kişisel Bilgiler</Typography>
                            <Typography>{firstName} {lastName}</Typography>
                            <Typography>{phone}</Typography>

                            <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>Adres</Typography>
                            <Typography>{city}</Typography>
                            <Typography>{addressLine}</Typography>

                            <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>Ödeme</Typography>
                            <Typography>**** **** **** {cardNumber.slice(-4)}</Typography>
                            <Typography>{cardHolderName}</Typography>
                        </Paper>
                    </Box>
                );

            default:
                return null;
        }
    };

    if (loading) {
        return (
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                <CircularProgress size={60} />
            </Container>
        );
    }

    if (success) {
        return (
            <Container sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
                <Paper sx={{ p: 6, borderRadius: 4 }}>
                    <CheckCircleIcon sx={{ fontSize: 100, color: 'success.main', mb: 2 }} />
                    <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'success.main' }}>
                        Siparişiniz Alındı! 🎉
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                        Ödemeniz başarıyla gerçekleşti. Siparişiniz en kısa sürede hazırlanacak.
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => window.location.href = '/'}
                        sx={{ borderRadius: 3, px: 4 }}
                    >
                        Ana Sayfaya Dön
                    </Button>
                </Paper>
            </Container>
        );
    }

    return (
        <Container sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={4}>
                {/* Sol Taraf - Form */}
                <Grid item xs={12} lg={8}>
                    <Paper sx={{ p: 4, borderRadius: 4, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
                        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, textAlign: 'center' }}>
                            🛒 Ödeme Sayfası
                        </Typography>

                        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>

                        {error && (
                            <Alert severity="error" sx={{ mb: 3 }}>
                                {error}
                            </Alert>
                        )}

                        <form onSubmit={handleSubmit}>
                            {renderStepContent(activeStep)}

                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 3 }}>
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{ mr: 1 }}
                                >
                                    Geri
                                </Button>
                                <Box sx={{ flex: '1 1 auto' }} />
                                {activeStep === steps.length - 1 ? (
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        disabled={submitting}
                                        startIcon={submitting ? <CircularProgress size={20} /> : undefined}
                                        sx={{
                                            borderRadius: 3,
                                            px: 4,
                                            background: 'linear-gradient(135deg, #10b981, #059669)',
                                        }}
                                    >
                                        {submitting ? 'İşleniyor...' : 'Siparişi Onayla'}
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={handleNext}
                                        disabled={!validateStep(activeStep)}
                                        variant="contained"
                                        sx={{ borderRadius: 3, px: 4 }}
                                    >
                                        İleri
                                    </Button>
                                )}
                            </Box>
                        </form>
                    </Paper>
                </Grid>

                {/* Sağ Taraf - Sipariş Özeti */}
                <Grid item xs={12} lg={4}>
                    <Paper sx={{ p: 3, borderRadius: 4, position: 'sticky', top: 20 }}>
                        <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <ShoppingCartIcon />
                            Sipariş Özeti
                        </Typography>

                        {cartItems.map((item) => (
                            <Box key={item.productId} sx={{ mb: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Avatar
                                        src={`https://localhost:7141/images/${item.imageUrl}`}
                                        alt={item.name}
                                        sx={{ width: 50, height: 50, borderRadius: 2 }}
                                    />
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                            {item.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.quantity} x {item.price.toLocaleString('tr-TR')} ₺
                                        </Typography>
                                    </Box>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                                        {(item.price * item.quantity).toLocaleString('tr-TR')} ₺
                                    </Typography>
                                </Box>
                                <Divider sx={{ mt: 1 }} />
                            </Box>
                        ))}

                        <Box sx={{ mt: 3, p: 2, bgcolor: 'primary.50', borderRadius: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography>Ara Toplam:</Typography>
                                <Typography>{total.toLocaleString('tr-TR')} ₺</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography>Kargo:</Typography>
                                <Typography color="success.main">Ücretsiz</Typography>
                            </Box>
                            <Divider sx={{ my: 1 }} />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                    Toplam:
                                </Typography>
                                <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                                    {total.toLocaleString('tr-TR')} ₺
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}
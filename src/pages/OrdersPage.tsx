import { useEffect, useState } from "react";
import requests from "../api/request";
import {
    Container,
    Typography,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Chip,
    Button,
} from "@mui/material";
import { useNavigate } from "react-router";

interface OrderItemDto {
    id: number;
    productName: string;
    productImage: string;
    quantity: number;
    price: number;
}

interface OrderDto {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    city: string;
    addressLine: string;
    orderStatus: string;
    orderItems: OrderItemDto[];
}

export default function OrdersPage() {
    const [orders, setOrders] = useState<OrderDto[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        requests.Orders.getOrders().then(setOrders).catch(console.error);
    }, []);

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" fontWeight={700} gutterBottom>
                Siparişlerim
            </Typography>
            {orders.length === 0 ? (
                <Typography color="text.secondary">Henüz siparişiniz yok.</Typography>
            ) : (
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Ad Soyad</TableCell>
                                <TableCell>Şehir</TableCell>
                                <TableCell>Durum</TableCell>
                                <TableCell>Ürün Sayısı</TableCell>
                                <TableCell>Aksiyon</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order.id} hover>
                                    <TableCell>{order.id}</TableCell>
                                    <TableCell>
                                        {order.firstName} {order.lastName}
                                    </TableCell>
                                    <TableCell>{order.city}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={order.orderStatus}
                                            color={
                                                order.orderStatus === "Completed"
                                                    ? "success"
                                                    : "warning"
                                            }
                                        />
                                    </TableCell>
                                    <TableCell>{order.orderItems.length}</TableCell>
                                    <TableCell>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            onClick={() => navigate(`/orders/${order.id}`)}
                                        >
                                            Detaylar
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            )}
        </Container>
    );
}

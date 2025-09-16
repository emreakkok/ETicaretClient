import { useEffect, useState } from "react";
import { useParams } from "react-router";
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
    Avatar,
} from "@mui/material";

interface OrderItemDto {
    id: number;
    productId: number;
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

export default function OrderDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const [order, setOrder] = useState<OrderDto | null>(null);

    useEffect(() => {
        if (id) {
            requests.Orders.getOrder(Number(id)).then(setOrder).catch(console.error);
        }
    }, [id]);

    if (!order) {
        return (
            <Container sx={{ mt: 4 }}>
                <Typography>Yükleniyor...</Typography>
            </Container>
        );
    }

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" fontWeight={700} gutterBottom>
                Sipariş #{order.id}
            </Typography>
            <Typography variant="body1" gutterBottom>
                {order.firstName} {order.lastName} - {order.city}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
                {order.addressLine} | Tel: {order.phone}
            </Typography>
            <Typography variant="body2" color="primary" gutterBottom>
                Durum: {order.orderStatus}
            </Typography>

            <Paper sx={{ mt: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ürün</TableCell>
                            <TableCell>Ad</TableCell>
                            <TableCell>Adet</TableCell>
                            <TableCell>Fiyat</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {order.orderItems.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>
                                    <Avatar src={item.productImage} variant="square" />
                                </TableCell>
                                <TableCell>{item.productName}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>{item.price} ₺</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Container>
    );
}

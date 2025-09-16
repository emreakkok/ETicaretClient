import axios, { AxiosError, type AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Routes";

axios.defaults.baseURL = "https://localhost:7141/api/";
axios.defaults.withCredentials = true;

// JWT Token interceptor - otomatik olarak Authorization header'ını ekler
axios.interceptors.request.use(config => {
    const token = localStorage.getItem("jwt");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    return response;
}, (error: AxiosError) => {
    const { data, status } = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if (data.errors) {
                const modelErrors: string[] = [];

                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modelErrors.push(...data.errors[key]);
                    }
                }

                throw modelErrors;
            }

            // Eğer data.errors yoksa ama response bir string array ise
            if (Array.isArray(data)) {
                throw data;
            }

            toast.error(data.title || "Bad Request");
            break;
        case 401:
            // Token geçersiz veya süre dolmuş - kullanıcıyı logout yap
            localStorage.removeItem("jwt");
            toast.error("Oturum süreniz dolmuş. Lütfen tekrar giriş yapın.");
            router.navigate("/login");
            break;
        case 403:
            toast.error("Bu işlem için yetkiniz yok.");
            break;
        case 404:
            router.navigate("/not-found");
            break;
        case 500:
            router.navigate("/server-error", { state: { error: data, status: status } });
            break;
        default:
            break;
    }
    return Promise.reject(error.response);
});

const queries = {
    get: (url: string) => axios.get(url).then((response: AxiosResponse) => response.data),
    post: (url: string, body: {}) => axios.post(url, body).then((response: AxiosResponse) => response.data),
    put: (url: string, body: {}) => axios.put(url, body).then((response: AxiosResponse) => response.data),
    delete: (url: string) => axios.delete(url).then((response: AxiosResponse) => response.data)
}

const Errors = {
    get400Error: () => queries.get("/errors/bad-request"),
    get401Error: () => queries.get("/errors/unauthorized"),
    get404Error: () => queries.get("/errors/not-found"),
    get500Error: () => queries.get("/errors/server-error"),
    getValidationError: () => queries.get("/errors/validation-error")
}

const Catalog = {
    list: () => queries.get("products"),
    details: (id: number) => queries.get(`products/${id}`)
}

const Cart = {
    get: () => queries.get("cart"),
    addItem: (productId: number, quantity = 1) => queries.post(`cart?productId=${productId}&quantity=${quantity}`, {}),
    deleteItem: (productId: number, quantity = 1) => queries.delete(`cart?productId=${productId}&quantity=${quantity}`)
}

// Güncellenmiş Orders interface'i - ödeme bilgilerini içerir
interface CreateOrderDto {
    firstName: string;
    lastName: string;
    phone: string;
    city: string;
    addressLine: string;
    // Ödeme bilgileri
    cardNumber: string;
    expiryDate: string;
    cvc: string;
    cardHolderName: string;
}

const Orders = {
    getOrders: () => queries.get("order/GetOrders"),
    getOrder: (id: number) => queries.get(`order/GetOrder/${id}`),
    createOrder: (orderDto: CreateOrderDto) => queries.post("order/CreateOrder", orderDto)
};

const Account = {
    login: (body: { userName: string; password: string }) =>
        queries.post("account", body),
    register: (body: { name: string; userName: string; email: string; password: string }) =>
        queries.post("account/register", body),
    getCurrentUser: () => queries.get("account/currentuser")
};

const requests = {
    Catalog,
    Errors,
    Cart,
    Account,
    Orders
}

export default requests;
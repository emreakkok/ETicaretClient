import { useEffect, type ReactNode } from "react";
import { useAppSelector } from "../hooks/hooks";
import { useNavigate } from "react-router";

interface AuthGuardProps {
    children: ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
    const { isAuthenticated, loading } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, loading, navigate]);

    // Eğer loading devam ediyorsa veya kullanıcı giriş yapmamışsa hiçbir şey renderlama
    if (loading || !isAuthenticated) return null;

    return <>{children}</>;
}

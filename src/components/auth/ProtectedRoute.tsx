import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/auth-context';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { user, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return (
            <div style={{
                width: '100%',
                height: '80vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#0a0a0a',
            }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    border: '2px solid rgba(201, 169, 110, 0.2)',
                    borderTopColor: '#c9a96e',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                }} />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;

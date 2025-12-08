export default function ProtectedRoute({ adminOnly = false }) {
    const { token, isAdmin } = useAuth();

    if (!token) {
        return <Navigate to="/" state={{ message: "Unauthorised user! Please login", type: "error" }} />;
    }

    if (adminOnly && !isAdmin) {
        return <Navigate to="/" state={{ message: "Admin only! Access denied", type: "error" }} />;
    }

    return <Outlet />;
}

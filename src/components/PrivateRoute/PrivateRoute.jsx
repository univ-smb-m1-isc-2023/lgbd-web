import { Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../App';

function PrivateRoute({ children }) {
    const { isLoggedIn } = useContext(AuthContext);
    const location = useLocation();

    return isLoggedIn ? children : <Navigate to="/login" state={{ from: location }} replace />;
}

export default PrivateRoute;
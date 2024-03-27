import { Navigate } from 'react-router-dom';
import { getToken } from '../auth/getToken';

const ProtectedRoute = ({ children }) => {

    return (
        <>
            {(
                getToken() === null ? <Navigate to="/signin" /> : children
            )}
        </>
    );
};

export default ProtectedRoute;
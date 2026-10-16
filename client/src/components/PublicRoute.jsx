import { useNavigate } from 'react-router';
import toast, { LoaderIcon } from 'react-hot-toast';

import { useAuth } from '../context/AuthContext.jsx';

const PublicRoute = ({ children }) => {
    const {user, loading} = useAuth();
    const navigate = useNavigate();

    if(loading){
        return <LoaderIcon/>;
    }

    if(user){
        toast.error("Can't access while logged in");
        navigate('/home');
    }

    return children;
}

export default PublicRoute;
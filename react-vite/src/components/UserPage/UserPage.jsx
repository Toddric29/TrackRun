import { fetchUsers } from "../../redux/users";
import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const LoadUsers = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userList = useSelector(state => state.userState.allUsers)

    useEffect(() => {
        dispatch(fetchUsers())
        .then(() => setIsLoaded(true))
    }, [dispatch])

    if (!isLoaded) {
        return (
        <div className="loading-screen">
            <div className="spinner">
                <div className='spinner-border'></div>
            <img className='loading-icon' src='../.././favicon.ico' alt='Loading...' />
                </div>
                </div>
                );
    }

    return (
        <div className='users'>{Object.values(userList).map(user => {
            return (
                <NavLink key={user.id} to={`/users/${user.id}`}>
                    <div>{user.username}</div>
                </NavLink>
            )
        })}</div>
    )
}

export default LoadUsers

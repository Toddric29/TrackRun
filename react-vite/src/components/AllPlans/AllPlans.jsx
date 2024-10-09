import './AllPlans.css';
import { fetchPlans } from '../../redux/training_plans';
import { useEffect, useState} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { NavLink} from 'react-router-dom';
import LoginFormModal from "../LoginFormModal";

const AllPlans = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch()
    const plans = useSelector((state) => state.plans.allPlans)
    const sessionUser = useSelector(state => state.session.user)
    const user = sessionUser ? sessionUser.id : null
    useEffect(() => {
        dispatch(fetchPlans())
        .then(() => setIsLoaded(true))
    }, [dispatch])

    if (!isLoaded) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <div>
            <div className='title'>
                <h1>Training Plans</h1>
            </div>
            {Object.values(plans).map(plan => {
                return (
                    <NavLink key={plan.id} to={`/training-plans/${plan.id}`}>
                        <h2>{plan.title}</h2>
                    </NavLink>
                )
            })}
            <div className='navigation-div'>
                {user !== null && <NavLink to={'/training-plans/new'}>
                    Create Your Own Training Plan</NavLink>}
            </div>
            <div className='navigation-div'>
                {user === null && <NavLink to={'/login'}>
                    Login to Create Your Own Training Plan</NavLink>}
            </div>
            <div className='navigation-div'>
                {user === null && <NavLink to={'/signup'}>
                    No account? Signup to Create Your Own Training Plan</NavLink>}
            </div>
        </div>
    )
}

export default AllPlans

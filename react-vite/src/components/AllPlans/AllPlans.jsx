import './AllPlans.css';
import { fetchPlans } from '../../redux/training_plans';
import { useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { NavLink} from 'react-router-dom';

const AllPlans = () => {
    const dispatch = useDispatch()
    const plans = useSelector((state) => state.plans.allPlans)
    console.log(plans)
    useEffect(() => {
        dispatch(fetchPlans())
    }, [dispatch])
    return (
        <h1>hello</h1>
    )
}

export default AllPlans

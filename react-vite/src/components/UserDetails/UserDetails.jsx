import './UserDetails.css';
import { fetchFollowings, fetchMyPlans } from '../../redux/users';
import { useEffect, useState, useRef} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { NavLink, useNavigate} from 'react-router-dom';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import {editPlan, removePlan, fetchPlans } from '../../redux/training_plans';
import DeletePlanModal from '../DeletePlanModal/DeletePlanModal';

const UserDetails = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const plans = useSelector((state) => state.userState.myPlans);
    const followedPlans = useSelector((state) => state.userState.plansFollowed)
    console.log(followedPlans, '<---- FollowedPlans')

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
          if (!ulRef.current.contains(e.target)) {
            setShowMenu(false);
          }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
      }, [showMenu]);

      const closeMenu = () => setShowMenu(false);

    useEffect(() => {
        dispatch(fetchMyPlans())
        dispatch(fetchFollowings())
    }, [dispatch])

    const editPlan = (planId) => {
        navigate(`/training-plans/${planId}/edit`)
        }
    // const deletePlan = (planId) => {
    //     dispatch(removePlan(planId))
    //     .then(() => {
    //         return Promise.all([
    //             dispatch(fetchMyPlans()),
    //             dispatch(fetchPlans)
    //         ])
    //     })
    //     .then(() => navigate('/'))
    // }
    return (
        <main className='allPlans'>
            <h1>Manage Your Plans</h1>
            <nav className='plans'>
            {Object.values(plans).length === 0 &&
            <NavLink to="/training-plans/new">Create a Plan</NavLink>}
            {Object.values(plans).map(plan => {
                console.log(plan, '<-----plan')
                return (
                    <div style={{width: 260}}key={plan.title}>
                        {plan.title}
                        {plan.body}
                    <div key={plan.id}>
                    <button className='manage-buttons'onClick={() => editPlan(plan.id)}>Update</button>
                    <OpenModalButton
                        className='manage-buttons'
                        buttonText="Delete"
                        onItemClick={closeMenu}
                        modalComponent={<DeletePlanModal planId={plan.id}/>}
                        />
                    </div>
                    </ div>
                )
                })}
                <div>
                    <h1>Followed Plans</h1>
                    {Object.values(followedPlans).map(followedPlan => {
                        return (
                        <div key={followedPlan.id}>{followedPlan.title}</div>
                    )
                    })}
                    </div>
            </nav>
        </main>
    )
}

export default UserDetails

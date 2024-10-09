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
    const sessionUser = useSelector(state => state.session.user)
    const user = sessionUser ? sessionUser.id : null
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
    return (
        <main className='user-details'>
            <div className='user-details-div'>
                <div className='your-plans-section'>
                <h1 className='title'>Manage Your Plans</h1>
            {Object.values(plans).map(plan => {
                return (
                    <div key={plan.title}>
                        <div className='your-plans'>
                            <div className='your-plan-title'>
                            <NavLink to={`/training-plans/${plan.id}`}>{plan.title}</NavLink>
                            </div>
                            <div className='your-plan-body'>
                            {plan.body}
                            </div>
                        </div>
                    <div key={plan.id} className='your-plan-buttons'>
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
                <div className='your-plan-button'>
                <NavLink to="/training-plans/new">Create a Plan</NavLink>
                </div>
                </div>
                <div className='followed-plans-section'>
                    <h1 className='title'>Followed Plans</h1>
                    <div className='followed-plans'>
                    {Object.values(followedPlans).map(followedPlan => {
                        return (
                        <NavLink key={followedPlan.id} to={`/training-plans/${followedPlan.id}`}>{followedPlan.title}</NavLink>
                    )
                    })}
                    </div>
                    </div>
            </div>
        </main>
    )
}

export default UserDetails

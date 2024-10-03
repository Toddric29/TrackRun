import './UserDetails.css';
import { fetchMyPlans } from '../../redux/users';
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
    console.log(plans)

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
                // console.log(plan, '<----')
                return (
                    <div style={{width: 260}}key={plan.title}>
                    <NavLink key={plan.body} to={`/training-plans/${plan.id}`}>
                    </NavLink>
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
            </nav>
        </main>
    )
}

export default UserDetails

import './PlanDetails.css';
import { fetchPlan } from '../../redux/training_plans';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import * as planActions from '../../redux/training_plans'
import * as activitiesActions from '../../redux/activities'
import { fetchFollowings } from '../../redux/users';
import { AiFillPlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import CreateActivityModal from '../NewActivityModal/NewActivityModal';
import DeleteActivityModal from '../DeleteActivityModal/DeleteActivityModal';
import EditActivityModal from '../UpdateActivityModal/UpdateActivityModal';

const PlanDetails = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch()
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const { planId } = useParams();
    const {setModalContent} = useModal();
    const sessionUser = useSelector(state => state.session.user)
    const user = sessionUser ? sessionUser.id : null
    const plans = useSelector(state => state.plans.planDetails);
    const plan = plans[planId];
    const followedPlans = useSelector((state) => state.userState.plansFollowed)
    const alreadyFollowed = Object.values(followedPlans).find(followedPlan => followedPlan.id == planId)
    const id = sessionUser ? sessionUser.id : null
    const activities = useSelector((state) => state.activities.planActivities)

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
        dispatch(fetchPlan(planId))
        dispatch(activitiesActions.fetchPlanActivities(planId))
        dispatch(fetchFollowings())
          .then(() => setIsLoaded(true))
    }, [planId, dispatch]);

    if (isLoaded) {
      console.log(activities, '<------ACT')
    }

    const follow = (e) => {
        const payload = {id: planId}
        e.preventDefault();
        if (alreadyFollowed) {
            dispatch(planActions.fetchUnfollow(planId, payload))
                .then(() => dispatch(fetchFollowings()));
        }
        else {
            dispatch(planActions.fetchFollow(planId, payload))
                .then(() => dispatch(fetchFollowings()));
        }
      }

    if (!isLoaded) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <div>
            <h1>{plan.title}</h1>
            {Object.values(activities).map(activity => {
                console.log(activity, '<-------activity', activities, '<----acts')
                return (
                    <div key={activity.id}>
                        <h2>{activity.title}</h2>
                        <h3>{activity.body}</h3>
                        <OpenModalButton
                        className='manage-buttons'
                        buttonText="Delete Activity"
                        onItemClick={closeMenu}
                        modalComponent={<DeleteActivityModal activityId={activity.id}/>}
                        />
                        <OpenModalButton
                        className='manage-buttons'
                        buttonText="Edit Activity"
                        onItemClick={closeMenu}
                        modalComponent={<EditActivityModal activityId={activity.id}/>}
                        />
                    </div>
                )
            })}
            <OpenModalButton
                        className='manage-buttons'
                        buttonText="Create Activity"
                        onItemClick={closeMenu}
                        modalComponent={<CreateActivityModal planId={planId}/>}
                        />
            <div>
                {user !== null &&<button
                onClick={follow}
                className="follow-button"
                title={alreadyFollowed ? "Unsave this question" : "Save this question"}>
                    {alreadyFollowed ?
                    <AiOutlineMinusCircle /> : <AiFillPlusCircle />}
                    </button>}
                    </div>
        </div>
    )
}

export default PlanDetails

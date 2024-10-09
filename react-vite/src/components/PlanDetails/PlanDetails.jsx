import './PlanDetails.css';
import { fetchPlan } from '../../redux/training_plans';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import * as planActions from '../../redux/training_plans'
import * as activitiesActions from '../../redux/activities'
import * as planCommentsActions from '../../redux/training_plan_comments'
import * as activityCommentActions from '../../redux/activity_comments'
import * as tagActions from '../../redux/tags'
import { fetchFollowings } from '../../redux/users';
import { AiFillPlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import CreateActivityModal from '../NewActivityModal/NewActivityModal';
import Activity from '../Activity/Activity';
import CreatePlanCommentModal from '../NewPlanCommentModal/NewPlanCommentModal';
import DeletePlanCommentModal from '../DeletePlanCommentModal/DeletePlanCommentModal';
import EditPlanCommentModal from '../UpdatePlanCommentModal/UpdatePlanCommentModal';
import CreateTagModal from '../NewTagModal/NewTagModal';
import DeleteTagModal from '../DeleteTagModal/DeleteTagModal';

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
    const planComments = useSelector((state) => state.planComments.planComments)
    const activityComments = useSelector((state) => state.activityComments.activityComments)
    const tags = useSelector((state) => state.tags.tags)

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
        dispatch(planCommentsActions.fetchPlanComments(planId))
        dispatch(tagActions.fetchPlanTags(planId))
          .then(() => setIsLoaded(true))
    }, [planId, dispatch]);

    if (isLoaded) {
      console.log(tags, '<------tags')
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
    const hasTags = Object.values(tags).length > 0;

    return (
        <div className='training-plan-details'>
            <div className='training-plan-section'>
                <h1 className='training-plan-title'>{plan.title}</h1>
                <h2>{plan.body}</h2>
            </div>
            <div className='activities-section'>
                <div className='title'>
                    <h2 className='activities-title'>Activities</h2>
                </div>
            {Object.values(activities).map(activity => {
                return (<Activity activity={activity} />);
                })}
                <div className='activity-button'>
                <OpenModalButton
                className='manage-buttons'
                buttonText="Create Activity"
                onItemClick={closeMenu}
                modalComponent={<CreateActivityModal planId={planId}/>}
                />
                </div>
            </div>
            <div>
                <div className='follow-section'>
                {user !== null &&<button
                onClick={follow}
                className="follow-button"
                title={alreadyFollowed ? "Follow this plan" : "Unfollow this plan"}>
                    {alreadyFollowed ?
                    <AiOutlineMinusCircle /> : <AiFillPlusCircle />}
                    </button>}
                </div>
                    </div>
                    <div className='plan-comments-section'>
                    <h2 className='plan-comments-title'>Plan Comments</h2>
                    {Object.values(planComments).map(planComment => {
                return (
                    <div key={planComment.id}>
                        <div className='plan-comment'>
                        {planComment.comment}
                        </div>
                    {user == planComment.user_id && <div className='plan-comment-buttons'>
                    <OpenModalButton
                        className='manage-buttons'
                        buttonText="Delete Comment"
                        onItemClick={closeMenu}
                        modalComponent={<DeletePlanCommentModal commentId={planComment.id}/>}
                        />
                    <OpenModalButton
                        className='manage-buttons'
                        buttonText="Edit Comment"
                        onItemClick={closeMenu}
                        modalComponent={<EditPlanCommentModal commentId={planComment.id}/>}
                        />
                        </div>}
                    </div>

                )
            })}
                    </div>
            <OpenModalButton
            className='manage-buttons'
            buttonText="Add a Comment"
            onItemClick={closeMenu}
            modalComponent={<CreatePlanCommentModal planId={planId}/>}
            />
            <div>
            {hasTags && Object.values(tags).map(tag => (
      <div key={tag.id}>
        <div className='tag'>
          <h3>{tag.name}</h3>
        </div>
        {user == plan.user_id && (
          <div className='tag-buttons'>
            <OpenModalButton
              className='manage-buttons'
              buttonText="Delete Tag"
              onItemClick={closeMenu}
              modalComponent={<DeleteTagModal planId={plan.id} tagId={tag.id}/>} />
          </div>
        )}
      </div>
    ))}

    {/* Render Add Tag button regardless of tags presence */}
    {user == plan.user_id && (
      <div className='tag-buttons'>
        <OpenModalButton
          className='manage-buttons'
          buttonText="Add a Tag"
          onItemClick={closeMenu}
          modalComponent={<CreateTagModal planId={plan.id}/>} />
      </div>
    )}
            </div>
        </div>
    )
}

export default PlanDetails

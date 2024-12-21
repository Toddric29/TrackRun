import './PlanDetails.css';
import { fetchPlan } from '../../redux/training_plans';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import * as planActions from '../../redux/training_plans'
import * as activitiesActions from '../../redux/activities'
import * as planCommentsActions from '../../redux/training_plan_comments'
import * as tagActions from '../../redux/tags'
import { fetchFollowings, fetchLikes } from '../../redux/users';
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
    const sessionUser = useSelector(state => state.session.user)
    const user = sessionUser ? sessionUser.id : null
    const plans = useSelector(state => state.plans.planDetails);
    const plan = plans[planId];
    const followedPlans = useSelector((state) => state.userState.plansFollowed)
    const alreadyFollowed = Object.values(followedPlans).find(followedPlan => followedPlan.id == planId)
    const likedPlans = useSelector((state) => state.userState.plansLiked)
    const alreadyLiked = Object.values(likedPlans).find(likedPlan => likedPlan.id == planId)
    const activities = useSelector((state) => state.activities.planActivities)
    const planComments = useSelector((state) => state.planComments.planComments)
    const tags = useSelector((state) => state.tags.tags)
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
          if (user) {
            Promise.all([
              dispatch(fetchFollowings()),
              dispatch(fetchLikes())
            ])
          }
        }, [dispatch, user])

      useEffect(() => {
        Promise.all([
          dispatch(planCommentsActions.fetchPlanComments(planId)),
          dispatch(fetchPlan(planId)),
          dispatch(activitiesActions.fetchPlanActivities(planId)),
          dispatch(tagActions.fetchPlanTags(planId)),
        ])
          .then(() => setIsLoaded(true))
    }, [planId, dispatch]);



    const follow = (e) => {
        const payload = {id: planId}
        e.preventDefault();
        if (alreadyFollowed) {
            dispatch(planActions.fetchUnfollow(planId, payload))
                .then(() => dispatch(fetchFollowings()))
                .then(() => dispatch(fetchPlan(planId)));
        }
        else {
            dispatch(planActions.fetchFollow(planId, payload))
                .then(() => dispatch(fetchFollowings()))
                .then(() => dispatch(fetchPlan(planId)));
        }
      }

      const like = (e) => {
        const payload = {id: planId}
        e.preventDefault();
        if (alreadyLiked) {
            dispatch(planActions.fetchUnlike(planId, payload))
                .then(() => dispatch(fetchLikes()))
                .then(() => dispatch(fetchPlan(planId)));
        }
        else {
            dispatch(planActions.fetchLike(planId, payload))
                .then(() => dispatch(fetchLikes()))
                .then(() => dispatch(fetchPlan(planId)));
        }
      }

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
    const hasTags = Object.values(tags).length > 0;
    // const vav = 1
    return (
        <div className='training-plan-details'>
            <div className='training-plan-section'>
              <h1 className='title'>{plan.title}</h1>
                <div className='t-plan-body'>
                <h2 className='body'>{plan.body}
                  <span className='username'>  --created by {plan.username}</span>
                </h2>
                {/* <h3>This plan has {plan.followers} followers</h3>
                <h3>This plan has {plan.likes} likes</h3> */}
                </div>
            </div>
            <div className='activities-section'>
                <div className='title'>
                    <h2 className='activities-title'>Activities</h2>
                </div>
                <div className='followed-plans'>
                  {/* <Activities activities = {activities} /> */}
                {Object.values(activities).map(activity => {
                return (<div key={activity.id}className="followed-plan-title">
                  <Activity activity={activity} />
                </div>);
                })}
                </div>
                {user && sessionUser.username == plan.username && <span className='activity-button'>
                <OpenModalButton
                className='manage-buttons'
                buttonText="Create Activity"
                onItemClick={closeMenu}
                modalComponent={<CreateActivityModal planId={planId}/>}
                />
                </span>}
            </div>
            <div>
                    </div>
                    <div className='plan-comments-section'>
                    <h2 className='comment-title'>Plan Comments</h2>
                    {Object.values(planComments).map(planComment => {
                return (
                    <div key={planComment.id}>
                        <div className='plan-comment'>
                        <span className='body'>
                        {planComment.comment}
                          </span>
                          <span className='comment-name'>
                              --{planComment.User?.username || 'Anon'}
                            </span>
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
            {user && <OpenModalButton
            className='manage-buttons'
            buttonText="Add a Comment"
            onItemClick={closeMenu}
            modalComponent={<CreatePlanCommentModal planId={planId}/>}
            />}
            <div className='tags-section'>
              <h1 className='comment-title'>Tags</h1>
            </div>
            <div className='followed-plans'>
            {hasTags && Object.values(tags).map(tag => (
      <div className='followed-plan-title' key={tag.id}>
        <h2 className='f-plan-title'>
          <NavLink className='nav-link' to={`/training-plans/tags/${tag.id}`}>
          {tag.name}
          </NavLink>
        </h2>
        <div className='tag'>
        </div>
        {user == plan.user_id && (
          <div className='tag-buttons'>
            <OpenModalButton
              className='manage-buttons'
              onClick={(event) => event.stopPropagation()}
              buttonText="Delete Tag"
              onItemClick={closeMenu}
              modalComponent={<DeleteTagModal planId={plan.id} tagId={tag.id}/>} />
          </div>
        )}
      </div>
    ))}
            </div>
            {user == plan.user_id && (
      <div className='tag-buttons'>
        <OpenModalButton
          className='manage-buttons'
          buttonText="Add a Tag"
          onItemClick={closeMenu}
          modalComponent={<CreateTagModal planId={plan.id}/>} />
      </div>
    )}
    <div className='button-section'>
    <span className='follow-section'>
      {user !== null &&<button
      onClick={follow}
      className="follow-button"
      title={alreadyFollowed ? "Follow this plan" : "Unfollow this plan"}>
        {alreadyFollowed ?
        "Unfollow this plan" : "Follow this plan"}
        </button>}
        </span>
        <span className='follow-section'>
          {user !== null &&<button
          onClick={like}
          className="follow-button"
          title={alreadyLiked ? "Like this plan" : "Unlike this plan"}>
            {alreadyLiked ?
            "Unlike this plan" : "Like this plan"}
            </button>}
            </span>
    </div>
        </div>
    )
}

export default PlanDetails

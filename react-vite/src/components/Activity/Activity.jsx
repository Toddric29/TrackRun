import { fetchActivityComments } from "../../redux/activity_comments";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteActivityModal from '../DeleteActivityModal/DeleteActivityModal';
import EditActivityModal from '../UpdateActivityModal/UpdateActivityModal';
import CreateActivityCommentModal from "../NewActivityCommentModal/NewActivityCommentModal";
import DeleteActivityCommentModal from "../DeleteActivityCommentModal/DeleteActivityCommentModal";
import EditActivityCommentModal from "../UpdateActivityCommentModal/UpdateActivityCommentModal";

const Activity = ({activity}) => {
    const { planId } = useParams();
    const sessionUser = useSelector(state => state.session.user)
    const user = sessionUser ? sessionUser.id : null
    const plans = useSelector(state => state.plans.planDetails);
    const plan = plans[planId];
    const [showMenu, setShowMenu] = useState(false);
    const dispatch = useDispatch();
    const activityComments = useSelector((state) => state.activityComments.activityComments)
    const comments = Object.values(activityComments).filter((comments) => {
        return comments.activity_id === activity.id
    })
    console.log(comments, 'comments')

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

    const loadComments = (e) => {
        e.preventDefault();
        dispatch(fetchActivityComments(activity.id))
    }

    return (
        <div className='activity' key={activity.id}>
            <div className="activity-info">
                <div className="activity-title">
                    <h2>{activity.title}</h2>
                </div>
                <div className="activity-body">
                    <h3>{activity.body}</h3>
                </div>
                {sessionUser.username == plan.username &&
                <div className="activity-buttons">
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
                </div>}
            </div>
            <div className="activity-comment-section">
                { comments.length == 0 ? <button onClick={loadComments}>Load Comments</button>: comments.map(comment => {
                    return (
                    <div className='comment-buttons'key={comment.id}>
                        <h3>{comment.comment}</h3>
                        {user == comment.user_id &&
                        <div>
                        <OpenModalButton
                        className='manage-buttons'
                        buttonText="Delete Comment"
                        onItemClick={closeMenu}
                        modalComponent={<DeleteActivityCommentModal commentId={comment.id} activityId={activity.id}/>}
                        />
                        <OpenModalButton
                        className='manage-buttons'
                        buttonText="Update Comment"
                        onItemClick={closeMenu}
                        modalComponent={<EditActivityCommentModal commentId={comment.id} activityId={activity.id}/>}
                        />
                        </div>}
                    </div>
                    )
                    })}
                    <div className="add-comment-button">
                        <OpenModalButton
                        className='manage-buttons'
                        buttonText="Add Comment"
                        onItemClick={closeMenu}
                        modalComponent={<CreateActivityCommentModal activityId={activity.id}/>}
                        />
                    </div>
            </div>
        </div>
    )
};

export default Activity

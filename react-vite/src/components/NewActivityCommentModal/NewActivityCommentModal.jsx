import * as planActions from '../../redux/training_plans';
import * as userActions from '../../redux/users'
import * as planCommentsActions from '../../redux/training_plan_comments'
import * as activityActions from '../../redux/activities'
import * as activityCommentActions from '../../redux/activity_comments'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useModal } from '../../context/Modal';
import { useParams, useNavigate } from 'react-router-dom';
import './NewActivityCommentModal.css';

function CreateActivityCommentModal({activityId}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal()
    const user = useSelector(state => state.session.user)
    const [comment, setComment] = useState('');
    const [errors, setErrors] = useState({})


    const payload = {
        comment
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(activityCommentActions.createActivityComment(activityId, payload))
        .then(() => {
            dispatch(activityCommentActions.fetchActivityComments(activityId))
        })
        // console.log(payload, '<----PAYLOAd')
        // setErrors({})
        .then(() => {
            closeModal()
        })
    }
    const handleCancel = () => {
        closeModal()
    };

    return (
        <>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </label>
        {errors.comment && <p>{errors.comment}</p>}
        <button type="submit">Add a Comment</button>
      </form>
        </>
    )
}

export default CreateActivityCommentModal;

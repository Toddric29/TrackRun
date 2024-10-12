import * as planActions from '../../redux/training_plans';
import * as userActions from '../../redux/users'
import * as planCommentsActions from '../../redux/training_plan_comments'
import * as activityActions from '../../redux/activities'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useModal } from '../../context/Modal';
import { useParams, useNavigate } from 'react-router-dom';
import './NewPlanCommentModal.css';

function CreatePlanCommentModal({planId}) {
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
        dispatch(planCommentsActions.createPlanComment(planId, payload))
        .then(() => {
            dispatch(planCommentsActions.fetchPlanComments(planId))
        })
        .then(() => {
            closeModal()
        })
    }
    const handleCancel = () => {
        closeModal()
    };

    return (
      <div className="modal-comment">
        <form onSubmit={handleSubmit} className="modal-form">
          <label>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              className="modal-input"
            />
          </label>
          {errors.comment && <p className="modal-error">{errors.comment}</p>}
          <button className='button-comment'type="submit">Add a Comment</button>
        </form>
      </div>
    );
}

export default CreatePlanCommentModal;

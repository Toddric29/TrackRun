import * as planCommentsActions from '../../redux/training_plan_comments'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useModal } from '../../context/Modal';
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
    const handleCancelClick = (e) => {
      e.preventDefault();
      closeModal()
    };

    return (
      <div className="modal-comment">
        <h1 className='title'>Add a Comment</h1>
        <form onSubmit={handleSubmit} className="modal-form">
          <label>
            <textarea
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              className="modal-text-area"
            />
          </label>
          {errors.comment && <p className="modal-error">{errors.comment}</p>}
          <span style={{display: 'flex', justifyContent: 'center'}}>
        <button className='button-comment' type="submit">Add Comment</button>
        <button className='button-comment2' type="button" onClick={handleCancelClick}>Cancel</button>
        </span>
        </form>
      </div>
    );
}

export default CreatePlanCommentModal;

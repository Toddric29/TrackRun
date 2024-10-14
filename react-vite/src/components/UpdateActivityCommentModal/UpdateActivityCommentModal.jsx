import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as activityCommentActions from '../../redux/activity_comments'
import { useModal } from '../../context/Modal';
import { useParams } from 'react-router-dom';
import './UpdateActivityCommentModal.css'

const EditActivityCommentModal = ({commentId, activityId}) => {
    const { planId } = useParams();
    const activityComments = useSelector((state) => state.activityComments.activityComments)
    const activityComment = Object.values(activityComments).filter((activityComment) =>
        activityComment.id === commentId
    )
    const aComment = activityComment[0]

  const dispatch = useDispatch();
  const [comment, setComment] = useState("")
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const updateComment = (e) => setComment(e.target.value);


  useEffect(() => {
    if (!aComment) return
    setComment(aComment.comment);
  },[aComment])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({})
    console.log(errors)




    dispatch(activityCommentActions.editActivityComment({comment: comment}, aComment.id))
    .then(() => {
        dispatch(activityCommentActions.fetchActivityComments(activityId))
    })
    .then(() => {
        closeModal()
  })
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    closeModal()
  };
  return (
    <div className='modal-comment'>
      <h1 className='title'>Edit Comment</h1>
      <form onSubmit={handleSubmit}>
      <label>
          <textarea
            type="text"
            defaultValue={comment}
            onChange={updateComment}
            required
            className="modal-text-area"
          />
        </label>
        {errors.comment && <p className="modal-error">{errors.comment}</p>}
        <span style={{display: 'flex', justifyContent: 'center'}}>
        <button className='button-comment' type="submit">Update Comment</button>
        <button className='button-comment2' type="button" onClick={handleCancelClick}>Cancel</button>
        </span>
      </form>
    </div>
  );
}

export default EditActivityCommentModal;

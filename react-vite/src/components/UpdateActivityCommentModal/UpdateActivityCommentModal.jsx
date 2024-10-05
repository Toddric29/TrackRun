import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as activityActions from '../../redux/activities'
import * as planCommentActions from '../../redux/training_plan_comments'
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
    console.log(aComment, '<------Body')

  const dispatch = useDispatch();
  const [comment, setComment] = useState("")
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const updateComment = (e) => setComment(e.target.value);


  useEffect(() => {
    if (!aComment) return
    setComment(aComment.comment);
  },[aComment])
  console.log(aComment.comment, '<------oldBody')

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
  return (
    <div className='modal'>
      <form onSubmit={handleSubmit}>
      <label>
          <input
            type="text"
            defaultValue={comment}
            onChange={updateComment}
            required
          />
        </label>
        {errors.comment && <p>{errors.comment}</p>}
        <button type="submit">Update Comment</button>
      </form>
    </div>
  );
}

export default EditActivityCommentModal;

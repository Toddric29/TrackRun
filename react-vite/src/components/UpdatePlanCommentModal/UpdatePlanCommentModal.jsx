import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as activityActions from '../../redux/activities'
import * as planCommentActions from '../../redux/training_plan_comments'
import { useModal } from '../../context/Modal';
import { useParams } from 'react-router-dom';
import './UpdatePlanCommentModal.css'

const EditPlanCommentModal = ({commentId}) => {
    const { planId } = useParams();
    const planComments = useSelector((state) => state.planComments.planComments)
    const planComment = Object.values(planComments).filter((planComment) =>
        planComment.id === commentId
    )
    const pComment = planComment[0]
    console.log(pComment, '<------Body')

  const dispatch = useDispatch();
  const [comment, setComment] = useState("")
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const updateComment = (e) => setComment(e.target.value);


  useEffect(() => {
    if (!pComment) return
    setComment(pComment.comment);
  },[pComment])
  console.log(pComment.comment, '<------oldBody')

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({})
    console.log(errors)




    dispatch(planCommentActions.editPlanComment({comment: comment}, pComment.id))
    .then(() => dispatch(planCommentActions.fetchPlanComments(planId)))
    .then(closeModal)
  };
  return (
    <div className='modal-comment'>
      <form onSubmit={handleSubmit}>
      <label>
          <input
            type="text"
            defaultValue={comment}
            onChange={updateComment}
            required
            className="modal-input"
          />
        </label>
        {errors.comment && <p className="modal-error">{errors.comment}</p>}
        <button className='button-comment' type="submit">Update Comment</button>
      </form>
    </div>
  );
}

export default EditPlanCommentModal;

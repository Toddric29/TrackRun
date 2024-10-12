import * as planActions from '../../redux/training_plans';
import * as userActions from '../../redux/users'
import * as activityActions from '../../redux/activities'
import * as planCommentActions from '../../redux/training_plan_comments'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import './DeletePlanCommentModal.css';

function DeletePlanCommentModal({commentId}) {
    const dispatch = useDispatch();
    const { planId } = useParams();
    const { closeModal } = useModal()

    const handleSubmit = (e) => {
        e.preventDefault(e);
        dispatch(planCommentActions.removePlanComment(commentId))
        .then(() => {
            dispatch(planCommentActions.fetchPlanComments(planId))
        })
        .then(() => {
            closeModal()
        })
    }
    const handleCancel = () => {
        closeModal()
    };

    return (
        <div className='pop-modal'>
            <div className='modal-content'>
            <h1 className='modal-h1'>Confirm Delete</h1>
        <h2 className='modal-h2'>Are you sure you want to remove this comment?</h2>
        <form>
        <div>
        <div>
        <button className='button-modal'
        type="button" onClick={handleSubmit}>Yes (Delete Comment)</button>
        </div>
        <div>
        <button className='button-modal2'
        type="button" onClick={handleCancel}>No (Keep Comment)</button>
        </div>
        </div>
        </form>
            </div>
        </div>
    )
}

export default DeletePlanCommentModal;

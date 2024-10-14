import * as activityCommentActions from '../../redux/activity_comments'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import './DeleteActivityCommentModal.css';

function DeleteActivityCommentModal({commentId, activityId}) {
    const dispatch = useDispatch();
    const { planId } = useParams();
    const { closeModal } = useModal()

    const handleSubmit = (e) => {
        e.preventDefault(e);
        dispatch(activityCommentActions.removeActivityComment(commentId))
        .then(() => {
            dispatch(activityCommentActions.fetchActivityComments(activityId))
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

export default DeleteActivityCommentModal;

import * as planActions from '../../redux/training_plans';
import * as userActions from '../../redux/users'
import * as activityActions from '../../redux/activities'
import * as planCommentActions from '../../redux/training_plan_comments'
import * as activityCommentActions from '../../redux/activity_comments'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import './DeleteActivityCommentModal.css';

function DeleteActivityCommentModal({commentId, activityId}) {
    const dispatch = useDispatch();
    const { planId } = useParams();
    const { closeModal } = useModal()
    console.log(planId, '<-------PLANID')

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
        <>
        <h1>Confirm Delete</h1>
        <h2>Are you sure you want to remove comment?</h2>
        <form>
        <div style={{textAlign:'center'}}>
        <div>
        <button style={{backgroundColor:'red', color:'#fff',border:'none', width:150}}
        type="button" onClick={handleSubmit}>Yes (Delete Comment)</button>
        </div>
        <div>
        <button style={{backgroundColor:'grey', color:'#fff',border:'none', width:150}}
        type="button" onClick={handleCancel}>No (Keep Comment)</button>
        </div>
        </div>
        </form>
        </>
    )
}

export default DeleteActivityCommentModal;

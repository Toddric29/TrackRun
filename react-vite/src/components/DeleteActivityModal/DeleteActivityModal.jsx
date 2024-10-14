import * as activityActions from '../../redux/activities'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import './DeleteActivityModal.css';

function DeleteActivityModal({activityId}) {
    const dispatch = useDispatch();
    const { planId } = useParams();
    const { closeModal } = useModal()

    const handleSubmit = (e) => {
        e.preventDefault(e);
        dispatch(activityActions.removeActivity(activityId))
        .then(() => {
            dispatch(activityActions.fetchPlanActivities(planId))
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
        <h2 className='modal-h2'>Are you sure you want to remove this activity?</h2>
        <form>
        <div>
        <div>
        <button className='button-modal'
        type="button" onClick={handleSubmit}>Yes (Delete Activity)</button>
        </div>
        <div>
        <button className='button-modal2'
        type="button" onClick={handleCancel}>No (Keep Activity)</button>
        </div>
        </div>
        </form>
            </div>
        </div>
    )
}

export default DeleteActivityModal;

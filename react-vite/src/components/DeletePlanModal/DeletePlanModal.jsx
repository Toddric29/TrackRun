import * as planActions from '../../redux/training_plans';
import * as userActions from '../../redux/users'
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './DeletePlanModal.css';

function DeletePlanModal({planId}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal()

    const handleSubmit = () => {
        dispatch(planActions.removePlan(planId))
        .then(() => {
            dispatch(userActions.fetchMyPlans())
        })
        .then(() => {
            closeModal()
        })
        .then(() => {
            dispatch(planActions.fetchPlans())
        })
    }
    const handleCancel = () => {
        closeModal()
    };

    return (
        <div className='pop-modal'>
            <div className='modal-content'>
            <h1 className='modal-h1'>Confirm Delete</h1>
        <h2 className='modal-h2'>Are you sure you want to remove this plan?</h2>
        <form>
        <div>
        <div>
        <button className='button-modal'
        type="button" onClick={handleSubmit}>Yes (Delete Plan)</button>
        </div>
        <div>
        <button className='button-modal2'
        type="button" onClick={handleCancel}>No (Keep Plan)</button>
        </div>
        </div>
        </form>
            </div>
        </div>
    )
}

export default DeletePlanModal;

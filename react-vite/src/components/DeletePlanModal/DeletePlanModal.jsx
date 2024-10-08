import * as planActions from '../../redux/training_plans';
import * as userActions from '../../redux/users'
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './DeletePlanModal.css';

function DeletePlanModal({planId}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal()
    console.log(planId)

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
        <>
        <h1>Confirm Delete</h1>
        <h2>Are you sure you want to remove this plan?</h2>
        <form>
        <div style={{textAlign:'center'}}>
        <div>
        <button style={{backgroundColor:'red', color:'#fff',border:'none', width:150}}
        type="button" onClick={handleSubmit}>Yes (Delete Plan)</button>
        </div>
        <div>
        <button style={{backgroundColor:'grey', color:'#fff',border:'none', width:150}}
        type="button" onClick={handleCancel}>No (Keep Plan)</button>
        </div>
        </div>
        </form>
        </>
    )
}

export default DeletePlanModal;

const LOAD_USERS = 'users/loadUsers'
const MY_PLANS = 'users/myPlan'

const getAllUsers = (payload) => ({
    type: LOAD_USERS,
    payload
})

const getUser = (payload) => ({
    type: LOAD_USERS,
    payload
})

const myPlan = (payload) => ({
    type: MY_PLANS,
    payload
})

export const fetchUsers = () => async (dispatch) => {
    const res = await fetch('/api/users')

    if (res.ok) {
        const data = await res.json()
        dispatch(getAllUsers(data))

        return data;
    }

    throw res
}

export const fetchMyPlans = () => async (dispatch) => {
    const res = await fetch('/api/users/training-plans');

    if (res.ok) {
        const data = await res.json();
        dispatch(myPlan(data))

        return data;
    }

    throw res;
}

const initialState = {
    allUsers: {},
    myPlans: {}
};

const usersReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_USERS: {
            console.log(action, '<-----action')
            newState = {...state};
            newState.allUsers = action.payload.users
            return newState
        }
        case MY_PLANS: {
            const newState = {...state}
            console.log(action.payload, '<-----action')
            newState.myPlans = action.payload.reduce((acc, plan) => {
                acc[plan.id] = plan;

                return acc
            }, {})
            return newState
        }
        default:
            return state
    }
}

export default usersReducer

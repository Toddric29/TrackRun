const LOAD_USERS = 'users/loadUsers'
const MY_PLANS = 'users/myPlan'
const LOAD_FOLLOWERS = 'users/loadFollowers'
const LOAD_FOLLOW = 'plans/loadFollow'
const LOAD_UNFOLLOW = 'plans/loadUnfollow'

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

const getFollowers = (payload) => ({
    type: LOAD_FOLLOWERS,
    payload
})

const follow = (payload) => ({
    type: LOAD_FOLLOW,
    payload
})

const unfollow = (payload) => ({
    type: LOAD_UNFOLLOW,
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

export const fetchFollowings = () => async (dispatch) => {
    try{
        const res = await fetch(`/api/users/training-plans/following`)

        if (res.ok) {
            const data = await res.json()
            dispatch(getFollowers(data))
            return data;
        }
        else {
            throw res;
        }
    } catch (error) {
        const err = await error
        return err
    }
};

const initialState = {
    allUsers: {},
    myPlans: {},
    plansFollowed: {}
};

const usersReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_USERS: {
            newState = {...state};
            newState.allUsers = action.payload.users
            return newState
        }
        case MY_PLANS: {
            const newState = {...state}
            newState.myPlans = action.payload.reduce((acc, plan) => {
                acc[plan.id] = plan;

                return acc
            }, {})
            return newState
        }
        case LOAD_FOLLOWERS: {
            newState = {...state};
            newState.plansFollowed = action.payload
            return newState
        }
        default:
            return state
    }
}

export default usersReducer

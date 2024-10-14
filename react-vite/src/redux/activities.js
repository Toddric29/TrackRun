const LOAD_ACTIVITIES = 'activities/loadActivities'
const NEW_ACTIVITIES = 'activities/newActivities'

const loadActivities = (payload) => ({
    type: LOAD_ACTIVITIES,
    payload
})

const newActivity = (payload) => ({
    type: NEW_ACTIVITIES,
    payload
})

export const fetchPlanActivities = (planId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/training-plans/${planId}/activity`);
        if(res.ok) {
            const data = await res.json();
            if(data.errors) {
                throw data
            }

            dispatch(loadActivities(data))
            return data
        } else {
            throw res
        }
    } catch (error) {
        const err = error.json()
        return err
    }
}

export const createActivity = (planId, payload) => async (dispatch) => {
    const res = await fetch(`/api/training-plans/${planId}/activities`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(loadActivities(data));
    } else {
        console.error('Fetch error:', res.statusText);
    }
    return res;
};

export const removeActivity = (activityId) => async () => {
    const res = await fetch(`/api/activity/${activityId}`, {
        method: 'DELETE'
    });
    return res
}

export const editActivity = (payload, activityId) => async (dispatch) => {
    const res = await fetch(`/api/activity/${activityId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    if (res.ok) {
        const edittedActivity = await res.json();
        dispatch(newActivity(edittedActivity))
        return edittedActivity;
    }
};

const initialState = {
    planActivities: {}
}

const activitiesReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_ACTIVITIES: {
            newState = {...state};
            newState.planActivities = action.payload;
            return newState
        }
        case NEW_ACTIVITIES: {
            if (!state[action.id]) {
                const newState = {
                    ...state,
                    [action.id]: action
                }
                return newState
            }
            return {...state}
        }
        default:
            return state
    }
}

export default activitiesReducer

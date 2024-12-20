import { fetchFollowings, fetchLikes } from "./users"

// Action Types
const LOAD_PLANS = 'plans/loadPlans'
const LOAD_PLAN  = 'plans/loadPlan'
const LOAD_PLA  = 'plans/loadPla'
const NEW_PLAN = 'plans/newPlan'

// Action Creators
const loadPlans = (payload) => ({
    type: LOAD_PLANS,
    payload
})

const loadPlan = (payload) => ({
    type: LOAD_PLAN,
    payload
})

const loadPla = (payload) => ({
    type: LOAD_PLA,
    payload
})

const newPlan = (payload) => ({
    type: NEW_PLAN,
    payload
})




// Thunks
export const fetchPlans = () => async (dispatch) => {
    try {
        const res = await fetch('/api/training-plans/')
        if(res.ok) {
            const data = await res.json();

            dispatch(loadPlans(data));
            return res
        } else {
            throw res
        }
    } catch (error) {
        const err = await error;
        return err
    }
}

export const fetchPlan = (planId) => async (dispatch) => {
    const res = await fetch(`/api/training-plans/${planId}`);

    if (res.ok) {
        const details = await res.json();
        dispatch(loadPlan(details));
    }
    return res
};

export const createPlan = (payload) => async (dispatch) => {
    const res = await fetch('/api/training-plans/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    if (res.ok) {
        const data = await res.json();
        dispatch(newPlan(data));
        return data
    }
    return res
}


export const editPlan = (payload, planId) => async (dispatch) => {
    console.log(payload, '<--- Payload')
    const res = await fetch(`/api/training-plans/${planId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    if (res.ok) {
        const edittedPlan = await res.json();
        dispatch(newPlan(edittedPlan))
        return edittedPlan;
    }
};

export const removePlan = (planId) => async () => {
    const res = await fetch(`/api/training-plans/${planId}`, {
        method: 'DELETE'
    });
    return res
}

export const fetchPlanFollows = (planId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/training-plans/${planId}/follow`);
        if(res.ok) {
            const data = await res.json();
            if(data.errors) {
                throw data
            }
            dispatch(loadPla(data))
            return data
        } else {
            throw res
        }
    } catch (error) {
        const err = error.json()
        return err
    }
}

export const fetchFollow = (planId, payload) => async (dispatch) => {
    const res = await fetch(`/api/training-plans/${planId}/follow`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(fetchFollowings());
    } else {
        console.error('Fetch error:', res.statusText);
    }
    return res;
};

export const fetchUnfollow = (planId) => async (dispatch) => {
    const res = await fetch(`/api/training-plans/${planId}/follow`, {
        method: 'DELETE'
    })
    return res
}

export const fetchPlanLikes = (planId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/training-plans/${planId}/like`);
        if(res.ok) {
            const data = await res.json();
            console.log(data, '<-----DATA')
            if(data.errors) {
                throw data
            }
            dispatch(fetchPlan(data))
            return data
        } else {
            throw res
        }
    } catch (error) {
        const err = error.json()
        return err
    }
}

export const fetchLike = (planId, payload) => async (dispatch) => {
    const res = await fetch(`/api/training-plans/${planId}/like`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(fetchLikes());
    } else {
        console.error('Fetch error:', res.statusText);
    }
    return res;
};

export const fetchUnlike = (planId) => async (dispatch) => {
    const res = await fetch(`/api/training-plans/${planId}/like`, {
        method: 'DELETE'
    })
    return res
}
// Reducer
const initialState = {
    allPlans: {},
    planDetails: {}
}

const plansReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOAD_PLANS:{
          const allPlans = {...state.allPlans}
          action.payload.forEach(plan => allPlans[plan.id]={...plan})
          return {
              ...state,
              allPlans
          }
      }
      case LOAD_PLAN: {
          const newState = {...state}
          if (newState.planDetails) {
              newState.planDetails = {...newState.planDetails}
          }
          else {
              newState.planDetails = {}
          }
          newState.planDetails[action.payload.id] = {...action.payload}
          return newState
      }
      case LOAD_PLA: {
        const newState = { ...state };
        if (newState.planDetails) {
            newState.planDetails.followers = action.payload;
        } else {
            newState.planDetails = {};
        }
        // Assuming action.payload is a number
        return newState;
    }
      case NEW_PLAN: {
        if (!state[action.id]) {
            const newState = {
                ...state,
                [action.id]: action
            }
            console.log(newState)
            return newState
        }
        return {...state}
    }
      default:
        {
          return state;
      }
    }
  };

  export default plansReducer

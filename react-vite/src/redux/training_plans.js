import { fetchFollowings } from "./users"

// Action Types
const LOAD_PLANS = 'plans/loadPlans'
const LOAD_PLAN  = 'plans/loadPlan'
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
              newState.planDetails = []
          }
          newState.planDetails[action.payload.id] = {...action.payload}
          return newState
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

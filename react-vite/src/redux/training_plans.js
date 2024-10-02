// Action Types
const LOAD_PLANS = 'plans/loadPlans'
const LOAD_PLAN  = 'plans/loadPlan'
const NEW_PLAN = 'plans/newPlan'
const EDIT_PLAN = 'plans/editPlan'
const DELETE_PLAN = 'plans/deletePlan'
const LOAD_FOLLOW = 'plans/loadFollow'
const LOAD_UNFOLLOW = 'plans/loadUnfollow'

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

const editPlan = (payload) => ({
    type: EDIT_PLAN,
    payload
})

const deletePlan = (payload) => ({
    type: DELETE_PLAN,
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




// Thunks
export const fetchPlans = () => async (dispatch) => {
    try {
        const res = await fetch('/api/training-plans/')
        if(res.ok) {
            const data = await res.json();
            if (data.errors) {
                throw data;
            }

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

// Reducer
const initialState = {
    allPlans: {},
    planDetails: {},
    myPlans: {}
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
        console.log(action, '<----action')
        if (!state[action.id]) {
            const newState = {
                ...state,
                [action.id]: action
            }
            return newState
        }
        return {...state}
    }
    //   case MY_SPOTS: {
    //       const mySpots = {...state.mySpots}
    //       console.log(action)
    //       mySpots[action.payload.id] = {...action.payload}
    //       return {...state, mySpots: action.payload.Spots}
    //   }
    //   case REMOVE_SPOT: {
    //       let newAllSpots;
    //       let newMySpots;
    //       const spotId = action.payload

    //       if (state.allSpots) {
    //           const data = {...state.allSpots.Spots}
    //           let Spots = Object.values(data)
    //           let index;
    //           for (let i = 0; i < Spots.length; i++) {
    //               if (Spots[i].id == spotId) index = i
    //           }
    //           Spots.splice(index, 1)
    //           newAllSpots = Object.assign({}, Spots)
    //       }

    //       if (state.mySpots) {
    //           const data = {...state.mySpots.Spots}
    //           let Spots = Object.values(data)
    //           let index;
    //           for (let i = 0; i < Spots.length; i++) {
    //               if (Spots[i].id == spotId) index = i
    //           }
    //           Spots.splice(index, 1)
    //           newMySpots = Object.assign({}, Spots)
    //       }

    //       return {...state, allSpots: newAllSpots, mySpots: newMySpots}
    //   }
      default:
        {
          return state;
      }
    }
  };

  export default plansReducer

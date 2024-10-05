const LOAD_PLAN_COMMENTS = 'plan_comments/loadPlanComments'
const NEW_PLAN_COMMENT = 'plan_comments/newPlanComment'

const loadComments = (payload) => ({
    type: LOAD_PLAN_COMMENTS,
    payload
})

const newComment = (payload) => ({
    type: NEW_PLAN_COMMENT,
    payload
})


export const fetchPlanComments = (planId) => async(dispatch) => {
  const res = await fetch(`/api/training-plans/${planId}/comments`);

  if (res.ok) {
    const data = await res.json()
    dispatch(loadComments(data));
    return res
  }
}

export const createPlanComment = (planId, payload) => async (dispatch) => {
    const res = await fetch(`/api/training-plans/${planId}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(loadComments(data));
    } else {
        console.error('Fetch error:', res.statusText);
    }
    return res;
};

export const removePlanComment = (commentId) => async () => {
    const res = await fetch(`/api/training-plans/comments/${commentId}`, {
        method: 'DELETE'
    });
    return res
}

export const editPlanComment = (payload, commentId) => async (dispatch) => {
    const res = await fetch(`/api/training-plan-comments/${commentId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    if (res.ok) {
        const edittedComment = await res.json();
        dispatch(newComment(edittedComment))
        return edittedComment;
    }
};


const initialState = {
    planComments: {}
};

const planCommentsReducer = (state = initialState, action) => {
    let newState;
  switch (action.type) {
    case LOAD_PLAN_COMMENTS: {
        newState = {...state};
        newState.planComments = action.payload;
        return newState
    }
    case NEW_PLAN_COMMENT: {
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
      return state;
  }
};

export default planCommentsReducer

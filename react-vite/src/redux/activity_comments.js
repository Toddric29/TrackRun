const LOAD_ACTIVITY_COMMENTS = 'activityComments/loadActivityComments'
const NEW_ACTIVITY_COMMENT = 'activityComments/newActivityComment'

const loadActivityComments = (payload) => ({
    type: LOAD_ACTIVITY_COMMENTS,
    payload
})

const newComment = (payload) => ({
    type: NEW_ACTIVITY_COMMENT,
    payload
})


export const fetchActivityComments = (activityId) => async(dispatch) => {
  const res = await fetch(`/api/activity/${activityId}/comments`);

  if (res.ok) {
    const data = await res.json()
    dispatch(loadActivityComments(data));
    return res
  }
}

export const createActivityComment = (activityId, payload) => async (dispatch) => {
    const res = await fetch(`/api/activity/${activityId}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(loadActivityComments(data));
    } else {
        console.error('Fetch error:', res.statusText);
    }
    return res;
};

export const removeActivityComment = (commentId) => async () => {
    const res = await fetch(`/api/activity/comments/${commentId}`, {
        method: 'DELETE'
    });
    return res
}

export const editActivityComment = (payload, commentId) => async (dispatch) => {
    const res = await fetch(`/api/activity-comments/${commentId}`, {
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
    activityComments: {}
};

const activityCommentsReducer = (state = initialState, action) => {
    let newState;
  switch (action.type) {
    case LOAD_ACTIVITY_COMMENTS: {
        console.log(action, '<----ACTION')
        newState = {...state};
        newState.activityComments = action.payload;
        return newState
    }
    case NEW_ACTIVITY_COMMENT: {
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

export default activityCommentsReducer

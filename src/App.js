function createStore(reducer, initialState) {
  let state = initialState;
  const listeners = [];

  const getState = () => (state);

  const subscribe = (listener) => (
    listeners.push(listener)
  );

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(l => l());
  };

  return {
    subscribe,
    getState,
    dispatch,
  };
}

function reducer(state, action) {
  if (action.type = 'ADD_MESSAGE') {
    return {
      messages: state.messages.concat(action.message),
    };
  } else if (action.type === 'DELETE_MESSAGE') {
    return {
      messages: [
        ...state.messages.slice(0, action.index),
        ...state.messages.slice(action.index+1, state.messages.lenth),
      ],
    };
  } else {
    return state;
  }
}

// simple store
const initialState = { messages: []};
const store = createStore(reducer, initialState);



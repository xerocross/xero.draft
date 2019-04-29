const initialState = {
    text : "",
    dirty: false,
    next: null,
    previous: null
}

function clone (stateObject) {
    return Object.assign({}, stateObject);  
    // this doesn't do a deep clone
    // and that is exactly what we want
}

export function textCommitApp (state, action) {
    if (typeof state === 'undefined') {
      return initialState
    }
    let newState = clone(state);

    switch (action.type) {
        case "NEW_TEXT":
            if (state.dirty) {
                return {
                    text: action.text,
                    previous: state.previous,
                    next: null,
                    dirty : true
                }
            } else {
                return {
                    text: action.text,
                    previous: state,
                    next: null,
                    dirty : true
                }
            }
        case "COMMIT":
            newState.dirty = false;
            return newState;
        case "GO_FORWARD":
            if (state.next) {
                let next = state.next;
                return {
                    text: next.text,
                    previous: state,
                    next: next.next,
                    dirty : false
                };
            }
            break;
        case "GO_BACK":
            if (state.dirty || state.previous == null) {
                return newState;
            } else {
                let prev = state.previous;
                return {
                    text: prev.text,
                    previous: prev.previous,
                    next: state,
                    dirty : false
                };
            }
        case "RESET":
            if (state.dirty) {
                let prev = state.previous;
                return {
                    text: prev.text,
                    previous: prev.previous,
                    next: null,
                    dirty : false
                }
            } else {
                return newState;
            }
        case "CLEAR_ALL":
            return clone(initialState);
        default:
            break;
    }
}
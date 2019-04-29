import { Commit } from "./Commit";

function clone (stateObject) {
    let newObj = Object.assign({}, stateObject);
    newObj.commits = Object.freeze(newObj.commits);
    return newObj;
    // this doesn't do a deep clone
    // and that is exactly what we want
}

function duplicateArray (arr) {
    return arr.concat([]);
}

const initState = {
    commits : [],
    currentCommitIndex : -1,
    currentText : "",
    dirty: false
}

export function draftApp (state, action) {
    if (typeof state === "undefined") {
        return Object.freeze(clone(initState));
    }
    let newState = clone(state);
    // I'm pretty sure it's OK to mutate this object before
    // it actually becomes state.
    newState.commits = duplicateArray(newState.commits);
    // each individual commit has not been clones, but 
    // they will never be mutated
    switch (action.type) {
        case "COMMIT":
            let newCommit = new Commit(newState.currentText);
            newState.commits.push(newCommit);
            newState.currentCommitIndex = newState.currentCommitIndex + 1;
            newState.dirty = false;
            break;
        case "NEW_TEXT":
            newState.currentText = action.text;
            
            newState.commits = newState.commits.slice(0, newState.currentCommitIndex + 1);
            newState.dirty = true;
            break;
        case "GO_BACK":
            if (state.dirty) {
                break;
            }
            if (newState.currentCommitIndex > 0) {
                newState.currentCommitIndex = newState.currentCommitIndex - 1;
                let previous = newState.commits[newState.currentCommitIndex];
                newState.currentText = previous.getText();
            }
            break;
        case "GO_FORWARD":
            if (state.dirty) {
                break;
            }
            if (newState.currentCommitIndex < newState.commits.length) {
                newState.currentCommitIndex = newState.currentCommitIndex + 1;
                let next = newState.commits[newState.currentCommitIndex];
                newState.currentText = next.getText();
            }
            break;
        case "RESET":
            if (state.dirty) {
                newState.currentText = newState.commits[newState.currentCommitIndex].getText();
                newState.dirty = false;
            }
            break;
        case "CLEAR_ALL":
            return Object.freeze(clone(initState));
        default:
            break;
    }
    newState.commits = Object.freeze(newState.commits);
    return Object.freeze(newState);


}
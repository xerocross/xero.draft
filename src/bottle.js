import { Commit } from "./Commit";

const NAMESPACE = "draft_editor_state";

function bottle(state) {
    return JSON.stringify(state);
}

function unbottle(stateString) {
    try {
        let parsedObject = JSON.parse(stateString);
        let commitArray = [];
        for (let i = 0; i < parsedObject.commits.length; i++) {
            commitArray.push(new Commit(parsedObject.commits[i]))
        }
        parsedObject.commits = commitArray;
        return parsedObject;
    }
    catch (e) {
        return null;
    }
}

export function getStateFromStorage () {
    if (localStorage) {
        let stateFromStorage = unbottle(localStorage.getItem(NAMESPACE))
        if (stateFromStorage !== null) {
            return stateFromStorage
        }
    } 
    return null;
}

export function persistStateToStorage (state) {
    localStorage.setItem(NAMESPACE, bottle(state));
}
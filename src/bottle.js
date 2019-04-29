import { Commit } from "./Commit";

export function bottle(state) {
    return JSON.stringify(state);
}

export function unBottle(stateString) {
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

export function getNewTextAction (newText) {
    return {
        type: "NEW_TEXT",
        text: newText
    }
}

export const COMMIT = {
    type: "COMMIT"
}

export const GO_BACK = {
    type: "GO_BACK"
}

export const GO_FORWARD = {
    type: "GO_FORWARD"
}

export const RESET = {
    type: "RESET"
}
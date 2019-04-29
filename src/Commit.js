export function Commit (text) {
    let _text = text;
    this.getText = () => _text;
    this.toJSON = () => _text;
}
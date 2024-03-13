export default class Weather {
    constructor() {
        this.data = {};
        this.error = "noError";
        this.container = document.createElement('div');
    }

    setData(data) {
        this.data = data;
    }

    getData() {
        return this.data;
    }

    setError(error) {
        this.error = error;
    }

    getError() {
        return this.error;
    }

    insertInto(element) {
        element.appendChild(this.container);
    }
}
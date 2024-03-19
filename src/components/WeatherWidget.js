export default class WeatherWidget {
    constructor() {
        this.data = {};
        this.error = "noError";
        this.container = document.createElement('div');
        this.loadingAnimation = document.createElement('div');
        this.dualRing = document.createElement('div');
    }

    init() {
        this.loadingAnimation.classList.add('loading-animation');
        this.dualRing.classList.add('dual-ring');
        this.loadingAnimation.appendChild(this.dualRing);
        this.container.appendChild(this.loadingAnimation);
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

    destroy() {
        this.container.remove();
    }
}
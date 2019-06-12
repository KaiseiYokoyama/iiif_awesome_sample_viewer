class Canvas {
    /**
     *
     * @param elem canvasとなる領域
     */
    constructor(elem) {
        this.elem = elem;
        elem.classList.add('canvas');
    }

    /**
     *
     * @param url {String} Url of Manifest
     * @param func {function}
     * @return urls of images
     */
    getImages(url) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/load');
        xhr.onload = () => {
            const elem = this.elem;
            const images = JSON.parse(xhr.responseText);

            // register to html
            for (let i = 0; i < images.length; i++) {
                const image = document.createElement('img');
                image.src = images[i];
                elem.appendChild(image);
            }

            elem.querySelector('img').classList.add('display');

            // set keyDown Event
            // elem.onkeydown = function (event) {
            elem.onclick = (event) => {
                const DIRECTION = {
                    LEFT: 0,
                    UP: 1,
                    RIGHT: 2,
                    DOWN: 3,
                    NONE: 4,
                };

                const x = event.pageX - elem.getBoundingClientRect().left - window.pageXOffset;

                let direction;
                if (x < elem.offsetWidth / 4) {
                    direction = DIRECTION.LEFT;
                } else if (x > elem.offsetWidth * 3 / 4) {
                    direction = DIRECTION.RIGHT;
                } else {
                    direction = DIRECTION.NONE;
                }

                const now = elem.querySelector('img.display');
                const prev = now.previousSibling;
                const next = now.nextSibling;

                if (direction === DIRECTION.LEFT) {
                    next.classList.add('display');
                } else if (direction === DIRECTION.RIGHT) {
                    prev.classList.add('display');
                } else if (direction === DIRECTION.UP) {
                    const first = elem.querySelector('img');
                    first.classList.add('display');
                } else if (direction === DIRECTION.DOWN) {
                    const last = elem.querySelector('img:last-of-type');
                    last.classList.add('display');
                }

                if (direction !== DIRECTION.NONE) {
                    now.classList.remove('display');
                }
            }
        };
        xhr.send(url);
    }
}
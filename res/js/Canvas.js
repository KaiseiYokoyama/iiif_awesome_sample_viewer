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
    getImages(url, func) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/load');
        xhr.onload = () => {
            func(xhr, this.elem);
            // console.log(xhr.responseText);
        };
        xhr.send(url);
    }
}
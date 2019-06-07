class ManifestLoader {
    /**
     *
     * @param url {String} Url of Manifest
     * @param func {function}
     * @return urls of images
     */
    static getImages(url, func) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/load');
        xhr.onload = () => {
            func(xhr);
            // console.log(xhr.responseText);
        };
        xhr.send(url);
    }
}
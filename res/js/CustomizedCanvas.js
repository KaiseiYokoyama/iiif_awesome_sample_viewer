class CustomizedCanvas extends HTMLCanvasElement {
    constructor() {
        super();

        // ドラッグ位置初期設定
        this.offsetX = 0;
        this.offsetY = 0;
        this.X = 0;
        this.Y = 0;
        this.originalEvent = null;
        this.dragged = false;

        // manifestから情報を取得
        // 現状はimgのurl一覧のみ
        document.addEventListener('DOMContentLoaded', () => {
            const url = this.getAttribute('manifest');
            console.log('url:' + url);
            const xhr = new XMLHttpRequest();
            xhr.open('POST', '/load');
            xhr.onload = () => {
                const promises = [];
                const imageUrls = JSON.parse(xhr.responseText);
                // todo for debug
                // for (let i = 0; i < imageUrls.length; i++) {
                for (let i = 0; i < 10; i++) {
                    const imageUrl = imageUrls[i];
                    // 処理を一覧に登録
                    promises.push(imageLoader(imageUrl));
                }

                // imgをプリロード(imgオブジェクトを生成)
                Promise.all(promises).then(imgs => {
                    this.images = imgs;

                    // 初期設定
                    this.index = 0;
                    this.show(0);
                }).catch(err => {
                    console.log(err)
                });

            };
            xhr.send(url);

            // クリック時の設定
            this.onclick = (event) => {
                const DIRECTION = {
                    LEFT: 0,
                    UP: 1,
                    RIGHT: 2,
                    DOWN: 3,
                    NONE: 4,
                };

                const x = event.pageX - this.getBoundingClientRect().left - window.pageXOffset;

                let direction;
                if (x < this.offsetWidth / 4) {
                    direction = DIRECTION.LEFT;
                } else if (x > this.offsetWidth * 3 / 4) {
                    direction = DIRECTION.RIGHT;
                } else {
                    direction = DIRECTION.NONE;
                }

                if (direction === DIRECTION.LEFT) {
                    this.showNext()
                } else if (direction === DIRECTION.RIGHT) {
                    this.showPrev();
                } else if (direction === DIRECTION.UP) {
                    this.showFirst();
                } else if (direction === DIRECTION.DOWN) {
                    this.showLast();
                }
            };

            // ドラッグ時の設定
            this.addEventListener('mousedown', (event) => {
                console.log('mousedown');
                this.originalEvent = event;
                this.dragged = true;
            });
            this.addEventListener('mousemove', (event) => {
                if (!this.dragged) return;
                this.offsetX = event.offsetX - this.originalEvent.offsetX + this.X;
                this.offsetY = event.offsetY - this.originalEvent.offsetY + this.Y;
                this.show(this.index);
            });
            this.addEventListener('mouseup', () => {
                this.X = this.offsetX;
                this.Y = this.offsetY;
                this.originalEvent = null;
                this.dragged = false;
            })
        });
    }

    /**
     *
     * @param index {number} index of image in CustomizedCanvas.images[]
     */
    show(index) {
        this.index = index;
        if (this.images[index]) {
            // Prepare for show
            this.width = this.clientWidth;
            this.height = this.clientHeight;

            const img = this.images[index];

            // elemが縦長か横長か
            const rate = this.clientWidth / this.clientHeight;
            // imgが縦長か横長か
            const imgRate = img.width / img.height;

            let dx, dy, dWidth, dHeight;
            // 横長
            if (imgRate > rate) {
                const zoom = this.clientWidth / img.width;
                dWidth = this.clientWidth;
                dHeight = this.clientWidth * (img.height / img.width);
                dx = 0;
                dy = (this.clientHeight - dHeight) / 2;
            } else {
                const zoom = this.clientHeight / img.height;
                console.log('縦長zoom:' + zoom);
                dHeight = this.clientHeight;
                dWidth = this.clientHeight * (img.width / img.height);
                dx = (this.clientWidth - dWidth) / 2;
                dy = 0;
            }

            this.getContext('2d').drawImage(img, 0, 0, img.width, img.height, dx + this.offsetX, dy + this.offsetY, dWidth, dHeight);
        } else {
            if (index < 0) {
                index = 0;
            } else if (index >= this.images.length) {
                console.log('else');
                index = this.images.length - 1;
            }
            console.log('Not Found CustomizedCanvas.images[' + index + ']');
        }
    }

    showNext() {
        this.show(this.index + 1);
    }

    showPrev() {
        this.show(this.index - 1);
    }

    showFirst() {
        this.show(0);
    }

    showLast() {
        this.show(this.images.length - 1);
    }
}

const imageLoader = (imageUrl) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
            resolve(img);
        }
        img.onerror = () => {
            reject(new Error("失敗"))
        }
    })
};



customElements.define("customized-canvas", CustomizedCanvas, {extends: "canvas"})

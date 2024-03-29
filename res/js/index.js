// Canvas.getImages("http://www2.dhii.jp/nijl/NIJL0001/SA4-0026/manifest.json", function (xhr) {
//         const images = JSON.parse(xhr.responseText);
//
//         // register to html
//         for (let i = 0; i < images.length; i++) {
//             const image = document.createElement('img');
//             image.src = images[i];
//             document.body.appendChild(image);
//         }
//
//         document.querySelector('body > img').classList.add('display');
//
//         // set keyDown Event
//         window.onkeydown = function (event) {
//             const DIRECTION = {
//                 LEFT: 0,
//                 UP: 1,
//                 RIGHT: 2,
//                 DOWN: 3,
//             };
//
//             let direction;
//             switch (event.keyCode) {
//                 case 37:
//                     direction = DIRECTION.LEFT;
//                     break;
//                 case 38:
//                     direction = DIRECTION.UP;
//                     break;
//                 case 39:
//                     direction = DIRECTION.RIGHT;
//                     break;
//                 case 40:
//                     direction = DIRECTION.DOWN;
//                     break;
//             }
//
//             const now = document.querySelector('body > img.display');
//             const prev = now.previousSibling;
//             const next = now.nextSibling;
//
//             if (direction === DIRECTION.LEFT) {
//                 next.classList.add('display');
//             } else if (direction === DIRECTION.RIGHT) {
//                 prev.classList.add('display');
//             } else if (direction === DIRECTION.UP) {
//                 const first = document.querySelector('body > img');
//                 first.classList.add('display');
//             } else if (direction === DIRECTION.DOWN) {
//                 const last = document.querySelector('body > img:last-of-type');
//                 last.classList.add('display');
//             }
//
//             now.classList.remove('display');
//         }
//     }
// );

// document.addEventListener('DOMContentLoaded', function () {
//
//     const canvases = document.querySelector('.canvases');
//     const canvas = document.createElement('div');
//     canvas.classList.add('canvas');
//     canvases.appendChild(canvas);
//
//     const instance = new Canvas(canvas);
//     instance.getImages("http://www2.dhii.jp/nijl/NIJL0001/SA4-0026/manifest.json");
//
//     const canvas2 = document.createElement('div');
//     canvas2.classList.add('canvas');
//     canvases.appendChild(canvas2);
//     const instance2 = new Canvas(canvas2);
//     instance2.getImages("http://www2.dhii.jp/nijl/NIJL0003/049-0197/manifest.json");
//
//     var elems = document.querySelectorAll('.fixed-action-btn');
//     var instances = M.FloatingActionButton.init(elems, {});
// });
//
// function zoom() {
//     const image = document.querySelector('body > img.display');
//     image.classList.toggle('scale');
// }
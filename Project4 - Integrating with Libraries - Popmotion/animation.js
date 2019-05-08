// Importing a node module
const popmotion = require('popmotion');
// If I wanted to import a file and not a module:
// const rotateAnimation = require('./rotate-animation')
// not the './' at the beginning of the file name

// A more modern way to link files is like this:
// import { styler, value, listen, pointer, spring } from "popmotion";

// code taken from one of the examples on popmotion.io
const ball = document.querySelector('.box');
const divStyler = popmotion.styler(ball);
const ballXY = popmotion.value({ x: 0, y: 0 }, divStyler.set);

popmotion.listen(ball, 'mousedown touchstart').start(e => {
    e.preventDefault();
    popmotion.pointer(ballXY.get()).start(ballXY);
});

popmotion.listen(document, 'mouseup').start(() => {
    popmotion
        .spring({
            from: ballXY.get(),
            velocity: ballXY.getVelocity(),
            to: { x: 0, y: 0 },
            stiffness: 200,
        })
        .start(ballXY);
});

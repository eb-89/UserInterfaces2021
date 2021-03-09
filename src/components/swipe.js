/**
 * This file creates the possiblity to swipe the screen
 * Code inspiration from: https://stackoverflow.com/questions/2264072/detect-a-finger-swipe-through-javascript-on-the-iphone-and-android
 */

export default class Swipe {
    constructor(element) {
        this.xDown = null;
        this.yDown = null;
        this.element = typeof(element) === 'string' ? document.querySelector(element) : element;

        this.element.addEventListener('touchstart', function(evt) {
            this.xDown = evt.touches[0].clientX;
            this.yDown = evt.touches[0].clientY;
        }.bind(this), false);

    }

    /**
     * 
     * @param {function} callback 
     * @returns @this
     */
    onLeft = (callback) => {
        this.onLeft = callback;
        return this;
    }

    /**
     * 
     * @param {function} callback 
     * @returns @this
     */
    onRight = (callback) => {
        this.onRight = callback;

        return this;
    }

    /**
     * Handles the touch event, running different callbacks depending on the touch
     * @param {event} evt 
     * @returns nothing
     */
    handleTouchMove = (evt) => {
        if ( ! this.xDown || ! this.yDown ) {
            return;
        }

        var xUp = evt.touches[0].clientX;
        var yUp = evt.touches[0].clientY;

        this.xDiff = this.xDown - xUp;
        this.yDiff = this.yDown - yUp;

        if ( Math.abs( this.xDiff ) > Math.abs( this.yDiff ) ) { // Most significant.
            if ( this.xDiff > 0 ) {
                this.onLeft();
            } else {
                this.onRight();
            }
        }

        // Reset values, because otherwise it dont stop the callback-function when swiping.
        // i.e. it will not change 1 page when swiping, it will change multiple
        this.xDown = null;
        this.yDown = null;
    }

    run = () => {
        this.element.addEventListener('touchmove', function(evt) {
            this.handleTouchMove(evt);
        }.bind(this), false);
    }
}
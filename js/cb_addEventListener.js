/**
* https://gist.github.com/eduardocereto/955642
* Cross Browser helper to addEventListener.
*
* @param {HTMLElement} obj The Element to attach event to.
* @param {string} evt The event that will trigger the binded function.
* @param {function(event)} fnc The function to bind to the element. 
* @return {boolean} true if it was successfuly binded.
*/
function cb_addEventListener(obj, evt, fnc) {
    // W3C model
    if (obj.addEventListener) {
        obj.addEventListener(evt, fnc, false);
        return true;
    } 
    // Microsoft model
    else if (obj.attachEvent) {
        return obj.attachEvent('on' + evt, fnc);
    }
    // Browser don't support W3C or MSFT model, go on with traditional
    else {
        evt = 'on'+evt;
        if(typeof obj[evt] === 'function'){
            // Object already has a function on traditional
            // Let's wrap it with our own function inside another function
            fnc = (function(f1,f2){
                return function(){
                    f1.apply(this,arguments);
                    f2.apply(this,arguments);
                }
            })(obj[evt], fnc);
        }
        obj[evt] = fnc;
        return true;
    }
    return false;
};

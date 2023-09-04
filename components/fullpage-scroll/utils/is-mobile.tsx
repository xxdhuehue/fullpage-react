export const isMobileDevice = (): boolean => {
    return navigator.userAgent.indexOf('IEMobile') !== -1
}

function easeInOutCubic(currentTime: number, startValue: number, changeInValue: number, duration: number): number {
    const time = (currentTime / duration) - 1;
    const timeCubic = time * time * time;
    return (changeInValue * (timeCubic + 1)) + startValue;
}

export const animatedScrollTo = (scrollTo: number, duration: number, callback: () => void) => {
 
    const scrollFrom = document.body.scrollTop || 0;
    const scrollDiff = scrollTo - scrollFrom;

    console.log("scrollFrom", scrollFrom, "scrollDiff", scrollDiff)
    let currentTime = 0;
    const increment = 20;

    (function animateScroll() {
        currentTime += increment;
        const newScrollPos = easeInOutCubic(currentTime, scrollFrom, scrollDiff, duration);
        // console.log("newScrollPos", newScrollPos, "currentTime", currentTime)
        document.body.scrollTo(0, newScrollPos);
        if (currentTime > duration) {
            callback();
            return;
        }
        setTimeout(animateScroll, increment);
      }());
}
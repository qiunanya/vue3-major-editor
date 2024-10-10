/**
 * flip animate
 * 
 * @author qiuny
 * @param element Animation Objects
 * @param firstRect get the current bounds
 * @param lastRect get the final bounds
 */
export const FlipAnimate = (element:HTMLElement, firstRect:DOMRect, lastRect:DOMRect) => {
    // Invert: determine the delta between the 
    // first and last bounds to invert the element
    const deltaX = firstRect.left - lastRect.left;
    const deltaY = firstRect.top - lastRect.top;
    const deltaW = firstRect.width / lastRect.width;
    const deltaH = firstRect.height / lastRect.height;

    // Play: animate the final element from its first bounds
    // to its last bounds (which is no transform)
    const player = element.animate(
        [
            { 
                transformOrigin: 'top left',
                transform: `translateX(${deltaX}px) translateY(${deltaY}px) scale(${deltaW})` 
            },
            { 
                transformOrigin: 'top left',
                transform: `translateX(0) translateY(0) scale(1)` 
            }
        ],
        {
            duration: 600,
            easing: "cubic-bezier(0.2, 0, 0.2, 1)"
        }
    );
    player.addEventListener('finish', (evt) => { 
        console.log('Animation execution completed.')
    })
}
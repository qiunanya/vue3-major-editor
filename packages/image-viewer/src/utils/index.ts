/**
 * debounce
 * 
 * @param { Function } fun 
 * @param { Number } delay 
 * @returns 
 */
export const debounce = (fun: Function, delay:number) => {
    let timeout:NodeJS.Timeout | null;

    return function (this:any) {
        let context = this;
        let args = arguments;

        timeout&&clearTimeout(timeout)

        timeout = setTimeout(function(){
            fun.apply(context, args)
        }, delay);
    }
}
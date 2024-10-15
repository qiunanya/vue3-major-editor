/**
 * debounce
 * 
 * @param { Function } fun 
 * @param { Number } delay 
 * @author qiuny
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


export const getTimeStamp = () => {
    var date = new Date()
    var y = date.getFullYear()
    var m = date.getMonth()+1
    var d = date.getDate()
    var hour = date.getHours()
    var minutes = date.getMinutes()
    var seconds = date.getSeconds()
    return `${y}${m}${d}_${hour}${minutes}${seconds}`
}

/**
 * downloadExe
 * 
 * @param { String } url image url
 * @param { String } fileName
 */
export const downloadExe = (url:string, fileName?:string) => {
    fetch(url)
    .then(res => res.blob())
    .then(blob => {
        var link = document.createElement('a');
        link.style.display = 'none';
        document.body.appendChild(link);
        var url = window.URL.createObjectURL(blob);
        link.href = url;
        link.download = fileName || getTimeStamp();
        link.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link); 
    })
}
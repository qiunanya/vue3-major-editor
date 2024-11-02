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

export const getUserAgent = (): boolean => {
    // @ts-ignore
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
    let flag = false
    // 如果是移动设备，返回 Mobile
    if (isMobileDevice) {
        flag = true
    }

    // 如果支持触摸，且不是常见的移动设备，返回 Mobile
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        flag = true
    }

    return flag;
}

export const getDeviceType = () => {
    const userAgent = navigator.userAgent.toLowerCase();
  
    if (/android|adr/.test(userAgent)) {
      return 'Android';
    }
    if (/iphone|ipad|ipod|ios/.test(userAgent)) {
      return 'iOS';
    }
    if (/windows phone|iemobile/.test(userAgent)) {
      return 'Windows Phone';
    }
    if (/mobile|blackberry|opera mini|opera mobi/.test(userAgent)) {
      return 'Other Mobile';
    }
    
    // 额外检测平板设备
    if (/tablet|ipad/.test(userAgent) && !/mobile/.test(userAgent)) {
      return 'Tablet';
    }
    
    return 'Desktop';
  }


export const versions = '1.0.12'
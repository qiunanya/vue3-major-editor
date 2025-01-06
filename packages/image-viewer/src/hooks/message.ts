type MsgState = 'success'|'error'|'warning'|'info'

interface MsgOptions {
    title: string,
    message: string,
    type: MsgState,
    duration: number
}

const Optoins:MsgOptions = {
    title: '提示',
    duration: 3000,
    type: 'success',
    message: '提示内容'
}

export const useMessage = () => {
    const init = () => {
        const content = document.createElement('div')
        content.setAttribute('id', 'ivv-message-wrapper')
        !document.querySelector('#ivv-message-wrapper') && document.body.appendChild(content)
    }

    init()

    const success = (opt?:Partial<MsgOptions>) => {
        const defaults = { type: 'success', title: '成功提示', message: '这是一条成功消息' }
        messageUI({...defaults, ...opt, })
    }

    const error = (opt?:Partial<MsgOptions>) => {
        const defaults = { type: 'error', title: '错误提示', message: '这是一条错误消息' }
        messageUI({...defaults, ...opt, })
    }

    const warning = (opt?:Partial<MsgOptions>) => {
        const defaults = { type: 'warning', title: '警告提示', message: '这是一条警告消息' }
        messageUI({...defaults, ...opt, })
    }

    const info = (opt?:Partial<MsgOptions>) => {
        const defaults = { type: 'info', title: '基础提示', message: '这是一条基础消息' }
        messageUI({...defaults, ...opt, })
    }

    function messageUI({ title = "", message = "", type = "info", duration = 3000 }) {
        const newOpt = Object.assign(Optoins, { title, message, type, duration })

        const main = document.getElementById("ivv-message-wrapper")
        if (main) {
            const toast = document.createElement('div')
    
            const autoRemoveId = setTimeout(() => {
                main.removeChild(toast)
            }, duration+1000)
    
            toast.onclick = (e:Event) => {
                const el = e.target as HTMLElement;
                if (el.closest('.ivv-message-item__close')) {
                    main.removeChild(toast)
                    clearInterval(autoRemoveId)
                }
            }

            const delay = (newOpt.duration / 1000).toFixed(2)
    
            toast.classList.add("message-item", `ivv-message-item--${newOpt.type}`);
            toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;
    
            toast.innerHTML = `
                        <div class="ivv-message-item__body">
                            <h3 class="ivv-message-item__title">${newOpt.title}</h3>
                            <p class="ivv-message-item__msg">${newOpt.message}</p>
                        </div>
                        <div class="ivv-message-item__close">
                            x
                        </div>
                    `;
            main.appendChild(toast);
        }
    }

    return {
        success,
        error,
        warning,
        info
    }
}
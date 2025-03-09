import type { App, Directive } from "vue";
import type { SFCInstallWithContext, SFCWithInstall } from "../sfcs/typescripts";

export const withInstall = <T, E extends Record<string, any>>(main: T, extra?: E) => {
    (main as SFCWithInstall<T>).install = (app:App): void => {
        for (const comp of [main, ...Object.values(extra ?? {})]) {
            console.log(comp.name, 66666)
            app.component(comp.name, comp);
        }
    };

    if (extra) {
        for (const [key, comp] of Object.entries(extra)) {
            (main as any)[key] = comp;
        }
    }
    return main as SFCWithInstall<T> & E;
};

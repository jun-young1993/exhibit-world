import {rgbColor} from "../types/color";

export function rgb({r, g, b, a}: rgbColor){
    if (a) return `rgb(${r}, ${g}, ${b}, ${a})`;
    return `rgb(${r}, ${g}, ${b})`
}
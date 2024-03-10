import { normalize } from "./props";
import { FileComponent } from "./file";
import { createPlugin } from "leva/plugin";

export const glbPluginFile = createPlugin({
    normalize,
    component: FileComponent,
});


// import { pluginFile } from "plugin-file";
//
// function onChange(file: File) {
//     // do something with file
// }
//
// const controls = useControls({
//     File: pluginFile({ onChange }),
// });
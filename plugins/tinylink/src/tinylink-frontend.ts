/**
 * Generated using theia-plugin-generator
 */

import * as theia from "@theia/plugin";

namespace IoTCommands {
    const IOT_CATEGORY = 'IoT Plugin';

    export const TINYLINK_COMPILE = {
        id: 'iot.plugin.tinylink.compile',
        category: IOT_CATEGORY,
        label: 'TinyLink Compile',
    };

    export const TINYSIM_COMPILE = {
        id: "iot.plugin.tinysim.compile",
        category: IOT_CATEGORY,
        label: "TinySim Compile"
    };

    export const ONELINK_COMPILE = {
        id: "iot.plugin.onelink.compile",
        category: IOT_CATEGORY,
        label: 'OneLink Compile'
    }
}

export function start(context: theia.PluginContext) {
    context.subscriptions.push(
        theia.commands.registerCommand(
            IoTCommands.TINYLINK_COMPILE,
            async (...args: any[]) => {
                theia.window
                    .showOpenDialog({
                        defaultUri: theia.Uri.parse("/home/project")
                    })
                    .then(val => {
                        if (!val || !val.length) {
                            return theia.window.showErrorMessage('没有选择文件')
                        }

                        let result = (val && val[0]) || { path: "" };
                        const panel = theia.window.createWebviewPanel(
                            "TinyLink Compile Result",
                            "TinyLink Compile Result",
                            theia.ViewColumn.Active
                        );
                        let params = theia.env.getQueryParameters() || {};
                        let queryString = `path=${result.path}`;
                        for (let key in params) {
                            queryString += `&${key}=${params[key]}`;
                        }
                        panel.webview.html = `<iframe src="http://tinylink.daixinye.com/webview/tinylink?${queryString}" frameborder="0" style="display: block; margin: 0px; overflow: hidden; position: absolute; width: 100%; height: 100%; visibility: visible;" sandbox="allow-same-origin allow-scripts"></iframe>`;
                    });
            }
        )
    );

    context.subscriptions.push(
        theia.commands.registerCommand(
            IoTCommands.TINYSIM_COMPILE,
            async (...args: any[]) => {
                // todo: tinysim
            }
        )
    );

    context.subscriptions.push(
        theia.commands.registerCommand(
            IoTCommands.ONELINK_COMPILE,
            async (...args: any[]) => {
                // todo: onelink
            }
        )
    );
}

export function stop() { }

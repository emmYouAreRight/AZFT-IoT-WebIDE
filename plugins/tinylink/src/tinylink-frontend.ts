/**
 * Generated using theia-plugin-generator
 */

import * as theia from "@theia/plugin";

namespace IoTCommands {
    const IOT_CATEGORY = "IoT Plugin";

    export const TINYLINK_COMPILE = {
        id: "iot.plugin.tinylink.compile",
        category: IOT_CATEGORY,
        label: "TinyLink Compile"
    };

    export const TINYSIM_COMPILE = {
        id: "iot.plugin.tinysim.compile",
        category: IOT_CATEGORY,
        label: "TinySim Compile"
    };

    export const ONELINK_COMPILE = {
        id: "iot.plugin.onelink.compile",
        category: IOT_CATEGORY,
        label: "OneLink Compile"
    };
}

export function start(context: theia.PluginContext) {
    context.subscriptions.push(
        theia.commands.registerCommand(
            IoTCommands.TINYLINK_COMPILE,
            async (...args: any[]) => {
                const panel = theia.window.createWebviewPanel(
                    "TinyLink Compile Result",
                    "TinyLink Compile Result",
                    theia.ViewColumn.Active
                );
                panel.webview.html = `
                        <script>
                            window.addEventListener("message",function(e){
                                var data = e.data.data
                                var from = e.data.from
                                switch(from){
                                    case 'webide':
                                        document.getElementById('iframe').contentWindow.postMessage({
                                            from: 'webview',
                                            data: data
                                        },'*')
                                        break
                                    case 'iframe':
                                        window.postMessageExt(data)
                                        break
                                }
                            },false)
                        </script>
                        <iframe id="iframe" src="http://tinylink.daixinye.com/webview/debug" frameborder="0" style="display: block; margin: 0px; overflow: hidden; position: absolute; width: 100%; height: 100%; visibility: visible;" sandbox="allow-same-origin allow-scripts"></iframe>
                        `;
                panel.webview.onDidReceiveMessage((data: any) => {
                    if (data && data.type === "command") {
                        switch (data.content) {
                            case "open_file_picker":
                                theia.window
                                    .showOpenDialog({
                                        defaultUri: theia.Uri.parse("/home/project")
                                    })
                                    .then((val: any) => {
                                        if (!val || !val.length) {
                                            return theia.window.showErrorMessage("没有选择文件");
                                        }
                                        panel.webview.postMessage({
                                            from: 'webide',
                                            data: {
                                                path: val[0].path
                                            }
                                        })

                                    });
                                break;
                            default:
                        }
                    }
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

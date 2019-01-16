import axios from "axios";
import { injectable, inject } from "inversify";
import { CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry, MessageService} from "@theia/core/lib/common";
import { MAIN_MENU_BAR } from "@theia/core/lib/common/menu";
import { CommonMenus } from "@theia/core/lib/browser";
import { KeybindingContribution, KeybindingRegistry } from '@theia/core/lib/browser/keybinding'
import { Command } from "@theia/core/lib/common/command";
import { IoTDialog } from './IoTDialog';

axios.defaults.baseURL = 'http://api.daixinye.com';

export const YahahaExtensionCommand = {
    id: 'yahaha.command',
    label: "Yahaha"
};

export namespace IoTMenus{
    export const IOT=[...MAIN_MENU_BAR,'1_iot'];
    export const IOT_COMPLIE=[...IOT,'1_compile'];
    export const IOT_BURN =[...IOT,'2_burn'];
    export const IOT_ABOUT=[...IOT,'3_about'];
}

export namespace IoTCommands{
    const IOT_CATEGORY='IoT';
    export const COMPILE:Command ={
        id:'iot.complile',
        category:IOT_CATEGORY,
        label:'Compile'
    };

    export const BURN:Command ={
        id:'iot.burn',
        label:'Burn'
    };

    export const ABOUT:Command ={
        id:'iot.about',
        label:'About'
    }
}

@injectable()
export class YahahaExtensionCommandContribution implements CommandContribution {
    constructor(
        @inject(MessageService) private readonly messageService: MessageService,
        @inject(IoTDialog) private readonly iotDialog:IoTDialog
    ) { }

    registerCommands(registry: CommandRegistry): void {

        registry.registerCommand(YahahaExtensionCommand, {
            execute: () => {
                axios.post('hello/').then(re => {
                    this.messageService.info(re.data)
                }).catch(error => {
                    this.messageService.error(error)
                })
            }
        });

        registry.registerCommand(IoTCommands.COMPILE,{
            execute:()=>this.messageService.info('compile')
        })

        registry.registerCommand(IoTCommands.BURN,{
            execute:()=>this.messageService.info('burn')
        })

        registry.registerCommand(IoTCommands.ABOUT,{
            execute:()=>this.openAbout()
        })
    }


    protected async openAbout(){
        this.iotDialog.open();
    }
}

@injectable()
export class YahahaExtensionMenuContribution implements MenuContribution {
    registerMenus(menus: MenuModelRegistry): void {

        menus.registerMenuAction(CommonMenus.EDIT_FIND, {
            commandId: YahahaExtensionCommand.id,
            label: 'Say yahaha'
        });

        menus.registerSubmenu(IoTMenus.IOT,'IoT');
        menus.registerMenuAction(IoTMenus.IOT_COMPLIE,{
            commandId:IoTCommands.COMPILE.id
        });
        menus.registerMenuAction(IoTMenus.IOT_BURN,{
            commandId:IoTCommands.BURN.id
        });
        menus.registerMenuAction(IoTMenus.IOT_ABOUT,{
            commandId:IoTCommands.ABOUT.id
        });
    }
}

@injectable()
export class YahahaExtensionKeyBindingContribution implements KeybindingContribution{
    registerKeybindings(registry: KeybindingRegistry): void {
        registry.registerKeybinding({
            command:IoTCommands.ABOUT.id,
            keybinding:'f5'
        })
    }
}


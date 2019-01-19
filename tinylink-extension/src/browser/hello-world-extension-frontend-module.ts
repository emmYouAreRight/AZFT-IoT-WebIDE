import { YahahaExtensionCommandContribution ,
         YahahaExtensionMenuContribution,
         YahahaExtensionKeyBindingContribution
       } from './yahaha-extension-contribution';
import { IoTDialog,IoTDialogProps } from './IoTDialog'
import { YahahaViewContribution } from './yahaha-view-contribute';
import { KeybindingContribution } from '@theia/core/lib/browser/keybinding';
import {
    CommandContribution,
    MenuContribution,
} from "@theia/core/lib/common";

import {
    bindViewContribution,
    FrontendApplicationContribution,
    createTreeContainer,
    TreeProps,
    TreeWidget,
    TreeDecoratorService,
    defaultTreeProps,
    WidgetFactory,
} from "@theia/core/lib/browser";

import { ContainerModule, interfaces } from "inversify";
import { YahahaViewWidget } from './yahaha-view-weight';
import { YahahaViewWidgetFactory } from './yahaha-view-weight';
import { YahahaViewService } from './yahaha-view-service';
import { YahahaTreeDecorator, YahahaDecoratorService} from './yahaha-decorator-service';
import { bindContributionProvider } from '@theia/core/lib/common/contribution-provider';

export default new ContainerModule(bind => {

    bind(CommandContribution).to(YahahaExtensionCommandContribution);
    bind(MenuContribution).to(YahahaExtensionMenuContribution);
    bind(KeybindingContribution).to(YahahaExtensionKeyBindingContribution);
    bind(IoTDialog).toSelf().inSingletonScope();
    bind(IoTDialogProps).toConstantValue({title:'IoT'})

    bindViewContribution(bind,YahahaViewContribution);
    bind(FrontendApplicationContribution).to(YahahaViewContribution);

    bind(YahahaViewWidgetFactory).toFactory(ctx=>()=>createYahahaViewWidget(ctx.container));
    bind(YahahaViewService).toSelf().inSingletonScope();
    bind(WidgetFactory).toService(YahahaViewService);


});

function createYahahaViewWidget(parent :interfaces.Container): YahahaViewWidget{
    const child=createTreeContainer(parent);
    child.rebind(TreeProps).toConstantValue({ ...defaultTreeProps, search: true });
    child.unbind(TreeWidget);
    child.bind(YahahaViewWidget).toSelf();

    child.bind(YahahaDecoratorService).toSelf().inSingletonScope();
    child.rebind(TreeDecoratorService).toDynamicValue(ctx => ctx.container.get(YahahaDecoratorService)).inSingletonScope();
    bindContributionProvider(child, YahahaTreeDecorator);

    return child.get(YahahaViewWidget);
}

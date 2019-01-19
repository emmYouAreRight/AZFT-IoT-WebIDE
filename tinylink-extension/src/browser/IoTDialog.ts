import { inject, injectable, postConstruct } from 'inversify';
import { AbstractDialog, DialogProps } from '@theia/core/lib/browser/dialogs';

export const IoTDialog_CONTENT_CLASS = 'iot-aboutDialog';
export const IoTDialog_EXTENSIONS_CLASS = 'iot-aboutExtensions';

@injectable()
export class IoTDialogProps extends DialogProps {
}

@injectable()
export class IoTDialog extends AbstractDialog<void> {

    constructor(
        @inject(IoTDialogProps) protected readonly props: IoTDialogProps
    ) {
        super({
            title: props.title
        });
    }

    @postConstruct()
    protected async init(): Promise<void> {
        const messageNode = document.createElement('div');
        messageNode.classList.add(IoTDialog_CONTENT_CLASS);
        messageNode.textContent='恶魔妈妈买面膜';

        // const applicationInfo = await this.appServer.getApplicationInfo();
        const iframe= document.createElement('iframe');

        iframe.setAttribute('src','http://webide.daixinye.com');
        iframe.setAttribute('width','700');
        iframe.setAttribute('height','500');

        messageNode.appendChild(iframe);
        this.contentNode.appendChild(messageNode);

        this.appendAcceptButton('ok')
    }

    get value(): undefined {return undefined;}
}

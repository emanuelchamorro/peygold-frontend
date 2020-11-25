import { SelectOption } from './select-option';

export class Status extends SelectOption {

    constructor(
        value?: string,
        public label?: string,
    ) {
        super(value);
        switch (value) {
            case ('0'):
                this.label = 'Pendiente';
                break;
            case ('1'):
                this.label = 'Inactiva';
                break;
            case ('2'):
                this.label = 'Activa';
                break;
            case ('3'):
                this.label = 'Suspendida';

        }
    }
}

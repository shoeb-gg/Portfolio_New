import { afterNextRender, Component } from '@angular/core';

import AOS from 'aos';

@Component({
    selector: 'app-container',
    templateUrl: './container.component.html',
    styleUrls: ['./container.component.scss'],
    standalone: false,
})
export class ContainerComponent {
    constructor() {
        afterNextRender(() => {
            AOS.init({
                delay: 80,
                mirror: true,
            });
        });
    }
}

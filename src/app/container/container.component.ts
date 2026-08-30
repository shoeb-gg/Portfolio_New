import { afterNextRender, Component, ChangeDetectionStrategy } from '@angular/core';

import AOS from 'aos';

@Component({
    selector: 'app-container',
    templateUrl: './container.component.html',
    styleUrls: ['./container.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
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

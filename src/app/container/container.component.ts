import { AfterViewInit, Component } from '@angular/core';

import AOS from 'aos';

@Component({
    selector: 'app-container',
    templateUrl: './container.component.html',
    styleUrls: ['./container.component.scss'],
    standalone: false
})
export class ContainerComponent implements AfterViewInit {
    ngAfterViewInit(): void {
        AOS.init({
            delay: 80,
            mirror: true,
        });
    }
}

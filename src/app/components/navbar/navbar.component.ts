import { Component } from '@angular/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
    constructor() {
        setTimeout(() => {
            // this.scrollTrigger('skills');
        }, 200);
    }
    scrollTrigger(div: string) {
        document.getElementById(div)!.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest',
        });
    }
}

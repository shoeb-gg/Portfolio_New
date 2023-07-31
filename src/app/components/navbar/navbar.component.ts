import { Component } from '@angular/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
    constructor() {
        setTimeout(() => {
            this.scrollTrigger(1);
        }, 200);
    }
    scrollTrigger(screenNum: number) {
        window.scrollTo({ top: screen.height * screenNum, behavior: 'smooth' });
    }
}

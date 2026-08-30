import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
})
export class NavbarComponent {
    scrollTrigger(div: string) {
        document.getElementById(div)!.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest',
        });
    }
}

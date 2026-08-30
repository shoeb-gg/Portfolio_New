import { afterNextRender, Component, ChangeDetectionStrategy } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NavbarComponent, RouterOutlet],
})
export class AppComponent {
    constructor() {
        afterNextRender(() => {
            const circle = document.getElementById('circle');

            const follow = (x: number, y: number) => {
                circle!.style.transform = `translate3d(${x - 20}px,${y - 20}px,0px)`;
            };

            document.addEventListener('mousemove', (e: MouseEvent) => follow(e.pageX, e.pageY));
            document.addEventListener('touchmove', (e: TouchEvent) => {
                const touch = e.touches[0];

                if (touch) {
                    follow(touch.pageX, touch.pageY);
                }
            });
        });
    }
}

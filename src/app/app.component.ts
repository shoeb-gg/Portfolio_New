import { AfterViewInit, Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
    //Cursor Follow ALgorithm
    ngAfterViewInit(): void {
        const myDiv = document.getElementById('circle');

        const isTouchDevice = () => {
            try {
                document.createEvent('TouchEvent');
                return true;
            } catch (err) {
                return false;
            }
        };

        const follow = (e: any) => {
            try {
                var x = !isTouchDevice() ? e.pageX : e.touches[0].pageX;
                var y = !isTouchDevice() ? e.pageY : e.touches[0].pageY;
            } catch (e) {}

            myDiv!.style.transform = `translate3d(${x - 20}px,${y - 20}px,0px)`;
        };

        document.addEventListener('mousemove', (e) => {
            follow(e);
        });
        document.addEventListener('touchmove', (e) => {
            follow(e);
        });
    }
}

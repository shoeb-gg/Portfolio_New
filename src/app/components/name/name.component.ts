import { afterNextRender, Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-name',
    templateUrl: './name.component.html',
    styleUrls: ['./name.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
})
export class NameComponent {
    public showSpace = true;

    constructor() {
        afterNextRender(() => {
            // Wrap each non-space character so it can fade in on its own schedule.
            // The animation itself is pure CSS (see `.ml2 .letter` in styles.scss).
            const textWrapper = document.querySelector('.ml2');
            let index = 0;

            textWrapper!.innerHTML = textWrapper!.textContent!.replace(
                /\S/g,
                (char) => `<span class="letter" style="--i:${index++}">${char}</span>`
            );

            setInterval(() => {
                this.showSpace = !this.showSpace;
            }, 700);
        });
    }

    downloadResume() {
        const a = document.createElement('a');
        a.href = 'assets/Resume.pdf';
        a.download = 'Shoeb Uddin Ahmed';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}

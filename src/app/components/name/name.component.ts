import { afterNextRender, Component } from '@angular/core';

import anime from 'animejs/lib/anime.es.js';

@Component({
    selector: 'app-name',
    templateUrl: './name.component.html',
    styleUrls: ['./name.component.scss'],
    standalone: false,
})
export class NameComponent {
    public showSpace = true;

    constructor() {
        afterNextRender(() => {
            const textWrapper = document.querySelector('.ml2');
            textWrapper!.innerHTML = textWrapper!.textContent!.replace(
                /\S/g,
                "<span class='letter'>$&</span>"
            );

            anime.timeline({ loop: true }).add({
                targets: '.ml2 .letter',
                scale: [4, 1],
                opacity: [0, 1],
                translateZ: 0,
                easing: 'easeOutExpo',
                duration: 1500,
                delay: (el, i) => 100 * i,
            });

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

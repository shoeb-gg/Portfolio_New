import { Component } from '@angular/core';

@Component({
    selector: 'app-name',
    templateUrl: './name.component.html',
    styleUrls: ['./name.component.scss'],
})
export class NameComponent {
    downloadResume() {
        const a = document.createElement('a');
        a.href = 'assets/Resume.pdf';
        a.download = 'Shoeb Uddin Ahmed';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}

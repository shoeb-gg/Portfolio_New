import { afterNextRender, Component, ChangeDetectionStrategy } from '@angular/core';

import AOS from 'aos';
import { NameComponent } from '../components/name/name.component';
import { PhotoComponent } from '../components/photo/photo.component';
import { AboutComponent } from '../components/about/about.component';
import { ExperienceComponent } from '../components/experience/experience.component';
import { SkilsComponent } from '../components/skils/skils.component';
import { ProjectsComponent } from '../components/projects/projects.component';
import { ContactComponent } from '../components/contact/contact.component';

@Component({
    selector: 'app-container',
    templateUrl: './container.component.html',
    styleUrls: ['./container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        NameComponent,
        PhotoComponent,
        AboutComponent,
        ExperienceComponent,
        SkilsComponent,
        ProjectsComponent,
        ContactComponent,
    ],
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

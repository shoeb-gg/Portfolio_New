import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgOptimizedImage } from '@angular/common';

import { ContainerRoutingModule } from './container-routing.module';
import { ContainerComponent } from './container.component';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TextFieldModule } from '@angular/cdk/text-field';

import { LottieNativeComponent } from '../components/lottie/lottie.component';

import { NameComponent } from '../components/name/name.component';
import { PhotoComponent } from '../components/photo/photo.component';
import { AboutComponent } from '../components/about/about.component';
import { SkilsComponent } from '../components/skils/skils.component';
import { ContactComponent } from '../components/contact/contact.component';
import { ProjectsComponent } from '../components/projects/projects.component';

import { LottieComponent } from 'ngx-lottie';

@NgModule({
    declarations: [
        LottieNativeComponent,
        ContainerComponent,
        NameComponent,
        PhotoComponent,
        AboutComponent,
        SkilsComponent,
        ContactComponent,
        ProjectsComponent,
    ],
    imports: [
        CommonModule,
        ContainerRoutingModule,
        ReactiveFormsModule,
        NgOptimizedImage,
        MatSnackBarModule,
        TextFieldModule,
        LottieComponent,
    ],
    exports: [LottieNativeComponent],
})
export class ContainerModule {}

import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-photo',
    templateUrl: './photo.component.html',
    styleUrls: ['./photo.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class PhotoComponent {}

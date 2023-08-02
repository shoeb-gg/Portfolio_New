import { Component, NgZone, ViewChild } from '@angular/core';

import { CdkTextareaAutosize } from '@angular/cdk/text-field';

import { take } from 'rxjs/internal/operators/take';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
    constructor(private _ngZone: NgZone) {}

    @ViewChild('autosize') autosize: CdkTextareaAutosize;

    triggerResize() {
        // Wait for changes to be applied, then trigger textarea resize.
        this._ngZone.onStable
            .pipe(take(1))
            .subscribe(() => this.autosize.resizeToFitContent(true));
    }
}

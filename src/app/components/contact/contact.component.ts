import { Component, NgZone, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { CdkTextareaAutosize } from '@angular/cdk/text-field';

import { take } from 'rxjs/internal/operators/take';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';

import { ContactService } from './contact.service';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    standalone: false
})
export class ContactComponent implements OnDestroy {
    private _unsubscribeAll: Subject<void> = new Subject<void>();
    @ViewChild('autosize') autosize: CdkTextareaAutosize;

    constructor(
        private readonly _ngZone: NgZone,
        private readonly contact: ContactService,
        private readonly fb: FormBuilder
    ) {
        this.initForm();
    }

    public msgForm: FormGroup;
    public msgSent: boolean = false;
    /** Shown under the form when the message could not be delivered. */
    public sendFailed: boolean = false;

    initForm() {
        this.msgForm = this.fb.group({
            name: [''],
            email: [''],
            message: [''],
        });
    }

    triggerResize() {
        // Wait for changes to be applied, then trigger textarea resize.
        this._ngZone.onStable
            .pipe(take(1))
            .subscribe(() => this.autosize.resizeToFitContent(true));
    }

    saveMessage() {
        this.sendFailed = false;

        this.contact
            .saveMessage({ ...this.msgForm.value })
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe({
                next: (res) => {
                    if (res) {
                        this.msgSent = true;
                    } else {
                        this.sendFailed = true;
                    }
                },
                error: () => {
                    this.sendFailed = true;
                },
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}

import { Component, NgZone, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

import { take } from 'rxjs/internal/operators/take';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';

import { ContactService } from './contact.service';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnDestroy {
    private _unsubscribeAll: Subject<void> = new Subject<void>();
    @ViewChild('autosize') autosize: CdkTextareaAutosize;

    constructor(
        private readonly _ngZone: NgZone,
        private readonly contact: ContactService,
        private readonly fb: FormBuilder,
        private _snackBar: MatSnackBar
    ) {
        this.initForm();
    }

    public msgForm: FormGroup;
    public msgSent: boolean = false;

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
        this.contact
            .saveMessage({ ...this.msgForm.value })
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((res) => {
                if (res) {
                    this.msgSent = true;
                } else {
                    this._snackBar.open(
                        'Error while sending message ',
                        'close',
                        {
                            duration: 5000,
                        }
                    );
                }
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}

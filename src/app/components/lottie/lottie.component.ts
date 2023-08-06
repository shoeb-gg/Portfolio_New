import { Component, Input, OnInit } from '@angular/core';

import { AnimationOptions } from 'ngx-lottie';

@Component({
    selector: 'app-lottie',
    templateUrl: './lottie.component.html',
    styleUrls: ['./lottie.component.scss'],
})
export class LottieComponent implements OnInit {
    @Input() fileName: string;
    @Input() height: string;
    @Input() width: string;

    options: AnimationOptions;

    ngOnInit(): void {
        this.options = {
            path: `/assets/animations/${this.fileName}.json`,
        };

        this.height = `${this.height}px`;
        this.width = `${this.width}px`;
    }
}

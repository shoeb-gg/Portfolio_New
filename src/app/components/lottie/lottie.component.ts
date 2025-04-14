import {
    Component,
    Inject,
    Input,
    PLATFORM_ID,
    afterNextRender,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { AnimationOptions, LottieTransferState } from 'ngx-lottie';

@Component({
    selector: 'app-lottie',
    templateUrl: './lottie.component.html',
    styleUrls: ['./lottie.component.scss'],
    standalone: false,
})
export class LottieNativeComponent {
    @Input() fileName: string;
    @Input() height: string;
    @Input() width: string;

    options: AnimationOptions;

    isBrowser: boolean;

    constructor(
        private lottieTransferState: LottieTransferState,
        @Inject(PLATFORM_ID) private readonly platformId: Object
    ) {
        this.isBrowser = isPlatformBrowser(this.platformId);

        afterNextRender(() => {
            this.options = {
                path: `/assets/animations/${this.fileName}.json`,
            };

            this.height = `${this.height}px`;
            this.width = `${this.width}px`;
        });
    }
}

import {
    Component,
    ElementRef,
    Inject,
    Input,
    NgZone,
    OnDestroy,
    PLATFORM_ID,
    afterNextRender,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { AnimationOptions, LottieTransferState } from 'ngx-lottie';
import type { AnimationItem } from 'lottie-web';

@Component({
    selector: 'app-lottie',
    templateUrl: './lottie.component.html',
    styleUrls: ['./lottie.component.scss'],
    standalone: false,
})
export class LottieNativeComponent implements OnDestroy {
    @Input() fileName: string;
    @Input() height: string;
    @Input() width: string;

    options: AnimationOptions;

    isBrowser: boolean;

    private animation: AnimationItem | null = null;
    private observer: IntersectionObserver | null = null;
    private inView = true;

    constructor(
        private lottieTransferState: LottieTransferState,
        @Inject(PLATFORM_ID) private readonly platformId: Object,
        private readonly host: ElementRef<HTMLElement>,
        private readonly zone: NgZone
    ) {
        this.isBrowser = isPlatformBrowser(this.platformId);

        afterNextRender(() => {
            this.options = {
                path: `/assets/animations/${this.fileName}.json`,
            };

            this.height = `${this.height}px`;
            this.width = `${this.width}px`;

            this.observeViewport();
        });
    }

    onAnimationCreated(animation: AnimationItem): void {
        this.animation = animation;

        // Render on whole frames only: a 25-30fps file no longer re-renders at the 60Hz rAF rate.
        animation.setSubframe(false);

        if (!this.inView) {
            animation.pause();
        }
    }

    /** Play only while the animation is (nearly) on screen; ~20 loops run on this page. */
    private observeViewport(): void {
        if (typeof IntersectionObserver === 'undefined') {
            return;
        }

        this.zone.runOutsideAngular(() => {
            this.observer = new IntersectionObserver(
                ([entry]) => {
                    this.inView = entry.isIntersecting;

                    if (!this.animation) {
                        return;
                    }

                    if (this.inView) {
                        this.animation.play();
                    } else {
                        this.animation.pause();
                    }
                },
                { rootMargin: '100px' }
            );

            this.observer.observe(this.host.nativeElement);
        });
    }

    ngOnDestroy(): void {
        this.observer?.disconnect();
    }
}

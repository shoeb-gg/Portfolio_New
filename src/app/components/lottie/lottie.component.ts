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

/** Upper bound on how many frames per second any Lottie is drawn. Files below this keep their own rate. */
const MAX_FPS = 30;

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

    private rafId: number | null = null;
    private startTime = 0;
    private lastFrame = -1;
    private lastSlot = -1;

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
                // We drive playback ourselves (see startLoop) so we can cap the frame rate.
                autoplay: false,
            };

            this.height = `${this.height}px`;
            this.width = `${this.width}px`;

            this.observeViewport();
        });
    }

    onAnimationCreated(animation: AnimationItem): void {
        this.animation = animation;
        animation.setSubframe(false);
    }

    /** Fired once the JSON is parsed and the SVG is in the DOM — frameRate/totalFrames are valid from here. */
    onDomLoaded(): void {
        if (this.inView) {
            this.startLoop();
        }
    }

    /**
     * Frame-capped playback. Instead of Lottie's own loop (which redraws on every 60Hz tick), we
     * compute which frame *should* be showing from the wall clock and draw it only when that index
     * changes -- and only once per global 1/MAX_FPS "slot", so every Lottie on the page updates on
     * the same frames (two animations on alternating frames would still force 60 frames/s).
     * Speed is unchanged; a 60fps file simply shows every 2nd frame.
     */
    private startLoop(): void {
        const animation = this.animation;

        if (!animation || this.rafId !== null) {
            return;
        }

        const fileFps = animation.frameRate;
        const total = animation.totalFrames;
        const slotMs = 1000 / MAX_FPS;

        // Resume from where we paused so re-entering the viewport does not jump.
        const resumeFrame = this.lastFrame > 0 ? this.lastFrame : 0;
        this.startTime = performance.now() - (resumeFrame / fileFps) * 1000;

        const tick = (now: number) => {
            const slot = Math.floor(now / slotMs);

            if (slot !== this.lastSlot) {
                this.lastSlot = slot;
                const frame = Math.floor(((now - this.startTime) / 1000) * fileFps) % total;

                if (frame !== this.lastFrame) {
                    animation.goToAndStop(frame, true);
                    this.lastFrame = frame;
                }
            }

            this.rafId = requestAnimationFrame(tick);
        };

        this.zone.runOutsideAngular(() => {
            this.rafId = requestAnimationFrame(tick);
        });
    }

    private stopLoop(): void {
        if (this.rafId !== null) {
            cancelAnimationFrame(this.rafId);
            this.rafId = null;
        }
    }

    /** Only animate while (nearly) on screen; ~20 Lotties live on this page. */
    private observeViewport(): void {
        if (typeof IntersectionObserver === 'undefined') {
            return;
        }

        this.zone.runOutsideAngular(() => {
            this.observer = new IntersectionObserver(
                ([entry]) => {
                    this.inView = entry.isIntersecting;

                    if (!this.animation?.isLoaded) {
                        return;
                    }

                    if (this.inView) {
                        this.startLoop();
                    } else {
                        this.stopLoop();
                    }
                },
                { rootMargin: '100px' }
            );

            this.observer.observe(this.host.nativeElement);
        });
    }

    ngOnDestroy(): void {
        this.stopLoop();
        this.observer?.disconnect();
    }
}

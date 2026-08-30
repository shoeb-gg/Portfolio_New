import { Component, ElementRef, Input, NgZone, OnDestroy, OnInit, PLATFORM_ID, afterNextRender, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { AnimationOptions, LottieTransferState, LottieComponent } from 'ngx-lottie';
import type { AnimationItem } from 'lottie-web';

/** Upper bound on how many frames per second any Lottie is drawn. Files below this keep their own rate. */
const MAX_FPS = 30;

/**
 * width / height of each animation file. The animation itself only mounts in the browser, so the
 * server-rendered HTML reserves a box of the final size from these ratios -- otherwise the page
 * would shift when the animations appear (that was most of our mobile CLS).
 */
const ASPECT_RATIO: Record<string, number> = {
    'about-me': 1.0,
    'about-nav': 1.0,
    bangladesh: 1.25,
    contact: 1.0,
    'download-resume': 1.7778,
    email: 1.0,
    experience: 1.4286,
    hello: 1.0,
    location: 1.0,
    'profile-nav': 1.0,
    projects: 1.0,
    punch: 1.0,
    'right-arrow': 1.0,
    sent: 1.0,
    'skills-nav': 0.97,
    strength: 1.0,
    'thumbs-up': 1.0,
};

@Component({
    selector: 'app-lottie',
    templateUrl: './lottie.component.html',
    styleUrls: ['./lottie.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [LottieComponent],
})
export class LottieNativeComponent implements OnInit, OnDestroy {
    private lottieTransferState = inject(LottieTransferState);
    private readonly platformId = inject(PLATFORM_ID);
    private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
    private readonly zone = inject(NgZone);

    @Input() fileName: string;
    /** Height in px. */
    @Input() height: string;
    /** Width in px; when omitted it follows the animation's aspect ratio. */
    @Input() width: string;

    /**
     * Set on the first time the box comes near the viewport; ng-lottie only fetches the JSON once
     * this is non-null, so off-screen animations cost no bandwidth on the initial load.
     */
    readonly options = signal<AnimationOptions | null>(null);

    /** Final box size, known on the server too, so the layout never shifts. */
    boxWidth = 0;
    boxHeight = 0;

    isBrowser: boolean;

    private animation: AnimationItem | null = null;
    private loadObserver: IntersectionObserver | null = null;
    private playObserver: IntersectionObserver | null = null;
    private inView = true;

    private rafId: number | null = null;
    private startTime = 0;
    private lastFrame = -1;
    private lastSlot = -1;

    constructor() {
        this.isBrowser = isPlatformBrowser(this.platformId);

        afterNextRender(() => this.observeViewport());
    }

    ngOnInit(): void {
        this.boxHeight = Number(this.height);
        this.boxWidth = this.width
            ? Number(this.width)
            : Math.round(this.boxHeight * (ASPECT_RATIO[this.fileName] ?? 1));
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

    private loadAnimation(): void {
        if (!this.options()) {
            this.options.set({
                path: `/assets/animations/${this.fileName}.json`,
                // We drive playback ourselves (see startLoop) so we can cap the frame rate.
                autoplay: false,
            });
        }
    }

    /**
     * Two observers with different reach:
     * - load: fetch the JSON one full screen height before the box arrives (the site is navigated
     *   with full-screen jumps from the nav bar, so a small margin would fetch too late)
     * - play: animate only while (nearly) on screen; ~20 Lotties live on this page
     */
    private observeViewport(): void {
        if (typeof IntersectionObserver === 'undefined') {
            this.loadAnimation();
            return;
        }

        this.zone.runOutsideAngular(() => {
            this.loadObserver = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        this.loadAnimation();
                        this.loadObserver?.disconnect();
                        this.loadObserver = null;
                    }
                },
                { rootMargin: '100% 0px' }
            );

            this.playObserver = new IntersectionObserver(
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

            this.loadObserver.observe(this.host.nativeElement);
            this.playObserver.observe(this.host.nativeElement);
        });
    }

    ngOnDestroy(): void {
        this.stopLoop();
        this.loadObserver?.disconnect();
        this.playObserver?.disconnect();
    }
}

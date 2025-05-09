/*
 * Minimal Definitely‑Typed‑style declaration for the gifshot browser library
 * – covers the APIs most commonly used when integrating with React / Next.js
 *   projects (createGIF, takeSnapShot, etc.).
 *
 * Place this file somewhere under your project’s `src/` or in a dedicated
 * `types/` folder (e.g. `./types/gifshot.d.ts`) and make sure the directory is
 * picked up by `tsconfig.json` (add it to the `typeRoots` or just keep it inside
 * `src`).
 *
 * 👉 The real gifshot bundle exposes far more knobs.  Add missing properties as
 *    `key?: any;` or extend the interfaces below when you need them.
 */

/** Core options accepted by `gifshot.createGIF()` and `takeSnapShot()` */
export interface GifShotOptions {
  // ───────────────────────── I/O sources ─────────────────────────
  /** Array of image URLs or DOM images for still‑frame GIFs */
  images?: Array<string | HTMLImageElement>;
  /** HTML <video>, video URL, or Blob for video‑to‑GIF capture */
  video?: string | Blob | HTMLVideoElement;
  /** Video element you created yourself (e.g. for webcam preview) */
  webcamVideoElement?: HTMLVideoElement;

  // ───────────────────────── Canvas / sizing ─────────────────────────
  gifWidth?: number;
  gifHeight?: number;
  /** # frames to grab (default 10) */
  numFrames?: number;
  /** Delay between frame grabs (seconds) */
  interval?: number;
  /** How many workers to spawn for quantization */
  numWorkers?: number;

  // ───────────────────────── Webcam streaming ─────────────────────────
  cameraStream?: MediaStream;
  /** Keep user camera open after capture finishes */
  keepCameraOn?: boolean;

  // ───────────────────────── Text overlay & styling ─────────────────────────
  text?: string;
  fontFamily?: string;
  fontWeight?: string;
  fontSize?: string;
  minFontSize?: string;
  resizeFont?: boolean;
  fontColor?: string;
  textAlign?: CanvasTextAlign;
  textBaseline?: CanvasTextBaseline;
  textXCoordinate?: number;
  textYCoordinate?: number;

  // ───────────────────────── Advanced / misc ─────────────────────────
  sampleInterval?: number;
  frameDuration?: number;
  filter?: string;
  crossOrigin?: "anonymous" | "use‑credentials" | string;
  progressCallback?: (progress: number) => void;
  completeCallback?: (result: GifShotResult) => void;
  /** Save per‑frame ImageData objects in the result */
  saveRenderingContexts?: boolean;
  savedRenderingContexts?: ImageData[];

  /** Allow any extra gifshot knobs without TS screaming */
  [key: string]: any;
}

export interface GifShotResult {
  error: boolean;
  errorCode: string;
  errorMsg: string;
  /** data: URI (Base64) for the generated GIF */
  image?: string;
  cameraStream?: MediaStream;
  videoElement?: HTMLVideoElement;
  webcamVideoElement?: HTMLVideoElement;
  savedRenderingContexts?: ImageData[];
}

/** Core procedural API (gifshot is a UMD global) */
export function createGIF(options: GifShotOptions, cb: (result: GifShotResult) => void): void;
export function createGIF(cb: (result: GifShotResult) => void): void;
export function takeSnapShot(options: GifShotOptions, cb: (result: GifShotResult) => void): void;
export function takeSnapShot(cb: (result: GifShotResult) => void): void;
export function stopVideoStreaming(opts?: {
  keepCameraOn?: boolean;
  cameraStream?: MediaStream;
  videoElement?: HTMLVideoElement;
  webcamVideoElement?: HTMLVideoElement;
}): void;
export function isSupported(): boolean;
export function isWebCamGIFSupported(): boolean;
export function isExistingVideoGIFSupported(codecs?: string | string[]): boolean;
export function isExistingImagesGIFSupported(): boolean;

export const utils: any;
export const defaultOptions: GifShotOptions;
export const VERSION: string;

/**
 * Default export – gifshot’s global object with all the above members attached.
 * You can `import gifshot from 'gifshot'` or `import * as gifshot from 'gifshot'`.
 */
declare const gifshot: typeof import("gifshot");
export default gifshot;

"use client";

import { useEffect, useRef } from "react";

type ChibiDeveloperAvatarProps = {
  size?: "default" | "large";
};

type PointerState = {
  active: boolean;
  dragged: boolean;
  pointerId: number | null;
  startX: number;
  startY: number;
};

type DeviceOrientationEventConstructorWithPermission = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<PermissionState>;
};

type Live2DModelInstance = {
  anchor?: {
    set: (x: number, y?: number) => void;
  };
  destroy: (options?: { baseTexture?: boolean; children?: boolean; texture?: boolean }) => void;
  focus: (x: number, y: number, instant?: boolean) => void;
  height: number;
  motion: (group: string, index?: number) => Promise<boolean>;
  scale: {
    set: (value: number) => void;
  };
  width: number;
  x: number;
  y: number;
};

const CUBISM_CORE_SRC = "/vendor/live2d/live2dcubismcore.min.js";
const WANKO_MODEL_SRC = "/wanko/runtime/wanko_touch.model3.json";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const loadScriptOnce = (src: string) =>
  new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
    if (existing?.dataset.loaded === "true") {
      resolve();
      return;
    }

    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error(`Failed to load ${src}`)), {
        once: true,
      });
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => {
      script.dataset.loaded = "true";
      resolve();
    };
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });

export default function ChibiDeveloperAvatar({
  size = "default",
}: ChibiDeveloperAvatarProps) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const targetLookRef = useRef({ x: 0, y: 0 });
  const currentLookRef = useRef({ x: 0, y: 0 });
  const modelRef = useRef<Live2DModelInstance | null>(null);
  const pointerRef = useRef<PointerState>({
    active: false,
    dragged: false,
    pointerId: null,
    startX: 0,
    startY: 0,
  });

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) {
      return;
    }

    let app: import("pixi.js").Application | null = null;
    let frameId = 0;
    let tapCount = 0;
    let disposed = false;
    let motionPermissionRequested = false;
    let resizeObserver: ResizeObserver | null = null;
    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const prefersTiltControls =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(hover: none), (pointer: coarse)").matches;

    const updateTarget = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height * 0.42;

      targetLookRef.current.x = clamp((event.clientX - centerX) / (rect.width * 0.5), -1, 1);
      targetLookRef.current.y = clamp((event.clientY - centerY) / (rect.height * 0.55), -1, 1);
    };

    const updateTargetFromOrientation = (event: DeviceOrientationEvent) => {
      if (!prefersTiltControls || pointerRef.current.active) {
        return;
      }

      const gamma = typeof event.gamma === "number" ? event.gamma : 0;
      const beta = typeof event.beta === "number" ? event.beta : 45;
      const lookX = clamp(gamma / 24, -1, 1);
      const lookY = clamp((beta - 45) / 34, -1, 1);

      targetLookRef.current.x = lookX;
      targetLookRef.current.y = lookY;
      stage.dataset.motionInput = "device-tilt";
    };

    const requestOrientationPermission = async () => {
      if (!prefersTiltControls || motionPermissionRequested) {
        return;
      }

      motionPermissionRequested = true;
      const orientationEvent = window
        .DeviceOrientationEvent as DeviceOrientationEventConstructorWithPermission | undefined;

      if (typeof orientationEvent?.requestPermission !== "function") {
        return;
      }

      try {
        stage.dataset.motionPermission = await orientationEvent.requestPermission();
      } catch {
        stage.dataset.motionPermission = "denied";
      }

      if (stage.dataset.motionPermission !== "granted") {
        targetLookRef.current.x = 0;
        targetLookRef.current.y = 0;
      }
    };

    const fitModel = () => {
      if (!app || !modelRef.current) {
        return;
      }

      const model = modelRef.current;
      const width = Math.max(1, stage.clientWidth);
      const height = Math.max(1, stage.clientHeight);
      app.renderer.resize(width, height);

      model.scale.set(1);
      model.anchor?.set(0.5, 0.5);
      const scale =
        Math.min((width * 0.92) / model.width, (height * 0.94) / model.height) * 2.05;
      model.scale.set(scale);
      model.x = width * 0.5;
      model.y = height * 0.43;
    };

    const playTapMotion = () => {
      const model = modelRef.current;
      if (!model) {
        return;
      }

      tapCount += 1;
      stage.dataset.spinCount = String(tapCount);
      void model.motion("Tap").catch(() => model.motion("Flick"));
    };

    const handlePointerDown = (event: PointerEvent) => {
      void requestOrientationPermission();
      pointerRef.current = {
        active: true,
        dragged: false,
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
      };
      stage.classList.add("is-dragging");
      stage.setPointerCapture(event.pointerId);
      updateTarget(event);
    };

    const handlePointerMove = (event: PointerEvent) => {
      updateTarget(event);
      const pointer = pointerRef.current;
      if (!pointer.active || pointer.pointerId !== event.pointerId) {
        return;
      }

      const deltaX = event.clientX - pointer.startX;
      const deltaY = event.clientY - pointer.startY;
      if (Math.abs(deltaX) + Math.abs(deltaY) > 6) {
        pointer.dragged = true;
      }
    };

    const handlePointerUp = (event: PointerEvent) => {
      const pointer = pointerRef.current;
      if (pointer.pointerId !== event.pointerId) {
        return;
      }

      if (!pointer.dragged) {
        playTapMotion();
      }

      pointer.active = false;
      pointer.pointerId = null;
      stage.classList.remove("is-dragging");
      if (stage.hasPointerCapture(event.pointerId)) {
        stage.releasePointerCapture(event.pointerId);
      }
    };

    const handlePointerCancel = (event: PointerEvent) => {
      pointerRef.current.active = false;
      pointerRef.current.pointerId = null;
      stage.classList.remove("is-dragging");
      if (stage.hasPointerCapture(event.pointerId)) {
        stage.releasePointerCapture(event.pointerId);
      }
    };

    const animateFocus = () => {
      const current = currentLookRef.current;
      const target = targetLookRef.current;
      current.x += (target.x - current.x) * 0.16;
      current.y += (target.y - current.y) * 0.16;

      const model = modelRef.current;
      if (model && app) {
        const focusX = app.renderer.width * (0.5 + current.x * 0.46);
        const focusY = app.renderer.height * (0.42 + current.y * 0.32);
        model.focus(focusX, focusY);
      }

      stage.dataset.lookX = current.x.toFixed(4);
      stage.dataset.lookY = current.y.toFixed(4);

      if (!prefersReducedMotion) {
        stage.style.setProperty("--tilt-x", `${(-current.y * 7).toFixed(2)}deg`);
        stage.style.setProperty("--tilt-y", `${(current.x * 9).toFixed(2)}deg`);
        stage.style.setProperty("--stage-shift-x", `${(current.x * 7).toFixed(2)}px`);
        stage.style.setProperty("--stage-shift-y", `${(current.y * 5).toFixed(2)}px`);
        stage.style.setProperty("--bg-shift-x", `${(-current.x * 9).toFixed(2)}px`);
        stage.style.setProperty("--bg-shift-y", `${(-current.y * 5).toFixed(2)}px`);
      }

      frameId = window.requestAnimationFrame(animateFocus);
    };

    const initLive2D = async () => {
      try {
        stage.dataset.live2dStatus = "loading";
        await loadScriptOnce(CUBISM_CORE_SRC);

        const PIXI = await import("pixi.js");
        (window as typeof window & { PIXI?: typeof PIXI }).PIXI = PIXI;

        const { Live2DModel } = await import("pixi-live2d-display/cubism4");
        Live2DModel.registerTicker(PIXI.Ticker);

        if (disposed) {
          return;
        }

        app = new PIXI.Application({
          antialias: true,
          autoStart: true,
          backgroundAlpha: 0,
          resolution: Math.min(window.devicePixelRatio || 1, 2),
          view: canvas,
        });

        const model = (await Live2DModel.from(WANKO_MODEL_SRC, {
          autoInteract: false,
        })) as Live2DModelInstance;

        if (disposed) {
          model.destroy({ baseTexture: true, children: true, texture: true });
          return;
        }

        modelRef.current = model;
        app.stage.addChild(model as never);
        fitModel();
        resizeObserver = new ResizeObserver(fitModel);
        resizeObserver.observe(stage);
        stage.dataset.live2dStatus = "ready";
        void model.motion("Idle");
      } catch (error) {
        console.error(error);
        stage.dataset.live2dStatus = "error";
      }
    };

    window.addEventListener("pointermove", updateTarget, { passive: true });
    if (prefersTiltControls) {
      window.addEventListener("pointerdown", requestOrientationPermission, {
        once: true,
        passive: true,
      });
    }
    if (prefersTiltControls && "DeviceOrientationEvent" in window) {
      window.addEventListener("deviceorientation", updateTargetFromOrientation, { passive: true });
    }
    stage.addEventListener("pointerdown", handlePointerDown);
    stage.addEventListener("pointermove", handlePointerMove);
    stage.addEventListener("pointerup", handlePointerUp);
    stage.addEventListener("pointercancel", handlePointerCancel);
    stage.addEventListener("lostpointercapture", handlePointerCancel);
    animateFocus();
    void initLive2D();

    return () => {
      disposed = true;
      window.removeEventListener("pointermove", updateTarget);
      window.removeEventListener("pointerdown", requestOrientationPermission);
      window.removeEventListener("deviceorientation", updateTargetFromOrientation);
      stage.removeEventListener("pointerdown", handlePointerDown);
      stage.removeEventListener("pointermove", handlePointerMove);
      stage.removeEventListener("pointerup", handlePointerUp);
      stage.removeEventListener("pointercancel", handlePointerCancel);
      stage.removeEventListener("lostpointercapture", handlePointerCancel);
      window.cancelAnimationFrame(frameId);
      resizeObserver?.disconnect();
      modelRef.current?.destroy({ baseTexture: true, children: true, texture: true });
      modelRef.current = null;
      app?.destroy(true);
    };
  }, []);

  return (
    <div
      ref={stageRef}
      className={`chibi-avatar-stage chibi-avatar-reference chibi-avatar-live2d-mode ${
        size === "large" ? "chibi-avatar-large" : ""
      }`}
      role="img"
      aria-label="Interactive Live2D wanko avatar"
      data-live2d-status="idle"
      data-spin-count="0"
      data-look-x="0"
      data-look-y="0"
    >
      <canvas ref={canvasRef} className="live2d-canvas" />
      <div className="live2d-loading" aria-hidden="true">
        Loading Live2D
      </div>
    </div>
  );
}

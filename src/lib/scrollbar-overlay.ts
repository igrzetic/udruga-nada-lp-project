/**
 * Overlay scrollbar (kao Porton main.tsx): nativni track sakriven,
 * ružičasta ručka (CSS), auto-hide dok nema scrolla / nakon pauze.
 */
export function registerScrollbarOverlay(): () => void {
  if (typeof window === "undefined") return () => {};

  const root = document.documentElement;
  const body = document.body;
  let timeoutId: number | undefined;
  const HIDE_DELAY_MS = 450;
  const MIN_HANDLE_HEIGHT = 28;

  const handle = document.createElement("div");
  handle.className = "scroll-overlay-handle";
  body.appendChild(handle);
  let isDragging = false;
  let dragOffsetY = 0;
  let activePointerId: number | null = null;

  const clamp = (v: number, min: number, max: number) =>
    Math.min(max, Math.max(min, v));

  const updateHandleMetrics = () => {
    const scroller = document.scrollingElement ?? root;
    const scrollHeight = scroller.scrollHeight;
    const clientHeight = scroller.clientHeight;
    const maxScroll = Math.max(scrollHeight - clientHeight, 0);

    if (maxScroll <= 0) {
      handle.style.display = "none";
      return;
    }
    handle.style.display = "block";

    const ratio = clientHeight / scrollHeight;
    const handleHeight = Math.max(
      MIN_HANDLE_HEIGHT,
      Math.round(clientHeight * ratio),
    );
    const topRatio = maxScroll > 0 ? scroller.scrollTop / maxScroll : 0;
    const maxTop = clientHeight - handleHeight - 4;
    const top = clamp(Math.round(topRatio * maxTop), 2, Math.max(2, maxTop));

    handle.style.height = `${handleHeight}px`;
    handle.style.transform = `translate3d(0, ${top}px, 0)`;
  };

  const onScroll = () => {
    updateHandleMetrics();
    root.classList.add("is-scrolling");
    if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      if (!isDragging) root.classList.remove("is-scrolling");
    }, HIDE_DELAY_MS);
  };

  const scrollFromPointer = (clientY: number) => {
    const scroller = document.scrollingElement ?? root;
    const maxScroll = Math.max(
      scroller.scrollHeight - scroller.clientHeight,
      0,
    );
    const handleHeight = handle.offsetHeight || MIN_HANDLE_HEIGHT;
    const maxTop = scroller.clientHeight - handleHeight - 4;
    if (maxTop <= 0 || maxScroll <= 0) return;
    const desiredTop = clamp(clientY - dragOffsetY, 2, Math.max(2, maxTop));
    const ratio = desiredTop / maxTop;
    scroller.scrollTop = ratio * maxScroll;
    handle.style.transform = `translate3d(0, ${desiredTop}px, 0)`;
  };

  const stopDragging = () => {
    if (!isDragging) return;
    isDragging = false;
    activePointerId = null;
    handle.classList.remove("is-dragging");
    root.classList.remove("scrollbar-dragging");
    body.style.userSelect = "";
    body.style.cursor = "";
    if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      root.classList.remove("is-scrolling");
    }, HIDE_DELAY_MS);
  };

  const startDragging = (clientY: number) => {
    const rect = handle.getBoundingClientRect();
    isDragging = true;
    dragOffsetY = clientY - rect.top;
    root.classList.add("is-scrolling");
    root.classList.add("scrollbar-dragging");
    handle.classList.add("is-dragging");
    body.style.userSelect = "none";
    body.style.cursor = "grabbing";
  };

  const onPointerDown = (ev: PointerEvent) => {
    ev.preventDefault();
    activePointerId = ev.pointerId;
    handle.setPointerCapture(ev.pointerId);
    startDragging(ev.clientY);
  };

  const onPointerMove = (ev: PointerEvent) => {
    if (!isDragging) return;
    if (activePointerId !== null && ev.pointerId !== activePointerId) return;
    scrollFromPointer(ev.clientY);
  };

  const onPointerUpOrCancel = (ev: PointerEvent) => {
    if (activePointerId !== null && ev.pointerId !== activePointerId) return;
    if (activePointerId !== null && handle.hasPointerCapture(activePointerId)) {
      handle.releasePointerCapture(activePointerId);
    }
    stopDragging();
  };

  handle.addEventListener("pointerdown", onPointerDown);
  handle.addEventListener("pointermove", onPointerMove);
  handle.addEventListener("pointerup", onPointerUpOrCancel);
  handle.addEventListener("pointercancel", onPointerUpOrCancel);

  updateHandleMetrics();
  requestAnimationFrame(updateHandleMetrics);
  window.addEventListener("scroll", onScroll, { passive: true, capture: true });
  window.addEventListener("wheel", onScroll, { passive: true });
  window.addEventListener("touchmove", onScroll, { passive: true });
  window.addEventListener("resize", updateHandleMetrics, { passive: true });

  return () => {
    if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    window.removeEventListener("scroll", onScroll, true);
    window.removeEventListener("wheel", onScroll);
    window.removeEventListener("touchmove", onScroll);
    window.removeEventListener("resize", updateHandleMetrics);
    handle.removeEventListener("pointerdown", onPointerDown);
    handle.removeEventListener("pointermove", onPointerMove);
    handle.removeEventListener("pointerup", onPointerUpOrCancel);
    handle.removeEventListener("pointercancel", onPointerUpOrCancel);
    root.classList.remove("is-scrolling", "scrollbar-dragging");
    handle.remove();
  };
}

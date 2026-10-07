// Ref-counted scroll lock shared by every overlay (overview, menu, case study,
// lightbox). Each overlay calls lockScroll() once when it opens and the returned
// release function exactly once when it closes or unmounts, so one overlay
// closing can never unlock the page while another is still open.
let count = 0;

export function lockScroll() {
  if (typeof document === "undefined") return () => {};
  if (count++ === 0) document.documentElement.classList.add("is-locked");
  let released = false;
  return () => {
    if (released) return;
    released = true;
    if (--count <= 0) {
      count = 0;
      document.documentElement.classList.remove("is-locked");
    }
  };
}

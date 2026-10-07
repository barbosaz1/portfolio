// Keeps Tab focus cycling inside an open dialog.
export function trapTab(e: KeyboardEvent, scope: HTMLElement | null, lead?: HTMLElement | null) {
  if (e.key !== "Tab" || !scope) return;
  const focusables = Array.from(
    scope.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
  ).filter((el) => el.getClientRects().length > 0);
  if (lead) focusables.unshift(lead);
  if (focusables.length === 0) return;

  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  } else if (!scope.contains(document.activeElement) && document.activeElement !== lead) {
    e.preventDefault();
    first.focus();
  }
}

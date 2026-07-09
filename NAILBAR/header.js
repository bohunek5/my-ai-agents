document.querySelectorAll(".mobile-menu-toggle").forEach(button => {
  const targetId = button.getAttribute("aria-controls");
  const target = targetId ? document.getElementById(targetId) : null;
  if (!target) return;

  function setOpen(open) {
    button.setAttribute("aria-expanded", open ? "true" : "false");
    target.classList.toggle("open", open);
  }

  button.addEventListener("click", () => {
    setOpen(button.getAttribute("aria-expanded") !== "true");
  });

  target.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") setOpen(false);
  });
});

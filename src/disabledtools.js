document.addEventListener('contextmenu', (event) => event.preventDefault());
document.addEventListener('keydown', (event) => {
  // Prevent F12
  //   if (event.keyCode === 123) {
  //     event.preventDefault();
  //   }
  // Prevent Ctrl+Shift+I
  if (event.ctrlKey && event.shiftKey && event.keyCode === 73) {
    event.preventDefault();
  }
  // Prevent Ctrl+Shift+J
  if (event.ctrlKey && event.shiftKey && event.keyCode === 74) {
    event.preventDefault();
  }
  // Prevent Ctrl+U
  if (event.ctrlKey && event.keyCode === 85) {
    event.preventDefault();
  }
  // Prevent Ctrl+Shift+C
  if (event.ctrlKey && event.shiftKey && event.keyCode === 67) {
    event.preventDefault();
  }
});

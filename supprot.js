document.addEventListener("keydown", (event) => {
    if (!gridApi) return;
  
    // Detect which platform we're on (Windows vs. Mac)
    const isMac = navigator.platform.indexOf('Mac') > -1;
    const isCtrl = isMac ? event.metaKey : event.ctrlKey;
  
    // Cmd/Ctrl + Shift + C for Clear Pinned
    if (isCtrl && event.shiftKey && event.key.toLowerCase() === 'c') {
      event.preventDefault(); // Prevent default browser action
      clearPinned();
      console.log("Clear Pinned triggered!");
    }
  
    // Cmd/Ctrl + E for Pin Country
    if (isCtrl && !event.shiftKey && event.key.toLowerCase() === 'e') {
      event.preventDefault();
      pinCountry();
      console.log("Pin Country triggered!");
    }
  
    // Cmd/Ctrl + Shift + E for Reset Pinned
    if (isCtrl && event.shiftKey && event.key.toLowerCase() === 'e') {
      event.preventDefault();
      resetPinned();
      console.log("Reset Pinned triggered!");
    }
  });
  
const modal = {
  show(message, onConfirm) {
    document.getElementById("modal-message").textContent = message;
    document.getElementById("modal-overlay").classList.remove("hidden");

    const confirmBtn = document.getElementById("modal-confirm");
    const cancelBtn  = document.getElementById("modal-cancel");

    const newConfirm = confirmBtn.cloneNode(true);
    const newCancel  = cancelBtn.cloneNode(true);
    confirmBtn.replaceWith(newConfirm);
    cancelBtn.replaceWith(newCancel);

    document.getElementById("modal-confirm").addEventListener("click", async () => {
      await onConfirm();
      this.hide();
    });
    document.getElementById("modal-cancel").addEventListener("click", () => this.hide()); 
    document.getElementById("modal-overlay").addEventListener("click", e => { 
      if (e.target === document.getElementById("modal-overlay")) this.hide();
    });
  },

  hide() {
    document.getElementById("modal-overlay").classList.add("hidden");
  }
};
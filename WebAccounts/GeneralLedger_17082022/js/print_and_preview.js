const pageOpenEl = document.getElementById("transaction-linked-updates-select");
const pageOpenButtonEl = document.getElementById(
  "transaction-view-linked-updates-button"
);

pageOpenButtonEl.addEventListener("click", () => {
  if (pageOpenEl.value == "Sub-ledger Updates") {
    window.open("./sub_ledger_updates.aspx", "none");
  } else {
    window.open("./tax_updates.aspx", "none");
  }
});

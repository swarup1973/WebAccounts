// elements
const viewUpdatesSelectDropdown = document.getElementById(
  "transaction-linked-updates-select"
);
const viewUpdatesButton = document.getElementById(
  "transaction-view-linked-updates-button"
);

// functions
const openUpdate = () => {
  if (viewUpdatesSelectDropdown.value == "Sub-ledger Updates") {
    window.open("sub_ledger_updates.aspx");
  } else if (viewUpdatesSelectDropdown.value == "Tax Updates") {
    window.open("tax_updates.aspx");
  }
};

// event listeners
viewUpdatesButton.addEventListener("click", openUpdate);

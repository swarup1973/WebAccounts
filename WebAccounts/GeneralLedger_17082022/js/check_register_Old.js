const checkRegisterNavSelectEl = document.getElementById(
  "check_register_navbar_select"
);
const checkRegisterSearchInputEl = document.getElementById(
  "check_register_navbar_search_input"
);
checkRegisterNavSelectEl.addEventListener("change", () => {
  if (checkRegisterNavSelectEl.value == "Check No.") {
    checkRegisterSearchInputEl.readOnly = false;
  } else {
    checkRegisterSearchInputEl.readOnly = true;
  }
});

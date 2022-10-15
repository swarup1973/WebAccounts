// expand functionality
const toggleAddtlOptionsBtn = document.querySelector("#toggle-coa-addtl-setup-button");
const setupLower = document.querySelector("#coa-setup-lower");
const expandableBtnArrowIcon = document.querySelector(".expandable-addtl-options-btn");

toggleAddtlOptionsBtn.addEventListener("click", (e) => {
    setupLower.classList.toggle("hidden");
    if (expandableBtnArrowIcon.classList.contains("fa-plus")) {
        expandableBtnArrowIcon.classList.toggle("fa-plus");
        expandableBtnArrowIcon.classList.toggle("fa-minus");
    } else {
        expandableBtnArrowIcon.classList.toggle("fa-minus");
        expandableBtnArrowIcon.classList.toggle("fa-plus");
    }
})
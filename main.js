const SELECTED = "selected";
const SELECTEDDIV = "selecteddiv";

const LETTERCONTENT = ".letterContent";
const OPT = ".opt";

// Store the original content of the letterContent div
var originalContent = document.querySelectorAll(LETTERCONTENT);
for (let i = 0; i < originalContent.length; i++) {
  originalContent[i].setAttribute("data-axis", i);
}

originalContent = Array.from(originalContent).map((e) => e.innerHTML);

document.querySelectorAll(OPT).forEach((opt, index) => {
  opt.onclick = () => {
    document.querySelectorAll(OPT).forEach((opt2) => {
      opt2.classList.remove(SELECTED);
    });
    opt.classList.add(SELECTED);

    const prevSelected = document.querySelector(`.${SELECTEDDIV}`);
    prevSelected?.classList.remove(SELECTEDDIV);
    prevSelected?.setAttribute("hidden", true);

    const currSelected = document.querySelectorAll(LETTERCONTENT)[index];
    currSelected.classList.add(SELECTEDDIV);
    currSelected?.removeAttribute("hidden");
  };
});

function repCompany(event) {
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
  if (companyName.value == "") {
    alert("Company Name must be filled out");
    return false;
  }
  document
    .querySelectorAll("." + SELECTEDDIV + " .companyNameSpan")
    .forEach((e) => (e.innerHTML = companyName.value));
    
  if (companyName.value.charAt(companyName.value.length - 1) === "s"){
    document.querySelectorAll("." + SELECTEDDIV + " .apostrophe").forEach((e) => (e.innerHTML = companyName.value + "’"));
  }
  else document.querySelectorAll("." + SELECTEDDIV + " .apostrophe").forEach((e) => (e.innerHTML = companyName.value + "’s"));
}

function repJob(event) {
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
  if (jobType.value == "") {
    alert("Job Type must be filled out");
    return false;
  }
  document
    .querySelectorAll("." + SELECTEDDIV + " .jobTypeSpan")
    .forEach((e) => (e.innerHTML = jobType.value));
}

function resetContent(event) {
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
  // Restore the original content
  const curr = document.querySelector(`.${SELECTEDDIV}`);
  if (!curr) return;

  curr.innerHTML = originalContent[+curr.dataset.axis];
}

function savePDF() {
  let wantToPrint = document.querySelector(`.${SELECTEDDIV}`).cloneNode(true);
  let newIframe = document.createElement("iframe");

  newIframe.addEventListener("load", () => {
      
      newIframe.contentDocument.body.append(wantToPrint);
      newIframe.contentWindow.onafterprint = () => {
        document.body.removeChild(newIframe);
      };

      const css = document.createElement("link");
      css.rel = "stylesheet";
      css.href = "./style.css";
      newIframe.contentDocument.head.appendChild(css);
      css.onload = () => {
        newIframe.contentWindow.print();
      }
    
  });

  document.body.appendChild(newIframe);

}


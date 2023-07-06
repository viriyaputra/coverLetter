const SELECTED = "selected";
const SELECTEDDIV = "selecteddiv";

const LETTERCONTENT = ".letterContent";
const OPT = ".opt";

// Store the original content of the letterContent div
var originalContent = document.querySelectorAll(LETTERCONTENT);
for (let i = 0; i < originalContent.length; i ++ ) {
  originalContent[i].setAttribute('data-axis', i);
}

originalContent = Array.from(originalContent).map(e => e.innerHTML);

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
  } else
    document.querySelector(`.${SELECTEDDIV}`).innerHTML = document
      .querySelector(`.${SELECTEDDIV}`)
      .innerHTML.replace(/%COMPANY%/g, companyName.value);
}

function repJob(event) {
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
  if (jobType.value == "") {
    alert("Job Type must be filled out");
    return false;
  } else
    document.querySelector(`.${SELECTEDDIV}`).innerHTML = document
      .querySelector(`.${SELECTEDDIV}`)
      .innerHTML.replace(/Data Scientist/g, jobType.value);
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
  let head = document.head.cloneNode(true);
  let wantToPrint = document.querySelector(`.${SELECTEDDIV}`).cloneNode(true);
  let newIframe = document.createElement("iframe");

  const style = document.createElement("style");
  style.appendChild(document.createTextNode(""));

  newIframe.onload = () => {
    newIframe.contentDocument.head.append(head.textContent);
    // newIframe.contentDocument.head.append(style);
    // style.sheet.insertRule("@Page { margin: 0; }", 0);

    newIframe.contentDocument.body.append(wantToPrint);
    newIframe.contentDocument.body.append(style);
    style.sheet.insertRule("body{text-align: justify;}", 0);

    newIframe.contentWindow.print();
    newIframe.contentWindow.onafterprint = () => {
      document.body.removeChild(newIframe);
    };
  };

  document.body.append(newIframe);
}

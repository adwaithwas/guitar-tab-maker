const fretboard = document.getElementById("fretboard");

let tabState = [];
let currentStep = 0;
tabState[currentStep] = [];

const STRINGS = 6;
const FRETS = 12;

for(let string = 1; string<=STRINGS; string++){
    for(let fret = 0; fret<=FRETS; fret++){
        const fretEl = document.createElement("div");
        fretEl.classList.add("fret");

        fretEl.dataset.string = string;
        fretEl.dataset.fret = fret;

        fretboard.appendChild(fretEl);

    }
}
fretboard.addEventListener("click", (e) => {
    if (!e.target.classList.contains("fret")) {
        return;
    }
    const string = Number(e.target.dataset.string);
    const fret = Number(e.target.dataset.fret);

    e.target.classList.add("active");

    const note = {string, fret};
    
    tabState[currentStep].push(note);

    renderTabLog();
})

const tabLog = document.getElementById("tab-log");
function renderTabLog(){
    tabLog.innerHTML = "";

    tabState.forEach((step, stepIndex) => {
        const stepLi = document.createElement("li");
        stepLi.innerText = `Step ${stepIndex+1}`;

        const ul = document.createElement("ul");
        step.forEach(note => {
            const li = document.createElement("li");
            li.innerText = `String ${note.string}, Fret ${note.fret}`;
            ul.appendChild(li);
        });
        stepLi.appendChild(ul);
        tabLog.appendChild(stepLi);
    });
}

const nextStepBtn = document.getElementById("next-step");
nextStepBtn.addEventListener("click", (e) =>{
    currentStep++;
    if(!tabState[currentStep]){
        tabState[currentStep] = []
    }
    // console.log("lore23");
    clearActiveFrets();
    renderTabLog();
})

function clearActiveFrets(){
    // alert("cleared");
    document.querySelectorAll(".fret.active").forEach(fret => fret.classList.remove("active"));
}
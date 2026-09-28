const dateField = document.getElementById("wat-date");

const today = new Date().toISOString().split("T")[0];

dateField.min = today;
dateField.value = today;


const nextButton = document.getElementById('wat-nextBtn'); 
const prevButton = document.getElementById('wat-prevBtn'); 


nextButton.addEventListener('click', (e) => {
    e.preventDefault(); 
    let currentActiveSection = document.querySelector('.form-section.active-section');
    let nextSection = currentActiveSection.nextElementSibling; 
    let prevSection = currentActiveSection.previousElementSibling; 

    if(nextSection.classList.contains('form-section')) {
        currentActiveSection.classList.remove('active-section'); 
        nextSection.classList.add('active-section'); 
        let newActiveSection = document.querySelector('.form-section.active-section');
        if(!newActiveSection.nextElementSibling.classList.contains('form-section')) {
            // nextButton.classList.add('disabled'); 
        }
        if(newActiveSection.previousElementSibling.classList.contains('form-section')) {
            // prevButton.classList.remove('disabled'); 
        }
    }
    console.log('next'); 
}); 

prevButton.addEventListener('click', (e) => {
    e.preventDefault(); 
    let currentActiveSection = document.querySelector('.form-section.active-section');
    let nextSection = currentActiveSection.previousElementSibling; 

    if(nextSection.classList.contains('form-section')) {
        currentActiveSection.classList.remove('active-section'); 
        nextSection.classList.add('active-section'); 
        let newActiveSection = document.querySelector('.form-section.active-section');
         if(newActiveSection.nextElementSibling.classList.contains('form-section')) {
            // nextButton.classList.remove('disabled'); 
        }
        if(!newActiveSection.previousElementSibling.classList.contains('form-section')) {
            // prevButton.classList.add('disabled'); 
        }
    }
    console.log('next'); 
}); 

const radioButtons = document.querySelectorAll('input[type="radio"]');

radioButtons.forEach(radio => {
  radio.addEventListener('change', (event) => {
    let pressureDisclaimerText = document.querySelector('.material-disclaimer-text'); 
    let decisionTextAlert = document.querySelector('.decision-text-alert'); 
    let conditionFormField = document.querySelector('#conditions-ff'); 
    let whatProofFormField = document.querySelector('#what-proof-ff'); 
    let whoProofFormField = document.querySelector('#who-proof-ff'); 
    let whenProofFormField = document.querySelector('#when-proof-ff'); 
    let watDecisionQ =  document.querySelector('#decision-ff .field-label'); 

    // event.target refers to the radio button element that was just selected
    if (event.target.checked && event.target.value === 'material' && event.target.name === 'momentum') {
        pressureDisclaimerText.style.display = "block"; 
    } else if(event.target.checked && event.target.value !== 'material' && event.target.name === 'momentum') {
        pressureDisclaimerText.style.display = "none"; 
    }

     // event.target refers to the radio button element that was just selected
    if (event.target.checked && event.target.value === 'continue') {
        console.log('continue'); 
        
        let inadequateEvidence = document.querySelector('input[value="inadequate"]'); 
        let consequenceNotUnderstood = document.querySelector('input[value="not-understood"]'); 
        let lowReversibility =  document.querySelector('input[name="undoability"][value="low"]');
        let materialMomentum =  document.querySelector('input[name="momentum"][value="material"]');

        console.log(inadequateEvidence); 
        console.log(inadequateEvidence.checked); 

        conditionFormField.style.display = 'block'; 

        if(inadequateEvidence.checked) {
            decisionTextAlert.innerHTML += 'You have said the evidence is inadequate.'; 
        }

        if(consequenceNotUnderstood.checked) {
            decisionTextAlert.innerHTML += '<br>You have said the consequence is not understood.'; 
        }

         if(lowReversibility.checked) {
            decisionTextAlert.innerHTML += '<br>You have said this step will be difficult to undo.'; 
        }

        if(materialMomentum.checked) {
            decisionTextAlert.innerHTML += '<br>You have said prior effort or pressure is materially influencing the decision. Past effort does not create future merit.'; 
        }
        decisionTextAlert.style.display = "block"; 
        watDecisionQ.innerHTML = 'Why is taking the next step justified despite the concerns listed above? Address each one in your answer.'
        
    } else {
        decisionTextAlert.style.display = "none"; 
        conditionFormField.style.display = 'none'; 
        watDecisionQ.innerHTML = 'Why is this the right decision now?'

    }

    if (event.target.checked && event.target.value === 'require-proof') {
        whatProofFormField.style.display = "block"; 
        whoProofFormField.style.display = "block"; 
        whenProofFormField.style.display = "block"; 
    } else {
        whatProofFormField.style.display = "none"; 
        whoProofFormField.style.display = "none"; 
        whenProofFormField.style.display = "none"; 
    }
  });
});

// Table Rows
const recordidAndDecision = document.querySelector('#record-identification'); 
const recordConcern = document.querySelector('#record-concern'); 
const recordEvidence = document.querySelector('#record-evidence'); 
const recordConsequence = document.querySelector('#record-consequence'); 
const recordFourChecks = document.querySelector('#record-four-checks'); 
const recordDecisionBasis = document.querySelector('#record-decision-basis'); 
const recordConditionsBasis = document.querySelector('#record-conditions-proof'); 


// Decision Record and ID
const dealReference = document.querySelector('#wat-dealReference'); 
const dealOwner = document.querySelector('#wat-name'); 
const dealDate = document.querySelector('#wat-date'); 
const decision = document.querySelectorAll('input[name="decision"]');

// Concern and Commitment
const concern = document.querySelector('#wat-concern'); 
const commitment = document.querySelector('#wat-commit'); 

// Evidence 
const supportingFacts = document.querySelector('#wat-supporting-facts'); 
const opposingFacts = document.querySelector('#wat-opposing-facts'); 
const missingFacts = document.querySelector('#wat-missing-facts'); 

// Consequence
const consequence = document.querySelector('#wat-consequence'); 

// Four Checks
const evidenceSufficiency = document.querySelectorAll('input[name="evidenceEnough"]');
const consequenceClarity = document.querySelectorAll('input[name="wrongConsequence"]');
const reversibilityAndMomentum = document.querySelectorAll('input[name="undoability"]');
const sunkCostPressure = document.querySelectorAll('input[name="momentum"]');

// Decision Basis
const decisionBasis = document.querySelector('#wat-decision');

// Condition or Proofs
const actionNeeded = document.querySelector('#wat-proof'); 
const whoObtains = document.querySelector('#wat-who-obtain'); 
const whenDueDate = document.querySelector('#wat-when-obtain');

const continueConditions = document.querySelector('#wat-conditions');





function updateConditions() {

    const selectedDecision = document.querySelector('input[name="decision"]:checked');

    if (!selectedDecision) {
        return;
    }

    if (selectedDecision.value === 'continue') {
        recordConditionsBasis.parentElement.style.display = 'table-row'; 

        recordConditionsBasis.innerHTML = `
            Condition : ${continueConditions.value} <br>
        `;

    } else if (selectedDecision.value === 'stop') {
        recordConditionsBasis.parentElement.style.display = 'none'; 

        recordConditionsBasis.innerHTML = `
            NA
        `;

    } else if (selectedDecision.value === 'require-proof') {
        recordConditionsBasis.parentElement.style.display = 'table-row'; 


        recordConditionsBasis.innerHTML = `
            Action Needed : ${actionNeeded.value} <br>
            Who Obtains : ${whoObtains.value} <br>
            Due Date : ${whenDueDate.value} <br>
        `;

    }
}

function updateDecisionBasis() {
    recordDecisionBasis.innerHTML = `
        ${decisionBasis.value}
    `;
}

function updateFourChecks() {
    const selectedEvidence = document.querySelector(
        'input[name="evidenceEnough"]:checked'
    );

    const selectedConsequence = document.querySelector(
        'input[name="wrongConsequence"]:checked'
    );

    const selectedReversibilityAndMomentum = document.querySelector(
        'input[name="undoability"]:checked'
    );

    const selectedSunkCostPressure = document.querySelector(
        'input[name="momentum"]:checked'
    );

    let evidenceText = 'Not selected';
    let consequenceText = 'Not selected';
    let reversibilityText = 'Not selected';
    let sunkCostText = 'Not selected';

    if (selectedEvidence && selectedEvidence.nextElementSibling) {
        evidenceText = selectedEvidence.nextElementSibling.innerText;
    }

    if (selectedConsequence && selectedConsequence.nextElementSibling) {
        consequenceText = selectedConsequence.nextElementSibling.innerText;
    }

    if (selectedReversibilityAndMomentum && selectedReversibilityAndMomentum.nextElementSibling) {
        reversibilityText = selectedReversibilityAndMomentum.nextElementSibling.innerText;
    }

    if (selectedSunkCostPressure && selectedSunkCostPressure.nextElementSibling) {
        sunkCostText = selectedSunkCostPressure.nextElementSibling.innerText;
    }

    recordFourChecks.innerHTML = `
        Evidence Sufficiency: ${evidenceText} <br>
        Consequence Clarity: ${consequenceText} <br>
        Reversibility and Momentum: ${reversibilityText} <br>
        Sunk-Cost Pressure: ${sunkCostText}
    `;
}

function updateConsequence() {
     recordConsequence.innerHTML = `
        Consequence : ${consequence.value} <br> 
    `;
}

function updateSupportingFacts() {
     recordEvidence.innerHTML = `
        Supporting Facts : ${supportingFacts.value} <br> 
        Opposing Facts : ${opposingFacts.value} <br>
        Missing Proof : ${missingFacts.value}
    `;
}

function updateConcernAndCommitment() {
     recordConcern.innerHTML = `
        Concerns : ${concern.value} <br> 
        Commitments : ${commitment.value}
    `;
}

function updateIdentification() {

    let formattedDate = '';

    if (dealDate.value) {
        const [year, month, day] = dealDate.value.split('-');
        formattedDate = `${month}/${day}/${year}`;
    }

     const selectedDecision = document.querySelector(
        'input[name="decision"]:checked'
    );

    let decisionText = '';

    if (selectedDecision) {
        decisionText = selectedDecision.nextElementSibling.innerText;
    }

    recordidAndDecision.innerHTML = `
        ${dealReference.value} / ${dealOwner.value} / ${formattedDate} / ${decisionText}
    `;
}

const todayDate = new Date();
const year = todayDate.getFullYear();
const month = String(todayDate.getMonth() + 1).padStart(2, '0');
const day = String(todayDate.getDate()).padStart(2, '0');
dealDate.value = `${year}-${month}-${day}`;
updateIdentification();

dealReference.addEventListener('change', updateIdentification);
dealOwner.addEventListener('change', updateIdentification);
dealDate.addEventListener('change', updateIdentification);
decision.forEach((radio) => {
    radio.addEventListener('change', () => {
        updateIdentification();
        updateConditions();
    });
});
concern.addEventListener('change', updateConcernAndCommitment);
commitment.addEventListener('change', updateConcernAndCommitment);
supportingFacts.addEventListener('change', updateSupportingFacts); 
opposingFacts.addEventListener('change', updateSupportingFacts); 
missingFacts.addEventListener('change', updateSupportingFacts); 
consequence.addEventListener('change', updateConsequence); 
evidenceSufficiency.forEach((radio) => {
    radio.addEventListener('change', updateFourChecks);
});
consequenceClarity.forEach((radio) => {
    radio.addEventListener('change', updateFourChecks);
});
reversibilityAndMomentum.forEach((radio) => {
    radio.addEventListener('change', updateFourChecks);
});
sunkCostPressure.forEach((radio) => {
    radio.addEventListener('change', updateFourChecks);
});

decisionBasis.addEventListener('change', updateDecisionBasis); 

actionNeeded.addEventListener('change', updateConditions); 
whoObtains.addEventListener('change', updateConditions); 
whenDueDate.addEventListener('change', updateConditions); 
continueConditions.addEventListener('change', updateConditions); 





const recordControl = document.querySelector('#record-control');

function updateRecordControl() {

    const now = new Date();

    const timestamp = now.toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    const recordId = `WAR-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase()}`;

    recordControl.innerHTML = `
        <strong>Generation Timestamp:</strong> ${timestamp}<br>
        <strong>Record ID:</strong> ${recordId}<br><br>

        This record documents the decision owner’s selected posture and stated
        basis for one live decision. It does not authorize capital commitment
        or release, replace required professional review, or provide legal,
        tax, accounting, or investment advice.
    `;
}

updateRecordControl();


const editButtons = document.querySelectorAll('.edit-record-control')


editButtons.forEach((button) => {
    button.addEventListener('click', () => {
        document.querySelector('.form-section.active-section')
            .classList.remove('active-section');
        const targetSection = document.getElementById(button.dataset.target);
        targetSection.classList.add('active-section');
    });
});
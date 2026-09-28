const dateField = document.getElementById("wat-date");

const today = new Date().toISOString().split("T")[0];

const sections = [...document.querySelectorAll('#dk-form > .form-section')];

  const recordId = `WAR-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase()}`;


// =====================================================
// SHOW SECTION
// =====================================================

function showSection(section) {

    if (!section) {
        return;
    }

    sections.forEach(section => {
        section.classList.remove('active-section');
    });

    section.classList.add('active-section');

    updateSectionNavigation(section);

    window.scrollTo({
        top: document.getElementById('dk-app').offsetTop,
        behavior: 'smooth'
    });
}


// =====================================================
// CHECK IF SECTION IS COMPLETE
// =====================================================

function isSectionComplete(section) {

    const fields = section.querySelectorAll(
        'input:not([type="button"]):not([type="submit"]), textarea, select'
    );

    const radioGroups = new Set();

    for (const field of fields) {

        // Ignore disabled fields
        if (field.disabled) {
            continue;
        }

        // Ignore fields that are hidden
        if (field.offsetParent === null) {
            continue;
        }

        // Radio buttons are checked as a group below
        if (field.type === 'radio') {
            radioGroups.add(field.name);
            continue;
        }

        // Everything else needs a value
        if (!field.value.trim()) {
            return false;
        }
    }


    // Check every radio group
    for (const name of radioGroups) {

        const checked = section.querySelector(
            `input[type="radio"][name="${name}"]:checked`
        );

        if (!checked) {
            return false;
        }
    }


    return true;
}


// =====================================================
// UPDATE SECTION NAVIGATION
// =====================================================

function updateSectionNavigation(section) {

    if (!section) {
        return;
    }

    const nextButton = section.querySelector('.section-next');

    if (nextButton) {
        nextButton.disabled = !isSectionComplete(section);
    }
}


// =====================================================
// NEXT BUTTONS
// =====================================================

document.querySelectorAll('.section-next').forEach(button => {

    button.addEventListener('click', () => {

        const currentSection = button.closest('.form-section');

        if (!currentSection) {
            return;
        }


        // Don't allow navigation if the section isn't complete
        if (!isSectionComplete(currentSection)) {
            updateSectionNavigation(currentSection);
            return;
        }


        const currentIndex = sections.indexOf(currentSection);
        const nextSection = sections[currentIndex + 1];

        if (!nextSection) {
            return;
        }


        // If we're moving into the review section,
        // update the review before showing it.
        // if (nextSection.id === 'review-section') {
        //     updateReview();
        // }


        showSection(nextSection);

    });

});


// =====================================================
// PREVIOUS BUTTONS
// =====================================================

document.querySelectorAll('.section-prev').forEach(button => {

    button.addEventListener('click', () => {

        const currentSection = button.closest('.form-section');

        if (!currentSection) {
            return;
        }


        const currentIndex = sections.indexOf(currentSection);
        const previousSection = sections[currentIndex - 1];

        if (!previousSection) {
            return;
        }


        showSection(previousSection);

    });

});


// =====================================================
// UPDATE NAVIGATION WHEN FIELDS CHANGE
// =====================================================

document.querySelectorAll(
    '.form-section input, .form-section textarea, .form-section select'
).forEach(field => {

    field.addEventListener('input', () => {

        const section = field.closest('.form-section');

        if (section) {
            updateSectionNavigation(section);
        }

    });


    field.addEventListener('change', () => {

        const section = field.closest('.form-section');

        if (section) {
            updateSectionNavigation(section);
        }

    });

});


// =====================================================
// EDIT BUTTONS
// =====================================================

document.querySelectorAll('.edit-record-control').forEach(button => {

    button.addEventListener('click', () => {

        const targetId = button.dataset.target;
        const targetSection = document.getElementById(targetId);

        if (!targetSection) {
            return;
        }

        showSection(targetSection);

    });

});


// =====================================================
// INITIALIZE
// =====================================================

const activeSection = document.querySelector(
    '.form-section.active-section'
);

if (activeSection) {
    updateSectionNavigation(activeSection);
}

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

        decisionTextAlert.innerHTML = ''; 
        
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
        Evidence Sufficiency: ${evidenceText.toUpperCase} <br>
        Consequence Clarity: ${consequenceText.toUpperCase} <br>
        Reversibility and Momentum: ${reversibilityText.toUpperCase} <br>
        Sunk-Cost Pressure: ${sunkCostText.toUpperCase}
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


document.querySelector('form').addEventListener('submit', (e) => {

    e.preventDefault();

    const formData = new FormData(e.target);

    generatePDF(formData, recordId); 

});

//     // =====================================================
//     // PDF STARTS HERE
//     // =====================================================







function addHeader(doc) {

    // -------------------------
    // Logo placeholder
    // -------------------------

    doc
        .rect(50, 30, 35, 35)
        .fill('#1470af');

    doc
        .fillColor('#FFFFFF')
        .font('Helvetica-Bold')
        .fontSize(22)
        .text('W', 50, 35, {
            width: 35,
            align: 'center',
            lineBreak: false
        });


    // -------------------------
    // Header title
    // -------------------------

    doc
        .fillColor('#000000')
        .font('Helvetica-Bold')
        .fontSize(18)
        .text('Deal Killers', 100, 30, {
            width: 412,
            align: 'center',
            lineBreak: false
        });


    // -------------------------
    // Header line
    // -------------------------

    doc
        .moveTo(100, 55)
        .lineTo(512, 55)
        .lineWidth(1)
        .strokeColor('#1470af')
        .stroke();


    // -------------------------
    // Header subtitle
    // -------------------------

    doc
        .font('Helvetica-Oblique')
        .fontSize(9)
        .fillColor('#555555')
        .text('an analysis tool from John', 100, 60, {
            width: 412,
            align: 'center',
            lineBreak: false
        });


    // Reset text color
    doc.fillColor('#000000');
}


function addFooter(doc) {

    const pageWidth = 612;
    const pageHeight = 792;


    // -------------------------
    // Footer line
    // -------------------------

    doc
        .moveTo(50, pageHeight - 55)
        .lineTo(pageWidth - 50, pageHeight - 55)
        .lineWidth(0.5)
        .strokeColor('#CCCCCC')
        .stroke();


    // -------------------------
    // Footer text
    // -------------------------

    doc
        .font('Helvetica')
        .fontSize(8)
        .fillColor('#777777')
        .text(
            'Deal Killers • Professional Decision-Support Tool',
            50,
            pageHeight - 45,
            {
                width: 400,
                align: 'left',
                lineBreak: false
            }
        );


    // -------------------------
    // Page number
    // -------------------------

    doc
        .text(
            `Page ${doc.page.index + 1}`,
            450,
            pageHeight - 45,
            {
                width: 110,
                align: 'right',
                lineBreak: false
            }
        );


    // Reset text color
    doc.fillColor('#000000');
}


function generatePDF(formData, recordId) {

//       // =====================================================
//     // CREATE PDF
//     // =====================================================

    const doc = new PDFDocument({
        font: 'Helvetica'
    });


//     // =====================================================
//     // HEADER / FOOTER
//     // =====================================================

    // Add header/footer to every NEW page
    doc.on('pageAdded', function () {

        addHeader(doc);
        // addFooter(doc);

    });

    // Add header/footer to first page
    addHeader(doc);
    // addFooter(doc);

    // Start content below header
    doc.y = 100;


//     // =====================================================
//     // COLLECT PDF DATA
//     // =====================================================

    const chunks = [];


    doc.on('data', function (chunk) {

        chunks.push(chunk);

    });


//     // =====================================================
//     // PDF FINISHED
//     // =====================================================

    doc.on('end', function () {

        console.log('PDF generated!');
        console.log('Chunks:', chunks.length);


        const blob = new Blob(chunks, {
            type: 'application/pdf'
        });

        const url = URL.createObjectURL(blob);

        console.log(url); 


        // View PDF button
        const viewBtn = document.getElementById('dk-view-pdf-btn');

        viewBtn.href = url;
        viewBtn.target = '_blank';
        viewBtn.style.display = 'inline-block';


        // Download PDF button
        const downloadBtn = document.getElementById('dk-download-btn');

        downloadBtn.href = url;
        downloadBtn.download = 'walk-away-results.pdf';
        downloadBtn.style.display = 'inline-block';

         // Show success screen
        const successSection = document.getElementById('success-section');

        if (successSection) {
            showSection(successSection);
        }

    });


//     // =====================================================
//     // CREATE PDF SECTIONS
//     // =====================================================

    const title = 'Walk Away Decision Record'; 


    createPDFIntro(
        doc,
        formData,
        title
    );

    PDFCreateTable(
        doc,
        formData,
        recordId
    );

    PDFCreateDecisionRecord(
        doc,
        formData,
        recordId
    );

    createPDFFourChecks(
        doc,
        formData,
        recordId
    );

    createPDFProofRequired(
        doc,
        formData,
        recordId
    );


    doc.end();

}


function createPDFIntro(doc, formData, title) {

    const decision = formData.get('decision');

    let decisionText; 

    if (decision === 'stop') { 

        decisionText = 'STOP'; 

    } else if (decision === 'continue') {

        decisionText = 'CONTINUE'; 

    } else if (decision === 'require-proof') {

        decisionText = 'REQUIRE MORE PROOF'; 

    }


    // Title
    doc
        .font('Helvetica-Bold')
        .fontSize(30)
        .text(title, 50, doc.y);


    doc.moveDown();


    // Selected decision
    doc
        .font('Helvetica-Bold')
        .fontSize(18)
        .text('SELECTED DECISION: ', {
            continued: true
        })
        .font('Helvetica')
        .text(decisionText, {
            width: 510,
            align: 'left'
        });


    doc.moveDown();

}


function PDFCreateTable(doc, formData, recordId) {

    const dealReference = formData.get('dealReference');
    const decisionOwner = formData.get('email');
    const decisionDate = formData.get('date');


    // Generate timestamp
    const generatedTimestamp = new Date().toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        timeZoneName: 'short'
    }); 


    // Format decision date
    const formattedDate = decisionDate
        ? new Date(`${decisionDate}T00:00:00`).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        })
        : '';


    const tableX = 50;
    const tableWidth = 512;

    const detailWidth = 200;
    const valueWidth = tableWidth - detailWidth;

    const headerHeight = 32;


    const rows = [
        [
            'Decision / deal name',
            dealReference
        ],
        [
            'Decision owner',
            decisionOwner
        ],
        [
            'Decision date',
            formattedDate
        ],
        [
            'Record ID',
            recordId
        ],
        [
            'Generated',
            generatedTimestamp
        ]
    ];


    // Font settings
    const headerFontSize = 14;
    const bodyFontSize = 12;


    // Row settings
    const rowLineHeight = 12;
    const minimumRowHeight = rowLineHeight * 2;


    // Calculate row heights based on the value column
    doc
        .font('Helvetica')
        .fontSize(bodyFontSize);


    const rowHeights = rows.map(row => {

        const valueHeight = doc.heightOfString(row[1] || '', {
            width: valueWidth - 20,
            lineGap: 0
        });

        return Math.max(
            minimumRowHeight,
            valueHeight
        ) + 8;

    });


    // Header
    const headerY = doc.y;


    doc
        .fillColor('#E6E6E6')
        .rect(tableX, headerY, detailWidth, headerHeight)
        .fill();


    doc
        .rect(
            tableX + detailWidth,
            headerY,
            valueWidth,
            headerHeight
        )
        .fill();


    // Header borders
    doc
        .strokeColor('#104E75')
        .lineWidth(1)
        .rect(tableX, headerY, detailWidth, headerHeight)
        .stroke();


    doc
        .rect(
            tableX + detailWidth,
            headerY,
            valueWidth,
            headerHeight
        )
        .stroke();


    // Header text
    doc
        .fillColor('#000000')
        .font('Helvetica-Bold')
        .fontSize(headerFontSize)
        .text(
            'Decision Details',
            tableX + 10,
            headerY + 10,
            {
                width: detailWidth - 20
            }
        )
        .text(
            'Recorded value',
            tableX + detailWidth + 10,
            headerY + 10,
            {
                width: valueWidth - 20
            }
        );


    // Rows
    let currentY = headerY + headerHeight;


    rows.forEach((row, index) => {

        const rowHeight = rowHeights[index];

        const x1 = tableX;
        const x2 = tableX + detailWidth;


        // Cell backgrounds
        doc
            .fillColor('#FFFFFF')
            .rect(x1, currentY, detailWidth, rowHeight)
            .fill();


        doc
            .rect(x2, currentY, valueWidth, rowHeight)
            .fill();


        // Cell borders
        doc
            .strokeColor('#104E75')
            .lineWidth(1)
            .rect(x1, currentY, detailWidth, rowHeight)
            .stroke();


        doc
            .rect(x2, currentY, valueWidth, rowHeight)
            .stroke();


        // Cell text
        doc
            .fillColor('#000000')
            .font('Helvetica')
            .fontSize(bodyFontSize)
            .text(
                row[0],
                x1 + 10,
                currentY + 6,
                {
                    width: detailWidth - 20,
                    lineGap: 0
                }
            )
            .text(
                row[1] || '',
                x2 + 10,
                currentY + 6,
                {
                    width: valueWidth - 20,
                    lineGap: 0
                }
            );


        currentY += rowHeight;

    });


    // Move below table
    doc.y = currentY;


    // Reset formatting
    doc
        .fillColor('#000000')
        .strokeColor('#000000')
        .font('Helvetica')
        .fontSize(12);

}


function PDFCreateDecisionRecord(doc, formData, recordId) {

    const concern = formData.get('concern'); 
    const commit = formData.get('commit'); 
    const supportingFacts = formData.get('supportingFacts'); 
    const opposingFacts = formData.get('opposingFacts'); 
    const missingFacts = formData.get('missingFacts');
    const consequence = formData.get('consequence'); 


    const contentBottom = 730;


    function checkPageSpace(requiredSpace) {

        if (doc.y + requiredSpace > contentBottom) {

            doc.addPage();
            doc.y = 100;

        }

    }


    // Space before first section
    doc.y += 30;


    // Concern
    checkPageSpace(100);

    doc
        .font('Helvetica-Bold')
        .fontSize(16)
        .text('Concern', 50, doc.y);

    doc
        .font('Helvetica')
        .fontSize(12)
        .text(
            concern,
            50,
            doc.y
        );

    doc.moveDown();


    // Next commitment
    checkPageSpace(100);

    doc
        .font('Helvetica-Bold')
        .fontSize(16)
        .text('Next commitment', 50, doc.y);

    doc
        .font('Helvetica')
        .fontSize(12)
        .text(
            commit,
            50,
            doc.y
        );

    doc.moveDown();


    // Facts supporting the next step
    checkPageSpace(100);

    doc
        .font('Helvetica-Bold')
        .fontSize(16)
        .text('Facts supporting the next step', 50, doc.y);

    doc
        .font('Helvetica')
        .fontSize(12)
        .text(
            supportingFacts,
            50,
            doc.y
        );

    doc.moveDown();


    // Facts arguing against the next step
    checkPageSpace(100);

    doc
        .font('Helvetica-Bold')
        .fontSize(16)
        .text('Facts arguing against the next step', 50, doc.y);

    doc
        .font('Helvetica')
        .fontSize(12)
        .text(
            opposingFacts,
            50,
            doc.y
        );

    doc.moveDown();


    // Missing or unverified facts
    checkPageSpace(100);

    doc
        .font('Helvetica-Bold')
        .fontSize(16)
        .text('Missing or unverified facts', 50, doc.y);

    doc
        .font('Helvetica')
        .fontSize(12)
        .text(
            missingFacts,
            50,
            doc.y
        );

    doc.moveDown();


    // Consequence
    checkPageSpace(100);

    doc
        .font('Helvetica-Bold')
        .fontSize(16)
        .text('Consequence', 50, doc.y);

    doc
        .font('Helvetica')
        .fontSize(12)
        .text(
            consequence,
            50,
            doc.y
        );

}


function createPDFFourChecks(doc, formData, recordId) {

    const dealReference = formData.get('dealReference'); 
    const decision = formData.get('decision'); 
    const evidenceEnough = formData.get('evidenceEnough'); 
    const wrongConsequence = formData.get('wrongConsequence'); 
    const momentum = formData.get('momentum'); 
    const undoability = formData.get('undoability'); 
    const decisionRightNow = formData.get('decision-right-now'); 
    const conditions = formData.get('conditions');  


    doc.addPage(); 
    doc.y = 100;


    // Deal reference
    doc
        .font('Helvetica-Bold')
        .fontSize(16)
        .text(dealReference, 50, doc.y);


    doc
        .font('Helvetica-Oblique')
        .fontSize(10)
        .text(recordId, 50, doc.y);


    doc.moveDown();


    // Selected decision
    doc
        .font('Helvetica-Bold')
        .fontSize(18)
        .text(`SELECTED DECISION: ${decision}`, 50, doc.y);


    doc.moveDown();


    // Section title
    doc
        .font('Helvetica-Bold')
        .fontSize(24)
        .text('Four decision checks', 50, doc.y);


    // Table settings
    const tableX = 50;
    const tableWidth = 512;
    const checkWidth = 350;
    const answerWidth = tableWidth - checkWidth;
    const rowHeight = 32;


    const rows = [
        ['Evidence Sufficiency', evidenceEnough.toUpperCase()],
        ['Consequence Clarity', wrongConsequence.toUpperCase().replace('-', ' ')],
        ['Reversibility', undoability.toUpperCase()],
        ['Momentum / Sunk-Cost Pressure', momentum.toUpperCase()]
    ];


    // Header
    const headerY = doc.y;


    doc
        .rect(tableX, headerY, checkWidth, rowHeight)
        .fill('#E6E6E6');


    doc
        .rect(
            tableX + checkWidth,
            headerY,
            answerWidth,
            rowHeight
        )
        .fill('#E6E6E6');


    doc
        .fillColor('#000000')
        .font('Helvetica-Bold')
        .fontSize(11)
        .text(
            'Check',
            tableX + 10,
            headerY + 10,
            {
                width: checkWidth - 20
            }
        )
        .text(
            'Selected answer',
            tableX + checkWidth + 10,
            headerY + 10,
            {
                width: answerWidth - 20
            }
        );


    // Rows
    rows.forEach((row, index) => {

        const rowY = headerY + rowHeight + (index * rowHeight);


        doc
            .fillColor('#FFFFFF')
            .rect(tableX, rowY, checkWidth, rowHeight)
            .stroke('#CCCCCC');


        doc
            .rect(
                tableX + checkWidth,
                rowY,
                answerWidth,
                rowHeight
            )
            .stroke('#CCCCCC');


        doc
            .fillColor('#000000')
            .font('Helvetica')
            .fontSize(11)
            .text(
                row[0],
                tableX + 10,
                rowY + 10,
                {
                    width: checkWidth - 20
                }
            )
            .text(
                row[1] || '',
                tableX + checkWidth + 10,
                rowY + 10,
                {
                    width: answerWidth - 20
                }
            );

    });


    // Reset text formatting
    doc
        .fillColor('#000000')
        .font('Helvetica')
        .fontSize(12);


    doc.moveDown();
    doc.moveDown();


    doc
        .font('Helvetica-Bold')
        .fontSize(16)
        .text('Decision basis', 50, doc.y);


    doc
        .font('Helvetica')
        .fontSize(12)
        .text(
            decisionRightNow,
            50,
            doc.y
        );

    if(conditions) {
    doc
        .font('Helvetica-Bold')
        .fontSize(16)
        .text('Decision Tension Conditions', 50, doc.y);


    doc
        .font('Helvetica')
        .fontSize(12)
        .text(
            conditions,
            50,
            doc.y
        );
    }
    

}


function createPDFProofRequired(doc, formData, recordId) {

    const proof = formData.get('proof'); 
    const whoObtain = formData.get('whoObtain'); 
    const watWhenObtain = formData.get('whenObtain'); 


    doc.addPage(); 
    doc.y = 100;


    // Section title
    doc
        .font('Helvetica-Bold')
        .fontSize(24)
        .text('Proof required', 50, doc.y);


    doc.moveDown(0.75);


    // Table settings
    const tableX = 50;
    const tableWidth = 512;

    const proofWidth = 255;
    const whoWidth = 130;
    const byWidth = 75;
    const statusWidth = tableWidth - proofWidth - whoWidth - byWidth;

    const headerHeight = 32;


    const rows = [
        [
            proof,
            whoObtain,
            watWhenObtain,
            'Open'
        ],
    ];


    // Set body text formatting
    doc
        .font('Helvetica')
        .fontSize(10);


    // Row height is based only on Proof or action needed
    // Minimum height = 5 lines
    const rowLineHeight = 12;
    const minimumRowHeight = rowLineHeight * 5;


    const rowHeights = rows.map(row => {

        const proofHeight = doc.heightOfString(row[0] || '', {
            width: proofWidth - 20,
            lineGap: 0
        });


        return Math.max(
            minimumRowHeight,
            proofHeight
        ) + 8;

    });


    // Header
    const headerY = doc.y;


    doc
        .fillColor('#E6E6E6')
        .rect(
            tableX,
            headerY,
            proofWidth,
            headerHeight
        )
        .fill();


    doc
        .rect(
            tableX + proofWidth,
            headerY,
            whoWidth,
            headerHeight
        )
        .fill();


    doc
        .rect(
            tableX + proofWidth + whoWidth,
            headerY,
            byWidth,
            headerHeight
        )
        .fill();


    doc
        .rect(
            tableX + proofWidth + whoWidth + byWidth,
            headerY,
            statusWidth,
            headerHeight
        )
        .fill();


    // Header text
    doc
        .fillColor('#000000')
        .font('Helvetica-Bold')
        .fontSize(10)
        .text(
            'Proof or action needed',
            tableX + 10,
            headerY + 10,
            {
                width: proofWidth - 20
            }
        )
        .text(
            'Who will obtain it',
            tableX + proofWidth + 10,
            headerY + 10,
            {
                width: whoWidth - 20
            }
        )
        .text(
            'By when',
            tableX + proofWidth + whoWidth + 10,
            headerY + 10,
            {
                width: byWidth - 20
            }
        )
        .text(
            'Status',
            tableX + proofWidth + whoWidth + byWidth + 10,
            headerY + 10,
            {
                width: statusWidth - 20
            }
        );


    // Rows
    let currentY = headerY + headerHeight;


    rows.forEach((row, index) => {

        const rowHeight = rowHeights[index];

        const x1 = tableX;
        const x2 = tableX + proofWidth;
        const x3 = x2 + whoWidth;
        const x4 = x3 + byWidth;


        // Cell borders
        doc
            .fillColor('#FFFFFF')
            .rect(
                x1,
                currentY,
                proofWidth,
                rowHeight
            )
            .stroke('#CCCCCC');


        doc
            .rect(
                x2,
                currentY,
                whoWidth,
                rowHeight
            )
            .stroke('#CCCCCC');


        doc
            .rect(
                x3,
                currentY,
                byWidth,
                rowHeight
            )
            .stroke('#CCCCCC');


        doc
            .rect(
                x4,
                currentY,
                statusWidth,
                rowHeight
            )
            .stroke('#CCCCCC');


        // Cell text
        doc
            .fillColor('#000000')
            .font('Helvetica')
            .fontSize(10)
            .text(
                row[0] || '',
                x1 + 10,
                currentY + 6,
                {
                    width: proofWidth - 20,
                    lineGap: 0
                }
            )
            .text(
                row[1] || '',
                x2 + 10,
                currentY + 6,
                {
                    width: whoWidth - 20,
                    lineGap: 0
                }
            )
            .text(
                row[2] || '',
                x3 + 10,
                currentY + 6,
                {
                    width: byWidth - 20,
                    lineGap: 0
                }
            )
            .text(
                row[3] || '',
                x4 + 10,
                currentY + 6,
                {
                    width: statusWidth - 20,
                    lineGap: 0
                }
            );


        currentY += rowHeight;

    });


    // Move below table
    doc.y = currentY;


    doc.moveDown(1.5);


    // Disclaimer
    doc
        .font('Helvetica')
        .fontSize(10)
        .fillColor('#555555')
        .text(
            'This record documents the decision owner’s selected posture and stated basis for one live decision. It does not authorize capital commitment or release, replace required professional review, or provide legal, tax, accounting, or investment advice.',
            50,
            doc.y,
            {
                width: 512,
                align: 'left',
                lineGap: 0
            }
        );


    // Reset formatting
    doc
        .fillColor('#000000')
        .font('Helvetica')
        .fontSize(12);

}
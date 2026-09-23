// console.log("Deal Killers JS loaded");

// const dkForm = document.getElementById("dk-form");
// const dkSuccess = document.getElementById("dk-success");
// const dkResultsTable = document.getElementById("dk-results");


// // Page 1 Variables 

// const property = 'Red Rock LTD - Austin TX'; 
// const timestamp = 'Timestamp: 03/20/2026, 10:05:32 AM'; 
// const email = 'johnwilhoit@icloud.com'; 


// const determinationIncomplete = 'Decision Incomplete';
// const determinationStop = 'STOP';
// const determinationClear = 'CLEAR';

// // Page 4 Variables
// const disclaimerTitle = `Professional Use and Disclaimer`;
// const disclaimerBody = `This material is provided solely for professional reference and decision-support purposes. It is meant to assist with structured real estate screening and decision-making but does not constitute investment, legal, tax, accounting, engineering, environmental, valuation, lending, or other professional advice.

// Deal Filters: The 12 Deal Filters Every Property Must Pass, along with the related output pages, interpretation pages, and The Walk-Away Test, are preliminary decision tools only. They are not underwriting, due diligence, an appraisal, a property condition assessment, a market study, or a final investment recommendation. They are designed to support disciplined judgment, not replace independent verification and qualified professional review.

// All outputs rely on the completeness, accuracy, and reliability of the information provided or available at the time of review. No representation or warranty is made that any output, determination, interpretation, or decision posture is complete, accurate, or suitable for any specific transaction, investor, lender, property, market, or legal structure.

// Using these materials does not establish an attorney-client, advisor-client, fiduciary, brokerage, lending, consulting, partnership, joint venture, or any other professional relationship unless it is explicitly formed in a separate written agreement. The user is solely responsible for all decisions, due diligence, underwriting conclusions, negotiations, approvals, capital commitments, and related actions.

// Users should consult qualified legal, tax, accounting, engineering, environmental, insurance, lending, and investment professionals before making any real estate decisions. By using these materials, the user acknowledges that real estate decisions involve uncertainty and risk, and that no tool, screen, framework, or written output can eliminate the possibility of loss, error, omission, changed conditions, or adverse outcomes.

// These materials may not be reproduced, redistributed, resold, or presented as professional advice to third parties without prior written permission from Real Estate Tradecraft, except for internal decision-support use by the original purchaser or authorized user.

// Use these materials as a discipline tool, not as a substitute for professional judgment, independent verification, or qualified advice.`;


// // Page 2 Variables
// const interpretationTitle = `Decision Interpretation`;

// const interpretationIntroIncomplete = `STOP — Decision Incomplete`;
// const interpretationIntroStop = `STOP — Deal Killer Identified`;
// const interpretationIntroClear = `CLEAR — No Deal Killers Identified`;


// const interpretationBodyIncomplete = `The current output should be read as STOP — Decision Incomplete. No filters were marked Fail, but one or more were marked Unverifiable, indicating the screen did not produce a clear proceed decision based on the information reviewed at this stage. Under the current Deal Filters methodology, unresolved items are enough to stop the deal from advancing as though risk has been adequately verified.

// This result does not indicate that the opportunity is dead. It means the burden of proof has not yet been met. Deal Filters: The 12 Deal Filters Every Property Must Pass are designed to identify structural weaknesses, unsupported assumptions, and unresolved risks before more underwriting time, diligence expense, negotiation effort, or capital is invested. When multiple items remain unverifiable, the correct approach is not to assume the deal is fine; it is to understand that the file is still incomplete.

// The practical implication is clear: unresolved items should now be considered gating issues. Areas marked Unverifiable require verification before the deal can be deemed ready to proceed. Missing proof should not be mistaken for implied support. A strong process requires the analyst, sponsor, or decision-maker to pause progress until the unresolved issues are narrowed, verified, or clearly reframed with documented conditions.

// The correct approach now is to pause, verify, and document. Record what is unresolved, why it remains unresolved, and what specific evidence is needed before the deal can move forward again. A decision-incomplete screen is not a soft result; it is a decision-control event. The purpose of the screen is to safeguard attention, credibility, and capital from drifting deeper into an opportunity that has not yet earned a clear proceeding.`;

// const interpretationBodyClear = `The current output should be read as CLEAR — No Deal Killers Identified. All 12 filters were marked Pass, meaning no structural disqualifiers were identified based on the information reviewed at this stage. Under the current Deal Filters methodology, this is the only outcome that qualifies as a clean preliminary screen.

// This result indicates that the opportunity seems credible enough to advance to the next phase of disciplined review. It does not mean the deal is approved, risk-free, or exempt from further scrutiny. Deal Filters: The 12 Deal Filters Every Property Must Pass is a front-end screening tool created to determine whether an opportunity appears sufficiently clean to warrant additional underwriting, diligence, negotiation, and professional review. It is not a substitute for those processes.

// The practical implication is clear: the deal has passed the initial screen, and further steps can move forward. That work should stay disciplined and based on evidence. A clear review isn't permission to lower standards, but to keep applying them. The strength of the outcome is that no filter identified a failed or unresolved condition at the preliminary stage.

// The correct posture now is to advance, verify, and document. Move forward with underwriting and diligence, but continue testing assumptions, confirming supporting evidence, and recording the basis for material decisions as the file develops. A strong process does not end when a deal clears the screen. It becomes even more important once the deal has earned the right to move forward.`;

// const interpretationBodyStop = `The current output should be read as STOP — Deal Killer Identified. One or more filters were marked Fail, meaning a structural disqualifier has been identified based on the information reviewed at this stage. According to the current Deal Filters methodology, any failed filter is enough to prevent the deal from moving forward as if it remains clean.

// This result does not mean the file can never be reopened. It indicates that the opportunity has failed the preliminary screen in its current form and should not proceed based on optimism, momentum, or incomplete explanations. Deal Filters: The 12 Deal Filters Every Property Must Pass are designed to identify disqualifying weaknesses before more underwriting time, diligence expense, negotiation effort, or capital commitment is invested. When a filter is failed, the responsibility shifts from selling the deal to demonstrating why the failure is no longer valid.

// The practical implication is clear: the failed item should be regarded as a stopping point, not as a note for later review. Analyzing a deal with an unresolved structural failure is rarely disciplined. More often, it is confirmation bias masquerading as diligent work. Strong processes require the analyst, sponsor, or decision-maker to halt progress unless verifiable new evidence definitively resolves the failed condition.

// The correct approach now is to stop, document, and define conditions for reconsideration. Record what failed, why it failed, and what specific evidence would be needed before reopening the deal. A failed screen is not just a negative impression; it is a decision-control event. The value of the screen lies in protecting attention, credibility, and capital from drifting further into an opportunity that has not been earned.`;

// // Page 3 PDF Variables
// const marketingTextCTA = `Get The Walk Away Test — $49.`; 
// const marketingTextClear = `If the deal remains active and you need to convert preliminary confidence into a documented proceed, pause, or walk away posture, The Walk Away Test is the next decision-control step.`
// const marketingTextCStop = `When a deal fails the screen, the next step is not another round of hopeful analysis. The next step is a documented stop, pause, or proceed-with-conditions posture.`
// const marketingTextIncomplete = `When the screen is not clean, the next step is not optimism. The next step is a documented proceed, pause, or walk away posture.`






// function getTimestamp() {
//     return new Date().toLocaleString("en-US", {
//         month: "2-digit",
//         day: "2-digit",
//         year: "numeric",
//         hour: "2-digit",
//         minute: "2-digit",
//         second: "2-digit"
//     });
// }


// function updateTimestamp() {
//     const timestamp = getTimestamp();
//     document.querySelector("#timestamp .info-span").textContent = timestamp;
// }


// function showResults() {
//     dkForm.style.display = "none";
//     dkSuccess.style.display = "block";

//     window.scrollTo({
//         top: 0,
//         behavior: "smooth"
//     });
// }

// function updateResults(formData) {
//     let passCount = 0;
//     let failCount = 0;
//     let unverifiableCount = 0;

//     for (const [key, value] of formData) {
//         const element = document.querySelector(`#${key}`);

//         if (!element) continue;

//         const target = element.matches("tr")
//             ? element.querySelector(".filter-result")
//             : element.querySelector(".info-span");

//         if (element.matches("tr")) {

//             target.classList.remove(
//                 "pass-bg",
//                 "unverifiable-bg",
//                 "fail-bg"
//             );

//             if (value === "Pass") {
//                 passCount++;
//                 target.textContent = "✓ Pass";
//                 target.classList.add("pass-bg");

//             } else if (value === "Unverifiable") {
//                 unverifiableCount++;
//                 target.textContent = "⚠ Unverifiable";
//                 target.classList.add("unverifiable-bg");

//             } else if (value === "Fail") {
//                 failCount++;
//                 target.textContent = "✕ Fail";
//                 target.classList.add("fail-bg");
//             }

//         } else {
//             target.textContent = value;
//         }
//     }

//     return {
//         passCount,
//         failCount,
//         unverifiableCount
//     };
// }


// function updateSummary(counts) {
//     document.querySelector("#pass-summary-count").textContent = counts.passCount;
//     document.querySelector("#fail-summary-count").textContent = counts.failCount;
//     document.querySelector("#unverifiable-summary-count").textContent = counts.unverifiableCount;
// }


// function getDetermination(counts) {
//     if (counts.passCount === 12) {
//         return "PASS";
//     }

//     if (counts.failCount > 0) {
//         return "STOP";
//     }

//     return "INCOMPLETE";
// }


// function updateDetermination(counts) {
//     const finalResult = getDetermination(counts);
//     let resultText = 'STOP — Decision Incomplete'; 
//     let bgClass = 'unverified-bg'; 
//     if (finalResult === 'PASS') {
//         resultText = 'CLEAR — No Deal Killers Identified'; 
//         bgClass = 'pass-bg'
//     } else if (finalResult === 'STOP') {
//         resultText = 'STOP — Deal Killer Identified'
//         bgClass = 'fail-bg'
//     }
//     document.querySelector(".output-determination").classList.add(bgClass);
//     document.querySelector("#determination-text").textContent = resultText;
// }


// dkForm.addEventListener("submit", (e) => {
//     e.preventDefault();
//     const formData = new FormData(dkForm);
//     updateTimestamp();
//     const counts = updateResults(formData);
//     updateSummary(counts);
//     updateDetermination(counts);
//     const pdfDetermination = getDetermination(counts); 
//     showResults();

//     generatePDF(formData, pdfDetermination); 
// });

// function addHeader(doc) {

//     // -------------------------
//     // Logo placeholder
//     // -------------------------

//     doc
//         .rect(50, 30, 35, 35)
//         .fill('#1470af');

//     doc
//         .fillColor('#FFFFFF')
//         .font('Helvetica-Bold')
//         .fontSize(22)
//         .text('W', 50, 35, {
//             width: 35,
//             align: 'center',
//             lineBreak: false
//         });


//     // -------------------------
//     // Header title
//     // -------------------------

//     doc
//         .fillColor('#000000')
//         .font('Helvetica-Bold')
//         .fontSize(18)
//         .text('Deal Killers', 100, 30, {
//             width: 412,
//             align: 'center',
//             lineBreak: false
//         });


//     // -------------------------
//     // Header line
//     // -------------------------

//     doc
//         .moveTo(100, 55)
//         .lineTo(512, 55)
//         .lineWidth(1)
//         .strokeColor('#1470af')
//         .stroke();


//     // -------------------------
//     // Header subtitle
//     // -------------------------

//     doc
//         .font('Helvetica-Oblique')
//         .fontSize(9)
//         .fillColor('#555555')
//         .text('an analysis tool from John', 100, 60, {
//             width: 412,
//             align: 'center',
//             lineBreak: false
//         });


//     // Reset text color
//     doc.fillColor('#000000');
// }



// function addFooter(doc) {

//     const pageWidth = 612;
//     const pageHeight = 792;


//     // -------------------------
//     // Footer line
//     // -------------------------

//     doc
//         .moveTo(50, pageHeight - 55)
//         .lineTo(pageWidth - 50, pageHeight - 55)
//         .lineWidth(0.5)
//         .strokeColor('#CCCCCC')
//         .stroke();


//     // -------------------------
//     // Footer text
//     // -------------------------

//     doc
//         .font('Helvetica')
//         .fontSize(8)
//         .fillColor('#777777')
//         .text(
//             'Deal Killers • Professional Decision-Support Tool',
//             50,
//             pageHeight - 45,
//             {
//                 width: 400,
//                 align: 'left',
//                 lineBreak: false
//             }
//         );


//     // -------------------------
//     // Page number
//     // -------------------------

//     doc
//         .text(
//             `Page ${doc.page.index + 1}`,
//             450,
//             pageHeight - 45,
//             {
//                 width: 110,
//                 align: 'right',
//                 lineBreak: false
//             }
//         );


//     // Reset text color
//     doc.fillColor('#000000');
// }




// function generatePDF(formData, pdfDetermination) {

//       // =====================================================
//     // CREATE PDF
//     // =====================================================

//     const doc = new PDFDocument({
//         font: 'Helvetica'
//     });


//     // =====================================================
//     // HEADER / FOOTER
//     // =====================================================

//     // Add header/footer to every NEW page
//     doc.on('pageAdded', function () {

//         addHeader(doc);
//         // addFooter(doc);

//     });

//     // Add header/footer to first page
//     addHeader(doc);
//     // addFooter(doc);

//     // Start content below header
//     doc.y = 100;

//     // =====================================================
//     // COLLECT PDF DATA
//     // =====================================================

//     const chunks = [];


//     doc.on('data', function (chunk) {

//         chunks.push(chunk);

//     });

//     // =====================================================
//     // PDF FINISHED
//     // =====================================================

//     doc.on('end', function () {

//         console.log('PDF generated!');
//         console.log('Chunks:', chunks.length);


//         const blob = new Blob(chunks, {
//             type: 'application/pdf'
//         });

//         const url = URL.createObjectURL(blob);

//         // View PDF button
//         const viewBtn = document.getElementById('dk-view-pdf-btn');

//         viewBtn.href = url;
//         viewBtn.target = '_blank';
//         viewBtn.style.display = 'inline-block';

//         // Download PDF button
//         const downloadBtn = document.getElementById('dk-download-btn');

//         downloadBtn.href = url;
//         downloadBtn.download = 'deal-killers-results.pdf';
//         downloadBtn.style.display = 'inline-block';

//     });

//     // Get submission data
//     const title = 'Deal Filters Output'; 
//     const property = formData.get('dealReference');
//     const email = formData.get('email');
//     // Create submission timestamp
//     const timestamp = getTimestamp();
//     let marketingText;
//     let interpretationIntro;
//     let interpretationBody;
//     let determinationText; 

//     if (pdfDetermination === 'PASS') {

//         interpretationIntro = interpretationIntroClear;
//         interpretationBody = interpretationBodyClear;
//         marketingText = marketingTextClear;
//         determinationText = determinationClear; 

//     } else if (pdfDetermination === 'STOP') {

//         interpretationIntro = interpretationIntroStop;
//         interpretationBody = interpretationBodyStop;
//         marketingText = marketingTextCStop;
//         determinationText = determinationStop; 


//     } else if (pdfDetermination === 'INCOMPLETE') {
//         interpretationIntro = interpretationIntroIncomplete;
//         interpretationBody = interpretationBodyIncomplete;
//         marketingText = marketingTextIncomplete;
//         determinationText = determinationIncomplete; 
//     }

//     createPDFIntro(doc, title, property, timestamp, email); 
//     createPDFDeterminationBox(doc, pdfDetermination, determinationText); 
//     PDFCreateTable(doc, formData);
//     createPDFInterpretationPage(doc, interpretationTitle, interpretationIntro, interpretationBody); 
//     createPDFMarketingPage(doc, marketingText, marketingTextCTA); 
//     createPDFDisclaimerPage(doc); 
//     doc.end();

// }

// document.getElementById('test-pdf').addEventListener('click', () => {
//     generatePDF(testFormData);
// });



//  function createPDFIntro(doc, title, property, timestamp, email) {

//          // Title
//     doc
//         .font('Helvetica-Bold')
//         .fontSize(30)
//         .text(title, 50, doc.y);


//     doc.moveDown();


//     // Property
//     doc
//         .font('Helvetica-Bold')
//         .fontSize(18)
//         .text('Deal Reference: ', {
//             continued: true
//         })
//         .font('Helvetica')
//         .text(property, {
//             width: 510,
//             align: 'left'
//         });


//     // Timestamp
//     doc
//         .font('Helvetica-Bold')
//         .fontSize(18)
//         .text('Timestamp: ', {
//             continued: true
//         })
//         .font('Helvetica')
//         .text(timestamp);


//     // Recipient
//     doc
//         .font('Helvetica-Bold')
//         .fontSize(18)
//         .text('For: ', {
//             continued: true
//         })
//         .font('Helvetica')
//         .text(email);


//     doc.moveDown();

// }

// function createPDFDisclaimerPage(doc) {
//     doc.addPage();
//     doc.x = 50;
//     doc.y = 100;
//     doc
//         .font('Helvetica-Bold')
//         .fontSize(30)
//         .text(disclaimerTitle, {
//             align: 'center'
//         });
//     doc.y += 10;
//     doc
//         .font('Helvetica')
//         .fontSize(12)
//         .text(disclaimerBody, {
//             // width: 510,
//             align: 'justify'
//     });
//     doc.moveDown();
// }

// function createPDFInterpretationPage(doc, interpretationTitle, interpretationIntro, interpretationBody) {
//     doc.addPage();

//     doc.x = 50; 
//     doc.y = 100;

//     doc
//         .font('Helvetica-Bold')
//         .fontSize(30)
//         .text(interpretationTitle, {
//             align: 'center'
//         });
    
//     doc.y += 5;

//     doc
//         .font('Helvetica-Bold')
//         .fontSize(18)
//         .text(interpretationIntro)

//     doc.y += 5;

//     doc
//         .font('Helvetica')
//         .fontSize(14)
//         .text(`${interpretationBody}`)
// }

// function createPDFMarketingPage(doc, marketingText, marketingTextCTA ) {
//     doc.addPage();
//     doc.x = 50;
//     doc.y = 100;

//     doc
//         .fontSize(24)
//         .text(`${marketingText}`, {
//             align: 'center'
//         });

//     doc.y = doc.y + 50;

//     doc
//         .fontSize(24)
//         .text(`${marketingTextCTA}`, {
//             align: 'center'
//     });

//     doc
//     .fontSize(14)
//     .fillColor('#1470af')
//     .text('johnwilhoit.com/the-walk-away-test', {
//         align: 'center',
//         link: 'https://example.com',
//         underline: true
//     });

//     doc.fillColor('#000000');

// }

// function createPDFDeterminationBox(doc, determination, determinationText) {
//     let fillColor = '#D3D3D3'; 
//     if(determination === 'PASS') {
//         fillColor = '#E8F5E9'
//     } else  if(determination === 'STOP') {
//         fillColor = '#fbdcdc'
//     }


//     doc
//         .rect(50, doc.y, 510, 40)
//         .fill(fillColor);
//     doc
//         .fillColor('#000000')
//         .font('Helvetica-Bold')
//         .fontSize(16)
//         .text(
//             `Determination: ${determinationText}`,
//             50,
//             doc.y + 11,
//             {
//                 width: 510,
//                 align: 'center',
//                 lineBreak: false
//             }
//         );
//     // Move cursor below determination box
//     doc.y = doc.y + 30;
// }

// function PDFCreateTable(doc, formData) {

//     const rows = Array.from(formData).slice(2);

//     const table = doc.table({

//         width: 510,

//         columnStyles: [
//             {
//                 width: 310
//             },
//             {
//                 width: 200
//             }
//         ]

//     });


//     // Header
//     table.row([

//         {
//             text: 'Deal Filter',
//             backgroundColor: '#1470af',
//             textColor: '#FFFFFF',
//             align: {
//                 x: 'center',
//                 y: 'center'
//             }
//         },

//         {
//             text: 'Result',
//             backgroundColor: '#1470af',
//             textColor: '#FFFFFF',
//             align: {
//                 x: 'left',
//                 y: 'center'
//             }
//         }

//     ]);

//     let counter = 1; 

//     for (const [key, value] of formData) {
//         if(key === 'email' || key === 'dealReference') { continue }

//         const formattedKey = key
//             .replace(/([A-Z])/g, ' $1')
//             .replace(/^./, str => str.toUpperCase());

//         if (value === "Pass") {
//             valueText = "PASS";
//             rowBgColor = '#dff5e5';
//             rowTextColor = '#187a36';
//         } else if (value === "Unverifiable") {
//             // unverifiableCount++;
//             valueText = "UNVERIFIABLE";
//             rowBgColor = '#fff1c7';
//             rowTextColor = '#8a6500';
//         } else if (value === "Fail") {
//             // failCount++;
//             valueText = "FAIL";
//             rowBgColor = '#a52222;'
//             rowTextColor = '#fbdcdc';

//         }

//         table.row([

//             {
//                 text: `${counter}. ${formattedKey}`,
//                 backgroundColor: '#FFFFFF',
//                 textColor: '#000000',
//                 align: {
//                     x: 'left',
//                     y: 'center'
//                 }
//             },

//             {
//                 text: `${valueText}`,
//                 backgroundColor:`${rowBgColor}` ,
//                 textColor: `${rowTextColor}`,
//                 align: {
//                     x: 'center',
//                     y: 'center'
//                 }
//             }

//         ]);

//          counter++; 
//     }

// }


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
            nextButton.classList.add('disabled'); 
        }
        if(newActiveSection.previousElementSibling.classList.contains('form-section')) {
            prevButton.classList.remove('disabled'); 
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
            nextButton.classList.remove('disabled'); 
        }
        if(!newActiveSection.previousElementSibling.classList.contains('form-section')) {
            prevButton.classList.add('disabled'); 
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
    radio.addEventListener('change', updateIdentification);
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

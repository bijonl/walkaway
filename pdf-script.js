// // Page 1 Variables 

const property = 'Red Rock LTD - Austin TX';  
const timestamp = 'Timestamp: 03/20/2026, 10:05:32 AM'; 
const email = 'johnwilhoit@icloud.com'; 


document.querySelector('form').addEventListener('submit', (e) => {

    e.preventDefault();

    const formData = new FormData(e.target);

    // Create one unique record ID for the entire PDF
    const recordId = `WAT-${Date.now()}${Math.floor(Math.random() * 1000)}`;

    generatePDF(formData, recordId); 

});


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
        downloadBtn.download = 'deal-killers-results.pdf';
        downloadBtn.style.display = 'inline-block';

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
        ['Evidence Sufficiency', evidenceEnough],
        ['Consequence Clarity', wrongConsequence],
        ['Reversibility', undoability],
        ['Momentum / Sunk-Cost Pressure', momentum]
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
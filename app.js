const PDFDocument = require('pdfkit');
const blobStream = require('blob-stream');
const PNG = require('png-js');

const doc = new PDFDocument();
const stream = doc.pipe(blobStream());

doc.fontSize(25).text('The Art of Creating PDF with Node', 100, 100);

/* doc.image('images/node.png', 100, 150, {
  fit: [400, 300],
  align: 'center',
  valign: 'center',
}); */

const paragraph =
  'In the world of web development, generating PDF files has become an essential skill, especially when dealing with professional-looking documents, invoices, and reports. With Node.js, developers can leverage powerful libraries like pdfkit, which offers a simple and intuitive API for creating and manipulating PDFs from scratch, or html-pdf, which allows for easy conversion of HTML templates into PDF files. By harnessing the capabilities of Node.js and the right libraries, developers can create visually appealing and functional PDFs to meet various use cases, simplifying the process of document creation and management.';

doc.fontSize(12).text(paragraph, 50, 200, {
  width: 500,
  align: 'justify',
  lineGap: 5,
  y: 400,
});

doc.fontSize(15).text('Crafted by: Mahmoud Saad', 50, 400);

doc.end();
stream.on('finish', function () {
  const blob = stream.toBlob('application/pdf');

  const url = stream.toBlobURL('application/pdf');
  const iframe = document.getElementById('pdfIframe');
  iframe.src = url;
});

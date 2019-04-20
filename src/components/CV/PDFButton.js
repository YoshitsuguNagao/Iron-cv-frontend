import React, { Component } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

class PDFButton extends Component {
  // response.addHeader("Access-Control-Allow-Origin", "*");
//   printCV = () => {
// 		const filename  = 'PDFFilename.pdf';
//     let pdf = new jsPDF('p', 'mm', 'a4');

//     console.log('imgData');
//     html2canvas(document.querySelector('.cv-view'), {
//       useCORS : false,
//       onrendered: function(canvas) {
//          var imgData = canvas.toDataURL('image/jpeg',1.0);
//          pdf.addImage(imgData, 'jpg', 0, 0, 211, 298);
//          document.querySelector('.cv-view').append(canvas);
//          pdf.save(filename);
//       }
//     })
//  };

  printCV = () => {
		const filename  = 'PDFFilename.pdf';

    html2canvas(document.querySelector('.cv-view'))
      .then((canvas) => {
      let pdf = new jsPDF('p', 'mm', 'a4');
      // pdf.addHTML(canvas, function() {
      //   pdf.save('stacking-plan.pdf');
      // });
			pdf.addImage(canvas.toDataURL('image/png',1.0), 'jpg', 0, 0, 211, 298);
			pdf.save(filename);
		});
  };

  render () {
    return (
      <div>
        <button className="print-btn" onClick={this.printCV}><p>Print</p></button>
      </div>
    );
  }
};

export default PDFButton;
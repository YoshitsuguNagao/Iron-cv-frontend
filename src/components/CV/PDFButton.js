import React, { Component } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

class PDFButton extends Component {

  printCV = () => {
		const filename  = 'PDFFilename.pdf';

    html2canvas(document.querySelector('.cv-view'))
      .then((canvas) => {
			let pdf = new jsPDF('p', 'mm', 'a4');
			pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298);
			pdf.save(filename);
		});
  }

  render () {
    return (
      <div>
        <button onClick={this.printCV}>LOVE ME</button>
      </div>
    )
  }
}

export default PDFButton
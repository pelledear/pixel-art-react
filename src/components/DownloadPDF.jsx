import React, {Component, PropTypes} from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jsPDF';


export default class DownloadPDF extends Component {
  constructor(props) {
    super(props);
  }

  printDocument() {
    const input = document.getElementById('pdf-preview');
    const opts = {
      scale: 1,
    }
    html2canvas(input, opts)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        // pdf.output('dataurlnewwindow');
        pdf.save("color-chart.pdf");
      })
    ;
  }

  render() {
    return (
      <div>
        <div className="download">
          <button onClick={this.printDocument}>Download</button>
        </div>
      </div>
    );
  }
}

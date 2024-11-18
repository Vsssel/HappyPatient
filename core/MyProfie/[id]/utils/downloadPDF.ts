import html2canvas from "html2canvas"
import { element } from "../values"
import jsPDF from "jspdf"


export const downloadPDF = () => {
    if (element.value) {
      html2canvas(element.value, { scale: 2 }).then((canvas) => {
        const pdf = new jsPDF()
        const imgData = canvas.toDataURL('image/png')
        const pageWidth = 210
        const pageHeight = 297
  
        const imgWidth = pageWidth - 80
        const imgHeight = (canvas.height * imgWidth) / canvas.width
  
        const x = (pageWidth - imgWidth) / 2
        const y = (pageHeight - imgHeight) / 2
  
        pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight)
        pdf.save('payment-details.pdf')
      })
    }
  }
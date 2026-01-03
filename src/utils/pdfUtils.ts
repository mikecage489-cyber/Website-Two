import { PDFDocument, degrees } from 'pdf-lib';
import { saveAs } from 'file-saver';

// Merge multiple PDFs
export async function mergePDFs(files: File[]): Promise<Blob> {
  const mergedPdf = await PDFDocument.create();

  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  const pdfBytes = await mergedPdf.save();
  return new Blob([pdfBytes as BlobPart], { type: 'application/pdf' });
}

// Split PDF into individual pages
export async function splitPDF(file: File): Promise<Blob[]> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const pageCount = pdf.getPageCount();
  const pages: Blob[] = [];

  for (let i = 0; i < pageCount; i++) {
    const newPdf = await PDFDocument.create();
    const [copiedPage] = await newPdf.copyPages(pdf, [i]);
    newPdf.addPage(copiedPage);
    const pdfBytes = await newPdf.save();
    pages.push(new Blob([pdfBytes as BlobPart], { type: 'application/pdf' }));
  }

  return pages;
}

// Extract specific pages from PDF
export async function extractPages(file: File, pageNumbers: number[]): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const totalPages = pdf.getPageCount();
  
  // Validate page numbers
  const validPageNumbers = pageNumbers.filter(num => num >= 0 && num < totalPages);
  if (validPageNumbers.length === 0) {
    throw new Error('No valid page numbers provided');
  }
  
  const newPdf = await PDFDocument.create();
  const copiedPages = await newPdf.copyPages(pdf, validPageNumbers);
  copiedPages.forEach((page) => newPdf.addPage(page));

  const pdfBytes = await newPdf.save();
  return new Blob([pdfBytes as BlobPart], { type: 'application/pdf' });
}

// Remove specific pages from PDF
export async function removePages(file: File, pageNumbers: number[]): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const totalPages = pdf.getPageCount();
  
  // Validate page numbers
  const validPageNumbers = pageNumbers.filter(num => num >= 0 && num < totalPages);
  
  // Get pages to keep (inverse of pages to remove)
  const pagesToKeep = Array.from({ length: totalPages }, (_, i) => i)
    .filter(i => !validPageNumbers.includes(i));
  
  if (pagesToKeep.length === 0) {
    throw new Error('Cannot remove all pages from PDF');
  }

  const newPdf = await PDFDocument.create();
  const copiedPages = await newPdf.copyPages(pdf, pagesToKeep);
  copiedPages.forEach((page) => newPdf.addPage(page));

  const pdfBytes = await newPdf.save();
  return new Blob([pdfBytes as BlobPart], { type: 'application/pdf' });
}

// Rotate PDF pages
export async function rotatePDF(file: File, rotation: 90 | 180 | 270): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const pages = pdf.getPages();

  pages.forEach(page => {
    page.setRotation(degrees(rotation));
  });

  const pdfBytes = await pdf.save();
  return new Blob([pdfBytes as BlobPart], { type: 'application/pdf' });
}

// Compress PDF (reduce quality)
export async function compressPDF(file: File): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  
  // Save with compression
  const pdfBytes = await pdf.save({
    useObjectStreams: true,
    addDefaultPage: false,
  });
  
  return new Blob([pdfBytes as BlobPart], { type: 'application/pdf' });
}

// Download file helper
export function downloadFile(blob: Blob, filename: string) {
  saveAs(blob, filename);
}

// Convert image to PDF
export async function imageToPDF(file: File): Promise<Blob> {
  const pdfDoc = await PDFDocument.create();
  const arrayBuffer = await file.arrayBuffer();
  
  let image;
  if (file.type === 'image/png') {
    image = await pdfDoc.embedPng(arrayBuffer);
  } else if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
    image = await pdfDoc.embedJpg(arrayBuffer);
  } else {
    throw new Error('Unsupported image format. Use JPG or PNG.');
  }

  const page = pdfDoc.addPage([image.width, image.height]);
  page.drawImage(image, {
    x: 0,
    y: 0,
    width: image.width,
    height: image.height,
  });

  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes as BlobPart], { type: 'application/pdf' });
}

// Get PDF info (page count, etc.)
export async function getPDFInfo(file: File): Promise<{ pageCount: number; fileSize: number }> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  
  return {
    pageCount: pdf.getPageCount(),
    fileSize: file.size,
  };
}

// Organize PDF - reorder pages
export async function organizePDF(
  file: File,
  pageOrder: number[],
  rotations?: Record<number, number>
): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const newPdf = await PDFDocument.create();

  for (const pageIndex of pageOrder) {
    const [copiedPage] = await newPdf.copyPages(pdf, [pageIndex]);
    // pageIndex is 0-based, but rotations use 1-based page numbers
    const pageNumber = pageIndex + 1;
    if (rotations && rotations[pageNumber]) {
      copiedPage.setRotation(degrees(rotations[pageNumber]));
    }
    newPdf.addPage(copiedPage);
  }

  const pdfBytes = await newPdf.save();
  return new Blob([pdfBytes as BlobPart], { type: 'application/pdf' });
}

// Rotate specific pages
export async function rotateSpecificPages(
  file: File,
  pageRotations: Record<number, number>
): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const pages = pdf.getPages();

  pages.forEach((page, index) => {
    const pageNum = index + 1;
    if (pageRotations[pageNum]) {
      const currentRotation = page.getRotation().angle;
      page.setRotation(degrees((currentRotation + pageRotations[pageNum]) % 360));
    }
  });

  const pdfBytes = await pdf.save();
  return new Blob([pdfBytes as BlobPart], { type: 'application/pdf' });
}

// Convert multiple images to single PDF
export async function imagesToPDF(files: File[]): Promise<Blob> {
  const pdfDoc = await PDFDocument.create();

  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    
    let image;
    if (file.type === 'image/png') {
      image = await pdfDoc.embedPng(arrayBuffer);
    } else if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
      image = await pdfDoc.embedJpg(arrayBuffer);
    } else {
      throw new Error(`Unsupported image format: ${file.type}. Use JPG or PNG.`);
    }

    const page = pdfDoc.addPage([image.width, image.height]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: image.width,
      height: image.height,
    });
  }

  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes as BlobPart], { type: 'application/pdf' });
}

// Helper function to estimate text width (approximation)
// Note: This is a rough estimate. For precise positioning, pdf-lib's font metrics would be needed
// Using ~0.6 * fontSize as average character width works reasonably well for most fonts
function estimateTextWidth(text: string, fontSize: number): number {
  return text.length * fontSize * 0.6;
}

// Add page numbers to PDF
export async function addPageNumbers(
  file: File,
  position: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right',
  fontSize: number = 12,
  startPage: number = 1
): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const pages = pdf.getPages();

  pages.forEach((page, index) => {
    const pageNumber = index + startPage;
    const { width, height } = page.getSize();
    const text = `${pageNumber}`;
    const textWidth = estimateTextWidth(text, fontSize);

    // Calculate position
    let x = 0;
    let y = 0;
    const margin = 30;

    // Horizontal position
    if (position.includes('left')) {
      x = margin;
    } else if (position.includes('center')) {
      x = width / 2 - textWidth / 2;
    } else if (position.includes('right')) {
      x = width - margin - textWidth;
    }

    // Vertical position
    if (position.includes('top')) {
      y = height - margin;
    } else if (position.includes('bottom')) {
      y = margin;
    }

    page.drawText(text, {
      x,
      y,
      size: fontSize,
    });
  });

  const pdfBytes = await pdf.save();
  return new Blob([pdfBytes as BlobPart], { type: 'application/pdf' });
}

// Add text watermark to PDF
export async function addTextWatermark(
  file: File,
  text: string,
  opacity: number = 0.5,
  fontSize: number = 48
): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const pages = pdf.getPages();

  pages.forEach((page) => {
    const { width, height } = page.getSize();
    const textWidth = estimateTextWidth(text, fontSize);

    page.drawText(text, {
      x: width / 2 - textWidth / 2,
      y: height / 2,
      size: fontSize,
      opacity,
      rotate: degrees(45),
    });
  });

  const pdfBytes = await pdf.save();
  return new Blob([pdfBytes as BlobPart], { type: 'application/pdf' });
}

import { useRef, useState } from 'react';
import { usePDF } from 'react-to-pdf';

const usePDFExport = (filename = 'compound-interest-results.pdf') => {
  const targetRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState(null);
  
  const { toPDF } = usePDF({ filename });

  const exportToPDF = async () => {
    if (!targetRef.current) {
      console.error('No content to export');
      setExportError('No content to export');
      return;
    }

    setIsExporting(true);
    setExportError(null);

    try {
      await toPDF();
      console.log('PDF exported successfully');
    } catch (error) {
      console.error('Error exporting PDF:', error);
      setExportError('Failed to export PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return { targetRef, exportToPDF, isExporting, exportError };
};

export default usePDFExport;
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Plus, Minus, Table, Trash2, Maximize2, 
  Copy, Check 
} from 'lucide-react';

export function TableBuilder({ isOpen, onClose, onInsert }) {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [headers, setHeaders] = useState(['Header 1', 'Header 2', 'Header 3']);
  const [cellData, setCellData] = useState([
    ['Row 1 Col 1', 'Row 1 Col 2', 'Row 1 Col 3'],
    ['Row 2 Col 1', 'Row 2 Col 2', 'Row 2 Col 3'],
  ]);
  const [alignment, setAlignment] = useState('default');
  const [showPreview, setShowPreview] = useState(true);

  useEffect(() => {
    if (isOpen) {
      // Reset to defaults when opening
      setRows(3);
      setCols(3);
      setHeaders(['Header 1', 'Header 2', 'Header 3']);
      setCellData([
        ['Row 1 Col 1', 'Row 1 Col 2', 'Row 1 Col 3'],
        ['Row 2 Col 1', 'Row 2 Col 2', 'Row 2 Col 3'],
      ]);
      setAlignment('default');
    }
  }, [isOpen]);

  // Update headers when columns change
  useEffect(() => {
    if (headers.length !== cols) {
      const newHeaders = [...headers];
      while (newHeaders.length < cols) {
        newHeaders.push(`Header ${newHeaders.length + 1}`);
      }
      while (newHeaders.length > cols) {
        newHeaders.pop();
      }
      setHeaders(newHeaders);
    }
  }, [cols]);

  // Update cell data when rows or columns change
  useEffect(() => {
    // Remove extra rows
    while (cellData.length > rows) {
      cellData.pop();
    }
    // Add rows if needed
    while (cellData.length < rows) {
      const newRow = [];
      for (let i = 0; i < cols; i++) {
        newRow.push(`Row ${cellData.length + 1} Col ${i + 1}`);
      }
      cellData.push(newRow);
    }
    // Adjust columns in each row
    cellData.forEach((row, rowIndex) => {
      while (row.length > cols) {
        row.pop();
      }
      while (row.length < cols) {
        row.push(`Row ${rowIndex + 1} Col ${row.length + 1}`);
      }
    });
    // Force re-render
    setCellData([...cellData]);
  }, [rows, cols]);

  const updateCell = (rowIndex, colIndex, value) => {
    const newData = [...cellData];
    newData[rowIndex][colIndex] = value;
    setCellData(newData);
  };

  const updateHeader = (index, value) => {
    const newHeaders = [...headers];
    newHeaders[index] = value;
    setHeaders(newHeaders);
  };

  const addRow = () => {
    const newRow = [];
    for (let i = 0; i < cols; i++) {
      newRow.push(`Row ${rows + 1} Col ${i + 1}`);
    }
    setCellData([...cellData, newRow]);
    setRows(rows + 1);
  };

  const removeRow = (index) => {
    if (rows <= 1) return;
    const newData = cellData.filter((_, i) => i !== index);
    setCellData(newData);
    setRows(rows - 1);
  };

  const addCol = () => {
    const newHeaders = [...headers, `Header ${cols + 1}`];
    setHeaders(newHeaders);
    const newData = cellData.map((row, rowIndex) => [
      ...row,
      `Row ${rowIndex + 1} Col ${cols + 1}`
    ]);
    setCellData(newData);
    setCols(cols + 1);
  };

  const removeCol = (index) => {
    if (cols <= 1) return;
    const newHeaders = headers.filter((_, i) => i !== index);
    setHeaders(newHeaders);
    const newData = cellData.map(row => row.filter((_, i) => i !== index));
    setCellData(newData);
    setCols(cols - 1);
  };

  const generateMarkdown = () => {
    // Build header row
    let markdown = '| ' + headers.join(' | ') + ' |\n';
    // Build separator row
    let separator = '|';
    for (let i = 0; i < headers.length; i++) {
      switch (alignment) {
        case 'left':
          separator += ' :--- |';
          break;
        case 'center':
          separator += ' :---: |';
          break;
        case 'right':
          separator += ' ---: |';
          break;
        default:
          separator += ' --- |';
      }
    }
    markdown += separator + '\n';
    // Build data rows
    cellData.forEach(row => {
      markdown += '| ' + row.join(' | ') + ' |\n';
    });
    return markdown;
  };

  const insertTable = () => {
    const tableMarkdown = generateMarkdown();
    onInsert(tableMarkdown);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25 }}
          className="bg-[#1a1a2e] rounded-3xl border border-[#2a2a4a]/50 shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-[#2a2a4a]/50">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#bd93f9]/20 flex items-center justify-center">
                <Table className="h-4 w-4 text-[#bd93f9]" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-[#f8f8f2]">Table Builder</h2>
                <p className="text-[10px] text-[#6272a4]">Design your table visually</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#6272a4] hover:text-[#f8f8f2] hover:bg-[#2a2a4a]/50 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="p-4 overflow-y-auto max-h-[65vh]">
            {/* Controls */}
            <div className="flex flex-wrap items-center gap-3 mb-4 p-3 bg-[#0f0e1a] rounded-2xl border border-[#2a2a4a]/30">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[#6272a4] uppercase tracking-wider">Rows:</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setRows(Math.max(1, rows - 1))}
                    className="p-1 rounded-lg bg-[#2a2a4a]/50 hover:bg-[#2a2a4a] text-[#6272a4] hover:text-[#f8f8f2] transition-colors"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-8 text-center text-sm text-[#f8f8f2]">{rows}</span>
                  <button
                    onClick={addRow}
                    className="p-1 rounded-lg bg-[#2a2a4a]/50 hover:bg-[#2a2a4a] text-[#6272a4] hover:text-[#f8f8f2] transition-colors"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </div>

              <div className="w-px h-6 bg-[#2a2a4a]/50" />

              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[#6272a4] uppercase tracking-wider">Cols:</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCols(Math.max(1, cols - 1))}
                    className="p-1 rounded-lg bg-[#2a2a4a]/50 hover:bg-[#2a2a4a] text-[#6272a4] hover:text-[#f8f8f2] transition-colors"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-8 text-center text-sm text-[#f8f8f2]">{cols}</span>
                  <button
                    onClick={addCol}
                    className="p-1 rounded-lg bg-[#2a2a4a]/50 hover:bg-[#2a2a4a] text-[#6272a4] hover:text-[#f8f8f2] transition-colors"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </div>

              <div className="w-px h-6 bg-[#2a2a4a]/50" />

              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[#6272a4] uppercase tracking-wider">Align:</span>
                <div className="flex gap-1">
                  {[
                    { id: 'default', label: 'Default' },
                    { id: 'left', label: 'Left' },
                    { id: 'center', label: 'Center' },
                    { id: 'right', label: 'Right' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setAlignment(opt.id)}
                      className={`px-2 py-1 rounded-lg text-xs transition-colors ${
                        alignment === opt.id
                          ? 'bg-[#bd93f9]/20 text-[#bd93f9]'
                          : 'text-[#6272a4] hover:text-[#f8f8f2] hover:bg-[#2a2a4a]/50'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setShowPreview(!showPreview)}
                className={`ml-auto px-3 py-1.5 rounded-xl text-xs transition-colors flex items-center gap-1.5 ${
                  showPreview
                    ? 'bg-[#bd93f9]/20 text-[#bd93f9]'
                    : 'text-[#6272a4] hover:text-[#f8f8f2] hover:bg-[#2a2a4a]/50'
                }`}
              >
                {showPreview ? 'Hide Preview' : 'Show Preview'}
              </button>
            </div>

            {/* Table Editor */}
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr>
                    {headers.map((header, colIndex) => (
                      <th key={colIndex} className="border border-[#2a2a4a] bg-[#0f0e1a] p-1">
                        <div className="flex items-center gap-1">
                          <input
                            type="text"
                            value={header}
                            onChange={(e) => updateHeader(colIndex, e.target.value)}
                            className="w-full bg-transparent text-center text-xs text-[#bd93f9] outline-none focus:ring-1 focus:ring-[#bd93f9] rounded px-1 py-1"
                            placeholder="Header"
                          />
                          <button
                            onClick={() => removeCol(colIndex)}
                            className="p-0.5 rounded text-[#6272a4] hover:text-[#ff5555] hover:bg-[#ff5555]/20 transition-colors"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cellData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, colIndex) => (
                        <td key={colIndex} className="border border-[#2a2a4a] p-1">
                          <div className="flex items-center gap-1">
                            <input
                              type="text"
                              value={cell}
                              onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
                              className="w-full bg-transparent text-center text-xs text-[#f8f8f2] outline-none focus:ring-1 focus:ring-[#bd93f9] rounded px-1 py-1"
                              placeholder="Cell"
                            />
                            {rowIndex === cellData.length - 1 && colIndex === 0 && (
                              <button
                                onClick={() => removeRow(rowIndex)}
                                className="p-0.5 rounded text-[#6272a4] hover:text-[#ff5555] hover:bg-[#ff5555]/20 transition-colors"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            )}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Preview */}
            {showPreview && (
              <div className="bg-[#0f0e1a] rounded-2xl border border-[#2a2a4a]/30 p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] text-[#6272a4] uppercase tracking-wider flex items-center gap-1.5">
                    <Maximize2 className="h-3 w-3" />
                    Preview
                  </span>
                  <button
                    onClick={() => navigator.clipboard.writeText(generateMarkdown())}
                    className="text-[10px] text-[#6272a4] hover:text-[#f8f8f2] flex items-center gap-1"
                  >
                    <Copy className="h-3 w-3" />
                    Copy
                  </button>
                </div>
                <pre className="text-xs text-[#f8f8f2] font-mono whitespace-pre-wrap bg-[#1a1a2e] p-3 rounded-xl border border-[#2a2a4a]/30 overflow-x-auto">
                  {generateMarkdown()}
                </pre>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-[#2a2a4a]/50 flex justify-between items-center">
            <div className="text-[10px] text-[#6272a4]">
              {rows} rows × {cols} columns
            </div>
            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-medium text-[#6272a4] hover:text-[#f8f8f2] hover:bg-[#2a2a4a]/50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={insertTable}
                className="px-4 py-2 rounded-xl text-xs font-medium bg-[#bd93f9] text-[#0f0e1a] hover:bg-[#bd93f9]/90 transition-colors flex items-center gap-2"
              >
                <Check className="h-3.5 w-3.5" />
                Insert Table
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
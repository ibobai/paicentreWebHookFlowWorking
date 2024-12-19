import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FileSpreadsheet, X, Star, Download } from 'lucide-react';
import { ExportConfirmationDialog } from './ExportConfirmationDialog';
import { DownloadConfirmationDialog } from './DownloadConfirmationDialog';
import { DateRangeSelect } from './DateRangeSelect';
import toast from 'react-hot-toast';

interface ExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (startDate: Date | null, endDate: Date | null) => void;
  onDownload: (startDate: Date | null, endDate: Date | null) => void;
}

export function ExportDialog({ isOpen, onClose, onExport, onDownload }: ExportDialogProps) {
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showDownloadConfirmation, setShowDownloadConfirmation] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [files] = useState(() => {
    const saved = localStorage.getItem('excelFiles');
    return saved ? JSON.parse(saved) : [];
  });

  const defaultFile = files.find((file: any) => file.isDefault);
  const selectedFile = selectedFileId 
    ? files.find((file: any) => file.id === selectedFileId)
    : defaultFile;

  const handleExportClick = () => {
    if (!selectedFile) {
      toast.error('Please select a file to export to');
      return;
    }
    setShowConfirmation(true);
  };

  const handleConfirmExport = () => {
    onExport(startDate, endDate);
    setShowConfirmation(false);
  };

  const handleDownloadClick = () => {
    setShowDownloadConfirmation(true);
  };

  const handleConfirmDownload = () => {
    onDownload(startDate, endDate);
    setShowDownloadConfirmation(false);
  };

  return (
    <>
      <Transition show={isOpen} as={React.Fragment}>
        <Dialog onClose={onClose} className="relative z-50">
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 h-32" />
                    <div className="relative px-6 pt-8 pb-4">
                      <div className="flex items-center justify-between">
                        <Dialog.Title className="text-xl font-semibold flex items-center text-white">
                          <FileSpreadsheet className="h-6 w-6 mr-2" />
                          Export to Excel
                        </Dialog.Title>
                        <button
                          onClick={onClose}
                          className="text-white/80 hover:text-white transition-colors"
                        >
                          <X className="h-6 w-6" />
                        </button>
                      </div>
                      <p className="mt-1 text-blue-100">
                        Select date range and destination for your Excel file
                      </p>
                    </div>
                  </div>

                  <div className="px-6 py-4">
                    <div className="space-y-6">
                      {/* Date Range Selection */}
                      <div className="bg-gray-50 rounded-xl p-4">
                        <h3 className="text-sm font-medium text-gray-900 mb-3">Date Range</h3>
                        <DateRangeSelect
                          startDate={startDate}
                          endDate={endDate}
                          onStartDateChange={setStartDate}
                          onEndDateChange={setEndDate}
                        />
                      </div>

                      {/* File Selection Table */}
                      <div className="overflow-hidden rounded-xl border border-gray-200">
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                              <tr className="bg-gray-50">
                                <th className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  File Name
                                </th>
                                <th className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Location
                                </th>
                                <th className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Type
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {files.map((file: any) => (
                                <tr
                                  key={file.id}
                                  onClick={() => setSelectedFileId(file.id)}
                                  className={`cursor-pointer transition-colors ${
                                    selectedFileId === file.id || (file.isDefault && !selectedFileId)
                                      ? 'bg-blue-50'
                                      : 'hover:bg-gray-50'
                                  }`}
                                >
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                      <div className={`p-2 rounded-lg ${
                                        file.isDefault ? 'bg-blue-100' : 'bg-gray-100'
                                      }`}>
                                        <FileSpreadsheet className={`h-5 w-5 ${
                                          file.isDefault ? 'text-blue-600' : 'text-gray-500'
                                        }`} />
                                      </div>
                                      <span className="ml-3 text-sm font-medium text-gray-900">
                                        {file.name}
                                      </span>
                                      {file.isDefault && (
                                        <div className="ml-2 flex items-center text-blue-600">
                                          <Star className="h-4 w-4 mr-1" />
                                          <span className="text-xs font-medium">Default</span>
                                        </div>
                                      )}
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-sm text-gray-500">{file.location}</span>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${
                                      file.type === 'local'
                                        ? 'bg-blue-100 text-blue-700'
                                        : file.type === 'google-drive'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-purple-100 text-purple-700'
                                    }`}>
                                      {file.type === 'local' ? 'Local'
                                        : file.type === 'google-drive' ? 'Google Drive'
                                        : 'Dropbox'}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                        <button
                          onClick={handleDownloadClick}
                          className="flex items-center px-4 py-2.5 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          <Download className="h-5 w-5 mr-2" />
                          Download as Excel
                        </button>
                        
                        <div className="flex items-center gap-3">
                          <button
                            onClick={onClose}
                            className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-700"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleExportClick}
                            disabled={!files.length}
                            className={`flex items-center px-6 py-2.5 text-sm font-medium text-white rounded-lg transition-colors ${
                              files.length
                                ? 'bg-blue-600 hover:bg-blue-700'
                                : 'bg-gray-400 cursor-not-allowed'
                            }`}
                          >
                            <FileSpreadsheet className="h-5 w-5 mr-2" />
                            Export Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <ExportConfirmationDialog
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmExport}
        fileName={selectedFile?.name || ''}
      />

      <DownloadConfirmationDialog
        isOpen={showDownloadConfirmation}
        onClose={() => setShowDownloadConfirmation(false)}
        onConfirm={handleConfirmDownload}
      />
    </>
  );
}
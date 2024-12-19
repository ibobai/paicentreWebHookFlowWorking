import { Search, Plus, Download, Info } from 'lucide-react';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface PaymentTableControlsProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onAddPayment: () => void;
  onExportClick: () => void;
  autoExport: boolean;
  onAutoExportChange: (value: boolean) => void;
}

export function PaymentTableControls({
  searchQuery,
  onSearchChange,
  onAddPayment,
  onExportClick,
  autoExport,
  onAutoExportChange
}: PaymentTableControlsProps) {
  const [hasDefaultFile, setHasDefaultFile] = useState(false);

  useEffect(() => {
    const checkDefaultFile = () => {
      const files = JSON.parse(localStorage.getItem('excelFiles') || '[]');
      const hasDefault = files.some((file: any) => file.isDefault);
      setHasDefaultFile(hasDefault);
      
      if (!hasDefault && autoExport) {
        onAutoExportChange(false);
        toast.error('Auto-export disabled: No default Excel file set');
      }
    };

    checkDefaultFile();
    window.addEventListener('storage', checkDefaultFile);
    return () => window.removeEventListener('storage', checkDefaultFile);
  }, [autoExport, onAutoExportChange]);

  const handleAutoExportChange = (checked: boolean) => {
    if (checked && !hasDefaultFile) {
      toast.error('Please set a default Excel file in Data Management settings first');
      return;
    }
    onAutoExportChange(checked);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
      <button
        onClick={onAddPayment}
        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
      >
        <Plus size={20} />
        Add Payment
      </button>

      <div className="flex-1 max-w-xl">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search transactions..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onExportClick}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download size={20} />
            Export to Excel
          </button>
          <div className="relative flex items-center gap-2">
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
              autoExport 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              <div className="relative group">
                <Info size={16} className={`cursor-help transition-colors duration-200 ${
                  autoExport ? 'text-green-500' : 'text-red-500'
                }`} />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-72 z-10">
                  <div className="bg-gray-900 text-white text-sm rounded-lg p-3">
                    <p className="font-medium mb-1">Auto-Export Feature</p>
                    <p className="text-gray-300 text-xs leading-relaxed">
                      When enabled, new payment entries will be automatically added to your default Excel file. 
                      {!hasDefaultFile && ' Set a default file in Data Management settings to enable this feature.'}
                    </p>
                    <div className="absolute w-2 h-2 bg-gray-900 transform rotate-45 left-1/2 -translate-x-1/2 bottom-[-4px]"></div>
                  </div>
                </div>
              </div>
              <span className={`text-sm font-medium transition-colors duration-200 ${
                autoExport ? 'text-green-600' : 'text-red-600'
              }`}>
                Auto-Export
              </span>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoExport}
                  onChange={(e) => handleAutoExportChange(e.target.checked)}
                  className="sr-only peer"
                  disabled={!hasDefaultFile}
                />
                <div className={`relative w-11 h-6 rounded-full transition-all duration-200
                  after:content-[''] after:absolute after:top-[2px] after:start-[2px] 
                  after:bg-white after:border-gray-300 after:border after:rounded-full 
                  after:h-5 after:w-5 after:transition-all
                  peer-focus:outline-none peer-focus:ring-4
                  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full
                  peer-checked:after:border-white
                  ${!hasDefaultFile ? 'opacity-50 cursor-not-allowed' : ''}
                  ${autoExport 
                    ? 'bg-green-500 peer-focus:ring-green-300' 
                    : 'bg-red-500 peer-focus:ring-red-300'
                  }`}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import { Link } from 'react-router-dom';
import { Database, FileSpreadsheet, Save, ArrowLeft } from 'lucide-react';
import { CollapsibleSection } from '../../components/settings/CollapsibleSection';
import { ExcelFileSettings } from '../../components/settings/ExcelFileSettings';
import { useState } from 'react';
import toast from 'react-hot-toast';

export function DataManagementPage() {
  const [autoBackup, setAutoBackup] = useState(() => {
    return localStorage.getItem('autoBackup') === 'true';
  });

  const handleAutoBackupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAutoBackup(e.target.checked);
    localStorage.setItem('autoBackup', e.target.checked.toString());
    toast.success(`Auto backup ${e.target.checked ? 'enabled' : 'disabled'}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link 
        to="/settings" 
        className="inline-flex items-center text-blue-600 hover:text-blue-700"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Settings
      </Link>

      <div className="flex items-center">
        <Database className="h-8 w-8 text-gray-700 mr-3" />
        <h1 className="text-2xl font-bold text-gray-900">Data Management</h1>
      </div>

      <div className="space-y-6">
        <CollapsibleSection
          title="Excel File Management"
          icon={<FileSpreadsheet className="h-6 w-6" />}
          defaultOpen
        >
          <ExcelFileSettings />
        </CollapsibleSection>

        <CollapsibleSection
          title="Backup Settings"
          icon={<Save className="h-6 w-6" />}
        >
          <div className="space-y-4">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={autoBackup}
                onChange={handleAutoBackupChange}
                className="form-checkbox text-blue-600 rounded"
              />
              <span>Automatic daily backup</span>
            </label>
            <p className="text-sm text-gray-500">
              When enabled, your data will be automatically backed up every 24 hours.
            </p>
          </div>
        </CollapsibleSection>
      </div>
    </div>
  );
}
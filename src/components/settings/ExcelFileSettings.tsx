import { useState, useRef } from 'react';
import { FileSpreadsheet, Plus, Trash2, Link as LinkIcon, Star, Edit2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { DeleteConfirmationDialog } from '../payment/DeleteConfirmationDialog';

interface ExcelFile {
  id: string;
  name: string;
  location: string;
  type: 'local' | 'google-drive' | 'dropbox';
  isDefault?: boolean;
}

export function ExcelFileSettings() {
  const [excelFiles, setExcelFiles] = useState<ExcelFile[]>(() => {
    const saved = localStorage.getItem('excelFiles');
    return saved ? JSON.parse(saved) : [];
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingFile, setEditingFile] = useState<ExcelFile | null>(null);
  const [deleteFile, setDeleteFile] = useState<ExcelFile | null>(null);
  const [newFile, setNewFile] = useState({
    name: '',
    location: '',
    type: 'local' as const
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddFile = () => {
    if (newFile.name && newFile.location) {
      const file: ExcelFile = {
        id: Date.now().toString(),
        name: newFile.name,
        location: newFile.location,
        type: newFile.type,
        isDefault: excelFiles.length === 0 // First file is default
      };
      
      const updatedFiles = [...excelFiles, file];
      setExcelFiles(updatedFiles);
      localStorage.setItem('excelFiles', JSON.stringify(updatedFiles));
      
      setNewFile({ name: '', location: '', type: 'local' });
      setShowAddForm(false);
      toast.success('Excel file added successfully');
    }
  };

  const handleDeleteConfirm = () => {
    if (deleteFile) {
      const updatedFiles = excelFiles.filter(file => file.id !== deleteFile.id);
      setExcelFiles(updatedFiles);
      localStorage.setItem('excelFiles', JSON.stringify(updatedFiles));
      toast.success('Excel file removed successfully');
      setDeleteFile(null);
    }
  };

  const handleSetDefault = (id: string) => {
    const updatedFiles = excelFiles.map(file => ({
      ...file,
      isDefault: file.id === id
    }));
    setExcelFiles(updatedFiles);
    localStorage.setItem('excelFiles', JSON.stringify(updatedFiles));
    toast.success('Default file updated successfully');
  };

  const handleEditFile = (file: ExcelFile) => {
    setEditingFile(file);
    setNewFile({
      name: file.name,
      location: file.location,
      type: file.type
    });
    setShowAddForm(true);
  };

  const handleSaveEdit = () => {
    if (editingFile && newFile.name && newFile.location) {
      const updatedFiles = excelFiles.map(file => 
        file.id === editingFile.id
          ? { ...file, name: newFile.name, location: newFile.location, type: newFile.type }
          : file
      );
      setExcelFiles(updatedFiles);
      localStorage.setItem('excelFiles', JSON.stringify(updatedFiles));
      setEditingFile(null);
      setNewFile({ name: '', location: '', type: 'local' });
      setShowAddForm(false);
      toast.success('Excel file updated successfully');
    }
  };

  const handleLocalFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewFile(prev => ({
        ...prev,
        name: file.name,
        location: `C:/Users/Downloads/${file.name}` // Simulated local path
      }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Excel Files Table */}
      {excelFiles.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  File Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {excelFiles.map(file => (
                <tr key={file.id} className={file.isDefault ? 'bg-blue-50' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FileSpreadsheet className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900">
                        {file.name}
                      </span>
                      {file.isDefault && (
                        <span className="ml-2 px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
                          Default File
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-500">{file.location}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      file.type === 'local'
                        ? 'bg-blue-100 text-blue-800'
                        : file.type === 'google-drive'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {file.type === 'local' ? 'Local'
                        : file.type === 'google-drive' ? 'Google Drive'
                        : 'Dropbox'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center space-x-3">
                      {!file.isDefault && (
                        <button
                          onClick={() => handleSetDefault(file.id)}
                          className="p-1 text-gray-400 hover:text-blue-600"
                          title="Set as default"
                        >
                          <Star className="h-5 w-5" />
                        </button>
                      )}
                      <button
                        onClick={() => handleEditFile(file)}
                        className="p-1 text-blue-600 hover:text-blue-700"
                        title="Edit file"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => setDeleteFile(file)}
                        className="p-1 text-red-600 hover:text-red-700"
                        title="Delete file"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add New File Form */}
      {showAddForm ? (
        <div className="space-y-4 p-6 bg-gray-50 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              File Name
            </label>
            <input
              type="text"
              value={newFile.name}
              onChange={(e) => setNewFile({ ...newFile, name: e.target.value })}
              placeholder="Enter file name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Storage Type
            </label>
            <select
              value={newFile.type}
              onChange={(e) => setNewFile({ ...newFile, type: e.target.value as ExcelFile['type'] })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="local">Local Storage</option>
              <option value="google-drive">Google Drive</option>
              <option value="dropbox">Dropbox</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              File Location
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newFile.location}
                onChange={(e) => setNewFile({ ...newFile, location: e.target.value })}
                placeholder={
                  newFile.type === 'local' 
                    ? 'C:/path/to/file.xlsx' 
                    : newFile.type === 'google-drive'
                    ? 'https://drive.google.com/file/...'
                    : 'https://dropbox.com/...'
                }
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {newFile.type === 'local' && (
                <button
                  onClick={handleLocalFileSelect}
                  className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
                >
                  Browse
                </button>
              )}
            </div>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            accept=".xlsx,.xls"
            className="hidden"
          />

          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => {
                setShowAddForm(false);
                setEditingFile(null);
                setNewFile({ name: '', location: '', type: 'local' });
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={editingFile ? handleSaveEdit : handleAddFile}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              {editingFile ? 'Save Changes' : 'Add File'}
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Excel File
        </button>
      )}

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={!!deleteFile}
        onClose={() => setDeleteFile(null)}
        onConfirm={handleDeleteConfirm}
        paymentId={deleteFile?.name || ''}
      />
    </div>
  );
}
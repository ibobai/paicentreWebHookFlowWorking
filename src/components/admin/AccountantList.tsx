import { useState, useEffect } from 'react';
import { Trash2, Edit2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface Accountant {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
}

export function AccountantList() {
  const [accountants, setAccountants] = useState<Accountant[]>(() => {
    const saved = localStorage.getItem('accountants');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('accountants', JSON.stringify(accountants));
  }, [accountants]);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this accountant?')) {
      setAccountants(accountants.filter(a => a.id !== id));
      toast.success('Accountant deleted successfully');
    }
  };

  const toggleStatus = (id: string) => {
    setAccountants(accountants.map(a => {
      if (a.id === id) {
        const newStatus = a.status === 'active' ? 'inactive' : 'active';
        toast.success(`Accountant status changed to ${newStatus}`);
        return { ...a, status: newStatus };
      }
      return a;
    }));
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {accountants.map((accountant) => (
                <tr key={accountant.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {accountant.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {accountant.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {accountant.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleStatus(accountant.id)}
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        accountant.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {accountant.status}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleDelete(accountant.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
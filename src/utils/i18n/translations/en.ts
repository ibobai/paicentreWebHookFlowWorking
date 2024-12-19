export const en = {
  dashboard: {
    welcome: "Welcome to PaiCentre",
    subtitle: "Your Central Payment Management Hub",
    description: "Manage all your payment transactions in one place with real-time updates and comprehensive reporting.",
    features: {
      centralization: "Centralized Management",
      automation: "Automated Reports",
      realtime: "Real-time Updates",
      integration: "Platform Integration"
    }
  },
  nav: {
    home: "Home",
    payments: "Payments",
    about: "About Us",
    contact: "Contact",
    profile: "Profile",
    settings: "Settings"
  },
  payments: {
    title: "Payment Transactions",
    totalRevenue: "Total Revenue",
    totalTransactions: "Total Transactions",
    successRate: "Success Rate",
    exportExcel: "Export to Excel",
    date: "Date",
    id: "ID",
    customer: "Customer",
    customerName: "Customer Name",
    customerEmail: "Customer Email",
    product: "Product",
    productName: "Product Name",
    amount: "Amount",
    provider: "Provider",
    status: "Status",
    search: "Search transactions...",
    settings: "Export Settings",
    addPayment: "Add Payment",
    addNewPayment: "Add New Payment",
    add: "Add Payment",
    statusSucceeded: "Succeeded",
    statusPending: "Pending",
    statusFailed: "Failed",
    showing: "Showing {from} to {to} of {total} results"
  },
  reports: {
    title: "Payment Reports",
    startDate: "Start Date",
    endDate: "End Date",
    check: "Check Report",
    generate: "Generate PDF",
    summary: "Report Summary",
    period: "Report Period",
    totalTransactions: "Total Transactions",
    successfulTransactions: "Successful Transactions",
    totalAmount: "Total Amount"
  },
  export: {
    title: "Export Settings",
    existingFile: "Existing Excel File (Optional)",
    chooseFile: "Choose file...",
    invalidFileType: "Please select a valid Excel file (.xlsx)",
    error: "An error occurred while processing the file",
    export: "Export",
    autoExport: "Automatically export new payments to Excel",
    location: "Export Location",
    selectLocation: "Select location...",
    localStorage: "Local Storage",
    googleDrive: "Google Drive",
    dropbox: "Dropbox",
    oneDrive: "OneDrive"
  },
  common: {
    cancel: "Cancel",
    save: "Save Changes",
    delete: "Delete",
    edit: "Edit"
  }
} as const;
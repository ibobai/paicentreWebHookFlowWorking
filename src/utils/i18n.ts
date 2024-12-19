export type Language = 'en' | 'fr';

export const translations = {
  en: {
    nav: {
      home: 'Home',
      payments: 'Payments',
      about: 'About Us',
      contact: 'Contact Us',
      profile: 'Profile',
      settings: 'Settings'
    },
    auth: {
      login: {
        title: 'Sign in to PaiCentre',
        email: 'Email address',
        password: 'Password',
        submit: 'Sign in',
        registerLink: "Don't have an account? Register here",
        invalidCredentials: 'Invalid email or password'
      },
      register: {
        title: 'Create your account',
        name: 'Full Name',
        email: 'Email address',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        submit: 'Register',
        loginLink: 'Already have an account? Sign in here'
      }
    },
    common: {
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit'
    },
    payments: {
      title: 'Payment Transactions',
      totalRevenue: 'Total Revenue',
      totalTransactions: 'Total Transactions',
      successRate: 'Success Rate',
      exportExcel: 'Export to Excel',
      date: 'Date',
      id: 'ID',
      customer: 'Customer',
      customerName: 'Customer Name',
      customerEmail: 'Customer Email',
      product: 'Product',
      productName: 'Product Name',
      amount: 'Amount',
      provider: 'Provider',
      status: 'Status',
      search: 'Search in all columns...',
      settings: 'Export Settings',
      addPayment: 'Add Payment',
      addNewPayment: 'Add New Payment',
      add: 'Add Payment',
      statusSucceeded: 'Succeeded',
      statusPending: 'Pending',
      statusFailed: 'Failed',
      showing: 'Showing {from} to {to} of {total} results'
    },
    export: {
      title: 'Export Payments',
      existingFile: 'Existing Excel File (Optional)',
      chooseFile: 'Choose file...',
      invalidFileType: 'Please select a valid Excel file (.xlsx)',
      error: 'An error occurred while processing the file',
      export: 'Export'
    }
  },
  fr: {
    nav: {
      home: 'Accueil',
      payments: 'Paiements',
      about: 'À Propos',
      contact: 'Contact',
      profile: 'Profil',
      settings: 'Paramètres'
    },
    auth: {
      login: {
        title: 'Connexion à PaiCentre',
        email: 'Adresse email',
        password: 'Mot de passe',
        submit: 'Se connecter',
        registerLink: "Pas de compte ? S'inscrire ici",
        invalidCredentials: 'Email ou mot de passe invalide'
      },
      register: {
        title: 'Créer votre compte',
        name: 'Nom complet',
        email: 'Adresse email',
        password: 'Mot de passe',
        confirmPassword: 'Confirmer le mot de passe',
        submit: "S'inscrire",
        loginLink: 'Déjà un compte ? Se connecter ici'
      }
    },
    common: {
      cancel: 'Annuler',
      save: 'Enregistrer',
      delete: 'Supprimer',
      edit: 'Modifier'
    },
    payments: {
      title: 'Transactions de Paiement',
      totalRevenue: 'Revenu Total',
      totalTransactions: 'Transactions Totales',
      successRate: 'Taux de Réussite',
      exportExcel: 'Exporter vers Excel',
      date: 'Date',
      id: 'ID',
      customer: 'Client',
      customerName: 'Nom du client',
      customerEmail: 'Email du client',
      product: 'Produit',
      productName: 'Nom du produit',
      amount: 'Montant',
      provider: 'Fournisseur',
      status: 'Statut',
      search: 'Rechercher dans toutes les colonnes...',
      settings: "Paramètres d'exportation",
      addPayment: 'Ajouter un paiement',
      addNewPayment: 'Ajouter un nouveau paiement',
      add: 'Ajouter',
      statusSucceeded: 'Réussi',
      statusPending: 'En attente',
      statusFailed: 'Échoué',
      showing: 'Affichage de {from} à {to} sur {total} résultats'
    },
    export: {
      title: 'Exporter les paiements',
      existingFile: 'Fichier Excel existant (Optionnel)',
      chooseFile: 'Choisir un fichier...',
      invalidFileType: 'Veuillez sélectionner un fichier Excel valide (.xlsx)',
      error: 'Une erreur est survenue lors du traitement du fichier',
      export: 'Exporter'
    }
  }
};
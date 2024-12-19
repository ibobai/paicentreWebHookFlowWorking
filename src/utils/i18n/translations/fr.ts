export const fr = {
  dashboard: {
    welcome: "Bienvenue sur PaiCentre",
    subtitle: "Votre Hub Central de Gestion des Paiements",
    description: "Gérez toutes vos transactions de paiement en un seul endroit avec des mises à jour en temps réel et des rapports complets.",
    features: {
      centralization: "Gestion Centralisée",
      automation: "Rapports Automatisés",
      realtime: "Mises à Jour en Temps Réel",
      integration: "Intégration de Plateformes"
    }
  },
  nav: {
    home: "Accueil",
    payments: "Paiements",
    about: "À Propos",
    contact: "Contact",
    profile: "Profil",
    settings: "Paramètres"
  },
  payments: {
    title: "Transactions de Paiement",
    totalRevenue: "Revenu Total",
    totalTransactions: "Transactions Totales",
    successRate: "Taux de Réussite",
    exportExcel: "Exporter vers Excel",
    date: "Date",
    id: "ID",
    customer: "Client",
    customerName: "Nom du client",
    customerEmail: "Email du client",
    product: "Produit",
    productName: "Nom du produit",
    amount: "Montant",
    provider: "Fournisseur",
    status: "Statut",
    search: "Rechercher des transactions...",
    settings: "Paramètres d'exportation",
    addPayment: "Ajouter un paiement",
    addNewPayment: "Ajouter un nouveau paiement",
    add: "Ajouter",
    statusSucceeded: "Réussi",
    statusPending: "En attente",
    statusFailed: "Échoué",
    showing: "Affichage de {from} à {to} sur {total} résultats"
  },
  reports: {
    title: "Rapports de Paiement",
    startDate: "Date de début",
    endDate: "Date de fin",
    check: "Vérifier le rapport",
    generate: "Générer PDF",
    summary: "Résumé du rapport",
    period: "Période du rapport",
    totalTransactions: "Total des transactions",
    successfulTransactions: "Transactions réussies",
    totalAmount: "Montant total"
  },
  export: {
    title: "Paramètres d'exportation",
    existingFile: "Fichier Excel existant (Optionnel)",
    chooseFile: "Choisir un fichier...",
    invalidFileType: "Veuillez sélectionner un fichier Excel valide (.xlsx)",
    error: "Une erreur est survenue lors du traitement du fichier",
    export: "Exporter",
    autoExport: "Exporter automatiquement les nouveaux paiements vers Excel",
    location: "Emplacement d'exportation",
    selectLocation: "Sélectionner un emplacement...",
    localStorage: "Stockage Local",
    googleDrive: "Google Drive",
    dropbox: "Dropbox",
    oneDrive: "OneDrive"
  },
  common: {
    cancel: "Annuler",
    save: "Enregistrer les modifications",
    delete: "Supprimer",
    edit: "Modifier"
  }
} as const;
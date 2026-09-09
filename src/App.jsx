import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import ModulAjarWizard from './components/ModulAjarWizard';
import DocumentPreview from './components/DocumentPreview';
import BankPerangkat from './components/BankPerangkat';
import TemplateCatalog from './components/TemplateCatalog';
import AIAssistantModal from './components/AIAssistantModal';
import MateriAjarManager from './components/MateriAjarManager';
import ProtaManager from './components/ProtaManager';
import ProsemManager from './components/ProsemManager';
import { PRESET_TEMPLATES } from './data/presetTemplates';
import { exportProtaToWord, exportProsemToWord } from './utils/exportUtils';

const LOCAL_STORAGE_KEY = 'perangkat_pembelajaran_docs_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [documents, setDocuments] = useState([]);
  const [currentDoc, setCurrentDoc] = useState(null);

  // Load documents from LocalStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        setDocuments(JSON.parse(stored));
      } else {
        setDocuments(PRESET_TEMPLATES);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(PRESET_TEMPLATES));
      }
    } catch (e) {
      console.error('Error loading documents:', e);
      setDocuments(PRESET_TEMPLATES);
    }
  }, []);

  // Save documents to LocalStorage whenever updated
  const saveDocumentsToStorage = (updatedDocs) => {
    setDocuments(updatedDocs);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedDocs));
    } catch (e) {
      console.error('Error saving to localStorage:', e);
    }
  };

  const handleSaveDocument = (docToSave) => {
    const nowStr = new Date().toLocaleDateString('id-ID', {
      day: 'numeric', month: 'short', year: 'numeric'
    });

    const docWithTimestamp = {
      ...docToSave,
      updatedAt: nowStr
    };

    const existingIndex = documents.findIndex(d => d.id === docToSave.id);
    let updatedDocs;

    if (existingIndex >= 0) {
      updatedDocs = [...documents];
      updatedDocs[existingIndex] = docWithTimestamp;
    } else {
      updatedDocs = [docWithTimestamp, ...documents];
    }

    saveDocumentsToStorage(updatedDocs);
    setCurrentDoc(docWithTimestamp);
  };

  const handleDeleteDocument = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus dokumen perangkat ini?')) {
      const updated = documents.filter(d => d.id !== id);
      saveDocumentsToStorage(updated);
      if (currentDoc && currentDoc.id === id) {
        setCurrentDoc(null);
        setActiveTab('dashboard');
      }
    }
  };

  const handleDuplicateDocument = (doc) => {
    const duplicated = {
      ...doc,
      id: 'modul-' + Date.now(),
      title: `${doc.title} (Salinan)`
    };
    const updated = [duplicated, ...documents];
    saveDocumentsToStorage(updated);
    setCurrentDoc(duplicated);
    setActiveTab('preview');
  };

  const handleNewDocument = () => {
    const newDoc = {
      id: 'modul-' + Date.now(),
      title: 'Modul Ajar Baru - Deep Learning KBC',
      matpel: 'BAHASA ARAB',
      bab: 'BAB 1 : التَّعَارُف (PERKENALAN)',
      jenjang: 'MTs / SMP / Fase D',
      fase: 'D',
      kelas: 'VII',
      semester: 'I (Ganjil)',
      kurikulum: 'Kurikulum Merdeka (KBC - Deep Learning)',
      alokasiWaktu: '16 JP (8 kali pertemuan)',
      tahunAjaran: '2024/2025',
      namaGuru: '',
      nipGuru: '',
      namaSekolah: '',
      namaKepala: '',
      nipKepala: '',
      profilPancasila: ['Beriman & Bertakwa kepada Tuhan YME', 'Gotong Royong'],
      nilaiCinta: [
        'Cinta Allah SWT & Rasul-Nya',
        'Cinta Sesama Manusia & Empati'
      ],
      saranaPrasarana: 'LCD Projector, Kartu Mufradat, Audio Bahasa Arab',
      targetPeserta: 'Peserta Didik Reguler',
      modelPembelajaran: 'Deep Learning (Mindful, Meaningful, Joyful Learning)',
      cp: '',
      tp: '',
      pemahamanBermakna: '',
      pertanyaanPemantik: '',
      pendahuluan: '',
      inti: '',
      penutup: '',
      asesmenDiagnostik: '',
      asesmenFormatif: '',
      asesmenSumatif: '',
      lkpdTitle: 'LKPD Refleksi Kasih Sayang & Empati',
      lkpdContent: '',
      rubrik: [
        { kriteria: 'Fashahah & Kelancaran', berkembang: 'Perlu bimbingan', layak: 'Lancar dan tepat', mahir: 'Sangat fasih dan santun' }
      ]
    };
    setCurrentDoc(newDoc);
    setActiveTab('wizard');
  };

  const handleLoadPreset = (presetDoc) => {
    const loadedDoc = {
      ...presetDoc,
      id: 'modul-' + Date.now(),
      title: `${presetDoc.title} (Draf)`
    };
    setCurrentDoc(loadedDoc);
    setActiveTab('wizard');
  };

  const handleSelectDoc = (doc) => {
    setCurrentDoc(doc);
    setActiveTab('preview');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onNewDocument={handleNewDocument} 
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'dashboard' && (
          <Dashboard
            documents={documents}
            onNewDocument={handleNewDocument}
            onSelectDoc={handleSelectDoc}
            onDeleteDoc={handleDeleteDocument}
            onLoadPreset={handleLoadPreset}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'prota' && (
          <ProtaManager
            onBack={() => setActiveTab('dashboard')}
            onSaveToBank={handleSaveDocument}
            exportProtaWord={exportProtaToWord}
          />
        )}

        {activeTab === 'prosem' && (
          <ProsemManager
            onBack={() => setActiveTab('dashboard')}
            onSaveToBank={handleSaveDocument}
            exportProsemWord={exportProsemToWord}
          />
        )}

        {activeTab === 'materi-ajar' && (
          <MateriAjarManager
            onAttachToModul={() => setActiveTab('wizard')}
          />
        )}

        {activeTab === 'wizard' && (
          <ModulAjarWizard
            initialData={currentDoc}
            onSave={handleSaveDocument}
            onPreview={(doc) => {
              setCurrentDoc(doc);
              setActiveTab('preview');
            }}
          />
        )}

        {activeTab === 'preview' && (
          <DocumentPreview
            docData={currentDoc || documents[0]}
            onEdit={() => setActiveTab('wizard')}
            onBack={() => setActiveTab('dashboard')}
          />
        )}

        {activeTab === 'bank' && (
          <BankPerangkat
            documents={documents}
            onSelectDoc={handleSelectDoc}
            onDeleteDoc={handleDeleteDocument}
            onDuplicateDoc={handleDuplicateDocument}
            onNewDoc={handleNewDocument}
            onLoadPreset={handleLoadPreset}
          />
        )}

        {activeTab === 'templates' && (
          <TemplateCatalog
            onLoadPreset={handleLoadPreset}
          />
        )}

        {activeTab === 'ai-assistant' && (
          <AIAssistantModal
            onLoadPreset={handleLoadPreset}
            setActiveTab={setActiveTab}
          />
        )}
      </main>

      {/* FOOTER */}
      <footer className="no-print bg-white border-t border-slate-200/80 py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-2 font-bold text-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            PerangkatAjar Pro © 2026 • <a href="https://tathwir.idarah.my.id" target="_blank" rel="noopener noreferrer" className="text-teal-600 font-bold hover:underline">tathwir.idarah.my.id</a>
          </div>
          <div>
            Dikembangkan untuk Efisiensi Guru Indonesia & Satuan Pendidikan Kemenag
          </div>
        </div>
      </footer>
    </div>
  );
}

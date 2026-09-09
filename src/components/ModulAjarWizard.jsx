import React, { useState } from 'react';
import { 
  Sparkles, CheckCircle2, ArrowRight, ArrowLeft, Save, Eye, 
  Heart, BookOpen, User, Building, FileText, Check, Plus, Trash2, CheckSquare, Square, BookMarked
} from 'lucide-react';
import { JURUSAN_MATPEL_OPTIONS, JENJANG_OPTIONS, KURIKULUM_OPTIONS, SEMESTER_OPTIONS, PILAR_CINTA_KEMENAG } from '../data/presetTemplates';
import { generateAIContent } from '../utils/aiGenerator';

const PROFIL_PANCASILA_LIST = [
  'Beriman & Bertakwa kepada Tuhan YME',
  'Bernalar Kritis',
  'Gotong Royong',
  'Kreatif',
  'Mandiri',
  'Berkebinekaan Global'
];

export default function ModulAjarWizard({ initialData, onSave, onPreview }) {
  const [formData, setFormData] = useState(initialData || {
    id: 'modul-' + Date.now(),
    title: 'Modul Ajar Deep Learning (KBC) - Bahasa Arab',
    matpel: 'BAHASA ARAB',
    bab: 'BAB 1 : التَّعَارُف (PERKENALAN)',
    materiUraian: 'Ringkasan materi pembelajaran al-Ta\'aruf (kata sapaan, kata ganti, kata tanya, profesi)',
    petaKonsep: '1. Ungkapan Sapaan -> 2. Kata Ganti -> 3. Kata Tanya -> 4. Profesi',
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
      'Cinta Sesama Manusia & Empati',
      'Cinta Ilmu Pengetahuan & Kebenaran'
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
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleProfilPancasila = (item) => {
    setFormData(prev => {
      const current = prev.profilPancasila || [];
      const updated = current.includes(item)
        ? current.filter(i => i !== item)
        : [...current, item];
      return { ...prev, profilPancasila: updated };
    });
  };

  const toggleNilaiCinta = (namaPilar) => {
    setFormData(prev => {
      const current = prev.nilaiCinta || [];
      const updated = current.includes(namaPilar)
        ? current.filter(i => i !== namaPilar)
        : [...current, namaPilar];
      return { ...prev, nilaiCinta: updated };
    });
  };

  const handleSelectAllPilar = () => {
    const allNames = PILAR_CINTA_KEMENAG.map(p => p.nama);
    const current = formData.nilaiCinta || [];
    if (current.length === allNames.length) {
      setFormData(prev => ({ ...prev, nilaiCinta: [] }));
    } else {
      setFormData(prev => ({ ...prev, nilaiCinta: allNames }));
    }
  };

  const handleRubrikChange = (index, field, val) => {
    setFormData(prev => {
      const updated = [...prev.rubrik];
      updated[index][field] = val;
      return { ...prev, rubrik: updated };
    });
  };

  const addRubrikRow = () => {
    setFormData(prev => ({
      ...prev,
      rubrik: [...prev.rubrik, { kriteria: '', berkembang: '', layak: '', mahir: '' }]
    }));
  };

  const removeRubrikRow = (index) => {
    setFormData(prev => ({
      ...prev,
      rubrik: prev.rubrik.filter((_, i) => i !== index)
    }));
  };

  const handleAutoFillAI = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const aiData = generateAIContent(
        formData.matpel,
        formData.bab || formData.title,
        formData.jenjang,
        formData.modelPembelajaran,
        formData.kurikulum.includes('Cinta')
      );
      setFormData(prev => ({
        ...prev,
        ...aiData
      }));
      setIsGenerating(false);
    }, 600);
  };

  const handleSaveDoc = () => {
    onSave(formData);
  };

  const handlePreviewDoc = () => {
    onSave(formData);
    onPreview(formData);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Header Wizard & Progress Bar */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md mb-1 border border-rose-100">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> Format Standar Kemenag (Deep Learning KBC)
            </div>
            <h1 className="text-xl font-extrabold text-slate-800">
              {formData.title || 'Modul Ajar Tanpa Judul'}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAutoFillAI}
              disabled={isGenerating}
              className="px-3.5 py-2 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 text-xs font-bold flex items-center gap-1.5 transition-colors disabled:opacity-50"
            >
              <Sparkles className={`w-4 h-4 text-rose-600 ${isGenerating ? 'animate-spin' : ''}`} />
              {isGenerating ? 'Mengisi AI KBC...' : 'Auto-Fill AI KBC'}
            </button>

            <button
              onClick={handleSaveDoc}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Save className="w-4 h-4" /> Simpan Draf
            </button>

            <button
              onClick={handlePreviewDoc}
              className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Eye className="w-4 h-4" /> Pratinjau Dokumen
            </button>
          </div>
        </div>

        {/* Steps Progress Indicator */}
        <div className="grid grid-cols-5 gap-2 pt-2 border-t border-slate-100">
          {[
            { num: 1, label: 'A. Identitas & Materi' },
            { num: 2, label: 'CP & Tujuan Cinta' },
            { num: 3, label: '7 Pilar Cinta Kemenag' },
            { num: 4, label: 'Sintaks Kasih Sayang' },
            { num: 5, label: 'Asesmen & LKPD' }
          ].map(s => (
            <button
              key={s.num}
              onClick={() => setCurrentStep(s.num)}
              className={`p-2.5 rounded-xl text-left transition-all ${
                currentStep === s.num
                  ? 'bg-teal-600 text-white font-bold shadow-sm'
                  : currentStep > s.num
                  ? 'bg-teal-50 text-teal-800 font-semibold'
                  : 'bg-slate-50 text-slate-400 font-medium'
              }`}
            >
              <div className="text-[10px] opacity-80 uppercase tracking-wider">Langkah {s.num}</div>
              <div className="text-xs truncate">{s.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* STEP CONTENT BODY */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
        
        {/* STEP 1: IDENTITAS MODUL & PENGISIAN MATERI AJAR LANGSUNG */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <User className="w-5 h-5 text-teal-600" />
                A. IDENTITAS MODUL & ISIAN MATERI AJAR
              </h2>
              <p className="text-xs text-slate-500">Isikan data lengkap Madrasah/Sekolah, Materi Ajar/Bab, Kelas, Fase, Semester, dan Alokasi Waktu secara langsung.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Judul Dokumen Modul Ajar</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-teal-500 outline-none font-semibold"
                  placeholder="misal: Modul Ajar Deep Learning (KBC) - Bahasa Arab Bab 1: Al-Ta'aruf"
                />
              </div>

              {/* INPUT LANGSUNG MATERI AJAR / BAB */}
              <div className="md:col-span-2 bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-teal-900 border-b border-slate-200 pb-2">
                  <BookMarked className="w-4 h-4 text-teal-700" />
                  ISIAN MATERI AJAR LANGSUNG (INPUT GURU)
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Materi Ajar / Bab Pembelajaran (Input Langsung)</label>
                    <input
                      type="text"
                      value={formData.bab || ''}
                      onChange={(e) => handleChange('bab', e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:border-teal-500 outline-none font-bold bg-white"
                      placeholder="misal: BAB 1 : التَّعَارُف (PERKENALAN)"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Peta Konsep / Alur Pembahasan Topik</label>
                    <input
                      type="text"
                      value={formData.petaKonsep || ''}
                      onChange={(e) => handleChange('petaKonsep', e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:border-teal-500 outline-none bg-white"
                      placeholder="misal: 1. Kata Sapaan -> 2. Kata Ganti -> 3. Percakapan"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">Uraian / Ringkasan Materi Ajar (Bahan Bacaan Siswa)</label>
                    <textarea
                      rows={4}
                      value={formData.materiUraian || ''}
                      onChange={(e) => handleChange('materiUraian', e.target.value)}
                      className="w-full p-3 text-xs rounded-xl border border-slate-300 focus:border-teal-500 outline-none bg-white font-mono leading-relaxed"
                      placeholder="Ketikkan poin materi ajar, contoh bacaan, mufrodat, rumus, atau konsep yang diajarkan..."
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mata Pelajaran</label>
                <select
                  value={formData.matpel}
                  onChange={(e) => handleChange('matpel', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-teal-500 outline-none"
                >
                  {JURUSAN_MATPEL_OPTIONS.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Kurikulum Operasional</label>
                <select
                  value={formData.kurikulum}
                  onChange={(e) => handleChange('kurikulum', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border-2 border-rose-300 bg-rose-50/30 text-rose-900 font-bold focus:border-rose-500 outline-none"
                >
                  {KURIKULUM_OPTIONS.map(k => (
                    <option key={k.value} value={k.value}>{k.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Madrasah / Sekolah</label>
                <input
                  type="text"
                  value={formData.namaSekolah}
                  onChange={(e) => handleChange('namaSekolah', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-teal-500 outline-none"
                  placeholder="misal: MTs Darussalam Ngesong"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Penyusun / Guru</label>
                <input
                  type="text"
                  value={formData.namaGuru}
                  onChange={(e) => handleChange('namaGuru', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-teal-500 outline-none"
                  placeholder="misal: Ahmad Muzakki, S.Pd.I."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Kelas (misal: VII / VIII / IX / X)</label>
                <input
                  type="text"
                  value={formData.kelas}
                  onChange={(e) => handleChange('kelas', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-teal-500 outline-none"
                  placeholder="misal: VII"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Fase</label>
                  <input
                    type="text"
                    value={formData.fase || 'D'}
                    onChange={(e) => handleChange('fase', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-teal-500 outline-none uppercase"
                    placeholder="misal: D"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Semester</label>
                  <select
                    value={formData.semester || 'I (Ganjil)'}
                    onChange={(e) => handleChange('semester', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-teal-500 outline-none"
                  >
                    {SEMESTER_OPTIONS.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Alokasi Waktu (JP & Pertemuan)</label>
                <input
                  type="text"
                  value={formData.alokasiWaktu}
                  onChange={(e) => handleChange('alokasiWaktu', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-teal-500 outline-none"
                  placeholder="misal: 16 JP (8 kali pertemuan)"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tahun Pelajaran</label>
                <input
                  type="text"
                  value={formData.tahunAjaran}
                  onChange={(e) => handleChange('tahunAjaran', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-teal-500 outline-none"
                  placeholder="misal: 2024/2025"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">NIP Guru</label>
                <input
                  type="text"
                  value={formData.nipGuru}
                  onChange={(e) => handleChange('nipGuru', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-teal-500 outline-none"
                  placeholder="misal: 19910512 201903 1 004"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Kepala Sekolah / Kamad</label>
                <input
                  type="text"
                  value={formData.namaKepala}
                  onChange={(e) => handleChange('namaKepala', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-teal-500 outline-none"
                  placeholder="misal: Drs. H. Ahmad Dahlan, M.Ag."
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: CP & TP */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-teal-600" />
                  Capaian & Tujuan Pembelajaran Berbasis Kasih Sayang
                </h2>
                <p className="text-xs text-slate-500">Integrasikan pesan kebaikan dan pemahaman bermakna bagi peserta didik.</p>
              </div>

              <button
                onClick={handleAutoFillAI}
                className="px-3 py-1.5 bg-rose-100 text-rose-800 rounded-lg text-xs font-bold flex items-center gap-1 hover:bg-rose-200"
              >
                <Sparkles className="w-3.5 h-3.5 text-rose-600" /> Auto-fill AI KBC
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Capaian Pembelajaran (CP)</label>
                <textarea
                  rows={3}
                  value={formData.cp}
                  onChange={(e) => handleChange('cp', e.target.value)}
                  className="w-full p-3 text-sm rounded-xl border border-slate-200 focus:border-teal-500 outline-none"
                  placeholder="Tuliskan Capaian Pembelajaran yang diintegrasikan dengan nilai KBC..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tujuan Pembelajaran (TP)</label>
                <textarea
                  rows={4}
                  value={formData.tp}
                  onChange={(e) => handleChange('tp', e.target.value)}
                  className="w-full p-3 text-sm rounded-xl border border-slate-200 focus:border-teal-500 outline-none"
                  placeholder="1. Peserta didik dapat menjelaskan pentingnya kasih sayang...\n2. Peserta didik dapat mengamalkan empati..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Pemahaman Bermakna (Perspektif KBC)</label>
                <textarea
                  rows={2}
                  value={formData.pemahamanBermakna}
                  onChange={(e) => handleChange('pemahamanBermakna', e.target.value)}
                  className="w-full p-3 text-sm rounded-xl border border-slate-200 focus:border-teal-500 outline-none"
                  placeholder="Manfaat mendalam dan pesan cinta Ilahi bagi kehidupan..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Pertanyaan Pemantik Kasih Sayang</label>
                <textarea
                  rows={3}
                  value={formData.pertanyaanPemantik}
                  onChange={(e) => handleChange('pertanyaanPemantik', e.target.value)}
                  className="w-full p-3 text-sm rounded-xl border border-slate-200 focus:border-teal-500 outline-none"
                  placeholder="Pertanyaan diskusi yang menyentuh hati dan membuka empati siswa..."
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: 7 PILAR CINTA KEMENAG SELECTION */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
              <div>
                <h2 className="text-base font-extrabold text-slate-800 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                  7 Pilar Utama Nilai-Nilai Cinta Kemenag (KBC)
                </h2>
                <p className="text-xs text-slate-500">Pilih pilar-pilar nilai cinta Kemenag yang diintegrasikan dalam Modul Ajar ini.</p>
              </div>

              <button
                type="button"
                onClick={handleSelectAllPilar}
                className="px-3.5 py-1.5 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold flex items-center gap-1.5 hover:bg-rose-100 transition-colors self-start sm:self-auto"
              >
                {(formData.nilaiCinta || []).length === PILAR_CINTA_KEMENAG.length ? (
                  <>
                    <Square className="w-3.5 h-3.5" /> Hapus Semua Pilihan
                  </>
                ) : (
                  <>
                    <CheckSquare className="w-3.5 h-3.5" /> Pilih Semua 7 Pilar
                  </>
                )}
              </button>
            </div>

            {/* 7 PILAR CARDS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PILAR_CINTA_KEMENAG.map((pilar, idx) => {
                const isSelected = (formData.nilaiCinta || []).includes(pilar.nama);

                return (
                  <div
                    key={pilar.id}
                    onClick={() => toggleNilaiCinta(pilar.nama)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-gradient-to-br from-rose-50 to-pink-50 border-rose-500 shadow-md ring-2 ring-rose-200'
                        : 'bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`w-6 h-6 rounded-full text-[11px] font-extrabold flex items-center justify-center ${isSelected ? 'bg-rose-600 text-white' : 'bg-slate-200 text-slate-700'}`}>
                            {idx + 1}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-white/80 border border-slate-200 text-slate-600">
                            {pilar.kategori}
                          </span>
                        </div>

                        <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${isSelected ? 'bg-rose-600 border-rose-600 text-white' : 'border-slate-300'}`}>
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>

                      <h3 className={`font-extrabold text-sm mb-1 ${isSelected ? 'text-rose-950' : 'text-slate-800'}`}>
                        {pilar.nama}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {pilar.deskripsi}
                      </p>
                    </div>

                    {isSelected && (
                      <div className="mt-3 pt-2 border-t border-rose-200/60 flex items-center gap-1 text-[11px] font-bold text-rose-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-rose-600" /> Aktif dalam Pembelajaran Ini
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* PROFIL PELAJAR PANCASILA */}
            <div className="pt-4 space-y-3">
              <label className="block text-xs font-bold text-slate-700">Dimensi Profil Pelajar Pancasila & Rahmatan lil 'Alamin</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {PROFIL_PANCASILA_LIST.map(p => {
                  const isChecked = (formData.profilPancasila || []).includes(p);
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => toggleProfilPancasila(p)}
                      className={`p-3 rounded-xl text-left border text-xs font-semibold flex items-center gap-2 transition-all ${
                        isChecked
                          ? 'bg-teal-50 border-teal-500 text-teal-800'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded flex items-center justify-center border ${isChecked ? 'bg-teal-600 border-teal-600 text-white' : 'border-slate-300'}`}>
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      {p}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Model / Pendekatan Pembelajaran</label>
                <select
                  value={formData.modelPembelajaran}
                  onChange={(e) => handleChange('modelPembelajaran', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-teal-500 outline-none"
                >
                  <option value="Deep Learning (Mindful, Meaningful, Joyful Learning)">Deep Learning (Mindful, Meaningful, Joyful Learning)</option>
                  <option value="Problem Based Learning Berbasis Empati">Problem Based Learning Berbasis Empati</option>
                  <option value="Project Based Learning Kasih Sayang">Project Based Learning Kasih Sayang</option>
                  <option value="Discovery Learning Inklusif">Discovery Learning Inklusif</option>
                  <option value="Cooperative Learning Cinta Kedamaian">Cooperative Learning Cinta Kedamaian</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Target Peserta Didik</label>
                <input
                  type="text"
                  value={formData.targetPeserta}
                  onChange={(e) => handleChange('targetPeserta', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-teal-500 outline-none"
                  placeholder="misal: Peserta Didik Reguler (Inklusif)"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Sarana & Media Pembelajaran</label>
                <textarea
                  rows={2}
                  value={formData.saranaPrasarana}
                  onChange={(e) => handleChange('saranaPrasarana', e.target.value)}
                  className="w-full p-3 text-sm rounded-xl border border-slate-200 focus:border-teal-500 outline-none"
                  placeholder="misal: LCD Projector, Kartu Refleksi Cinta, Video Kasih Sayang, Lingkungan Madrasah"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: KEGIATAN PEMBELAJARAN */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <FileText className="w-5 h-5 text-teal-600" />
                Rincian Kegiatan Pembelajaran Berbasis Kasih Sayang (KBC)
              </h2>
              <p className="text-xs text-slate-500">Pastikan kegiatan bernuansa ramah anak, menghargai keberagaman, dan reflektif.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">1. Kegiatan Pendahuluan (Sapaan Penuh Kasih Sayang)</label>
                <textarea
                  rows={3}
                  value={formData.pendahuluan}
                  onChange={(e) => handleChange('pendahuluan', e.target.value)}
                  className="w-full p-3 text-sm rounded-xl border border-slate-200 focus:border-teal-500 outline-none"
                  placeholder="Senyum salam sapa (3S), menanyakan kabar emosional siswa, doa keikhlasan..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">2. Kegiatan Inti (Sintaks Pembelajaran & Diskusi Inklusif)</label>
                <textarea
                  rows={6}
                  value={formData.inti}
                  onChange={(e) => handleChange('inti', e.target.value)}
                  className="w-full p-3 text-sm rounded-xl border border-slate-200 focus:border-teal-500 outline-none font-mono text-xs"
                  placeholder="Studi kasus berbasis empati, diskusi kelompok tanpa diskriminasi, apresiasi positif..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">3. Kegiatan Penutup (Lingkaran Refleksi Cinta)</label>
                <textarea
                  rows={3}
                  value={formData.penutup}
                  onChange={(e) => handleChange('penutup', e.target.value)}
                  className="w-full p-3 text-sm rounded-xl border border-slate-200 focus:border-teal-500 outline-none"
                  placeholder="Ungkapan syukur, kata-kata motivasi cinta dari guru, dan doa penutup..."
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: ASESMEN & LKPD */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-teal-600" />
                Asesmen Pembelajaran, Rubrik Kasih Sayang & LKPD
              </h2>
              <p className="text-xs text-slate-500">Penilaian autentik dan Lembar Kerja Berbasis Cinta.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Asesmen Diagnostik (Emosional & Kesiapan)</label>
                <textarea
                  rows={3}
                  value={formData.asesmenDiagnostik}
                  onChange={(e) => handleChange('asesmenDiagnostik', e.target.value)}
                  className="w-full p-3 text-xs rounded-xl border border-slate-200 focus:border-teal-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Asesmen Formatif (Proses Kepedulian)</label>
                <textarea
                  rows={3}
                  value={formData.asesmenFormatif}
                  onChange={(e) => handleChange('asesmenFormatif', e.target.value)}
                  className="w-full p-3 text-xs rounded-xl border border-slate-200 focus:border-teal-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Asesmen Sumatif (Jurnal Refleksi)</label>
                <textarea
                  rows={3}
                  value={formData.asesmenSumatif}
                  onChange={(e) => handleChange('asesmenSumatif', e.target.value)}
                  className="w-full p-3 text-xs rounded-xl border border-slate-200 focus:border-teal-500 outline-none"
                />
              </div>
            </div>

            {/* Rubrik Penilaian Table Editor */}
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-bold text-slate-700">Tabel Rubrik Kriteria Penilaian Sikap Kasih Sayang</label>
                <button
                  onClick={addRubrikRow}
                  className="px-2.5 py-1 text-xs font-bold text-teal-700 bg-teal-50 rounded-lg hover:bg-teal-100 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Tambah Kriteria
                </button>
              </div>

              <div className="space-y-3">
                {formData.rubrik.map((row, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-700">Kriteria #{idx + 1}</span>
                      {formData.rubrik.length > 1 && (
                        <button
                          onClick={() => removeRubrikRow(idx)}
                          className="text-rose-600 hover:text-rose-700 text-xs font-bold"
                        >
                          Hapus Baris
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                      <input
                        type="text"
                        placeholder="Nama Kriteria"
                        value={row.kriteria}
                        onChange={(e) => handleRubrikChange(idx, 'kriteria', e.target.value)}
                        className="p-2 border rounded-lg bg-white"
                      />
                      <input
                        type="text"
                        placeholder="Perlu Bimbingan"
                        value={row.berkembang}
                        onChange={(e) => handleRubrikChange(idx, 'berkembang', e.target.value)}
                        className="p-2 border rounded-lg bg-white"
                      />
                      <input
                        type="text"
                        placeholder="Cukup / Layak"
                        value={row.layak}
                        onChange={(e) => handleRubrikChange(idx, 'layak', e.target.value)}
                        className="p-2 border rounded-lg bg-white"
                      />
                      <input
                        type="text"
                        placeholder="Mahir / Sangat Baik"
                        value={row.mahir}
                        onChange={(e) => handleRubrikChange(idx, 'mahir', e.target.value)}
                        className="p-2 border rounded-lg bg-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* LKPD Editor */}
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-bold text-slate-700">Lampiran LKPD Refleksi Cinta</label>
              <input
                type="text"
                value={formData.lkpdTitle}
                onChange={(e) => handleChange('lkpdTitle', e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none font-bold"
                placeholder="Judul LKPD"
              />
              <textarea
                rows={4}
                value={formData.lkpdContent}
                onChange={(e) => handleChange('lkpdContent', e.target.value)}
                className="w-full p-3 text-xs rounded-xl border border-slate-200 outline-none"
                placeholder="Instruksi kegiatan refleksi dan kepedulian siswa..."
              />
            </div>
          </div>
        )}

        {/* BOTTOM NAVIGATION BUTTONS */}
        <div className="flex justify-between items-center pt-4 border-t border-slate-100">
          <button
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
            className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold flex items-center gap-1.5 disabled:opacity-40"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali
          </button>

          <div className="flex items-center gap-2">
            {currentStep < 5 ? (
              <button
                onClick={() => setCurrentStep(prev => Math.min(5, prev + 1))}
                className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
              >
                Langkah Selanjutnya <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handlePreviewDoc}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-700 hover:to-emerald-600 text-white text-xs font-bold flex items-center gap-2 shadow-md"
              >
                <Eye className="w-4 h-4" /> Selesai & Pratinjau Dokumen KBC
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

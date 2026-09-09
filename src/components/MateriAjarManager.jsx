import React, { useState } from 'react';
import { BookOpen, Sparkles, Plus, Search, Edit3, Trash2, Eye, Printer, Download, Save, Copy, FileText, CheckCircle2 } from 'lucide-react';
import { JURUSAN_MATPEL_OPTIONS, JENJANG_OPTIONS } from '../data/presetTemplates';
import { exportToWordDoc } from '../utils/exportUtils';

export default function MateriAjarManager({ onAttachToModul }) {
  const [materiList, setMateriList] = useState([
    {
      id: 'materi-1',
      title: 'Materi Ajar Bahasa Arab: Al-Ta\'aruf (Perkenalan & Kata Sapaan)',
      matpel: 'BAHASA ARAB',
      jenjang: 'MTs / SMP / Fase D',
      kelas: 'VII',
      petaKonsep: '1. Ungkapan Sapaan (At-Tahiyyat) -> 2. Kata Ganti (Ad-Dhama\'ir) -> 3. Kata Tanya (Al-Istifham) -> 4. Profesi (Al-Mihnatu)',
      uraianMateri: `1. UNGKAPAN SAPAAN (التَّحِيَّات):
- اَلسَّلاَمُ عَلَيْكُمْ (Assalamu'alaikum) -> Wa'alaikumus salam (وَعَلَيْكُمُ السَّلاَمُ)
- صَبَاحَ الْخَيْرِ (Selamat Pagi) -> Sabahannur (صَبَاحَ النُّوْرِ)
- مَسَاءَ الْخَيْرِ (Selamat Sore) -> Masa\'annur (مَسَاءَ النُّوْرِ)
- كَيْفَ حَالُكَ؟ (Bagaimana kabarmu?) -> Bikhairin walhamdulillah (بِخَيْرٍ وَالْحَمْدُ لِلَّهِ)

2. KATA GANTI (الضَّمَائِرُ الْمُنْفَصِلَةُ):
- أَنَا (Saya)
- أَنْتَ (Kamu Laki-laki) | أَنْتِ (Kamu Perempuan)
- هُوَ (Dia Laki-laki) | هِيَ (Dia Perempuan)

3. KATA TANYA (أَدَوَاتُ الاِسْتِفْهَامِ):
- مَنْ (Siapa) | مَا (Apa) | مِنْ أَيْنَ (Dari mana) | هَلْ (Apakah)

4. PESAN MORAL KBC (KURIKULUM BERBASIS CINTA):
Menyapa sesama kawan dengan senyuman dan kata yang baik adalah wujud menebar kasih sayang dan kedamaian (Ukhuwah Islamiyah & Insaniyah).`,
      glosarium: 'At-Tahiyyat (Ungkapan sapaan), Ad-Dhama\'ir (Kata ganti nama), Al-Hiwar (Percakapan/Dialog), Ukhuwah (Persaudaraan).',
      sumberBelajar: 'Buku Siswa Bahasa Arab MTs Kelas VII Kemenag RI, Video Pembelajaran YouTube Al-Ta\'aruf.',
      updatedAt: '9 Sep 2026'
    }
  ]);

  const [currentMateri, setCurrentMateri] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleCreateNew = () => {
    const newMat = {
      id: 'materi-' + Date.now(),
      title: 'Materi Ajar Baru',
      matpel: 'BAHASA ARAB',
      jenjang: 'MTs / SMP / Fase D',
      kelas: 'VII',
      petaKonsep: '',
      uraianMateri: '',
      glosarium: '',
      sumberBelajar: '',
      updatedAt: 'Baru saja'
    };
    setCurrentMateri(newMat);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!currentMateri) return;
    const exists = materiList.find(m => m.id === currentMateri.id);
    let updated;
    if (exists) {
      updated = materiList.map(m => m.id === currentMateri.id ? currentMateri : m);
    } else {
      updated = [currentMateri, ...materiList];
    }
    setMateriList(updated);
    setIsEditing(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Hapus materi ajar ini?')) {
      setMateriList(materiList.filter(m => m.id !== id));
      if (currentMateri && currentMateri.id === id) {
        setCurrentMateri(null);
        setIsEditing(false);
      }
    }
  };

  const handleAIGenerateMateri = () => {
    setIsGenerating(true);
    setTimeout(() => {
      if (currentMateri) {
        setCurrentMateri({
          ...currentMateri,
          petaKonsep: `1. Pengenalan Konsep Utama -> 2. Analisis & Struktur Materi -> 3. Aplikasi Kehidupan Nyata -> 4. Integrasi Nilai KBC`,
          uraianMateri: `A. PENGERTIAN & KONSEP UTAMA:
Materi ${currentMateri.title} menjelaskan hakikat dan prinsip dasar yang harus dikuasai siswa dengan penuh pemahaman mendalam.

B. RINCIAN SUB-PEMBAHASAN:
1. Prinsip Pertama: Pemahaman konseptual dan dalil/landasan utama.
2. Prinsip Kedua: Penerapan praktis dalam diskusi dan latihan terbimbing.
3. Prinsip Ketiga: Pembiasaan sikap santun, empati, dan peduli sesama.

C. INTEGRASI KURIKULUM BERBASIS CINTA (KBC):
Materi ini menanamkan keikhlasan berilmu, penghormatan kepada sesama teman, serta rasa syukur atas nikmat akal dan keindahan ilmu pengetahuan.`,
          glosarium: 'Konseptual (Pemahaman teori dasar), Empati (Rasa peduli), Integrasi (Penggabungan nilai).',
          sumberBelajar: 'Buku Pegangan Guru Kemendikbudristek / Kemenag RI, Media Digital Interaktif.'
        });
      }
      setIsGenerating(false);
    }, 600);
  };

  const filteredMateri = materiList.filter(m =>
    m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.matpel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-16">
      {/* HEADER MANAGER */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md mb-1">
              <BookOpen className="w-3.5 h-3.5" /> Manajemen Bahan / Materi Ajar
            </div>
            <h1 className="text-2xl font-extrabold text-slate-800">
              Bank Materi & Bahan Ajar Guru
            </h1>
            <p className="text-xs text-slate-500">Susun ringkasan materi, peta konsep, glosarium, dan bahan bacaan siswa.</p>
          </div>

          <button
            onClick={handleCreateNew}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-700 hover:to-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all"
          >
            <Plus className="w-4 h-4" /> Tambah Materi Ajar Baru
          </button>
        </div>

        {/* SEARCH BAR */}
        <div className="relative pt-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-5" />
          <input
            type="text"
            placeholder="Cari materi ajar berdasarkan judul atau mata pelajaran..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:border-teal-500 outline-none"
          />
        </div>
      </div>

      {/* EDITOR FORM OR VIEW */}
      {isEditing && currentMateri ? (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <h2 className="text-base font-extrabold text-slate-800 flex items-center gap-2">
              <Edit3 className="w-5 h-5 text-teal-600" /> Form Penyusunan Materi Ajar
            </h2>

            <div className="flex items-center gap-2">
              <button
                onClick={handleAIGenerateMateri}
                disabled={isGenerating}
                className="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold flex items-center gap-1 hover:bg-rose-100"
              >
                <Sparkles className={`w-3.5 h-3.5 text-rose-600 ${isGenerating ? 'animate-spin' : ''}`} />
                {isGenerating ? 'Mengisi AI...' : 'Auto-Fill AI Materi'}
              </button>

              <button
                onClick={handleSave}
                className="px-4 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center gap-1 shadow-sm"
              >
                <Save className="w-3.5 h-3.5" /> Simpan Materi
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Judul / Topik Materi Ajar</label>
              <input
                type="text"
                value={currentMateri.title}
                onChange={(e) => setCurrentMateri({ ...currentMateri, title: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-teal-500 outline-none"
                placeholder="misal: Materi Ajar Bahasa Arab: Al-Ta'aruf"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Mata Pelajaran</label>
              <select
                value={currentMateri.matpel}
                onChange={(e) => setCurrentMateri({ ...currentMateri, matpel: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-teal-500 outline-none"
              >
                {JURUSAN_MATPEL_OPTIONS.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Kelas & Jenjang</label>
              <input
                type="text"
                value={currentMateri.kelas}
                onChange={(e) => setCurrentMateri({ ...currentMateri, kelas: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-teal-500 outline-none"
                placeholder="misal: Kelas VII / MTs"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Peta Konsep / Ringkasan Poin Alur</label>
              <textarea
                rows={2}
                value={currentMateri.petaKonsep}
                onChange={(e) => setCurrentMateri({ ...currentMateri, petaKonsep: e.target.value })}
                className="w-full p-3 text-xs rounded-xl border border-slate-200 focus:border-teal-500 outline-none"
                placeholder="1. Poin A -> 2. Poin B -> 3. Poin C"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Uraian Lengkap Materi Pembelajaran (Bahan Bacaan Siswa)</label>
              <textarea
                rows={10}
                value={currentMateri.uraianMateri}
                onChange={(e) => setCurrentMateri({ ...currentMateri, uraianMateri: e.target.value })}
                className="w-full p-3 text-xs font-mono rounded-xl border border-slate-200 focus:border-teal-500 outline-none leading-relaxed"
                placeholder="Tuliskan uraian materi lengkap, rumus, contoh bacaan Arab/teks, dan penjelasan..."
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Glosarium & Istilah Penting</label>
              <textarea
                rows={3}
                value={currentMateri.glosarium}
                onChange={(e) => setCurrentMateri({ ...currentMateri, glosarium: e.target.value })}
                className="w-full p-3 text-xs rounded-xl border border-slate-200 outline-none"
                placeholder="Daftar kata/istilah sulit dan artinya..."
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Media & Sumber Belajar</label>
              <textarea
                rows={3}
                value={currentMateri.sumberBelajar}
                onChange={(e) => setCurrentMateri({ ...currentMateri, sumberBelajar: e.target.value })}
                className="w-full p-3 text-xs rounded-xl border border-slate-200 outline-none"
                placeholder="Buku acuan, link video, website..."
              />
            </div>
          </div>
        </div>
      ) : (
        /* LIST OF MATERI AJAR CARDS */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredMateri.map((materi) => (
            <div
              key={materi.id}
              className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-teal-500 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="bg-teal-100 text-teal-800 text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase">
                    {materi.matpel}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {materi.updatedAt}
                  </span>
                </div>

                <h3 className="font-extrabold text-slate-800 text-base mb-2 leading-snug">
                  {materi.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 mb-4 whitespace-pre-line leading-relaxed">
                  {materi.uraianMateri || 'Belum ada uraian materi.'}
                </p>

                {materi.petaKonsep && (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700 mb-4">
                    <span className="font-bold text-teal-900 block mb-1">Peta Konsep:</span>
                    {materi.petaKonsep}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => { setCurrentMateri(materi); setIsEditing(true); }}
                  className="px-3.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center gap-1 transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Edit Materi
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleDelete(materi.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                    title="Hapus"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

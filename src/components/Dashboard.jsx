import React from 'react';
import { 
  Sparkles, FilePlus, FolderKanban, CheckCircle2, Clock, 
  ArrowRight, BookOpen, Layers, Award, Printer, Edit3, Trash2, Copy, Search, Calendar, CalendarRange, Lock
} from 'lucide-react';
import { PRESET_TEMPLATES } from '../data/presetTemplates';

export default function Dashboard({ 
  documents, 
  onNewDocument, 
  onSelectDoc, 
  onDeleteDoc, 
  onLoadPreset,
  setActiveTab 
}) {
  return (
    <div className="space-y-8 pb-12">
      {/* HERO SECTION - EducateX Style Mint Teal Gradient */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-50 via-emerald-50/60 to-teal-100/40 p-8 sm:p-10 border border-teal-100 shadow-sm">
        <div className="absolute right-0 top-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-teal-200/30 blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 -mb-20 w-64 h-64 rounded-full bg-emerald-200/30 blur-2xl pointer-events-none" />

        <div className="relative z-10 grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              100% Standar Kemendikbudristek & Kemenag
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight">
              Susun Perangkat Pembelajaran <span className="text-teal-600 underline decoration-teal-300 decoration-wavy">Lebih Cepat</span> & Rapi
            </h1>
            
            <p className="text-slate-600 text-base sm:text-lg max-w-xl leading-relaxed">
              Buat Modul Ajar Kurikulum Merdeka, PROTA, PROSEM, RPP, dan Rubrik Asesmen secara otomatis dan instan. Siap cetak ke format PDF & Word (.Docx).
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onNewDocument}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-700 hover:to-emerald-600 text-white font-bold shadow-lg shadow-teal-600/25 hover:shadow-xl transition-all flex items-center gap-2"
              >
                <FilePlus className="w-5 h-5" />
                Buat Modul Ajar Baru
              </button>

              <button
                onClick={() => setActiveTab('prota')}
                className="px-5 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold shadow-md transition-all flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Buat PROTA
              </button>

              <button
                onClick={() => setActiveTab('prosem')}
                className="px-5 py-3.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold shadow-md transition-all flex items-center gap-2"
              >
                <CalendarRange className="w-4 h-4" />
                Buat PROSEM
              </button>
            </div>

            {/* Micro Rating & Trust */}
            <div className="pt-4 flex items-center gap-4 text-xs text-slate-500 font-medium border-t border-teal-100/80">
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                ★★★★★ <span className="text-slate-700 ml-1">4.9/5</span>
              </div>
              <span>•</span>
              <span>Digunakan oleh 12,000+ Guru Indonesia</span>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="md:col-span-5 grid grid-cols-2 gap-4">
            <div className="bg-white/90 backdrop-blur p-5 rounded-2xl border border-teal-100 shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold mb-3">
                <FolderKanban className="w-5 h-5" />
              </div>
              <p className="text-2xl font-extrabold text-slate-800">{documents.length}</p>
              <p className="text-xs text-slate-500 font-medium">Dokumen Dibuat</p>
            </div>

            <div className="bg-white/90 backdrop-blur p-5 rounded-2xl border border-teal-100 shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-3">
                <Sparkles className="w-5 h-5" />
              </div>
              <p className="text-2xl font-extrabold text-slate-800">150+</p>
              <p className="text-xs text-slate-500 font-medium">Template AI Ready</p>
            </div>

            <div className="bg-white/90 backdrop-blur p-5 rounded-2xl border border-teal-100 shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold mb-3">
                <Printer className="w-5 h-5" />
              </div>
              <p className="text-2xl font-extrabold text-slate-800">A4 PDF</p>
              <p className="text-xs text-slate-500 font-medium">Standard Export</p>
            </div>

            <div className="bg-white/90 backdrop-blur p-5 rounded-2xl border border-teal-100 shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold mb-3">
                <Award className="w-5 h-5" />
              </div>
              <p className="text-2xl font-extrabold text-slate-800">Fase A-F</p>
              <p className="text-xs text-slate-500 font-medium">Semua Jenjang</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE CARDS - EducateX Style Grid */}
      <section className="space-y-4">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Fitur Utama Perangkat Pembelajaran</h2>
            <p className="text-sm text-slate-500">Pilih komponen perangkat pembelajaran yang ingin Anda buat</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-teal-500 shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4 group-hover:bg-teal-600 group-hover:text-white transition-colors">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-2">Modul Ajar Deep Learning</h3>
            <p className="text-slate-600 text-xs leading-relaxed mb-4">
              Lengkap dengan Profil Pelajar Pancasila, Pertanyaan Pemantik, Langkah Mindful/Meaningful/Joyful, LKPD, dan Asesmen.
            </p>
            <button 
              onClick={onNewDocument}
              className="text-xs font-bold text-teal-600 group-hover:text-teal-700 flex items-center gap-1"
            >
              Buat Modul Ajar <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-emerald-500 shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-2">Program Tahunan (PROTA)</h3>
            <p className="text-slate-600 text-xs leading-relaxed mb-4">
              Perencanaan alokasi Jam Pelajaran (JP) selama 1 tahun ajaran penuh (Semester I & II) dengan tabel siap cetak.
            </p>
            <button 
              onClick={() => setActiveTab('prota')}
              className="text-xs font-bold text-emerald-600 group-hover:text-emerald-700 flex items-center gap-1"
            >
              Kelola PROTA <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-sky-500 shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4 group-hover:bg-sky-600 group-hover:text-white transition-colors">
              <CalendarRange className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-2">Program Semester (PROSEM)</h3>
            <p className="text-slate-600 text-xs leading-relaxed mb-4">
              Matriks distribusi alokasi JP per minggu selama 6 bulan untuk Semester Ganjil / Genap secara rinci.
            </p>
            <button 
              onClick={() => setActiveTab('prosem')}
              className="text-xs font-bold text-sky-600 group-hover:text-sky-700 flex items-center gap-1"
            >
              Kelola PROSEM <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-indigo-500 shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-2">Rubrik Penilaian & Asesmen</h3>
            <p className="text-slate-600 text-xs leading-relaxed mb-4">
              Kriteria Ketercapaian Tujuan Pembelajaran (KKTP), rubrik analitik/holistik 3 kolom (Diagnostik, Formatif, Sumatif).
            </p>
            <button 
              onClick={onNewDocument}
              className="text-xs font-bold text-indigo-600 group-hover:text-indigo-700 flex items-center gap-1"
            >
              Generasi Rubrik <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* RECENT DOCUMENTS / BANK SECTION */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <FolderKanban className="w-5 h-5 text-teal-600" />
              Dokumen Perangkat Anda
            </h2>
            <p className="text-xs text-slate-500">Seluruh modul dan RPP tersimpan otomatis di perangkat Anda</p>
          </div>

          <button
            onClick={() => setActiveTab('bank')}
            className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1"
          >
            Lihat Semua di Bank Perangkat ({documents.length}) <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {documents.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-3">
            <BookOpen className="w-12 h-12 mx-auto text-slate-300" />
            <h3 className="text-base font-bold text-slate-700">Belum Ada Dokumen Tersimpan</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Mulai buat modul ajar pertama Anda atau gunakan salah satu template siap pakai yang telah kami sediakan.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={onNewDocument}
                className="px-4 py-2 text-xs font-bold rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition-colors"
              >
                Buat Modul Baru
              </button>
              <button
                onClick={() => onLoadPreset(PRESET_TEMPLATES[0])}
                className="px-4 py-2 text-xs font-bold rounded-lg bg-white text-teal-700 border border-teal-200 hover:bg-teal-50 transition-colors"
              >
                Coba Template Contoh
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {documents.map((doc) => (
              <div 
                key={doc.id}
                className="bg-slate-50/70 hover:bg-white p-5 rounded-2xl border border-slate-200 hover:border-teal-400 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="bg-teal-100 text-teal-800 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                        {doc.matpel || 'Mata Pelajaran'}
                      </span>
                      {(doc.isProtected || doc.isPreset) && (
                        <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2 py-0.5 rounded-md flex items-center gap-1">
                          <Lock className="w-3 h-3 text-amber-600" /> Master
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {doc.updatedAt || 'Terbaru'}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-800 text-sm line-clamp-2 mb-2 leading-snug">
                    {doc.title}
                  </h3>

                  <div className="space-y-1 text-xs text-slate-500 mb-4">
                    <p><span className="font-semibold text-slate-700">Jenjang:</span> {doc.jenjang || '-'}</p>
                    <p><span className="font-semibold text-slate-700">Guru:</span> {doc.namaGuru || '-'}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between">
                  <button
                    onClick={() => onSelectDoc(doc)}
                    className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center gap-1 transition-colors"
                  >
                    Pratinjau / Cetak
                  </button>

                  <div className="flex items-center gap-1 text-slate-400">
                    {(doc.isProtected || doc.isPreset) ? (
                      <button
                        onClick={() => onDeleteDoc(doc.id)}
                        className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-md transition-colors"
                        title="Bahan Ajar Utama (Dilindungi & Tidak Dapat Dihapus)"
                      >
                        <Lock className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => onDeleteDoc(doc.id)}
                        className="p-1.5 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                        title="Hapus Dokumen"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

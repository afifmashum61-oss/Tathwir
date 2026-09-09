import React, { useState } from 'react';
import { Search, Filter, BookOpen, Clock, Trash2, Eye, Copy, Plus, FileText, Lock } from 'lucide-react';
import { JURUSAN_MATPEL_OPTIONS, JENJANG_OPTIONS, PRESET_TEMPLATES } from '../data/presetTemplates';

export default function BankPerangkat({ 
  documents, 
  onSelectDoc, 
  onDeleteDoc, 
  onDuplicateDoc, 
  onNewDoc, 
  onLoadPreset 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMatpel, setSelectedMatpel] = useState('All');
  const [selectedJenjang, setSelectedJenjang] = useState('All');

  const filteredDocs = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (doc.namaGuru && doc.namaGuru.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (doc.matpel && doc.matpel.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesMatpel = selectedMatpel === 'All' || doc.matpel === selectedMatpel;
    const matchesJenjang = selectedJenjang === 'All' || doc.jenjang === selectedJenjang;

    return matchesSearch && matchesMatpel && matchesJenjang;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* HEADER & FILTER BAR */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-teal-600" /> Bank Perangkat Pembelajaran
            </h1>
            <p className="text-xs text-slate-500">Kelola, cari, duplikasi, dan cetak seluruh perangkat pembelajaran tersimpan.</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onNewDoc}
              className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Plus className="w-4 h-4" /> Modul Baru
            </button>
          </div>
        </div>

        {/* SEARCH & FILTERS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Cari judul modul atau nama guru..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:border-teal-500 outline-none"
            />
          </div>

          <div>
            <select
              value={selectedMatpel}
              onChange={(e) => setSelectedMatpel(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-teal-500 outline-none"
            >
              <option value="All">Semua Mata Pelajaran</option>
              {JURUSAN_MATPEL_OPTIONS.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={selectedJenjang}
              onChange={(e) => setSelectedJenjang(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-teal-500 outline-none"
            >
              <option value="All">Semua Jenjang / Fase</option>
              {JENJANG_OPTIONS.map(j => (
                <option key={j.value} value={j.value}>{j.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* DOCUMENT GRID */}
      {filteredDocs.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
          <FileText className="w-12 h-12 mx-auto text-slate-300" />
          <h3 className="text-base font-bold text-slate-700">Tidak Ada Dokumen yang Cocok</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Coba sesuaikan pencarian atau kata kunci filter Anda, atau tambahkan perangkat baru.
          </p>
          <div className="pt-2 flex justify-center gap-2">
            <button
              onClick={() => { setSearchTerm(''); setSelectedMatpel('All'); setSelectedJenjang('All'); }}
              className="px-3 py-1.5 text-xs font-bold bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200"
            >
              Reset Filter
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-teal-400 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
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
                    {doc.updatedAt || 'Tersimpan'}
                  </span>
                </div>

                <h3 className="font-bold text-slate-800 text-sm line-clamp-2 mb-2 leading-snug">
                  {doc.title}
                </h3>

                <div className="space-y-1 text-xs text-slate-500 mb-4">
                  <p><span className="font-semibold text-slate-700">Jenjang:</span> {doc.jenjang || '-'}</p>
                  <p><span className="font-semibold text-slate-700">Guru Penyusun:</span> {doc.namaGuru || '-'}</p>
                  <p><span className="font-semibold text-slate-700">Model:</span> {doc.modelPembelajaran || '-'}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onSelectDoc(doc)}
                  className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center gap-1 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" /> Pratinjau / Cetak
                </button>

                <div className="flex items-center gap-1 text-slate-400">
                  <button
                    onClick={() => onDuplicateDoc(doc)}
                    className="p-1.5 hover:text-teal-600 hover:bg-teal-50 rounded-md transition-colors"
                    title="Duplikasi Dokumen"
                  >
                    <Copy className="w-4 h-4" />
                  </button>

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
    </div>
  );
}

import React, { useState } from 'react';
import { CalendarRange, Printer, Download, Plus, Trash2, ArrowLeft, Save, Sparkles, CheckCircle2 } from 'lucide-react';
import { formatNamaDanGelar, formatKepalaHeader } from '../utils/exportUtils';

const GANJIL_BULAN = ['Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
const GENAP_BULAN = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni'];

const DEFAULT_PROSEM_ITEMS = [
  { id: 1, bab: 'BAB 1 : التَّعَارُف (Perkenalan)', tp: 'Melafalkan, memahami mufrodat, hiwar, dan Mubtada + Khabar', jp: 16, dist: { 0: [4, 4, 4, 4], 1: [0, 0, 0, 0], 2: [0, 0, 0, 0], 3: [0, 0, 0, 0], 4: [0, 0, 0, 0], 5: [0, 0, 0, 0] } },
  { id: 2, bab: 'BAB 2 : المَرَافِقُ المَدْرَسِيَّةُ (Fasilitas Sekolah)', tp: 'Memahami teks dan dialog fasilitas sekolah serta Na\'at Man\'ut', jp: 16, dist: { 0: [0, 0, 0, 0], 1: [4, 4, 4, 4], 2: [0, 0, 0, 0], 3: [0, 0, 0, 0], 4: [0, 0, 0, 0], 5: [0, 0, 0, 0] } },
  { id: 3, bab: 'BAB 3 : الأَدَوَاتُ المَدْرَسِيَّةُ (Peralatan Sekolah)', tp: 'Mendemonstrasikan kosa kata & deskripsi peralatan sekolah', jp: 16, dist: { 0: [0, 0, 0, 0], 1: [0, 0, 0, 0], 2: [4, 4, 0, 0], 3: [4, 4, 4, 0], 4: [0, 0, 0, 0], 5: [0, 0, 0, 0] } },
  { id: 4, bab: 'Cadangan & Asesmen Sumatif Akhir Semester (ASAS)', tp: 'Evaluasi Capaian Pembelajaran & Remedial Semester Ganjil', jp: 8, dist: { 0: [0, 0, 0, 0], 1: [0, 0, 0, 0], 2: [0, 0, 0, 0], 3: [0, 0, 0, 4], 4: [4, 0, 0, 0], 5: [0, 0, 0, 0] } },
];

export default function ProsemManager({ onBack, onSaveToBank, exportProsemWord }) {
  const [identitas, setIdentitas] = useState({
    namaSekolah: 'MTs NEGERI 1 KOTA MALANG',
    matpel: 'BAHASA ARAB',
    kelas: 'VII',
    fase: 'D',
    semester: 'I (Ganjil)',
    tahunAjaran: '2024/2025',
    namaGuru: 'Hj. Elik Nurlaili, S.Si., M.Pd.',
    nipGuru: '19780512 200501 2 004',
    namaKepala: 'Drs. H. Ahmad Fauzi, M.Ag.',
    nipKepala: '19690315 199403 1 002'
  });

  const [items, setItems] = useState(DEFAULT_PROSEM_ITEMS);
  const [showNotification, setShowNotification] = useState(false);

  const bulanList = identitas.semester.includes('II') || identitas.semester.includes('Genap') ? GENAP_BULAN : GANJIL_BULAN;
  const totalJP = items.reduce((acc, curr) => acc + (parseInt(curr.jp) || 0), 0);

  const handleItemChange = (id, field, value) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handleDistChange = (itemId, bulanIdx, mingguIdx, val) => {
    setItems(items.map(item => {
      if (item.id === itemId) {
        const newDist = { ...item.dist };
        const monthArr = [...(newDist[bulanIdx] || [0, 0, 0, 0])];
        monthArr[mingguIdx] = parseInt(val) || 0;
        newDist[bulanIdx] = monthArr;
        return { ...item, dist: newDist };
      }
      return item;
    }));
  };

  const handleAddItem = () => {
    const newItem = {
      id: Date.now(),
      bab: 'Bab / Materi Pokok Baru',
      tp: 'Tujuan pembelajaran...',
      jp: 12,
      dist: { 0: [0, 0, 0, 0], 1: [0, 0, 0, 0], 2: [0, 0, 0, 0], 3: [0, 0, 0, 0], 4: [0, 0, 0, 0], 5: [0, 0, 0, 0] }
    };
    setItems([...items, newItem]);
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleSave = () => {
    if (onSaveToBank) {
      onSaveToBank({
        id: 'prosem-' + Date.now(),
        title: `Program Semester (PROSEM) - ${identitas.matpel} Semester ${identitas.semester}`,
        type: 'PROSEM',
        identitas,
        items,
        totalJP,
        updatedAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
      });
    }
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      {/* Top Bar Navigation (Hidden during print) */}
      <div className="no-print bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-teal-700 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Kembali
            </button>
          )}
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-teal-100 text-teal-800 font-bold">
              <CalendarRange className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-extrabold text-slate-800">Program Semester (PROSEM) KBC</h1>
              <p className="text-xs text-slate-500 font-medium">Distribusi Alokasi Jam Pelajaran per Minggu dan Bulan</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3.5 py-2.5 rounded-xl transition-colors"
          >
            <Save className="w-4 h-4" /> Simpan Dokumen
          </button>

          <button
            onClick={() => exportProsemWord && exportProsemWord({ identitas, items, bulanList, totalJP })}
            className="flex items-center gap-1.5 text-xs font-bold text-sky-800 bg-sky-50 hover:bg-sky-100 border border-sky-200 px-3.5 py-2.5 rounded-xl transition-colors"
          >
            <Download className="w-4 h-4" /> Export Word (.Docx)
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 text-xs font-bold text-white bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-700 hover:to-emerald-600 px-4 py-2.5 rounded-xl shadow-md shadow-teal-600/20 transition-all"
          >
            <Printer className="w-4 h-4" /> Cetak / PDF
          </button>
        </div>
      </div>

      {showNotification && (
        <div className="no-print bg-emerald-50 border border-emerald-300 text-emerald-900 p-4 rounded-xl flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span className="text-xs font-bold">Program Semester (PROSEM) berhasil disimpan ke Bank Perangkat!</span>
        </div>
      )}

      {/* FORM INPUT IDENTITAS (Hidden during print) */}
      <div className="no-print bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-sm font-extrabold text-slate-800 border-b border-slate-200 pb-2 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" /> Form Identitas & Pilihan Semester
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold">
          <div>
            <label className="text-slate-600">Nama Madrasah / Sekolah</label>
            <input
              type="text"
              value={identitas.namaSekolah}
              onChange={(e) => setIdentitas({ ...identitas, namaSekolah: e.target.value })}
              className="mt-1 w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>
          <div>
            <label className="text-slate-600">Mata Pelajaran</label>
            <input
              type="text"
              value={identitas.matpel}
              onChange={(e) => setIdentitas({ ...identitas, matpel: e.target.value })}
              className="mt-1 w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none uppercase font-bold text-teal-950"
            />
          </div>
          <div>
            <label className="text-slate-600">Semester & Tahun Ajaran</label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <select
                value={identitas.semester}
                onChange={(e) => setIdentitas({ ...identitas, semester: e.target.value })}
                className="p-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-teal-500 outline-none font-bold text-teal-900"
              >
                <option value="I (Ganjil)">Semester I (Ganjil)</option>
                <option value="II (Genap)">Semester II (Genap)</option>
              </select>
              <input
                type="text"
                value={identitas.tahunAjaran}
                onChange={(e) => setIdentitas({ ...identitas, tahunAjaran: e.target.value })}
                className="p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none text-center"
              />
            </div>
          </div>
          <div>
            <label className="text-slate-600">Nama Guru Mata Pelajaran</label>
            <input
              type="text"
              value={identitas.namaGuru}
              onChange={(e) => setIdentitas({ ...identitas, namaGuru: e.target.value })}
              className="mt-1 w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>
          <div>
            <label className="text-slate-600">NIP Guru</label>
            <input
              type="text"
              value={identitas.nipGuru}
              onChange={(e) => setIdentitas({ ...identitas, nipGuru: e.target.value })}
              className="mt-1 w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>
          <div>
            <label className="text-slate-600">Nama Kepala Madrasah</label>
            <input
              type="text"
              value={identitas.namaKepala}
              onChange={(e) => setIdentitas({ ...identitas, namaKepala: e.target.value })}
              className="mt-1 w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>
        </div>
      </div>

      {/* EDITABLE ITEMS TABLE & MATRIX (Hidden during print) */}
      <div className="no-print bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-extrabold text-slate-800">
            Matriks Pembagian JP per Minggu (Total Semester: <span className="text-teal-700 font-black">{totalJP} JP</span>)
          </h2>
          <button
            onClick={handleAddItem}
            className="flex items-center gap-1.5 text-xs font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 px-3 py-1.5 rounded-xl transition-colors"
          >
            <Plus className="w-4 h-4" /> Tambah Baris Materi
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse border border-slate-300">
            <thead>
              <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-300 text-center">
                <th rowSpan="2" className="p-2 border-r w-8">No</th>
                <th rowSpan="2" className="p-2 border-r w-48 text-left">Materi Pokok / Bab</th>
                <th rowSpan="2" className="p-2 border-r w-64 text-left">Tujuan Pembelajaran</th>
                <th rowSpan="2" className="p-2 border-r w-12">JP</th>
                {bulanList.map((b, bIdx) => (
                  <th key={bIdx} colSpan="4" className="p-1 border-r border-b bg-emerald-100 text-emerald-950 font-black">{b}</th>
                ))}
                <th rowSpan="2" className="p-2 w-10">Aksi</th>
              </tr>
              <tr className="bg-slate-50 text-[10px] border-b border-slate-300 text-center font-bold">
                {bulanList.map((_, bIdx) => (
                  <React.Fragment key={bIdx}>
                    <th className="p-1 border-r w-6">1</th>
                    <th className="p-1 border-r w-6">2</th>
                    <th className="p-1 border-r w-6">3</th>
                    <th className="p-1 border-r w-6">4</th>
                  </React.Fragment>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={item.id} className="border-b border-slate-200 hover:bg-slate-50">
                  <td className="p-2 border-r text-center font-bold">{idx + 1}</td>
                  <td className="p-2 border-r align-top">
                    <textarea
                      rows="2"
                      value={item.bab}
                      onChange={(e) => handleItemChange(item.id, 'bab', e.target.value)}
                      className="w-full p-1 rounded border border-slate-200 font-bold text-slate-900"
                    />
                  </td>
                  <td className="p-2 border-r align-top">
                    <textarea
                      rows="2"
                      value={item.tp}
                      onChange={(e) => handleItemChange(item.id, 'tp', e.target.value)}
                      className="w-full p-1 rounded border border-slate-200 text-slate-700"
                    />
                  </td>
                  <td className="p-2 border-r text-center font-bold text-teal-800 align-top">
                    <input
                      type="number"
                      value={item.jp}
                      onChange={(e) => handleItemChange(item.id, 'jp', parseInt(e.target.value) || 0)}
                      className="w-full p-1 rounded border border-slate-200 text-center font-bold"
                    />
                  </td>

                  {/* 6 BULAN x 4 MINGGU MATRIX */}
                  {bulanList.map((_, bIdx) => (
                    <React.Fragment key={bIdx}>
                      {[0, 1, 2, 3].map(mIdx => {
                        const val = (item.dist && item.dist[bIdx] && item.dist[bIdx][mIdx]) || 0;
                        return (
                          <td key={mIdx} className="p-1 border-r text-center align-middle">
                            <input
                              type="text"
                              value={val === 0 ? '' : val}
                              onChange={(e) => handleDistChange(item.id, bIdx, mIdx, e.target.value)}
                              className={`w-6 h-6 text-center font-bold text-[11px] rounded ${
                                val > 0 ? 'bg-emerald-100 text-emerald-900 border border-emerald-400' : 'bg-slate-50 border border-slate-200'
                              }`}
                            />
                          </td>
                        );
                      })}
                    </React.Fragment>
                  ))}

                  <td className="p-2 text-center align-top">
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="text-rose-600 hover:text-rose-800 p-1 rounded hover:bg-rose-50"
                      title="Hapus"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PRINTABLE OFFICIAL DOCUMENT DISPLAY */}
      <div className="printable-document bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-md space-y-6 text-slate-900 text-xs">
        
        {/* KOP OFFICIAL */}
        <div className="text-center border-b-2 border-slate-800 pb-3 space-y-1">
          <h2 className="text-sm font-bold uppercase tracking-wider">KEMENTERIAN AGAMA REPUBLIK INDONESIA</h2>
          <h3 className="text-base font-black uppercase text-slate-900">{identitas.namaSekolah}</h3>
          <p className="text-[11px] text-slate-600 font-medium">PROGRAM SEMESTER (PROSEM) KURIKULUM MERDEKA (KBC)</p>
          <p className="text-[11px] text-slate-600">SEMESTER {identitas.semester.toUpperCase()} • TAHUN PELAJARAN {identitas.tahunAjaran}</p>
        </div>

        {/* IDENTITAS TABULAR */}
        <div className="grid grid-cols-2 gap-4 font-semibold text-xs border-b border-slate-200 pb-3">
          <div className="space-y-1">
            <div className="grid grid-cols-12 gap-1">
              <span className="col-span-5 font-bold text-slate-600">Mata Pelajaran</span>
              <span className="col-span-7 font-black text-emerald-950">: {identitas.matpel}</span>
            </div>
            <div className="grid grid-cols-12 gap-1">
              <span className="col-span-5 font-bold text-slate-600">Kelas / Fase</span>
              <span className="col-span-7">: {identitas.kelas} / Fase {identitas.fase}</span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="grid grid-cols-12 gap-1">
              <span className="col-span-5 font-bold text-slate-600">Semester / Tahun</span>
              <span className="col-span-7">: {identitas.semester} / {identitas.tahunAjaran}</span>
            </div>
            <div className="grid grid-cols-12 gap-1">
              <span className="col-span-5 font-bold text-slate-600">Total Alokasi Semester</span>
              <span className="col-span-7 font-black text-teal-900">: {totalJP} Jam Pelajaran (JP)</span>
            </div>
          </div>
        </div>

        {/* TABLE PROSEM MATRIX */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-slate-400 text-[11px]">
            <thead>
              <tr className="bg-emerald-800 text-white font-bold text-center border-b border-slate-400">
                <th rowSpan="2" className="p-1.5 border border-slate-400 w-8">No</th>
                <th rowSpan="2" className="p-1.5 border border-slate-400 text-left">Materi Pokok / Bab Pembelajaran</th>
                <th rowSpan="2" className="p-1.5 border border-slate-400 w-12">JP</th>
                {bulanList.map((b, bIdx) => (
                  <th key={bIdx} colSpan="4" className="p-1 border border-slate-400 bg-emerald-900 text-white font-bold">{b}</th>
                ))}
              </tr>
              <tr className="bg-emerald-700 text-white text-[10px] text-center font-bold">
                {bulanList.map((_, bIdx) => (
                  <React.Fragment key={bIdx}>
                    <th className="p-0.5 border border-slate-400 w-5">1</th>
                    <th className="p-0.5 border border-slate-400 w-5">2</th>
                    <th className="p-0.5 border border-slate-400 w-5">3</th>
                    <th className="p-0.5 border border-slate-400 w-5">4</th>
                  </React.Fragment>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={item.id} className="border-b border-slate-300">
                  <td className="p-1.5 border border-slate-300 text-center font-bold">{idx + 1}</td>
                  <td className="p-1.5 border border-slate-300">
                    <div className="font-bold text-emerald-950">{item.bab}</div>
                    <div className="text-[10px] text-slate-600 leading-tight">{item.tp}</div>
                  </td>
                  <td className="p-1.5 border border-slate-300 text-center font-bold text-teal-900">{item.jp}</td>

                  {bulanList.map((_, bIdx) => (
                    <React.Fragment key={bIdx}>
                      {[0, 1, 2, 3].map(mIdx => {
                        const val = (item.dist && item.dist[bIdx] && item.dist[bIdx][mIdx]) || 0;
                        return (
                          <td key={mIdx} className="p-1 border border-slate-300 text-center font-bold text-[10px]">
                            {val > 0 ? val : ''}
                          </td>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </tr>
              ))}
              <tr className="bg-emerald-100 font-black text-emerald-950 text-center">
                <td colSpan="2" className="p-2 border border-slate-400 text-right uppercase">TOTAL ALOKASI JP SEMESTER</td>
                <td className="p-2 border border-slate-400 text-sm font-black">{totalJP}</td>
                <td colSpan="24" className="p-2 border border-slate-400 text-left text-[10px] pl-3">
                  Distribusi Jam Pembelajaran Efektif Semester {identitas.semester}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* SIGNATURE BLOCK */}
        <div className="pt-8 flex justify-between items-end text-xs font-medium text-slate-800 text-center">
          <div className="space-y-12">
            <p>Mengetahui,<br/>{formatKepalaHeader(identitas.namaSekolah)}</p>
            <div className="space-y-0.5">
              <p className="font-bold underline">{formatNamaDanGelar(identitas.namaKepala)}</p>
              <p className="text-[11px] text-slate-500">NIP. {identitas.nipKepala || '...........................................'}</p>
            </div>
          </div>

          <div className="space-y-12">
            <p>Guru Mata Pelajaran</p>
            <div className="space-y-0.5">
              <p className="font-bold underline">{formatNamaDanGelar(identitas.namaGuru)}</p>
              <p className="text-[11px] text-slate-500">NIP. {identitas.nipGuru || '...........................................'}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

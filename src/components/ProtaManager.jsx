import React, { useState } from 'react';
import { Calendar, Printer, Download, Plus, Trash2, ArrowLeft, Save, Sparkles, CheckCircle2 } from 'lucide-react';
import { formatNamaDanGelar, formatKepalaHeader } from '../utils/exportUtils';

const DEFAULT_PROTA_ITEMS = [
  { id: 1, semester: 'I (Ganjil)', bab: 'BAB 1 : التَّعَارُف (Perkenalan)', tp: 'Melafalkan, memahami mufrodat, hiwar, dan struktur Mubtada + Khabar terkait tema perkenalan', jp: 16, bulan: 'Juli - Agustus' },
  { id: 2, semester: 'I (Ganjil)', bab: 'BAB 2 : المَرَافِقُ المَدْرَسِيَّةُ (Fasilitas Sekolah)', tp: 'Memahami teks dan dialog tentang fasilitas sekolah serta penggunaan Na\'at Man\'ut', jp: 16, bulan: 'Agustus - September' },
  { id: 3, semester: 'I (Ganjil)', bab: 'BAB 3 : الأَدَوَاتُ المَدْرَسِيَّةُ (Peralatan Sekolah)', tp: 'Mendemonstrasikan kosa kata dan teks deskriptif tentang peralatan sekolah', jp: 16, bulan: 'Oktober - November' },
  { id: 4, semester: 'I (Ganjil)', bab: 'Asesmen Sumatif Akhir Semester (ASAS) I', tp: 'Evaluasi Capaian Pembelajaran Semester Ganjil', jp: 4, bulan: 'Desember' },
  { id: 5, semester: 'II (Genap)', bab: 'BAB 4 : العُنْوَانُ (Alamat)', tp: 'Mengidentifikasi angka 1-100 dan tindak tutur menanyakan alamat rumah/sekolah', jp: 16, bulan: 'Januari - Februari' },
  { id: 6, semester: 'II (Genap)', bab: 'BAB 5 : البَيْتُ (Rumah)', tp: 'Memahami teks ruangan di rumah dan struktur Khobar Muqaddam + Mubtada Muakhar', jp: 16, bulan: 'Februari - Maret' },
  { id: 7, semester: 'II (Genap)', bab: 'BAB 6 : مِن يَوْمِيَّاتِ الأُسْرَةِ (Kegiatan Sehari-hari)', tp: 'Menyusun paragraf dan dialog tentang aktivitas keluarga menggunakan Fi\'il Mudhari\'', jp: 16, bulan: 'April - Mei' },
  { id: 8, semester: 'II (Genap)', bab: 'Asesmen Sumatif Akhir Semester (ASAS) II', tp: 'Evaluasi Capaian Pembelajaran Semester Genap', jp: 4, bulan: 'Juni' },
];

export default function ProtaManager({ onBack, onSaveToBank, exportProtaWord }) {
  const [identitas, setIdentitas] = useState({
    namaSekolah: 'MTs NEGERI 1 KOTA MALANG',
    matpel: 'BAHASA ARAB',
    kelas: 'VII',
    fase: 'D',
    tahunAjaran: '2024/2025',
    namaGuru: 'Hj. Elik Nurlaili, S.Si., M.Pd.',
    nipGuru: '19780512 200501 2 004',
    namaKepala: 'Drs. H. Ahmad Fauzi, M.Ag.',
    nipKepala: '19690315 199403 1 002'
  });

  const [items, setItems] = useState(DEFAULT_PROTA_ITEMS);
  const [showNotification, setShowNotification] = useState(false);

  const totalJP = items.reduce((acc, curr) => acc + (parseInt(curr.jp) || 0), 0);

  const handleItemChange = (id, field, value) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handleAddItem = () => {
    const newItem = {
      id: Date.now(),
      semester: 'I (Ganjil)',
      bab: 'Materi / Bab Baru',
      tp: 'Tujuan pembelajaran materi baru...',
      jp: 12,
      bulan: 'Bulan Pelaksanaan'
    };
    setItems([...items, newItem]);
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleSave = () => {
    if (onSaveToBank) {
      onSaveToBank({
        id: 'prota-' + Date.now(),
        title: `Program Tahunan (PROTA) - ${identitas.matpel} Kelas ${identitas.kelas}`,
        type: 'PROTA',
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
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
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
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-extrabold text-slate-800">Program Tahunan (PROTA) KBC</h1>
              <p className="text-xs text-slate-500 font-medium">Perencanaan Alokasi Waktu Pembelajaran 1 Tahun Ajaran</p>
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
            onClick={() => exportProtaWord && exportProtaWord({ identitas, items, totalJP })}
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
          <span className="text-xs font-bold">Program Tahunan (PROTA) berhasil disimpan ke Bank Perangkat!</span>
        </div>
      )}

      {/* FORM INPUT IDENTITAS (Hidden during print) */}
      <div className="no-print bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-sm font-extrabold text-slate-800 border-b border-slate-200 pb-2 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" /> Form Identitas & Informasi Program Tahunan
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
            <label className="text-slate-600">Kelas / Fase / Tahun Ajaran</label>
            <div className="grid grid-cols-3 gap-2 mt-1">
              <input
                type="text"
                placeholder="Kelas"
                value={identitas.kelas}
                onChange={(e) => setIdentitas({ ...identitas, kelas: e.target.value })}
                className="p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none text-center"
              />
              <input
                type="text"
                placeholder="Fase"
                value={identitas.fase}
                onChange={(e) => setIdentitas({ ...identitas, fase: e.target.value })}
                className="p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none text-center"
              />
              <input
                type="text"
                placeholder="Tahun"
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

      {/* EDITABLE ITEMS TABLE (Hidden during print) */}
      <div className="no-print bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-extrabold text-slate-800">
            Daftar Alokasi Waktu & Materi Pokok (Total: <span className="text-teal-700 font-black">{totalJP} JP</span>)
          </h2>
          <button
            onClick={handleAddItem}
            className="flex items-center gap-1.5 text-xs font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 px-3 py-1.5 rounded-xl transition-colors"
          >
            <Plus className="w-4 h-4" /> Tambah Baris Materi
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse border border-slate-200">
            <thead>
              <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                <th className="p-2.5 border-r w-28">Semester</th>
                <th className="p-2.5 border-r w-64">Bab / Materi Pokok</th>
                <th className="p-2.5 border-r">Tujuan Pembelajaran (TP)</th>
                <th className="p-2.5 border-r w-20 text-center">Alokasi (JP)</th>
                <th className="p-2.5 border-r w-36">Rencana Bulan</th>
                <th className="p-2.5 w-12 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={item.id} className="border-b border-slate-200 hover:bg-slate-50">
                  <td className="p-2 border-r align-top">
                    <select
                      value={item.semester}
                      onChange={(e) => handleItemChange(item.id, 'semester', e.target.value)}
                      className="w-full p-1.5 rounded-lg border border-slate-200 bg-white font-medium"
                    >
                      <option value="I (Ganjil)">I (Ganjil)</option>
                      <option value="II (Genap)">II (Genap)</option>
                    </select>
                  </td>
                  <td className="p-2 border-r align-top">
                    <textarea
                      rows="2"
                      value={item.bab}
                      onChange={(e) => handleItemChange(item.id, 'bab', e.target.value)}
                      className="w-full p-1.5 rounded-lg border border-slate-200 font-bold text-slate-900"
                    />
                  </td>
                  <td className="p-2 border-r align-top">
                    <textarea
                      rows="2"
                      value={item.tp}
                      onChange={(e) => handleItemChange(item.id, 'tp', e.target.value)}
                      className="w-full p-1.5 rounded-lg border border-slate-200 text-slate-700"
                    />
                  </td>
                  <td className="p-2 border-r align-top text-center">
                    <input
                      type="number"
                      value={item.jp}
                      onChange={(e) => handleItemChange(item.id, 'jp', parseInt(e.target.value) || 0)}
                      className="w-full p-1.5 rounded-lg border border-slate-200 text-center font-bold text-teal-800"
                    />
                  </td>
                  <td className="p-2 border-r align-top">
                    <input
                      type="text"
                      value={item.bulan}
                      onChange={(e) => handleItemChange(item.id, 'bulan', e.target.value)}
                      className="w-full p-1.5 rounded-lg border border-slate-200"
                    />
                  </td>
                  <td className="p-2 align-top text-center">
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="text-rose-600 hover:text-rose-800 p-1.5 rounded-lg hover:bg-rose-50"
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
      <div className="printable-document bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-md space-y-6 text-slate-900 text-xs">
        
        {/* KOP OFFICIAL */}
        <div className="text-center border-b-2 border-slate-800 pb-4 space-y-1">
          <h2 className="text-sm font-bold uppercase tracking-wider">KEMENTERIAN AGAMA REPUBLIK INDONESIA</h2>
          <h3 className="text-base font-black uppercase text-slate-900">{identitas.namaSekolah}</h3>
          <p className="text-[11px] text-slate-600 font-medium">PROGRAM TAHUNAN (PROTA) KURIKULUM MERDEKA (KBC)</p>
          <p className="text-[11px] text-slate-600">TAHUN PELAJARAN {identitas.tahunAjaran}</p>
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
              <span className="col-span-5 font-bold text-slate-600">Satuan Pendidikan</span>
              <span className="col-span-7">: {identitas.namaSekolah}</span>
            </div>
            <div className="grid grid-cols-12 gap-1">
              <span className="col-span-5 font-bold text-slate-600">Total Alokasi Waktu</span>
              <span className="col-span-7 font-black text-teal-900">: {totalJP} Jam Pelajaran (JP)</span>
            </div>
          </div>
        </div>

        {/* TABLE PROTA */}
        <div className="space-y-2">
          <table className="w-full border-collapse border border-slate-400 text-xs">
            <thead>
              <tr className="bg-emerald-800 text-white font-bold text-center border-b border-slate-400">
                <th className="p-2 border border-slate-400 w-10">No</th>
                <th className="p-2 border border-slate-400 w-24">Semester</th>
                <th className="p-2 border border-slate-400 w-56">Bab / Elemen / Materi Pokok</th>
                <th className="p-2 border border-slate-400">Tujuan Pembelajaran (TP)</th>
                <th className="p-2 border border-slate-400 w-16">Alokasi (JP)</th>
                <th className="p-2 border border-slate-400 w-28">Keterangan</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={item.id} className="border-b border-slate-300">
                  <td className="p-2 border border-slate-300 text-center font-bold">{idx + 1}</td>
                  <td className="p-2 border border-slate-300 text-center font-semibold">{item.semester}</td>
                  <td className="p-2 border border-slate-300 font-bold text-emerald-950">{item.bab}</td>
                  <td className="p-2 border border-slate-300 leading-relaxed">{item.tp}</td>
                  <td className="p-2 border border-slate-300 text-center font-bold text-teal-900">{item.jp} JP</td>
                  <td className="p-2 border border-slate-300 text-center">{item.bulan}</td>
                </tr>
              ))}
              <tr className="bg-emerald-50 font-black text-emerald-950">
                <td colSpan="4" className="p-2.5 border border-slate-400 text-right uppercase tracking-wider">TOTAL ALOKASI WAKTU TAHUNAN</td>
                <td className="p-2.5 border border-slate-400 text-center text-sm font-black">{totalJP} JP</td>
                <td className="p-2.5 border border-slate-400 text-center text-[10px]">1 Tahun Ajaran</td>
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

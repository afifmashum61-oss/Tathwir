import React from 'react';
import { Printer, Download, ArrowLeft, Edit3, Heart } from 'lucide-react';
import { triggerPrintDocument, exportToWordDoc, formatNamaDanGelar, formatKepalaHeader } from '../utils/exportUtils';

export default function DocumentPreview({ docData, onEdit, onBack }) {
  if (!docData) return null;

  const kesiapan = docData.kesiapan || {};
  const temaKBC = docData.temaKBC || {};
  const karakteristik = docData.karakteristikMateri || {};
  const profil = docData.dimensiProfil || {};
  const deep = docData.deepLearning || {};

  const namaKepalaFormatted = formatNamaDanGelar(docData.namaKepala);
  const namaGuruFormatted = formatNamaDanGelar(docData.namaGuru);
  const kepalaHeader = formatKepalaHeader(docData.namaSekolah);

  const arabGrammarText = "الجملةُ الاسميةُ، العددُ، التصريفُ اللغويُّ، فعلُ الأمرِ، الجملةُ الفعليةُ، أن - لن - لـ، لا الناهية / لم (+ الفعل المضارع)، المصدر الصريح، الفعل الماضي، كان واسمها وخبرها، الفعل المزيد، اسم الموصول، اسم التفضيل.";

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Top Action Bar (Hides during print) */}
      <div className="no-print bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-teal-700 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali
        </button>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-50 px-3 py-2 rounded-xl border border-rose-200">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" /> Modul Ajar Deep Learning (KBC)
          </div>

          <button
            onClick={onEdit}
            className="flex items-center gap-1.5 text-xs font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 px-3.5 py-2 rounded-xl transition-colors"
          >
            <Edit3 className="w-4 h-4" /> Edit Dokumen
          </button>

          <button
            onClick={() => exportToWordDoc(docData)}
            className="flex items-center gap-1.5 text-xs font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 px-3.5 py-2 rounded-xl transition-colors"
          >
            <Download className="w-4 h-4" /> Export (.Docx)
          </button>

          <button
            onClick={triggerPrintDocument}
            className="flex items-center gap-1.5 text-xs font-bold text-white bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-700 hover:to-emerald-600 px-4 py-2 rounded-xl shadow-md shadow-teal-600/20 transition-all"
          >
            <Printer className="w-4 h-4" /> Cetak / Download PDF (A4)
          </button>
        </div>
      </div>

      {/* PRINTABLE OFFICIAL DOCUMENT CONTAINER */}
      <div className="printable-document bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-md space-y-8 text-slate-900 text-sm leading-relaxed">
        
        {/* PAGE 1: COVER PAGE (HALAMAN DEPAN) */}
        <div className="cover-page-container min-h-[680px] flex flex-col justify-between items-center text-center pt-10 pb-10 border-b-2 border-slate-300 print:border-b-0 print:pb-0 print:pt-6" style={{ pageBreakAfter: 'always', breakAfter: 'page' }}>
          <div className="space-y-6 flex flex-col items-center w-full">
            <div className="bg-emerald-900 text-white w-full max-w-xl py-5 px-6 rounded-t-xl border-2 border-emerald-950 shadow-sm" style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>
              <h1 className="text-xl sm:text-2xl font-black tracking-wider uppercase">
                MODUL AJAR<br/>KURIKULUM MERDEKA (KBC)
              </h1>
            </div>

            <div className="bg-emerald-50/60 text-slate-900 w-full max-w-xl p-6 rounded-b-xl border-2 border-t-0 border-emerald-900 space-y-2.5 text-left text-xs font-bold" style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-5">Nama Madrasah</div>
                <div className="col-span-7">: {docData.namaSekolah || '...........................................'}</div>
              </div>
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-5">Nama Penyusun</div>
                <div className="col-span-7">: {namaGuruFormatted}</div>
              </div>
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-5">NIP</div>
                <div className="col-span-7">: {docData.nipGuru || '...........................................'}</div>
              </div>
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-5">Mata pelajaran</div>
                <div className="col-span-7 uppercase font-black text-emerald-950">: {docData.matpel || 'BAHASA ARAB'}</div>
              </div>
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-5">Fase D, Kelas / Semester</div>
                <div className="col-span-7">: {docData.kelas || 'VII (Tujuh)'} / {docData.semester || 'I (Ganjil)'}</div>
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-500 font-semibold pt-6">
            KEMENTERIAN AGAMA REPUBLIK INDONESIA • TAHUN PELAJARAN {docData.tahunAjaran || '2024/2025'}
          </div>
        </div>

        {/* HEADER BOX: MODUL AJAR DEEP LEARNING (KBC) */}
        <div className="bg-emerald-900 text-white p-3.5 rounded-lg text-center font-black text-sm uppercase tracking-wide space-y-0.5 shadow-sm" style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>
          <div>MODUL AJAR DEEP LEARNING (KBC)</div>
          <div>MATA PELAJARAN : {docData.matpel || 'BAHASA ARAB'}</div>
          <div className="text-amber-300 font-extrabold">{docData.bab || 'BAB 1 : التَّعَارُف (PERKENALAN)'}</div>
        </div>

        {/* A. IDENTITAS MODUL */}
        <div className="space-y-3">
          <div className="bg-emerald-100/80 text-emerald-950 font-black text-xs px-3 py-1.5 rounded-md uppercase">
            A. IDENTITAS MODUL
          </div>

          <div className="pl-3 space-y-1.5 text-xs text-slate-900 font-medium">
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-4 font-bold">Nama Madrasah</div>
              <div className="col-span-8">: {docData.namaSekolah || '...........................................'}</div>
            </div>
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-4 font-bold">Nama Penyusun</div>
              <div className="col-span-8">: {namaGuruFormatted}</div>
            </div>
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-4 font-bold">Mata Pelajaran</div>
              <div className="col-span-8 font-black text-emerald-950">: {docData.matpel || 'Bahasa Arab'}</div>
            </div>
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-4 font-bold">Kelas / Fase / Semester</div>
              <div className="col-span-8 font-bold">: {docData.kelas || 'VII'} / {docData.fase || 'D'} / {docData.semester || 'I (Ganjil)'}</div>
            </div>
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-4 font-bold">Alokasi Waktu</div>
              <div className="col-span-8">: {docData.alokasiWaktu || '16 JP (8 kali pertemuan)'}</div>
            </div>
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-4 font-bold">Tahun Pelajaran</div>
              <div className="col-span-8">: {docData.tahunAjaran || '2024/2025'}</div>
            </div>
          </div>
        </div>

        {/* B. IDENTIFIKASI KESIAPAN PESERTA DIDIK */}
        <div className="space-y-3">
          <div className="bg-emerald-100/80 text-emerald-950 font-black text-xs px-3 py-1.5 rounded-md uppercase">
            B. IDENTIFIKASI KESIAPAN PESERTA DIDIK
          </div>

          <ul className="list-disc pl-6 space-y-2 text-xs text-slate-800 leading-relaxed">
            <li><span className="font-bold">Pengetahuan Awal :</span> {kesiapan.pengetahuanAwal || 'Peserta didik telah mengenal huruf hijaiyah dan beberapa kosakata dasar bahasa Arab yang sering didengar dalam kehidupan sehari-hari (misalnya: ana, anta, assalamu\'alaikum).'}</li>
            <li><span className="font-bold">Minat :</span> {kesiapan.minat || 'Peserta didik memiliki minat yang beragam, sebagian tertarik untuk memahami Al-Qur\'an, sebagian lain tertarik pada budaya Arab, dan ada yang ingin menguasai bahasa asing sebagai wujud cinta pada ilmu.'}</li>
            <li><span className="font-bold">Latar Belakang :</span> {kesiapan.latarBelakang || 'Peserta didik berasal dari latar belakang keluarga dan sosial yang beragam, membawa pemahaman awal yang berbeda tentang interaksi sosial dan pentingnya menjalin persahabatan.'}</li>
            <li>
              <span className="font-bold">Kebutuhan Belajar :</span>
              <ul className="list-circle pl-6 mt-1 space-y-1">
                <li><span className="font-semibold">Visual:</span> {kesiapan.kebutuhanVisual || 'Peta konsep, kartu kata (flashcards) bergambar, video perkenalan.'}</li>
                <li><span className="font-semibold">Auditori:</span> {kesiapan.kebutuhanAuditori || 'Mendengarkan pelafalan mufrodat dari guru, rekaman dialog, lagu tentang perkenalan.'}</li>
                <li><span className="font-semibold">Kinestetik:</span> {kesiapan.kebutuhanKinestetik || 'Bermain peran (role playing) dialog perkenalan, permainan mencocokkan kartu, bergerak aktif dalam kelompok.'}</li>
              </ul>
            </li>
          </ul>
        </div>

        {/* C. TEMA KURIKULUM BERBASIS CINTA */}
        <div className="space-y-3">
          <div className="bg-emerald-100/80 text-emerald-950 font-black text-xs px-3 py-1.5 rounded-md uppercase flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
            C. TEMA KURIKULUM BERBASIS CINTA
          </div>

          <ul className="list-disc pl-6 space-y-2 text-xs text-slate-800 leading-relaxed">
            <li><span className="font-bold text-rose-900">Topik Panca Cinta :</span> {temaKBC.topikPancaCinta || 'Cinta Diri dan Sesama Manusia, Cinta Allah Swt. dan Rasul-Nya'}</li>
            <li><span className="font-bold text-rose-900">Materi Insersi :</span> {temaKBC.materiInsersi || 'Ajaran Islam tentang ukhuwah Islamiyah (persaudaraan dalam Islam) dan ukhuwah insaniyah (persaudaraan kemanusiaan), Adab kepada teman, Keimanan dan ketakwaan kepada Allah Swt. sebagai inti dan muara kehidupan.'}</li>
          </ul>
        </div>

        {/* D. KARAKTERISTIK MATERI PELAJARAN */}
        <div className="space-y-3">
          <div className="bg-emerald-100/80 text-emerald-950 font-black text-xs px-3 py-1.5 rounded-md uppercase">
            D. KARAKTERISTIK MATERI PELAJARAN
          </div>

          <ul className="list-disc pl-6 space-y-2 text-xs text-slate-800 leading-relaxed">
            <li>
              <span className="font-bold">Jenis Pengetahuan yang Akan Dicapai :</span>
              <ul className="list-circle pl-6 mt-1 space-y-1">
                <li><span className="font-semibold">Konseptual:</span> {karakteristik.konseptual || 'Memahami fungsi sosial dari teks perkenalan, makna mufrodat (kata ganti, kata sapa, profesi), dan konsep dasar kalimat nominal (Mubtada\' & Khabar).'}</li>
                <li><span className="font-semibold">Prosedural:</span> {karakteristik.prosedural || 'Mampu melakukan tindak tutur untuk memperkenalkan diri dan orang lain, serta menanyakan identitas dengan pola kalimat yang benar.'}</li>
              </ul>
            </li>
            <li><span className="font-bold">Relevansi dengan Kehidupan Nyata Peserta Didik :</span> {karakteristik.relevansi || 'Materi perkenalan sangat relevan karena merupakan keterampilan sosial dasar untuk membangun hubungan yang baik dan penuh cinta dengan teman baru di lingkungan madrasah.'}</li>
            <li><span className="font-bold">Tingkat Kesulitan :</span> {karakteristik.tingkatKesulitan || 'Dasar. Materi ini menjadi fondasi bagi pembelajaran bab-bab selanjutnya.'}</li>
            <li><span className="font-bold">Struktur Materi :</span> {karakteristik.strukturMateri || 'Materi disajikan secara sistematis, dimulai dari pengenalan kosakata (mufrodat), dilanjutkan dengan pemahaman teks (nushus), praktik dialog (hiwar), analisis kaidah bahasa (tarkib), hingga memproduksi teks secara mandiri.'}</li>
            <li><span className="font-bold">Integrasi Nilai dan Karakter :</span> {karakteristik.integrasiNilai || 'Mengintegrasikan nilai-nilai cinta, sopan santun, saling menghargai, percaya diri, dan keberanian dalam berinteraksi sebagai wujud cinta pada diri sendiri dan sesama.'}</li>
          </ul>
        </div>

        {/* E. DIMENSI PROFIL LULUSAN */}
        <div className="space-y-3">
          <div className="bg-emerald-100/80 text-emerald-950 font-black text-xs px-3 py-1.5 rounded-md uppercase">
            E. DIMENSI PROFIL LULUSAN
          </div>

          <ul className="list-disc pl-6 space-y-2 text-xs text-slate-800 leading-relaxed">
            <li><span className="font-bold">Keimanan dan Ketakwaan terhadap Tuhan Yang Maha Esa, dan Berakhlak Mulia :</span> {profil.keimanan || 'Menggunakan sapaan Islami (Assalamu\'alaikum) saat memulai perkenalan sebagai wujud cinta dan doa kepada sesama.'}</li>
            <li><span className="font-bold">Kewargaan :</span> {profil.kewargaan || 'Menghargai perbedaan asal daerah teman sebagai bagian dari kekayaan bangsa dan wujud ukhuwah wathaniyah (persaudaraan kebangsaan).'}</li>
            <li><span className="font-bold">Penalaran Kritis :</span> {profil.penalaranKritis || 'Menganalisis pola kalimat sederhana (Mubtada\' + Khabar) untuk memahami struktur dasar bahasa Arab.'}</li>
            <li><span className="font-bold">Kreativitas :</span> {profil.kreativitas || 'Menghasilkan teks atau dialog perkenalan sederhana secara mandiri atau berkelompok dengan gaya mereka sendiri.'}</li>
            <li><span className="font-bold">Kolaborasi :</span> {profil.kolaborasi || 'Bekerja sama dalam pasangan atau kelompok untuk mempraktikkan dialog dan memproduksi teks bersama, menumbuhkan rasa cinta dan kebersamaan.'}</li>
            <li><span className="font-bold">Kemandirian :</span> {profil.kemandirian || 'Berani memperkenalkan diri di depan kelas, menunjukkan rasa percaya diri sebagai wujud cinta pada potensi diri.'}</li>
            <li><span className="font-bold">Kesehatan :</span> {profil.kesehatan || 'Membangun hubungan sosial yang sehat dan positif dengan teman-teman baru di lingkungan madrasah.'}</li>
            <li><span className="font-bold">Komunikasi :</span> {profil.komunikasi || 'Mampu berkomunikasi secara lisan dan tulisan dalam bahasa Arab pada tingkat dasar untuk tujuan perkenalan.'}</li>
          </ul>
        </div>

        {/* GREEN BANNER: DESAIN PEMBELAJARAN */}
        <div className="pt-4 text-center">
          <div className="bg-emerald-800 text-white py-2 px-6 rounded-lg inline-block font-black text-sm uppercase tracking-widest shadow-sm">
            DESAIN PEMBELAJARAN
          </div>
        </div>

        {/* A. CAPAIAN PEMBELAJARAN (CP) */}
        <div className="space-y-3">
          <div className="bg-emerald-100/80 text-emerald-950 font-black text-xs px-3 py-1.5 rounded-md uppercase">
            A. CAPAIAN PEMBELAJARAN (CP)
          </div>
          <p className="text-xs text-slate-800 leading-relaxed pl-1">
            {docData.cp || 'Pada akhir fase D, peserta didik mempunyai kemampuan memahami informasi tersirat dan tersurat dari berbagai jenis teks lisan dan teks visual atau multimodal, membangun interaksi, dan mengomunikasikan ide yang terstruktur baik secara tertulis maupun lisan.'}
          </p>

          <table className="w-full text-xs border-collapse border border-slate-300 mt-2">
            <thead>
              <tr className="bg-emerald-100 text-emerald-950 font-bold border-b border-slate-300">
                <th className="p-2 border-r border-slate-300 text-center w-1/4">Elemen</th>
                <th className="p-2 text-center">Capaian Pembelajaran</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-300">
                <td className="p-2.5 font-bold border-r border-slate-300 bg-slate-50 align-top">
                  Menyimak - Berbicara
                </td>
                <td className="p-2.5 text-slate-800 leading-relaxed">
                  Memahami informasi yang diterima secara tersirat dan tersurat serta interaksi tentang tema madrasah, rumah, hobi, pekerjaan, kesehatan, hari-hari besar Islam, pariwisata, alam, dan lingkungan dengan susunan gramatikal:
                  <div className="dir-rtl text-right font-mono text-xs mt-1.5 p-2 bg-slate-50 rounded border border-slate-200 text-teal-950 font-bold">
                    {arabGrammarText}
                  </div>
                </td>
              </tr>
              <tr className="border-b border-slate-300">
                <td className="p-2.5 font-bold border-r border-slate-300 bg-slate-50 align-top">
                  Membaca - Memirsa
                </td>
                <td className="p-2.5 text-slate-800 leading-relaxed">
                  Memahami informasi secara tersurat dan tersirat berbagai jenis teks visual atau multimodal tentang madrasah, rumah, hobi, pekerjaan, kesehatan, hari-hari besar Islam, pariwisata, alam, dan lingkungan dengan susunan gramatikal:
                  <div className="dir-rtl text-right font-mono text-xs mt-1.5 p-2 bg-slate-50 rounded border border-slate-200 text-teal-950 font-bold">
                    {arabGrammarText}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold border-r border-slate-300 bg-slate-50 align-top">
                  Menulis - Mempresentasikannya
                </td>
                <td className="p-2.5 text-slate-800 leading-relaxed">
                  Mengomunikasikan ide baik secara tertulis maupun lisan melalui paragraf sederhana pada berbagai jenis teks dan terstruktur tentang madrasah, rumah, hobi, pekerjaan, kesehatan, hari-hari besar Islam, pariwisata, alam, dan lingkungan dengan susunan gramatikal:
                  <div className="dir-rtl text-right font-mono text-xs mt-1.5 p-2 bg-slate-50 rounded border border-slate-200 text-teal-950 font-bold">
                    {arabGrammarText}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* B. LINTAS DISIPLIN ILMU */}
        <div className="space-y-3">
          <div className="bg-emerald-100/80 text-emerald-950 font-black text-xs px-3 py-1.5 rounded-md uppercase">
            B. LINTAS DISIPLIN ILMU
          </div>

          <ul className="list-disc pl-6 space-y-2 text-xs text-slate-800 leading-relaxed">
            <li><span className="font-bold">Ilmu Pengetahuan Sosial (IPS) :</span> Mengenal berbagai daerah dan provinsi di Indonesia saat menanyakan asal teman.</li>
            <li><span className="font-bold">Pendidikan Kewarganegaraan (PPKn) :</span> Menumbuhkan sikap saling menghargai dalam keberagaman suku dan daerah.</li>
            <li><span className="font-bold">Seni Budaya :</span> Mengekspresikan diri melalui permainan peran (role playing) dalam dialog perkenalan.</li>
          </ul>
        </div>

        {/* C. TUJUAN PEMBELAJARAN */}
        <div className="space-y-3">
          <div className="bg-emerald-100/80 text-emerald-950 font-black text-xs px-3 py-1.5 rounded-md uppercase">
            C. TUJUAN PEMBELAJARAN
          </div>

          <ul className="list-disc pl-6 space-y-2.5 text-xs text-slate-800 leading-relaxed">
            <li><span className="font-bold">Pertemuan 1-2 :</span> Peserta didik mampu melafalkan, menghafalkan, dan memahami <i>mufrodat</i> terkait tema <b>التعارف</b> (kata sapa, kata ganti, kata tanya, profesi) untuk menumbuhkan rasa cinta dalam berkomunikasi. (4 JP)</li>
            <li><span className="font-bold">Pertemuan 3-4 :</span> Peserta didik mampu memahami informasi dari teks deskriptif sederhana dan dialog (hiwar) terkait tema <b>التعارف</b> serta menganalisis struktur kalimat <i>Mubtada' (dhamir) + Khabar</i> sebagai landasan untuk mengungkapkan gagasan dengan penuh cinta. (4 JP)</li>
            <li><span className="font-bold">Pertemuan 5-6 :</span> Peserta didik mampu mendemonstrasikan tindak tutur memperkenalkan diri dan orang lain melalui dialog sederhana secara berpasangan dengan sikap saling menghargai. (4 JP)</li>
            <li><span className="font-bold">Pertemuan 7-8 :</span> Peserta didik mampu menyusun teks deskriptif sangat sederhana tentang perkenalan diri dan teman secara berkelompok dan mandiri sebagai wujud kreativitas dan cinta pada proses belajar. (4 JP)</li>
          </ul>
        </div>

        {/* D. INDIKATOR KETERCAPAIAN TUJUAN PEMBELAJARAN (IKTP) */}
        <div className="space-y-3">
          <div className="bg-emerald-100/80 text-emerald-950 font-black text-xs px-3 py-1.5 rounded-md uppercase">
            D. INDIKATOR KETERCAPAIAN TUJUAN PEMBELAJARAN
          </div>

          <ol className="list-decimal pl-6 space-y-1.5 text-xs text-slate-800 leading-relaxed">
            <li>Melafalkan mufrodat terkait tema perkenalan dengan intonasi yang benar.</li>
            <li>Menjelaskan makna mufrodat terkait tema perkenalan.</li>
            <li>Menjawab pertanyaan terkait isi teks sederhana tentang perkenalan.</li>
            <li>Mengidentifikasi struktur <i>Mubtada' (dhamir) + Khabar</i> dalam kalimat.</li>
            <li>Mendemonstrasikan dialog sederhana tentang perkenalan diri dan orang lain.</li>
            <li>Menyusun kalimat sederhana menggunakan struktur <i>Mubtada' + Khabar</i>.</li>
            <li>Menulis sebuah paragraf pendek untuk memperkenalkan diri dan teman.</li>
          </ol>
        </div>

        {/* E. IKLIM / BUDAYA MADRASAH */}
        <div className="space-y-3">
          <div className="bg-emerald-100/80 text-emerald-950 font-black text-xs px-3 py-1.5 rounded-md uppercase">
            E. IKLIM/BUDAYA MADRASAH
          </div>

          <ul className="list-disc pl-6 space-y-1.5 text-xs text-slate-800 leading-relaxed">
            <li>Menciptakan suasana belajar yang penuh cinta, aman, nyaman, dan menyenangkan.</li>
            <li>Membiasakan penggunaan sapaan Islami dan ungkapan positif dalam interaksi sehari-hari.</li>
            <li>Mendorong budaya saling mendukung dan menghargai antar peserta didik dalam setiap aktivitas pembelajaran.</li>
          </ul>
        </div>

        {/* F. TOPIK PEMBELAJARAN KONTEKSTUAL */}
        <div className="space-y-3">
          <div className="bg-emerald-100/80 text-emerald-950 font-black text-xs px-3 py-1.5 rounded-md uppercase">
            F. TOPIK PEMBELAJARAN KONTEKSTUAL
          </div>
          <p className="text-xs text-slate-800 leading-relaxed pl-1">
            Perkenalan diri dan teman di lingkungan madrasah sebagai wujud menumbuhkan <i>ukhuwah</i> (persaudaraan) dan cinta kepada sesama.
          </p>
        </div>

        {/* G. KERANGKA PEMBELAJARAN */}
        <div className="space-y-4">
          <div className="bg-emerald-100/80 text-emerald-950 font-black text-xs px-3 py-1.5 rounded-md uppercase">
            G. KERANGKA PEMBELAJARAN
          </div>

          {/* PRAKTIK PEDAGOGIK */}
          <div className="space-y-3 pl-2">
            <span className="bg-emerald-700 text-white px-2.5 py-1 rounded text-xs font-black uppercase">
              PRAKTIK PEDAGOGIK
            </span>

            <ul className="list-disc pl-6 space-y-2 text-xs text-slate-800 leading-relaxed">
              <li><span className="font-bold">Model Pembelajaran :</span> <i>Discovery Learning, Cooperative Learning</i></li>
              <li>
                <span className="font-bold">Pendekatan :</span> <i>Deep Learning (Mindful, Meaningful, Joyful Learning)</i>
                <ul className="list-circle pl-6 mt-1 space-y-1.5">
                  <li><span className="font-bold">Mindful Learning:</span> Peserta didik berlatih fokus dan sadar penuh saat menyimak pelafalan guru (<i>istima'</i>) dan saat melafalkan kembali (<i>takallum</i>), menumbuhkan cinta pada setiap bunyi dan kata.</li>
                  <li><span className="font-bold">Meaningful Learning:</span> Peserta didik menghubungkan materi perkenalan dengan pengalaman nyata mereka dalam menjalin persahabatan, memahami bahwa mengenal orang lain adalah cara menebar cinta.</li>
                  <li><span className="font-bold">Joyful Learning:</span> Pembelajaran dikemas dalam bentuk permainan, lagu, dan role playing agar peserta didik merasa senang dan antusias.</li>
                </ul>
              </li>
              <li><span className="font-bold">Metode Pembelajaran :</span> Ceramah interaktif, tanya jawab, diskusi, permainan, demonstrasi, <i>role playing</i>, penugasan.</li>
              <li>
                <span className="font-bold">Strategi Pembelajaran Berdiferensiasi :</span>
                <ul className="list-circle pl-6 mt-1 space-y-1.5">
                  <li><span className="font-bold">Diferensiasi Konten:</span> Menyediakan materi melalui berbagai media (teks, gambar, audio). Guru memberikan kartu kata dengan atau tanpa gambar sesuai kebutuhan peserta didik.</li>
                  <li><span className="font-bold">Diferensiasi Proses:</span> Peserta didik dapat berlatih secara individu, berpasangan, atau dalam kelompok kecil. Guru memberikan bimbingan yang berbeda sesuai tingkat pemahaman.</li>
                  <li><span className="font-bold">Diferensiasi Produk:</span> Peserta didik dapat menunjukkan pemahaman melalui tulisan (paragraf), lisan (dialog), atau rekaman video perkenalan sederhana.</li>
                </ul>
              </li>
            </ul>
          </div>

          {/* KEMITRAAN PEMBELAJARAN */}
          <div className="space-y-3 pl-2 pt-2">
            <span className="bg-emerald-700 text-white px-2.5 py-1 rounded text-xs font-black uppercase">
              KEMITRAAN PEMBELAJARAN
            </span>

            <ul className="list-disc pl-6 space-y-1.5 text-xs text-slate-800 leading-relaxed">
              <li><span className="font-bold">Lingkungan Sekolah:</span> Berinteraksi dengan teman sekelas, kakak kelas, atau guru lain di lingkungan madrasah untuk mempraktikkan perkenalan.</li>
              <li><span className="font-bold">Lingkungan Luar Sekolah/Masyarakat:</span> Mendorong peserta didik untuk memperkenalkan diri dengan sopan kepada tetangga atau saudara baru.</li>
              <li><span className="font-bold">Mitra Digital:</span> Menggunakan aplikasi kamus Arab online atau platform video untuk melihat contoh-contoh perkenalan dalam bahasa Arab.</li>
            </ul>
          </div>

          {/* LINGKUNGAN BELAJAR */}
          <div className="space-y-3 pl-2 pt-2">
            <span className="bg-emerald-700 text-white px-2.5 py-1 rounded text-xs font-black uppercase">
              LINGKUNGAN BELAJAR
            </span>

            <ul className="list-disc pl-6 space-y-1.5 text-xs text-slate-800 leading-relaxed">
              <li><span className="font-bold">Ruang Fisik:</span> Menata tempat duduk secara fleksibel (klasikal, berkelompok, berpasangan) untuk mendukung berbagai aktivitas. Menempelkan poster mufrodat di dinding kelas.</li>
              <li><span className="font-bold">Ruang Virtual:</span> Memanfaatkan grup WhatsApp atau Google Classroom untuk berbagi materi tambahan dan mengumpulkan tugas.</li>
              <li><span className="font-bold">Budaya Belajar:</span> Membangun budaya kelas yang positif di mana setiap peserta didik merasa dihargai, berani mencoba, dan tidak takut membuat kesalahan sebagai bagian dari proses belajar dengan cinta.</li>
            </ul>
          </div>

          {/* PEMANFAATAN DIGITAL */}
          <div className="space-y-3 pl-2 pt-2">
            <span className="bg-emerald-700 text-white px-2.5 py-1 rounded text-xs font-black uppercase">
              PEMANFAATAN DIGITAL
            </span>

            <ul className="list-disc pl-6 space-y-1.5 text-xs text-slate-800 leading-relaxed">
              <li>Menayangkan video perkenalan dari YouTube sebagai model.</li>
              <li>Menggunakan aplikasi seperti Quizlet atau Wordwall untuk latihan mufrodat yang menyenangkan.</li>
              <li>Merekam suara atau video peserta didik saat praktik dialog untuk portofolio digital.</li>
            </ul>
          </div>
        </div>

        {/* H. LANGKAH-LANGKAH PEMBELAJARAN BERDIFERENSIASI */}
        <div className="space-y-4 pt-2">
          <div className="bg-emerald-100/80 text-emerald-950 font-black text-xs px-3 py-1.5 rounded-md uppercase">
            H. LANGKAH-LANGKAH PEMBELAJARAN BERDIFERENSIASI
          </div>

          <div className="space-y-4 text-xs">
            <div className="border border-emerald-300 rounded-xl p-4 bg-emerald-50/20 space-y-3">
              <div className="bg-emerald-700 text-white px-3 py-1 rounded font-black text-xs inline-block uppercase">
                PERTEMUAN 1 (2 JP : 80 MENIT)
              </div>

              <div className="text-xs font-bold text-slate-800 space-y-0.5">
                <p>Topik Panca Cinta: Cinta Diri dan Sesama Manusia, Cinta Allah Swt. dan Rasul-Nya</p>
                <p>Pembahasan: Mufrodat (Kata Sapa, Kata Tanya, dan Kata Ganti)</p>
              </div>

              {/* KEGIATAN PENDAHULUAN */}
              <div className="space-y-2 pt-1">
                <span className="bg-amber-300 text-slate-900 font-bold px-2 py-0.5 rounded text-[11px] uppercase">
                  KEGIATAN PENDAHULUAN (15 MENIT)
                </span>
                <ul className="list-circle pl-6 space-y-1.5 text-slate-800 leading-relaxed">
                  <li><span className="font-bold">Salam Pembuka Cinta:</span> Guru membuka pelajaran dengan salam, senyum, dan menanyakan kabar dengan penuh kehangatan.</li>
                  <li><span className="font-bold">Doa dan Tadarus:</span> Membaca doa sebelum belajar dan surat pendek sebagai wujud cinta kepada Allah Swt.</li>
                  <li><span className="font-bold">Apersepsi Penuh Makna:</span> Guru bertanya, "Anak-anak, mengapa kita perlu berkenalan? Karena dengan saling mengenal, kita bisa saling menyayangi sebagai ciptaan Allah."</li>
                  <li><span className="font-bold">Penyampaian Tujuan:</span> Guru menyampaikan tujuan pembelajaran hari ini, yaitu mengenal kata-kata indah dalam bahasa Arab untuk menyapa dan mengenal teman baru.</li>
                </ul>
              </div>

              {/* KEGIATAN INTI */}
              <div className="space-y-2 pt-2">
                <span className="bg-amber-300 text-slate-900 font-bold px-2 py-0.5 rounded text-[11px] uppercase">
                  KEGIATAN INTI (50 MENIT)
                </span>
                <ul className="list-circle pl-6 space-y-2 text-slate-800 leading-relaxed">
                  <li><span className="font-bold">Mindful Listening:</span> Guru melafalkan mufrodat sapaan (التحيات), kata tanya (الاستفهام), dan kata ganti (الضمائر) dari buku dengan intonasi yang jelas. Peserta didik mendengarkan dengan saksama.</li>
                  <li><span className="font-bold">Joyful Repetition:</span> Peserta didik menirukan pelafalan guru secara klasikal, per baris, lalu individu dengan semangat. Guru bisa menggunakan gerakan tangan untuk beberapa kata.</li>
                  <li><span className="font-bold">Meaningful Connection:</span> Guru menjelaskan makna setiap kata dan kapan penggunaannya, <span className="font-bold">menekankan</span> bahwa sapaan adalah doa dan wujud cinta.</li>
                  <li>
                    <span className="font-bold">Pembelajaran Berdiferensiasi:</span>
                    <ul className="list-square pl-6 mt-1 space-y-1.5">
                      <li><span className="font-bold">Proses:</span> Peserta didik dibagi menjadi kelompok kecil. Guru memberikan kartu mufrodat (Diferensiasi Konten: beberapa kartu ada gambar, beberapa hanya tulisan). Mereka bermain tebak kata atau mencocokkan kata dengan artinya.</li>
                      <li><span className="font-bold">Produk:</span> Setiap kelompok mencoba membuat satu kalimat sapaan sederhana di papan tulis.</li>
                    </ul>
                  </li>
                </ul>
              </div>

              {/* KEGIATAN PENUTUP */}
              <div className="space-y-2 pt-2">
                <span className="bg-amber-300 text-slate-900 font-bold px-2 py-0.5 rounded text-[11px] uppercase">
                  KEGIATAN PENUTUP (15 MENIT)
                </span>
                <ul className="list-circle pl-6 space-y-1.5 text-slate-800 leading-relaxed">
                  <li><span className="font-bold">Refleksi:</span> Guru mengajak peserta didik merenung, "Kata sapaan cinta apa yang paling kalian sukai hari ini dan mengapa?"</li>
                  <li><span className="font-bold">Rangkuman:</span> Guru bersama peserta didik menyimpulkan mufrodat yang telah dipelajari.</li>
                  <li><span className="font-bold">Tindak Lanjut:</span> Menugaskan peserta didik untuk menyapa anggota keluarga di rumah menggunakan salah satu sapaan yang dipelajari.</li>
                  <li><span className="font-bold">Penutup:</span> Salam dan doa.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* I. ASESMEN PEMBELAJARAN */}
        <div className="space-y-3 pt-2">
          <div className="bg-emerald-100/80 text-emerald-950 font-black text-xs px-3 py-1.5 rounded-md uppercase">
            I. ASESMEN PEMBELAJARAN
          </div>

          <div className="grid grid-cols-3 gap-3 text-xs">
            <div className="p-3 border border-slate-200 rounded-xl bg-slate-50">
              <div className="font-bold text-slate-900 mb-1.5 uppercase border-b border-slate-200 pb-1">ASESMEN DIAGNOSTIK</div>
              <ul className="list-disc pl-4 space-y-1 text-slate-700 text-[11px]">
                <li>Tanya jawab lisan tentang pengetahuan kosakata Arab yang sering didengar (misal: "Siapa tahu arti 'ana'?").</li>
                <li>Meminta siswa menuliskan beberapa huruf hijaiyah yang diingat.</li>
              </ul>
            </div>

            <div className="p-3 border border-slate-200 rounded-xl bg-slate-50">
              <div className="font-bold text-slate-900 mb-1.5 uppercase border-b border-slate-200 pb-1">ASESMEN FORMATIF</div>
              <ul className="list-disc pl-4 space-y-1 text-slate-700 text-[11px]">
                <li><span className="font-semibold">Observasi:</span> Pengamatan sikap siswa (keaktifan, kerja sama, keberanian).</li>
                <li><span className="font-semibold">Penilaian Kinerja:</span> Pelafalan mufrodat & mendemonstrasikan dialog.</li>
                <li><span className="font-semibold">Tugas Tertulis:</span> Hasil kerja kelompok & tulisan mandiri.</li>
              </ul>
            </div>

            <div className="p-3 border border-slate-200 rounded-xl bg-slate-50">
              <div className="font-bold text-slate-900 mb-1.5 uppercase border-b border-slate-200 pb-1">ASESMEN SUMATIF</div>
              <ul className="list-disc pl-4 space-y-1 text-slate-700 text-[11px]">
                <li><span className="font-semibold">Tes Tulis:</span> Pilihan ganda & esai mufrodat/tarkib Bab 1.</li>
                <li><span className="font-semibold">Tes Praktik/Unjuk Kerja:</span> Presentasi paragraf perkenalan lisan/tulisan.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* SIGNATURE BLOCK FOR OFFICIAL PRINT */}
        <div className="pt-10 flex justify-between items-end text-xs font-medium text-slate-800 text-center print:break-inside-avoid" style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}>
          <div className="space-y-12">
            <p>Mengetahui,<br/>{kepalaHeader}</p>
            <div className="space-y-0.5">
              <p className="font-bold underline">{namaKepalaFormatted}</p>
              <p className="text-[11px] text-slate-500">NIP. {docData.nipKepala || '...........................................'}</p>
            </div>
          </div>

          <div className="space-y-12">
            <p>Guru Mata Pelajaran</p>
            <div className="space-y-0.5">
              <p className="font-bold underline">{namaGuruFormatted}</p>
              <p className="text-[11px] text-slate-500">NIP. {docData.nipGuru || '...........................................'}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

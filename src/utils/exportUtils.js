import { generateAIContent } from './aiGenerator';

export const formatNamaDanGelar = (str) => {
  if (!str) return '...........................................';
  let formatted = str.trim();
  
  // Standardize common academic titles according to EYD / PUEBI
  formatted = formatted
    .replace(/\bS\.?\s*Si\.?/gi, 'S.Si.')
    .replace(/\bM\.?\s*Pd\.?\s*I\.?/gi, 'M.Pd.I.')
    .replace(/\bS\.?\s*Pd\.?\s*I\.?/gi, 'S.Pd.I.')
    .replace(/\bM\.?\s*Pd\.?/gi, 'M.Pd.')
    .replace(/\bS\.?\s*Pd\.?/gi, 'S.Pd.')
    .replace(/\bM\.?\s*Ag\.?/gi, 'M.Ag.')
    .replace(/\bS\.?\s*Ag\.?/gi, 'S.Ag.')
    .replace(/\bM\.?\s*Si\.?/gi, 'M.Si.')
    .replace(/\bHj\.?/gi, 'Hj.')
    .replace(/\bH\.?\b/gi, 'H.')
    .replace(/\bDrs\.?/gi, 'Drs.')
    .replace(/\bDra\.?/gi, 'Dra.')
    .replace(/\bDr\.?\b/gi, 'Dr.')
    .replace(/\bProf\.?/gi, 'Prof.');

  // Clean any multiple dots
  formatted = formatted.replace(/\.{2,}/g, '.');

  return formatted;
};

export const cleanMarkdownText = (str) => {
  if (!str) return '';
  return str
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/^---$/gm, '')
    .replace(/`{1,3}(.*?)`{1,3}/g, '$1');
};

export const formatKepalaHeader = (namaSekolah) => {
  if (!namaSekolah) return 'Kepala Madrasah / Sekolah';
  const clean = namaSekolah.trim();
  if (/^(Kepala)\s+/i.test(clean)) return clean;
  return `Kepala ${clean}`;
};

export const getCPTableData = (docData) => {
  if (!docData) return [];

  const matpel = docData.matpel || 'Bahasa Arab';
  let rawTopic = docData.bab || docData.title || 'al-Ta\'aruf (Perkenalan)';
  let cleanTopic = rawTopic.replace(/^BAB\s+[0-9IVXLCDM]+\s*[:\-]?\s*/i, '').trim();
  if (!cleanTopic) cleanTopic = rawTopic;

  const isArabic = matpel.toUpperCase().includes('ARAB');
  
  // Custom Kaidah / Sub-topik text from user input or dynamic topic
  const kaidahSubtopik = (docData.petaKonsep && docData.petaKonsep.trim())
    ? docData.petaKonsep
    : (docData.materiUraian && docData.materiUraian.trim())
    ? docData.materiUraian.slice(0, 200) + '...'
    : isArabic
    ? `Pembahasan ${cleanTopic}: Ungkapan Sapaan (At-Tahiyyat), Kata Ganti (Dhamir), Kata Tanya (Istifham), Profesi & Kaidah Mubtada' + Khabar`
    : `Peta Konsep & Pokok Bahasan Utama: Pengenalan Konsep ${cleanTopic}, Analisis Kasus, dan Penerapan Praktis`;

  if (isArabic) {
    return [
      {
        elemen: 'Menyimak - Berbicara (Istima\' & Kalam)',
        cpText: `Memahami informasi yang diterima secara tersirat dan tersurat serta mampu membangun interaksi lisan secara santun tentang tema ${cleanTopic} dalam mata pelajaran ${matpel} berbasis Kurikulum Berbasis Cinta (KBC) dengan susunan gramatikal/kaidah:`,
        subBox: kaidahSubtopik,
        isArabic: true
      },
      {
        elemen: 'Membaca - Memirsa (Qira\'ah & Qira\'at)',
        cpText: `Memahami informasi secara tersurat dan tersirat dari berbagai jenis teks deskriptif visual atau multimodal tentang tema ${cleanTopic} dalam mata pelajaran ${matpel} dengan menerapkan kaidah struktur bahasa yang benar:`,
        subBox: kaidahSubtopik,
        isArabic: true
      },
      {
        elemen: 'Menulis - Mempresentasikannya (Kitabah & Ardh)',
        cpText: `Mengomunikasikan ide dan gagasan baik secara tertulis maupun lisan melalui paragraf sederhana pada jenis teks deskriptif dan terstruktur tentang tema ${cleanTopic} dalam mata pelajaran ${matpel} dengan susunan kaidah:`,
        subBox: kaidahSubtopik,
        isArabic: true
      }
    ];
  } else {
    return [
      {
        elemen: `Pemahaman Konsep (${matpel})`,
        cpText: `Peserta didik mampu memahami konsep utama, istilah penting, prinsip dasar, dan fenomena yang berkaitan dengan ${cleanTopic} dalam mata pelajaran ${matpel} berbasis Kurikulum Berbasis Cinta (KBC):`,
        subBox: kaidahSubtopik,
        isArabic: false
      },
      {
        elemen: 'Keterampilan Proses & Penalaran Kritis',
        cpText: `Peserta didik mampu mengamati, menganalisis, mengidentifikasi masalah, dan mendemonstrasikan aplikasi praktis dari materi ${cleanTopic} dalam pemecahan masalah kehidupan sehari-hari:`,
        subBox: kaidahSubtopik,
        isArabic: false
      },
      {
        elemen: 'Komunikasi & Karya Mandiri',
        cpText: `Peserta didik mampu mengomunikasikan ide, mempresentasikan hasil kerja kelompok, serta menyusun laporan/karya sederhana tentang ${cleanTopic} secara santun, mandiri, dan berkarakter KBC:`,
        subBox: kaidahSubtopik,
        isArabic: false
      }
    ];
  }
};

export const getEffectivePertemuanList = (docData) => {
  if (!docData) return [];
  let list = (docData.pertemuanList && docData.pertemuanList.length > 0)
    ? docData.pertemuanList
    : (generateAIContent(docData.matpel, docData.bab || docData.title, docData.jenjang).pertemuanList || []);

  const alokasi = docData.alokasiWaktu || '';
  const match = alokasi.match(/(\d+)\s*(?:kali\s*)?pertemuan/i);
  if (match && match[1]) {
    const targetCount = parseInt(match[1], 10);
    if (targetCount > 0 && targetCount <= list.length) {
      return list.slice(0, targetCount);
    }
  }
  return list;
};

export const triggerPrintDocument = () => {
  const originalTitle = document.title;
  document.title = '';
  window.print();
  setTimeout(() => {
    document.title = originalTitle;
  }, 1000);
};

export const exportToWordDoc = (docData) => {
  if (!docData) return;

  const title = docData.title || 'Modul_Ajar_KBC_Bahasa_Arab';
  const namaKepalaFormatted = formatNamaDanGelar(docData.namaKepala);
  const namaGuruFormatted = formatNamaDanGelar(docData.namaGuru);
  const kepalaHeader = formatKepalaHeader(docData.namaSekolah);

  const kesiapan = docData.kesiapan || {};
  const temaKBC = docData.temaKBC || {};
  const karakteristik = docData.karakteristikMateri || {};
  const profil = docData.dimensiProfil || {};
  
  const arabGrammarText = "الجملةُ الاسميةُ، العددُ، التصريفُ اللغويُّ، فعلُ الأمرِ، الجملةُ الفعليةُ، أن - لن - لـ، لا الناهية / لم (+ الفعل المضارع)، المصدر الصريح، الفعل الماضي، كان واسمها وخبرها، الفعل المزيد، اسم الموصول، اسم التفضيل.";

  const htmlContent = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>${title}</title>
      <style>
        body { font-family: 'Calibri', 'Segoe UI', 'Arial', sans-serif; font-size: 11pt; line-height: 1.5; color: #1e293b; }
        .page-break { page-break-before: always; }
        h1 { font-size: 16pt; font-weight: bold; text-align: center; margin: 0; }
        .cover-box { background-color: #064e3b; color: #ffffff; padding: 16px; text-align: center; border-radius: 8px 8px 0 0; }
        .cover-info { background-color: #ecfdf5; border: 2px solid #064e3b; border-top: none; padding: 16px; border-radius: 0 0 8px 8px; margin-bottom: 30px; }
        .cover-info table { width: 100%; border: none; font-size: 10.5pt; font-weight: bold; }
        .cover-info td { border: none; padding: 4px 0; }
        
        .header-banner { background-color: #064e3b; color: #ffffff; padding: 12px; text-align: center; font-weight: bold; font-size: 11pt; margin-bottom: 20px; border-radius: 6px; }
        .section-header { background-color: #d1fae5; color: #064e3b; font-weight: bold; font-size: 10.5pt; padding: 6px 10px; margin-top: 18px; margin-bottom: 8px; border-radius: 4px; text-transform: uppercase; }
        .sub-badge { background-color: #047857; color: #ffffff; font-weight: bold; font-size: 9.5pt; padding: 4px 8px; display: inline-block; margin-top: 10px; margin-bottom: 6px; border-radius: 3px; }
        .sub-badge-amber { background-color: #f59e0b; color: #000000; font-weight: bold; font-size: 9pt; padding: 3px 6px; display: inline-block; margin-top: 8px; margin-bottom: 4px; border-radius: 3px; }
        
        table.data-table { width: 100%; border-collapse: collapse; margin: 10px 0; }
        table.data-table th, table.data-table td { border: 1px solid #cbd5e1; padding: 8px 10px; font-size: 10pt; vertical-align: top; }
        table.data-table th { background-color: #d1fae5; color: #064e3b; font-weight: bold; text-align: center; }
        
        ul, ol { margin-top: 4px; margin-bottom: 8px; padding-left: 24px; }
        li { margin-bottom: 4px; font-size: 10.5pt; }
        .arabic-text { font-family: 'Traditional Arabic', 'Amiri', 'Scheherazade', serif; font-size: 13pt; direction: rtl; text-align: right; background-color: #f8fafc; padding: 6px 10px; border: 1px solid #e2e8f0; border-radius: 4px; font-weight: bold; color: #064e3b; margin-top: 6px; }
        
        .ttd-table { width: 100%; border: none; margin-top: 40px; }
        .ttd-table td { border: none; text-align: center; vertical-align: bottom; font-size: 10.5pt; }
      </style>
    </head>
    <body>

      <!-- PAGE 1: COVER PAGE -->
      <div style="text-align: center; margin-top: 20px; margin-bottom: 40px;">
        <div class="cover-box">
          <h1 style="color: #ffffff; text-transform: uppercase;">MODUL AJAR<br/>KURIKULUM MERDEKA (KBC)</h1>
        </div>
        <div class="cover-info">
          <table>
            <tr><td width="40%">Nama Madrasah</td><td width="5%">:</td><td>${docData.namaSekolah || '...........................................'}</td></tr>
            <tr><td>Nama Penyusun</td><td>:</td><td>${namaGuruFormatted}</td></tr>
            <tr><td>NIP</td><td>:</td><td>${docData.nipGuru || '...........................................'}</td></tr>
            <tr><td>Mata Pelajaran</td><td>:</td><td style="color: #064e3b;"><b>${(docData.matpel || 'BAHASA ARAB').toUpperCase()}</b></td></tr>
            <tr><td>Fase D, Kelas / Semester</td><td>:</td><td>${docData.kelas || 'VII (Tujuh)'} / ${docData.semester || 'I (Ganjil)'}</td></tr>
          </table>
        </div>
        <p style="font-size: 9.5pt; color: #64748b; font-weight: bold; margin-top: 40px;">
          KEMENTERIAN AGAMA REPUBLIK INDONESIA • TAHUN PELAJARAN ${docData.tahunAjaran || '2024/2025'}
        </p>
      </div>

      <div class="page-break"></div>

      <!-- MAIN DOCUMENT CONTENT -->
      <div class="header-banner">
        <div>MODUL AJAR DEEP LEARNING (KBC)</div>
        <div>MATA PELAJARAN : ${(docData.matpel || 'BAHASA ARAB').toUpperCase()}</div>
        <div style="color: #fde047;">${docData.bab || 'BAB 1 : التَّعَارُف (PERKENALAN)'}</div>
      </div>

      <!-- A. IDENTITAS MODUL -->
      <div class="section-header">A. IDENTITAS MODUL</div>
      <table style="width: 100%; border: none; font-size: 10.5pt; margin-bottom: 10px;">
        <tr><td width="35%"><b>Nama Madrasah</b></td><td width="5%">:</td><td>${docData.namaSekolah || '...........................................'}</td></tr>
        <tr><td><b>Nama Penyusun</b></td><td>:</td><td>${namaGuruFormatted}</td></tr>
        <tr><td><b>Mata Pelajaran</b></td><td>:</td><td><b style="color: #064e3b;">${docData.matpel || 'Bahasa Arab'}</b></td></tr>
        <tr><td><b>Kelas / Fase / Semester</b></td><td>:</td><td><b>${docData.kelas || 'VII'} / ${docData.fase || 'D'} / ${docData.semester || 'I (Ganjil)'}</b></td></tr>
        <tr><td><b>Alokasi Waktu</b></td><td>:</td><td>${docData.alokasiWaktu || '16 JP (8 kali pertemuan)'}</td></tr>
        <tr><td><b>Tahun Pelajaran</b></td><td>:</td><td>${docData.tahunAjaran || '2024/2025'}</td></tr>
      </table>

      <!-- B. IDENTIFIKASI KESIAPAN PESERTA DIDIK -->
      <div class="section-header">B. IDENTIFIKASI KESIAPAN PESERTA DIDIK</div>
      <ul>
        <li><b>Pengetahuan Awal :</b> ${kesiapan.pengetahuanAwal || 'Peserta didik telah mengenal huruf hijaiyah dan beberapa kosakata dasar bahasa Arab yang sering didengar dalam kehidupan sehari-hari (misalnya: ana, anta, assalamu\'alaikum).'}</li>
        <li><b>Minat :</b> ${kesiapan.minat || 'Peserta didik memiliki minat yang beragam, sebagian tertarik untuk memahami Al-Qur\'an, sebagian lain tertarik pada budaya Arab, dan ada yang ingin menguasai bahasa asing sebagai wujud cinta pada ilmu.'}</li>
        <li><b>Latar Belakang :</b> ${kesiapan.latarBelakang || 'Peserta didik berasal dari latar belakang keluarga dan sosial yang beragam, membawa pemahaman awal yang berbeda tentang interaksi sosial dan pentingnya menjalin persahabatan.'}</li>
        <li>
          <b>Kebutuhan Belajar :</b>
          <ul>
            <li><b>Visual:</b> ${kesiapan.kebutuhanVisual || 'Peta konsep, kartu kata (flashcards) bergambar, video perkenalan.'}</li>
            <li><b>Auditori:</b> ${kesiapan.kebutuhanAuditori || 'Mendengarkan pelafalan mufrodat dari guru, rekaman dialog, lagu tentang perkenalan.'}</li>
            <li><b>Kinestetik:</b> ${kesiapan.kebutuhanKinestetik || 'Bermain peran (role playing) dialog perkenalan, permainan mencocokkan kartu, bergerak aktif dalam kelompok.'}</li>
          </ul>
        </li>
      </ul>

      <!-- C. TEMA KURIKULUM BERBASIS CINTA -->
      <div class="section-header">C. TEMA KURIKULUM BERBASIS CINTA</div>
      <ul>
        <li><b style="color: #9f1239;">Topik Panca Cinta :</b> ${temaKBC.topikPancaCinta || 'Cinta Diri dan Sesama Manusia, Cinta Allah Swt. dan Rasul-Nya'}</li>
        <li><b style="color: #9f1239;">Materi Insersi :</b> ${temaKBC.materiInsersi || 'Ajaran Islam tentang ukhuwah Islamiyah (persaudaraan dalam Islam) dan ukhuwah insaniyah (persaudaraan kemanusiaan), Adab kepada teman, Keimanan dan ketakwaan kepada Allah Swt. sebagai inti dan muara kehidupan.'}</li>
      </ul>

      <!-- D. KARAKTERISTIK MATERI PELAJARAN -->
      <div class="section-header">D. KARAKTERISTIK MATERI PELAJARAN</div>
      <ul>
        <li>
          <b>Jenis Pengetahuan yang Akan Dicapai :</b>
          <ul>
            <li><b>Konseptual:</b> ${karakteristik.konseptual || 'Memahami fungsi sosial dari teks perkenalan, makna mufrodat (kata ganti, kata sapa, profesi), dan konsep dasar kalimat nominal (Mubtada\' & Khabar).'}</li>
            <li><b>Prosedural:</b> ${karakteristik.prosedural || 'Mampu melakukan tindak tutur untuk memperkenalkan diri dan orang lain, serta menanyakan identitas dengan pola kalimat yang benar.'}</li>
          </ul>
        </li>
        <li><b>Relevansi dengan Kehidupan Nyata Peserta Didik :</b> ${karakteristik.relevansi || 'Materi perkenalan sangat relevan karena merupakan keterampilan sosial dasar untuk membangun hubungan yang baik dan penuh cinta dengan teman baru di lingkungan madrasah.'}</li>
        <li><b>Tingkat Kesulitan :</b> ${karakteristik.tingkatKesulitan || 'Dasar. Materi ini menjadi fondasi bagi pembelajaran bab-bab selanjutnya.'}</li>
        <li><b>Struktur Materi :</b> ${karakteristik.strukturMateri || 'Materi disajikan secara sistematis, dimulai dari pengenalan kosakata (mufrodat), dilanjutkan dengan pemahaman teks (nushus), praktik dialog (hiwar), analisis kaidah bahasa (tarkib), hingga memproduksi teks secara mandiri.'}</li>
        <li><b>Integrasi Nilai dan Karakter :</b> ${karakteristik.integrasiNilai || 'Mengintegrasikan nilai-nilai cinta, sopan santun, saling menghargai, percaya diri, dan keberanian dalam berinteraksi sebagai wujud cinta pada diri sendiri dan sesama.'}</li>
      </ul>

      <!-- E. DIMENSI PROFIL LULUSAN -->
      <div class="section-header">E. DIMENSI PROFIL LULUSAN</div>
      <ul>
        <li><b>Keimanan dan Ketakwaan terhadap Tuhan Yang Maha Esa, dan Berakhlak Mulia :</b> ${profil.keimanan || 'Menggunakan sapaan Islami (Assalamu\'alaikum) saat memulai perkenalan sebagai wujud cinta dan doa kepada sesama.'}</li>
        <li><b>Kewargaan :</b> ${profil.kewargaan || 'Menghargai perbedaan asal daerah teman sebagai bagian dari kekayaan bangsa dan wujud ukhuwah wathaniyah (persaudaraan kebangsaan).'}</li>
        <li><b>Penalaran Kritis :</b> ${profil.penalaranKritis || 'Menganalisis pola kalimat sederhana (Mubtada\' + Khabar) untuk memahami struktur dasar bahasa Arab.'}</li>
        <li><b>Kreativitas :</b> ${profil.kreativitas || 'Menghasilkan teks atau dialog perkenalan sederhana secara mandiri atau berkelompok dengan gaya mereka sendiri.'}</li>
        <li><b>Kolaborasi :</b> ${profil.kolaborasi || 'Bekerja sama dalam pasangan atau kelompok untuk mempraktikkan dialog dan memproduksi teks bersama, menumbuhkan rasa cinta dan kebersamaan.'}</li>
        <li><b>Kemandirian :</b> ${profil.kemandirian || 'Berani memperkenalkan diri di depan kelas, menunjukkan rasa percaya diri sebagai wujud cinta pada potensi diri.'}</li>
        <li><b>Kesehatan :</b> ${profil.kesehatan || 'Membangun hubungan sosial yang sehat dan positif dengan teman-teman baru di lingkungan madrasah.'}</li>
        <li><b>Komunikasi :</b> ${profil.komunikasi || 'Mampu berkomunikasi secara lisan dan tulisan dalam bahasa Arab pada tingkat dasar untuk tujuan perkenalan.'}</li>
      </ul>

      <!-- DESAIN PEMBELAJARAN BANNER -->
      <div style="text-align: center; margin-top: 25px; margin-bottom: 15px;">
        <div style="background-color: #064e3b; color: #ffffff; padding: 8px 20px; display: inline-block; font-weight: bold; font-size: 11pt; border-radius: 6px;">
          DESAIN PEMBELAJARAN
        </div>
      </div>

      <!-- A. CAPAIAN PEMBELAJARAN (CP) -->
      <div class="section-header">A. CAPAIAN PEMBELAJARAN (CP)</div>
      <p style="font-size: 10.5pt; margin-bottom: 10px;">
        ${docData.cp || `Pada akhir ${docData.fase || 'Fase D'}, peserta didik mempunyai kemampuan memahami informasi tersirat dan tersurat dari berbagai jenis teks lisan dan teks visual atau multimodal tentang ${docData.bab || docData.title} dalam mata pelajaran ${docData.matpel || 'Bahasa Arab'} berbasis Kurikulum Berbasis Cinta (KBC).`}
      </p>

      <table class="data-table">
        <thead>
          <tr>
            <th width="30%">Elemen</th>
            <th width="70%">Capaian Pembelajaran Per Elemen</th>
          </tr>
        </thead>
        <tbody>
          ${getCPTableData(docData).map(row => `
            <tr>
              <td><b>${row.elemen}</b></td>
              <td>
                ${row.cpText}
                <div style="margin-top: 6px; padding: 6px; background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; font-weight: bold; ${row.isArabic ? 'direction: rtl; text-align: right;' : ''}">
                  ${row.subBox}
                </div>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <!-- B. LINTAS DISIPLIN ILMU -->
      <div class="section-header">B. LINTAS DISIPLIN ILMU</div>
      <ul>
        <li><b>Ilmu Pengetahuan Sosial (IPS) :</b> Mengenal berbagai daerah dan provinsi di Indonesia saat menanyakan asal teman.</li>
        <li><b>Pendidikan Kewarganegaraan (PPKn) :</b> Menumbuhkan sikap saling menghargai dalam keberagaman suku dan daerah.</li>
        <li><b>Seni Budaya :</b> Mengekspresikan diri melalui permainan peran (role playing) dalam dialog perkenalan.</li>
      </ul>

      <!-- C. TUJUAN PEMBELAJARAN -->
      <div class="section-header">C. TUJUAN PEMBELAJARAN</div>
      <ul>
        <li><b>Pertemuan 1-2 :</b> Peserta didik mampu melafalkan, menghafalkan, dan memahami <i>mufrodat</i> terkait tema <b>التعارف</b> (kata sapa, kata ganti, kata tanya, profesi) untuk menumbuhkan rasa cinta dalam berkomunikasi. (4 JP)</li>
        <li><b>Pertemuan 3-4 :</b> Peserta didik mampu memahami informasi dari teks deskriptif sederhana dan dialog (hiwar) terkait tema <b>التعارف</b> serta menganalisis struktur kalimat <i>Mubtada' (dhamir) + Khabar</i> sebagai landasan untuk mengungkapkan gagasan dengan penuh cinta. (4 JP)</li>
        <li><b>Pertemuan 5-6 :</b> Peserta didik mampu mendemonstrasikan tindak tutur memperkenalkan diri dan orang lain melalui dialog sederhana secara berpasangan dengan sikap saling menghargai. (4 JP)</li>
        <li><b>Pertemuan 7-8 :</b> Peserta didik mampu menyusun teks deskriptif sangat sederhana tentang perkenalan diri dan teman secara berkelompok dan mandiri sebagai wujud kreativitas dan cinta pada proses belajar. (4 JP)</li>
      </ul>

      <!-- D. INDIKATOR KETERCAPAIAN TUJUAN PEMBELAJARAN (IKTP) -->
      <div class="section-header">D. INDIKATOR KETERCAPAIAN TUJUAN PEMBELAJARAN (IKTP)</div>
      <ol>
        <li>Melafalkan mufrodat terkait tema perkenalan dengan intonasi yang benar.</li>
        <li>Menjelaskan makna mufrodat terkait tema perkenalan.</li>
        <li>Menjawab pertanyaan terkait isi teks sederhana tentang perkenalan.</li>
        <li>Mengidentifikasi struktur <i>Mubtada' (dhamir) + Khabar</i> dalam kalimat.</li>
        <li>Mendemonstrasikan dialog sederhana tentang perkenalan diri dan orang lain.</li>
        <li>Menyusun kalimat sederhana menggunakan struktur <i>Mubtada' + Khabar</i>.</li>
        <li>Menulis sebuah paragraf pendek untuk memperkenalkan diri dan teman.</li>
      </ol>

      <!-- E. IKLIM / BUDAYA MADRASAH -->
      <div class="section-header">E. IKLIM/BUDAYA MADRASAH</div>
      <ul>
        <li>Menciptakan suasana belajar yang penuh cinta, aman, nyaman, dan menyenangkan.</li>
        <li>Membiasakan penggunaan sapaan Islami dan ungkapan positif dalam interaksi sehari-hari.</li>
        <li>Mendorong budaya saling mendukung dan menghargai antar peserta didik dalam setiap aktivitas pembelajaran.</li>
      </ul>

      <!-- F. TOPIK PEMBELAJARAN KONTEKSTUAL -->
      <div class="section-header">F. TOPIK PEMBELAJARAN KONTEKSTUAL</div>
      <p style="font-size: 10.5pt; margin-left: 10px;">
        Perkenalan diri dan teman di lingkungan madrasah sebagai wujud menumbuhkan <i>ukhuwah</i> (persaudaraan) dan cinta kepada sesama.
      </p>

      <!-- G. KERANGKA PEMBELAJARAN -->
      <div class="section-header">G. KERANGKA PEMBELAJARAN</div>
      
      <div class="sub-badge">PRAKTIK PEDAGOGIK</div>
      <ul>
        <li><b>Model Pembelajaran :</b> <i>Discovery Learning, Cooperative Learning</i></li>
        <li>
          <b>Pendekatan :</b> <i>Deep Learning (Mindful, Meaningful, Joyful Learning)</i>
          <ul>
            <li><b>Mindful Learning:</b> Peserta didik berlatih fokus dan sadar penuh saat menyimak pelafalan guru (<i>istima'</i>) dan saat melafalkan kembali (<i>takallum</i>), menumbuhkan cinta pada setiap bunyi dan kata.</li>
            <li><b>Meaningful Learning:</b> Peserta didik menghubungkan materi perkenalan dengan pengalaman nyata mereka dalam menjalin persahabatan, memahami bahwa mengenal orang lain adalah cara menebar cinta.</li>
            <li><b>Joyful Learning:</b> Pembelajaran dikemas dalam bentuk permainan, lagu, dan role playing agar peserta didik merasa senang dan antusias.</li>
          </ul>
        </li>
        <li><b>Metode Pembelajaran :</b> Ceramah interaktif, tanya jawab, diskusi, permainan, demonstrasi, <i>role playing</i>, penugasan.</li>
        <li>
          <b>Strategi Pembelajaran Berdiferensiasi :</b>
          <ul>
            <li><b>Diferensiasi Konten:</b> Menyediakan materi melalui berbagai media (teks, gambar, audio). Guru memberikan kartu kata dengan atau tanpa gambar sesuai kebutuhan peserta didik.</li>
            <li><b>Diferensiasi Proses:</b> Peserta didik dapat berlatih secara individu, berpasangan, atau dalam kelompok kecil. Guru memberikan bimbingan yang berbeda sesuai tingkat pemahaman.</li>
            <li><b>Diferensiasi Produk:</b> Peserta didik dapat menunjukkan pemahaman melalui tulisan (paragraf), lisan (dialog), atau rekaman video perkenalan sederhana.</li>
          </ul>
        </li>
      </ul>

      <div class="sub-badge">KEMITRAAN PEMBELAJARAN</div>
      <ul>
        <li><b>Lingkungan Sekolah:</b> Berinteraksi dengan teman sekelas, kakak kelas, atau guru lain di lingkungan madrasah untuk mempraktikkan perkenalan.</li>
        <li><b>Lingkungan Luar Sekolah/Masyarakat:</b> Mendorong peserta didik untuk memperkenalkan diri dengan sopan kepada tetangga atau saudara baru.</li>
        <li><b>Mitra Digital:</b> Menggunakan aplikasi kamus Arab online atau platform video untuk melihat contoh-contoh perkenalan dalam bahasa Arab.</li>
      </ul>

      <div class="sub-badge">LINGKUNGAN BELAJAR</div>
      <ul>
        <li><b>Ruang Fisik:</b> Menata tempat duduk secara fleksibel (klasikal, berkelompok, berpasangan) untuk mendukung berbagai aktivitas. Menempelkan poster mufrodat di dinding kelas.</li>
        <li><b>Ruang Virtual:</b> Memanfaatkan grup WhatsApp atau Google Classroom untuk berbagi materi tambahan dan mengumpulkan tugas.</li>
        <li><b>Budaya Belajar:</b> Membangun budaya kelas yang positif di mana setiap peserta didik merasa dihargai, berani mencoba, dan tidak takut membuat kesalahan sebagai bagian dari proses belajar dengan cinta.</li>
      </ul>

      <div class="sub-badge">PEMANFAATAN DIGITAL</div>
      <ul>
        <li>Menayangkan video perkenalan dari YouTube sebagai model.</li>
        <li>Menggunakan aplikasi seperti Quizlet atau Wordwall untuk latihan mufrodat yang menyenangkan.</li>
        <li>Merekam suara atau video peserta didik saat praktik dialog untuk portofolio digital.</li>
      </ul>

      <!-- H. LANGKAH-LANGKAH PEMBELAJARAN BERDIFERENSIASI (8 PERTEMUAN LENGKAP) -->
      <div class="section-header">H. LANGKAH-LANGKAH PEMBELAJARAN BERDIFERENSIASI</div>
      
      ${getEffectivePertemuanList(docData).map((p, idx) => `
        <div style="border: 1px solid #6ee7b7; background-color: #ecfdf5; padding: 12px; border-radius: 6px; margin-top: 10px; margin-bottom: 12px;">
          <div class="sub-badge">PERTEMUAN ${p.no || (idx + 1)} (${p.jp || '2 JP : 80 MENIT'})</div>
          <p style="font-size: 10pt; font-weight: bold; margin: 4px 0; color: #064e3b;">
            Topik Cinta: ${p.topikCinta || 'Kurikulum Berbasis Cinta'}<br/>
            Pembahasan: ${p.pembahasan || docData.bab}
          </p>

          <div class="sub-badge-amber">KEGIATAN PENDAHULUAN (15 MENIT)</div>
          <p style="font-size: 10pt; white-space: pre-line; margin: 4px 0;">${p.pendahuluan || docData.pendahuluan || '1. Salam Pembuka Cinta & Doa\n2. Apersepsi & Penyampaian Tujuan'}</p>

          <div class="sub-badge-amber">KEGIATAN INTI (50 MENIT) - MINDFUL, MEANINGFUL, JOYFUL</div>
          <p style="font-size: 10pt; white-space: pre-line; margin: 4px 0;">${p.inti || docData.inti || '1. Mindful Listening & Observation\n2. Joyful Discussion & Collaboration\n3. Meaningful Reflection'}</p>

          <div class="sub-badge-amber">KEGIATAN PENUTUP (15 MENIT)</div>
          <p style="font-size: 10pt; white-space: pre-line; margin: 4px 0;">${p.penutup || docData.penutup || '1. Refleksi Cinta & Kesimpulan\n2. Doa dan Salam Penutup'}</p>
        </div>
      `).join('')}

      <!-- I. ASESMEN PEMBELAJARAN -->
      <div class="section-header">I. ASESMEN PEMBELAJARAN</div>
      <table class="data-table">
        <thead>
          <tr>
            <th width="33%">ASESMEN DIAGNOSTIK</th>
            <th width="33%">ASESMEN FORMATIF</th>
            <th width="34%">ASESMEN SUMATIF</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <ul>
                <li>Tanya jawab lisan tentang pengetahuan kosakata Arab yang sering didengar (misal: "Siapa tahu arti 'ana'?").</li>
                <li>Meminta siswa menuliskan beberapa huruf hijaiyah yang diingat.</li>
              </ul>
            </td>
            <td>
              <ul>
                <li><b>Observasi:</b> Pengamatan sikap siswa (keaktifan, kerja sama, keberanian).</li>
                <li><b>Penilaian Kinerja:</b> Pelafalan mufrodat & mendemonstrasikan dialog.</li>
                <li><b>Tugas Tertulis:</b> Hasil kerja kelompok & tulisan mandiri.</li>
              </ul>
            </td>
            <td>
              <ul>
                <li><b>Tes Tulis:</b> Pilihan ganda & esai mufrodat/tarkib Bab 1.</li>
                <li><b>Tes Praktik/Unjuk Kerja:</b> Presentasi paragraf perkenalan lisan/tulisan.</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- J. LAMPIRAN 1: LEMBAR KERJA PESERTA DIDIK (LKPD) -->
      <div class="page-break"></div>
      <div class="section-header" style="background-color: #064e3b; color: #ffffff; text-align: center; font-size: 11pt; padding: 8px;">
        LAMPIRAN 1 : LEMBAR KERJA PESERTA DIDIK (LKPD)
      </div>

      <div style="border: 2px solid #047857; background-color: #f0fdf4; padding: 12px; border-radius: 6px; margin-top: 10px;">
        <table style="width: 100%; border: none; font-size: 10pt; font-weight: bold; margin-bottom: 10px; border-bottom: 1px solid #a7f3d0; padding-bottom: 8px;">
          <tr>
            <td width="50%">Nama Siswa : ................................................................</td>
            <td width="50%">Mata Pelajaran : ${docData.matpel || 'BAHASA ARAB'}</td>
          </tr>
          <tr>
            <td>Kelas / Fase : ${docData.kelas || 'VII'} / ${docData.fase || 'D'}</td>
            <td>Tanggal : ................................................................</td>
          </tr>
        </table>

        <h4 style="color: #064e3b; margin: 6px 0;">${docData.lkpdTitle || 'LKPD Pembelajaran KBC'}</h4>
        <div style="background-color: #ffffff; border: 1px solid #6ee7b7; padding: 8px; border-radius: 4px; margin-bottom: 10px;">
          <b>PETUNJUK PENGERJAAN:</b><br/>
          <p style="margin: 4px 0; white-space: pre-line; font-size: 9.5pt;">${docData.lkpdPetunjuk || '1. Berdoalah sebelum mulai mengerjakan.\n2. Bacalah instruksi tugas dengan teliti.\n3. Kerjakan secara mandiri atau berpasangan dengan jujur dan santun.'}</p>
        </div>

        <b>LEMBAR AKTIVITAS & TUGAS SISWA:</b>
        <div style="background-color: #ffffff; border: 1px solid #cbd5e1; padding: 12px; border-radius: 6px; margin-top: 6px; font-family: 'Calibri', 'Segoe UI', Arial, sans-serif; font-size: 9.5pt; white-space: pre-line;">
${cleanMarkdownText(docData.lkpdTugas || docData.lkpdContent || 'TUGAS LKPD:\n1. Praktikkan dialog perkenalan bersama teman pasanganmu.\n2. Tuliskan 3 kalimat sapaan kasih sayang yang paling kamu sukai di lembar ini.')}
        </div>
      </div>

      <!-- K. LAMPIRAN 2: NASKAH SOAL ASESMEN SUMATIF & KUNCI JAWABAN -->
      <div class="page-break"></div>
      <div class="section-header" style="background-color: #064e3b; color: #ffffff; text-align: center; font-size: 11pt; padding: 8px;">
        LAMPIRAN 2 : NASKAH SOAL ASESMEN SUMATIF & KUNCI JAWABAN
      </div>

      <div style="border: 1px solid #cbd5e1; background-color: #f8fafc; padding: 12px; border-radius: 6px; margin-top: 10px;">
        <div class="sub-badge-amber" style="background-color: #f59e0b; color: #000; font-weight: bold; padding: 4px 8px; font-size: 9.5pt;">A. NASKAH SOAL ASESMEN SUMATIF (PILIHAN GANDA & ESAI)</div>
        <div style="background-color: #ffffff; border: 1px solid #cbd5e1; padding: 12px; border-radius: 6px; margin-top: 6px; font-family: 'Calibri', 'Segoe UI', Arial, sans-serif; font-size: 9.5pt; white-space: pre-line;">
${cleanMarkdownText(docData.soalSumatif || `I. PILIHAN GANDA:
1. Arti dari sapaan "صَبَاحَ الخَيْرِ" (Sabahal khair) adalah...
   a. Selamat sore  b. Selamat malam  c. Selamat pagi  d. Sampai jumpa
2. Ungkapan balasan saat disapa "أَهْلًا وَسَهْلًا" adalah...
   a. صَبَاحَ النُّوْرِ  b. أَهْلًا بِكَ  c. الحَمْدُ لِلَّهِ  d. مَعَ السَّلَامَةِ

II. URAIAN / ESAI:
1. Tuliskan 3 Kata Ganti (Dhamir Munfashil) dalam Bahasa Arab beserta artinya!`)}
        </div>

        <div class="sub-badge" style="background-color: #047857; color: #fff; font-weight: bold; padding: 4px 8px; font-size: 9.5pt; margin-top: 14px;">B. KUNCI JAWABAN & PEDOMAN PENSKORAN</div>
        <div style="background-color: #f0fdf4; border: 1px solid #6ee7b7; padding: 12px; border-radius: 6px; margin-top: 6px; font-family: 'Calibri', 'Segoe UI', Arial, sans-serif; font-size: 9.5pt; white-space: pre-line;">
${cleanMarkdownText(docData.kunciSumatif || `KUNCI JAWABAN & SKOR:
I. Pilihan Ganda: 1. C, 2. B (Skor per nomor: 20 poin)
II. Esai: 1. أَنَا (Saya), أَنْتَ (Kamu L), هُوَ (Dia L) (Skor: 40 poin)
Total Skor Maksimal = 100 Poin.`)}
        </div>
      </div>

      <!-- SIGNATURE BLOCK -->
      <table class="ttd-table">
        <tr>
          <td width="50%">
            Mengetahui,<br/>
            ${kepalaHeader}<br/><br/><br/><br/><br/>
            <b><u>${namaKepalaFormatted}</u></b><br/>
            NIP. ${docData.nipKepala || '...........................................'}
          </td>
          <td width="50%">
            Guru Mata Pelajaran,<br/><br/><br/><br/><br/>
            <b><u>${namaGuruFormatted}</u></b><br/>
            NIP. ${docData.nipGuru || '...........................................'}
          </td>
        </tr>
      </table>

    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff' + htmlContent], {
    type: 'application/msword'
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${title.replace(/[^a-zA-Z0-9_-]/g, '_')}.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const exportProtaToWord = ({ identitas, items, totalJP }) => {
  const title = `PROTA_${(identitas.matpel || 'Mata_Pelajaran').replace(/\s+/g, '_')}_Kelas_${identitas.kelas || 'VII'}`;
  const namaKepalaFormatted = formatNamaDanGelar(identitas.namaKepala);
  const namaGuruFormatted = formatNamaDanGelar(identitas.namaGuru);
  const kepalaHeader = formatKepalaHeader(identitas.namaSekolah);

  const htmlContent = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>${title}</title>
      <style>
        body { font-family: 'Calibri', 'Segoe UI', sans-serif; font-size: 11pt; line-height: 1.5; color: #1e293b; }
        h2, h3 { text-align: center; margin: 2px 0; }
        .kop { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 15px; }
        table.identitas { width: 100%; border: none; margin-bottom: 15px; font-size: 11pt; }
        table.identitas td { border: none; padding: 4px 0; }
        table.data-table { width: 100%; border-collapse: collapse; margin: 15px 0; }
        table.data-table th, table.data-table td { border: 1px solid #000; padding: 8px 10px; font-size: 10.5pt; vertical-align: top; }
        table.data-table th { background-color: #064e3b; color: #ffffff; text-align: center; font-weight: bold; }
        .ttd-table { width: 100%; border: none; margin-top: 40px; }
        .ttd-table td { border: none; text-align: center; vertical-align: bottom; font-size: 10.5pt; }
      </style>
    </head>
    <body>
      <div class="kop">
        <h3>KEMENTERIAN AGAMA REPUBLIK INDONESIA</h3>
        <h2>${(identitas.namaSekolah || 'SATUAN PENDIDIKAN').toUpperCase()}</h2>
        <p style="font-size: 10pt; font-weight: bold; margin: 2px 0;">PROGRAM TAHUNAN (PROTA) KURIKULUM MERDEKA (KBC)</p>
        <p style="font-size: 10pt; margin: 2px 0;">TAHUN PELAJARAN ${identitas.tahunAjaran || '2024/2025'}</p>
      </div>

      <table class="identitas">
        <tr><td width="30%"><b>Mata Pelajaran</b></td><td width="5%">:</td><td><b>${identitas.matpel}</b></td></tr>
        <tr><td><b>Kelas / Fase</b></td><td>:</td><td>${identitas.kelas} / Fase ${identitas.fase}</td></tr>
        <tr><td><b>Satuan Pendidikan</b></td><td>:</td><td>${identitas.namaSekolah}</td></tr>
        <tr><td><b>Total Alokasi Waktu</b></td><td>:</td><td><b>${totalJP} Jam Pelajaran (JP)</b></td></tr>
      </table>

      <table class="data-table">
        <thead>
          <tr>
            <th width="5%">No</th>
            <th width="15%">Semester</th>
            <th width="25%">Bab / Materi Pokok</th>
            <th width="35%">Tujuan Pembelajaran (TP)</th>
            <th width="10%">Alokasi (JP)</th>
            <th width="10%">Rencana Bulan</th>
          </tr>
        </thead>
        <tbody>
          ${(items || []).map((item, idx) => `
            <tr>
              <td style="text-align: center;">${idx + 1}</td>
              <td style="text-align: center;">${item.semester}</td>
              <td><b>${item.bab}</b></td>
              <td>${item.tp}</td>
              <td style="text-align: center; font-weight: bold;">${item.jp} JP</td>
              <td style="text-align: center;">${item.bulan}</td>
            </tr>
          `).join('')}
          <tr style="background-color: #f0fdf4; font-weight: bold;">
            <td colSpan="4" style="text-align: right;">TOTAL ALOKASI WAKTU TAHUNAN</td>
            <td style="text-align: center; font-size: 11pt;">${totalJP} JP</td>
            <td style="text-align: center;">1 Tahun Ajaran</td>
          </tr>
        </tbody>
      </table>

      <table class="ttd-table">
        <tr>
          <td width="50%">
            Mengetahui,<br/>
            ${kepalaHeader}<br/><br/><br/><br/><br/>
            <b><u>${namaKepalaFormatted}</u></b><br/>
            NIP. ${identitas.nipKepala || '...........................................'}
          </td>
          <td width="50%">
            Guru Mata Pelajaran,<br/><br/><br/><br/><br/>
            <b><u>${namaGuruFormatted}</u></b><br/>
            NIP. ${identitas.nipGuru || '...........................................'}
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff' + htmlContent], { type: 'application/msword' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${title}.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const exportProsemToWord = ({ identitas, items, bulanList, totalJP }) => {
  const title = `PROSEM_${(identitas.matpel || 'Mata_Pelajaran').replace(/\s+/g, '_')}_Sem_${identitas.semester.includes('II') ? 'Genap' : 'Ganjil'}`;
  const namaKepalaFormatted = formatNamaDanGelar(identitas.namaKepala);
  const namaGuruFormatted = formatNamaDanGelar(identitas.namaGuru);
  const kepalaHeader = formatKepalaHeader(identitas.namaSekolah);

  const htmlContent = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>${title}</title>
      <style>
        body { font-family: 'Calibri', 'Segoe UI', sans-serif; font-size: 10pt; line-height: 1.4; color: #1e293b; }
        h2, h3 { text-align: center; margin: 2px 0; }
        .kop { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 15px; }
        table.identitas { width: 100%; border: none; margin-bottom: 15px; font-size: 10pt; }
        table.identitas td { border: none; padding: 3px 0; }
        table.data-table { width: 100%; border-collapse: collapse; margin: 15px 0; }
        table.data-table th, table.data-table td { border: 1px solid #000; padding: 5px 6px; font-size: 9.5pt; vertical-align: top; }
        table.data-table th { background-color: #064e3b; color: #ffffff; text-align: center; font-weight: bold; }
        .ttd-table { width: 100%; border: none; margin-top: 30px; }
        .ttd-table td { border: none; text-align: center; vertical-align: bottom; font-size: 10pt; }
      </style>
    </head>
    <body>
      <div class="kop">
        <h3>KEMENTERIAN AGAMA REPUBLIK INDONESIA</h3>
        <h2>${(identitas.namaSekolah || 'SATUAN PENDIDIKAN').toUpperCase()}</h2>
        <p style="font-size: 10pt; font-weight: bold; margin: 2px 0;">PROGRAM SEMESTER (PROSEM) KURIKULUM MERDEKA (KBC)</p>
        <p style="font-size: 10pt; margin: 2px 0;">SEMESTER ${identitas.semester.toUpperCase()} • TAHUN PELAJARAN ${identitas.tahunAjaran || '2024/2025'}</p>
      </div>

      <table class="identitas">
        <tr><td width="30%"><b>Mata Pelajaran</b></td><td width="5%">:</td><td><b>${identitas.matpel}</b></td></tr>
        <tr><td><b>Kelas / Fase</b></td><td>:</td><td>${identitas.kelas} / Fase ${identitas.fase}</td></tr>
        <tr><td><b>Semester / Tahun Ajaran</b></td><td>:</td><td>${identitas.semester} / ${identitas.tahunAjaran}</td></tr>
        <tr><td><b>Total Alokasi Semester</b></td><td>:</td><td><b>${totalJP} Jam Pelajaran (JP)</b></td></tr>
      </table>

      <table class="data-table">
        <thead>
          <tr>
            <th rowSpan="2" width="4%">No</th>
            <th rowSpan="2" width="30%">Materi Pokok / Bab Pembelajaran</th>
            <th rowSpan="2" width="6%">JP</th>
            ${(bulanList || []).map(b => `<th colSpan="4">${b}</th>`).join('')}
          </tr>
          <tr>
            ${(bulanList || []).map(() => `
              <th width="2.5%">1</th><th width="2.5%">2</th><th width="2.5%">3</th><th width="2.5%">4</th>
            `).join('')}
          </tr>
        </thead>
        <tbody>
          ${(items || []).map((item, idx) => `
            <tr>
              <td style="text-align: center;">${idx + 1}</td>
              <td><b>${item.bab}</b><br/><span style="font-size: 8.5pt; color: #475569;">${item.tp}</span></td>
              <td style="text-align: center; font-weight: bold;">${item.jp}</td>
              ${(bulanList || []).map((_, bIdx) => `
                ${[0, 1, 2, 3].map(mIdx => {
                  const val = (item.dist && item.dist[bIdx] && item.dist[bIdx][mIdx]) || 0;
                  return `<td style="text-align: center; font-weight: bold;">${val > 0 ? val : ''}</td>`;
                }).join('')}
              `).join('')}
            </tr>
          `).join('')}
          <tr style="background-color: #d1fae5; font-weight: bold;">
            <td colSpan="2" style="text-align: right;">TOTAL ALOKASI JP SEMESTER</td>
            <td style="text-align: center; font-size: 10pt;">${totalJP}</td>
            <td colSpan="24" style="text-align: left; padding-left: 10px;">Distribusi Jam Pembelajaran Efektif Semester ${identitas.semester}</td>
          </tr>
        </tbody>
      </table>

      <table class="ttd-table">
        <tr>
          <td width="50%">
            Mengetahui,<br/>
            ${kepalaHeader}<br/><br/><br/><br/><br/>
            <b><u>${namaKepalaFormatted}</u></b><br/>
            NIP. ${identitas.nipKepala || '...........................................'}
          </td>
          <td width="50%">
            Guru Mata Pelajaran,<br/><br/><br/><br/><br/>
            <b><u>${namaGuruFormatted}</u></b><br/>
            NIP. ${identitas.nipGuru || '...........................................'}
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff' + htmlContent], { type: 'application/msword' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${title}.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

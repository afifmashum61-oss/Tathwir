// AI Content Assistant Generator - Deep Learning (KBC) Full Specification

export const generateAIContent = (subject, topic, level, model = 'Deep Learning (Mindful, Meaningful, Joyful Learning)', isKBC = true, petaKonsep = '', materiUraian = '') => {
  const cleanSubject = subject || 'BAHASA ARAB';
  let rawTopic = topic || 'al-Ta\'aruf (Perkenalan)';
  
  // Clean prefix like "BAB 1 : ", "Bab 2:", "BAB III -"
  let cleanTopic = rawTopic.replace(/^BAB\s+[0-9IVXLCDM]+\s*[:\-]?\s*/i, '').trim();
  if (!cleanTopic) cleanTopic = rawTopic;

  // Extract Indonesian name if available in brackets (e.g. "السياحة (Pariwisata)" -> "Pariwisata")
  let topicIndo = cleanTopic;
  const matchBracket = cleanTopic.match(/\(([^)]+)\)/);
  if (matchBracket && matchBracket[1]) {
    topicIndo = matchBracket[1].trim();
  }

  const cleanLevel = level || 'MTs / SMP / Fase D';
  const isArabic = cleanSubject.toUpperCase().includes('ARAB');

  return {
    cp: `Pada akhir ${cleanLevel}, peserta didik mempunyai kemampuan memahami informasi tersirat dan tersurat dari berbagai jenis teks lisan dan teks visual tentang ${cleanTopic} dalam mata pelajaran ${cleanSubject} berbasis Kurikulum Berbasis Cinta (KBC).`,
    
    tp: isArabic 
      ? `1. Peserta didik mampu melafalkan, menghafalkan, dan memahami mufrodat terkait tema ${cleanTopic} untuk menumbuhkan rasa cinta dalam berkomunikasi.\n2. Peserta didik mampu memahami informasi dari teks deskriptif sederhana dan dialog (hiwar) terkait tema ${cleanTopic}.\n3. Peserta didik mampu mendemonstrasikan tindak tutur dan menyusun teks deskriptif tentang ${topicIndo} dengan santun dan penuh empati.`
      : `1. Peserta didik mampu memahami konsep utama dan istilah penting terkait tema ${cleanTopic} untuk menumbuhkan rasa cinta dalam berilmu.\n2. Peserta didik mampu menganalisis dan mengaplikasikan materi ${cleanTopic} dalam pemecahan masalah kehidupan sehari-hari.\n3. Peserta didik mampu mempresentasikan dan menyusun laporan/karya tentang ${topicIndo} secara santun, mandiri, dan berkarakter KBC.`,
    
    pemahamanBermakna: `Pembelajaran ${cleanTopic} yang dilandasi Kurikulum Berbasis Cinta menanamkan bahwa pengetahuan tentang ${topicIndo} adalah wujud kasih sayang Ilahi untuk mempererat ukhuwah dan kepedulian sesama manusia (Rahmatan lil 'Alamin).`,
    
    pertanyaanPemantik: `1. Mengapa mempelajari ${topicIndo} secara tekun dan santun merupakan wujud menebar kasih sayang dan rasa syukur?\n2. Bagaimana cara paling efektif menerapkan pemahaman ${topicIndo} dalam kehidupan sehari-hari secara penuh percaya diri?`,
    
    kesiapan: {
      pengetahuanAwal: `Peserta didik telah mengenal konsep dan kosakata dasar ${cleanSubject} yang relevan dengan tema ${topicIndo}.`,
      minat: `Peserta didik memiliki minat beragam, sebagian tertarik pada pemahaman konsep, praktik lapangan, dan eksplorasi ${cleanSubject}.`,
      latarBelakang: `Peserta didik berasal dari latar belakang sosial beragam yang membawa pengalaman unik terkait ${topicIndo}.`,
      kebutuhanVisual: `Peta konsep ${cleanTopic}, kartu kata/gambar, slide presentasi.`,
      kebutuhanAuditori: `Mendengarkan penjelasan guru, diskusi kelompok, dan rekaman audio.`,
      kebutuhanKinestetik: `Praktik unjuk kerja, role playing, atau simulasi tentang ${topicIndo}.`
    },

    temaKBC: {
      topikPancaCinta: 'Cinta Diri dan Sesama Manusia, Cinta Allah Swt. dan Rasul-Nya, Cinta Ilmu',
      materiInsersi: `Ajaran kebaikan, adab menuntut ilmu, kesantunan berkomunikasi, dan empati dalam mempelajari ${cleanTopic}.`
    },

    karakteristikMateri: {
      konseptual: `Memahami konsep dasar, definisi, dan fungsi sosial dari materi ${cleanTopic}.`,
      prosedural: `Mampu melakukan langkah-langkah praktis dan penyusunan tugas terkait ${cleanTopic}.`,
      relevansi: `Sangat relevan karena materi ${topicIndo} berhubungan langsung dengan kehidupan dan interaksi peserta didik.`,
      tingkatKesulitan: 'Dasar hingga Menengah.',
      strukturMateri: `Pengenalan konsep -> Pemahaman teks/rumus -> Diskusi/Praktik -> Analisis -> Produksi mandiri.`,
      integrasiNilai: `Mengintegrasikan nilai-nilai cinta, kesantunan, saling menghargai, percaya diri, dan empati.`
    },

    dimensiProfil: {
      keimanan: `Mengucapkan salam, doa, dan rasa syukur saat memulai dan mengakhiri pembelajaran ${cleanTopic}.`,
      kewargaan: `Menghargai keberagaman dan pandangan kawan dalam berdiskusi tentang ${topicIndo}.`,
      penalaranKritis: `Menganalisis dan memecahkan permasalahan terkait materi ${cleanTopic} secara cermat.`,
      kreativitas: `Menghasilkan karya, dialog, atau laporan tentang ${topicIndo} secara mandiri dan berkelompok.`,
      kolaborasi: `Bekerja sama dalam kelompok untuk menyelesaikan tugas ${cleanTopic} secara gotong royong.`,
      kemandirian: `Berani tampil menyampaikan hasil kerja tentang ${topicIndo} di depan kelas.`,
      kesehatan: `Membangun iklim kelas yang positif, aman, dan nyaman saat belajar ${cleanTopic}.`,
      komunikasi: `Mengomunikasikan gagasan terkait ${cleanTopic} secara efektif dan santun.`
    },

    lintasDisiplin: [
      `IPS / Kebudayaan: Menghubungkan konteks ${topicIndo} dengan kehidupan masyarakat.`,
      `PPKn: Menumbuhkan sikap menghargai keberagaman dan ukhuwah.`,
      `Seni & Bahasa: Mengekspresikan pemahaman materi melalui media kreatif.`
    ],

    iktp: [
      `1. Menjelaskan pengertian dan konsep utama tema ${cleanTopic}.`,
      `2. Mengidentifikasi komponen dan istilah penting dalam ${cleanTopic}.`,
      `3. Menjawab pertanyaan pemahaman terkait materi ${topicIndo}.`,
      `4. Menganalisis contoh kasus atau penerapan ${cleanTopic}.`,
      `5. Mendemonstrasikan praktik/dialog terkait ${topicIndo}.`,
      `6. Menyusun kalimat/laporan sederhana tentang ${cleanTopic}.`,
      `7. Menyajikan hasil karya mandiri dengan percaya diri.`
    ],

    deepLearning: {
      model: 'Discovery Learning, Cooperative Learning',
      mindful: `Peserta didik berlatih fokus dan sadar penuh saat menyimak penjelasan materi ${cleanTopic} dengan rasa ingin tahu.`,
      meaningful: `Peserta didik menghubungkan materi ${topicIndo} dengan pengalaman nyata mereka dalam kehidupan sehari-hari.`,
      joyful: `Pembelajaran dikemas dalam kuis interaktif, diskusi kelompok, dan permaian agar peserta didik antusias.`,
      metode: 'Ceramah interaktif, tanya jawab, diskusi kelompok, simulasi, penugasan.',
      diferensiasiKonten: 'Media pembelajaran bervariasi (teks, visual, gambar, audio).',
      diferensiasiProses: 'Latihan secara individu, berpasangan, atau kelompok sesuai tingkat pemahaman.',
      diferensiasiProduk: 'Unjuk kerja berupa tulisan, presentasi lisan, atau rekaman karya.',
      pemanfaatanDigital: 'Video edukasi YouTube, aplikasi kuis interaktif, dan media digital.'
    },

    pendahuluan: `1. Salam Pembuka Cinta: Guru menyapa peserta didik dengan ramah, tersenyum, dan menanyakan kabar.\n2. Doa & Tadarus: Membaca doa sebelum belajar sebagai wujud cinta kepada Allah SWT.\n3. Apersepsi Penuh Makna: Guru menghubungkan materi ${topicIndo} dengan kehidupan nyata siswa.\n4. Penyampaian Tujuan: Guru menyampaikan target pembelajaran ${cleanTopic} hari ini.`,
    
    inti: `1. Mindful Listening: Guru menjelaskan konsep utama ${cleanTopic}. Peserta didik menyimak dengan fokus.\n2. Joyful Repetition & Discussion: Peserta didik berdiskusi kelompok secara aktif dan menyenangkan.\n3. Meaningful Connection: Guru menekankan bahwa mempelajari ${topicIndo} adalah wujud kebaikan.\n4. Pembelajaran Berdiferensiasi: Kelompok mengerjakan tugas sesuai kesiapan belajar.`,
    
    penutup: `1. Refleksi Cinta: Guru mengajak siswa merenungkan manfaat mempelajari ${topicIndo}.\n2. Rangkuman: Menyimpulkan poin-poin utama ${cleanTopic} bersama-sama.\n3. Tindak Lanjut: Memberikan tugas pembiasaan di rumah.\n4. Penutup: Doa dan salam penutup.`,
    
    asesmenDiagnostik: `Tanya jawab awal pengetahuan siswa terkait ${topicIndo} dan tes kesiapan emosional.`,
    asesmenFormatif: `Observasi sikap keaktifan, unjuk kerja kelompok, dan latihan tertulis ${cleanTopic}.`,
    asesmenSumatif: `Tes Tulis Pilihan Ganda & Uraian ${cleanTopic}, serta Tes Praktik Unjuk Kerja KBC.`,

    soalSumatif: `I. PILIHAN GANDA (Pilihlah jawaban yang paling tepat):
1. Pengertian atau konsep utama yang paling tepat mengenai ${topicIndo} adalah...
   a. Mengabaikan konsep dasar  b. Pemahaman fakta & kebaikan materi  c. Tidak memiliki manfaat  d. Semata-mata hafalan
2. Mengapa kita perlu mempelajari materi ${cleanTopic} dengan tekun dan penuh empati?
   a. Agar mendapat pujian  b. Wujud kasih sayang, ukhuwah & rasa syukur  c. Syarat nilai semata  d. Terpaksa
3. Sikap terbaik saat berdiskusi tentang ${topicIndo} bersama teman di kelas adalah...
   a. Memotong pembicaraan  b. Menyimak & menghargai pendapat teman  c. Acuh tak acuh  d. Memaksa kehendak

II. URAIAN / ESAI:
1. Tuliskan 3 manfaat atau poin penting dari pembelajaran ${cleanTopic} yang dapat kamu terapkan dalam kehidupan sehari-hari!
2. Buatlah uraian/paragraf singkat (3-4 kalimat) yang menjelaskan pemahamanmu tentang ${topicIndo}!`,

    kunciSumatif: `KUNCI JAWABAN & PEDOMAN PENSKORAN:

I. Pilihan Ganda:
1. B (Pemahaman fakta & kebaikan materi) - Skor 20
2. B (Wujud kasih sayang, ukhuwah & rasa syukur) - Skor 20
3. B (Menyimak & menghargai pendapat teman) - Skor 20
Subtotal Pilihan Ganda = 60 Poin

II. Uraian / Esai:
1. Menambah ilmu pengetahuan, melatih rasa empati, dan menerapkan kebiasaan positif dalam kehidupan. (Skor 20)
2. Uraian penjelasan ${cleanTopic} yang logis, santun, dan sesuai konsep. (Skor 20)
Total Skor Maksimal = 100 Poin.`,
    
    lkpdTitle: `LKPD ${topicIndo} Berbasis Deep Learning & Cinta`,
    lkpdPetunjuk: `PETUNJUK PENGERJAAN LKPD:
1. Mulailah dengan membaca Basmalah dan berdoa bersama pasangan/kelompok belajarmu.
2. Bacalah petunjuk dan lembar tugas materi ${cleanTopic} dengan cermat.
3. Kerjakan tugas secara jujur, saling membantu (gotong royong), dan tunjukkan kesantunan sesama teman.`,
    lkpdTugas: `LEMBAR TUGAS & AKTIVITAS PESERTA DIDIK:

TUGAS 1: REFLEKSI & PEMAHAMAN BERMAKNA
Tuliskan pendapatmu tentang bagaimana materi ${topicIndo} dapat membantumu menjadi pribadi yang lebih berempati dan penuh kasih sayang!
Jawaban: ................................................................................................................................
.............................................................................................................................................

TUGAS 2: AKTIVITAS PRAKTIK / UNJUK KERJA KELOMPOK
- Lakukan diskusi kelompok / pasangan terkait materi ${cleanTopic}.
- Catat poin utama dan pesan kebaikan yang kamu dapatkan di bawah ini:
1. Nama Anggota Kelompok : ................................................................................................
2. Ringkasan Hasil Diskusi : ................................................................................................
3. Pesan Kasih Sayang     : ................................................................................................`,

    nilaiCinta: [
      'Cinta Allah SWT & Rasul-Nya',
      'Cinta Diri Sendiri & Kesehatan Jiwa',
      'Cinta Sesama Manusia & Empati',
      'Cinta Ilmu Pengetahuan & Kebenaran'
    ],

    rubrik: [
      {
        kriteria: `Kelancaran Pelafalan ${cleanTopic}`,
        berkembang: 'Perlu bimbingan pelafalan.',
        layak: 'Lancar dan mahraj tepat.',
        mahir: 'Sangat fasih, natural, dan santun.'
      },
      {
        kriteria: 'Sikap Kasih Sayang & Empati',
        berkembang: 'Kurang tersenyum dan kaku.',
        layak: 'Santun dan ramah.',
        mahir: 'Sangat ramah, tersenyum, dan penuh empati.'
      }
    ]
  };
};

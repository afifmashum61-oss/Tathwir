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

    pertemuanList: [
      {
        no: 1,
        jp: '2 JP (80 Menit)',
        pembahasan: `Pengenalan Kosakata (Mufrodat/Istilah Utama) & Konsep Dasar ${cleanTopic}`,
        topikCinta: 'Cinta Diri & Sesama Manusia, Cinta Allah SWT dan Rasul-Nya',
        pendahuluan: `1. Salam Pembuka Cinta: Guru menyapa peserta didik dengan ramah, tersenyum, dan menanyakan kabar.\n2. Doa & Tadarus: Membaca doa sebelum belajar dan surat pendek sebagai wujud cinta kepada Allah SWT.\n3. Apersepsi: Guru mengaitkan pentingnya mempelajari ${topicIndo} dalam kehidupan sehari-hari.\n4. Penyampaian Tujuan: Guru menyampaikan target pembelajaran Pertemuan 1.`,
        inti: `1. Mindful Listening: Guru menjelaskan/melafalkan kosakata & istilah utama ${cleanTopic} dengan intonasi jelas.\n2. Joyful Repetition: Peserta didik menirukan pelafalan dan membaca frasa utama secara antusias.\n3. Meaningful Connection: Guru menekankan bahwa mempelajari ${topicIndo} adalah bentuk menebar kebaikan.\n4. Pembelajaran Berdiferensiasi: Bermain kartu kata/gambar dalam kelompok kecil.`,
        penutup: `1. Refleksi Cinta: Guru bertanya tentang kata/konsep yang paling disukai hari ini.\n2. Rangkuman: Guru bersama siswa menyimpulkan materi Pertemuan 1.\n3. Tindak Lanjut: Tugas pembiasaan ringan di rumah.\n4. Penutup: Doa dan salam.`
      },
      {
        no: 2,
        jp: '2 JP (80 Menit)',
        pembahasan: `Penguatan Kosakata & Istilah Penting Pembahasan ${cleanTopic}`,
        topikCinta: 'Cinta Ilmu Pengetahuan & Kebenaran',
        pendahuluan: `1. Salam & Senyum Cinta: Menyapa dan menanyakan kesiapan emosi siswa.\n2. Review Singkat: Mengulas kosakata Pertemuan 1 dengan permainan tebak cepat.\n3. Apersepsi: Mengapa penguasaan istilah ${topicIndo} itu penting.\n4. Menyampaikan tujuan Pertemuan 2.`,
        inti: `1. Mindful Reading: Membaca frasa dan kalimat sederhana terkait ${cleanTopic}.\n2. Joyful Card Game: Peserta didik mencocokkan frasa dengan artinya secara berpasangan.\n3. Meaningful Insight: Mendiskusikan makna kebaikan di balik materi ${topicIndo}.\n4. Pembelajaran Berdiferensiasi: Guru mendampingi kelompok yang membutuhkan bimbingan ekstra.`,
        penutup: `1. Refleksi: Peserta didik menyampaikan pesan kebaikan dari materi.\n2. Kesimpulan bersama.\n3. Penutup: Doa dan salam.`
      },
      {
        no: 3,
        jp: '2 JP (80 Menit)',
        pembahasan: `Memahami Teks & Bahan Bacaan Deskriptif (Nushus) ${cleanTopic}`,
        topikCinta: 'Cinta Sesama Manusia & Empati',
        pendahuluan: `1. Salam & Kehangatan: Membuka kelas dengan senyum dan keceriaan.\n2. Doa bersama.\n3. Apersepsi: Mengamati gambar/slide media tentang ${topicIndo}.\n4. Penyampaian tujuan membaca teks Pertemuan 3.`,
        inti: `1. Mindful Reading: Peserta didik membaca teks deskriptif ${cleanTopic} secara tenang.\n2. Meaningful Discussion: Mengidentifikasi fakta & isi teks ${topicIndo} secara berkelompok.\n3. Joyful Quiz: Kuis interaktif kelompok menjawab pertanyaan isi teks.\n4. Pembelajaran Berdiferensiasi: Menyediakan teks berfasilitas gambar/glosarium.`,
        penutup: `1. Refleksi pembelajaran teks.\n2. Penguatan dari guru.\n3. Penutup: Doa dan salam.`
      },
      {
        no: 4,
        jp: '2 JP (80 Menit)',
        pembahasan: `Analisis Tata Bahasa / Kaidah Struktur Kalimat ${cleanTopic}`,
        topikCinta: 'Cinta Ilmu & Penalaran Kritis',
        pendahuluan: `1. Salam Pembuka Cinta & Senyum.\n2. Doa sebelum belajar.\n3. Apersepsi: Menunjukkan pola struktur kalimat dalam teks Pertemuan 3.\n4. Penyampaian tujuan tata bahasa.`,
        inti: `1. Mindful Analysis: Guru menjelaskan pola tata bahasa/struktur kalimat ${cleanTopic}.\n2. Meaningful Application: Mengubah dan menyusun kalimat sederhana sesuai aturan kaidah.\n3. Joyful Practice: Papan tulis bersama / papan tempel kalimat.\n4. Pembelajaran Berdiferensiasi: Latihan bertingkat (dasar, menengah, mahir).`,
        penutup: `1. Refleksi kemudahan memahami rumus/pola.\n2. Kesimpulan rumus kaidah.\n3. Penutup: Doa dan salam.`
      },
      {
        no: 5,
        jp: '2 JP (80 Menit)',
        pembahasan: `Praktik Dialog / Unjuk Kerja Komunikasi Berbasis Empati`,
        topikCinta: 'Cinta Sesama Manusia & Kesantunan',
        pendahuluan: `1. Salam & Pengondisian emosi siswa.\n2. Doa bersama.\n3. Apersepsi: Memperagakan contoh dialog perkenalan/diskusi ${topicIndo}.\n4. Menyampaikan target praktik berpasangan.`,
        inti: `1. Mindful Practice: Peserta didik menyusun dialog berpasangan tentang ${cleanTopic}.\n2. Joyful Role Playing: Mempraktikkan dialog di depan kelas dengan intonasi ramah dan tersenyum.\n3. Meaningful Peer Feedback: Saling memberikan apresiasi positif kepada teman.\n4. Pembelajaran Berdiferensiasi: Menampilkan dialog lisan atau tulisan.`,
        penutup: `1. Refleksi rasa percaya diri tampil di depan kelas.\n2. Apresiasi dari guru.\n3. Penutup: Doa dan salam.`
      },
      {
        no: 6,
        jp: '2 JP (80 Menit)',
        pembahasan: `Pengerjaan LKPD Kelompok & Kolaborasi Cinta ${cleanTopic}`,
        topikCinta: 'Gotong Royong & Moderasi Beragama',
        pendahuluan: `1. Salam Pembuka & Doa bersama.\n2. Apersepsi: Menjelaskan tugas kolaboratif pada Lembar Kerja Peserta Didik (LKPD).\n3. Pembagian kelompok kerja.`,
        inti: `1. Mindful Collaboration: Kelompok mendiskusikan tugas LKPD ${cleanTopic} secara gotong royong.\n2. Meaningful Problem Solving: Mengisi lembar refleksi dan studi kasus kebaikan.\n3. Joyful Presentation: Setiap kelompok memajang/mempresentasikan hasil LKPD.\n4. Pembelajaran Berdiferensiasi: Pembagian peran kelompok sesuai minat siswa.`,
        penutup: `1. Refleksi pentingnya kerja sama & empati.\n2. Pengumpulan LKPD.\n3. Penutup: Doa dan salam.`
      },
      {
        no: 7,
        jp: '2 JP (80 Menit)',
        pembahasan: `Penyusunan Produk Paragraf / Karya Mandiri Peserta Didik`,
        topikCinta: 'Kreativitas & Cinta Diri',
        pendahuluan: `1. Salam, Doa & Apersepsi penyusunan karya mandiri.\n2. Penyampaian kriteria rubrik karya.`,
        inti: `1. Mindful Writing/Creating: Peserta didik menyusun karya/paragraf mandiri tentang ${topicIndo}.\n2. Meaningful Reflection: Memasukkan nilai-nilai kasih sayang dan empati dalam karya.\n3. Joyful Exhibition: Menampilkan karya di mading/papan karya kelas.\n4. Pembelajaran Berdiferensiasi: Pilihan produk tulisan, gambar bergambar, atau video rekaman.`,
        penutup: `1. Refleksi kebanggaan terhadap karya sendiri.\n2. Ulasan guru.\n3. Penutup: Doa dan salam.`
      },
      {
        no: 8,
        jp: '2 JP (80 Menit)',
        pembahasan: `Asesmen Sumatif Bab ${cleanTopic} & Evaluasi Capaian Pembelajaran KBC`,
        topikCinta: 'Kejujuran, Tanggung Jawab & Rasa Syukur',
        pendahuluan: `1. Salam Pembuka & Pengondisian ruang tes secara tenang dan nyaman.\n2. Doa kejujuran & ketenangan sebelum tes.\n3. Penjelasan petunjuk pengerjaan Asesmen Sumatif.`,
        inti: `1. Mindful Testing: Peserta didik mengerjakan Naskah Soal Asesmen Sumatif (Pilihan Ganda & Esai) dengan jujur dan tenang.\n2. Meaningful Evaluation: Mengumpulkan hasil tes dan refleksi capaian Bab ${cleanTopic}.\n3. Asesmen Unjuk Kerja/Portofolio KBC.`,
        penutup: `1. Guru memberikan apresiasi atas perjuangan belajar seluruh siswa selama 8 pertemuan.\n2. Refleksi penutupan Bab ${cleanTopic}.\n3. Doa syukur dan salam penutup.`
      }
    ],

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

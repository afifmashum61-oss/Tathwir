import React, { useState } from 'react';
import { Sparkles, Send, BookOpen, CheckCircle, RefreshCw, Copy, Heart, Check } from 'lucide-react';
import { PILAR_CINTA_KEMENAG } from '../data/presetTemplates';
import { generateAIContent } from '../utils/aiGenerator';

export default function AIAssistantModal({ onLoadPreset, setActiveTab }) {
  const [subject, setSubject] = useState('Akidah Akhlak / PAI');
  const [topic, setTopic] = useState('Adab Pergaulan & Kasih Sayang');
  const [grade, setGrade] = useState('MTs / SMP / Fase D');
  const [selectedPilars, setSelectedPilars] = useState([
    'Cinta Allah SWT & Rasul-Nya',
    'Cinta Sesama Manusia & Empati',
    'Cinta Moderasi Beragama & Kedamaian'
  ]);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const togglePilar = (namaPilar) => {
    setSelectedPilars(prev =>
      prev.includes(namaPilar)
        ? prev.filter(p => p !== namaPilar)
        : [...prev, namaPilar]
    );
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      const generated = generateAIContent(subject, topic, grade, 'Problem Based Learning Berbasis Empati', true);
      generated.nilaiCinta = selectedPilars;
      setResult(generated);
      setIsLoading(false);
    }, 600);
  };

  const handleCopyText = () => {
    if (!result) return;
    const text = `
PILAR CINTA KEMENAG:
${(result.nilaiCinta || []).join(' • ')}

CAPAIAN PEMBELAJARAN (KBC):
${result.cp}

TUJUAN PEMBELAJARAN:
${result.tp}

PEMAHAMAN BERMAKNA:
${result.pemahamanBermakna}

PERTANYAAN PEMANTIK:
${result.pertanyaanPemantik}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-rose-700 via-pink-600 to-teal-600 p-8 rounded-3xl text-white shadow-md space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur">
          <Heart className="w-4 h-4 text-rose-200 fill-rose-200" /> AI Pedagogical Generator KBC Kemenag
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold">Asisten Cerdas Kurikulum Berbasis Cinta (KBC)</h1>
        <p className="text-rose-100 text-xs sm:text-sm max-w-xl leading-relaxed">
          Pilih 7 Pilar Cinta Kemenag yang ingin diintegrasikan. AI akan secara otomatis merumuskan Capaian Pembelajaran, Sintaks Kasih Sayang, dan Rubrik Empati secara instan.
        </p>
      </div>

      {/* FORM INPUT */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
        <form onSubmit={handleGenerate} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Mata Pelajaran</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-rose-500 outline-none"
                placeholder="misal: Akidah Akhlak"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Topik / Materi Pembelajaran</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-rose-500 outline-none"
                placeholder="misal: Adab Bergaul & Anti-Bullying"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Jenjang / Fase</label>
              <input
                type="text"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-rose-500 outline-none"
                placeholder="misal: MTs / Fase D"
              />
            </div>
          </div>

          {/* 7 PILAR CINTA KEMENAG SELECTION IN AI MODAL */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="block text-xs font-extrabold text-rose-900 uppercase flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-rose-600 fill-rose-600" />
              Pilih Pilar Utama Nilai-Nilai Cinta Kemenag yang Diintegrasikan:
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {PILAR_CINTA_KEMENAG.map((pilar, idx) => {
                const isSelected = selectedPilars.includes(pilar.nama);
                return (
                  <button
                    key={pilar.id}
                    type="button"
                    onClick={() => togglePilar(pilar.nama)}
                    className={`p-2.5 rounded-xl border text-left text-xs font-bold flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-rose-50 border-rose-500 text-rose-950 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-bold ${isSelected ? 'bg-rose-600 text-white' : 'bg-slate-200 text-slate-700'}`}>
                        {idx + 1}
                      </span>
                      <span>{pilar.nama}</span>
                    </div>

                    <div className={`w-4 h-4 rounded flex items-center justify-center border ${isSelected ? 'bg-rose-600 border-rose-600 text-white' : 'border-slate-300'}`}>
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-500 hover:from-rose-700 hover:to-pink-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Sedang Menggenerasi Komponen KBC...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" /> Generasi Komponen Pembelajaran KBC
                </>
              )}
            </button>
          </div>
        </form>

        {/* AI GENERATED RESULT */}
        {result && (
          <div className="pt-6 border-t border-slate-100 space-y-5">
            <div className="flex justify-between items-center">
              <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-rose-600" /> Hasil Generasi Kurikulum Berbasis Cinta
              </h2>
              <button
                onClick={handleCopyText}
                className="px-3 py-1.5 text-xs font-bold text-rose-700 bg-rose-50 rounded-lg hover:bg-rose-100 flex items-center gap-1"
              >
                <Copy className="w-3.5 h-3.5" /> {copied ? 'Tercopy!' : 'Salin Teks'}
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3 bg-rose-50 rounded-xl border border-rose-200">
                <div className="font-bold text-rose-900 uppercase mb-1">Pilar Nilai Cinta Terpilih:</div>
                <div className="flex flex-wrap gap-1.5">
                  {result.nilaiCinta.map(n => (
                    <span key={n} className="bg-white text-rose-800 border border-rose-300 font-bold px-2 py-0.5 rounded-md">
                      ♥ {n}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <div className="font-bold text-teal-900 uppercase">Capaian Pembelajaran (CP)</div>
                <p className="text-slate-700 leading-relaxed">{result.cp}</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <div className="font-bold text-teal-900 uppercase">Tujuan Pembelajaran (TP)</div>
                <p className="text-slate-700 whitespace-pre-line leading-relaxed">{result.tp}</p>
              </div>

              <div className="p-4 bg-rose-50/50 rounded-2xl border border-rose-200 space-y-1">
                <div className="font-bold text-rose-900 uppercase">Pemahaman Bermakna</div>
                <p className="text-rose-950 leading-relaxed">"{result.pemahamanBermakna}"</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <div className="font-bold text-teal-900 uppercase">Pertanyaan Pemantik Kasih Sayang</div>
                <p className="text-slate-700 whitespace-pre-line leading-relaxed">{result.pertanyaanPemantik}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

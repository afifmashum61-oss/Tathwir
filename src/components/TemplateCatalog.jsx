import React from 'react';
import { BookOpen, Sparkles, ArrowRight, CheckCircle2, FileText, Download } from 'lucide-react';
import { PRESET_TEMPLATES } from '../data/presetTemplates';

export default function TemplateCatalog({ onLoadPreset }) {
  return (
    <div className="space-y-6 pb-12">
      {/* HEADER BANNER */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-2">
        <div className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md">
          <BookOpen className="w-3.5 h-3.5" /> Bank Template Siap Pakai
        </div>
        <h1 className="text-2xl font-extrabold text-slate-800">Template Perangkat Pembelajaran Kurikulum Merdeka</h1>
        <p className="text-xs text-slate-500">Pilih salah satu contoh template di bawah untuk langsung mengedit dan menyesuaikan dengan kebutuhan sekolah Anda.</p>
      </div>

      {/* TEMPLATE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRESET_TEMPLATES.map((tpl) => (
          <div
            key={tpl.id}
            className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-teal-500 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                  {tpl.matpel}
                </span>
                <span className="text-[10px] font-bold text-slate-400">
                  {tpl.jenjang}
                </span>
              </div>

              <h3 className="font-bold text-slate-800 text-base mb-2 group-hover:text-teal-700 transition-colors leading-snug">
                {tpl.title}
              </h3>

              <p className="text-xs text-slate-500 line-clamp-3 mb-4 leading-relaxed">
                {tpl.cp}
              </p>

              <div className="space-y-1 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 mb-4">
                <p><span className="font-semibold text-slate-800">Model:</span> {tpl.modelPembelajaran}</p>
                <p><span className="font-semibold text-slate-800">Alokasi Waktu:</span> {tpl.alokasiWaktu}</p>
                <p><span className="font-semibold text-slate-800">Target:</span> {tpl.targetPeserta}</p>
              </div>
            </div>

            <button
              onClick={() => onLoadPreset(tpl)}
              className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              Gunakan Template Ini <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

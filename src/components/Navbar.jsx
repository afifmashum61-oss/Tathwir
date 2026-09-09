import React, { useState } from 'react';
import { 
  BookOpen, PlusCircle, FolderKanban, Sparkles, FileText, Home, 
  BookMarked, Calendar, CalendarRange, Menu, X, ChevronDown 
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onNewDocument }) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', desc: 'Halaman Utama & Ringkasan Perangkat', icon: Home },
    { id: 'prota', label: 'Program Tahunan (PROTA)', desc: 'Perencanaan Alokasi JP 1 Tahun Ajaran', icon: Calendar },
    { id: 'prosem', label: 'Program Semester (PROSEM)', desc: 'Matriks Distribusi JP per Minggu', icon: CalendarRange },
    { id: 'materi-ajar', label: 'Materi Ajar', desc: 'Kelola & Buat Materi Pembelajaran', icon: BookMarked },
    { id: 'bank', label: 'Bank Perangkat', desc: 'Kumpulan Dokumen Perangkat Anda', icon: FolderKanban },
    { id: 'templates', label: 'Template Ready', desc: 'Template Siap Pakai Berbagai Matpel', icon: FileText },
    { id: 'ai-assistant', label: 'AI Assistant', desc: 'Asisten Pintar Kurikulum Merdeka', icon: Sparkles },
  ];

  const handleSelect = (tabId) => {
    setActiveTab(tabId);
    setIsOpen(false);
  };

  return (
    <header className="no-print sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-teal-100 shadow-sm">
      {/* Top Banner Bar */}
      <div className="bg-gradient-to-r from-teal-800 via-teal-700 to-emerald-600 text-white text-xs py-1 px-4 text-center font-medium flex justify-between items-center">
        <span>✨ PerangkatAjar Pro - Generator Modul Ajar Deep Learning, PROTA & PROSEM AI</span>
        <span className="bg-emerald-500/30 px-2 py-0.5 rounded text-[11px] font-semibold">V2.6 KBC Standard</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Brand Logo */}
          <div 
            onClick={() => handleSelect('dashboard')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-400 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-800">Perangkat<span className="text-teal-600">Ajar</span></span>
                <span className="bg-rose-100 text-rose-700 text-[10px] font-extrabold px-1.5 py-0.5 rounded uppercase">KBC & DEEP</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Platform Generator Perangkat Pembelajaran Guru</p>
            </div>
          </div>

          {/* Action Buttons & Hamburger Toggle */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onNewDocument}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-700 hover:to-emerald-600 text-white font-bold text-xs shadow-md shadow-teal-600/20 hover:shadow-lg transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Buat Modul Ajar Baru</span>
              <span className="sm:hidden">Buat Baru</span>
            </button>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border font-bold text-xs transition-all ${
                isOpen 
                  ? 'bg-teal-700 text-white border-teal-800 shadow-inner' 
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200/80'
              }`}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-4 h-4 text-white" /> : <Menu className="w-4 h-4 text-slate-700" />}
              <span className="hidden sm:inline">Menu</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180 text-white' : 'text-slate-500'}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Hamburger Dropdown Menu Overlay Panel */}
      {isOpen && (
        <div className="absolute top-full right-4 sm:right-6 lg:right-8 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 mt-2 space-y-1 animate-in fade-in slide-in-from-top-2 z-50">
          <div className="px-3 py-2 text-[11px] font-extrabold uppercase text-slate-400 border-b border-slate-100 mb-1 flex justify-between items-center">
            <span>Pilih Menu Navigasi</span>
            <span className="text-teal-600 font-bold">PerangkatAjar Pro</span>
          </div>

          <div className="grid grid-cols-1 gap-1 max-h-[75vh] overflow-y-auto pr-1">
            {menuItems.map((item) => {
              const IconComp = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`w-full flex items-start gap-3 p-3 rounded-xl transition-all text-left group ${
                    isActive
                      ? 'bg-teal-50 border border-teal-200 shadow-sm'
                      : 'hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <div className={`p-2 rounded-xl border ${
                    isActive 
                      ? 'bg-teal-600 text-white border-teal-700' 
                      : 'bg-slate-100 text-slate-600 border-slate-200 group-hover:bg-teal-100 group-hover:text-teal-700'
                  }`}>
                    <IconComp className="w-4 h-4" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold ${isActive ? 'text-teal-900' : 'text-slate-800'}`}>
                        {item.label}
                      </span>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse"></span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}

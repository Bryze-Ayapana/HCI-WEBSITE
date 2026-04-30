import React, { useState, useEffect, useCallback } from 'react';
import { FiChevronDown, FiAward, FiFileText, FiExternalLink, FiDownload, FiX } from 'react-icons/fi';
import { BsStars } from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';

const Transparency = () => {
  const [openSection, setOpenSection] = useState('I');
  const [activeSub, setActiveSub] = useState('mandate');
  
  // Resizing & Viewer State
  const [sidebarWidth, setSidebarWidth] = useState(380);
  const [viewerWidth, setViewerWidth] = useState(500);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isResizingSidebar, setIsResizingSidebar] = useState(false);
  const [isResizingViewer, setIsResizingViewer] = useState(false);

  const sections = [
    {
      id: 'I',
      title: "AGENCY'S MANDATE AND FUNCTIONS; CONTACT INFORMATION AND ITS OFFICIALS",
      items: [
        { id: 'mandate', name: 'AGENCY MANDATE AND FUNCTION' },
        { id: 'contact', name: 'CONTACT INFORMATION AND ITS OFFICIALS' },
        { id: 'mission', name: 'MISSION AND VISION' }
      ]
    },
    { id: 'II', title: 'ANNUAL FINANCIAL REPORTS', items: [] },
    { id: 'III', title: 'DBM APPROVED BUDGET AND CORRESPONDING TARGETS', items: [] },
    { id: 'IV', title: 'PROJECTS, PROGRAMS AND ACTIVITIES, BENEFICIARIES, AND STATUS OF IMPLEMENTATION', items: [] },
    { id: 'V', title: 'ANNUAL PROCUREMENT PLAN', items: [] },
  ];

  const legalMandates = [
    { text: 'The 1987 Constitution', isSub: false, file: '/1987Constitution.pdf' },
    { text: 'Republic Act 6847', isSub: false, file: '/RepublicAct6847.pdf' },
    { text: 'Implementing Rules and Regulations of RA 6847', isSub: true, file: '/IRRofRANo.6847.pdf' },
    { text: 'Republic Act 7160', isSub: false, file: '/RepublicAct7160.pdf' },
    { text: 'Republic Act 7549', isSub: false, file: '/RepublicAct7549.pdf' },
    { text: 'Republic Act 9064', isSub: false, file: '/RepublicAct9064.pdf' },
    { text: 'Republic Act 9155', isSub: false, file: '/RepublicAct9155.pdf' },
    { text: 'Implementing Rules and Regulations of RA 9155', isSub: true, file: '/IRRofRANo.9155.pdf' },
    { text: 'Executive Order No.44', isSub: false, file: '/ExecutiveOrder44.pdf' },
    { text: 'Executive Order No.63', isSub: false, file: '/ExecutiveOrder63.pdf' },
    { text: 'Executive Order No.79', isSub: false, file: '/ExecutiveOrder79.pdf' },
    { text: 'Executive Order No.81', isSub: false, file: '/ExecutiveOrder81.pdf' },
    { text: 'Implementing Rules and Regulations of Executive Order No. 81', isSub: true, file: '/IRRofEONo.81.pdf' },
    { text: 'Executive Order No.535', isSub: false, file: '/ExecutiveOrder535.pdf' },
    { text: 'The UNESCO Charter', isSub: false, file: '/UNESCOCharter.pdf' },
  ];

  // --- RESIZING LOGIC ---
  const handleMouseDownSidebar = () => setIsResizingSidebar(true);
  const handleMouseDownViewer = () => setIsResizingViewer(true);

  const handleMouseMove = useCallback((e) => {
    if (isResizingSidebar) {
      const newWidth = e.clientX;
      if (newWidth > 250 && newWidth < 600) setSidebarWidth(newWidth);
    }
    if (isResizingViewer) {
      const newWidth = window.innerWidth - e.clientX;
      if (newWidth > 350 && newWidth < 1000) setViewerWidth(newWidth);
    }
  }, [isResizingSidebar, isResizingViewer]);

  const handleMouseUp = useCallback(() => {
    setIsResizingSidebar(false);
    setIsResizingViewer(false);
  }, []);

  useEffect(() => {
    if (isResizingSidebar || isResizingViewer) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'default';
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizingSidebar, isResizingViewer, handleMouseMove, handleMouseUp]);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-[#030A17] font-poppins overflow-hidden pt-28 transition-colors duration-300">
      
      {/* ── 1. LEFT SIDEBAR (Resizable) ── */}
      <aside 
        style={{ width: `${sidebarWidth}px` }}
        className="flex-shrink-0 flex flex-col border-r border-gray-200 dark:border-white/10 bg-white dark:bg-transparent z-40 relative group transition-colors duration-300"
      >
        <div className="p-6 lg:p-8 flex-1 overflow-y-auto custom-scrollbar">
          <header className="mb-8">
            {/* Updated Thinner, Black/White Header */}
            <h1 className="text-3xl font-bold tracking-tighter uppercase mb-6 leading-none text-gray-900 dark:text-white">
              <span className="block mb-1">Transparency</span>
              <span className="block text-4xl">Seal</span>
            </h1>
          </header>

          <div className="mb-8">
            <p className="text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase mb-4 pl-1">Dashboard</p>

            <nav className="space-y-2">
              {sections.map((section) => (
                <div key={section.id} className="group/section">
                  <button
                    onClick={() => setOpenSection(openSection === section.id ? '' : section.id)}
                    className={`w-full flex items-start gap-3 p-3 rounded-xl border transition-all text-left
                      ${openSection === section.id 
                        ? "bg-blue-50 dark:bg-white/10 border-blue-100 dark:border-white/10 shadow-sm" 
                        : "border-transparent bg-transparent hover:bg-gray-50 dark:hover:bg-white/5"
                      }`}
                  >
                    <span className={`text-[11px] font-black mt-0.5 min-w-[20px] ${openSection === section.id ? "text-ph-blue dark:text-cyan-400" : "text-gray-400"}`}>
                      {section.id}.
                    </span>
                    <span className={`text-[11px] font-bold leading-tight flex-1 ${openSection === section.id ? "text-ph-blue dark:text-white" : "text-gray-500 dark:text-gray-400"}`}>
                      {section.title}
                    </span>
                    <FiChevronDown
                      className={`mt-0.5 flex-shrink-0 transition-transform duration-300 ${openSection === section.id ? "rotate-180 text-ph-blue dark:text-cyan-400" : "text-gray-400"}`}
                      size={14}
                    />
                  </button>

                  <AnimatePresence>
                    {openSection === section.id && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden ml-4 mt-2 space-y-1"
                      >
                        {section.items.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => setActiveSub(item.id)}
                            className={`w-full flex items-center gap-3 py-2.5 px-4 rounded-lg transition-all text-left group/item
                              ${activeSub === item.id
                                ? "bg-ph-blue/10 dark:bg-cyan-500/10 border border-ph-blue/20 dark:border-cyan-500/20"
                                : "hover:bg-gray-100 dark:hover:bg-white/5"
                              }`}
                          >
                            <BsStars className={`text-xs transition-colors ${activeSub === item.id ? "text-ph-yellow" : "text-gray-400 group-hover/item:text-ph-yellow"}`} />
                            <span className={`text-[10px] font-black uppercase tracking-wider leading-tight
                              ${activeSub === item.id 
                                ? "text-ph-blue dark:text-yellow-400" 
                                : "text-gray-500 dark:text-gray-400 group-hover/item:text-gray-800 dark:group-hover/item:text-gray-200"
                              }`}>
                              {item.name}
                            </span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>
          </div>
        </div>

        {/* --- CLAUDE STYLE DIVIDER (SIDEBAR) --- */}
        <div 
          onMouseDown={handleMouseDownSidebar}
          className="group absolute top-0 bottom-0 -right-1 w-2 cursor-col-resize z-50 grid place-items-center"
        >
          <div className="absolute top-0 bottom-0 right-1 w-[1px] bg-gray-200 dark:bg-white/10 group-hover:bg-ph-blue dark:group-hover:bg-cyan-500/50 group-hover:w-[2px] transition-all" />
          <div className="h-10 w-2 rounded-full bg-gray-300 dark:bg-gray-700 border border-gray-400 dark:border-gray-600 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        </div>
      </aside>

      {/* ── 2. MAIN CONTENT ── */}
      <main className="flex-1 overflow-y-auto custom-scrollbar p-10 lg:p-20 bg-white dark:bg-transparent relative transition-colors duration-300">
        <div className="max-w-4xl mx-auto pb-20">
          
          {/* MANDATE MODULE */}
          {activeSub === 'mandate' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <header className="mb-12">
                {/* Updated Thinner, Black/White Header */}
                <h2 className="text-5xl font-bold uppercase tracking-tighter mb-4 leading-[0.9] text-gray-900 dark:text-white">
                  <span className="block">PSC Legal Mandate</span>
                  <span className="block">And Functions</span>
                </h2>
                <p className="text-gray-500 font-medium">Click on the documents below to view the respective files.</p>
              </header>

              {/* Updated Container with bg-[#f1f1f1] for light mode */}
              <div className="bg-[#f1f1f1] dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8 shadow-sm dark:shadow-none transition-colors duration-300">
                <ul className="flex flex-col gap-1">
                  {legalMandates.map((item, idx) => (
                    <li key={idx} className={item.isSub ? "ml-10 mt-1 mb-3" : "mt-2"}>
                      <button
                        onClick={() => setSelectedFile(item.file)}
                        className={`group flex items-center gap-4 w-full text-left py-2 px-3 rounded-lg transition-all
                          ${selectedFile === item.file ? 'bg-gray-200 dark:bg-white/10' : 'hover:bg-gray-200/50 dark:hover:bg-white/5'}
                        `}
                      >
                        {item.isSub ? (
                          <div className="w-1.5 h-1.5 rounded-full bg-ph-yellow group-hover:bg-ph-blue dark:group-hover:bg-cyan-400 transition-colors" />
                        ) : (
                          <FiFileText size={16} className="text-gray-400 group-hover:text-ph-blue dark:group-hover:text-cyan-400 transition-colors" />
                        )}
                        <span className={`text-sm font-medium tracking-wide transition-colors
                          ${item.isSub 
                            ? 'text-gray-500 dark:text-gray-400 group-hover:text-ph-blue dark:group-hover:text-cyan-300' 
                            : 'text-gray-800 dark:text-gray-200 group-hover:text-ph-blue dark:group-hover:text-cyan-400'
                          }`}>
                          {item.text}
                        </span>
                        <div className="flex-1" />
                        <FiExternalLink size={14} className="text-gray-400 dark:text-gray-600 opacity-0 group-hover:opacity-100 group-hover:text-ph-blue dark:group-hover:text-cyan-400 transition-all" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

          {/* MISSION MODULE */}
          {activeSub === 'mission' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
               <header className="mb-16">
                {/* Updated Thinner, Black/White Header */}
                <h2 className="text-5xl font-bold uppercase tracking-tighter mb-8 leading-[0.9] text-gray-900 dark:text-white">
                  <span className="block">Vision And</span>
                  <span className="block">Mission</span>
                </h2>
                <div className="flex items-center gap-8 p-8 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-sm dark:shadow-none">
                  <div className="w-20 h-20 rounded-full bg-ph-yellow/10 border border-ph-yellow/20 flex items-center justify-center flex-shrink-0 animate-pulse">
                    <FiAward size={32} className="text-ph-yellow" />
                  </div>
                  <blockquote className="text-gray-600 dark:text-gray-300 text-[15px] font-medium leading-relaxed italic border-l-2 border-gray-200 dark:border-white/10 pl-6">
                    "A pearl buried inside a tightly-shut shell is practically worthless. Government information is a pearl, meant to be shared with the public in order to maximize its inherent value."
                  </blockquote>
                </div>
              </header>

              <section className="grid grid-cols-1 gap-12 mt-12 pl-4 border-l border-gray-200 dark:border-white/10">
                <div>
                  <h4 className="text-[10px] font-black tracking-[0.5em] text-gray-400 dark:text-yellow-500 uppercase mb-3">The Goal</h4>
                  <h3 className="text-2xl font-black text-ph-blue dark:text-white uppercase tracking-tight mb-4">Vision</h3>
                  <p className="text-xl text-gray-800 dark:text-gray-200 font-bold leading-snug">
                    Solidifying the position of the Philippines as the Pearl of the Orient – a shining example for democratic virtue in the region.
                  </p>
                </div>
                <div>
                  <h4 className="text-[10px] font-black tracking-[0.5em] text-gray-400 dark:text-yellow-500 uppercase mb-3">The Task</h4>
                  <h3 className="text-2xl font-black text-ph-blue dark:text-white uppercase tracking-tight mb-4">Mission</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                    To inspire Filipinos in the civil service to be more open to citizen engagement; on the other hand, to invite the Filipino citizenry to exercise their right to participate in governance.
                  </p>
                </div>
              </section>
            </motion.div>
          )}

          {/* EMPTY STATE */}
          {!['mandate', 'mission'].includes(activeSub) && (
            <div className="flex flex-col items-center justify-center h-[50vh] text-gray-400">
              <FiFileText size={64} className="mb-6 opacity-20" />
              <p className="text-xs font-black uppercase tracking-[0.5em]">Module Under Construction</p>
            </div>
          )}
        </div>
      </main>

      {/* ── 3. PDF VIEWER SIDE PANEL (Resizable Right Side) ── */}
      <AnimatePresence>
        {selectedFile && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            style={{ width: `${viewerWidth}px` }}
            className="flex-shrink-0 flex flex-col bg-white dark:bg-[#060b16] border-l border-gray-200 dark:border-white/10 z-50 relative shadow-2xl"
          >
            {/* Resizer for Viewer */}
            <div 
              onMouseDown={handleMouseDownViewer}
              className="group absolute top-0 bottom-0 -left-1 w-2 cursor-col-resize z-50 grid place-items-center"
            >
              <div className="absolute top-0 bottom-0 left-1 w-[1px] bg-gray-200 dark:bg-white/10 group-hover:bg-ph-blue dark:group-hover:bg-cyan-500/50 group-hover:w-[2px] transition-all" />
              <div className="h-10 w-2 rounded-full bg-gray-300 dark:bg-gray-700 border border-gray-400 dark:border-gray-600 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>

            {/* Viewer Header */}
            <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 backdrop-blur-md">
              <div className="flex items-center gap-3 overflow-hidden">
                <FiFileText className="text-ph-blue dark:text-cyan-400 flex-shrink-0" />
                <span className="text-xs font-black tracking-wider text-gray-800 dark:text-gray-200 truncate">
                  {selectedFile.replace('/', '')}
                </span>
              </div>
              <div className="flex items-center gap-3 pl-4 flex-shrink-0">
                <a 
                  href={selectedFile} 
                  download 
                  className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 text-[10px] font-black text-gray-700 dark:text-white transition-colors"
                >
                  <FiDownload size={12} />
                  DOWNLOAD
                </a>
                <button 
                  onClick={() => setSelectedFile(null)}
                  className="p-1.5 rounded-full hover:bg-red-100 dark:hover:bg-red-500/20 text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                >
                  <FiX size={18} />
                </button>
              </div>
            </div>

            {/* Actual PDF Viewer */}
            <div className="flex-1 bg-gray-100 dark:bg-[#02060f] relative p-4">
              <div className="w-full h-full rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-inner bg-white dark:bg-transparent">
                <iframe 
                  src={`${selectedFile}#toolbar=0&navpanes=0`} 
                  className="w-full h-full border-none"
                  title="PDF Viewer"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Transparency;
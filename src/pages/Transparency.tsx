import React, { useState, useEffect, useCallback } from 'react';
import { FiChevronDown, FiAward, FiFileText, FiExternalLink, FiDownload, FiX, FiChevronLeft } from 'react-icons/fi';
import { BsStars } from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Transparency = () => {
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState('I');
  const [activeSub, setActiveSub] = useState('mandate');
  
  // Mobile View State: 'dashboard' | 'content' | 'viewer'
  const [mobileActiveView, setMobileActiveView] = useState('dashboard');
  
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
    { id: 'II', title: 'ANNUAL FINANCIAL REPORTS', items: [{ id: 'annual_financial', name: 'ANNUAL FINANCIAL REPORTS' }] },
    { id: 'III', title: 'DBM APPROVED BUDGET AND CORRESPONDING TARGETS', items: [{ id: 'dbm_budget', name: 'APPROVED BUDGET AND TARGETS' }] },
    { id: 'IV', title: 'PROJECTS, PROGRAMS AND ACTIVITIES, BENEFICIARIES, AND STATUS OF IMPLEMENTATION', items: [{ id: 'projects_programs', name: 'PROJECTS, PROGRAMS AND ACTIVITIES' }] },
    { id: 'V', title: 'ANNUAL PROCUREMENT PLAN', items: [{ id: 'procurement_plan', name: 'ANNUAL PROCUREMENT PLAN' }] },
  ];

  const legalMandates = [
    { text: 'The 1987 Constitution', isSub: false, file: '/1987Constitution.pdf' },
    { text: 'Republic Act 6847', isSub: false, file: '/RepublicActNo.6847.pdf' },
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

  // Data for Sections II, III, IV, and V
  const transparencyData = {
    annual_financial: {
      title: 'II. Annual Financial Reports',
      groups: [
        {
          groupTitle: 'a. FAR No.1 : SAAOBDB (Statement of Appropriations, Allotment, Obligation, Disbursement and Balances)',
          links: Array.from({length: 13}, (_, i) => ({ text: `a.${i+1} FY ${2025 - i}`, file: `/dummy.pdf` }))
        },
        {
          groupTitle: 'b. Summary Report on Disbursements',
          links: Array.from({length: 13}, (_, i) => ({ text: `b.${i+1} FY ${2025 - i}`, file: `/dummy.pdf` }))
        },
        {
          groupTitle: 'c. BAR NO. 1 - Quarterly Physical Report of Operations/Physical Plan',
          links: Array.from({length: 13}, (_, i) => ({ text: `c.${i+1} FY ${2025 - i}`, file: `/dummy.pdf` }))
        },
        {
          groupTitle: 'd. FAR NO. 5 - Quarterly Report on Revenue and Other Receipts',
          links: Array.from({length: 13}, (_, i) => ({ text: `d.${i+1} FY ${2025 - i}`, file: `/dummy.pdf` }))
        },
        {
          groupTitle: 'e. Financial Plan',
          links: Array.from({length: 11}, (_, i) => ({ text: `e.${i+1} FY ${2025 - i}`, file: `/dummy.pdf` }))
        }
      ]
    },
    dbm_budget: {
      title: 'III. DBM Approved Budget and Corresponding Targets',
      groups: [
        {
          groupTitle: 'a. PSC Budget',
          links: Array.from({length: 7}, (_, i) => ({ text: `a.${i+1} FY ${2025 - i}`, file: `/dummy.pdf` }))
        },
        {
          groupTitle: 'b. Targets / MFOs / GAA targets',
          links: Array.from({length: 7}, (_, i) => ({ text: `b.${i+1} FY ${2025 - i}`, file: `/dummy.pdf` }))
        }
      ]
    },
    projects_programs: {
      title: 'IV. Major Projects, Programs and Activities, Beneficiaries, and Status of Implementation',
      groups: [
        {
          groupTitle: 'a. Projects & Programs',
          links: Array.from({length: 6}, (_, i) => ({ text: `a.${i+1} FY ${2024 - i}`, file: `/dummy.pdf` }))
        },
        {
          groupTitle: 'b. FY 2023 Beneficiaries (not applicable)',
          links: []
        },
        {
          groupTitle: 'c. Status of Implementation',
          links: Array.from({length: 9}, (_, i) => ({ text: `c.${i+1} FY ${2023 - i}`, file: `/dummy.pdf` }))
        }
      ]
    },
    procurement_plan: {
      title: 'V. Annual Procurement Plan',
      groups: [
        {
          groupTitle: 'a. FY. 2026',
          links: [
            { text: 'a.1 Annual Procurement Plan for FY 2026', file: '/dummy.pdf' }
          ]
        },
        {
          groupTitle: 'b. FY. 2025',
          links: [
            { text: 'b.1 PSC Updated APP for CY 2025 - 2nd Semester', file: '/dummy.pdf' },
            { text: 'b.2 Procurement Monitoring Report as of 2nd Semester of 2025', file: '/dummy.pdf' },
            { text: 'b.3 Annual Procurement Plan - Common-Use-Supplies and Equipment (APP-CSE) 2026 Form', file: '/dummy.pdf' },
            { text: 'b.4 Philippine Sports Commission Procurement Monitoring Report as of 06/30/2025', file: '/dummy.pdf' },
            { text: 'b.5 Posting Certification - Annual Procurement Plan FY 2025', file: '/dummy.pdf' },
            { text: 'b.6 Annual Procurement Plan FY 2025', file: '/dummy.pdf' },
            { text: 'b.7 Philippine Sports Commission Procurement Monitoring Report as of 01/02/2025 on Negotiated Procurement', file: '/dummy.pdf' },
          ]
        },
        {
          groupTitle: 'c. FY. 2024',
          links: [
            { text: 'c.1 Certification - Early Procurement Activities (EPA)', file: '/dummy.pdf' },
            { text: 'c.2 Philippine Sports Commission Procurement Monitoring Report as of June 30, 2024', file: '/dummy.pdf' },
            { text: 'c.3 FY 2024 Indicative Annual Procurement Plan (APP)', file: '/dummy.pdf' },
            { text: 'c.4 FY 2024 Annual Procurement Plan (APP3)', file: '/dummy.pdf' },
            { text: 'c.5 Philippine Sports Commission Procurement Monitoring Report as of 01/10/2024', file: '/dummy.pdf' },
            { text: 'c.6 Annual Procurement Plan for 2023 (Updated/Supplemental Annual Procurement Plan No. 2 for FY 2023)', file: '/dummy.pdf' },
            { text: 'c.7 Posting Certification - Supplemental Annual Procurement Plan No. 2 for FY 2023', file: '/dummy.pdf' },
            { text: 'c.8 Posting Certification PSC-Annual Procurement Plan for FY 2024', file: '/dummy.pdf' },
            { text: 'c.9 Posting Certification Procurement Monitoring Report for the 2nd Semester for FY 2023', file: '/dummy.pdf' }
          ]
        },
        {
          groupTitle: 'd. FY. 2023',
          links: [
            { text: 'd.1 FY 2023 Indicative Annual Procurement Plan (APP)', file: '/dummy.pdf' },
            { text: 'd.2 Annual Procurement Plan-Common-Use Supplies and equipment(APP-CSE) 2023 Form', file: '/dummy.pdf' },
            { text: 'd.3 Annual Procurement Plan for FY 2023', file: '/dummy.pdf' },
            { text: 'd.4 FY 2023 Posting Certification APP - Philippine Sports Commission', file: '/dummy.pdf' },
            { text: 'd.5 Philippine Sports Commission Procurement Monitoring Report 1st Semester FY 2023', file: '/dummy.pdf' },
            { text: 'd.6 Posting Certification PMR 2023 1st Semester Philippine Sports Commission', file: '/dummy.pdf' },
            { text: 'd.7 Supplemental APPNonCSE2023 1st Semester Philippine Sports Commission', file: '/dummy.pdf' },
            { text: 'd.8 Posting Certification Supplemental APPNonCSE2023 1st Semester Philippine Sports Commission', file: '/dummy.pdf' }
          ]
        },
        {
          groupTitle: 'e. FY. 2022',
          links: [
            { text: 'e.1 FY 2022 Posting Certification APP - Philippine Sports Commission', file: '/dummy.pdf' },
            { text: 'e.2 FY 2022 Annual Procurement Plan (APP)', file: '/dummy.pdf' },
            { text: 'e.3 FY 2022 Certification - Early Procurement Activities', file: '/dummy.pdf' },
            { text: 'e.4 FY 2022 Indicative Annual Procurement Plan (APP)', file: '/dummy.pdf' },
            { text: 'e.5 FY 2022 APP-CSE', file: '/dummy.pdf' },
            { text: 'e.6 FY 2022 Procurement Monitoring 1st Semester Report', file: '/dummy.pdf' },
            { text: 'e.7 FY 2022 Annual Procurement Plan(APP) (1st Update)', file: '/dummy.pdf' },
            { text: 'e.8 FY 2022 Annual Procurement Plan(APP)(2nd Update)', file: '/dummy.pdf' }
          ]
        },
        {
          groupTitle: 'f. FY. 2021',
          links: [
            { text: 'f.1 FY 2021 Supplemental APP Non-CSE 2nd Sem', file: '/dummy.pdf' },
            { text: 'f.2 FY 2021 Procurement Monitoring 2nd Sem Report', file: '/dummy.pdf' },
            { text: 'f.3 FY 2021 Supplemental APP - 1st Update', file: '/dummy.pdf' },
            { text: 'f.4 FY 2021 Procurement Monitoring 1st Sem Report', file: '/dummy.pdf' },
            { text: 'f.5 FY 2021 Posting Certification APP - Philippine Sports Commission', file: '/dummy.pdf' },
            { text: 'f.6 FY 2021 Certification EPA - Philippine Sports Commission', file: '/dummy.pdf' },
            { text: 'f.7 FY 2021 APP Non CSE', file: '/dummy.pdf' },
            { text: 'f.8 FY 2021 APP-CSE', file: '/dummy.pdf' },
            { text: 'f.9 FY 2021 Indicative APP', file: '/dummy.pdf' }
          ]
        },
        {
          groupTitle: 'g. FY. 2020',
          links: [
            { text: 'g.1 FY 2020 APCPI Initial Results - Philippine Sports Commission', file: '/dummy.pdf' },
            { text: 'g.2 FY 2020 Procurement Monitoring 2nd Sem Report', file: '/dummy.pdf' },
            { text: 'g.3 FY 2020 APP-CSE', file: '/dummy.pdf' },
            { text: 'g.4 FY 2020 APP-Non-CSE', file: '/dummy.pdf' },
            { text: 'g.5 FY 2020 Supplemental APP - 2nd Update', file: '/dummy.pdf' },
            { text: 'g.6 FY 2020 Supplemental APP - 1st Update (Non-CSE)', file: '/dummy.pdf' },
            { text: 'g.7 FY 2020 Procurement Monitoring 1st Sem Report', file: '/dummy.pdf' },
            { text: 'g.8 FY 2020 Indicative APP-Non-CSE', file: '/dummy.pdf' },
            { text: 'g.9 FY 2020 Philgeps-Certificate of Compliance (Early Procurement Activities)', file: '/dummy.pdf' }
          ]
        }
      ]
    }
  };

  // --- MOBILE BACK HANDLER ---
  const handleBack = () => {
    if (mobileActiveView === 'viewer') {
      setMobileActiveView('content');
      setSelectedFile(null);
    } else if (mobileActiveView === 'content') {
      setMobileActiveView('dashboard');
    } else {
      navigate(-1);
    }
  };

  const closeViewer = () => {
    setSelectedFile(null);
    setMobileActiveView('content');
  };

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

  // FIXED: Using Native Viewer to prevent "No Preview Available" error on localhost/Vercel
  const getViewerUrl = (filePath) => {
    return `${filePath}#toolbar=0&navpanes=0`;
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-[#030A17] font-poppins overflow-hidden pt-[60px] md:pt-28 transition-colors duration-300">
      
      {/* ── MOBILE BACK NAVIGATION BAR ── */}
      <div className="lg:hidden flex items-center px-4 py-3 bg-white dark:bg-[#030A17] text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 z-50 flex-shrink-0 w-full">
        <button onClick={handleBack} className="p-1">
          <FiChevronLeft size={20} />
        </button>
        <span className="flex-1 text-center font-bold text-sm uppercase tracking-wider pr-6">Transparency Seal</span>
      </div>

      <div className="flex flex-1 overflow-hidden relative w-full">
        
        {/* ── 1. LEFT SIDEBAR (Dashboard) ── */}
        <aside 
          style={{ '--sidebar-width': `${sidebarWidth}px` }}
          className={`flex-shrink-0 flex-col border-r border-gray-200 dark:border-white/10 bg-white dark:bg-transparent z-40 relative group transition-colors duration-300 w-full lg:w-[var(--sidebar-width)] ${mobileActiveView === 'dashboard' ? 'flex' : 'hidden lg:flex'}`}
        >
          <div className="p-6 lg:p-8 flex-1 overflow-y-auto custom-scrollbar">
            <header className="mb-8">
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
                      <span className={`text-[11px] font-bold leading-tight flex-1 text-left ${openSection === section.id ? "text-ph-blue dark:text-white" : "text-gray-500 dark:text-gray-400"}`}>
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
                              onClick={() => {
                                if (item.id === 'contact') {
                                  navigate('/about/structure');
                                } else {
                                  setActiveSub(item.id);
                                  setMobileActiveView('content');
                                }
                              }}
                              className={`w-full flex items-center gap-3 py-2.5 px-4 rounded-lg transition-all text-left group/item
                                ${activeSub === item.id && mobileActiveView !== 'dashboard'
                                  ? "bg-ph-blue/10 dark:bg-cyan-500/10 border border-ph-blue/20 dark:border-cyan-500/20"
                                  : "hover:bg-gray-100 dark:hover:bg-white/5"
                                }`}
                            >
                              <BsStars className={`text-xs flex-shrink-0 transition-colors ${activeSub === item.id ? "text-ph-yellow" : "text-gray-400 group-hover/item:text-ph-yellow"}`} />
                              <span className={`text-[10px] font-black uppercase tracking-wider leading-tight text-left
                                ${activeSub === item.id && mobileActiveView !== 'dashboard'
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

          <div 
            onMouseDown={handleMouseDownSidebar}
            className="hidden lg:grid group absolute top-0 bottom-0 -right-1 w-2 cursor-col-resize z-50 place-items-center"
          >
            <div className="absolute top-0 bottom-0 right-1 w-[1px] bg-gray-200 dark:bg-white/10 group-hover:bg-ph-blue dark:group-hover:bg-cyan-500/50 group-hover:w-[2px] transition-all" />
            <div className="h-10 w-2 rounded-full bg-gray-300 dark:bg-gray-700 border border-gray-400 dark:border-gray-600 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </div>
        </aside>

        {/* ── 2. MAIN CONTENT (Content) ── */}
        <main className={`overflow-y-auto custom-scrollbar p-6 lg:p-20 bg-white dark:bg-transparent relative transition-colors duration-300 w-full ${mobileActiveView === 'content' ? 'flex flex-col' : 'hidden lg:flex lg:flex-col lg:flex-1'}`}>
          <div className="max-w-4xl mx-auto pb-20 w-full">
            
            {/* MANDATE MODULE */}
            {activeSub === 'mandate' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <header className="mb-12">
                  <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-4 leading-[0.9] text-gray-900 dark:text-white">
                    <span className="block">PSC Legal Mandate</span>
                    <span className="block">And Functions</span>
                  </h2>
                  <p className="text-gray-500 font-medium">Click on the documents below to view the respective files.</p>
                </header>

                <div className="bg-[#f1f1f1] dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 lg:p-8 shadow-sm dark:shadow-none transition-colors duration-300">
                  <ul className="flex flex-col gap-1">
                    {legalMandates.map((item, idx) => (
                      <li key={idx} className={item.isSub ? "ml-6 lg:ml-10 mt-1 mb-3" : "mt-2"}>
                        <button
                          onClick={() => {
                            setSelectedFile(item.file);
                            setMobileActiveView('viewer');
                          }}
                          className={`group flex items-center gap-4 w-full text-left py-2 px-3 rounded-lg transition-all
                            ${selectedFile === item.file ? 'bg-gray-200 dark:bg-white/10' : 'hover:bg-gray-200/50 dark:hover:bg-white/5'}
                          `}
                        >
                          {item.isSub ? (
                            <div className="w-1.5 h-1.5 rounded-full bg-ph-yellow group-hover:bg-ph-blue dark:group-hover:bg-cyan-400 transition-colors flex-shrink-0" />
                          ) : (
                            <FiFileText size={16} className="text-gray-400 group-hover:text-ph-blue dark:group-hover:text-cyan-400 transition-colors flex-shrink-0" />
                          )}
                          <span className={`text-xs lg:text-sm font-medium tracking-wide transition-colors text-left
                            ${item.isSub 
                              ? 'text-gray-500 dark:text-gray-400 group-hover:text-ph-blue dark:group-hover:text-cyan-300' 
                              : 'text-gray-800 dark:text-gray-200 group-hover:text-ph-blue dark:group-hover:text-cyan-400'
                            }`}>
                            {item.text}
                          </span>
                          <div className="flex-1" />
                          <FiExternalLink size={14} className="text-gray-400 dark:text-gray-600 opacity-0 group-hover:opacity-100 group-hover:text-ph-blue dark:group-hover:text-cyan-400 transition-all flex-shrink-0" />
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
                  <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-8 leading-[0.9] text-gray-900 dark:text-white">
                    <span className="block">Vision And</span>
                    <span className="block">Mission</span>
                  </h2>
                  <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-8 p-6 lg:p-8 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-sm dark:shadow-none">
                    <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-ph-yellow/10 border border-ph-yellow/20 flex items-center justify-center flex-shrink-0 animate-pulse">
                      <FiAward size={28} className="text-ph-yellow" />
                    </div>
                    <blockquote className="text-gray-600 dark:text-gray-300 text-sm lg:text-[15px] font-medium leading-relaxed italic border-l-2 border-gray-200 dark:border-white/10 pl-6">
                      "A pearl buried inside a tightly-shut shell is practically worthless. Government information is a pearl, meant to be shared with the public in order to maximize its inherent value."
                    </blockquote>
                  </div>
                </header>

                <section className="grid grid-cols-1 gap-12 mt-12 pl-4 border-l border-gray-200 dark:border-white/10">
                  <div>
                    <h4 className="text-[10px] font-black tracking-[0.5em] text-gray-400 dark:text-yellow-500 uppercase mb-3">The Goal</h4>
                    <h3 className="text-2xl font-black text-ph-blue dark:text-white uppercase tracking-tight mb-4">Vision</h3>
                    <p className="text-lg lg:text-xl text-gray-800 dark:text-gray-200 font-bold leading-snug">
                      Solidifying the position of the Philippines as the Pearl of the Orient – a shining example for democratic virtue in the region.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black tracking-[0.5em] text-gray-400 dark:text-yellow-500 uppercase mb-3">The Task</h4>
                    <h3 className="text-2xl font-black text-ph-blue dark:text-white uppercase tracking-tight mb-4">Mission</h3>
                    <p className="text-sm lg:text-base text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                      To inspire Filipinos in the civil service to be more open to citizen engagement; on the other hand, to invite the Filipino citizenry to exercise their right to participate in governance.
                    </p>
                  </div>
                </section>
              </motion.div>
            )}

            {/* DYNAMIC REPORTS MODULE (II, III, IV, V) */}
            {transparencyData[activeSub] && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <header className="mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter mb-4 leading-[1.1] text-gray-900 dark:text-white">
                    {transparencyData[activeSub].title}
                  </h2>
                  <p className="text-gray-500 font-medium">Click on the documents below to view the respective files.</p>
                </header>

                <div className="bg-[#f1f1f1] dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 lg:p-8 shadow-sm dark:shadow-none transition-colors duration-300">
                  <div className="flex flex-col gap-10">
                    {transparencyData[activeSub].groups.map((group, gIdx) => (
                      <div key={gIdx}>
                        <h3 className="text-sm lg:text-base font-bold text-gray-800 dark:text-gray-200 mb-3 uppercase tracking-tight">
                          {group.groupTitle}
                        </h3>
                        {group.links.length > 0 ? (
                          <ul className="flex flex-col gap-1 ml-2 lg:ml-6 border-l-2 border-gray-200 dark:border-white/10 pl-4">
                            {group.links.map((link, lIdx) => (
                              <li key={lIdx} className="mt-1">
                                <button
                                  onClick={() => {
                                    setSelectedFile(link.file);
                                    setMobileActiveView('viewer');
                                  }}
                                  className={`group flex items-center gap-4 w-full text-left py-2.5 px-3 rounded-lg transition-all 
                                    ${selectedFile === link.file ? 'bg-gray-200 dark:bg-white/10' : 'hover:bg-gray-200/50 dark:hover:bg-white/5'}
                                  `}
                                >
                                  <FiFileText size={16} className="text-gray-400 group-hover:text-ph-blue dark:group-hover:text-cyan-400 transition-colors flex-shrink-0" />
                                  <span className="text-xs lg:text-sm font-medium tracking-wide transition-colors text-left text-gray-700 dark:text-gray-300 group-hover:text-ph-blue dark:group-hover:text-cyan-400">
                                    {link.text}
                                  </span>
                                </button>
                              </li>
                            ))}
                          </ul>
                        ) : (
                           <p className="text-xs text-gray-500 italic ml-6 border-l-2 border-gray-200 dark:border-white/10 pl-4 py-2">
                             No documents available.
                           </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* EMPTY STATE */}
            {!['mandate', 'mission'].includes(activeSub) && !transparencyData[activeSub] && (
              <div className="flex flex-col items-center justify-center h-[50vh] text-gray-400">
                <FiFileText size={64} className="mb-6 opacity-20" />
                <p className="text-xs font-black uppercase tracking-[0.5em] text-center">Module Under Construction</p>
              </div>
            )}
          </div>
        </main>

        {/* ── 3. PDF VIEWER SIDE PANEL (Viewer) ── */}
        <AnimatePresence>
          {(selectedFile || mobileActiveView === 'viewer') && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              style={{ '--viewer-width': `${viewerWidth}px` }}
              className={`flex-shrink-0 flex-col bg-white dark:bg-[#060b16] border-l border-gray-200 dark:border-white/10 z-50 relative shadow-2xl w-full lg:w-[var(--viewer-width)] ${mobileActiveView === 'viewer' ? 'flex' : 'hidden lg:flex'}`}
            >
              <div 
                onMouseDown={handleMouseDownViewer}
                className="hidden lg:grid group absolute top-0 bottom-0 -left-1 w-2 cursor-col-resize z-50 place-items-center"
              >
                <div className="absolute top-0 bottom-0 left-1 w-[1px] bg-gray-200 dark:bg-white/10 group-hover:bg-ph-blue dark:group-hover:bg-cyan-500/50 group-hover:w-[2px] transition-all" />
                <div className="h-10 w-2 rounded-full bg-gray-300 dark:bg-gray-700 border border-gray-400 dark:border-gray-600 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </div>

              <div className="h-16 flex items-center justify-between px-4 lg:px-6 border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 backdrop-blur-md">
                <div className="flex items-center gap-3 overflow-hidden pr-2">
                  <FiFileText className="text-ph-blue dark:text-cyan-400 flex-shrink-0" />
                  <span className="text-[10px] lg:text-xs font-black tracking-wider text-gray-800 dark:text-gray-200 truncate">
                    {selectedFile ? selectedFile.replace('/', '') : 'Document'}
                  </span>
                </div>
                <div className="flex items-center gap-2 lg:gap-3 flex-shrink-0">
                  <a 
                    href={selectedFile} 
                    download 
                    className="flex items-center gap-1.5 lg:gap-2 px-2 lg:px-3 py-1.5 rounded-md bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 text-[9px] lg:text-[10px] font-black text-gray-700 dark:text-white transition-colors"
                  >
                    <FiDownload size={12} />
                    DOWNLOAD
                  </a>
                  <button 
                    onClick={closeViewer}
                    className="p-1.5 rounded-full hover:bg-red-100 dark:hover:bg-red-500/20 text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  >
                    <FiX size={18} />
                  </button>
                </div>
              </div>

              <div className="flex-1 bg-gray-100 dark:bg-[#02060f] relative p-2 lg:p-4">
                <div className="w-full h-full rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-inner bg-white dark:bg-transparent">
                  <iframe 
                    src={selectedFile ? getViewerUrl(selectedFile) : ''} 
                    className="w-full h-full border-none"
                    title="PDF Viewer"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default Transparency;
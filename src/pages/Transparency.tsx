import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiSearch, FiChevronDown, FiFileText, FiDownload, FiX, 
  FiMoreHorizontal, FiFilePlus, FiChevronLeft
} from 'react-icons/fi';
import { BsStars } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import useDarkMode from '../hooks/useDarkMode'; 

// --- REQUESTS Data (Quotations and Invitations) ---
const REQUESTS_ITEMS = [
  // Quotations (Image 1)
  {
    id: 'RFQ-2026-001',
    title: 'Supply and Delivery of New Portable Sound System for PSC Events and Zumba Activities',
    abc: 964400.00,
    pubDate: '04-28-2026',
    openDate: '05-01-2026',
    year: 2026,
    filename: 'RFQ_Sound_System.pdf' 
  },
  {
    id: 'RFQ-2026-002',
    title: "Supply and Delivery of Various Office Supplies for Athlete's Outreach Anti-Doping Education Palarong Pambansa 2026",
    abc: 19710.00,
    pubDate: '04-28-2026',
    openDate: '05-01-2026',
    year: 2026,
    filename: 'RFQ_Office_Supplies.pdf'
  },
  {
    id: 'RFQ-2026-003',
    title: "Supply and Delivery of Action Camera, Extra Battery and Accessories for MSAS Physiology Testing Unit at RMSC",
    abc: 720300.00,
    pubDate: '04-25-2026',
    openDate: '04-28-2026',
    year: 2026,
    filename: 'RFQ_Action_Camera.pdf'
  },
  {
    id: 'RFQ-2026-004',
    title: "Supply and Delivery of Customized Collared Shirts for DepEd-Deputized Palarong Pambansa Monitoring and Evaluation Steering Committee",
    abc: 180000.00,
    pubDate: '04-24-2026',
    openDate: '04-28-2026',
    year: 2026,
    filename: 'RFQ_Collared_Shirts.pdf'
  },
  // Bidding (Image 2)
  {
    id: 'PB-2026-001',
    title: "Supply and Delivery of Arnis Supplies for Grassroots Program of Philippine Eskrima Kali Arnis Federation, Inc. (PEKAF)",
    abc: 9998000.00,
    pubDate: '04-28-2026',
    openDate: '05-19-2026',
    year: 2026,
    filename: 'PBD_Arnis_Supplies.pdf'
  },
  {
    id: 'PB-2026-002',
    title: "Supply, Delivery, and Installation of Microsoft Office 365 E3 for Philippine Sports Commission",
    abc: 5354640.00,
    pubDate: '04-21-2026',
    openDate: '05-11-2026',
    year: 2026,
    filename: 'PBD_O365.pdf'
  },
  {
    id: 'PB-2026-003',
    title: "Delivery of Training Uniforms for National Athletes and Coaches for FY 2026",
    abc: 67750000.00,
    pubDate: '04-15-2026',
    openDate: '05-05-2026',
    year: 2026,
    filename: 'PBD_Training_Uniforms.pdf'
  },
  {
    id: 'PB-2026-004',
    title: "Preventive Maintenance for Air-Conditioning Units at RMSC and Philsports Complex and Controlled Facilities",
    abc: 11393861.60,
    pubDate: '03-26-2026',
    openDate: '04-20-2026',
    year: 2026,
    filename: 'PBD_AC_Maintenance.pdf'
  }
];

// --- DOCUMENTS Data (Supplemental Bulletin) ---
const DOCUMENTS_ITEMS = {
  'Supplemental Bulletin': [
    { date: 'APRIL 14, 2026', title: 'SUPPLEMENTAL BID BULLETIN NO. 1 (PSCBAC-003-2026)', desc: 'Preventive Maintenance for Air-Conditioning Units at RMSC and Philsports Complex and Controlled Facilities', filename: 'SBB_003_2026.pdf', year: 2026 },
    { date: 'MARCH 5, 2026', title: 'SUPPLEMENTAL BID BULLETIN NO. 1 (PSCBAC-002-2026)', desc: 'Supply and Delivery of Arnis Supplies of Grassroots Program of Philippine Eskrima Kali Arnis Federation, Inc. (PEKAF)', filename: 'SBB_002_2026.pdf', year: 2026 },
    { date: 'FEBRUARY 25, 2026', title: 'SUPPLEMENTAL BID BULLETIN NO. 1 (PSCBAC-001-2026)', desc: 'Preventive Maintenance for Air-Conditioning Units at RMSC and Philsports Complex and Controlled Facilities', filename: 'SBB_001_2026.pdf', year: 2026 }
  ],
  'PBD, Bid Data Sheet and Terms of Reference': [
    { title: 'Philippine Bidding Documents - Arnis Supplies', filename: 'PBD_Arnis.pdf', year: 2026 },
    { title: 'Philippine Bidding Documents - Training Uniforms', filename: 'PBD_Uniforms.pdf', year: 2026 },
    { title: 'Philippine Bidding Documents - Air-Conditioning Maintenance', filename: 'PBD_AC.pdf', year: 2026 }
  ]
};

// --- MINUTES Data ---
const MINUTES_ITEMS = {
  'Minutes of Pre-Bid Conference': [
    { title: 'Supply and Delivery of Chemical Supplies for Swimming Pool, Diving Pool, and Warm Up Located at RMSC and Philsports Complex; and Supply and Delivery of Sports Equipment and Supplies for 2023 Property Stocking and Donation', filename: 'PreBid_Chemical_Sports.pdf', year: 2026 },
    { title: 'Minutes of the Pre-Bid Conference of the Procurement of Janitorial Services for Philippine Sports Commission Venues - Rebid', filename: 'PreBid_Janitorial.pdf', year: 2026 },
    { title: 'Supply and Delivery of Luggage and Covers for the 32nd Southeast Asian Games and 12th ASEAN Para Games', filename: 'PreBid_Luggage.pdf', year: 2026 }
  ],
  'Opening of Bid Minutes': [
    { title: 'Procurement of Security Services for the Philippine Sports Commission', filename: 'Opening_Security.pdf', year: 2026 },
    { title: 'Upgrading of Philsports Track Oval Including Presidential Grandstand', filename: 'Opening_TrackOval.pdf', year: 2026 }
  ]
};

// --- NOTICES Data ---
const NOTICES_ITEMS = {
  'Notice of Award': [
    { date: 'September 17, 2025', title: 'Supply and Delivery of Consumables and Parts for Copier Machine Ineo+281/+221 located at DED AFMS', filename: 'NOA_Copier.pdf', year: 2025 },
    { date: 'September 12, 2025', title: 'Supply and Delivery of Consumables and Spare Parts of Fargo ID Printer Machine for Printing and Issuance of New PSC Identification Cards', filename: 'NOA_IDPrinter.pdf', year: 2025 },
    { date: 'September 12, 2025', title: 'Supply, Delivery and Installation of Molded Case Circuit Breaker, Fabrication of Wire Gutter Cover and Electrical Testing on RM Badminton Hall', filename: 'NOA_Electrical.pdf', year: 2025 },
    { date: 'June 26, 2025', title: 'Supply and Delivery of Early Warning Device and Car Extinguisher for PSC Vehicles', filename: 'NOA_Extinguisher.pdf', year: 2025 }
  ],
  'Notice to Proceed': [
    { date: 'July 14, 2025', title: 'Supply and Delivery of Customized Round Neck Shirt for Milo Marathon x PSC Walk Run and Roll', filename: 'NTP_Milo.pdf', year: 2025 },
    { date: 'June 11, 2025', title: 'Supply and Delivery of Refrigerator to serve as Storage of Sample collected Specimen at PHINADO Office (RMSC)', filename: 'NTP_Fridge.pdf', year: 2025 },
    { date: 'June 4, 2025', title: 'Supply and Delivery of Spare Parts for Repair of Sharp Printer MX-7500N of Public Communication Office', filename: 'NTP_PrinterParts.pdf', year: 2025 }
  ]
};

const SidebarItem = ({ label, icon: Icon = FiFileText, isExpanded, onToggle, activeSub, onSubClick, subs }) => (
  <div className="mb-1">
    <button
      onClick={onToggle}
      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all text-left group ${
        isExpanded 
          ? "bg-ph-blue/10 dark:bg-white/10 ring-1 ring-ph-blue/20 dark:ring-white/20 text-ph-blue dark:text-white" 
          : "text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5"
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon size={18} className={isExpanded ? "text-ph-blue dark:text-cyan-400" : "text-slate-400"} />
        <span className="text-[12px] font-black uppercase tracking-wider">{label}</span>
      </div>
      <FiChevronDown className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} size={14} />
    </button>
    <AnimatePresence>
      {isExpanded && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }} 
          animate={{ height: "auto", opacity: 1 }} 
          exit={{ height: 0, opacity: 0 }}
          className="overflow-hidden ml-4 mt-2 border-l-2 border-slate-200 dark:border-white/10"
        >
          {subs.map((sub) => (
            <button
              key={sub}
              onClick={() => onSubClick(sub)}
              className={`w-full flex items-center gap-3 py-2.5 px-5 text-[10px] font-bold uppercase tracking-widest text-left transition-colors ${
                activeSub === sub ? "text-ph-blue dark:text-cyan-400" : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              <BsStars size={10} className={activeSub === sub ? "text-ph-yellow" : "opacity-0"} />
              <span className="leading-tight">{sub}</span>
            </button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default function Procurement() {
  const [theme] = useDarkMode(); 
  const navigate = useNavigate();

  // Mobile View State: 'dashboard' | 'content' | 'viewer'
  const [mobileActiveView, setMobileActiveView] = useState('dashboard');

  const [sidebarWidth, setSidebarWidth] = useState(380);
  const [viewerWidth, setViewerWidth] = useState(500);
  const [selectedYear, setSelectedYear] = useState(2026);
  const [isResizingSidebar, setIsResizingSidebar] = useState(false);
  const [isResizingViewer, setIsResizingViewer] = useState(false);
  
  const [openSection, setOpenSection] = useState('REQ');
  const [activeSub, setActiveSub] = useState('Quotations and Invitations');
  const [selectedDoc, setSelectedDoc] = useState(null);

  // --- MOBILE BACK HANDLER ---
  const handleBack = () => {
    if (mobileActiveView === 'viewer') {
      setMobileActiveView('content');
      setSelectedDoc(null);
    } else if (mobileActiveView === 'content') {
      setMobileActiveView('dashboard');
    } else {
      navigate(-1);
    }
  };

  const closeViewer = () => {
    setSelectedDoc(null);
    setMobileActiveView('content');
  };

  const handleMouseMove = useCallback((e) => {
    if (isResizingSidebar) setSidebarWidth(Math.max(300, Math.min(e.clientX, 600)));
    if (isResizingViewer) setViewerWidth(Math.max(350, Math.min(window.innerWidth - e.clientX, 1000)));
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
  }, [isResizingSidebar, isResizingViewer, handleMouseMove]);

  // Use native iframe for both desktop and mobile
  const getViewerUrl = (filePath) => {
    return `/${filePath}#toolbar=0&navpanes=0`;
  };

  return (
    <div className={`flex flex-col h-[calc(100vh-60px)] mt-[60px] md:h-[calc(100vh-112px)] md:mt-[112px] overflow-hidden font-sans transition-colors duration-300 ${theme === 'dark' ? "bg-[#030A17] text-slate-300" : "bg-white text-slate-800"}`}>
      
      {/* ── MOBILE BACK NAVIGATION BAR ── */}
      <div className="lg:hidden flex items-center px-4 py-3 bg-white dark:bg-[#030A17] border-b border-slate-200 dark:border-white/10 z-50 flex-shrink-0 w-full transition-colors duration-300">
        <button onClick={handleBack} className="p-1">
          <FiChevronLeft size={20} className="text-slate-900 dark:text-white" />
        </button>
        <span className="flex-1 text-center font-bold text-sm uppercase tracking-wider pr-6 text-slate-900 dark:text-white">
          Bidding and Procurement
        </span>
      </div>

      <div className="flex flex-1 overflow-hidden relative w-full">
        {/* ── 1. SIDEBAR (Dashboard) ── */}
        <aside 
          style={{ '--sidebar-width': `${sidebarWidth}px` }} 
          className={`flex-shrink-0 flex-col border-r border-slate-200 dark:border-white/10 bg-white dark:bg-[#060b16] relative z-40 transition-colors w-full lg:w-[var(--sidebar-width)] ${mobileActiveView === 'dashboard' ? 'flex' : 'hidden lg:flex'}`}
        >
          <div className="p-8 lg:p-10 flex-1 overflow-y-auto custom-scrollbar">
            <header className="mb-12">
              <h1 className="text-4xl font-semibold tracking-tighter leading-[0.85] mb-4 text-slate-900 dark:text-white uppercase">
                Bidding and <br /> <span>Procurement</span>
              </h1>
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] leading-relaxed">Navigation</p>
            </header>

            <nav className="space-y-3">
              <SidebarItem 
                label="Requests" 
                id="REQ" 
                icon={FiFilePlus} 
                isExpanded={openSection === 'REQ'} 
                onToggle={() => setOpenSection('REQ')} 
                activeSub={activeSub} 
                onSubClick={(sub) => { setActiveSub(sub); setMobileActiveView('content'); }} 
                subs={['Quotations and Invitations']} 
              />
              <SidebarItem 
                label="Documents" 
                id="DOCS" 
                isExpanded={openSection === 'DOCS'} 
                onToggle={() => setOpenSection('DOCS')} 
                activeSub={activeSub} 
                onSubClick={(sub) => { setActiveSub(sub); setMobileActiveView('content'); }} 
                subs={['PBD, Bid Data Sheet and Terms of Reference', 'Supplemental Bulletin']} 
              />
              <SidebarItem 
                label="Minutes" 
                id="MINS" 
                isExpanded={openSection === 'MINS'} 
                onToggle={() => setOpenSection('MINS')} 
                activeSub={activeSub} 
                onSubClick={(sub) => { setActiveSub(sub); setMobileActiveView('content'); }} 
                subs={['Minutes of Pre-Bid Conference', 'Opening of Bid Minutes']} 
              />
              <SidebarItem 
                label="Notices" 
                id="NOTS" 
                isExpanded={openSection === 'NOTS'} 
                onToggle={() => setOpenSection('NOTS')} 
                activeSub={activeSub} 
                onSubClick={(sub) => { setActiveSub(sub); setMobileActiveView('content'); }} 
                subs={['Notice of Award', 'Notice to Proceed']} 
              />
            </nav>
          </div>

          {/* Resizer Handle */}
          <div onMouseDown={() => setIsResizingSidebar(true)} className="hidden lg:grid group absolute top-0 bottom-0 -right-1 w-2 cursor-col-resize z-50 place-items-center">
            <div className="absolute top-0 bottom-0 right-1 w-[1px] bg-slate-200 dark:bg-white/10 group-hover:bg-ph-blue dark:group-hover:bg-cyan-500/50 group-hover:w-[2px] transition-all" />
            <div className="h-10 w-2 rounded-full bg-slate-300 dark:bg-slate-700 border border-slate-400 dark:border-gray-600 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </div>
        </aside>

        {/* ── 2. MAIN CONTENT (List) ── */}
        <main className={`overflow-hidden flex-col min-w-0 bg-slate-50/30 dark:bg-[#0a0f1c]/50 relative transition-colors w-full ${mobileActiveView === 'content' ? 'flex' : 'hidden lg:flex lg:flex-1'}`}>
          {/* Year Filter Bar */}
          <div className="h-20 flex-shrink-0 flex items-center px-6 lg:px-10 border-b border-slate-200 dark:border-white/10 bg-white/80 dark:bg-[#0a0f1c]/80 backdrop-blur-md z-10 overflow-x-auto custom-scrollbar">
            <div className="flex items-center gap-4">
              {[2026, 2025, 2024, 2023, 2022].map(y => (
                <button key={y} onClick={() => setSelectedYear(y)} className={`px-6 py-2 rounded-lg text-[10px] font-black transition-all ${selectedYear === y ? "bg-ph-blue text-white shadow-lg" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"}`}>{y}</button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-20">
            <div className="max-w-4xl mx-auto space-y-8 lg:space-y-12 pb-24">
              <header>
                <h2 className="text-3xl lg:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-tight mb-2">{activeSub}</h2>
                <h3 className="text-2xl md:text-[55px] font-black uppercase tracking-tight bg-gradient-to-r from-yellow-500 to-amber-600 dark:from-blue-500 dark:to-cyan-400 bg-clip-text text-transparent leading-none">{selectedYear} Solicitations</h3>
              </header>

              <div className="grid grid-cols-1 gap-6 lg:gap-8">
                {/* Render Logic based on activeSub */}
                {activeSub === 'Quotations and Invitations' && (
                  REQUESTS_ITEMS.filter(i => i.year === selectedYear).map(item => (
                    <motion.div layout key={item.id} className="bg-white dark:bg-[#111827]/50 border border-slate-200 dark:border-white/10 rounded-[2rem] p-6 lg:p-10 hover:shadow-2xl transition-all group relative overflow-hidden">
                      <div className="flex flex-col lg:flex-row justify-between gap-6 lg:gap-8 relative z-10">
                        <div className="flex-1 space-y-4 lg:space-y-5">
                          <span className="text-[10px] lg:text-[11px] font-black px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 uppercase tracking-widest">{item.id || 'N/A'}</span>
                          <h4 className="text-xl lg:text-3xl font-black text-slate-800 dark:text-white leading-tight group-hover:text-ph-blue dark:group-hover:text-cyan-400 transition-colors">{item.title}</h4>
                          <div className="grid grid-cols-3 gap-4 lg:gap-8 pt-6 border-t border-slate-100 dark:border-white/5">
                            <div><p className="text-[8px] lg:text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Approved Budget</p><p className="text-sm lg:text-lg font-bold text-slate-700 dark:text-slate-300">₱{item.abc.toLocaleString()}</p></div>
                            <div><p className="text-[8px] lg:text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Published</p><p className="text-xs lg:text-sm font-medium">{item.pubDate}</p></div>
                            <div><p className="text-[8px] lg:text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Closing</p><p className="text-xs lg:text-sm font-medium">{item.openDate}</p></div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-3 min-w-[200px] justify-center pt-4 lg:pt-0">
                          <a href={`/${item.filename}`} download className="px-8 py-3.5 lg:py-3 rounded-2xl bg-ph-blue dark:bg-cyan-500 text-white font-black text-[11px] text-center tracking-widest hover:brightness-110 shadow-lg">DOWNLOAD PDF</a>
                          <button onClick={() => { setSelectedDoc({filename: item.filename}); setMobileActiveView('viewer'); }} className="px-8 py-3.5 lg:py-3 rounded-2xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white font-black text-[11px] tracking-widest hover:bg-slate-100 dark:hover:bg-white/5 transition-all">VIEW DOCUMENT</button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}

                {/* Shared Render Logic for List Items (Documents, Minutes, Notices) */}
                {['Supplemental Bulletin', 'Minutes of Pre-Bid Conference', 'Opening of Bid Minutes', 'Notice of Award', 'Notice to Proceed'].includes(activeSub) && (
                  (() => {
                    let sourceData = [];
                    if (activeSub === 'Supplemental Bulletin') sourceData = DOCUMENTS_ITEMS[activeSub];
                    else if (activeSub === 'Minutes of Pre-Bid Conference' || activeSub === 'Opening of Bid Minutes') sourceData = MINUTES_ITEMS[activeSub];
                    else if (activeSub === 'Notice of Award' || activeSub === 'Notice to Proceed') sourceData = NOTICES_ITEMS[activeSub];

                    const filteredData = sourceData?.filter(i => i.year === selectedYear) || [];

                    return filteredData.length > 0 ? filteredData.map((item, idx) => (
                      <motion.div layout key={idx} className="bg-white dark:bg-[#111827]/50 border border-slate-200 dark:border-white/10 rounded-2xl p-6 lg:p-8 hover:shadow-lg transition-all group relative overflow-hidden">
                         <div className="flex flex-col lg:flex-row justify-between gap-6 lg:gap-8 relative z-10">
                            <div className="flex-1 space-y-3">
                              {item.date && <span className="text-[10px] font-black px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 uppercase tracking-widest">{item.date}</span>}
                              <h4 className="text-lg lg:text-xl font-black text-slate-800 dark:text-white leading-tight group-hover:text-ph-blue dark:group-hover:text-cyan-400 transition-colors">{item.title}</h4>
                              {item.desc && <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>}
                            </div>
                            <div className="flex flex-col gap-3 justify-center pt-4 lg:pt-0">
                               <button onClick={() => { setSelectedDoc({filename: item.filename}); setMobileActiveView('viewer'); }} className="px-6 py-2 rounded-xl bg-ph-blue/10 dark:bg-cyan-500/10 text-ph-blue dark:text-cyan-400 font-black text-[10px] tracking-widest hover:bg-ph-blue hover:text-white dark:hover:bg-cyan-500 transition-all flex items-center justify-center gap-2">
                                 <FiFileText size={14} /> VIEW PDF
                               </button>
                            </div>
                         </div>
                      </motion.div>
                    )) : (
                       <div className="text-center py-20 text-slate-500 dark:text-slate-400 font-medium">No records found for {selectedYear}</div>
                    );
                  })()
                )}

                {/* Empty State for missing sections */}
                {!['Quotations and Invitations', 'Supplemental Bulletin', 'Minutes of Pre-Bid Conference', 'Opening of Bid Minutes', 'Notice of Award', 'Notice to Proceed'].includes(activeSub) && (
                   <div className="text-center py-20 text-slate-500 dark:text-slate-400 font-medium">Content coming soon.</div>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* ── 3. PDF VIEWER SIDE PANEL ── */}
        <AnimatePresence>
          {(selectedDoc || mobileActiveView === 'viewer') && (
            <motion.div 
              initial={{ x: '100%' }} 
              animate={{ x: 0 }} 
              exit={{ x: '100%' }} 
              transition={{ type: 'spring', damping: 30, stiffness: 200 }} 
              style={{ '--viewer-width': `${viewerWidth}px` }} 
              className={`flex-shrink-0 flex-col bg-white dark:bg-[#0a0f1c] border-l border-slate-200 dark:border-white/10 z-50 relative shadow-[-20px_0_50px_rgba(0,0,0,0.2)] w-full lg:w-[var(--viewer-width)] ${mobileActiveView === 'viewer' ? 'flex' : 'hidden lg:flex'}`}
            >
               <div onMouseDown={() => setIsResizingViewer(true)} className="hidden lg:grid group absolute top-0 bottom-0 -left-1 w-2 cursor-col-resize z-50 place-items-center">
                  <div className="absolute top-0 bottom-0 left-1 w-[1px] bg-slate-200 dark:bg-white/10 group-hover:bg-ph-blue dark:group-hover:bg-cyan-500/50 group-hover:w-[2px] transition-all" />
                  <div className="h-10 w-2 rounded-full bg-slate-300 dark:bg-gray-700 border border-gray-400 dark:border-gray-600 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </div>
              
              <div className="h-20 flex-shrink-0 flex items-center justify-between px-4 lg:px-8 border-b border-slate-200 dark:border-white/10 bg-white dark:bg-[#0a0f1c]">
                 <div className="flex items-center gap-2 lg:gap-4 overflow-hidden">
                    <FiFileText size={20} className="text-ph-blue dark:text-cyan-400 flex-shrink-0" />
                    <div className="min-w-0"><h4 className="text-[10px] lg:text-xs font-black text-slate-800 dark:text-white truncate uppercase tracking-wider">{selectedDoc ? selectedDoc.filename : 'Document'}</h4></div>
                 </div>
                 <div className="flex items-center gap-2 lg:gap-3 flex-shrink-0">
                    <a href={selectedDoc ? `/${selectedDoc.filename}` : '#'} download className="flex items-center gap-1.5 lg:gap-2 px-3 lg:px-5 py-2 lg:py-2.5 rounded-xl bg-slate-800 dark:bg-[#1a1f2e] text-white font-black text-[9px] lg:text-[10px] tracking-widest hover:bg-slate-700 transition-all">
                      <FiDownload size={14} /> DOWNLOAD
                    </a>
                    <button onClick={closeViewer} className="p-1.5 lg:p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 transition-all"><FiX size={20} /></button>
                 </div>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar p-4 lg:p-8 bg-slate-100 dark:bg-slate-950/20">
                 <div className="w-full aspect-[1/1.41] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-2xl rounded-lg overflow-hidden">
                    <iframe src={selectedDoc ? getViewerUrl(selectedDoc.filename) : ''} className="w-full h-full border-none" title="PDF Viewer" />
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiChevronLeft } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const sections = [
  // ... (sections data remains exactly the same as provided)
  {
    title: 'Section 1. Title of the Act.',
    content: <p>This Act shall be known and cited as the <strong>"Philippine Sports Commission Act."</strong></p>,
  },
  {
    title: 'Section 2. Declaration of Policy.',
    content: <p>It is hereby declared a policy of the State to promote physical education, encourage and sustain the development of sports programs and activities to foster the physical, mental, and social well-being of the Filipino people. The State shall give priority to the development of sports as a tool for national identity, discipline, and excellence.</p>,
  },
  {
    title: 'Section 3. Creation of the Philippine Sports Commission.',
    content: <p>There is hereby created a body corporate to be known as the Philippine Sports Commission, hereinafter referred to as the Commission, which shall be attached to the Office of the President of the Philippines.</p>,
  },
  {
    title: 'Section 4. Status of the Commission.',
    content: <p>The Commission shall be a government-owned and controlled corporation with original charter and shall possess the general powers of a corporation as provided under the Corporation Code as well as those specifically granted in this Act.</p>,
  },
  {
    title: 'Section 5. Nature of the Commission.',
    content: <p>The Commission shall be a non-profit body corporate that shall exercise governmental functions with respect to the promotion, development, and support of sports programs and activities in the Philippines.</p>,
  },
  {
    title: 'Section 6. Objectives of the Commission.',
    content: (
      <>
        <p className="font-semibold mb-3">The Objectives of the Commission are:</p>
        <div className="space-y-3 text-sm leading-relaxed">
          <p><span className="text-ph-blue dark:text-ph-yellow font-bold">(a)</span> To provide the leadership, formulate the policies and set the priorities and direction of all national amateur sports promotion and development, particularly giving emphasis on grass-roots participation;</p>
          <p><span className="text-ph-blue dark:text-ph-yellow font-bold">(b)</span> To encourage wide participation of all sectors, government and private, in amateur sports promotion and development;</p>
          <p><span className="text-ph-blue dark:text-ph-yellow font-bold">(c)</span> To coordinate the development and implementation of programs for the discovery and development of athletic talents;</p>
          <p><span className="text-ph-blue dark:text-ph-yellow font-bold">(d)</span> To promote the establishment of sports facilities by the national government and local government units;</p>
          <p><span className="text-ph-blue dark:text-ph-yellow font-bold">(e)</span> To develop and maintain a high standard of amateur sports and to prepare the national teams for international competitions.</p>
        </div>
      </>
    ),
  },
  {
    title: 'Section 7. Powers and Functions of the Commission.',
    content: (
      <div className="space-y-3 text-sm leading-relaxed">
        <p>The Commission shall have the following powers and functions:</p>
        <p><span className="text-ph-blue dark:text-ph-yellow font-bold">(a)</span> Formulate and implement a national sports development plan;</p>
        <p><span className="text-ph-blue dark:text-ph-yellow font-bold">(b)</span> Register, accredit, or recognize all national sports associations (NSAs);</p>
        <p><span className="text-ph-blue dark:text-ph-yellow font-bold">(c)</span> Receive and administer funds from various sources for sports development;</p>
        <p><span className="text-ph-blue dark:text-ph-yellow font-bold">(d)</span> Enter into contracts and agreements necessary for the attainment of its objectives;</p>
        <p><span className="text-ph-blue dark:text-ph-yellow font-bold">(e)</span> Exercise supervision and control over all national sports competitions.</p>
      </div>
    ),
  },
  {
    title: 'Section 8. Composition of the Commission.',
    content: (
      <div className="text-sm leading-relaxed space-y-2">
        <p>The Commission shall be composed of a Chairman and four (4) Commissioners to be appointed by the President of the Philippines.</p>
        <p>The Chairman and Commissioners shall serve for a term of six (6) years without reappointment. In case of vacancy, the appointee shall only serve the unexpired portion of the term.</p>
      </div>
    ),
  },
  {
    title: 'Section 9. Qualifications.',
    content: <p className="text-sm leading-relaxed">The Chairman and each Commissioner must be a natural-born citizen and resident of the Philippines, of good moral character, with proven integrity, and with known expertise in sports, physical education, law, finance, or management.</p>,
  },
  {
    title: 'Section 10. The Executive Director.',
    content: <p className="text-sm leading-relaxed">The Commission shall have an Executive Director who shall be appointed by the Commission upon the recommendation of the Chairman. The Executive Director shall be responsible for the day-to-day management of the Commission's affairs and shall serve as the chief operating officer.</p>,
  },
];

const AccordionItem = ({ section, index, isOpen, onToggle }) => {
  const wrapperClass = 'rounded-xl overflow-hidden border transition-all duration-300 ' +
    (isOpen
      ? 'border-ph-blue/30 dark:border-ph-yellow/30 shadow-[0_0_20px_rgba(30,80,180,0.08)] dark:shadow-[0_0_20px_rgba(212,175,55,0.08)]'
      : 'border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20');

  const wrapperStyle = {
    background: isOpen ? 'rgba(0,0,0,0.04)' : 'rgba(0,0,0,0.02)',
  };

  const titleClass = 'text-sm font-semibold tracking-wide transition-colors duration-200 ' +
    (isOpen
      ? 'text-gray-900 dark:text-white'
      : 'text-gray-500 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white');

  return (
    <div className={wrapperClass} style={wrapperStyle}>
      <button
        onClick={() => onToggle(index)}
        className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors duration-200 group"
      >
        <span className={titleClass}>{section.title}</span>
        <div className="flex-shrink-0 ml-4">
          {isOpen
            ? <FiChevronUp size={14} className="text-ph-blue dark:text-ph-yellow" />
            : <FiChevronDown size={14} className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200" />
          }
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-1 border-t border-gray-200 dark:border-white/10 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              {section.content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const RA6847 = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();

  const handleToggle = (index) => {
    setOpenIndex(prev => prev === index ? null : index);
  };

  return (
    <div className="min-h-screen transition-colors duration-300 pt-16 md:pt-32 pb-20 px-4 bg-gray-50 dark:bg-[#080e1c] text-gray-900 dark:text-white">
      
      {/* ── MOBILE BACK NAVIGATION BAR (Adaptive Fix) ── */}
      <div className="
        lg:hidden flex items-center px-4 py-3 
        bg-white dark:bg-[#030A17] 
        text-gray-900 dark:text-white 
        border-b border-gray-200 dark:border-gray-800 
        sticky top-[52px] z-40 
        -mx-4 mt-[-16px]
      ">
        <button onClick={() => navigate(-1)} className="p-1">
          <FiChevronLeft size={20} />
        </button>
        <span className="flex-1 text-center font-bold text-sm uppercase tracking-wider pr-6">RA 6847</span>
      </div>

      <div
        className="fixed inset-0 pointer-events-none opacity-0 dark:opacity-100 transition-opacity duration-300"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 10%, rgba(30,60,140,0.2) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-3xl mx-auto mt-8">
        {/* ── HEADER ── */}
        <div className="text-center mb-12 px-4">
          <div className="w-full flex justify-center mb-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-gray-900 dark:text-white text-center">
              RA 6847
            </h1>
          </div>

          <div className="w-full flex justify-center mb-6 px-4">
            <p className="font-bold uppercase tracking-widest leading-relaxed max-w-2xl text-xs md:text-sm text-gray-600 dark:text-gray-300 text-center">
              An Act Creating and Establishing the Philippine Sports Commission,
              Defining its Powers, Functions and Responsibilities, Appropriating
              Funds Therefor, and for Other Purposes
            </p>
          </div>

          <div className="w-full flex justify-center mb-6">
            <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-ph-blue dark:via-ph-yellow to-transparent" />
          </div>

          <div className="w-full flex justify-center">
            <p className="italic text-xs text-gray-500 dark:text-gray-400 text-center max-w-xs md:max-w-none">
              Be it enacted by the Senate and House of Representatives of the Philippines in Congress assembled:
            </p>
          </div>
        </div>

        {/* ── ACCORDION ── */}
        <div className="space-y-3">
          {sections.map((section, index) => (
            <AccordionItem
              key={index}
              section={section}
              index={index}
              isOpen={openIndex === index}
              onToggle={handleToggle}
            />
          ))}
        </div>

        <p className="text-center text-xs mt-10 italic text-gray-400 dark:text-gray-500">
          Republic Act No. 6847 — Approved July 24, 1990
        </p>
      </div>
    </div>
  );
};

export default RA6847;
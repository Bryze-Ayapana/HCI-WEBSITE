import React, { useState } from 'react';
import { FiFacebook, FiInstagram, FiYoutube, FiChevronLeft, FiMapPin } from 'react-icons/fi';
import { BsTwitterX } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const agencyDirectories = [
    {
      title: "Commission Proper",
      accent: "border-ph-blue",
      titleColor: "text-ph-blue dark:text-amber-500",
      data: [
        { name: "JOHN PATRICK C. GREGORIO", role: "Chairman", office: "Office of the Chairman", local: "168/888/148/158", email: "officeofthechairman@psc.gov.ph" },
        { name: "OLIVIA G. COO", role: "Commissioner", office: 'Office of Commissioner Olivia "Bong" G. Coo', local: "157", email: "ofc.commbc@psc.gov.ph" },
        { name: "EDWARD L. HAYCO", role: "Commissioner", office: "Office of Commissioner Edward L. Hayco", local: "224", email: "hayco.edward@psc.gov.ph" },
        { name: "WALTER FRANCIS K. TORRES", role: "Commissioner", office: "Office of Commissioner Walter Francis K. Torres", local: "777/166", email: "ofc.commwt@psc.gov.ph" },
        { name: "MATTHEW P. GASTON", role: "Commissioner", office: 'Office of Commissioner Matthew "Fritz" P. Gaston', local: "164", email: "ofc.commfritz@psc.gov.ph" },
        { name: "ATTY. GUILLERMO B. IROY, JR.", role: "OIC, Executive Director", office: "Office of the Executive Director", local: "173", email: "ofc.execdir@psc.gov.ph" },
        { name: "ATTY. NEIL EMERSON B. SAMSON", role: "Officer-in-Charge", office: "Legal Affairs Office", local: "160", email: "legalaffairs@psc.gov.ph" },
        { name: "ANNA CHRISTINE S. ABELLANA", role: "Acting Head", office: "Office of the Board Secretary", local: "169", email: "boardsecretary@psc.gov.ph" },
        { name: "JAN ERROL B. FACUNDO, MMPA", role: "Head", office: "Integrated Communication and Events Office", local: "340", email: "ice@psc.gov.ph" },
      ]
    },
    {
      title: "Bureau on Coordinating Secretariat and Support Services",
      accent: "border-ph-yellow",
      titleColor: "text-yellow-600 dark:text-amber-500",
      data: [
        { name: "ANNA CHRISTINE S. ABELLANA", role: "Officer-In-Charge", office: "Office of the Deputy Executive Director - Bureau on Coordinating Secretariat and Support Services", local: "194", email: "bcsss@psc.gov.ph" },
        { name: "ANNA M. RUIZ", role: "Officer-In-Charge", office: "Assistance Coordination Division", local: "138/156", email: "supportservices@psc.gov.ph" },
        { name: "DR. LAURO O. DOMINGO, JR.", role: "Chief", office: "Program, Research and Development Division", local: "188/186", email: "prdd@psc.gov.ph" },
        { name: "JULIA G. LLANTO", role: "Chief", office: "Sports Facilities Division", local: "197", email: "operations@psc.gov.ph" },
        { name: "LESTER V. SABIGAN", role: "Officer-in-Charge", office: "Medical and Scientific Athletes' Services", local: "278/202", email: "msas@psc.gov.ph" },
        { name: "PROF. PEARL ANNE D. MANAGUELOD", role: "Institute Director", office: "Philippine Sports Institute", local: "-", email: "psi@psc.gov.ph" },
        { name: "LIEZL D. DE LUNA", role: "Officer-in-Charge", office: "NSA Affairs Office", local: "-", email: "nsaoo@psc.gov.ph" },
        { name: "ENGR. VICTORIA T. MOYA", role: "Head", office: "Engineering and Maintenance Unit", local: "190", email: "engineering@psc.gov.ph" },
        { name: "ROSELLE Z. DESTURA", role: "Dormitory Manager", office: "Athlete's Dormitory", local: "151", email: "dormitoryoffice@psc.gov.ph" },
        { name: "CHARLIE C. ESQUIVEL", role: "Administrator", office: "Philsports Pasig Office", local: "-", email: "philsports@psc.gov.ph" },
        { name: "MARIA MATEA E. LINCO", role: "In-Charge", office: "Sea, Air and Land Transportation Unit", local: "-", email: "travel@psc.gov.ph" },
        { name: "DATU SHAIFFUDIN D. KIRAM", role: "In-Charge", office: "PSC Baguio Office", local: "-", email: "baguio@psc.gov.ph" },
      ]
    },
    {
      title: "Bureau on Administrative, Financial and Management Services",
      accent: "border-ph-red",
      titleColor: "text-ph-red dark:text-red-400",
      data: [
        { name: "DIR. MERLITA R. IBAY", role: "Deputy Executive Director", office: "Office of the Deputy Executive Director - Bureau on Administrative, Financial and Management Services", local: "145/178", email: "dedfas@psc.gov.ph" },
        { name: "DR. CHRISTOPHER B. GACUTAN", role: "Chief", office: "Management Services Division", local: "147/153", email: "admin@psc.gov.ph" },
        { name: "ATTY. ERIK JEAN A. MAYORES", role: "Chief", office: "Accounting Division", local: "179/180", email: "accounting@psc.gov.ph" },
        { name: "VIOLETA R. TUAZON", role: "Chief", office: "Budget Division", local: "177/176", email: "budget@psc.gov.ph" },
        { name: "MICHELLE S. BALUNAN", role: "Officer-in-Charge", office: "Personnel Office", local: "150", email: "hr@psc.gov.ph" },
        { name: "CAROLINE S. TOBIAS", role: "Officer-in-Charge", office: "Procurement Office", local: "143", email: "procurement@psc.gov.ph" },
        { name: "ERWIN M. GUILLERMO", role: "Head", office: "Property and Supply Unit", local: "206", email: "property@psc.gov.ph" },
        { name: "LORNA B. LORICO", role: "Officer-in-Charge", office: "Records Office", local: "159", email: "records@psc.gov.ph" },
        { name: "MICHELLE S. BALUNAN", role: "Head", office: "Training and Development Unit", local: "190", email: "trainings@psc.gov.ph" },
        { name: "ELIZABETH T. AGULAN", role: "Head", office: "Cashier's Office", local: "151", email: "cashier@psc.gov.ph" },
        { name: "CRISTINA M. GARCIA", role: "Head", office: "Information Systems Unit", local: "163", email: "isu@psc.gov.ph" },
        { name: "ARIEL C. FLORES", role: "Officer-in-Charge", office: "Transportation Unit", local: "187", email: "transportation@psc.gov.ph" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-transparent pt-16 md:pt-32 px-6 md:px-12 lg:px-24 pb-20 font-poppins transition-colors duration-300">

      {/* ── MOBILE BACK NAVIGATION BAR ── */}
      <div className="
        lg:hidden flex items-center px-4 py-3
        bg-white dark:bg-[#030A17]
        text-gray-900 dark:text-white
        border-b border-gray-200 dark:border-gray-800
        sticky top-[52px] z-50
        -mx-6 mt-[-16px] mb-8
      ">
        <button onClick={() => navigate(-1)} className="p-1">
          <FiChevronLeft size={20} />
        </button>
        <span className="flex-1 text-center font-bold text-sm uppercase tracking-wider pr-6">Contact Us</span>
      </div>

      {/* TOP SECTION */}
      <div className="flex flex-col-reverse lg:flex-row gap-12 mb-20">

        {/* Left: Contact Details */}
        <div className="w-full lg:w-1/3 space-y-8 mt-2">
          <div>
            <h3 className="text-[11px] font-bold text-gray-400 mb-2 uppercase tracking-widest">Address:</h3>
            <p className="text-sm font-medium leading-relaxed text-gray-700 dark:text-gray-300">
              Rizal Memorial Sports Complex<br />
              Pablo Ocampo Sr., St. Malate Manila
            </p>
          </div>
          <div>
            <h3 className="text-[11px] font-bold text-gray-400 mb-2 uppercase tracking-widest">Trunklines:</h3>
            <p className="text-sm font-medium leading-relaxed text-gray-700 dark:text-gray-300">
              8525-0808 / 8524-4408 / 8523-6055 /<br />
              8525-2075 / 8521-2364 / 8523-9831 /<br />
              8400-1864
            </p>
          </div>
          <div>
            <h3 className="text-[11px] font-bold text-gray-400 mb-2 uppercase tracking-widest">Website:</h3>
            <a
              href="https://www.psc.gov.ph"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-ph-blue dark:text-gray-300 hover:text-ph-red transition-colors"
            >
              www.psc.gov.ph
            </a>
          </div>
          <div>
            <h3 className="text-[11px] font-bold text-gray-400 mb-4 uppercase tracking-widest">Socials:</h3>
            <div className="flex gap-5">
              <a href="https://www.facebook.com/psc.gov.ph" target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-ph-blue dark:hover:text-white transition-all hover:scale-110">
                <FiFacebook size={22} />
              </a>
              <a href="https://www.instagram.com/phil.sportscommission/" target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-ph-red dark:hover:text-white transition-all hover:scale-110">
                <FiInstagram size={22} />
              </a>
              <a href="https://x.com/psc_gov" target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all hover:scale-110">
                <BsTwitterX size={20} />
              </a>
              <a href="https://www.youtube.com/@psc_gov" target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-ph-red dark:hover:text-white transition-all hover:scale-110">
                <FiYoutube size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Right: Map — Google Maps iframe with map.jpg fallback */}
        <div className="w-full lg:w-2/3 h-[350px] md:h-[450px] rounded-[24px] overflow-hidden border border-gray-200 dark:border-white/10 shadow-lg relative">

          {/* ── FALLBACK: map.jpg ── always rendered underneath */}
          {/* Visible when iframe hasn't loaded yet or errored */}
          <div
            className={`absolute inset-0 z-10 transition-opacity duration-500 ${
              iframeLoaded && !iframeError ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            <img
              src="/map.jpg"
              alt="PSC Location Map"
              className="w-full h-full object-cover"
            />

            {/* Overlay: loading state — pulsing pin */}
            {!iframeError && !iframeLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 backdrop-blur-[2px]">
                <div className="animate-bounce text-white drop-shadow-lg">
                  <FiMapPin size={32} strokeWidth={2} />
                </div>
                <p className="mt-2 text-white text-xs font-semibold tracking-wider drop-shadow">
                  Loading map…
                </p>
              </div>
            )}

            {/* Overlay: error state — tap to open in Google Maps */}
            {iframeError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 backdrop-blur-[2px]">
                <a
                  href="https://maps.google.com/?q=Rizal+Memorial+Sports+Complex,+Manila"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 dark:bg-white/10 backdrop-blur text-gray-800 dark:text-white text-xs font-bold shadow-lg border border-white/30 hover:bg-white transition-colors"
                >
                  <FiMapPin size={14} />
                  Open in Google Maps
                </a>
              </div>
            )}
          </div>

          {/* ── GOOGLE MAPS iframe ── loads on top once ready */}
          {!iframeError && (
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.564177409419!2d120.99042501533618!3d14.56687008182963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c97825d143c1%3A0xc3cf2ce674f14125!2sRizal%20Memorial%20Sports%20Complex!5e0!3m2!1sen!2sph!4v1680000000000!5m2!1sen!2sph"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="PSC Location Map"
              className={`absolute inset-0 z-20 transition-opacity duration-700 ${
                iframeLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setIframeLoaded(true)}
              onError={() => setIframeError(true)}
            />
          )}
        </div>
      </div>

      {/* Directory Tables */}
      <div className="w-full">
        <div className="mb-8 border-b border-gray-200 dark:border-white/10 pb-6">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Agency Local Directory
          </h2>
        </div>

        <div className="space-y-12">
          {agencyDirectories.map((directory, index) => (
            <div key={index}>
              <h3 className={`text-lg font-bold mb-4 tracking-tight ${directory.titleColor}`}>
                {directory.title}
              </h3>

              <div className={`bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 border-t-2 ${directory.accent} rounded-[16px] overflow-x-auto shadow-sm`}>
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-white/5">
                      <th className="px-6 py-5 text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-white/10 w-1/4">Head / Chief</th>
                      <th className="px-6 py-5 text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-white/10 w-1/3">Office Name</th>
                      <th className="px-6 py-5 text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-white/10">Local</th>
                      <th className="px-6 py-5 text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-white/10">Email</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                    {directory.data.map((person, idx) => (
                      <tr key={idx} className="hover:bg-gray-100 dark:hover:bg-white/[0.03] transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-bold text-[13px] text-gray-800 dark:text-gray-100 uppercase">{person.name}</p>
                          <p className="text-[11px] text-gray-400 mt-0.5">{person.role}</p>
                        </td>
                        <td className="px-6 py-4 text-[13px] text-gray-600 dark:text-gray-300 font-medium pr-8">{person.office}</td>
                        <td className="px-6 py-4 text-[13px] text-gray-600 dark:text-gray-300">{person.local}</td>
                        <td className="px-6 py-4 text-[13px] text-gray-400">
                          <a href={`mailto:${person.email}`} className="hover:text-ph-blue dark:hover:text-amber-500 transition-colors">
                            {person.email}
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
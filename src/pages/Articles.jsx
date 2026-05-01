import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiChevronLeft } from 'react-icons/fi';

// Simulated article database mapping by ID
const articlesDB = {
  "1": {
    title: "CIGNAL SUPER SPIKERS",
    subtitle: "PVL: Cignal takes leave of absence just after silver medal finish",
    image: "/lowerBanner1.png", 
    videoUrl: "/cignalVideo.mp4", 
    content: [
      <span key="0"><strong className="font-black text-gray-900 dark:text-white">MANILA, Philippines —</strong> Just days after their magical runner-up finish in the 2026 Premier Volleyball League (PVL) All-Filipino Conference, the Cignal Super Spikers are taking a leave of absence.</span>,
      "The management announced on Tuesday that Cignal is going on a hiatus after five years in the league, highlighted by three silver medals.",
      "“This difficult decision was taken after careful review of Cignal’s strategic direction,” the team wrote. “Our deepest thanks go out to the players, coaches, and staff who have poured their hearts into this team over the years. And to our fans, who have stood by us, maraming, maraming salamat!”",
      "Cignal left everything on the floor and dragged Creamline to a deciding fifth set in Finals Game 2. Despite the resilience of the Super Spikers, they succumbed to a heartbreaking 25-23, 22-25, 25-16, 16-25, 15-11 loss on Thursday in front of 17,358 fans at Smart Araneta Coliseum.",
      "It marked Cignal’s final game in the PVL, with the club pulling the plug despite being a consistent podium finisher with three silver medals and five bronze."
    ]
  },
  "2": {
    title: "ASEAN Para Games Incentives",
    subtitle: "PSC awards cash incentives to ASEAN Para Games medalists",
    image: "/lowerBanner2.png", 
    videoUrl: null,
    content: [
      <span key="0"><strong className="font-black text-gray-900 dark:text-white">MANILA –</strong> The Philippine Sports Commission (PSC) awarded cash incentives to the medalists of the 2026 ASEAN Para Games on Tuesday at the Rizal Memorial Coliseum.</span>,
      "The incentives amounting to more than PHP11 million are under Republic Act 10699, which awards PHP150,000 for gold, PHP75,000 for silver, and PHP30,000 for bronze medals.",
      "Senator Christopher \"Bong\" Go, chair of the committee on youth and sports, joined PSC Chairperson John Patrick Gregorio and Commissioners Olivia \"Bong\" Coo, Matthew \"Fritz\" Gaston, Walter Torres and Edward Hayco, and Philippine Paralympic Committee (PPC) president Michael Barredo in the awarding.",
      "“Despite the times of the energy crisis and all, today is the day that we celebrate the honor and glory of all athletes, and the pride that you gave to all Filipinos. This is the first time after so many years that we placed fourth after years of fifth and sixth place finishes,” said Barredo in a speech.",
      "Meanwhile, Go noted that legislation for equal incentives among para-athletes and able-bodied athletes remains pending.",
      "Presently, para-athletes get only half the incentives of their Southeast Asian Games counterparts - PHP150,000 vs. PHP300,000 (gold), PHP75,000 vs. PHP150,000 (silver) and PHP30,000 vs. PHP60,000 (bronze)"
    ]
  },
  "3": {
    title: "Infrastructure Modernization",
    subtitle: "PSC refurbishes tennis center, other Rizal Memorial facilities",
    image: "/lowerBanner3.png", 
    videoUrl: null,
    content: [
      "The Philippine Sports Commission (PSC) continues to refurbish key facilities at the Rizal Memorial Sports Complex (RMSC), including the tennis center, ahead of the Philippine Women’s Open scheduled later this month.",
      "In a Facebook post last December 28, the PSC said its team is working “all hands on deck” to upgrade the facilities in preparation for upcoming events.",
      "“These upgrades promise to elevate the overall experience for athletes, spectators, and stakeholders—strengthening RMSC’s legacy as an iconic venue ready to host prestigious tournaments, from global competitions to collegiate and grassroots events,” the PSC said.",
      "Major structures within the complex, including the historic Rizal Memorial Coliseum, Ninoy Aquino Stadium, and the PSC’s administrative building, are likewise undergoing refurbishment.",
      "The Philippine Women's Open, a WTA 125 event, will be held from January 26 to 31."
    ]
  },
  "4": {
    title: "FIBA 3x3 World Cup",
    subtitle: "Gilas Women reach FIBA 3x3 World Cup knockout stage",
    image: "/lowerBanner4.png", 
    videoUrl: null,
    content: [
      <span key="0"><strong className="font-black text-gray-900 dark:text-white">MANILA –</strong> Just a few days after clinching silver at the FIBA 3x3 Asia Cup, the Gilas Pilipinas Women moved closer to securing a spot on the world stage.</span>,
      "The Gilas Women advanced to the knockouts of the FIBA 3x3 World Cup qualifiers on Saturday after securing the top seed in Pool B.",
      "The Philippines finished pool play with a 1-1 record, dropping its first game against Brazil, 16-13, before outlasting Singapore in its final assignment, 21-19.",
      "In the opening game, Afril Bernardino and Tantoy Ferrer led the charge for Gilas Women with five points each. Two-time UAAP MVP Kacey Dela Rosa once again powered Gilas Women to victory over Singapore with 11 points, highlighted by the last two baskets in the endgame.",
      "Singapore later pulled off a huge upset over Brazil in overtime, 15-13, resulting in a three-way tie in Pool B, with each team having identical 1-1 slates.",
      "The Philippines and Singapore moved on to the semifinals as both teams scored 34 points across two games, while Brazil only had 29 points.",
      "The Gilas Women are now only one win away from qualifying for the FIBA 3x3 World Cup, with fourth-seeded Lithuania standing on the other side of the court.",
      "Lithuania moved on to the semifinals after surviving two overtime games, emerging as the second-ranked team in Pool A with 34 points.",
      "The winners of the semifinals will automatically book their spot in the World Cup happening from June 1 to 7 in Warsaw, Poland. The losing teams will face off in a knockout game to determine the final qualifying squad.",
      "The Gilas Women will take on Lithuania in the semifinals on Sunday at 6:25 p.m. at the OCBC Square in Singapore."
    ]
  },
  "5": {
    title: "Alex Eala's Road to Rome",
    subtitle: "Alex Eala returns to Nadal academy ahead of Italian Open",
    image: "/lowerBanner5.png",
    videoUrl: null,
    content: [
      <span key="0"><strong className="font-black text-gray-900 dark:text-white">MANILA, Philippines —</strong> Alex Eala is back in training at the Rafa Nadal Academy as she continues her clay-court campaign.</span>,
      "In a pair of Instagram Stories, Eala was seen training on the clay courts in the Mallorca facility while also huddling with her team.",
      "“She’s home,” the academy wrote in its caption.",
      "Eala, currently at No. 44 in the WTS rankings, is set to see action in the Italian Open, starting next week. She was initially listed to compete in the WTA 125 Catalonia Open, but withdrew.",
      "The Filipino tennis star has endured a tough stretch on clay, suffering early exits in three straight tournaments in April.",
      "In Italy, Eala faces a loaded field that includes Aryna Sabalenka, Elena Rybakina, Coco Gauff and defending champion Jasmine Paolini."
    ]
  }
};

const moreNews = [
  { id: 1, title: "Cignal takes leave of absence just after silver medal finish", category: "Sports", image: "/lowerBanner1.png" },
  { id: 2, title: "PSC awards cash incentives to ASEAN Para Games medalists", category: "Sports", image: "/lowerBanner2.png" },
  { id: 3, title: "PSC refurbishes tennis center, other Rizal Memorial facilities", category: "Infrastructure", image: "/lowerBanner3.png" },
  { id: 4, title: "Gilas Women reach FIBA 3x3 World Cup knockout stage", category: "Sports", image: "/lowerBanner4.png" },
  { id: 5, title: "Alex Eala returns to Nadal academy ahead of Italian Open", category: "Sports", image: "/lowerBanner5.png" },
];

const Articles = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const articleData = articlesDB[id] || articlesDB["1"]; 

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#030A17] font-poppins transition-colors duration-300 pt-16 md:pt-32 pb-20">
      
      {/* ── MOBILE BACK NAVIGATION BAR (Magkadikit Fix) ── */}
      <div className="
        lg:hidden flex items-center px-4 py-3 
        bg-white dark:bg-[#030A17] 
        text-gray-900 dark:text-white 
        border-b border-gray-200 dark:border-gray-800 
        sticky top-[52px] z-40 
        -mx-0 mt-[-16px]
      ">
        <button onClick={() => navigate(-1)} className="p-1">
          <FiChevronLeft size={20} />
        </button>
        <span className="flex-1 text-center font-bold text-sm uppercase tracking-wider pr-6">News</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-8 md:mt-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          <article className="lg:col-span-8">
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-tight mb-2">
                {articleData.title}
              </h1>
              <h2 className="text-sm md:text-base font-medium text-ph-blue dark:text-ph-yellow">
                {articleData.subtitle}
              </h2>
            </header>

            {articleData.videoUrl ? (
              <div className="w-full aspect-video rounded-2xl shadow-xl mb-10 overflow-hidden border border-gray-200 dark:border-white/10 bg-black">
                <video src={articleData.videoUrl} controls className="w-full h-full object-contain" poster={articleData.image}>
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : (
              <img src={articleData.image} alt={articleData.title} className="w-full rounded-2xl shadow-xl mb-10 object-cover border border-gray-200 dark:border-white/10" />
            )}

            <div className="space-y-6 text-gray-800 dark:text-gray-300 text-[15px] md:text-base leading-relaxed font-medium">
              {articleData.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </article>

          <aside className="lg:col-span-4 flex flex-col gap-12 border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-white/10 pt-12 lg:pt-0 lg:pl-12">
            <div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-6">More News</h3>
              <div className="flex flex-col gap-6">
                {moreNews.map((news) => (
                  <Link to={`/article/${news.id}`} key={news.id} className="flex gap-4 group">
                    <img src={news.image} alt={news.title} className="w-24 h-20 flex-shrink-0 rounded-xl object-cover shadow-sm group-hover:opacity-80 transition-opacity" />
                    <div className="flex flex-col justify-center">
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white leading-snug line-clamp-3 group-hover:text-ph-blue dark:group-hover:text-ph-yellow transition-colors">{news.title}</h4>
                      <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider mt-2">{news.category}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest mb-4">Follow Us</h3>
              <div className="flex items-center gap-3">
                <SocialButton icon={FiFacebook} /> <SocialButton icon={FiYoutube} /> <SocialButton icon={FiInstagram} /> <SocialButton icon={FiTwitter} />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

const SocialButton = ({ icon: Icon }) => (
  <a href="#" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-ph-blue hover:text-white dark:hover:bg-ph-yellow dark:hover:text-black transition-all">
    <Icon size={18} />
  </a>
);

export default Articles;
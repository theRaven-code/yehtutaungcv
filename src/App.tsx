import "./App.css";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import resumePDF from "./assets/resume.pdf";
import {
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaDownload,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { ThemeToggle } from "./components/ThemeToggle";
import Layout from "./components/Layout";

// Define the types needed in the component
type Experience = {
  title: string;
  description?: string[];
  companyName: string;
  companyUrl?: string;
  date?: string;
  skills?: string[];
  timeFrame?: string;
  position?: string;
  projects?: { name: string; link: string }[];
  techStack?: string[];
  responsibility?: string;
};

// Add NavLink type definition
type NavLink = {
  label: string;
  href: string;
  name?: string;
  icon?: string;
};

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef<number>(0);
  const sections = useRef<{ id: string; top: number; bottom: number }[]>([]);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout>>();

  // Scroll progress indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Navigation links with icons
  const navLinks: NavLink[] = [
    { label: "Home", href: "#home", icon: "🏠" },
    { label: "About", href: "#about", icon: "👋" },
    { label: "Experience", href: "#experience", icon: "💼" },
    { label: "Skills", href: "#skills", icon: "🛠️" },
    { label: "Contact", href: "#contact", icon: "📬" },
  ];

  // Handle navigation
  const handleNavClick = (href: string) => {
    const sectionId = href.replace("#", "");
    setActiveSection(sectionId);
    setIsMenuOpen(false);
  };

  // Effect to initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  // Effect to update sections positions
  useEffect(() => {
    const updateSections = () => {
      const navSections = navLinks
        .map((link) => {
          const element = document.querySelector(link.href);
          if (element) {
            const rect = element.getBoundingClientRect();
            return {
              id: link.href.replace("#", ""),
              top: rect.top + window.pageYOffset - 100,
              bottom: rect.bottom + window.pageYOffset - 100,
            };
          }
          return null;
        })
        .filter(Boolean);
      sections.current = navSections as {
        id: string;
        top: number;
        bottom: number;
      }[];
    };

    // Update sections on mount and resize
    updateSections();
    const debouncedUpdate = debounce(updateSections, 100);
    window.addEventListener("resize", debouncedUpdate);
    return () => window.removeEventListener("resize", debouncedUpdate);
  }, [navLinks]);

  // Effect to handle scroll and update active section
  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      scrollTimeout.current = setTimeout(() => {
        const currentScrollY = window.pageYOffset;

        // Header visibility
        if (headerRef.current) {
          if (currentScrollY <= 50 || currentScrollY < lastScrollY.current) {
            headerRef.current.style.transform = "translateY(0)";
          } else if (
            currentScrollY > 100 &&
            currentScrollY > lastScrollY.current
          ) {
            headerRef.current.style.transform = "translateY(-100%)";
          }
        }
        lastScrollY.current = currentScrollY;

        // Active section
        const currentSection = sections.current.find(
          (section) =>
            currentScrollY >= section.top && currentScrollY < section.bottom
        );

        if (currentSection && currentSection.id !== activeSection) {
          setActiveSection(currentSection.id);
        } else if (currentScrollY < sections.current[0]?.top) {
          setActiveSection("home");
        }

        // If near the bottom of the page, set active section to 'contact'
        if (
          window.innerHeight + window.pageYOffset >=
            document.body.offsetHeight - 50 &&
          activeSection !== "contact"
        ) {
          setActiveSection("contact");
        }
      }, 10); // Small delay to prevent excessive updates
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [activeSection]);

  const scrollToSection = (href: string) => {
    const section = document.querySelector(href);
    if (section) {
      const sectionTop =
        section.getBoundingClientRect().top + window.pageYOffset;
      const offset = 80; // Adjust based on header height
      window.scrollTo({
        top: sectionTop - offset,
        behavior: "smooth",
      });
    }
  };

  // Debounce utility function
  const debounce = <T extends (...args: unknown[]) => void>(
    func: T,
    wait: number
  ) => {
    let timeout: ReturnType<typeof setTimeout>;
    return function executedFunction(...args: Parameters<T>) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // Experience data
  const experiences: Experience[] = [
    {
      title: "Senior Software Engineer",
      timeFrame: "February 2024 - February 2025",
      companyUrl: "https://www.tensorplex.ai/",
      companyName: "Tensorplex Labs",
      position: "Software Engineer",
      projects: [
        {
          name: "Tensorplex's Decentralized AI program: Reinforcement Learning from Human Feedback (RLHF) Project - Dojo",
          link: "https://dojo-dev.tensorplex.dev/",
        },
        {
          name: "AI-powered Video Content Summarizers",
          link: "https://stream.tensorplex.ai/",
        },
        {
          name: "AI-powered Chatbot",
          link: "https://stream.tensorplex.ai/TensorplexAIChatbot",
        },
      ],
      techStack: ["NextJS", "Context API", "TailwindCSS", "SVG Animations"],
      responsibility:
        "Managing, developing and providing helpful insights into the UI development, researching numerous techniques to improve the User Experience. Providing valuable insights and innovative solutions to improve user interaction and satisfaction, while collaborating with cross-functional teams to ensure alignment with project goals and user needs. I gained knowledge on Web3 Login, dashboard development, and crypto-based ideas while working in this company.",
    },
    {
      title: "Software Engineer",
      timeFrame: "January 2023 - December 2023",
      companyUrl: "https://www.abank.com.mm/",
      companyName: "Ayeyarwaddy Farmers Development Bank",
      position: "Assistant Supervisor",
      projects: [
        {
          name: "A Plus 2.0 Digital Wallet Merchant",
          link: "https://play.google.com/store/apps/details?id=com.jits.mbanking.abank.partner",
        },
        {
          name: "Merchant Internal Portal",
          link: "",
        },
        {
          name: "Acquiring Internal Portal",
          link: "",
        },
      ],
      techStack: ["ReactJS", "Redux", "CSS", "AntDesign", "JavaScript"],
      responsibility:
        "A Bank is one of the most prestigious financial institutions in Myanmar. As a software engineer, I'm leading various portals dealing with A Plus 2.0 digital wallet which is itching for a release soon enough. The pace with which this project is moving is miraculous rate and learning a lot of management skillset by putting compassionate efforts dedicated for the success of this project. React, Redux, and Ant Design are being used in this project. I did mentored two batches of junior developers and managed some test projects to give them a chance to learn and grow.",
    },
    {
      title: "Front End Developer",
      timeFrame: "July 2022 - September 2022",
      companyUrl: "https://wundertek.tech/",
      companyName: "WunderTek",
      projects: [
        {
          name: "Rider App",
          link: "",
        },
      ],
      techStack: ["ReactJS", "Redux", "CSS", "TailwindCSS", "JavaScript"],
      responsibility:
        "I built a back office dashboard portal meant to manage the logisitic app. Thanks to the prevailing chaos in my home company, it went idle. Major experience in Google Maps and rerouting was gained.",
    },
    {
      title: "Front-end Developer",
      timeFrame: "November 2020 - April 2021",
      companyUrl: "https://wundertek.tech/",
      companyName: "WunderTek",
      projects: [
        {
          name: "Comic Reading App",
          link: "",
        },
        {
          name: "Blog Web Application & minor client side websites",
          link: "",
        },
      ],
      techStack: [
        "ReactJS",
        "Redux",
        "CSS",
        "TailwindCSS",
        "Material UI",
        "JavaScript",
      ],
      responsibility:
        "I built a back office dashboard portal for Comic App. Along with it, small scale client side websites were built for various clients. I was a junior when i joined that company first. Started my career with maintaining and adding new features for its internal dashboard portal and client side website. Later, after having substanitial knowledge, I collaborated with my seniors in creating various features.",
    },
    {
      title: "Jr. Front-end Developer",
      timeFrame: "November 2020 - April 2021",
      companyUrl:
        "https://play.google.com/store/apps/details?id=com.myanlearn_for_students&hl=en&gl=US",
      companyName: "MyanLearn",
      projects: [
        {
          name: "E-Learning App",
          link: "https://play.google.com/store/apps/details?id=com.myanlearn_for_students&hl=en&gl=US",
        },
        {
          name: "Backend Dashboard for Administrative purposes",
          link: "",
        },
      ],
      techStack: [
        "ReactJS",
        "React Native",
        "Redux",
        "CSS",
        "Material UI",
        "JavaScript",
      ],
      responsibility:
        "I was a junior when i joined that company first. Started my career with maintaining and adding new features for its internal dashboard portal and client side website. Later, after having substanitial knowledge, I collaborated with my seniors in creating various features and major expansion for its home-grown application, MyanLearn App.",
    },
  ];

  // Render sidebar content for Layout component
  const renderSidebar = () => (
    <div className="sticky top-24">
      <div className="flex flex-col space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center lg:text-left"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Ye Htut <span className="text-gradient">Aung</span>
          </h1>
          <h2 className="text-lg text-muted-foreground">
            Front-end/Full-Stack Engineer
          </h2>
        </motion.div>

        <nav className="flex flex-col space-y-2">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.href}
              href={link.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
                handleNavClick(link.href);
              }}
              className={`nav-link optimize-animation ${
                activeSection === link.href.replace("#", "") ? "active" : ""
              }`}
            >
              <span className="flex items-center">
                <span className="nav-icon">{link.icon}</span>
                <span className="nav-text">{link.label}</span>
              </span>
            </motion.a>
          ))}
        </nav>

        <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
          <motion.a
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com/theRaven-code"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon group"
          >
            <FaGithub
              size={20}
              className="group-hover:text-primary transition-colors"
            />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            href="https://www.linkedin.com/in/ye-htut-aung-saravanan-4a018b199/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon group"
          >
            <FaLinkedin
              size={20}
              className="group-hover:text-primary transition-colors"
            />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            href="mailto:isaravananofficial@gmail.com"
            className="social-icon group"
          >
            <FaEnvelope
              size={20}
              className="group-hover:text-primary transition-colors"
            />
          </motion.a>
        </div>

        <motion.a
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          href={resumePDF}
          download="YeHtutAung_Resume.pdf"
          aria-label="Download Resume"
          className="modern-button flex items-center justify-center gap-4 group font-semibold text-lg px-8 py-4 rounded-2xl border border-white/20 shadow-lg bg-white/10 backdrop-blur-lg text-white transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/40 hover:shadow-2xl hover:bg-white/20 relative overflow-hidden w-full max-w-xs mx-auto mt-6"
        >
          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/90 shadow-md group-hover:shadow-lg transition-all duration-300">
            <FaDownload
              size={22}
              className="text-white drop-shadow-md group-hover:animate-bounce"
            />
          </span>
          <span className="z-10">Download Resume</span>
          <span className="absolute inset-0 rounded-2xl pointer-events-none group-hover:shadow-[0_0_32px_8px_rgba(139,92,246,0.15)] transition-all duration-300" />
        </motion.a>
      </div>
    </div>
  );

  // Render main content for Layout component
  const renderMain = () => (
    <div className="space-y-24">
      {/* Hero section */}
      <section
        id="home"
        className="relative min-h-[90vh] flex items-center px-4 sm:px-6 lg:px-8"
      >
        <div className="gradient-blob w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] -left-[20%] top-[10%] opacity-20"></div>
        <div className="gradient-blob w-[200px] sm:w-[250px] md:w-[300px] h-[200px] sm:h-[250px] md:h-[300px] right-[10%] bottom-[20%] opacity-20"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 w-full max-w-4xl mx-auto"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            Crafting Digital
            <br />
            <span className="text-gradient">Experiences</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl">
            I'm a front-end specialist with a passion for crafting intuitive,
            visually stunning digital experiences. With a solid foundation in
            front-end technologies, I bring ideas to life on the web.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="modern-button text-center"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" });
                setActiveSection("contact");
              }}
            >
              Get In Touch
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#experience"
              className="px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-all duration-300 border border-primary/20 hover:border-primary/40 text-center"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#experience")
                  ?.scrollIntoView({ behavior: "smooth" });
                setActiveSection("experience");
              }}
            >
              View Experience
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* About section */}
      <section
        id="about"
        className="relative px-4 sm:px-6 md:px-8 max-w-screen-lg mx-auto"
      >
        <SectionHeading title="About Me" subtitle="My introduction" />

        <div className="mt-8 sm:mt-12 flex flex-col gap-8 sm:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4 sm:space-y-6 flex-1 min-w-0"
          >
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
              With 5+ years of hands-on experience crafting web and mobile
              applications, I transform ideas into intuitive, visually
              compelling digital experiences.
            </p>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
              Now, I'm <b>leveling up</b> — diving into{" "}
              <b>back-end development</b> to master server-side logic, database
              architecture, and API integrations.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-row gap-4 sm:gap-6 flex-1 w-full max-w-xs"
          >
            <div className="modern-card p-4 sm:p-5 md:p-6 flex-1 min-w-[120px] text-left">
              <h3 className="text-2xl sm:text-3xl font-bold text-primary mb-1 sm:mb-2">
                5+
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Years Experience
              </p>
            </div>
            <div className="modern-card p-4 sm:p-5 md:p-6 flex-1 min-w-[120px] text-left">
              <h3 className="text-2xl sm:text-3xl font-bold text-primary mb-1 sm:mb-2">
                20+
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Projects Completed
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience section */}
      <section id="experience" className="px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Experience" subtitle="My professional journey" />

        <div className="mt-8 sm:mt-12 space-y-6 sm:space-y-8">
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="modern-card p-4 sm:p-6"
            >
              <div className="flex flex-col md:flex-row justify-between md:items-center mb-3 sm:mb-4">
                <h3 className="text-lg sm:text-xl font-bold">
                  {experience.title}
                </h3>
                <span className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-0">
                  {experience.timeFrame}
                </span>
              </div>

              <div className="mb-3 sm:mb-4">
                <a
                  href={experience.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover-underline inline-flex items-center gap-2 text-sm sm:text-base"
                >
                  {experience.companyName}
                  <FaExternalLinkAlt size={12} />
                </a>
              </div>

              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
                {experience.responsibility}
              </p>

              <div className="flex flex-wrap gap-2">
                {experience.techStack?.map((tech, i) => (
                  <span key={i} className="skill-badge text-xs sm:text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Skills section */}
      <section id="skills" className="px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Skills" subtitle="My technical expertise" />

        <div className="mt-8 sm:mt-12 flex flex-col gap-8">
          {[
            {
              category: "Frontend Development",
              skills: [
                "React",
                "Next.js",
                "TypeScript",
                "JavaScript",
                "HTML5",
                "CSS3/SCSS",
              ],
            },
            {
              category: "Mobile Development",
              skills: [
                "React Native",
                "Expo",
                "Mobile UI Design",
                "App Performance",
              ],
            },
            {
              category: "State Management",
              skills: ["Redux", "Context API"],
            },
            {
              category: "UI/Styling",
              skills: [
                "Tailwind CSS",
                "Material UI",
                "Styled Components",
                "CSS Modules",
              ],
            },
            {
              category: "Backend & Database",
              skills: ["Node.js", "Express", "MongoDB", "REST API"],
            },
            {
              category: "Tools & Others",
              skills: ["Git", "Cursor", "Postman", "Figma", "Agile/Scrum"],
            },
          ].map(({ category, skills }, idx) => (
            <div key={category} className="flex flex-col gap-3">
              <h4 className="text-base font-semibold text-muted-foreground mb-1 pl-1 tracking-wide uppercase">
                {category}
              </h4>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, i) => (
                  <span
                    key={skill}
                    className="skill-badge text-sm md:text-base px-4 py-1 rounded-full bg-accent/10 text-foreground border border-accent/20 transition-transform duration-200 hover:scale-110 hover:bg-primary/20 hover:text-primary shadow-sm cursor-pointer"
                    style={{
                      fontWeight: idx % 2 === 0 && i % 2 === 0 ? 600 : 500,
                      fontSize: i % 3 === 0 ? "1.1em" : "1em",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact section */}
      <section
        id="contact"
        className="px-4 sm:px-6 lg:px-8 py-24 sm:py-32 min-h-[80vh]"
      >
        <SectionHeading title="Contact Me" subtitle="Let's get in touch" />

        <div className="mt-8 sm:mt-12">
          <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-2xl">
            I'm currently looking for new opportunities. Whether you have a
            question or just want to say hi, I'll try my best to get back to
            you!
          </p>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="mailto:isaravananofficial@gmail.com"
              className="modern-card p-4 sm:p-6 flex items-center gap-3 sm:gap-4"
            >
              <div className="p-2 sm:p-3 rounded-full bg-primary/10 text-primary">
                <FaEnvelope size={20} className="sm:w-6 sm:h-6" />
              </div>
              <div>
                <h4 className="font-medium text-sm sm:text-base">Email</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  isaravananofficial@gmail.com
                </p>
              </div>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="https://www.linkedin.com/in/ye-htut-aung-saravanan-4a018b199/"
              target="_blank"
              rel="noopener noreferrer"
              className="modern-card p-4 sm:p-6 flex items-center gap-3 sm:gap-4"
            >
              <div className="p-2 sm:p-3 rounded-full bg-primary/10 text-primary">
                <FaLinkedin size={20} className="sm:w-6 sm:h-6" />
              </div>
              <div>
                <h4 className="font-medium text-sm sm:text-base">LinkedIn</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Connect with me
                </p>
              </div>
            </motion.a>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-background text-foreground transition-colors duration-200">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Theme toggle */}
      <div className="fixed bottom-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Mobile Header */}
      <header
        ref={headerRef}
        className="fixed top-0 w-full z-40 bg-background/80 backdrop-blur-lg border-b border-border transition-transform duration-300 lg:hidden"
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.a
            href="#home"
            className="text-xl font-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-gradient">YHA</span>
          </motion.a>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg hover:bg-accent/10 transition-colors"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
                }
              />
            </svg>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-border bg-background/80 backdrop-blur-lg"
            >
              <nav className="container mx-auto px-4 py-4 flex flex-col space-y-2">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMenuOpen(false);
                      setTimeout(() => {
                        const section = document.querySelector(link.href);
                        if (section) {
                          const sectionTop =
                            section.getBoundingClientRect().top +
                            window.pageYOffset -
                            80;
                          window.scrollTo({
                            top: sectionTop,
                            behavior: "smooth",
                          });
                          handleNavClick(link.href);
                        }
                      }, 300);
                    }}
                    className={`nav-link ${
                      activeSection === link.href.replace("#", "")
                        ? "active"
                        : ""
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      {link.icon}
                      {link.label}
                    </span>
                  </motion.a>
                ))}
                {/* Download Resume button for mobile menu */}
                <motion.a
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  href={resumePDF}
                  download="YeHtutAung_Resume.pdf"
                  aria-label="Download Resume"
                  className="modern-button flex items-center justify-center gap-4 group font-semibold text-lg px-8 py-4 rounded-2xl border border-white/20 shadow-lg bg-white/10 backdrop-blur-lg text-white transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/40 hover:shadow-2xl hover:bg-white/20 relative overflow-hidden w-full mt-4"
                >
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/90 shadow-md group-hover:shadow-lg transition-all duration-300">
                    <FaDownload
                      size={22}
                      className="text-white drop-shadow-md group-hover:animate-bounce"
                    />
                  </span>
                  <span className="z-10">Download Resume</span>
                  <span className="absolute inset-0 rounded-2xl pointer-events-none group-hover:shadow-[0_0_32px_8px_rgba(139,92,246,0.15)] transition-all duration-300" />
                </motion.a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Overlay for mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 bg-background/50 backdrop-blur-sm z-30"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="pt-16 lg:pt-0">
        <Layout sidebar={renderSidebar()} main={renderMain()} />
      </div>
    </div>
  );
};

// Update SectionHeading component
const SectionHeading = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="text-center lg:text-left"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-3">{title}</h2>
      <p className="text-lg text-muted-foreground mb-6">{subtitle}</p>
      <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto lg:mx-0"></div>
    </motion.div>
  );
};

export default App;

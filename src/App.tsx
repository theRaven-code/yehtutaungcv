import "./App.css";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import resumePDF from "./assets/resume.pdf";
import {
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaChevronDown,
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
};

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef<number>(0);

  // Scroll progress indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Navigation links
  const navLinks: NavLink[] = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];

  // Handle navigation
  const handleNavClick = (href: string) => {
    const sectionId = href.replace("#", "");
    setActiveSection(sectionId);
    setIsMenuOpen(false);
  };

  // Effect to update active section based on scroll position
  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.href.replace("#", ""));

    const observerOptions = {
      root: null,
      rootMargin: "-80px 0px -20% 0px", // Adjusted for header height
      threshold: 0.1,
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, [navLinks]);

  // Effect for header behavior on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!headerRef.current) return;

      const currentScrollY = window.scrollY;

      // Show header at top of page or when scrolling up
      if (currentScrollY <= 50 || currentScrollY < lastScrollY.current) {
        headerRef.current.style.transform = "translateY(0)";
      }
      // Hide header when scrolling down and not at the top
      else if (currentScrollY > 100 && currentScrollY > lastScrollY.current) {
        headerRef.current.style.transform = "translateY(-100%)";
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Ye Htut <span className="text-gradient">Aung</span>
          </h1>
          <h2 className="text-lg text-muted-foreground">
            Front-end/Full-Stack Engineer
          </h2>
        </div>

        <nav className="flex flex-col space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                const section = document.querySelector(link.href);
                if (section) {
                  // Calculate position with offset
                  const sectionTop =
                    section.getBoundingClientRect().top +
                    window.pageYOffset -
                    20;
                  window.scrollTo({
                    top: sectionTop,
                    behavior: "smooth",
                  });
                  handleNavClick(link.href);
                }
              }}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeSection === link.href.replace("#", "")
                  ? "text-primary bg-accent"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-wrap gap-4">
          <a
            href="https://github.com/theRaven-code"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-accent text-foreground hover:text-primary transition-colors"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/ye-htut-aung-saravanan-4a018b199/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-accent text-foreground hover:text-primary transition-colors"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href="mailto:isaravananofficial@gmail.com"
            className="p-3 rounded-full bg-accent text-foreground hover:text-primary transition-colors"
          >
            <FaEnvelope size={20} />
          </a>
        </div>

        <a
          href={resumePDF}
          download="YeHtutAung_Resume.pdf"
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <FaDownload size={16} />
          <span>Download Resume</span>
        </a>
      </div>
    </div>
  );

  // Render main content for Layout component
  const renderMain = () => (
    <div className="space-y-16">
      {/* Hero section */}
      <section id="home" className="relative pb-10">
        {/* Background gradient blobs */}
        <div className="gradient-blob w-[300px] h-[300px] -left-[10%] top-[10%] opacity-30 md:opacity-60"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-10">
            "I'm a front-end specialist with a passion for crafting intuitive,
            visually stunning digital experiences. With a solid foundation in
            front-end technologies, I bring ideas to life on the web while
            continuously expanding my expertise into back-end development.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium shadow hover:shadow-lg hover:bg-primary/90 transition-all"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" });
                setActiveSection("contact");
              }}
            >
              <span>Get In Touch</span>
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* About section */}
      <section id="about" className="relative">
        <SectionHeading title="About Me" subtitle="My introduction" />

        <div className="mt-8">
          <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6">
            With 5+ years of hands-on experience crafting web and mobile
            applications, I transform ideas into intuitive, visually compelling
            digital experiences. My expertise lies in designing clean, efficient
            interfaces that prioritize user needs and elevate brand
            interactions.
          </p>

          <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-10">
            Now, I'm <b>leveling up </b>—diving into <b>back-end development</b>
            to master server-side logic, database architecture, and API
            integrations. My goal? To bridge design and functionality
            seamlessly, becoming a versatile full-stack developer who delivers
            end-to-end solutions that are as robust as they are beautiful.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6 sm:mb-10">
            <div className="p-3 sm:p-4 rounded-lg border border-border bg-card">
              <h3 className="text-2xl sm:text-3xl font-bold text-primary mb-1">
                5+
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Years Experience
              </p>
            </div>
            <div className="p-3 sm:p-4 rounded-lg border border-border bg-card">
              <h3 className="text-2xl sm:text-3xl font-bold text-primary mb-1">
                20+
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Projects Completed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience section */}
      <section id="experience">
        <SectionHeading title="Experience" subtitle="My professional journey" />

        <div className="mt-8">
          <div className="grid grid-cols-1 gap-6">
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={index}
                experience={experience}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Skills section */}
      <section id="skills">
        <SectionHeading title="Skills" subtitle="My technical skills" />

        <div className="mt-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            <SkillCategory
              title="Frontend Development"
              skills={[
                "React",
                "Next.js",
                "TypeScript",
                "JavaScript",
                "HTML5",
                "CSS3/SCSS",
              ]}
              delay={0}
            />
            <SkillCategory
              title="Mobile Development"
              skills={[
                "React Native",
                "Expo",
                "Mobile UI Design",
                "App Performance",
              ]}
              delay={0.1}
            />
            <SkillCategory
              title="State Management"
              skills={["Redux", "Context API", "Zustand", "Recoil"]}
              delay={0.2}
            />
            <SkillCategory
              title="UI/Styling"
              skills={[
                "Tailwind CSS",
                "Material UI",
                "Styled Components",
                "CSS Modules",
                "Responsive Design",
              ]}
              delay={0.3}
            />
            <SkillCategory
              title="Backend & Database"
              skills={["Node.js", "Express", "MongoDB", "REST API", "GraphQL"]}
              delay={0.4}
            />
            <SkillCategory
              title="Tools & Others"
              skills={[
                "Git",
                "GitHub",
                "VS Code",
                "Figma",
                "Agile/Scrum",
                "Performance Optimization",
              ]}
              delay={0.5}
            />
          </motion.div>
        </div>
      </section>

      {/* Contact section */}
      <section id="contact">
        <SectionHeading title="Contact Me" subtitle="Let's get in touch" />

        <div className="mt-8">
          <p className="text-base sm:text-lg text-muted-foreground mb-6">
            I'm currently looking for new opportunities. Whether you have a
            question or just want to say hi, I'll try my best to get back to
            you!
          </p>

          <div className="space-y-4">
            <a
              href="mailto:isaravananofficial@gmail.com"
              className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors"
            >
              <div className="p-2 sm:p-3 rounded-full bg-primary/10 text-primary">
                <FaEnvelope size={16} />
              </div>
              <div>
                <h4 className="font-medium">Email</h4>
                <p className="text-sm sm:text-base text-muted-foreground">
                  isaravananofficial@gmail.com
                </p>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/ye-htut-aung-saravanan-4a018b199/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors"
            >
              <div className="p-2 sm:p-3 rounded-full bg-primary/10 text-primary">
                <FaLinkedin size={16} />
              </div>
              <div>
                <h4 className="font-medium">LinkedIn</h4>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Connect with me
                </p>
              </div>
            </a>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:isaravananofficial@gmail.com"
              className="w-full sm:w-auto inline-block px-6 py-3 rounded-xl 
                         bg-purple-600/80 hover:bg-purple-700/90 
                         text-white text-center shadow-lg hover:shadow-xl
                         transition-all duration-300 mt-6"
            >
              Write me an email
            </motion.a>
          </div>
        </div>
      </section>

      {/* Footer for mobile only */}
      <footer className="py-6 mt-12 border-t border-border md:hidden">
        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Ye Htut Aung. All rights reserved.
        </p>
      </footer>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 text-slate-800 dark:text-slate-200">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50"
        style={{ scaleX, transformOrigin: "0%" }}
      />

      {/* Theme toggle - fixed position */}
      <div className="fixed bottom-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Mobile Header - Only visible on smaller screens */}
      <header
        ref={headerRef}
        className="fixed top-0 w-full z-40 bg-background/80 backdrop-blur-sm border-b border-border transition-transform duration-300 lg:hidden"
      >
        <div className="w-full mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <a href="#home" className="text-xl font-bold text-gradient">
            Ye Htut Aung
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md hover:bg-accent transition-colors"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
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
          </button>
        </div>

        {/* Mobile navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t border-border bg-background/95 backdrop-blur-sm"
            >
              <nav className="flex flex-col space-y-2 p-4 max-h-[70vh] overflow-y-auto">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMenuOpen(false);
                      // Small timeout to ensure the menu closes first
                      setTimeout(() => {
                        const section = document.querySelector(link.href);
                        if (section) {
                          // Calculate position with offset for fixed header
                          const headerHeight = 70; // Approximate header height
                          const sectionTop =
                            section.getBoundingClientRect().top +
                            window.pageYOffset -
                            headerHeight;
                          window.scrollTo({
                            top: sectionTop,
                            behavior: "smooth",
                          });
                          handleNavClick(link.href);
                        }
                      }, 300);
                    }}
                    className={`px-4 py-3 rounded-md text-base font-medium transition-colors ${
                      activeSection === link.href.replace("#", "")
                        ? "text-primary bg-accent"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    }`}
                  >
                    {link.label}
                  </a>
                ))}

                <a
                  href={resumePDF}
                  download="YeHtutAung_Resume.pdf"
                  className="flex items-center gap-2 px-4 py-3 mt-2 rounded-md bg-primary text-primary-foreground text-base font-medium hover:bg-primary/90 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaDownload size={16} />
                  <span>Download Resume</span>
                </a>
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
            className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Use the Layout component for content */}
      <div className="pt-16 lg:pt-0">
        <Layout sidebar={renderSidebar()} main={renderMain()} />
      </div>

      {/* Footer for desktop */}
      <footer className="py-8 bg-card border-t border-border hidden md:block">
        <div className="w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} Ye Htut Aung. All rights
                reserved.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <a
                href="https://github.com/theRaven-code"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <FaGithub size={16} />
              </a>
              <a
                href="https://www.linkedin.com/in/ye-htut-aung-saravanan-4a018b199/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <FaLinkedin size={16} />
              </a>
              <a
                href="mailto:isaravananofficial@gmail.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <FaEnvelope size={16} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Section Heading Component
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
      viewport={{ once: true, margin: "-100px" }}
    >
      <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
      <p className="mt-2 text-muted-foreground">{subtitle}</p>
      <div className="mt-4 w-16 h-1 bg-primary rounded-full"></div>
    </motion.div>
  );
};

// Experience Card Component
const ExperienceCard = ({
  experience,
  index,
}: {
  experience: Experience;
  index: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index }}
      className={`rounded-xl border border-border bg-card p-5 transition-all hover:shadow-md ${
        isOpen ? "shadow-lg" : ""
      }`}
      onClick={() => setIsOpen(!isOpen)}
    >
      {/* Card header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
        <h3 className="text-lg font-medium">{experience.title}</h3>
        <span className="text-sm text-muted-foreground">
          {experience.timeFrame || experience.date}
        </span>
      </div>

      {/* Company info */}
      <div className="mb-3">
        <a
          href={experience.companyUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="hover:underline flex items-center gap-1"
        >
          {experience.companyName}
          {experience.companyUrl && (
            <FaExternalLinkAlt size={12} className="opacity-70" />
          )}
        </a>
      </div>

      {/* Tech stack preview */}
      <div className="flex flex-wrap gap-2 mt-4">
        {experience.techStack &&
          experience.techStack.slice(0, 4).map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs rounded-full bg-muted text-muted-foreground font-medium"
            >
              {tech}
            </span>
          ))}
        {experience.techStack && experience.techStack.length > 4 && (
          <span className="px-3 py-1 text-xs rounded-full bg-muted text-muted-foreground font-medium">
            +{experience.techStack.length - 4} more
          </span>
        )}
      </div>

      {/* Expand/collapse icon */}
      <div className="flex justify-end mt-4">
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-muted-foreground"
        >
          <FaChevronDown size={12} />
        </motion.div>
      </div>

      {/* Expanded content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-4 border-t border-border mt-4">
              {/* Description */}
              {experience.description && (
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Description</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    {experience.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Projects */}
              {experience.projects && experience.projects.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Projects</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    {experience.projects.map((project, i) => (
                      <li key={i}>
                        {project.link ? (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="hover:underline text-primary"
                          >
                            {project.name}
                          </a>
                        ) : (
                          project.name
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Full tech stack */}
              {experience.techStack && experience.techStack.length > 4 && (
                <div>
                  <h4 className="font-medium mb-2">All Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {experience.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs rounded-full bg-muted text-muted-foreground font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Skills Category Component
const SkillCategory = ({
  title,
  skills,
  delay = 0,
}: {
  title: string;
  skills: string[];
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="p-6 rounded-lg border border-border bg-card/80 hover:bg-card transition-colors"
    >
      <h3 className="text-lg font-bold mb-4">{title}</h3>
      <ul className="space-y-2">
        {skills.map((skill, index) => (
          <motion.li
            key={skill}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: delay + index * 0.05 }}
            viewport={{ once: true }}
            className="flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-primary"></span>
            <span>{skill}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default App;

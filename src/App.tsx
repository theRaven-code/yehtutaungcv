import "./App.css";
import { motion } from "framer-motion";
import Layout from "./components/Layout";
import ExperienceCard from "./components/Experience";
import { useState } from "react";
import Sparkles from "./components/Sparkles";
import resumePDF from "./assets/resume.pdf";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

interface Experience {
  title: string;
  timeFrame: string;
  companyUrl: string;
  companyName: string;
  position?: string;
  projects: { name: string; link: string }[];
  techStack: string[];
  responsibility: string;
}

const AnimatedCard = ({
  href,
  children,
  primary = false,
  download,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
  download?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={href}
      download={download}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className={`
        relative overflow-hidden
        px-8 py-4 rounded-xl
        flex items-center justify-center
        transition-all duration-300 ease-out
        ${
          primary
            ? "bg-purple-600 text-white hover:bg-purple-700 hover:text-white"
            : "border-2 border-purple-600 text-purple-600 hover:bg-purple-600/5"
        }
        transform hover:-translate-y-1
        shadow-lg hover:shadow-xl
        backdrop-blur-sm
      `}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {isHovered && <Sparkles />}
      <motion.span
        animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
        className="relative z-10"
      >
        {children}
      </motion.span>
    </motion.a>
  );
};

const Sidebar = () => {
  return (
    <div>
      <div className="space-y-8 border-2 border-green-400 p-4 rounded-lg">
        <div>
          <h1 className="text-sm text-purple-600 dark:text-purple-400 mb-5">
            Hi, my name is
          </h1>
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Ye Htut Aung.
          </h2>
          <h3 className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-8">
            I build web solutions.
          </h3>
          <p className="text-base text-gray-600 dark:text-gray-400  mb-8">
            I'm a front-end engineer specializing in building exceptional
            digital solutions for your business
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <AnimatedCard href="mailto:isaravananofficial@gmail.com" primary>
            Get In Touch
          </AnimatedCard>

          <AnimatedCard href={resumePDF} download="resume.pdf">
            Download Resume
          </AnimatedCard>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Expertise</h3>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {[
              "React JS/React Native",
              "NextJS",
              "NodeJS",
              "ExpressJS",
              "MongoDB",

              "Redux",
              "Web Development",
              "CSS",
              "Material UI",
              "Tailwind CSS",
            ].map((skill) => (
              <span
                key={skill}
                className="text-md px-3 py-1 mx-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 hover:bg-purple-600/5 hover:text-white  cursor-pointer"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="border-2 border-green-400 p-4 rounded-lg mt-4">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-8 text-white">
          Social Media
        </h1>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="https://www.linkedin.com/in/ye-htut-aung-saravanan-4a018b199/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-gray-600 hover:text-purple-600 transition-colors"
          >
            <FaLinkedin size={48} />
          </a>
          <a
            href="https://github.com/theRaven-code"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-gray-600 hover:text-purple-600 transition-colors"
          >
            <FaGithub size={48} />
          </a>
          <a
            href="mailto:isaravananofficial@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-gray-600 hover:text-purple-600 transition-colors"
          >
            <FaEnvelope size={48} />
          </a>
        </div>
      </div>
    </div>
  );
};

const MainContent = ({ experiences }: { experiences: Experience[] }) => {
  return (
    <div className="space-y-10 border-2 border-green-400 rounded-lg p-4 sm:p-6">
      <section id="experience">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-8 text-white">
          Experience
        </h2>
        <div className="space-y-8 sm:space-y-12">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} experience={exp} index={index} />
          ))}
        </div>
      </section>

      <section id="contact" className="pb-4 sm:pb-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-2 text-white">
          Get In Touch
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 w-full sm:w-[70%] mx-auto">
          I'm currently looking for new opportunities. Whether you have a
          question or just want to say hi,you know what to do!
        </p>
        <a
          href="mailto:isaravananofficial@gmail.com"
          className="inline-block px-6 py-3 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition-colors"
        >
          Write me an email
        </a>
      </section>
    </div>
  );
};

const App: React.FC = () => {
  const experiences: Experience[] = [
    {
      title: "Senior Software Engineer",
      timeFrame: "February 2024 - February 2025",
      companyUrl: "https://www.tensorplex.ai/",
      companyName: "Tensorplex Labs",
      position: " Software Engineer ",
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
        "Managing, developing and providing helpful insights into the UI development, researching numerous techniques to improve the User Experience. Providing valuable insights and innovative solutions to improve user interaction and satisfaction, while collaborating with cross-functional teams to ensure alignment with project goals and user needs. I gained knowledge on Web3 Login, dashboard development, and crypto-based ideas while workin in this company.",
    },
    {
      title: "Software Engineer",
      timeFrame: "January 2023 - December 2023",
      companyUrl: "https://www.abank.com.mm/",
      companyName: "Ayeyarwaddy Farmers Development Bank",
      position: " Assistant Supervisor ",
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
      title: "Front End Develolper",
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
        "I built a back office dashboard portal meant to manage the logisitic app. Thanks to the prevailing chaos in my home company, it went idle. Major experience in Google Maps and rerouting was gained. ",
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
      title: "Jr.Front-end Developer/ Front-end Developer (Mobile)",
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
        "I was a junior when i joined that company first. Started my career with maintaining and adding new features for its internal dashboard portal and client side website. Later, after having substanitial knowledge, I collaborated with my seniors in creating various features and major expansion for its home-grown application, MyanLearn App. ",
    },
  ];

  return (
    <div className=" min-h-screen w-full ">
      <Layout
        sidebar={<Sidebar />}
        main={<MainContent experiences={experiences} />}
      />
    </div>
  );
};

export default App;

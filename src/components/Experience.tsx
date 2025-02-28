import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

const ExperienceCard = ({ experience, index }: ExperienceCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="backdrop-blur-lg bg-white/10 dark:bg-black/10
                border border-white/20 dark:border-gray-800/30
                shadow-lg rounded-2xl p-6 transition-all duration-300
                hover:shadow-xl hover:bg-white/20 dark:hover:bg-black/20"
    >
      <div onClick={toggleExpand} className="cursor-pointer">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white dark:text-white">
              {experience.title}
              {experience.position && (
                <span className="text-purple-400 dark:text-purple-300 ml-2 text-sm">
                  ({experience.position})
                </span>
              )}
            </h3>
            <div className="mt-1 flex items-center">
              <a
                href={experience.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-purple-400 dark:text-purple-300 hover:text-purple-300 dark:hover:text-purple-200 transition-colors"
              >
                {experience.companyName}
              </a>
              <span className="mx-2 text-gray-400 dark:text-gray-500">•</span>
              <span className="text-gray-400 dark:text-gray-500">
                {experience.timeFrame}
              </span>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-purple-400 dark:text-purple-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </motion.div>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {experience.techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-1 rounded-full bg-purple-600/20 dark:bg-purple-800/30 
                       text-purple-300 dark:text-purple-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-4 mt-4 border-t border-white/10 dark:border-gray-800/30">
              <p className="text-gray-300 dark:text-gray-300 mb-4">
                {experience.responsibility}
              </p>

              {experience.projects.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold text-white dark:text-white mb-2">
                    Projects
                  </h4>
                  <ul className="space-y-2">
                    {experience.projects.map((project, idx) => (
                      <li key={idx}>
                        {project.link ? (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-400 dark:text-purple-300 hover:text-purple-300 dark:hover:text-purple-200 transition-colors"
                          >
                            {project.name}
                          </a>
                        ) : (
                          <span className="text-gray-300 dark:text-gray-300">
                            {project.name}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ExperienceCard;

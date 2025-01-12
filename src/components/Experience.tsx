import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";

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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="relative group hover:border-purple-500/20 hover:scale-105 transition-all duration-300"
    >
      <div className="p-6 rounded-xl bg-gray-900/50 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 space-y-4 text-start">
        {/* Time Frame Row */}
        <div className="text-sm text-gray-400 text-start">
          {experience.timeFrame}
        </div>

        {/* Title and Company Row */}
        <div>
          <h3 className="text-xl font-semibold text-gray-100 flex flex-wrap items-center gap-2">
            <span className="break-words">{experience.title}</span>
            <span className="text-gray-400">@</span>
            <a
              href={experience.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 transition-colors inline-flex items-center"
            >
              <span className="break-words">{experience.companyName}</span>
              {experience.companyUrl && (
                <span className="ml-1 text-purple-400 inline-block">
                  <FaExternalLinkAlt size={12} />
                </span>
              )}
            </a>
          </h3>
          {experience.position && (
            <p className="text-sm text-gray-400 mt-1">{experience.position}</p>
          )}
        </div>
        {/* Roles and Responsibility Row */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-300">
            Roles and Responsibility
          </h4>
          <p className="text-gray-400">{experience.responsibility}</p>
        </div>
        {/* Projects Row */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-300">Projects</h4>
          <ul className="list-none flex flex-col sm:flex-row flex-wrap gap-4">
            {experience.projects.map((project, idx) => (
              <li key={idx} className="text-gray-400 flex items-start">
                <span className="text-purple-400 mr-2 flex-shrink-0">▹</span>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-red-300 transition-colors cursor-pointer inline-flex items-start"
                >
                  <span className="break-words">{project.name}</span>
                  {project.link && (
                    <span className="ml-1 mt-1 flex-shrink-0">
                      <FaExternalLinkAlt size={12} />
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies Row */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-300">Technologies</h4>
          <div className="flex flex-wrap gap-2">
            {experience.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-sm rounded-full 
                  bg-purple-900/30 text-purple-400 
                  border border-purple-500/20
                  hover:border-purple-500/40 transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Hover Effect Border */}
      {/* <motion.div
        className="absolute inset-0 rounded-xl border border-purple-500/0 group-hover:border-purple-500/20 transition-all duration-300"
        initial={false}
        animate={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      /> */}
    </motion.div>
  );
};

export default ExperienceCard;

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface LayoutProps {
  sidebar: ReactNode;
  main: ReactNode;
}

const Layout = ({ sidebar, main }: LayoutProps) => {
  return (
    <div className="w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-4 sm:py-8 relative z-10">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
        {/* Sidebar - Hidden on mobile, visible on lg screens and above */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden lg:block lg:sticky lg:top-8 lg:w-[300px] xl:w-[350px] h-max"
        >
          {sidebar}
        </motion.aside>

        {/* Main content */}
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1 max-w-full lg:max-w-3xl"
        >
          {main}
        </motion.main>
      </div>

      {/* Background blur elements for enhanced glassmorphism - visible on desktop only */}
      <div className="blur-overlay top-[20%] left-[10%] hidden lg:block"></div>
      <div className="blur-overlay bottom-[30%] right-[5%] hidden lg:block"></div>
    </div>
  );
};

export default Layout;

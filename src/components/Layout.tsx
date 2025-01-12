import { ReactNode } from "react";

interface LayoutProps {
  sidebar: ReactNode;
  main: ReactNode;
}

const Layout = ({ sidebar, main }: LayoutProps) => {
  return (
    <div className="flex flex-col lg:flex-row">
      <aside className="lg:fixed lg:top-0 lg:left-0 lg:w-[400px] lg:h-screen p-4 overflow-y-auto">
        {sidebar}
      </aside>
      <main className="lg:ml-[400px] w-full p-4">{main}</main>
    </div>
  );
};

export default Layout;

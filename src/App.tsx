import "./App.css";

function App() {
  const experiences = [
    {
      title: "Software Engineer",
      timeFrame: "January 2023 - Current",
      companyUrl:
        "https://play.google.com/store/search?q=a+plus+wallet&c=apps&hl=my",
      companyName: "A Bank",
      position: " Assistant Supervisor",
      projects: [
        "A Plus 2.0 Digital Wallet",
        "Merchant Portal",
        "Acquiring Portal",
      ],
      techStack: ["ReactJS", "Redux", "CSS", "AntDesign", "JavaScript"],
      responsibility:
        "A Bank is one of the most prestigious financial institutions in Myanmar. As a software engineer, I'm leading various portals dealing with A Plus 2.0 digital wallet which is itching for a release soon enough. The pace with which this project is moving is miraculous rate and learning a lot of management skillset by putting compassionate efforts dedicated for the success of this project. React, Redux, and Ant Design are being used in this project.",
    },
    {
      title: "Front End Develolper",
      timeFrame: "July 2022 - September 2022",
      companyUrl: "https://wundertek.tech/",
      companyName: "WunderTek",
      projects: ["Rider App"],
      techStack: ["ReactJS", "Redux", "CSS", "TailwindCSS", "JavaScript"],
      responsibility:
        "I built a back office dashboard portal meant to manage the logisitic app.",
    },
    {
      title: "Front-end Developer",
      timeFrame: "November 2020 - April 2021",
      companyUrl: "https://wundertek.tech/",
      companyName: "WunderTek",
      projects: ["Comic App, client side web apps for clients "],
      techStack: [
        "ReactJS",
        "Redux",
        "CSS",
        "TailwindCSS",
        "Material UI",
        "JavaScript",
      ],
      responsibility:
        "I built a back office dashboard portal for Comic App. Along with it, small scale client side websites were built for various clients.",
    },
    {
      title: "Jr.Front-end Developer/ Front-end Developer (Mobile)",
      timeFrame: "November 2020 - April 2021",
      companyUrl:
        "https://play.google.com/store/apps/details?id=com.myanlearn_for_students&hl=en&gl=US",
      companyName: "MyanLearn",
      projects: ["Comic App, client side web apps for clients "],
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
    <div className="App">
      <div className="app">
        <header className="app-header">
          <img
            src={
              "https://media.licdn.com/dms/image/D5603AQF3aqsNn8b-Mw/profile-displayphoto-shrink_800_800/0/1690039487299?e=1697068800&v=beta&t=auhs1ORSraZOAKdA_DYjjlBRe6-X825pwJ198JuCVmo"
            }
            alt="Profile"
            className="profile-image"
          />
          <h1>Ye Htut Aung</h1>
          <h2>Front-end React Developer</h2>
        </header>
        <section className="app-section">
          <p>
            An experienced software engineer with 4 years of expertise in
            developing, troubleshooting, and providing solutions for software
            applications. Proficient in creating scalable solutions for complex
            problems and skilled in maintaining, developing, and deploying web
            applications. Committed to ongoing learning and innovation in
            challenging environments.
          </p>
        </section>
        <section className="app-section expertise">
          <h3 className=" text-lg">Expertise</h3>
          <div className="skills">
            <div className="skill">React JS/React Native</div>
            <div className="skill">NextJS</div>
            <div className="skill">Redux</div>
            <div className="skill">Web Development</div>
            <div className="skill">CSS</div>
          </div>
        </section>
        <section className="app-section align-left">
          <h3 className=" text-lg" style={{ textAlign: "center" }}>
            Experiences
          </h3>

          <ol className="relative border-l border-gray-200 dark:border-gray-700">
            {experiences.map((experience) => {
              return (
                <li className="mb-10 ml-4">
                  <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                  <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                    {experience.timeFrame}
                  </time>
                  <h3>
                    <span className="text-xl">{experience.title}</span>
                    <a
                      href={experience.companyUrl}
                      style={{ cursor: "pointer" }}
                      target="_blank"
                    >
                      @ {experience.companyName}
                    </a>
                  </h3>

                  {experience.position && (
                    <span className="text-xs	">{experience.position}</span>
                  )}
                  <p className="mb-1 text-base font-normal text-gray-500 dark:text-gray-400 mt-3">
                    <i>Projects</i>:{" "}
                    {experience.projects.map((project) => {
                      return (
                        <>
                          <b>{project} </b> {" | "}
                        </>
                      );
                    })}
                  </p>
                  <p className="mb-1 text-base font-normal text-gray-500 dark:text-gray-400 mt-3">
                    <i>Tech Stack</i>:{" "}
                    {experience.techStack.map((tech) => {
                      return (
                        <>
                          <b>{tech} </b> {" | "}
                        </>
                      );
                    })}
                  </p>
                  <p className="mb-1 text-base font-normal text-gray-500 dark:text-gray-400 mt-3">
                    <i>Responsibility</i>: {experience.responsibility}
                  </p>
                </li>
              );
            })}
          </ol>
        </section>
        <a href="mailto:email@example.com">
          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Contact Me
            </span>
          </button>
        </a>
        <a href="https://1drv.ms/b/s!AnPXTB_olAFRgfEBazxD3hLO2BhloA?e=14t9gK" rel="noopener noreferrer">
          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Download CV
            </span>
          </button>
        </a>
      </div>
    </div>
  );
}

export default App;

const navLinks = [
  {
    id: 1,
    name: "Projects",
    type: "finder",
  },
  {
    id: 3,
    name: "Contact",
    type: "contact",
  },
  {
    id: 4,
    name: "Resume",
    type: "resume",
  },
];

const navIcons = [
  {
    id: 1,
    img: "public/icons/wifi.svg",
  },
  {
    id: 2,
    img: "public/icons/search.svg",
  },
  {
    id: 3,
    img: "public/icons/user.svg",
  },
  {
    id: 4,
    img: "public/icons/mode.svg",
  },
];

const dockApps = [
  {
    id: "finder",
    name: "Portfolio", // was "Finder"
    icon: "finder.png",
    canOpen: true,
  },
  {
    id: "safari",
    name: "Articles", // was "Safari"
    icon: "safari.png",
    canOpen: true,
  },
  {
    id: "photos",
    name: "Gallery", // was "Photos"
    icon: "photos.png",
    canOpen: true,
  },
  {
    id: "contact",
    name: "Contact", // or "Get in touch"
    icon: "contact.png",
    canOpen: true,
  },
  {
    id: "terminal",
    name: "Skills", // was "Terminal"
    icon: "terminal.png",
    canOpen: true,
  },
  {
    id: "trash",
    name: "Archive", // was "Trash"
    icon: "trash.png",
    canOpen: true,
  },
];



const techStack = [
  {
    category: "Languages",
    items: ["C", "C++", "Java", "Python", "JavaScript"],
  },
  {
    category: "Frontend",
    items: ["HTML", "CSS", "React.js", "Tailwind CSS"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express.js","Next js"],
  },
  {
    category: "Databases",
    items: ["MySQL", "MongoDB"],
  },
  {
    category: "DSA & CP",
    items: ["Data Structures", "Algorithms", "Competitive Programming", "C++ STL"],
  },
  {
    category: "Dev Tools",
    items: ["Git", "GitHub", "VS Code"],
  },
  {
    category: "Other Expertise",
    items: ["OOPS","DBMS", "Problem Solving"],
  },
];


const socials = [
  {
    id: 1,
    text: "Github",
    icon: "/public/icons/github.svg",
    bg: "#f4656b",
    link: "https://github.com/codeboy-pro",
  },
 
  {
    id: 2,
    text: "Twitter/X",
    icon: "/public/icons/twitter.svg",
    bg: "#4ade80",
    link: "https://x.com/maity97063",
  },
  {
    id: 3,
    text: "LinkedIn",
    icon: "/public/icons/linkedin.svg",
    bg: "#05b6f6",
    link: "https://www.linkedin.com/in/pradip-maity-07a7ba325/",
  },
];

const photosLinks = [
  {
    id: 1,
    icon: "/icons/gicon1.svg",
    title: "Library",
  },
  {
    id: 2,
    icon: "/icons/gicon2.svg",
    title: "Memories",
  },
  {
    id: 3,
    icon: "/icons/file.svg",
    title: "Places",
  },
  {
    id: 4,
    icon: "/icons/gicon4.svg",
    title: "People",
  },
  {
    id: 5,
    icon: "/icons/gicon5.svg",
    title: "Favorites",
  },
];

const gallery = [
  {
    id: 1,
    img: "/images/gal1.png",
  },
  {
    id: 2,
    img: "/images/gal2.png",
  },
  {
    id: 3,
    img: "/images/gal3.png",
  },
  {
    id: 4,
    img: "/images/gal4.png",
  },
];
const codingProfiles = [
  {
    id: 1,
    platform: "LeetCode",
    title: "Mastering Algorithmic Thinking",
    stats: "Solved 150+ Questions ",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png",
    link: "https://leetcode.com/u/pradipmaity9907/",
  },
  {
    id: 2,
    platform: "GeeksforGeeks",
    title: "In-depth DSA Knowledge",
    stats: "Solved 300+ Problems | Top 10% in University",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/43/GeeksforGeeks.svg",
    link: "https://leetcode.com/u/pradip9907maity/",
  },
  {
    id: 3,
    platform: "Codolio",
    title: "All-in-one Coding Profile",
    stats: "Aggregated C Score: 600+ | All Platforms Sync",
    image: "https://codolio.com/favicon.ico",
    link: "https://codolio.com/profile/pradipmaity9907",
  },
  {
    id: 4,
    platform: "NPTEL",
    title: "Top 5% Merit Certificate",
    stats: "Data Structures & Algorithms Design | Elite + Silver Medallist",
    image: "https://imgs.search.brave.com/YHPsxae2NqVmO9dlZfx9V14od-BNQTKrWAz25JRZDTU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/YnJhbmRmZXRjaC5p/by9pZF83enlITDJX/L3cvNDAwL2gvNDAw/L3RoZW1lL2Rhcmsv/aWNvbi5qcGVnP2M9/MWJ4aWQ2NE11cDdh/Y3pld1NBWU1YJnQ9/MTc2MjU1MzIxMTkw/Mg",
    link: "https://www.imprzd.com/bi/NPTEL379936.html?channel=4", 
  },
];

export {
  navLinks,
  navIcons,
  dockApps,

  codingProfiles,
  techStack,
  socials,
  photosLinks,
  gallery,
};

const WORK_LOCATION = {
  id: 1,
  type: "work",
  name: "Work",
  icon: "public/icons/work.svg",
  kind: "folder",
  children: [
    // ▶ Project 1
    {
      id: 5,
      name: "Nike Ecommerce Website Application",
      icon: "public/images/folder.png",
      kind: "folder",
      position: "top-10 left-5", // icon position inside Finder
      windowPosition: "top-[5vh] left-5", // optional: Finder window position
      children: [
        {
          id: 1,
          name: "Nike Project.txt",
          icon: "public/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "The Nike eCommerce website is a sleek and modern platform designed for shopping the latest Nike collections.",
            "Instead of a simple online store, it delivers an immersive experience with bold visuals, interactive product displays, and smooth navigation.",
            "Think of it like walking into a flagship Nike store—but right from your phone or laptop.",
            "It's built with Next.js and Tailwind, ensuring fast performance, responsive design, and a clean, premium look.",
          ],
        },
        {
          id: 2,
          name: "nike.com",
          icon: "public/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://youtu.be/fZdTYswuZjU?si=Awjl-pIst9e09_UU",
          position: "top-10 right-20",
        },
        {
          id: 4,
          name: "nike.png",
          icon: "public/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-80",
          imageUrl: "/public/images/project-1.png",
        },
        {
          id: 5,
          name: "Design.fig",
          icon: "public/images/plain.png",
          kind: "file",
          fileType: "fig",
          href: "https://google.com",
          position: "top-60 right-20",
        },
      ],
    },

    // ▶ Project 2
    {
      id: 6,
      name: "AI Resume Analyzer",
      icon: "public/images/folder.png",
      kind: "folder",
      position: "top-52 right-80",
      windowPosition: "top-[20vh] left-7",
      children: [
        {
          id: 1,
          name: "AI Resume Analyzer Project.txt",
          icon: "public/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 right-10",
          description: [
            "AI Resume Analyzer is a smart tool that helps you perfect your resume with instant feedback.",
            "Instead of guessing what recruiters want, you get AI-powered insights on keywords, formatting, and overall impact.",
            "Think of it like having a career coach—pointing out strengths, fixing weaknesses, and boosting your chances of landing interviews.",
            "It's built with Next.js and Tailwind, so it runs fast, looks professional, and works seamlessly on any device.",
          ],
        },
        {
          id: 2,
          name: "ai-resume-analyzer.com",
          icon: "public/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://youtu.be/iYOz165wGkQ?si=R1hs8Legl200m0Cl",
          position: "top-20 left-20",
        },
        {
          id: 4,
          name: "ai-resume-analyzer.png",
          icon: "public/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 left-80",
          imageUrl: "/public/images/project-2.png",
        },
        {
          id: 5,
          name: "Design.fig",
          icon: "public/images/plain.png",
          kind: "file",
          fileType: "fig",
          href: "https://google.com",
          position: "top-60 left-5",
        },
      ],
    },

    // ▶ Project 3
    {
      id: 7,
      name: "Food Delivery App",
      icon: "/public/images/folder.png",
      kind: "folder",
      position: "top-10 left-80",
      windowPosition: "top-[33vh] left-7",
      children: [
        {
          id: 1,
          name: "Food Delivery App Project.txt",
          icon: "/public/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "Our Food Delivery App is a fast and convenient way to order meals from your favorite restaurants.",
            "Instead of making calls or waiting in line, you can browse menus, customize orders, and track deliveries in real time.",
            "Think of it like having your favorite restaurants in your pocket—ready to deliver anytime, anywhere.",
            "It’s built with React Native, so it works smoothly on both iOS and Android with a clean, modern design.",
          ],
        },
        {
          id: 2,
          name: "food-delivery-app.com",
          icon: "/public/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://youtu.be/LKrX390fJMw?si=cExkuVhf2DTV9G2-",
          position: "top-10 right-20",
        },
        {
          id: 4,
          name: "food-delivery-app.png",
          icon: "/public/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-80",
          imageUrl: "/images/project-3.png",
        },
        {
          id: 5,
          name: "Design.fig",
          icon: "/public/images/plain.png",
          kind: "file",
          fileType: "fig",
          href: "https://google.com",
          position: "top-60 right-20",
        },
      ],
    },
  ],
};

const ABOUT_LOCATION = {
  id: 2,
  type: "about",
  name: "About me",
  icon: "public/icons/info.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "me.png",
      icon: "public/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-5",
      imageUrl: "/public/images/adrian.jpg",
    },
    {
      id: 2,
      name: "casual-me.png",
      icon: "public/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-28 right-72",
      imageUrl: "/public/images/adrian-2.jpg",
    },
    {
      id: 3,
      name: "conference-me.png",
      icon: "public/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-52 left-80",
      imageUrl: "/public/images/adrian-3.jpeg",
    },
    {
      id: 4,
      name: "about-me.txt",
      icon: "public/images/txt.png",
      kind: "file",
      fileType: "txt",
      position: "top-60 left-5",
      subtitle: "Meet the Developer Behind the Code",
      image: "/public/images/adrian.jpg",
      description: [
        "Hey! I’m Adrian 👋, a web developer who enjoys building sleek, interactive websites that actually work well.",
        "I specialize in JavaScript, React, and Next.js—and I love making things feel smooth, fast, and just a little bit delightful.",
        "I’m big on clean UI, good UX, and writing code that doesn’t need a search party to debug.",
        "Outside of dev work, you'll find me tweaking layouts at 2AM, sipping overpriced coffee, or impulse-buying gadgets I absolutely convinced myself I needed 😅",
      ],
    },
  ],
};

const RESUME_LOCATION = {
  id: 3,
  type: "resume",
  name: "Resume",
  icon: "public/icons/file.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "Resume.pdf",
      icon: "public/images/pdf.png",
      kind: "file",
      fileType: "pdf",
      // you can add `href` if you want to open a hosted resume
      // href: "/your/resume/path.pdf",
    },
  ],
};

const TRASH_LOCATION = {
  id: 4,
  type: "trash",
  name: "Trash",
  icon: "public/icons/trash.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "trash1.png",
      icon: "public/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-10",
      imageUrl: "/public/images/trash-1.png",
    },
    {
      id: 2,
      name: "trash2.png",
      icon: "public/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-40 left-80",
      imageUrl: "/public/images/trash-2.png",
    },
  ],
};

const ARCHIVE_LOCATION = {
  id: 11,
  type: "archive",
  name: "Archive",
  icon: "public/icons/ar2.svg",
  kind: "folder",
  children: [
    {
      id: 21,
      name: "Tic Tac To",
      icon: "public/images/folder.png",
      kind: "folder",
      position: "top-10 left-5",
      children: [
        {
          id: 1,
          name: "Tic Tac To.txt",
          icon: "public/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "A classic Tic Tac Toe game built using React.",
            "Features include a clean UI, turn-based gameplay, and win/draw detection.",
            "This was one of my early projects to practice React state management and game logic.",
          ],
        },
        {
          id: 2,
          name: "tictactoe.com",
          icon: "public/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://github.com",
          position: "top-10 right-20",
        },
        {
          id: 3,
          name: "preview.png",
          icon: "public/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-32",
          imageUrl: "/public/images/project-1.png",
        },
      ],
    },
    {
      id: 22,
      name: "Notes APP",
      icon: "public/images/folder.png",
      kind: "folder",
      position: "top-10 left-40",
      children: [
        {
          id: 1,
          name: "Notes App.txt",
          icon: "public/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "A simple and efficient Notes Application.",
            "Users can create, edit, and delete notes with local storage persistence.",
            "Built with React and Tailwind CSS for a modern Look and feel.",
          ],
        },
        {
          id: 2,
          name: "notesapp.com",
          icon: "public/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://github.com",
          position: "top-10 right-20",
        },
        {
          id: 3,
          name: "preview.png",
          icon: "public/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-32",
          imageUrl: "/public/images/project-2.png",
        },
      ],
    },
    {
      id: 23,
      name: "employee management system",
      icon: "public/images/folder.png",
      kind: "folder",
      position: "top-10 left-80",
      children: [
        {
          id: 1,
          name: "EMS.txt",
          icon: "public/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "A comprehensive Employee Management System (EMS).",
            "Designed to manage employee records, tasks, and attendance efficiently.",
            "Built using the MERN stack with a focus on Role-Based Access Control (RBAC).",
          ],
        },
        {
          id: 2,
          name: "ems-system.com",
          icon: "public/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://github.com",
          position: "top-10 right-20",
        },
        {
          id: 3,
          name: "preview.png",
          icon: "public/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-32",
          imageUrl: "/public/images/project-3.png",
        },
      ],
    },
  ],
};

const HACKATHONS_LOCATION = {
  id: 6,
  type: "hackathons",
  name: "Hackathons",
  icon: "public/icons/mode.svg",
  kind: "folder",
  children: [
    {
      id: 61,
      name: "Smart India Hackathon",
      icon: "public/images/folder.png",
      kind: "folder",
      position: "top-10 left-5",
      children: [
        {
          id: 1,
          name: "Project Detail.txt",
          icon: "public/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "Participated in Smart India Hackathon.",
            "Solvded real-world problems involving [Your Problem Area].",
            "Worked in a team of 6 to build a full-stack solution.",
            "Technologies used: React, Node.js, and [Other Tools].",
          ],
        },
      ],
    },
  ],
};

const CODING_PROFILES = {
  id: 7,
  type: "profiles",
  name: "Coding Profiles",
  icon: "public/icons/user.svg",
  kind: "folder",
  children: [
    {
      id: 71,
      name: "LeetCode",
      icon: "public/images/safari.png",
      kind: "file",
      fileType: "url",
      href: "https://leetcode.com/u/pradipmaity9907/", // Placeholder, user should update
      position: "top-10 left-5",
    },
    {
      id: 72,
      name: "GeeksforGeeks",
      icon: "public/images/safari.png",
      kind: "file",
      fileType: "url",
      href: "https://www.geeksforgeeks.org/user/pradipmaity9907/", // Placeholder
      position: "top-10 left-40",
    },
    {
      id: 73,
      name: "Codolio",
      icon: "public/images/safari.png",
      kind: "file",
      fileType: "url",
      href: "https://codolio.com/profile/pradipmaity9907", // Placeholder
      position: "top-10 left-80",
    },
  ],
};

export const locations = {
  work: WORK_LOCATION,
  about: ABOUT_LOCATION,
  resume: RESUME_LOCATION,
  archive: ARCHIVE_LOCATION,
  trash: TRASH_LOCATION,
};

const INITIAL_Z_INDEX = 1000;

const WINDOW_CONFIG = {
  finder: { isOpen: false, isMinimized: false, zIndex: INITIAL_Z_INDEX, data: null },
  contact: { isOpen: false, isMinimized: false, zIndex: INITIAL_Z_INDEX, data: null },
  resume: { isOpen: false, isMinimized: false, zIndex: INITIAL_Z_INDEX, data: null },
  safari: { isOpen: false, isMinimized: false, zIndex: INITIAL_Z_INDEX, data: null },
  photos: { isOpen: false, isMinimized: false, zIndex: INITIAL_Z_INDEX, data: null },
  terminal: { isOpen: false, isMinimized: false, zIndex: INITIAL_Z_INDEX, data: null },
  txtfile: { isOpen: false, isMinimized: false, zIndex: INITIAL_Z_INDEX, data: null },
  imgfile: { isOpen: false, isMinimized: false, zIndex: INITIAL_Z_INDEX, data: null },
};

export { INITIAL_Z_INDEX, WINDOW_CONFIG };

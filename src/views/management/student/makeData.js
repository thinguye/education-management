import studentApi from "../../../controller/StudentController";
export const data = studentApi.getAllStudents();


// [
//   {
//     firstName: 'Dusty',
//     lastName: 'Kuvalis',
//     email: 'Randy63@yahoo.com',
//     jobTitle: 'Chief Creative Technician',
//     startDate: '3/20/2014',
//     signatureCatchPhrase: 'Cross-platform disintermediate workforce',
//     avatar:
//       'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/106.jpg',
//   },
//   {
//     firstName: "D'angelo",
//     lastName: 'Moen',
//     email: 'Andrew88@hotmail.com',
//     jobTitle: 'Forward Response Engineer',
//     startDate: '3/9/2018',
//     signatureCatchPhrase: 'Virtual local support',
//     avatar:
//       'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/420.jpg',
//   },
//   {
//     firstName: 'Devan',
//     lastName: 'Reinger',
//     email: 'Melissa_Lockman@hotmail.com',
//     jobTitle: 'Customer Intranet Consultant',
//     startDate: '8/12/2020',
//     signatureCatchPhrase: 'Pre-emptive composite hierarchy',
//     avatar:
//       'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1091.jpg',
//   },
//   {
//     firstName: 'Leonardo',
//     lastName: 'Langworth',
//     email: 'Chadrick.Goldner87@gmail.com',
//     jobTitle: 'Senior Security Manager',
//     startDate: '7/25/2017',
//     signatureCatchPhrase: 'Progressive real-time core',
//     avatar:
//       'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/639.jpg',
//   },
//   {
//     firstName: 'Douglas',
//     lastName: 'Denesik',
//     email: 'Dante.Deckow@hotmail.com',
//     jobTitle: 'Legacy Security Assistant',
//     startDate: '4/12/2020',
//     signatureCatchPhrase: 'Operative well-modulated info-mediaries',
//     avatar:
//       'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/394.jpg',
//   },
//   {
//     firstName: 'Jameson',
//     lastName: 'Mayer',
//     email: 'Rosamond_Schuster@yahoo.com',
//     jobTitle: 'Regional Division Planner',
//     startDate: '10/30/2017',
//     signatureCatchPhrase: 'Front-line intermediate firmware',
//     avatar:
//       'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1205.jpg',
//   },
//   {
//     firstName: 'Madaline',
//     lastName: 'Quitzon',
//     email: 'Alex_Grimes82@hotmail.com',
//     jobTitle: 'Corporate Paradigm Strategist',
//     startDate: '1/17/2018',
//     signatureCatchPhrase: 'Right-sized high-level algorithm',
//     avatar:
//       'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/432.jpg',
//   },
//   {
//     firstName: 'Wilfrid',
//     lastName: 'Vandervort',
//     email: 'Buddy.Torphy@gmail.com',
//     jobTitle: 'Legacy Functionality Specialist',
//     startDate: '8/4/2014',
//     signatureCatchPhrase: 'Focused interactive secured line',
//     avatar:
//       'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1131.jpg',
//   },
//   {
//     firstName: 'Chelsie',
//     lastName: 'Mraz',
//     email: 'Ladarius_Thiel70@yahoo.com',
//     jobTitle: 'Forward Infrastructure Representative',
//     startDate: '1/6/2021',
//     signatureCatchPhrase: 'Diverse attitude-oriented migration',
//     avatar:
//       'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1099.jpg',
//   },
//   {
//     firstName: 'Hassie',
//     lastName: 'Bruen',
//     email: 'Clair76@gmail.com',
//     jobTitle: 'Human Paradigm Designer',
//     startDate: '4/28/2016',
//     signatureCatchPhrase: 'Upgradable composite methodology',
//     avatar:
//       'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/401.jpg',
//   },
//   {
//     firstName: 'Daisy',
//     lastName: 'Hane',
//     email: 'Alverta7@hotmail.com',
//     jobTitle: 'National Configuration Manager',
//     startDate: '3/2/2020',
//     signatureCatchPhrase: 'Exclusive next generation initiative',
//     avatar:
//       'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/436.jpg',
//   },
//   {
//     firstName: 'Wilbert',
//     lastName: 'Monahan',
//     email: 'Cydney.Jakubowski9@yahoo.com',
//     jobTitle: 'Internal Interactions Associate',
//     startDate: '4/5/2017',
//     signatureCatchPhrase: 'Total asynchronous strategy',
//     avatar:
//       'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/74.jpg',
//   },
//   {
//     firstName: 'Heloise',
//     lastName: 'Purdy',
//     email: 'Celestino.Kassulke@yahoo.com',
//     jobTitle: 'Global Identity Architect',
//     startDate: '12/18/2020',
//     signatureCatchPhrase: 'User-friendly tertiary service-desk',
//     avatar:
//       'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1107.jpg',
//   },
//   {
//     firstName: 'Moises',
//     lastName: 'McClure',
//     email: 'Arturo29@yahoo.com',
//     jobTitle: 'Internal Marketing Orchestrator',
//     startDate: '9/23/2014',
//     signatureCatchPhrase: 'Public-key exuding complexity',
//     avatar:
//       'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/484.jpg',
//   },
//   {
//     firstName: 'Rahsaan',
//     lastName: 'Bauch',
//     email: 'Angelita39@yahoo.com',
//     jobTitle: 'Dynamic Data Planner',
//     startDate: '3/31/2015',
//     signatureCatchPhrase: 'Decentralized 6th generation archive',
//     avatar:
//       'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1015.jpg',
//   },
//   {
//     firstName: 'Lorenzo',
//     lastName: 'Moore',
//     email: 'Emma_Becker33@yahoo.com',
//     jobTitle: 'Customer Division Representative',
//     startDate: '8/22/2020',
//     signatureCatchPhrase: 'Reactive fresh-thinking local area network',
//     avatar:
//       'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/88.jpg',
//   },
//   {
//     firstName: 'Richard',
//     lastName: 'Bartoletti',
//     email: 'Hayden84@gmail.com',
//     jobTitle: 'Future Communications Technician',
//     startDate: '10/13/2018',
//     signatureCatchPhrase: 'Streamlined logistical access',
//     avatar:
//       'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/897.jpg',
//   },
//   {
//     firstName: 'Ulises',
//     lastName: 'Beatty',
//     email: 'Jessie_Kirlin39@yahoo.com',
//     jobTitle: 'Future Markets Associate',
//     startDate: '10/17/2017',
//     signatureCatchPhrase: 'Monitored object-oriented interface',
//     avatar:
//       'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/956.jpg',
//   },
//   {
//     firstName: 'Hattie',
//     lastName: 'Stehr',
//     email: 'Betty78@hotmail.com',
//     jobTitle: 'Internal Directives Orchestrator',
//     startDate: '12/17/2014',
//     signatureCatchPhrase: 'Organic bi-directional groupware',
//     avatar:
//       'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/448.jpg',
//   },
//   {
//     firstName: 'Kane',
//     lastName: 'Marquardt',
//     email: 'Myron.Schaefer45@yahoo.com',
//     jobTitle: 'Product Research Orchestrator',
//     startDate: '2/28/2020',
//     signatureCatchPhrase: 'Stand-alone holistic strategy',
//     avatar:
//       'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/461.jpg',
//   },
//   {
//     firstName: 'Brittany',
//     lastName: 'Legros',
//     email: 'Rachelle44@yahoo.com',
//     jobTitle: 'Chief Web Specialist',
//     startDate: '7/27/2016',
//     signatureCatchPhrase: 'Reactive multi-tasking internet solution',
//     avatar:
//       'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/862.jpg',
//   },
//   {
//     firstName: 'Joana',
//     lastName: 'Witting',
//     email: 'Elyssa.Wiegand@hotmail.com',
//     jobTitle: 'Legacy Quality Strategist',
//     startDate: '8/22/2017',
//     signatureCatchPhrase: 'Extended asynchronous moderator',
//     avatar:
//       'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/795.jpg',
//   },
//   {
//     firstName: 'Marshall',
//     lastName: 'Gottlieb',
//     email: 'Myron53@gmail.com',
//     jobTitle: 'Internal Web Designer',
//     startDate: '12/25/2020',
//     signatureCatchPhrase: 'Business-focused bifurcated access',
//     avatar:
//       'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/524.jpg',
//   },
//   {
//     firstName: 'Nolan',
//     lastName: 'Abbott',
//     email: 'Sigurd.Murazik17@yahoo.com',
//     jobTitle: 'Principal Operations Strategist',
//     startDate: '8/3/2021',
//     signatureCatchPhrase: 'Robust bifurcated initiative',
//     avatar:
//       'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1095.jpg',
//   },
//   {
//     firstName: 'Guadalupe',
//     lastName: 'Goyette',
//     email: 'Derek.Senger15@yahoo.com',
//     jobTitle: 'Internal Accountability Executive',
//     startDate: '6/17/2020',
//     signatureCatchPhrase: 'Networked tangible definition',
//     avatar:
//       'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/322.jpg',
//   },
//   {
//     firstName: 'Frankie',
//     lastName: 'Balistreri',
//     email: 'Gladyce85@gmail.com',
//     jobTitle: 'District Integration Facilitator',
//     startDate: '3/16/2021',
//     signatureCatchPhrase: 'Diverse 24/7 open system',
//     avatar:
//       'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/103.jpg',
//   },
//   {
//     firstName: 'Jimmie',
//     lastName: 'Altenwerth',
//     email: 'Kaya37@hotmail.com',
//     jobTitle: 'International Brand Architect',
//     startDate: '9/1/2019',
//     signatureCatchPhrase: 'Decentralized 5th generation functionalities',
//     avatar:
//       'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/113.jpg',
//   },
//   {
//     firstName: 'Ryder',
//     lastName: "O'Hara",
//     email: 'Korey_Mueller@gmail.com',
//     jobTitle: 'Product Intranet Developer',
//     startDate: '5/8/2021',
//     signatureCatchPhrase: 'Multi-layered didactic firmware',
//     avatar:
//       'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/29.jpg',
//   },
//   {
//     firstName: 'Nolan',
//     lastName: 'Mayer',
//     email: 'Remington.DAmore63@hotmail.com',
//     jobTitle: 'Internal Research Orchestrator',
//     startDate: '2/21/2017',
//     signatureCatchPhrase: 'Open-source stable encoding',
//     avatar:
//       'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/915.jpg',
//   }
// ];
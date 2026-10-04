/* Data for StudyTrail. Topic format: [name, minimum minutes]. */

/* Self-growth tracks (original roadmaps, written for this project) */
var EXTRA = {
  dsa: {name:'Data Structures and Algorithms', kind:'growth', blurb:'From complexity basics to graphs, in a sensible order.', units:[
    {t:'Foundations', topics:[['Time and space complexity',60],['Arrays and two pointers',120],['Strings',90],['Recursion',90]]},
    {t:'Linear structures', topics:[['Linked lists',120],['Stacks',60],['Queues and deques',60],['Hashing and maps',90]]},
    {t:'Searching and sorting', topics:[['Binary search',60],['Elementary sorting',60],['Merge sort and quick sort',120]]},
    {t:'Trees and graphs', topics:[['Binary trees and traversals',120],['Binary search trees',90],['Heaps and priority queues',90],['Graph traversal: BFS and DFS',120]]},
    {t:'Problem-solving patterns', topics:[['Greedy method',90],['Dynamic programming basics',150]]}]},
  cpp: {name:'C++', kind:'growth', blurb:'From first program to classes and the STL.', units:[
    {t:'Core language', topics:[['Syntax, variables and input/output',60],['Conditions and loops',60],['Functions and scope',75],['Arrays and strings',90]]},
    {t:'Memory', topics:[['Pointers and references',120],['Dynamic memory allocation',90],['Structures',60]]},
    {t:'Object-oriented C++', topics:[['Classes and objects',90],['Constructors and destructors',60],['Inheritance',90],['Polymorphism and virtual functions',90]]},
    {t:'Standard Template Library', topics:[['Vectors and iterators',75],['Maps and sets',75],['Algorithms and lambdas',90]]}]},
  python: {name:'Python', kind:'growth', blurb:'Readable code first, then the libraries people actually use.', units:[
    {t:'Basics', topics:[['Variables, types and operators',45],['Conditions and loops',60],['Functions',75]]},
    {t:'Data structures', topics:[['Lists and tuples',60],['Dictionaries and sets',60],['Comprehensions',45],['Strings and formatting',45]]},
    {t:'Programs that last', topics:[['Modules and packages',45],['Files and exceptions',60],['Classes and objects',90]]},
    {t:'Libraries', topics:[['NumPy arrays',75],['pandas tables',90],['Plotting with matplotlib',60]]}]},
  web: {name:'Web Development', kind:'growth', blurb:'From a first page to a deployed full-stack app.', units:[
    {t:'Frontend basics', topics:[['HTML structure and forms',60],['CSS selectors and layout',90],['Responsive design',75],['JavaScript fundamentals',120]]},
    {t:'Working in the browser', topics:[['DOM and events',90],['Fetching data from APIs',90],['Git and GitHub',60]]},
    {t:'Backend', topics:[['HTTP and REST',60],['Node.js and Express',120],['Databases with SQL',120],['Login and authentication',90]]},
    {t:'Shipping', topics:[['Deploying a site',45],['A small full-stack project',240]]}]},
  ml: {name:'Machine Learning', kind:'growth', blurb:'Math and Python first, then models you can explain.', units:[
    {t:'Prerequisites', topics:[['Python, NumPy and pandas',120],['Probability and statistics basics',120],['Linear algebra basics',90]]},
    {t:'Core models', topics:[['Linear regression',90],['Logistic regression and classification',90],['Decision trees and random forests',90],['Clustering',75]]},
    {t:'Doing it properly', topics:[['Train/test split and overfitting',75],['Evaluation metrics',60],['A small end-to-end project',180]]}]}
};

/* B.Tech CSE subjects by semester: Graphic Era scheme of teaching and evaluation 2025 (theory and project courses). */
var SEMS = {
  '1': [['TPH101','Engineering Physics'],['TMA101','Engineering Mathematics-I'],['TEE101','Basic Electrical Engineering'],['TCS101','Fundamental of Computer & Introduction to Programming'],['THU101','Professional Communication'],['HSMC101','Design Thinking'],['PME151','Workshop and Manufacturing Practices']],
  '2': [['TCH101','Engineering Chemistry'],['TMA201','Engineering Mathematics-II'],['TCS201','Programming for Problem Solving'],['TEC101','Basic Electronics Engineering'],['THU201','Advanced Professional Communication']],
  '3': [['TCS308','Logic Design and Computer Organization'],['TCS302','Data Structures with C'],['TCS307','Object Oriented Programming with C++'],['TMA316','Discrete Structures and Combinatorics'],['DSE-I','Discipline Specific Elective-I'],['XCS301','Career Skills-I']],
  '4': [['TCS408','Programming in Java'],['TCS402','Finite Automata and Formal Languages'],['TCS403','Microprocessors'],['TCS409','Design and Analysis of Algorithms'],['DSE-II','Discipline Specific Elective-II'],['XCS401','Career Skills-II']],
  '5': [['TCS501','System Software'],['TCS502','Operating Systems'],['TCS503','Database Management Systems'],['TCS514','Computer Networks-I'],['DSE-III','Discipline Specific Elective-III'],['XCS501','Career Skills-III']],
  '6': [['TCS601','Compiler Design'],['TCS611','Software Engineering'],['TCS614','Computer Networks-II'],['TCS693','Full Stack Web Development'],['DSE-IV','Discipline Specific Elective-IV'],['XCS601','Career Skills-IV']],
  '7': [['TCS726','Business Intelligence'],['TCS704','Advanced Computer Architecture'],['TRM701','Research Methodology and IPR'],['DSE-V','Discipline Specific Elective-V'],['GE-I','Generic Elective-I'],['CSP701','Major Project Phase I']],
  '8': [['DM001','Disaster Management'],['DSE-VI','Discipline Specific Elective-VI'],['GE-II','Generic Elective-II'],['CSP801','Major Project Phase II'],['CSC801','Comprehensive Viva Voce']]
};

/* ---------- Subject roadmaps (unit-wise, following the standard B.Tech CSE university syllabus pattern) ----------
   U(unitTitle, 'Topic one; Topic two~90; ...')  ->  "~N" sets minimum minutes (default 60). */
function U(t,s){return {t:t,topics:s.split(';').map(function(x){var p=x.split('~');return [p[0].trim(),+(p[1]||60)];})};}

var SUBJ = {
  TCS101:['Fundamental of Computer & Introduction to Programming',[
    U('Unit 1: Computer fundamentals','Data vs information~30; Generations of computers~45; Von Neumann architecture; Memory and memory hierarchy; Operating system and software types; Computer networks~45'),
    U('Unit 2: Programming in C','Features of C and language levels~45; Life cycle of a C program~45; Algorithms and flowcharts~90; Operators and precedence'),
    U('Unit 3: Control statements','if, else and ternary operator; switch-case~45; Errors in C programs~45')]],
  TPH101:['Engineering Physics',[
    U('Unit 1: Special relativity','Frames of reference and Galilean transformation~45; Michelson-Morley experiment~45; Lorentz transformation; Length contraction and time dilation; Mass-energy relation~45'),
    U('Unit 2: Wave optics','Interference and Newton\'s rings; Diffraction and grating; Polarization'),
    U('Unit 3: Quantum mechanics','Black body radiation and Planck\'s law; Photoelectric and Compton effect; de Broglie waves and uncertainty principle; Schrodinger equation; Particle in a box~90'),
    U('Unit 4: Electromagnetic theory','Divergence and curl review~45; Maxwell\'s equations~90; EM waves and Poynting vector'),
    U('Unit 5: Lasers and fibre optics','Spontaneous and stimulated emission~45; He-Ne and ruby lasers; Optical fibre and numerical aperture; Losses and applications~45')]],
  TMA101:['Engineering Mathematics-I',[
    U('Unit 1: Matrices','Rank and echelon form; Linear systems and consistency; Eigenvalues and eigenvectors~90; Cayley-Hamilton theorem; Diagonalization~75'),
    U('Unit 2: Differential calculus','Taylor and Maclaurin series; Partial derivatives and Euler\'s theorem; Jacobian; Maxima, minima and Lagrange multipliers~90'),
    U('Unit 3: Integral calculus','Beta and Gamma functions; Double integrals and change of order; Triple integrals; Area and volume~75'),
    U('Unit 4: Vector calculus','Gradient, divergence and curl; Line and surface integrals; Green\'s theorem; Stokes\' and Gauss\' theorems~90'),
    U('Unit 5: Sequences and series','Convergence of sequences; Series tests (ratio, root, comparison); Power series and radius of convergence~75')]],
  TEE101:['Basic Electrical Engineering',[
    U('Unit 1: DC circuits','Ohm\'s law and Kirchhoff\'s laws; Mesh and nodal analysis~75; Superposition theorem; Thevenin and Norton theorems~75; Maximum power transfer'),
    U('Unit 2: AC circuits','Phasors and sinusoidal quantities; Series RLC circuits; Parallel circuits and resonance; Power and power factor; Three-phase systems~75'),
    U('Unit 3: Magnetic circuits and transformers','Magnetic circuits and hysteresis; Single-phase transformer operation; EMF equation; Efficiency and regulation~75'),
    U('Unit 4: Electrical machines','DC machine construction and working; DC motor characteristics~75; Three-phase induction motor; Synchronous machine basics'),
    U('Unit 5: Measurements and safety','Ammeter, voltmeter and wattmeter~45; Earthing, fuses and MCB~45; Batteries and electrical installations~45')]],
  THU101:['Professional Communication',[
    U('Unit 1: Communication basics','Process and types of communication~45; Barriers to communication~45; The 7 Cs of effective communication; Verbal and non-verbal cues'),
    U('Unit 2: Listening and speaking','Active listening; Presentation skills; Group discussion techniques; Interview skills'),
    U('Unit 3: Reading and writing','Reading comprehension strategies; Paragraph and precis writing; Note making and summarising~45'),
    U('Unit 4: Professional writing','Formal emails and letters; Resume and cover letter; Reports and memos~75'),
    U('Unit 5: Grammar and vocabulary','Tenses and subject-verb agreement; Common errors~45; One-word substitution, idioms and phrases~45')]],
  HSMC101:['Design Thinking',[
    U('Unit 1: Introduction','What is design thinking~30; The five stages~45; Design mindset and case studies'),
    U('Unit 2: Empathize','User research and interviews; Observation methods~45; Personas and empathy maps'),
    U('Unit 3: Define','Synthesising insights; Problem statements and POV; How Might We questions~45'),
    U('Unit 4: Ideate','Brainstorming techniques; Mind mapping and SCAMPER; Selecting ideas~45'),
    U('Unit 5: Prototype and test','Low-fidelity prototyping~75; User testing and feedback; Iteration and pitching~75')]],
  PME151:['Workshop and Manufacturing Practices',[
    U('Unit 1: Safety and measurement','Workshop safety rules~30; Marking and measuring tools; Vernier caliper and micrometer'),
    U('Unit 2: Carpentry and fitting','Carpentry tools and joints~75; Fitting operations: filing, sawing, drilling~75'),
    U('Unit 3: Welding and sheet metal','Arc welding~75; Gas welding and soldering~45; Sheet metal operations~60'),
    U('Unit 4: Machining and casting','Lathe operations~75; Drilling, shaping and milling basics; Foundry and pattern making; Introduction to 3D printing~45')]],

  TCH101:['Engineering Chemistry',[
    U('Unit 1: Water technology','Hardness and its units; Softening: lime-soda and zeolite; Ion exchange and reverse osmosis; Boiler troubles~45; BOD and COD~45'),
    U('Unit 2: Electrochemistry and corrosion','Electrode potential and Nernst equation~75; Batteries and fuel cells; Types of corrosion; Corrosion prevention methods~60'),
    U('Unit 3: Fuels','Calorific value; Coal analysis; Petroleum refining and cracking; Octane and cetane numbers; Biofuels~45'),
    U('Unit 4: Polymers','Addition and condensation polymerisation; Bakelite, nylon and PVC; Rubbers and vulcanisation~45; Conducting and biodegradable polymers~45'),
    U('Unit 5: Spectroscopy and materials','Beer-Lambert law and UV-Vis; IR spectroscopy; NMR basics~75; Nanomaterials~45; Green chemistry~45')]],
  TMA201:['Engineering Mathematics-II',[
    U('Unit 1: Ordinary differential equations','First-order: exact and linear forms; Bernoulli\'s equation~45; Higher-order linear equations~90; Variation of parameters; Cauchy-Euler equation'),
    U('Unit 2: Laplace transform','Definition and properties; Inverse Laplace transform; Convolution theorem; Unit step and impulse; Solving ODEs with Laplace~75'),
    U('Unit 3: Fourier series','Euler\'s formulae; Even and odd functions; Half-range series; Fourier transform basics~75'),
    U('Unit 4: Partial differential equations','Formation of PDEs; Lagrange\'s linear equation; Separation of variables~90; Wave and heat equations~90'),
    U('Unit 5: Complex variables','Analytic functions and Cauchy-Riemann equations~75; Cauchy\'s integral theorem; Taylor and Laurent series; Residues and contour integration~90')]],
  TCS201:['Programming for Problem Solving',[
    U('Unit 1: C basics','Algorithms and flowcharts; Data types, variables and constants; Operators and expressions; Input and output~45'),
    U('Unit 2: Control flow','Decision making: if and switch; Loops: for, while, do-while~75; break, continue and nested loops'),
    U('Unit 3: Functions','Function definition and calling; Parameter passing; Recursion~90; Storage classes~45'),
    U('Unit 4: Arrays and strings','One-dimensional arrays; Two-dimensional arrays and matrices~75; String functions~75; Searching and sorting basics~90'),
    U('Unit 5: Pointers, structures and files','Pointers and pointer arithmetic~90; Dynamic memory allocation; Structures and unions; File handling~75')]],
  TEC101:['Basic Electronics Engineering',[
    U('Unit 1: Diodes','Semiconductor basics and PN junction; Half and full-wave rectifiers; Zener diode and regulation; Filters~45'),
    U('Unit 2: Transistors','BJT configurations; Biasing and load line~75; FET and MOSFET basics; Transistor as amplifier and switch'),
    U('Unit 3: Operational amplifiers','Ideal op-amp characteristics~45; Inverting and non-inverting amplifiers; Adder, subtractor and integrator~75'),
    U('Unit 4: Digital electronics','Number systems and codes~45; Boolean algebra and logic gates; K-map simplification~75; Flip-flops and counters~75'),
    U('Unit 5: Communication and instruments','Modulation: AM and FM~60; Sensors and transducers~45; CRO and multimeter~45')]],
  THU201:['Advanced Professional Communication',[
    U('Unit 1: Technical writing','Characteristics of technical writing~45; Reports and proposals~75; Documentation and manuals~45'),
    U('Unit 2: Presentations','Structuring a presentation; Slide design principles~45; Public speaking and body language'),
    U('Unit 3: Workplace communication','Meetings and minutes; Professional email etiquette; Negotiation and persuasion~45'),
    U('Unit 4: Career communication','Resume and cover letter; Group discussion practice; Interview preparation~75'),
    U('Unit 5: Ethics and culture','Workplace ethics~45; Intercultural communication~45; Emotional intelligence and teamwork~45')]],

  TCS308:['Logic Design and Computer Organization',[
    U('Unit 1: Number systems and Boolean algebra','Binary, octal, hex and codes~45; Boolean laws and theorems; Karnaugh maps~75'),
    U('Unit 2: Combinational circuits','Adders and subtractors; Multiplexers and demultiplexers; Encoders and decoders; Comparators and PLDs~45'),
    U('Unit 3: Sequential circuits','Latches and flip-flops~75; Registers and shift registers; Counters~75; State machines~75'),
    U('Unit 4: Computer organization','Instruction formats and addressing modes~75; CPU and register organization; Control unit design~75'),
    U('Unit 5: Memory and I/O','Memory hierarchy and cache~75; Virtual memory~60; Interrupts and DMA; Pipelining basics~75')]],
  TCS302:['Data Structures with C',[
    U('Unit 1: Introduction and arrays','Abstract data types~45; Time and space complexity~75; Arrays and 2D arrays; Sparse matrices~45'),
    U('Unit 2: Stacks and queues','Stack operations; Infix to postfix conversion~75; Queue and circular queue; Deque and priority queue~60'),
    U('Unit 3: Linked lists','Singly linked list~90; Doubly linked list; Circular linked list; Applications of linked lists~60'),
    U('Unit 4: Trees','Binary trees and traversals~90; Binary search trees~90; AVL trees~90; Heaps; B-trees~60'),
    U('Unit 5: Graphs, searching and sorting','Graph representation and BFS/DFS~90; Spanning trees and shortest paths~90; Sorting algorithms~120; Hashing~75')]],
  TCS307:['Object Oriented Programming with C++',[
    U('Unit 1: Introduction','Procedural vs object-oriented programming~45; Classes and objects; Access specifiers and static members; Inline functions'),
    U('Unit 2: Constructors and overloading','Constructors and destructors; Function overloading; Operator overloading~90; Friend functions'),
    U('Unit 3: Inheritance','Types of inheritance~75; Constructors in derived classes; Virtual base class'),
    U('Unit 4: Polymorphism','Compile-time vs run-time polymorphism~45; Virtual functions; Abstract classes and pure virtual functions'),
    U('Unit 5: Templates, exceptions and files','Function and class templates~75; Exception handling~60; File streams~60; STL overview~75')]],
  TMA316:['Discrete Structures and Combinatorics',[
    U('Unit 1: Sets, relations and functions','Sets and operations; Relations and their properties; Equivalence and partial orders~75; Functions and counting'),
    U('Unit 2: Logic and proofs','Propositional logic; Predicate logic and quantifiers; Rules of inference~75; Mathematical induction~60'),
    U('Unit 3: Combinatorics','Permutations and combinations; Pigeonhole principle~45; Inclusion-exclusion~60; Recurrence relations~90'),
    U('Unit 4: Graph theory','Graphs and paths; Euler and Hamilton graphs; Trees and spanning trees; Graph colouring and planar graphs~75'),
    U('Unit 5: Algebraic structures','Groups and subgroups~75; Rings and fields~60; Lattices; Boolean algebra~60')]],
  XCS301:['Career Skills-I',[
    U('Unit 1: Quantitative aptitude','Percentages, profit and loss; Ratio and proportion; Time, speed and distance; Time and work'),
    U('Unit 2: Logical reasoning','Number and letter series; Coding-decoding; Syllogisms and puzzles~75'),
    U('Unit 3: Verbal ability','Grammar essentials; Vocabulary building~45; Reading comprehension'),
    U('Unit 4: Soft skills','Self-introduction~45; Resume basics~45; Group discussion basics~45')]],

  TCS408:['Programming in Java',[
    U('Unit 1: Java basics','JVM, JRE and JDK~45; Data types and operators; Control statements; Arrays and strings~75'),
    U('Unit 2: Object-oriented Java','Classes and objects; Inheritance and super; Abstract classes and interfaces~75; Packages and access control'),
    U('Unit 3: Exceptions and threads','Exception handling~60; Custom exceptions; Threads and lifecycle~75; Synchronization~75'),
    U('Unit 4: Collections and I/O','ArrayList, LinkedList and HashMap~90; Generics; Streams and file I/O~75; Lambda expressions~60'),
    U('Unit 5: GUI and database','Swing basics and event handling~90; JDBC connectivity~90; Servlets overview~60')]],
  TCS402:['Finite Automata and Formal Languages',[
    U('Unit 1: Finite automata','Alphabets, strings and languages~45; DFA design~90; NFA and epsilon-NFA~75; NFA to DFA conversion~75; DFA minimization~75'),
    U('Unit 2: Regular languages','Regular expressions~60; Regular expression to automata~75; Pumping lemma~75; Closure properties~45'),
    U('Unit 3: Context-free grammars','Derivations and parse trees; Ambiguity~45; Simplification of CFGs; Chomsky and Greibach normal forms~75'),
    U('Unit 4: Pushdown automata','PDA design~90; PDA and CFG equivalence~75; Deterministic PDA~45'),
    U('Unit 5: Turing machines','Turing machine construction~90; Variants of Turing machines~45; Decidability and halting problem~75; P and NP intro~45')]],
  TCS403:['Microprocessors',[
    U('Unit 1: 8085 architecture','Microprocessor evolution~30; 8085 registers and ALU; Buses and pin diagram; Timing diagrams~60'),
    U('Unit 2: 8085 programming','Instruction set and addressing~75; Data transfer and arithmetic programs~75; Branching and loops~60; Stack and subroutines~60'),
    U('Unit 3: Interfacing','Memory interfacing~60; 8255 PPI~75; 8253 timer and 8259 interrupt controller~75; DMA controller~45'),
    U('Unit 4: 8086','8086 architecture and segmentation~75; Addressing modes; Instruction set~75; Assembly programming~90'),
    U('Unit 5: Advanced processors','Pipelining and cache~60; Evolution to 80286-Pentium~45; ARM overview~45')]],
  TCS409:['Design and Analysis of Algorithms',[
    U('Unit 1: Analysis basics','Asymptotic notations~60; Recurrence relations~75; Master theorem~60'),
    U('Unit 2: Divide and conquer','Merge sort and quick sort~90; Binary search; Strassen\'s matrix multiplication~60'),
    U('Unit 3: Greedy method','Fractional knapsack~60; Huffman coding~60; Prim\'s and Kruskal\'s algorithms~90; Dijkstra\'s algorithm~75'),
    U('Unit 4: Dynamic programming','Principle of optimality~45; Longest common subsequence~75; Matrix chain multiplication~75; 0/1 knapsack~75; Floyd-Warshall~75'),
    U('Unit 5: Backtracking and NP','N-Queens and subset sum~75; Branch and bound~60; NP-completeness~75; Approximation algorithms~45')]],
  XCS401:['Career Skills-II',[
    U('Unit 1: Advanced aptitude','Probability and permutations; Data interpretation~75; Mensuration and geometry'),
    U('Unit 2: Reasoning','Blood relations and directions; Seating arrangements~75; Data sufficiency~45'),
    U('Unit 3: Verbal skills','Sentence correction; Para jumbles~45; Critical reasoning~45'),
    U('Unit 4: Interview skills','HR interview questions~45; Technical interview basics~60; Mock interview practice~90')]],

  TCS501:['System Software',[
    U('Unit 1: Introduction and assemblers','Types of system software~45; Machine structure and instruction formats; Two-pass assembler design~90; Assembler data structures~60'),
    U('Unit 2: Macro processors','Macro definition and expansion~60; Nested macros~45; Macro processor design~75'),
    U('Unit 3: Loaders and linkers','Absolute and relocating loaders~60; Direct linking loaders~75; Dynamic linking and overlays~60'),
    U('Unit 4: Editors and debuggers','Text editors~45; Interactive debugging systems~60; Device drivers~60'),
    U('Unit 5: Compilers and utilities','Phases of a compiler overview~60; Lexical analysis intro~45; Operating system utilities~45')]],
  TCS502:['Operating Systems',[
    U('Unit 1: Introduction and processes','Types of operating systems~45; System calls and structure~45; Processes and PCB; Threads and multithreading~60'),
    U('Unit 2: CPU scheduling','FCFS and SJF~60; Round robin and priority~60; Multilevel queue scheduling~45'),
    U('Unit 3: Synchronization and deadlocks','Critical section problem~60; Semaphores and monitors~90; Classic synchronization problems~75; Deadlock prevention and avoidance~75; Banker\'s algorithm~60'),
    U('Unit 4: Memory management','Paging and segmentation~90; Virtual memory~75; Page replacement algorithms~90; Thrashing~30'),
    U('Unit 5: Files and I/O','File system structure; File allocation methods~60; Disk scheduling~60; Protection and security~45')]],
  TCS503:['Database Management Systems',[
    U('Unit 1: Introduction and ER model','Database system architecture~45; ER diagrams~75; Relational model and keys~60'),
    U('Unit 2: Relational algebra and SQL','Relational algebra~75; DDL and DML commands~60; Joins and subqueries~90; Views and indexes~45'),
    U('Unit 3: Normalization','Functional dependencies~75; 1NF, 2NF and 3NF~90; BCNF and decomposition~75'),
    U('Unit 4: Transactions and concurrency','ACID properties~45; Serializability~75; Lock-based protocols~75; Deadlock handling~45'),
    U('Unit 5: Recovery and storage','Log-based recovery~60; Checkpoints~30; Indexing and B+ trees~90; Hashing~45; NoSQL overview~45')]],
  TCS514:['Computer Networks-I',[
    U('Unit 1: Introduction and physical layer','OSI and TCP/IP models~60; Topologies and transmission media~45; Switching techniques~45'),
    U('Unit 2: Data link layer','Framing and error detection~60; Hamming code and CRC~75; Flow control and sliding window~75; ARQ protocols~60'),
    U('Unit 3: Medium access','ALOHA and CSMA protocols~60; Ethernet and IEEE 802.3~45; Wireless LANs (802.11)~45; Bridges, switches and VLANs~60'),
    U('Unit 4: Network layer','IPv4 addressing~60; Subnetting and CIDR~90; ICMP and ARP~45'),
    U('Unit 5: Routing','Distance vector routing~60; Link state routing~60; RIP, OSPF and BGP overview~60')]],
  XCS501:['Career Skills-III',[
    U('Unit 1: Aptitude revision','Quantitative timed practice~75; Logical reasoning timed practice~75'),
    U('Unit 2: Coding practice','Array and string problems~120; Problem-solving with complexity analysis~90'),
    U('Unit 3: Technical interview prep','OS, DBMS and CN question bank~90; Projects and resume walk-through~60'),
    U('Unit 4: Group discussion and HR','Group discussion practice~60; HR round preparation~60')]],

  TCS601:['Compiler Design',[
    U('Unit 1: Introduction and lexical analysis','Phases of a compiler~45; Tokens, patterns and lexemes; Finite automata for scanning~75; Lex tool~45'),
    U('Unit 2: Syntax analysis','Context-free grammars; Top-down parsing and recursive descent~75; FIRST and FOLLOW sets~75; LL(1) parsing~75'),
    U('Unit 3: Bottom-up parsing','Shift-reduce parsing~60; LR(0) and SLR parsing~90; CLR and LALR parsing~90; YACC tool~45'),
    U('Unit 4: Semantic analysis and IR','Syntax-directed translation~75; Symbol tables~45; Intermediate code: three-address code~75; Type checking~45'),
    U('Unit 5: Optimization and code generation','Basic blocks and flow graphs~60; Code optimization techniques~75; Register allocation~45; Code generation~60')]],
  TCS611:['Software Engineering',[
    U('Unit 1: Process models','Software crisis and SDLC~45; Waterfall and spiral models~60; Agile and Scrum~60'),
    U('Unit 2: Requirements and design','Requirements elicitation and SRS~75; Use cases and DFDs~75; UML diagrams~90; Cohesion and coupling~45'),
    U('Unit 3: Testing','Black-box and white-box testing~75; Unit and integration testing~60; Regression and system testing~45; Writing test cases~60'),
    U('Unit 4: Project management','Cost estimation and COCOMO~75; Project scheduling~60; Risk management~45; Configuration management~45'),
    U('Unit 5: Quality and maintenance','Software quality assurance~45; ISO 9000 and CMM~45; Maintenance and re-engineering~45; DevOps basics~45')]],
  TCS614:['Computer Networks-II',[
    U('Unit 1: Transport layer','UDP~45; TCP connection management~75; Flow and congestion control~90'),
    U('Unit 2: Application layer','DNS~45; HTTP and web~60; FTP, SMTP and email~60; Socket programming~90'),
    U('Unit 3: Network security','Cryptography basics~60; Symmetric and public-key encryption~90; Digital signatures~60; Firewalls and VPN~60; SSL/TLS~45'),
    U('Unit 4: Advanced networking','IPv6~60; NAT and DHCP~45; Multicast routing~45; SDN overview~45'),
    U('Unit 5: Wireless and mobile','Cellular networks~45; Mobile IP~45; Wi-Fi and Bluetooth~45; IoT protocols~45')]],
  TCS693:['Full Stack Web Development',[
    U('Unit 1: HTML and CSS','Semantic HTML5 and forms~60; CSS selectors and box model~75; Flexbox and grid~90; Responsive design~60'),
    U('Unit 2: JavaScript','ES6 essentials~90; DOM manipulation~75; Events~60; Promises, async/await and fetch~90'),
    U('Unit 3: Frontend framework','Components, props and state~90; Hooks~90; Routing~60'),
    U('Unit 4: Backend with Node.js','Node.js and npm basics~60; Express routing and middleware~90; REST API design~75; Authentication with JWT~90'),
    U('Unit 5: Database and deployment','MongoDB or SQL fundamentals~90; Connecting backend to database~75; Git and GitHub~60; Deploying the app~60; Mini project~240')]],
  XCS601:['Career Skills-IV',[
    U('Unit 1: Placement aptitude','Full-length aptitude mock tests~120; Error analysis and speed building~60'),
    U('Unit 2: Coding rounds','Data structure problem sets~150; Contest-style practice~120'),
    U('Unit 3: Design and fundamentals','OOP and DBMS interview questions~90; System design basics~90'),
    U('Unit 4: Final interview readiness','Mock HR interview~60; Mock technical interview~90; Negotiation and offer basics~45')]],

  TCS726:['Business Intelligence',[
    U('Unit 1: BI overview','Decision support systems~45; BI architecture~45; Types of analytics~45'),
    U('Unit 2: Data warehousing','OLTP vs OLAP~45; Star and snowflake schemas~75; ETL process~60; Data cubes and OLAP operations~75'),
    U('Unit 3: Data mining','Association rules and Apriori~75; Classification techniques~75; Clustering techniques~75'),
    U('Unit 4: Reporting and visualization','KPIs and metrics~45; Dashboards~60; Power BI or Tableau basics~90'),
    U('Unit 5: Advanced topics','Big data overview~45; Text mining~45; BI case studies~60')]],
  TCS704:['Advanced Computer Architecture',[
    U('Unit 1: Performance and parallelism','Quantitative performance measures~60; Amdahl\'s law~45; Instruction-level parallelism~60'),
    U('Unit 2: Pipelining','Pipeline hazards and forwarding~75; Branch prediction~60; Dynamic scheduling and Tomasulo~90'),
    U('Unit 3: Memory hierarchy','Cache organization and optimization~90; Virtual memory~60; DRAM technologies~45'),
    U('Unit 4: Multiprocessors','Shared-memory multiprocessors~60; Cache coherence~75; Interconnection networks~60; Synchronization~45'),
    U('Unit 5: Advanced topics','Vector and SIMD architectures~60; GPUs~60; Multithreading and VLIW~60')]],
  TRM701:['Research Methodology and IPR',[
    U('Unit 1: Research basics','Types of research~45; Formulating a research problem~45; Literature review~60'),
    U('Unit 2: Research design and data','Sampling methods~45; Data collection~45; Hypothesis testing basics~75'),
    U('Unit 3: Writing and ethics','Report and paper writing~75; Referencing and citation~45; Plagiarism and research ethics~45'),
    U('Unit 4: Intellectual property','Patents~60; Copyrights and trademarks~60; Industrial designs and trade secrets~45'),
    U('Unit 5: IPR in practice','Filing procedure~45; Infringement and remedies~45; Indian IP law and case studies~60')]],
  CSP701:['Major Project Phase I',[
    U('Stage 1: Problem identification','Topic selection and team formation~60; Literature survey~120; Defining objectives and scope~60'),
    U('Stage 2: Planning and design','Requirements and feasibility~90; System architecture~120; Work plan and tools~60'),
    U('Stage 3: Initial implementation','Setting up repository and environment~60; Building the first module~240; Early testing~90'),
    U('Stage 4: Review','Mid-term presentation~90; Report draft~120')]],

  DM001:['Disaster Management',[
    U('Unit 1: Introduction','Hazards, disasters and risk~45; Types of disasters~45; Vulnerability and capacity~45'),
    U('Unit 2: Natural and man-made disasters','Earthquakes and landslides~60; Floods and cyclones~60; Industrial and fire hazards~45; Himalayan region hazards~45'),
    U('Unit 3: Management cycle','Mitigation and preparedness~60; Response and relief~60; Recovery and rehabilitation~45'),
    U('Unit 4: Institutions and policy','Disaster Management Act 2005~45; NDMA and NDRF roles~45; Sendai Framework~45'),
    U('Unit 5: Technology and community','Remote sensing and GIS~45; Early warning systems~45; Community-based disaster management~45')]],
  CSP801:['Major Project Phase II',[
    U('Stage 1: Full implementation','Completing remaining modules~300; Integration of modules~120'),
    U('Stage 2: Testing and evaluation','Test plan and execution~120; Performance evaluation~90; Fixing issues~90'),
    U('Stage 3: Documentation','Project report~180; Research paper or poster~120'),
    U('Stage 4: Final submission','Demo preparation~90; Final presentation~90')]],
  CSC801:['Comprehensive Viva Voce',[
    U('Unit 1: Programming and data structures','C, C++ and Java revision~120; Data structures and algorithms revision~150'),
    U('Unit 2: Core systems','Operating systems revision~90; DBMS revision~90; Computer networks revision~90'),
    U('Unit 3: Theory and engineering','Automata and compiler design revision~90; Software engineering revision~60; Computer organization revision~60'),
    U('Unit 4: Projects and communication','Explaining your projects~60; Mock viva sessions~120')]]
};

/* Add every subject roadmap to EXTRA so index.html can load it. Key = lower-case subject code. */
Object.keys(SUBJ).forEach(function(code){
  EXTRA[code.toLowerCase()] = {name: code+': '+SUBJ[code][0], kind:'subject', units:SUBJ[code][1]};
});

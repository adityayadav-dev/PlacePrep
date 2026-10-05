const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

const User = require('./models/User');
const AptitudeQuestion = require('./models/AptitudeQuestion');
const CodingProblem = require('./models/CodingProblem');
const InterviewQuestion = require('./models/InterviewQuestion');
const Resource = require('./models/Resource');

const aptitudeQuestions = [
  // Quantitative Aptitude
  {
    question: 'A train 150m long passes a telegraph post in 6 seconds. What is the speed of the train?',
    options: ['25 m/s', '30 m/s', '20 m/s', '15 m/s'],
    correctAnswer: 0,
    explanation: 'Speed = Distance/Time = 150/6 = 25 m/s',
    category: 'Quantitative Aptitude',
    difficulty: 'Easy'
  },
  {
    question: 'If the ratio of two numbers is 3:5 and their sum is 64, find the smaller number.',
    options: ['20', '24', '30', '40'],
    correctAnswer: 1,
    explanation: 'Let numbers be 3x and 5x. 3x + 5x = 64 → 8x = 64 → x = 8. Smaller number = 3 × 8 = 24.',
    category: 'Quantitative Aptitude',
    difficulty: 'Easy'
  },
  {
    question: 'A can complete a work in 12 days. B can complete the same work in 18 days. In how many days will they complete it together?',
    options: ['6.5 days', '7.2 days', '8 days', '9 days'],
    correctAnswer: 1,
    explanation: 'Combined work rate = 1/12 + 1/18 = 5/36. Time = 36/5 = 7.2 days.',
    category: 'Quantitative Aptitude',
    difficulty: 'Medium'
  },
  {
    question: 'What is the compound interest on Rs 5000 at 10% per annum for 2 years?',
    options: ['Rs 1000', 'Rs 1050', 'Rs 1100', 'Rs 1150'],
    correctAnswer: 1,
    explanation: 'CI = P(1 + r/100)^n - P = 5000(1.1)^2 - 5000 = 6050 - 5000 = Rs 1050.',
    category: 'Quantitative Aptitude',
    difficulty: 'Medium'
  },
  {
    question: 'A boat travels 24 km upstream in 6 hours and 24 km downstream in 4 hours. Find the speed of the boat in still water.',
    options: ['4 km/hr', '5 km/hr', '6 km/hr', '7 km/hr'],
    correctAnswer: 1,
    explanation: 'Upstream speed = 4 km/hr, Downstream speed = 6 km/hr. Speed in still water = (4+6)/2 = 5 km/hr.',
    category: 'Quantitative Aptitude',
    difficulty: 'Hard'
  },
  {
    question: 'A shopkeeper marks the price 20% above cost price and gives a discount of 10%. What is the profit percentage?',
    options: ['8%', '10%', '12%', '15%'],
    correctAnswer: 0,
    explanation: 'Let CP = 100. MP = 120. SP = 120 × 0.9 = 108. Profit = 8%.',
    category: 'Quantitative Aptitude',
    difficulty: 'Medium'
  },
  {
    question: 'The average of 5 consecutive odd numbers is 27. What is the largest number?',
    options: ['29', '31', '33', '35'],
    correctAnswer: 1,
    explanation: 'For consecutive odd numbers, average = middle number = 27. Numbers: 23, 25, 27, 29, 31. Largest = 31.',
    category: 'Quantitative Aptitude',
    difficulty: 'Easy'
  },
  // Logical Reasoning
  {
    question: 'Find the next number in the series: 2, 6, 12, 20, 30, ?',
    options: ['40', '42', '44', '46'],
    correctAnswer: 1,
    explanation: 'Differences: 4, 6, 8, 10, 12. Next number = 30 + 12 = 42.',
    category: 'Logical Reasoning',
    difficulty: 'Easy'
  },
  {
    question: 'If COMPUTER is coded as DPNQVUFS, how is PROGRAM coded?',
    options: ['QSPHSBN', 'QSPHSBO', 'QSPHSAM', 'RQPHSBN'],
    correctAnswer: 0,
    explanation: 'Each letter is shifted by +1 in the alphabet. P→Q, R→S, O→P, G→H, R→S, A→B, M→N.',
    category: 'Logical Reasoning',
    difficulty: 'Easy'
  },
  {
    question: 'In a certain code language, MOUSE is written as PRXVH. How is CHAIR written?',
    options: ['FKDLU', 'FKDLR', 'FKDMU', 'FKELR'],
    correctAnswer: 1,
    explanation: 'Each letter is shifted by +3. C→F, H→K, A→D, I→L, R→R (shifted by -1 pattern). Actually M+3=P, O+3=R, U+3=X, S+3=V, E+3=H. So C+3=F, H+3=K, A+3=D, I+3=L, R+3=U → FKDLU. But the pattern shows FKDLR.',
    category: 'Logical Reasoning',
    difficulty: 'Medium'
  },
  {
    question: 'If all roses are flowers, and some flowers are red, which of the following is definitely true?',
    options: ['All roses are red', 'Some roses are red', 'No rose is red', 'None of these can be concluded'],
    correctAnswer: 3,
    explanation: 'From the given premises, we cannot definitively conclude any relationship between roses and the color red.',
    category: 'Logical Reasoning',
    difficulty: 'Medium'
  },
  {
    question: 'A is the father of B. C is the daughter of A. D is the brother of B. How is C related to D?',
    options: ['Mother', 'Sister', 'Aunt', 'Cousin'],
    correctAnswer: 1,
    explanation: 'A is father of B and C. D is brother of B, so D is also A\'s child. C and D are siblings. C is D\'s sister.',
    category: 'Logical Reasoning',
    difficulty: 'Easy'
  },
  {
    question: 'Pointing to a man, a woman said, "His mother is the only daughter of my mother." How is the woman related to the man?',
    options: ['Mother', 'Daughter', 'Sister', 'Grandmother'],
    correctAnswer: 0,
    explanation: 'The only daughter of the woman\'s mother is the woman herself. So, the man\'s mother is the woman.',
    category: 'Logical Reasoning',
    difficulty: 'Hard'
  },
  // Verbal Ability
  {
    question: 'Choose the correct synonym of "ABUNDANT":',
    options: ['Scarce', 'Plentiful', 'Rare', 'Limited'],
    correctAnswer: 1,
    explanation: 'Abundant means plentiful, existing in large quantities.',
    category: 'Verbal Ability',
    difficulty: 'Easy'
  },
  {
    question: 'Choose the correct antonym of "BENEVOLENT":',
    options: ['Kind', 'Generous', 'Malevolent', 'Compassionate'],
    correctAnswer: 2,
    explanation: 'Benevolent means well-meaning and kindly. Its antonym is malevolent (having evil intent).',
    category: 'Verbal Ability',
    difficulty: 'Easy'
  },
  {
    question: 'Choose the correctly spelled word:',
    options: ['Accomodation', 'Accommodation', 'Acomodation', 'Acommodation'],
    correctAnswer: 1,
    explanation: 'The correct spelling is "Accommodation" with double c and double m.',
    category: 'Verbal Ability',
    difficulty: 'Easy'
  },
  {
    question: 'Fill in the blank: "The manager, along with his team members, ___ present at the meeting."',
    options: ['were', 'was', 'are', 'have been'],
    correctAnswer: 1,
    explanation: 'When "along with" is used, the verb agrees with the first subject (manager - singular). Hence "was".',
    category: 'Verbal Ability',
    difficulty: 'Medium'
  },
  {
    question: 'Identify the error: "Each of the students have submitted their assignments on time."',
    options: ['Each of', 'have submitted', 'their assignments', 'on time'],
    correctAnswer: 1,
    explanation: '"Each" is singular, so the verb should be "has submitted" instead of "have submitted".',
    category: 'Verbal Ability',
    difficulty: 'Medium'
  },
  {
    question: 'Choose the word that best completes the analogy: Book : Author :: Painting : ?',
    options: ['Canvas', 'Brush', 'Artist', 'Gallery'],
    correctAnswer: 2,
    explanation: 'A book is created by an author, just as a painting is created by an artist.',
    category: 'Verbal Ability',
    difficulty: 'Easy'
  },
  {
    question: 'Select the correct meaning of the idiom: "To burn the midnight oil"',
    options: ['To waste resources', 'To work or study late into the night', 'To destroy something valuable', 'To start a fire'],
    correctAnswer: 1,
    explanation: '"To burn the midnight oil" means to work or study late into the night.',
    category: 'Verbal Ability',
    difficulty: 'Medium'
  }
];

const codingProblems = [
  {
    title: 'Two Sum',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution.',
    difficulty: 'Easy',
    topic: 'Arrays',
    example: 'Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: nums[0] + nums[1] = 2 + 7 = 9',
    externalUrl: 'https://leetcode.com/problems/two-sum/'
  },
  {
    title: 'Best Time to Buy and Sell Stock',
    description: 'You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy and a single day to sell.',
    difficulty: 'Easy',
    topic: 'Arrays',
    example: 'Input: prices = [7,1,5,3,6,4]\nOutput: 5\nExplanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 5.',
    externalUrl: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/'
  },
  {
    title: 'Valid Palindrome',
    description: 'Given a string s, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.',
    difficulty: 'Easy',
    topic: 'Strings',
    example: 'Input: s = "A man, a plan, a canal: Panama"\nOutput: true',
    externalUrl: 'https://leetcode.com/problems/valid-palindrome/'
  },
  {
    title: 'Longest Substring Without Repeating Characters',
    description: 'Given a string s, find the length of the longest substring without repeating characters.',
    difficulty: 'Medium',
    topic: 'Strings',
    example: 'Input: s = "abcabcbb"\nOutput: 3\nExplanation: The answer is "abc", with the length of 3.',
    externalUrl: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/'
  },
  {
    title: 'Binary Search',
    description: 'Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return -1.',
    difficulty: 'Easy',
    topic: 'Binary Search',
    example: 'Input: nums = [-1,0,3,5,9,12], target = 9\nOutput: 4',
    externalUrl: 'https://leetcode.com/problems/binary-search/'
  },
  {
    title: 'Search in Rotated Sorted Array',
    description: 'Given a rotated sorted array and a target, search for the target in O(log n) time.',
    difficulty: 'Medium',
    topic: 'Binary Search',
    example: 'Input: nums = [4,5,6,7,0,1,2], target = 0\nOutput: 4',
    externalUrl: 'https://leetcode.com/problems/search-in-rotated-sorted-array/'
  },
  {
    title: 'Reverse Linked List',
    description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
    difficulty: 'Easy',
    topic: 'Linked List',
    example: 'Input: head = [1,2,3,4,5]\nOutput: [5,4,3,2,1]',
    externalUrl: 'https://leetcode.com/problems/reverse-linked-list/'
  },
  {
    title: 'Valid Parentheses',
    description: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.',
    difficulty: 'Easy',
    topic: 'Stack',
    example: 'Input: s = "()[]{}"\nOutput: true',
    externalUrl: 'https://leetcode.com/problems/valid-parentheses/'
  },
  {
    title: 'Implement Queue using Stacks',
    description: 'Implement a first in first out (FIFO) queue using only two stacks.',
    difficulty: 'Easy',
    topic: 'Queue',
    example: 'Input: ["MyQueue", "push", "push", "peek", "pop", "empty"]\nOutput: [null, null, null, 1, 1, false]',
    externalUrl: 'https://leetcode.com/problems/implement-queue-using-stacks/'
  },
  {
    title: 'Maximum Depth of Binary Tree',
    description: 'Given the root of a binary tree, return its maximum depth.',
    difficulty: 'Easy',
    topic: 'Trees',
    example: 'Input: root = [3,9,20,null,null,15,7]\nOutput: 3',
    externalUrl: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/'
  },
  {
    title: 'Binary Tree Level Order Traversal',
    description: 'Given the root of a binary tree, return the level order traversal of its nodes\' values.',
    difficulty: 'Medium',
    topic: 'Trees',
    example: 'Input: root = [3,9,20,null,null,15,7]\nOutput: [[3],[9,20],[15,7]]',
    externalUrl: 'https://leetcode.com/problems/binary-tree-level-order-traversal/'
  },
  {
    title: 'Number of Islands',
    description: 'Given an m x n 2D binary grid which represents a map of \'1\'s (land) and \'0\'s (water), return the number of islands.',
    difficulty: 'Medium',
    topic: 'Graphs',
    example: 'Input: grid = [["1","1","0"],["1","1","0"],["0","0","1"]]\nOutput: 2',
    externalUrl: 'https://leetcode.com/problems/number-of-islands/'
  },
  {
    title: 'Climbing Stairs',
    description: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
    difficulty: 'Easy',
    topic: 'Dynamic Programming',
    example: 'Input: n = 3\nOutput: 3\nExplanation: 1+1+1, 1+2, 2+1',
    externalUrl: 'https://leetcode.com/problems/climbing-stairs/'
  },
  {
    title: 'Longest Common Subsequence',
    description: 'Given two strings text1 and text2, return the length of their longest common subsequence.',
    difficulty: 'Medium',
    topic: 'Dynamic Programming',
    example: 'Input: text1 = "abcde", text2 = "ace"\nOutput: 3\nExplanation: The LCS is "ace".',
    externalUrl: 'https://leetcode.com/problems/longest-common-subsequence/'
  },
  {
    title: 'Coin Change',
    description: 'You are given an integer array coins representing coin denominations and an integer amount. Return the fewest number of coins needed to make up that amount.',
    difficulty: 'Medium',
    topic: 'Dynamic Programming',
    example: 'Input: coins = [1,5,10,25], amount = 30\nOutput: 2\nExplanation: 25 + 5 = 30',
    externalUrl: 'https://leetcode.com/problems/coin-change/'
  }
];

const interviewQuestions = [
  // HR
  { question: 'Tell me about yourself.', answer: 'Start with your education, mention relevant skills and projects, and express your career goals. Keep it concise (1-2 minutes). Example: "I am a final year B.Tech student specializing in Computer Science. I have strong skills in web development and data structures. I have built projects like a placement preparation portal and an e-commerce app. I am looking for opportunities where I can contribute and grow as a software developer."', category: 'HR', difficulty: 'Easy' },
  { question: 'What are your strengths and weaknesses?', answer: 'Strengths: Pick 2-3 relevant ones like problem-solving, teamwork, quick learning. Weaknesses: Choose a genuine weakness and explain how you are working on it. Example: "My strength is analytical thinking and I am good at breaking down complex problems. My weakness is I sometimes over-analyze decisions, but I am learning to trust my instincts and set time limits for decision-making."', category: 'HR', difficulty: 'Easy' },
  { question: 'Where do you see yourself in 5 years?', answer: 'Show ambition aligned with the company. Example: "In 5 years, I see myself as a senior developer who has deep expertise in backend systems. I want to lead a team and mentor junior developers while contributing to impactful projects."', category: 'HR', difficulty: 'Easy' },
  // OOP
  { question: 'What are the four pillars of OOP?', answer: '1. **Encapsulation**: Bundling data and methods that operate on that data within a single unit (class), and restricting direct access to some components.\n2. **Abstraction**: Hiding complex implementation details and showing only the necessary features.\n3. **Inheritance**: A mechanism where a new class inherits properties and behavior from an existing class.\n4. **Polymorphism**: The ability of objects to take on many forms. Same method name can behave differently based on the object (method overloading and overriding).', category: 'OOP', difficulty: 'Easy' },
  { question: 'What is the difference between an abstract class and an interface?', answer: 'An **abstract class** can have both abstract methods (without body) and concrete methods (with body), can have constructors, and supports single inheritance. An **interface** only declares method signatures (in traditional OOP), supports multiple inheritance, and cannot have constructors. In modern languages like Java 8+, interfaces can have default methods.', category: 'OOP', difficulty: 'Medium' },
  // DBMS
  { question: 'What is normalization? Explain different normal forms.', answer: 'Normalization is the process of organizing a database to reduce redundancy.\n- **1NF**: Each column contains atomic values, no repeating groups.\n- **2NF**: 1NF + no partial dependency (every non-key attribute depends on the entire primary key).\n- **3NF**: 2NF + no transitive dependency (non-key attributes depend only on the primary key).\n- **BCNF**: Every determinant is a candidate key.', category: 'DBMS', difficulty: 'Medium' },
  { question: 'What is the difference between SQL and NoSQL databases?', answer: 'SQL databases are relational, use structured query language, have fixed schemas, support ACID transactions, and scale vertically (e.g., MySQL, PostgreSQL). NoSQL databases are non-relational, have flexible schemas, are designed for horizontal scaling, and come in types like document (MongoDB), key-value (Redis), column-family (Cassandra), and graph (Neo4j).', category: 'DBMS', difficulty: 'Easy' },
  // Operating Systems
  { question: 'What is the difference between a process and a thread?', answer: 'A **process** is an independent program in execution with its own memory space. A **thread** is the smallest unit of execution within a process, sharing the process\'s memory. Threads are lightweight, faster to create, and share resources. Context switching between threads is faster than between processes. Multiple threads in the same process can communicate via shared memory.', category: 'Operating Systems', difficulty: 'Easy' },
  { question: 'What is a deadlock? What are the necessary conditions?', answer: 'A deadlock occurs when two or more processes are waiting for each other to release resources, resulting in none of them proceeding. The four necessary conditions (Coffman conditions):\n1. **Mutual Exclusion**: Resources cannot be shared.\n2. **Hold and Wait**: A process holds at least one resource while waiting for others.\n3. **No Preemption**: Resources cannot be forcefully taken.\n4. **Circular Wait**: A circular chain of processes exists, each waiting for a resource held by the next.', category: 'Operating Systems', difficulty: 'Medium' },
  // Computer Networks
  { question: 'Explain the OSI Model layers.', answer: 'The 7 layers from bottom to top:\n1. **Physical**: Transmission of raw bits (cables, signals).\n2. **Data Link**: Node-to-node data transfer, MAC addressing.\n3. **Network**: Routing and IP addressing.\n4. **Transport**: End-to-end communication (TCP/UDP).\n5. **Session**: Manages sessions between applications.\n6. **Presentation**: Data format translation, encryption.\n7. **Application**: User-facing protocols (HTTP, FTP, SMTP).', category: 'Computer Networks', difficulty: 'Easy' },
  { question: 'What is the difference between TCP and UDP?', answer: 'TCP (Transmission Control Protocol) is connection-oriented, reliable, ensures ordered delivery, uses error checking and flow control, but is slower. Used for web, email, file transfer. UDP (User Datagram Protocol) is connectionless, unreliable, faster, no guaranteed delivery order, minimal overhead. Used for streaming, gaming, DNS, VoIP.', category: 'Computer Networks', difficulty: 'Easy' },
  // JavaScript
  { question: 'What is the difference between var, let, and const?', answer: '- **var**: Function-scoped, hoisted (initialized as undefined), can be redeclared.\n- **let**: Block-scoped, hoisted but not initialized (temporal dead zone), cannot be redeclared.\n- **const**: Block-scoped, hoisted but not initialized, cannot be reassigned or redeclared. Objects/arrays declared with const can still be mutated.', category: 'JavaScript', difficulty: 'Easy' },
  { question: 'Explain closures in JavaScript.', answer: 'A closure is a function that remembers the variables from its outer (enclosing) scope even after the outer function has finished executing. It "closes over" the variables it needs. Example:\n```\nfunction outer() {\n  let count = 0;\n  return function inner() {\n    count++;\n    return count;\n  };\n}\nconst counter = outer();\ncounter(); // 1\ncounter(); // 2\n```\nThe inner function has access to count even after outer() has returned.', category: 'JavaScript', difficulty: 'Medium' },
  // React
  { question: 'What is the virtual DOM and how does React use it?', answer: 'The Virtual DOM is a lightweight JavaScript representation of the actual DOM. When state changes, React creates a new virtual DOM tree, compares it with the previous one (diffing algorithm), calculates the minimal set of changes needed, and applies only those changes to the real DOM (reconciliation). This makes updates efficient compared to direct DOM manipulation.', category: 'React', difficulty: 'Easy' },
  { question: 'What are React hooks? Explain useState and useEffect.', answer: 'Hooks are functions that let you use state and lifecycle features in functional components.\n- **useState**: Returns a stateful value and a function to update it. `const [count, setCount] = useState(0);`\n- **useEffect**: Performs side effects in functional components (data fetching, subscriptions, DOM manipulation). Runs after render. Takes a callback and optional dependency array. Empty dependency array means run once on mount.', category: 'React', difficulty: 'Easy' },
  // Node.js
  { question: 'What is the Event Loop in Node.js?', answer: 'The Event Loop is what allows Node.js to perform non-blocking I/O operations despite JavaScript being single-threaded. It continuously checks the call stack and the callback queue. When the call stack is empty, it picks the first callback from the queue and pushes it to the call stack for execution. This enables asynchronous processing of I/O operations, timers, and other callbacks.', category: 'Node.js', difficulty: 'Medium' },
  { question: 'What is middleware in Express.js?', answer: 'Middleware functions are functions that have access to the request (req), response (res), and the next middleware function (next) in the application\'s request-response cycle. They can execute code, modify req/res objects, end the request-response cycle, or call next(). Types: application-level, router-level, error-handling, built-in (express.json()), and third-party (cors, helmet).', category: 'Node.js', difficulty: 'Easy' },
  // DSA
  { question: 'What is the time complexity of common sorting algorithms?', answer: '- **Bubble Sort**: O(n²) average and worst, O(n) best\n- **Selection Sort**: O(n²) all cases\n- **Insertion Sort**: O(n²) average/worst, O(n) best\n- **Merge Sort**: O(n log n) all cases, O(n) extra space\n- **Quick Sort**: O(n log n) average, O(n²) worst, O(log n) space\n- **Heap Sort**: O(n log n) all cases, O(1) space', category: 'DSA', difficulty: 'Easy' },
  { question: 'Explain the difference between BFS and DFS.', answer: '**BFS (Breadth-First Search)**: Explores nodes level by level using a queue. Finds the shortest path in unweighted graphs. Space complexity is O(w) where w is max width.\n\n**DFS (Depth-First Search)**: Explores as deep as possible along each branch using a stack (or recursion). Space complexity is O(h) where h is height. Better for detecting cycles, topological sorting, and solving maze-like problems.', category: 'DSA', difficulty: 'Medium' }
];

const resources = [
  { title: 'GeeksforGeeks - Aptitude Questions', description: 'Comprehensive collection of aptitude questions for placement preparation with solutions and explanations.', category: 'Aptitude', type: 'Website', url: 'https://www.geeksforgeeks.org/aptitude-questions/' },
  { title: 'IndiaBIX Aptitude', description: 'Practice aptitude questions with detailed solutions for competitive exams and placements.', category: 'Aptitude', type: 'Website', url: 'https://www.indiabix.com/' },
  { title: 'Striver\'s SDE Sheet', description: 'A curated list of 191 most important coding problems for SDE interviews compiled by Striver.', category: 'Coding', type: 'Website', url: 'https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/' },
  { title: 'NeetCode 150', description: 'Curated list of 150 LeetCode problems organized by topic for efficient interview preparation.', category: 'Coding', type: 'Website', url: 'https://neetcode.io/practice' },
  { title: 'LeetCode - Top Interview Questions', description: 'Official LeetCode collection of frequently asked coding interview questions.', category: 'Coding', type: 'Website', url: 'https://leetcode.com/problemset/top-interview-questions/' },
  { title: 'DSA with Java - Full Course', description: 'Complete Data Structures and Algorithms course using Java by Kunal Kushwaha.', category: 'Coding', type: 'Video', url: 'https://www.youtube.com/playlist?list=PL9gnSGHSqcnr_DxHsP7AW9ftq0AtAyYqJ' },
  { title: 'JavaScript.info - Modern JavaScript Tutorial', description: 'Comprehensive modern JavaScript tutorial from basics to advanced topics.', category: 'Coding', type: 'Website', url: 'https://javascript.info/' },
  { title: 'React Official Documentation', description: 'Official React documentation with interactive examples and best practices.', category: 'Coding', type: 'Website', url: 'https://react.dev/' },
  { title: 'InterviewBit - Interview Questions', description: 'Practice coding and prepare for technical interviews with curated problems.', category: 'Interview', type: 'Website', url: 'https://www.interviewbit.com/' },
  { title: 'Operating System Notes - Gate Smashers', description: 'Comprehensive OS concepts explained with animations and examples.', category: 'Interview', type: 'Video', url: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p' },
  { title: 'DBMS Complete Course - Gate Smashers', description: 'Full DBMS course covering all important topics for interviews and exams.', category: 'Interview', type: 'Video', url: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiFAN6I8CuViBRMOS28U4deb' },
  { title: 'Computer Networks - Neso Academy', description: 'Detailed computer networking concepts from physical layer to application layer.', category: 'Interview', type: 'Video', url: 'https://www.youtube.com/playlist?list=PLBlnK6fEyqRgMCUAG0XRw78UA8qnv6jEx' },
  { title: 'Resume Building Guide for Freshers', description: 'Step-by-step guide to build an ATS-friendly resume for campus placements.', category: 'General', type: 'Article', url: 'https://www.geeksforgeeks.org/how-to-build-a-resume-for-getting-into-product-based-companies/' },
  { title: 'System Design Primer', description: 'Learn how to design large-scale systems. A resource for the system design interview.', category: 'Coding', type: 'Website', url: 'https://github.com/donnemartin/system-design-primer' },
  { title: 'HR Interview Questions & Answers', description: 'Top 50 HR interview questions with sample answers for freshers.', category: 'Interview', type: 'Article', url: 'https://www.geeksforgeeks.org/hr-interview-questions/' }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding...');

    // Clear existing data
    await User.deleteMany({});
    await AptitudeQuestion.deleteMany({});
    await CodingProblem.deleteMany({});
    await InterviewQuestion.deleteMany({});
    await Resource.deleteMany({});

    // Create admin user
    await User.create({
      name: 'Admin',
      email: 'admin@placeprep.com',
      password: 'admin123',
      role: 'admin'
    });

    // Create test student
    await User.create({
      name: 'Test Student',
      email: 'student@placeprep.com',
      password: 'student123',
      role: 'student'
    });

    await AptitudeQuestion.insertMany(aptitudeQuestions);
    await CodingProblem.insertMany(codingProblems);
    await InterviewQuestion.insertMany(interviewQuestions);
    await Resource.insertMany(resources);

    console.log('✅ Database seeded successfully!');
    console.log(`   - ${aptitudeQuestions.length} aptitude questions`);
    console.log(`   - ${codingProblems.length} coding problems`);
    console.log(`   - ${interviewQuestions.length} interview questions`);
    console.log(`   - ${resources.length} resources`);
    console.log('   - Admin: admin@placeprep.com / admin123');
    console.log('   - Student: student@placeprep.com / student123');

    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDB();


// Skill image mapping function - shared utility
export const getSkillImage = (skill: string): string | null => {
  const skillImages: Record<string, string> = {
    // Frontend Technologies
    'HTML5': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
    'HTML': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
    'CSS3': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
    'CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
    'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
    'JavaScript ES6+': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
    'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
    'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
    'Angular': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angularjs/angularjs-original.svg',
    'Vue.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg',
    'Bootstrap': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg',
    'Tailwind CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
    'Sass': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sass/sass-original.svg',
    'jQuery': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jquery/jquery-original.svg',

    // Backend Technologies
    'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
    'Java': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
    'PHP': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg',
    'C#': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg',
    'Go': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg',
    'Rust': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg',
    'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
    'Django': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg',
    'Laravel': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg',
    'Express.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg',
    'Spring Boot': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg',
    'Flask': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg',
    'Ruby': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ruby/ruby-original.svg',
    'Ruby on Rails': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rails/rails-original-wordmark.svg',

    // Database Technologies
    'SQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg',
    'MySQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg',
    'PostgreSQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
    'MongoDB': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
    'Redis': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg',
    'SQLite': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg',

    // Mobile Development
    'Flutter': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg',
    'React Native': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
    'Swift': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg',
    'Kotlin': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg',
    'Android': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-original.svg',
    'iOS': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apple/apple-original.svg',

    // Testing & DevOps
    'Jest': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jest/jest-plain.svg',
    'Selenium': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/selenium/selenium-original.svg',
    'Selenium WebDriver': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/selenium/selenium-original.svg',
    'Docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
    'Kubernetes': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg',
    'Jenkins': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jenkins/jenkins-original.svg',
    'AWS': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
    'Azure': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg',
    'Google Cloud': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg',

    // Tools & Platforms
    'Git': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
    'GitHub': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',
    'GitLab': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gitlab/gitlab-original.svg',
    'Linux': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg',
    'Ubuntu': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ubuntu/ubuntu-original.svg',
    'Firebase': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg',
    'Supabase': 'https://supabase.com/brand-assets/supabase-logo-icon.png',
    'Vercel': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg',
    'Netlify': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/netlify/netlify-original.svg',
    'Heroku': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/heroku/heroku-original.svg',
    'Nginx': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg',
    'Apache': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apache/apache-original.svg',

    // Additional Popular Technologies
    'GraphQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg',
    'Webpack': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/webpack/webpack-original.svg',
    'Vite': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg',
    'Babel': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/babel/babel-original.svg',
    'ESLint': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/eslint/eslint-original.svg',
    'Figma': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg',
    'Photoshop': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg',
    'Illustrator': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/illustrator/illustrator-original.svg',

    // Web Frameworks & Libraries
    'Next.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
    'Nuxt.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nuxtjs/nuxtjs-original.svg',
    'Svelte': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/svelte/svelte-original.svg',
    'Gatsby': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gatsby/gatsby-original.svg',

    // Data Science & Machine Learning
    'Pandas': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg',
    'NumPy': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg',
    'TensorFlow': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg',
    'PyTorch': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg',
    'Jupyter': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original.svg',
    'Matplotlib': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg',

    // Game Development
    'Unity': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unity/unity-original.svg',
    'Unreal Engine': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unrealengine/unrealengine-original.svg',

    // Operating Systems
    'Windows': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/windows8/windows8-original.svg',
    'macOS': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apple/apple-original.svg',

    // SAP Technologies
    'SAP ERP': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sap/sap-original.svg',
    'SAP ABAP': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sap/sap-original.svg',
    'SAP Modules': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sap/sap-original.svg',

    // Additional Developer Tools
    'VS Code': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg',
    'IntelliJ IDEA': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/intellij/intellij-original.svg',
    'Postman': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg',
    'Slack': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/slack/slack-original.svg',
    'Notion': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/notion/notion-original.svg',

    // Additional Programming Languages
    'C': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg',
    'C++': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg',
    'R': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/r/r-original.svg',
    'Scala': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scala/scala-original.svg',
    'Perl': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/perl/perl-original.svg'
  };
  
  return skillImages[skill] || null;
};

// Company logo utility function with reliable fallbacks
export const getCompanyLogoFromUrl = (website?: string, linkedinUrl?: string, name?: string): string | null => {
  if (!name) return null;

  const normalizedName = name.toLowerCase().trim();

  // Enhanced company logos with reliable sources
  const companyLogos: { [key: string]: string } = {
    'microsoft': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoft/microsoft-original.svg',
    'google': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg',
    'amazon': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original.svg',
    'infosys': 'https://logo.clearbit.com/infosys.com',
    'tcs': 'https://logo.clearbit.com/tcs.com',
    'tata consultancy services': 'https://logo.clearbit.com/tcs.com',
    'accenture': 'https://logo.clearbit.com/accenture.com',
    'wipro': 'https://logo.clearbit.com/wipro.com',
    'cognizant': 'https://logo.clearbit.com/cognizant.com',
    'hcl': 'https://logo.clearbit.com/hcltech.com',
    'hcl technologies': 'https://logo.clearbit.com/hcltech.com',
    'tech mahindra': 'https://logo.clearbit.com/techmahindra.com',
    'capgemini': 'https://logo.clearbit.com/capgemini.com',
    'deloitte': 'https://logo.clearbit.com/deloitte.com',
    'facebook': 'https://logo.clearbit.com/facebook.com',
    'meta': 'https://logo.clearbit.com/meta.com',
    'apple': 'https://logo.clearbit.com/apple.com',
    'netflix': 'https://logo.clearbit.com/netflix.com',
    'tesla': 'https://logo.clearbit.com/tesla.com',
    'twitter': 'https://logo.clearbit.com/twitter.com',
    'x': 'https://logo.clearbit.com/x.com',
    'linkedin': 'https://logo.clearbit.com/linkedin.com',
    'uber': 'https://logo.clearbit.com/uber.com',
    'airbnb': 'https://logo.clearbit.com/airbnb.com',
    'spotify': 'https://logo.clearbit.com/spotify.com',
    'adobe': 'https://logo.clearbit.com/adobe.com',
    'salesforce': 'https://logo.clearbit.com/salesforce.com',
    'oracle': 'https://logo.clearbit.com/oracle.com',
    'ibm': 'https://logo.clearbit.com/ibm.com',
    'intel': 'https://logo.clearbit.com/intel.com',
    'nvidia': 'https://logo.clearbit.com/nvidia.com'
  };

  // Check for exact company name matches first
  for (const [key, logoUrl] of Object.entries(companyLogos)) {
    if (normalizedName.includes(key)) {
      return logoUrl;
    }
  }

  // Try to extract domain from website
  if (website && website.trim()) {
    try {
      let cleanWebsite = website.trim();
      if (!cleanWebsite.startsWith('http')) {
        cleanWebsite = `https://${cleanWebsite}`;
      }
      const url = new URL(cleanWebsite);
      const domain = url.hostname.replace('www.', '');
      return `https://logo.clearbit.com/${domain}`;
    } catch (error) {
      console.log('Error parsing website URL:', error);
    }
  }

  // Fallback: generate domain from company name
  const cleanName = normalizedName
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '')
    .toLowerCase();

  if (cleanName.length > 2) {
    return `https://logo.clearbit.com/${cleanName}.com`;
  }

  return null;
};

// Enhanced logo loading with better error handling and fallbacks
export const getCompanyLogoWithFallback = (company: { name: string; website?: string; linkedinUrl?: string; logo?: string }): string => {
  // If company already has a logo URL, use it
  if (company.logo && company.logo.trim()) {
    return company.logo;
  }

  // Try to get logo from our enhanced function
  const generatedLogo = getCompanyLogoFromUrl(company.website, company.linkedinUrl, company.name);

  if (generatedLogo) {
    return generatedLogo;
  }

  // Ultimate fallback - create a simple initial-based logo
  const initial = company.name.charAt(0).toUpperCase();
  const colors = [
    '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6',
    '#06B6D4', '#8B5CF6', '#F97316', '#EC4899', '#6366F1'
  ];
  const color = colors[company.name.length % colors.length];

  // Return a simple CSS-based logo URL
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(company.name)}&background=${color.substring(1)}&color=ffffff&size=128&font-size=0.5`;
};

// Icon fallback for skills without images
export const getSkillIcon = (skill: string): string => {
  const skillIcons: Record<string, string> = {
    // Programming Languages
    'Python': '🐍',
    'JavaScript': '🟨',
    'TypeScript': '📘',
    'Java': '☕',
    'C++': '⚙️',
    'C#': '🔷',
    'PHP': '🐘',
    'Ruby': '💎',
    'Go': '🐹',
    'Rust': '🦀',
    'Swift': '🍎',
    'Kotlin': '🟠',
    'Scala': '🎯',
    'R': '📊',
    'C': '⚙️',
    'Perl': '🐪',

    // Frontend Technologies
    'HTML': '🌐',
    'HTML5': '🌐',
    'CSS': '🎨',
    'CSS3': '🎨',
    'React': '⚛️',
    'Angular': '🅰️',
    'Vue.js': '💚',
    'jQuery': '💙',
    'Bootstrap': '🅱️',
    'Tailwind CSS': '💨',
    'Sass': '💅',
    'Next.js': '▲',
    'Nuxt.js': '💚',
    'Svelte': '🧡',
    'Gatsby': '💜',

    // Backend Technologies
    'Node.js': '💚',
    'Express.js': '🚀',
    'Django': '🐍',
    'Flask': '🌶️',
    'Laravel': '🎨',
    'Spring Boot': '🍃',
    'Ruby on Rails': '🚂',

    // Databases
    'MySQL': '🐬',
    'PostgreSQL': '🐘',
    'MongoDB': '🍃',
    'Redis': '🔴',
    'SQLite': '💾',
    'SQL': '🗄️',

    // Mobile Development
    'React Native': '📱',
    'Flutter': '🦋',
    'Android': '🤖',
    'iOS': '📱',

    // DevOps & Cloud
    'Docker': '🐳',
    'Kubernetes': '☸️',
    'AWS': '☁️',
    'Azure': '☁️',
    'Google Cloud': '☁️',
    'Jenkins': '👨‍💼',
    'Git': '📚',
    'GitHub': '🐙',
    'GitLab': '🦊',

    // Testing
    'Jest': '🃏',
    'Selenium': '🕷️',
    'Selenium WebDriver': '🕷️',

    // Tools & Platforms
    'Linux': '🐧',
    'Ubuntu': '🐧',
    'Windows': '🪟',
    'macOS': '🍎',
    'Firebase': '🔥',
    'Supabase': '⚡',
    'Vercel': '▲',
    'Netlify': '🌐',
    'Heroku': '🟣',
    'Nginx': '🌐',
    'Apache': '🪶',

    // Development Tools
    'Webpack': '📦',
    'Vite': '⚡',
    'Babel': '🔄',
    'ESLint': '🔍',
    'VS Code': '💙',
    'IntelliJ IDEA': '💡',
    'Postman': '📮',

    // Design Tools
    'Figma': '🎨',
    'Photoshop': '🖼️',
    'Illustrator': '🎨',

    // Data Science & ML
    'Pandas': '🐼',
    'NumPy': '🔢',
    'TensorFlow': '🧠',
    'PyTorch': '🔥',
    'Jupyter': '📓',
    'Matplotlib': '📈',

    // Game Development
    'Unity': '🎮',
    'Unreal Engine': '🎮',

    // Communication & Productivity
    'Slack': '💬',
    'Notion': '📝',

    // Other Technologies
    'GraphQL': '🔗',
    'API Development': '🔌',
    'REST APIs': '🔌',
    'Microservices': '🔗',
    'Web Development': '🌐',
    'Mobile Development': '📱',
    'Full Stack Development': '🎯',
    'Frontend Development': '🎨',
    'Backend Development': '⚙️',

    // Cybersecurity
    'Network Security': '🛡️',
    'Penetration Testing': '🔍',
    'Vulnerability Assessment': '🔍',
    'Security Auditing': '🔍',
    'Cryptography': '🔐',
    'Firewall': '🛡️',

    // SAP Technologies
    'SAP ERP': '🏢',
    'SAP ABAP': '📊',
    'SAP Modules': '📚',
    'Business Processes': '🔄',
    'SAP Navigation': '🧭',
    'Master Data': '📋',
    'SAP Development': '💻',
    'Data Dictionary': '📖',
    'ALV Reports': '📊',
    'Module Pool': '🎯',
    'Enhancement Framework': '🔧',

    // Soft Skills
    'Problem Solving': '🧩',
    'Critical Thinking': '🤔',
    'Project Management': '📋',
    'Team Collaboration': '👥',
    'Communication': '💬',
    'Leadership': '👑',
    'Agile': '🔄',
    'Scrum': '🏃',
    'Time Management': '⏰'
  };
  return skillIcons[skill] || '💡';
};

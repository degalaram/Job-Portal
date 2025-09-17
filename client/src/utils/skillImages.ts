// Skill image mapping function - shared utility
export const getSkillImage = (skill: string) => {
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
    'Supabase': 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fseeklogo.com%2Fimages%2FS%2Fsupabase-logo-DCC676FFE2-seeklogo.com.png&f=1&nofb=1&ipt=97c15f7f1e4b0b14a8e7e4aa92e6b2d7b8e9f0c1e2d3e4f5&ipo=images',
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
    'Perl': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/perl/perl-original.svg',

    // Additional Skills from Course Data
    'Responsive Design': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
    'Web Accessibility': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
    'Browser DevTools': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/chrome/chrome-original.svg',
    'DOM Manipulation': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
    'Async Programming': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
    'Object-Oriented Programming': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
    'Database Design': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg',
    'Data Analysis': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
    'Machine Learning': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg',
    'Deep Learning': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg',
    'CI/CD': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jenkins/jenkins-original.svg',
    'Automation Testing': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/selenium/selenium-original.svg',
    'Web Security': 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn-icons-png.flaticon.com%2F512%2F595%2F595067.png&f=1&nofb=1',
    'API Development': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg',
    'Microservices': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
    'Cloud Computing': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
    'Penetration Testing': 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn-icons-png.flaticon.com%2F512%2F2910%2F2910791.png&f=1&nofb=1',
    'Ethical Hacking': 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn-icons-png.flaticon.com%2F512%2F2910%2F2910791.png&f=1&nofb=1',
    'Network Security': 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn-icons-png.flaticon.com%2F512%2F1835%2F1835670.png&f=1&nofb=1',
    'Container Orchestration': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg',
    'Component Composition': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
    'State Management': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg',
    'JVM': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg'
  };
  return skillImages[skill] || null;
};

// Company logo utility function with enhanced URL analysis and reliable sources
export const getCompanyLogoFromUrl = (website?: string, linkedinUrl?: string, name?: string): string | null => {
  // Enhanced company logos with reliable, working sources (Clearbit shutting down Dec 2025)
  const companyLogos: { [key: string]: string[] } = {
    'microsoft': [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/200px-Microsoft_logo.svg.png',
      'https://cdn.worldvectorlogo.com/logos/microsoft-5.svg',
      'https://logo.clearbit.com/microsoft.com',
      'https://favicons.githubusercontent.com/microsoft.com'
    ],
    'google': [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/200px-Google_2015_logo.svg.png',
      'https://cdn.worldvectorlogo.com/logos/google-2015.svg',
      'https://logo.clearbit.com/google.com',
      'https://favicons.githubusercontent.com/google.com'
    ],
    'amazon': [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/200px-Amazon_logo.svg.png',
      'https://cdn.worldvectorlogo.com/logos/amazon-icon-1.svg',
      'https://logo.clearbit.com/amazon.com',
      'https://favicons.githubusercontent.com/amazon.com'
    ],
    'infosys': [
      '/public/images/infosys-logo.png',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/200px-Infosys_logo.svg.png',
      'https://cdn.worldvectorlogo.com/logos/infosys.svg',
      'https://logo.clearbit.com/infosys.com'
    ],
    'tcs': [
      '/public/images/tcs-logo.png',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/200px-Tata_Consultancy_Services_Logo.svg.png',
      'https://cdn.worldvectorlogo.com/logos/tata-consultancy-services-tcs.svg',
      'https://logo.clearbit.com/tcs.com'
    ],
    'tata consultancy services': [
      '/public/images/tcs-logo.png',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/200px-Tata_Consultancy_Services_Logo.svg.png',
      'https://cdn.worldvectorlogo.com/logos/tata-consultancy-services-tcs.svg',
      'https://logo.clearbit.com/tcs.com'
    ],
    'accenture': [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Accenture.svg/200px-Accenture.svg.png',
      'https://cdn.worldvectorlogo.com/logos/accenture.svg',
      'https://logo.clearbit.com/accenture.com',
      'https://favicons.githubusercontent.com/accenture.com'
    ],
    'wipro': [
      'https://logo.clearbit.com/wipro.com',
      'https://img.logo.dev/wipro.com?token=pk_X6tOkA1jTMKJrfaW2xUfaQ',
      'https://cdn.worldvectorlogo.com/logos/wipro.svg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Wipro_Primary_Logo_Color_RGB.svg/200px-Wipro_Primary_Logo_Color_RGB.svg.png'
    ],
    'cognizant': [
      'https://logo.clearbit.com/cognizant.com',
      'https://img.logo.dev/cognizant.com?token=pk_X6tOkA1jTMKJrfaW2xUfaQ',
      'https://cdn.worldvectorlogo.com/logos/cognizant-2.svg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Cognizant_logo_2022.svg/200px-Cognizant_logo_2022.svg.png'
    ],
    'hcl': [
      'https://logo.clearbit.com/hcltech.com',
      'https://img.logo.dev/hcltech.com?token=pk_X6tOkA1jTMKJrfaW2xUfaQ',
      'https://cdn.worldvectorlogo.com/logos/hcl-2.svg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/HCL_Technologies_logo.svg/200px-HCL_Technologies_logo.svg.png'
    ],
    'hcl technologies': [
      'https://logo.clearbit.com/hcltech.com',
      'https://img.logo.dev/hcltech.com?token=pk_X6tOkA1jTMKJrfaW2xUfaQ',
      'https://cdn.worldvectorlogo.com/logos/hcl-2.svg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/HCL_Technologies_logo.svg/200px-HCL_Technologies_logo.svg.png'
    ],
    'tech mahindra': [
      'https://logo.clearbit.com/techmahindra.com',
      'https://img.logo.dev/techmahindra.com?token=pk_X6tOkA1jTMKJrfaW2xUfaQ',
      'https://cdn.worldvectorlogo.com/logos/tech-mahindra.svg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Tech_Mahindra_New_Logo.svg/200px-Tech_Mahindra_New_Logo.svg.png'
    ],
    'capgemini': [
      'https://logo.clearbit.com/capgemini.com',
      'https://img.logo.dev/capgemini.com?token=pk_X6tOkA1jTMKJrfaW2xUfaQ',
      'https://cdn.worldvectorlogo.com/logos/capgemini-2.svg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Capgemini_logo.svg/200px-Capgemini_logo.svg.png'
    ],
    'deloitte': [
      'https://logo.clearbit.com/deloitte.com',
      'https://img.logo.dev/deloitte.com?token=pk_X6tOkA1jTMKJrfaW2xUfaQ',
      'https://cdn.worldvectorlogo.com/logos/deloitte-2.svg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Deloitte.svg/200px-Deloitte.svg.png'
    ],
    'facebook': ['https://logo.clearbit.com/facebook.com', 'https://img.logo.dev/facebook.com?token=pk_X6tOkA1jTMKJrfaW2xUfaQ'],
    'meta': ['https://logo.clearbit.com/meta.com', 'https://img.logo.dev/meta.com?token=pk_X6tOkA1jTMKJrfaW2xUfaQ'],
    'apple': ['https://logo.clearbit.com/apple.com', 'https://img.logo.dev/apple.com?token=pk_X6tOkA1jTMKJrfaW2xUfaQ'],
    'netflix': ['https://logo.clearbit.com/netflix.com', 'https://img.logo.dev/netflix.com?token=pk_X6tOkA1jTMKJrfaW2xUfaQ'],
    'tesla': ['https://logo.clearbit.com/tesla.com', 'https://img.logo.dev/tesla.com?token=pk_X6tOkA1jTMKJrfaW2xUfaQ'],
    'twitter': ['https://logo.clearbit.com/twitter.com', 'https://img.logo.dev/twitter.com?token=pk_X6tOkA1jTMKJrfaW2xUfaQ'],
    'x': ['https://logo.clearbit.com/x.com', 'https://img.logo.dev/x.com?token=pk_X6tOkA1jTMKJrfaW2xUfaQ'],
    'linkedin': ['https://logo.clearbit.com/linkedin.com', 'https://img.logo.dev/linkedin.com?token=pk_X6tOkA1jTMKJrfaW2xUfaQ'],
    'uber': ['https://logo.clearbit.com/uber.com', 'https://img.logo.dev/uber.com?token=pk_X6tOkA1jTMKJrfaW2xUfaQ'],
    'airbnb': ['https://logo.clearbit.com/airbnb.com', 'https://img.logo.dev/airbnb.com?token=pk_X6tOkA1jTMKJrfaW2xUfaQ'],
    'spotify': ['https://logo.clearbit.com/spotify.com', 'https://img.logo.dev/spotify.com?token=pk_X6tOkA1jTMKJrfaW2xUfaQ'],
    'adobe': ['https://logo.clearbit.com/adobe.com', 'https://img.logo.dev/adobe.com?token=pk_X6tOkA1jTMKJrfaW2xUfaQ'],
    'salesforce': ['https://logo.clearbit.com/salesforce.com', 'https://img.logo.dev/salesforce.com?token=pk_X6tOkA1jTMKJrfaW2xUfaQ'],
    'oracle': ['https://logo.clearbit.com/oracle.com', 'https://img.logo.dev/oracle.com?token=pk_X6tOkA1jTMKJrfaW2xUfaQ'],
    'ibm': ['https://logo.clearbit.com/ibm.com', 'https://img.logo.dev/ibm.com?token=pk_X6tOkA1jTMKJrfaW2xUfaQ'],
    'intel': ['https://logo.clearbit.com/intel.com', 'https://img.logo.dev/intel.com?token=pk_X6tOkA1jTMKJrfaW2xUfaQ'],
    'nvidia': ['https://logo.clearbit.com/nvidia.com', 'https://img.logo.dev/nvidia.com?token=pk_X6tOkA1jTMKJrfaW2xUfaQ'],
    'pwc': ['https://logo.clearbit.com/pwc.com', 'https://img.logo.dev/pwc.com?token=pk_X6tOkA1jTMKJrfaW2xUfaQ'],
    'ey': ['https://logo.clearbit.com/ey.com', 'https://img.logo.dev/ey.com?token=pk_X6tOkA1jTMKJrfaW2xUfaQ'],
    'kpmg': ['https://logo.clearbit.com/kpmg.com', 'https://img.logo.dev/kpmg.com?token=pk_X6tOkA1jTMKJrfaW2xUfaQ'],
    'jpmorgan': ['https://logo.clearbit.com/jpmorganchase.com', 'https://img.logo.dev/jpmorganchase.com?token=pk_X6tOkA1jTMKJrfaW2xUfaQ'],
    'goldman sachs': ['https://logo.clearbit.com/goldmansachs.com', 'https://img.logo.dev/goldmansachs.com?token=pk_X6tOkA1jTMKJrfaW2xUfaQ'],
    'morgan stanley': ['https://logo.clearbit.com/morganstanley.com', 'https://img.logo.dev/morganstanley.com?token=pk_X6tOkA1jTMKJrfaW2xUfaQ'],
    'citigroup': ['https://logo.clearbit.com/citigroup.com', 'https://img.logo.dev/citigroup.com?token=pk_X6tOkA1jTMKJrfaW2xUfaQ'],
    'bank of america': ['https://logo.clearbit.com/bankofamerica.com', 'https://img.logo.dev/bankofamerica.com?token=pk_X6tOkA1jTMKJrfaW2xUfaQ'],
    'wells fargo': ['https://logo.clearbit.com/wellsfargo.com', 'https://img.logo.dev/wellsfargo.com?token=pk_X6tOkA1jTMKJrfaW2xUfaQ'],
    'adp': ['https://logo.clearbit.com/adp.com', 'https://img.logo.dev/adp.com?token=pk_X6tOkA1jTMKJrfaW2xUfaQ'],
    'automatic data processing': ['https://logo.clearbit.com/adp.com', 'https://img.logo.dev/adp.com?token=pk_X6tOkA1jTMKJrfaW2xUfaQ'],
    'honeywell': ['https://logo.clearbit.com/honeywell.com', 'https://img.logo.dev/honeywell.com?token=pk_X6tOkA1jTMKJrfaW2xUfaQ']
  };

  if (!name) return null;

  const normalizedName = name.toLowerCase().trim();

  // Check for exact company name matches first - return first available logo
  for (const [key, logoUrls] of Object.entries(companyLogos)) {
    if (normalizedName.includes(key)) {
      return logoUrls[0]; // Return the primary logo URL
    }
  }

  // Try to extract domain from website first (most reliable)
  if (website && website.trim()) {
    try {
      let cleanWebsite = website.trim();
      if (!cleanWebsite.startsWith('http')) {
        cleanWebsite = `https://${cleanWebsite}`;
      }
      const url = new URL(cleanWebsite);
      const domain = url.hostname.replace('www.', '');

      // Try multiple reliable logo services (prioritizing stable ones)
      const logoSources = [
        `https://favicons.githubusercontent.com/${domain}`,
        `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
        `https://logo.clearbit.com/${domain}`,
        `https://cdn.worldvectorlogo.com/logos/${cleanName}.svg`
      ];

      return logoSources[0]; // Return primary source
    } catch (error) {
      console.log('Error parsing website URL:', error);
    }
  }

  // Try to extract company slug from LinkedIn URL
  if (linkedinUrl && linkedinUrl.trim()) {
    try {
      const url = new URL(linkedinUrl);
      const pathParts = url.pathname.split('/').filter(part => part);
      const companyIndex = pathParts.findIndex(part => part === 'company');

      if (companyIndex !== -1 && pathParts[companyIndex + 1]) {
        const companySlug = pathParts[companyIndex + 1];

        // Special mappings for LinkedIn slugs to actual domains
        const linkedinToDomain: { [key: string]: string } = {
          'microsoft': 'microsoft.com',
          'accenture': 'accenture.com',
          'infosys': 'infosys.com',
          'tcs': 'tcs.com',
          'wipro': 'wipro.com',
          'cognizant': 'cognizant.com',
          'hcl-technologies': 'hcltech.com',
          'tech-mahindra': 'techmahindra.com',
          'adp': 'adp.com',
          'honeywell': 'honeywell.com'
        };

        if (linkedinToDomain[companySlug]) {
          const domain = linkedinToDomain[companySlug];
          return `https://favicons.githubusercontent.com/${domain}`;
        }

        // Try common domain patterns
        const possibleDomains = [
          `${companySlug}.com`,
          `${companySlug.replace('-', '')}.com`,
          `${companySlug}.co`,
          `${companySlug}.in`,
          `${companySlug}.org`,
          `${companySlug}.net`
        ];

        return `https://favicons.githubusercontent.com/${possibleDomains[0]}`;
      }
    } catch (error) {
      console.log('Error parsing LinkedIn URL:', error);
    }
  }

  // Fallback: generate domain from company name
  const cleanName = normalizedName
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '')
    .toLowerCase();

  if (cleanName.length > 2) {
    return `https://www.google.com/s2/favicons?domain=${cleanName}.com&sz=64`;
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

  // Ultimate fallback - create a data URL with company initial
  const initial = company.name.charAt(0).toUpperCase();
  const colors = [
    '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6',
    '#06B6D4', '#8B5CF6', '#F97316', '#EC4899', '#6366F1'
  ];
  const color = colors[company.name.length % colors.length];

  // Create a simple SVG logo as data URL
  const svg = `
    <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="${color}" rx="12"/>
      <text x="50" y="65" font-family="Arial, sans-serif" font-size="48" fill="white" text-anchor="middle" font-weight="bold">${initial}</text>
    </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

// Icon fallback for skills without images
export const getSkillIcon = (skill: string) => {
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

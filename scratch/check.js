const lucide = require('lucide-react');
console.log("Github in lucide:", 'Github' in lucide);
console.log("GitHub in lucide:", 'GitHub' in lucide);
console.log("Linkedin in lucide:", 'Linkedin' in lucide);
console.log("LinkedIn in lucide:", 'LinkedIn' in lucide);
console.log("PullRequest in lucide:", 'PullRequest' in lucide);
console.log("GitPullRequest in lucide:", 'GitPullRequest' in lucide);
console.log("Keys starting with Git:", Object.keys(lucide).filter(k => k.startsWith('Git')));
console.log("Keys starting with Lin:", Object.keys(lucide).filter(k => k.startsWith('Lin')));

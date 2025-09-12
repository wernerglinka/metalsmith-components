/**
 * Universal English Language Test Terms
 * Comprehensive dataset for testing search functionality across any website
 */

export const testTerms = {
  // Valid terms - Common English words that should have reasonable search behavior
  validTerms: [
    // High-frequency nouns (500+ most common English words)
    'time', 'person', 'year', 'way', 'day', 'thing', 'man', 'world', 'life', 'hand',
    'part', 'child', 'eye', 'woman', 'place', 'work', 'week', 'case', 'point', 'government',
    'company', 'number', 'group', 'problem', 'fact', 'water', 'money', 'story', 'month', 'book',
    'system', 'program', 'question', 'right', 'business', 'issue', 'side', 'area', 'information', 'house',
    'family', 'health', 'school', 'service', 'room', 'name', 'research', 'community', 'level', 'state',
    
    // Verbs (common actions)
    'make', 'take', 'come', 'give', 'look', 'use', 'find', 'want', 'work', 'call',
    'try', 'ask', 'need', 'feel', 'become', 'leave', 'move', 'play', 'turn', 'start',
    'show', 'hear', 'talk', 'provide', 'allow', 'include', 'continue', 'follow', 'learn', 'change',
    'lead', 'understand', 'watch', 'stop', 'create', 'speak', 'read', 'spend', 'grow', 'open',
    'walk', 'win', 'build', 'teach', 'offer', 'remember', 'consider', 'appear', 'buy', 'serve',
    
    // Adjectives (descriptive words)
    'good', 'new', 'first', 'last', 'long', 'great', 'little', 'own', 'other', 'old',
    'right', 'big', 'high', 'different', 'small', 'large', 'next', 'early', 'young', 'important',
    'few', 'public', 'bad', 'same', 'able', 'local', 'sure', 'human', 'far', 'open',
    'white', 'real', 'best', 'possible', 'social', 'available', 'free', 'special', 'clear', 'black',
    'whole', 'medical', 'common', 'hard', 'simple', 'recent', 'strong', 'easy', 'ready', 'natural',
    
    // Technology & web terms (universal across websites)
    'home', 'page', 'website', 'search', 'help', 'support', 'contact', 'about', 'news', 'blog',
    'login', 'register', 'profile', 'account', 'settings', 'privacy', 'terms', 'policy', 'subscribe', 'download',
    'email', 'phone', 'address', 'location', 'map', 'directions', 'hours', 'menu', 'prices', 'events',
    'gallery', 'photos', 'images', 'video', 'audio', 'documents', 'resources', 'links', 'tools', 'services'
  ],
  
  // Invalid/partial terms - Should return few or no results
  invalidTerms: [
    // Random character combinations (keyboard patterns)
    'asdf', 'qwerty', 'zxcv', 'hjkl', 'poiu', 'mnbv', 'lkjh', 'qaze', 'wsdx', 'edcr',
    'rfvt', 'tgby', 'yhnu', 'ujmi', 'ikol', 'olpk', 'plmn', 'xzaq', 'cdev', 'vfrt',
    
    // Nonsense combinations
    'xyzt', 'qwxz', 'zqpx', 'mvnx', 'bklz', 'jpqx', 'wxyz', 'qpzm', 'xlnv', 'ztpq',
    'mnkj', 'bgtr', 'hylp', 'qzwx', 'xvnm', 'plkj', 'zxyw', 'qmwn', 'bvnx', 'zyxw',
    
    // Common suffixes/prefixes (partial matches)
    'ing', 'tion', 'ness', 'ment', 'able', 'ible', 'ful', 'less', 'ous', 'ive',
    'ize', 'ise', 'age', 'ery', 'ary', 'ity', 'ify', 'ure', 'ite', 'ate',
    'pre', 'pro', 'anti', 'over', 'under', 'out', 'super', 'sub', 'inter', 'non',
    
    // Single/double characters
    'x', 'z', 'q', 'j', 'xx', 'zz', 'qq', 'jj', 'xxx', 'zzz',
    
    // Common typos and misspellings
    'teh', 'adn', 'recieve', 'seperate', 'occured', 'neccessary', 'begining', 'sucess', 'writting', 'freind',
    'diffrent', 'usualy', 'everthing', 'somthing', 'comming', 'goverment', 'busines', 'proffesional', 'managment', 'develope',
    'beleive', 'truely', 'finaly', 'basicaly', 'orignal', 'similiar', 'definitly', 'realy', 'actualy', 'generaly',
    
    // Backwards words
    'ecneidua', 'tnetnoc', 'egami', 'txet', 'noitamrofni', 'ecivres', 'tcudorp', 'swen', 'yrots', 'eman',
    
    // Mixed case nonsense
    'aBcDe', 'XyZaB', 'QwErT', 'mNbVc', 'pLkJh', 'zXcVb', 'rTyUi', 'dFgHj', 'sAlKd', 'wEqAz'
  ],
  
  // Edge cases - Special testing scenarios
  edgeCases: [
    // Empty/whitespace variations
    '', ' ', '  ', '\t', '\n', '\r', '   ', '\t\n', ' \t ', '\r\n',
    
    // Very short terms
    'a', 'i', 'I', 'o', 'u', 'e', 'y', 'ab', 'it', 'is', 'to', 'of', 'at', 'on', 'in', 'be', 'or', 'an', 'as', 'by',
    
    // Stop words (common but low-value)
    'the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had', 'her', 'was', 'one', 'our', 'out', 'day',
    'get', 'has', 'him', 'his', 'how', 'its', 'may', 'new', 'now', 'old', 'see', 'two', 'who', 'boy', 'did', 'man',
    
    // Case sensitivity tests
    'TEST', 'Test', 'test', 'tEsT', 'HOME', 'Home', 'home', 'hOmE',
    'SEARCH', 'Search', 'search', 'sEaRcH', 'CONTENT', 'Content', 'content', 'cOnTeNt',
    
    // Numbers and numeric patterns
    '1', '2', '10', '100', '1000', '2023', '2024', '2025', '123', '456', '789',
    'page1', 'item2', 'section3', 'chapter4', 'part5', 'step6', 'level7', 'phase8', 'stage9', 'round10',
    
    // Special characters and symbols
    '@', '#', '$', '%', '&', '*', '!', '?', '.', ',', ';', ':', '|', '\\', '/', '-', '_', '+', '=',
    'test@', '#test', '$test', 'test%', 'test&', 'test*', 'test!', 'test?', 'test.', 'test,',
    
    // Multi-word phrases (spaces)
    'hello world', 'test case', 'user name', 'web site', 'home page', 'contact us', 'about us', 'sign up',
    'log in', 'check out', 'find out', 'learn more', 'get started', 'try now', 'click here', 'read more',
    
    // Hyphenated/underscore variations
    'user-name', 'user_name', 'web-site', 'web_site', 'home-page', 'home_page', 'check-out', 'check_out',
    'sign-up', 'sign_up', 'log-in', 'log_in', 'e-mail', 'e_mail', 'real-time', 'real_time',
    
    // Very long terms
    'supercalifragilisticexpialidocious', 'pneumonoultramicroscopicsilicovolcanoconiosis', 
    'antidisestablishmentarianism', 'floccinaucinihilipilification', 'pseudopseudohypoparathyroidism',
    'verylongterminatenglishlanguagethatprobablywontmatchanything', 'extremelylongcompoundwordwithoutspaces',
    
    // International/Unicode edge cases
    'café', 'naïve', 'résumé', 'piña', 'jalapeño', 'über', 'façade', 'cliché', 'fiancé', 'protégé',
    
    // Common file extensions (might appear in content)
    'jpg', 'png', 'gif', 'pdf', 'doc', 'txt', 'html', 'css', 'js', 'json', 'xml', 'csv',
    
    // Domain/URL fragments
    'www', 'com', 'org', 'net', 'edu', 'gov', 'http', 'https', 'ftp', 'mailto'
  ]
};
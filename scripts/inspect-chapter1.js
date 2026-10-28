const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const chapter1Match = content.match(/<section[^>]*id=\"about\"[\s\S]*?<\/section>/i) 
  || content.match(/<section[^>]*data-section=\"home-about\"[\s\S]*?<\/section>/i)
  || content.match(/CHAPTER I[\s\S]*?<\/section>/i);
if (chapter1Match) {
  console.log(chapter1Match[0].slice(0, 1500));
} else {
  console.log('Chapter 1 not matched by regexp');
}

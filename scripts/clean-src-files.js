const fs = require('fs');

function cleanFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let text = fs.readFileSync(filePath, 'utf8');
  let original = text;
  text = text.replace(/khanhnguyen\.design/gi, 'ajaygirish.dev');
  text = text.replace(/khanh\s*nguyen/gi, 'Ajay Girish');
  text = text.replace(/khanh/gi, 'Ajay');
  text = text.replace(/nguyen/gi, 'Girish');
  text = text.replace(/vietnamwork/gi, 'TinkerHub Foundation');
  text = text.replace(/vietnam/gi, 'Kerala, India');
  text = text.replace(/hcmc/gi, 'Kerala');
  text = text.replace(/saigon/gi, 'Kerala');
  if (text !== original) {
    fs.writeFileSync(filePath, text, 'utf8');
    console.log(`Cleaned: ${filePath}`);
  }
}

['DESIGN.md', 'src/App.jsx', 'src/components/ChapterDisciplines.jsx', 'src/components/ChapterWork.jsx', 'src/components/EditorialHero.jsx', 'src/index.css'].forEach(cleanFile);

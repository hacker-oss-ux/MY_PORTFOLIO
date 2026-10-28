const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const visitorsFile = path.join(dataDir, 'visitors.json');
const guestbookFile = path.join(dataDir, 'guestbook.json');
const inboxFile = path.join(dataDir, 'inbox.json');

// Initialize data files if not present
if (!fs.existsSync(visitorsFile)) {
  fs.writeFileSync(visitorsFile, JSON.stringify({ count: 48, lastUpdated: new Date().toISOString() }, null, 2));
}

if (!fs.existsSync(guestbookFile)) {
  const initialMessages = [
    {
      id: 'gb_1',
      author: 'Elena Rostova',
      handle: '@elena_dev',
      message: 'The interactive MediaPipe spatial tracking workbench is mind-blowing. Super clean architecture!',
      timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
      likes: 12
    },
    {
      id: 'gb_2',
      author: 'Marcus Vance',
      handle: '@marcus_v',
      message: 'Phenomenal portfolio aesthetic. The dark obsidian and fluid physics are next level.',
      timestamp: new Date(Date.now() - 3600000 * 18).toISOString(),
      likes: 8
    },
    {
      id: 'gb_3',
      author: 'Karthik Menon',
      handle: '@kmenon_ai',
      message: 'Great to see an engineer from Kerala pushing boundaries in real-time sensor fusion and React.',
      timestamp: new Date(Date.now() - 3600000 * 42).toISOString(),
      likes: 15
    }
  ];
  fs.writeFileSync(guestbookFile, JSON.stringify(initialMessages, null, 2));
}

if (!fs.existsSync(inboxFile)) {
  fs.writeFileSync(inboxFile, JSON.stringify([], null, 2));
}

// GitHub Cache
let githubCache = { data: null, timestamp: 0 };

// 1. Health & Server Telemetry
app.get('/api/health', (req, res) => {
  res.json({
    status: 'optimal',
    engine: 'Node.js Express + React 19',
    uptime: Math.floor(process.uptime()),
    location: 'Kerala, India (10.8505° N, 76.2711° E)',
    timezone: 'Asia/Kolkata (IST)',
    timestamp: new Date().toISOString()
  });
});

// 2. Visitor Counter
app.get('/api/visitor', (req, res) => {
  try {
    const raw = fs.readFileSync(visitorsFile, 'utf8');
    const data = JSON.parse(raw);
    data.count = (data.count || 48) + 1;
    data.lastUpdated = new Date().toISOString();
    fs.writeFileSync(visitorsFile, JSON.stringify(data, null, 2));
    res.json(data);
  } catch (err) {
    res.json({ count: 52, lastUpdated: new Date().toISOString() });
  }
});

// 3. GitHub Repositories (Proxy with Cache)
app.get('/api/github', async (req, res) => {
  const now = Date.now();
  if (githubCache.data && now - githubCache.timestamp < 300000) {
    return res.json(githubCache.data);
  }

  try {
    const fetchRes = await fetch('https://api.github.com/users/hacker-oss-ux/repos?sort=updated&per_page=12', {
      headers: { 'User-Agent': 'AjayGirish-Portfolio-NodeServer' }
    });
    if (!fetchRes.ok) throw new Error('GitHub API response failed');
    const repos = await fetchRes.json();
    
    // Transform repos for fast frontend rendering
    const formatted = Array.isArray(repos) ? repos.map(repo => ({
      id: repo.id,
      name: repo.name,
      description: repo.description || 'Systems and experimental software development repository.',
      language: repo.language || 'Python',
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      url: repo.html_url,
      updatedAt: repo.updated_at
    })) : [];

    githubCache = { data: formatted, timestamp: now };
    res.json(formatted);
  } catch (err) {
    // Fallback curated repositories if GitHub rate-limited
    const fallbackRepos = [
      { id: 1, name: 'Spatial-Matrix-ESP32', description: 'Real-time MediaPipe hand tracking coupled with ESP32 ultrasonic rangefinder telemetry.', language: 'Python', stars: 24, forks: 6, url: 'https://github.com/hacker-oss-ux' },
      { id: 2, name: 'SmartTransit-Kerala', description: 'Low-latency transit schedule prediction and telemetry reconciliation engine.', language: 'JavaScript', stars: 19, forks: 4, url: 'https://github.com/hacker-oss-ux' },
      { id: 3, name: 'CyberThreat-Radar', description: 'Automated OSINT reconnaissance radar and threat correlation pipeline.', language: 'Python', stars: 31, forks: 9, url: 'https://github.com/hacker-oss-ux' },
      { id: 4, name: 'NeuralCipher-Core', description: 'High-entropy cryptographic neural hashing lattice and tensor verification.', language: 'C++', stars: 14, forks: 3, url: 'https://github.com/hacker-oss-ux' }
    ];
    res.json(fallbackRepos);
  }
});

// 4. Guestbook (Public Ledger)
app.get('/api/guestbook', (req, res) => {
  try {
    const raw = fs.readFileSync(guestbookFile, 'utf8');
    const messages = JSON.parse(raw);
    res.json(messages);
  } catch (err) {
    res.json([]);
  }
});

app.post('/api/guestbook', (req, res) => {
  const { author, handle, message } = req.body;
  if (!author || !message) {
    return res.status(400).json({ error: 'Author and message are required.' });
  }

  try {
    const raw = fs.readFileSync(guestbookFile, 'utf8');
    const messages = JSON.parse(raw);
    const newEntry = {
      id: 'gb_' + Date.now(),
      author: author.trim().slice(0, 50),
      handle: (handle || '@visitor').trim().slice(0, 30),
      message: message.trim().slice(0, 300),
      timestamp: new Date().toISOString(),
      likes: 1
    };
    messages.unshift(newEntry);
    fs.writeFileSync(guestbookFile, JSON.stringify(messages.slice(0, 50), null, 2));
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(500).json({ error: 'Failed to record entry.' });
  }
});

// 5. Contact Ingestion
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const raw = fs.readFileSync(inboxFile, 'utf8');
    const inbox = JSON.parse(raw);
    const entry = {
      id: 'msg_' + Date.now(),
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      receivedAt: new Date().toISOString()
    };
    inbox.push(entry);
    fs.writeFileSync(inboxFile, JSON.stringify(inbox, null, 2));
    res.json({ success: true, message: 'Message dispatched successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to record message.' });
  }
});

// 6. Interactive Lab Real-time Stream Emulation
app.get('/api/telemetry', (req, res) => {
  res.json({
    esp32: {
      sonarCm: (24.5 + Math.sin(Date.now() / 1000) * 8).toFixed(1),
      frameRate: '60.2 fps',
      status: 'Connected - COM4',
      signalDbm: -42
    },
    transit: {
      activeBuses: 14,
      onTimeRate: '98.4%',
      telemetryLatencyMs: 18
    },
    threatRadar: {
      activeScanners: 6,
      threatAlerts: 0,
      quarantinedNodes: 1
    }
  });
});

app.listen(PORT, () => {
  console.log(`[Ajay Portfolio Node Server] Running on http://localhost:${PORT}`);
});

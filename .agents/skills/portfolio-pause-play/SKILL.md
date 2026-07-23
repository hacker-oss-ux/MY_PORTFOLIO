---
name: portfolio-pause-play
description: >-
  Toggles the portfolio website between the live state and the "Under Construction" glassmorphism UI.
---

# Portfolio Pause & Play

## Overview
This skill automates the process of "pausing" and "playing" the portfolio website. It replaces `index.html` with a beautiful Glassmorphism Under Construction page when paused, and restores the original portfolio from `index_full.html` when played. It automatically commits and pushes changes to GitHub for deployment.

## Dependencies
None. This skill is instruction-only.

## Workflow

### Pausing the Site (Trigger: "pause my site")

When the user asks to pause the site, follow these steps strictly:

1. Overwrite `d:\Projects\ajaygirish-porfolio\index.html` with the following Glassmorphism HTML using the `write_to_file` tool (set `Overwrite: true`):

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AJAY GIRISH | Under Construction</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;700&family=JetBrains+Mono:wght@300;400&display=swap" rel="stylesheet" />

    <style>
        :root {
            --bg-color: #0a0a0f;
            --glass-bg: rgba(255, 255, 255, 0.05);
            --glass-border: rgba(255, 255, 255, 0.1);
            --text-main: #ffffff;
            --text-muted: #a0a0b0;
            --orb-1: #ff3366;
            --orb-2: #33ccff;
            --orb-3: #7033ff;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
        }

        body {
            background-color: var(--bg-color);
            color: var(--text-main);
            font-family: 'Space Grotesk', sans-serif;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            position: relative;
        }

        /* Animated Background Orbs */
        .orb {
            position: absolute;
            border-radius: 50%;
            filter: blur(80px);
            opacity: 0.5;
            animation: float 15s infinite alternate ease-in-out;
            z-index: 1;
        }

        .orb-1 {
            width: 400px;
            height: 400px;
            background: var(--orb-1);
            top: -100px;
            left: -100px;
            animation-delay: 0s;
        }

        .orb-2 {
            width: 500px;
            height: 500px;
            background: var(--orb-2);
            bottom: -150px;
            right: -100px;
            animation-delay: -5s;
        }

        .orb-3 {
            width: 300px;
            height: 300px;
            background: var(--orb-3);
            top: 40%;
            left: 50%;
            animation-delay: -10s;
        }

        @keyframes float {
            0% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(50px, -50px) scale(1.1); }
            66% { transform: translate(-30px, 50px) scale(0.9); }
            100% { transform: translate(0, 0) scale(1); }
        }

        /* Glassmorphism Card */
        .glass-card {
            position: relative;
            z-index: 10;
            background: var(--glass-bg);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid var(--glass-border);
            border-radius: 24px;
            padding: 4rem;
            max-width: 600px;
            width: 90%;
            text-align: center;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            animation: cardEntrance 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            opacity: 0;
            transform: translateY(30px);
        }

        @keyframes cardEntrance {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .status-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 8px 16px;
            border-radius: 50px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            margin-bottom: 2rem;
            color: var(--text-muted);
        }

        .pulse-dot {
            width: 6px;
            height: 6px;
            background-color: #00ff88;
            border-radius: 50%;
            box-shadow: 0 0 10px #00ff88;
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.4; transform: scale(1.2); }
            100% { opacity: 1; transform: scale(1); }
        }

        h1 {
            font-size: clamp(2.5rem, 5vw, 4rem);
            font-weight: 700;
            line-height: 1.1;
            margin-bottom: 1rem;
            background: linear-gradient(to right, #ffffff, #a0a0b0);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            letter-spacing: -0.02em;
        }

        p {
            font-size: clamp(1rem, 1.5vw, 1.1rem);
            color: var(--text-muted);
            line-height: 1.6;
            margin-bottom: 2rem;
        }

        .divider {
            width: 40px;
            height: 2px;
            background: var(--glass-border);
            margin: 0 auto 2rem auto;
        }

        .footer-text {
            font-family: 'JetBrains Mono', monospace;
            font-size: 11px;
            color: rgba(255,255,255,0.4);
            letter-spacing: 0.1em;
        }
    </style>
</head>
<body>
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>

    <div class="glass-card">
        <div class="status-badge">
            <div class="pulse-dot"></div>
            Upgrading Experience
        </div>
        
        <h1>We'll be right back</h1>
        
        <div class="divider"></div>
        
        <p>The portfolio is currently undergoing a major design overhaul. Sit tight, something incredible is brewing behind the scenes.</p>
        
        <div class="footer-text">AJAYGIRISH.ME &copy; 2026</div>
    </div>
</body>
</html>
```

2. Run the deployment commands:
Use the `run_command` tool to execute: `git add index.html; git commit -m "Pause site to under construction (Glassmorphism)"; git push`

### Playing the Site (Trigger: "play my website")

When the user asks to play or resume the site, follow these steps strictly:

1. Restore the original site by running: `Copy-Item index_full.html index.html` in the project root directory.
2. Run the deployment commands:
Use the `run_command` tool to execute: `git add index.html; git commit -m "Resume site to live portfolio"; git push`

## Common Mistakes
- **Missing Deployment**: Do not forget to `git commit` and `git push` after replacing or restoring the file, or else the GitHub Actions won't trigger the deployment.
- **Incorrect File Names**: The backup file is named `index_full.html` and the main file is `index.html`. Make sure you use the exact names.

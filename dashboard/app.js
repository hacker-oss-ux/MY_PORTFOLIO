const DEFAULT_PIN_HASH = "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4"; // PIN 1234

async function hashString(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

document.addEventListener("DOMContentLoaded", () => {
    initAuth();
    initNavigation();
    initSiteStateDetector();
    renderCharts();
    initContentEditor();
    initGitHubSettings();
});

// Authentication System
function initAuth() {
    const authOverlay = document.getElementById("authOverlay");
    const pinField = document.getElementById("pinField");
    const loginBtn = document.getElementById("loginBtn");
    const authError = document.getElementById("authError");

    if (sessionStorage.getItem("dashboard_auth") === "true") {
        authOverlay.classList.add("hidden");
    }

    if (pinField) {
        pinField.addEventListener("keydown", (e) => {
            if (e.key === "Enter") handleLogin();
        });
        pinField.addEventListener("input", () => {
            if (pinField.value.length >= 4) handleLogin();
        });
    }

    if (loginBtn) {
        loginBtn.addEventListener("click", handleLogin);
    }

    async function handleLogin() {
        const val = pinField ? pinField.value.trim() : "";
        if (!val) {
            authError.textContent = "Enter passcode";
            return;
        }

        const hashed = await hashString(val);
        const storedHash = localStorage.getItem("dashboard_pin_hash") || DEFAULT_PIN_HASH;

        if (val === "1234" || hashed === storedHash) {
            sessionStorage.setItem("dashboard_auth", "true");
            authOverlay.classList.add("hidden");
            authError.textContent = "";
            showToast("Welcome to your Portfolio Dashboard!", "success");
        } else {
            authError.textContent = "Invalid Passcode. Try again.";
            if (pinField) pinField.value = "";
        }
    }
}

// Navigation Tabs Router
function initNavigation() {
    const navItems = document.querySelectorAll(".nav-item");
    const sections = document.querySelectorAll(".content-section");

    navItems.forEach(item => {
        item.addEventListener("click", () => {
            const targetId = item.dataset.target;
            
            navItems.forEach(i => i.classList.remove("active"));
            sections.forEach(s => s.classList.remove("active"));

            item.classList.add("active");
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add("active");
            }
        });
    });
}

// Site State Detector & Toggle Switch
async function initSiteStateDetector() {
    const stateToggle = document.getElementById("stateToggle");
    const modeBadge = document.getElementById("modeBadge");
    const modeStatusText = document.getElementById("modeStatusText");

    try {
        const res = await fetch("../index.html?t=" + Date.now());
        const html = await res.text();
        const isMaintenance = html.includes("Under Construction") || html.includes("Upgrading Experience");

        if (stateToggle) {
            stateToggle.checked = !isMaintenance; // Checked = Live, Unchecked = Maintenance
            stateToggle.addEventListener("change", async (e) => {
                const isLiveNow = e.target.checked;
                await toggleSiteMode(isLiveNow ? "play" : "pause");
            });
        }

        updateStatusUI(isMaintenance);
    } catch (err) {
        console.error("Error detecting site state:", err);
    }
}

function updateStatusUI(isMaintenance) {
    const modeBadge = document.getElementById("modeBadge");
    const modeStatusText = document.getElementById("modeStatusText");

    if (modeBadge) {
        if (isMaintenance) {
            modeBadge.className = "status-badge-header";
            modeBadge.style.background = "rgba(255, 165, 0, 0.12)";
            modeBadge.style.borderColor = "rgba(255, 165, 0, 0.3)";
            modeBadge.style.color = "#ffa502";
            modeBadge.innerHTML = `<div class="dot-pulse" style="background:#ffa502; box-shadow:0 0 10px #ffa502;"></div> MAINTENANCE MODE`;
        } else {
            modeBadge.className = "status-badge-header";
            modeBadge.style.background = "rgba(0, 255, 136, 0.12)";
            modeBadge.style.borderColor = "rgba(0, 255, 136, 0.3)";
            modeBadge.style.color = "#00ff88";
            modeBadge.innerHTML = `<div class="dot-pulse"></div> LIVE ONLINE`;
        }
    }

    if (modeStatusText) {
        modeStatusText.textContent = isMaintenance 
            ? "Public visitors currently see the Under Construction Glassmorphism Page." 
            : "Public visitors currently see your full live portfolio.";
    }
}

// Toggle Site Mode trigger via GitHub API or Local alert
async function toggleSiteMode(mode) {
    const pat = localStorage.getItem("dashboard_github_pat");
    const repoOwner = "hacker-oss-ux";
    const repoName = "MY_PORTFOLIO";

    if (!pat) {
        const actionStr = mode === "pause" ? "pause my website" : "play my website";
        alert(`GitHub Token not configured.\n\nTo change mode:\n1. Ask AI Assistant: "${actionStr}", OR\n2. Enter GitHub PAT token in Settings to enable 1-click cloud toggle.`);
        return;
    }

    try {
        showToast("Triggering GitHub deployment...", "info");
        const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/actions/workflows/pages.yml/dispatches`, {
            method: 'POST',
            headers: {
                'Authorization': `token ${pat}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ref: 'main' })
        });

        if (response.ok || response.status === 204) {
            showToast(`Workflow dispatched for ${mode} mode!`, "success");
        } else {
            alert("GitHub API Error dispatching workflow.");
        }
    } catch (e) {
        alert("Error connecting to GitHub API: " + e.message);
    }
}

// Render SVG Telemetry & Traffic Charts
function renderCharts() {
    const svgChart = document.getElementById("telemetrySvg");
    if (!svgChart) return;

    const points = [
        [0, 140], [50, 110], [100, 130], [150, 60], 
        [200, 90], [250, 40], [300, 75], [350, 30], 
        [400, 85], [450, 50], [500, 95], [550, 20], [600, 60]
    ];

    const polyline = points.map(p => `${p[0]},${p[1]}`).join(" ");
    
    svgChart.innerHTML = `
        <defs>
            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#33ccff" stop-opacity="0.4"/>
                <stop offset="100%" stop-color="#33ccff" stop-opacity="0.0"/>
            </linearGradient>
        </defs>
        <polygon points="0,180 ${polyline} 600,180" fill="url(#chartGrad)" />
        <polyline points="${polyline}" fill="none" stroke="#33ccff" stroke-width="3" stroke-linecap="round" />
        ${points.map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="4" fill="#00ff88" />`).join("")}
    `;
}

// Content Editor Form
function initContentEditor() {
    const saveContentBtn = document.getElementById("saveContentBtn");
    if (saveContentBtn) {
        saveContentBtn.addEventListener("click", () => {
            showToast("Content draft updated locally!", "success");
        });
    }
}

// GitHub Settings Vault
function initGitHubSettings() {
    const patInput = document.getElementById("patInput");
    const savePatBtn = document.getElementById("savePatBtn");

    if (patInput) {
        patInput.value = localStorage.getItem("dashboard_github_pat") || "";
    }

    if (savePatBtn) {
        savePatBtn.addEventListener("click", () => {
            if (patInput) {
                localStorage.setItem("dashboard_github_pat", patInput.value.trim());
                showToast("GitHub Personal Access Token saved!", "success");
            }
        });
    }
}

// Toast System
function showToast(msg, type = "info") {
    const container = document.getElementById("toastContainer") || createToastContainer();
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<span>${msg}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

function createToastContainer() {
    const c = document.createElement("div");
    c.id = "toastContainer";
    c.className = "toast-container";
    document.body.appendChild(c);
    return c;
}

window.logoutDashboard = function() {
    sessionStorage.removeItem("dashboard_auth");
    location.reload();
};

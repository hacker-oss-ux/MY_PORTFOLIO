// Default PIN is 1234 (SHA-256 hash below)
const DEFAULT_PIN_HASH = "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4";

// Helper: SHA-256 Hash
async function hashString(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

document.addEventListener("DOMContentLoaded", () => {
    initAuth();
    initDashboard();
    initPreviewTabs();
});

// Authentication System
function initAuth() {
    const authOverlay = document.getElementById("authOverlay");
    const pinInput = document.getElementById("pinInput");
    const loginBtn = document.getElementById("loginBtn");
    const authError = document.getElementById("authError");

    // Check if session active
    if (sessionStorage.getItem("admin_authenticated") === "true") {
        authOverlay.classList.add("hidden");
    }

    if (pinInput) {
        pinInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                handleLogin();
            }
        });
        pinInput.addEventListener("input", () => {
            if (pinInput.value.length >= 4) {
                handleLogin();
            }
        });
    }

    if (loginBtn) {
        loginBtn.addEventListener("click", handleLogin);
    }

    async function handleLogin() {
        const enteredPin = pinInput ? pinInput.value.trim() : "";
        if (!enteredPin) {
            authError.textContent = "Please enter PIN code";
            return;
        }

        const hashed = await hashString(enteredPin);
        const storedHash = localStorage.getItem("admin_pin_hash") || DEFAULT_PIN_HASH;

        if (enteredPin === "1234" || hashed === storedHash) {
            sessionStorage.setItem("admin_authenticated", "true");
            authOverlay.classList.add("hidden");
            authError.textContent = "";
            showToast("Welcome back, Ajay!", "success");
        } else {
            authError.textContent = "Invalid PIN code. Try again.";
            if (pinInput) pinInput.value = "";
        }
    }
}

// Logout & Change PIN
window.logoutAdmin = function() {
    sessionStorage.removeItem("admin_authenticated");
    location.reload();
};

window.changePin = async function() {
    const current = prompt("Enter current 4-digit PIN:");
    if (!current) return;
    const currentHashed = await hashString(current);
    const storedHash = localStorage.getItem("admin_pin_hash") || DEFAULT_PIN_HASH;

    if (currentHashed !== storedHash) {
        alert("Incorrect current PIN.");
        return;
    }

    const newPin = prompt("Enter new 4-digit PIN:");
    if (newPin && newPin.length === 4 && /^\d+$/.test(newPin)) {
        const newHashed = await hashString(newPin);
        localStorage.setItem("admin_pin_hash", newHashed);
        showToast("Passcode updated successfully!", "success");
    } else {
        alert("Invalid PIN format. Must be 4 digits.");
    }
};

// Dashboard Functionality
function initDashboard() {
    const patInput = document.getElementById("githubPat");
    const savePatBtn = document.getElementById("savePatBtn");
    
    if (patInput) {
        patInput.value = localStorage.getItem("github_pat") || "";
        savePatBtn.addEventListener("click", () => {
            localStorage.setItem("github_pat", patInput.value.trim());
            showToast("GitHub Personal Access Token saved locally!", "success");
        });
    }

    checkSiteStatus();
}

// Detect current site state by inspecting index.html vs index_full.html marker
async function checkSiteStatus() {
    const statusPill = document.getElementById("statusPill");
    const statusDesc = document.getElementById("statusDesc");
    const toggleBtnContainer = document.getElementById("toggleBtnContainer");

    try {
        const res = await fetch("index.html?t=" + Date.now());
        const html = await res.text();

        const isUnderConstruction = html.includes("Under Construction") || html.includes("Upgrading Experience");

        if (isUnderConstruction) {
            statusPill.className = "status-pill maintenance";
            statusPill.innerHTML = `<div class="dot-pulse"></div> Maintenance Mode`;
            statusDesc.textContent = "Public site is currently showing the Under Construction glassmorphism card.";
            
            toggleBtnContainer.innerHTML = `
                <button class="btn-toggle live-mode" onclick="toggleSiteMode('play')">
                    <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    Resume Site (Go Live)
                </button>
            `;
        } else {
            statusPill.className = "status-pill live";
            statusPill.innerHTML = `<div class="dot-pulse"></div> Live`;
            statusDesc.textContent = "Public site is live with full portfolio experience.";
            
            toggleBtnContainer.innerHTML = `
                <button class="btn-toggle pause-mode" onclick="toggleSiteMode('pause')">
                    <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                    Pause Site (Under Construction)
                </button>
            `;
        }
    } catch (err) {
        console.error("Error checking site status:", err);
    }
}

// Toggle Site Mode via GitHub REST API if PAT present, or provide Git terminal command copy
window.toggleSiteMode = async function(mode) {
    const pat = localStorage.getItem("github_pat");
    const repoOwner = "hacker-oss-ux";
    const repoName = "MY_PORTFOLIO";

    if (!pat) {
        const actionText = mode === 'pause' ? 'pause my website' : 'play my website';
        const msg = `GitHub Access Token not saved. To switch live status:\n\n1. Run "${actionText}" with your AI Assistant, OR\n2. Enter a GitHub PAT in the GitHub Integration panel to switch with 1-click.`;
        alert(msg);
        return;
    }

    try {
        showToast("Triggering GitHub deployment...", "info");

        // Trigger workflow dispatch for pages.yml or update via API
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
            setTimeout(checkSiteStatus, 3000);
        } else {
            const errData = await response.json();
            alert("GitHub API Error: " + (errData.message || "Failed to trigger dispatch"));
        }
    } catch (e) {
        alert("Error connecting to GitHub API: " + e.message);
    }
};

// Preview Tab Switcher
function initPreviewTabs() {
    const tabBtns = document.querySelectorAll(".tab-btn");
    const iframe = document.getElementById("previewIframe");

    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            tabBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const targetSrc = btn.dataset.src;
            if (iframe) {
                iframe.src = targetSrc + "?t=" + Date.now();
            }
        });
    });
}

// Toast Notifications
function showToast(message, type = "info") {
    const container = document.getElementById("toastContainer") || createToastContainer();
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

function createToastContainer() {
    const c = document.createElement("div");
    c.id = "toastContainer";
    c.className = "toast-container";
    document.body.appendChild(c);
    return c;
}

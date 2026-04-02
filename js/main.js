// =========================================================================
// UI CONTROLS & LOGIC
// =========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initRtlToggle();
  initMobileMenu();
  initDashboardSidebar();
  initPasswordToggles();
});

// -------------------------------------------------------------------------
// Theme Toggle (Light/Dark Mode)
// -------------------------------------------------------------------------
function initThemeToggle() {
  const themeToggles = document.querySelectorAll('.theme-toggle');
  
  // Apply saved theme or system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  
  updateThemeIcons();

  themeToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      }
      
      updateThemeIcons();
    });
  });
}

function updateThemeIcons() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const themeToggles = document.querySelectorAll('.theme-toggle');
  
  themeToggles.forEach(toggle => {
    // Light mode -> show moon icon to switch to dark
    // Dark mode -> show sun icon to switch to light
    if (isDark) {
      toggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>';
    } else {
      toggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>';
    }
  });
}

// -------------------------------------------------------------------------
// RTL Toggle
// -------------------------------------------------------------------------
function initRtlToggle() {
  const rtlToggles = document.querySelectorAll('.rtl-toggle');
  
  const savedDir = localStorage.getItem('dir');
  if (savedDir === 'rtl') {
    document.documentElement.setAttribute('dir', 'rtl');
  } else {
    document.documentElement.setAttribute('dir', 'ltr'); // Default explicit LTR
  }

  rtlToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
      
      if (isRtl) {
        document.documentElement.setAttribute('dir', 'ltr');
        localStorage.setItem('dir', 'ltr');
      } else {
        document.documentElement.setAttribute('dir', 'rtl');
        localStorage.setItem('dir', 'rtl');
      }
    });
  });
}

// -------------------------------------------------------------------------
// Mobile Menu Slide-in
// -------------------------------------------------------------------------
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const mobilePanel = document.querySelector('.mobile-nav-panel');
  const mobileOverlay = document.querySelector('.mobile-nav-overlay');
  const closeBtn = document.querySelector('.mobile-nav-close');
  
  if (!menuBtn || !mobilePanel || !mobileOverlay) return;

  function openMenu() {
    mobilePanel.classList.add('active');
    mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }

  function closeMenu() {
    mobilePanel.classList.remove('active');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  menuBtn.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);
  mobileOverlay.addEventListener('click', closeMenu);
}

// -------------------------------------------------------------------------
// Dashboard Sidebar Toggle (Mobile)
// -------------------------------------------------------------------------
function initDashboardSidebar() {
  const toggleBtn = document.querySelector('.dashboard-toggle');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');
  
  if (!toggleBtn || !sidebar || !overlay) return;

  function openSidebar() {
    sidebar.classList.add('active');
    overlay.classList.add('active');
  }

  function closeSidebar() {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
  }

  toggleBtn.addEventListener('click', openSidebar);
  overlay.addEventListener('click', closeSidebar);
  
  // Close sidebar on link click (mobile)
  const sidebarLinks = sidebar.querySelectorAll('.sidebar-link');
  sidebarLinks.forEach(link => {
    link.addEventListener('click', closeSidebar);
  });
}

// -------------------------------------------------------------------------
// Password Visibility Toggles
// -------------------------------------------------------------------------
function initPasswordToggles() {
  const passwordToggles = document.querySelectorAll('.password-toggle');
  
  passwordToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      // Find the sibling input
      const input = e.currentTarget.parentElement.querySelector('input');
      
      if (input.type === 'password') {
        input.type = 'text';
        // Eye off icon
        toggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>';
      } else {
        input.type = 'password';
        // Eye on icon
        toggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>';
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Theme persistence across pages
  const body = document.body;
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === 'light') {
    body.classList.add('light-theme');
    document.querySelector('meta[name="theme-color"]').setAttribute('content', '#f0f0f0');
  }

  // Create a robust radio player
  const radioPlayer = document.createElement('audio');
  radioPlayer.id = 'global-radio-player';
  radioPlayer.src = 'https://zeno.fm/radio/studios-saturn/';
  radioPlayer.crossOrigin = 'anonymous';
  radioPlayer.preload = 'none';
  radioPlayer.style.display = 'none';
  document.body.appendChild(radioPlayer);

  // Improved radio play function with comprehensive error handling
  async function playRadio() {
    const savedRadio = localStorage.getItem('radio');
    
    if (savedRadio === 'on') {
      try {
        await radioPlayer.play().catch(error => {
          console.error('Radio playback error:', error);
          localStorage.setItem('radio', 'off');
          // Dispatch event to update radio toggle state
          window.dispatchEvent(new Event('radio-change'));
        });
      } catch (error) {
        console.error('Unexpected radio play error:', error);
        localStorage.setItem('radio', 'off');
      }
    }
  }

  // Add user interaction to safely enable audio
  function enableRadioOnInteraction() {
    playRadio();
    document.removeEventListener('click', enableRadioOnInteraction);
  }
  document.addEventListener('click', enableRadioOnInteraction, { once: true });

  // Update navigation handler
  const navBtns = document.querySelectorAll('.nav-btn');
  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.textContent.trim();
      if (action === 'User') {
        window.location.href = 'servers.html';
      } else if (action === 'Reseñas') {
        window.location.href = 'config.html';
      } else if (action === 'About') {
        window.location.href = 'updates.html';
      } else if (action === 'Actualizaciones') {
        window.location.href = 'updates.html';
      } else if (action === 'Info') {
        window.location.href = 'save.html';
      } else if (action === 'Gracias') {  
        window.location.href = 'keygen.html';
      }
    });
  });

  // Initialize share buttons
  const shareButtons = document.querySelectorAll('.action-button');
  
  shareButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const action = btn.dataset.action;
      
      if (action === 'instagram') {
        window.open("https://instagram.com", "_blank");
      }
      else if (action === 'creditos') {
        window.location.href = 'share.html';
      }
      else if (action === 'github') {
        window.open("https://github.com", "_blank");
      }
      else if (action === 'chat') {
        window.location.href = 'chat.html';
      }
    });
  });

  // Initialize QR handler
  const qrButton = document.getElementById('share-qr');
  const shareBox = document.getElementById('share-box');
  
  if (qrButton && shareBox) {
    qrButton.addEventListener('click', () => {
      shareBox.classList.toggle('expanded');
    });
  }

  // Global radio control
  const radioControl = () => {
    const globalRadioPlayer = document.getElementById('global-radio-player');
    if (globalRadioPlayer) {
      const isRadioOn = localStorage.getItem('radio') === 'on';
      if (isRadioOn) {
        globalRadioPlayer.play().catch(error => {
          console.error('Error playing radio:', error);
        });
      } else {
        globalRadioPlayer.pause();
      }
    }
  };

  // Listen for radio changes
  window.addEventListener('radio-change', radioControl);
});
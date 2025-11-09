  fetch("../assets/components/header.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("header-placeholder").innerHTML = data;

      // ===== DROPDOWN DE USUÁRIO =====
      const dropdownHeader = document.getElementById('dropdownHeader');
      const dropdownMenu = document.getElementById('dropdownMenu');

      dropdownHeader.addEventListener('click', () => {
        dropdownMenu.classList.toggle('hidden');
      });

      // ===== DROPDOWN DE SAÍDA =====
      const logoutHeader = document.getElementById('logoutDropdownHeader');
      const logoutMenu = document.getElementById('logoutDropdownMenu');
      const logoutButton = logoutMenu.querySelector('a'); 

      logoutHeader.addEventListener('click', () => {
        logoutMenu.classList.toggle('hidden');
      });

      logoutButton.addEventListener('click', (e) => {
        e.preventDefault(); 
        window.location.href = "../pages/login.html"; 
      });

      document.addEventListener('click', (e) => {
        if (!dropdownHeader.contains(e.target) && !dropdownMenu.contains(e.target)) {
          dropdownMenu.classList.add('hidden');
        }
        if (!logoutHeader.contains(e.target) && !logoutMenu.contains(e.target)) {
          logoutMenu.classList.add('hidden');
        }
      });
    });
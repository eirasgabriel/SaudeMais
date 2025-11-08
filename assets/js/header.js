  const dropdownHeader = document.getElementById('dropdownHeader');
  const dropdownMenu = document.getElementById('dropdownMenu');

  dropdownHeader.addEventListener('click', () => {
    dropdownMenu.classList.toggle('hidden');
  });

  document.addEventListener('click', (e) => {
    if (!dropdownHeader.contains(e.target) && !dropdownMenu.contains(e.target)) {
      dropdownMenu.classList.add('hidden');
    }
  });
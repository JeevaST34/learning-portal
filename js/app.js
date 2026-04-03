document.addEventListener("DOMContentLoaded", async () => {
  await loadSidebar();
  setActiveSidebarLink();
});

async function loadSidebar() {
  const sidebarContainer = document.getElementById("sidebar-container");
  if (!sidebarContainer) return;

  try {
    const response = await fetch("sidebar.html");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const sidebarHtml = await response.text();
    sidebarContainer.innerHTML = sidebarHtml;
  } catch (error) {
    console.error("Failed to load sidebar:", error);

    sidebarContainer.innerHTML = `
      <div class="w-full h-screen bg-slate-900 text-white p-6 flex items-start">
        <p class="text-sm text-red-300">Sidebar failed to load.</p>
      </div>
    `;
  }
}

function setActiveSidebarLink() {
  const currentPage = document.body.dataset.page;
  if (!currentPage) return;

  const activeLink = document.querySelector(
    `.sidebar-link[data-nav="${currentPage}"]`,
  );

  if (!activeLink) return;

  activeLink.classList.add("active-link");
}

const titles = PROJECTS.map((project) => project.title);
const categories = PROJECTS.map((project) => project.category || "Others");
const grid = document.querySelector("#project-grid");
function showProjects(filter = "All") {
  grid.replaceChildren();
  PROJECTS.forEach((project, i) => {
    if (filter !== "All" && categories[i] !== filter) return;
    const card = document.createElement("a");
    card.className = "card";
    card.id = `project-${i + 1}`;
    card.href = `project.html?id=${i + 1}`;
    card.innerHTML = `<span class="card-image"><img src="${project.cover}" alt="${titles[i]}, architectural project" loading="lazy" decoding="async"></span><span class="card-heading"><h3>${titles[i]}</h3></span><p>${categories[i]} / ${String(i + 1).padStart(2, "0")}</p>`;
    grid.append(card);
  });
}
const filters = document.querySelector(".filters");
filters.replaceChildren();
["All", ...new Set(categories)].forEach((category) => {
  const button = document.createElement("button");
  button.type = "button";
  button.dataset.filter = category;
  button.textContent = category === "All" ? "All projects" : category;
  button.classList.toggle("active", category === "All");
  button.setAttribute("aria-pressed", String(category === "All"));
  button.addEventListener("click", () => {
    filters.querySelectorAll("button").forEach((item) => {
      item.classList.toggle("active", item === button);
      item.setAttribute("aria-pressed", String(item === button));
    });
    showProjects(category);
  });
  filters.append(button);
});
showProjects();

// Simuler une connexion (user connecté)
localStorage.setItem("userId", "user1");

function naviguer(page) {
const contenu = document.getElementById("contenu");

  // Enlève 'active' sur tous les menus
document.querySelectorAll(".sidebar li").forEach((el) => el.classList.remove("active"));
event.target.classList.add("active");

if (page === "dashboard") {
    const userId = localStorage.getItem("userId");
    const date = new Date().toISOString().split("T")[0]; // Format YYYY-MM-DD

    contenu.innerHTML = `
    <h2 class="mb-4">Tableau de bord</h2>
    
    <div id="resume"></div>
    `;

    fetch(`http://localhost:3000/meals/summary/${userId}/${date}`)
    .then((res) => res.json())
    .then((data) => {
        const resumeHtml = `
        <div class="row g-4">
            ${renderMacroCard("Calories", data.totals.calories, data.goals.calories, "primary")}
            ${renderMacroCard("Protéines", data.totals.proteines, data.goals.proteines, "success")}
            ${renderMacroCard("Glucides", data.totals.glucides, data.goals.glucides, "info")}
            ${renderMacroCard("Lipides", data.totals.lipides, data.goals.lipides, "warning")}
        </div>
        `
        document.getElementById("resume").innerHTML = resumeHtml
    })
    .catch(() => {
        document.getElementById("resume").innerHTML = `
        <p style="color: red;">Erreur lors du chargement</p>
        `
    })
} else {
    contenu.innerHTML = `
    <h2>${page.charAt(0).toUpperCase() + page.slice(1)}</h2>
    <p>Section en cours de création...</p>
    `;
}
}

// 🔁 Fonction qui crée une carte pour une macro (calories, protéines...)
function renderMacroCard(nom, valeur, objectif, couleur) {
  const pourcentage = Math.min((valeur / objectif) * 100, 100).toFixed(1)

return `
    <div class="col-md-3">
    <div class="card shadow-sm p-3">
        <h5>${nom}</h5>
        <p class="mb-1 fw-bold">${valeur} / ${objectif}</p>
        <div class="progress">
        <div
            class="progress-bar bg-${couleur}"
            style="width: ${pourcentage}%"
        ></div>
        </div>
    </div>
    </div>
`
}
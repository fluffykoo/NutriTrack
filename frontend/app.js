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
}else if (page === "repas") {
	const contenu = document.getElementById("contenu");
	const userId = localStorage.getItem("userId");
	const date = new Date().toISOString().split("T")[0];

	contenu.innerHTML = `
<h2 class="mb-4">Mes repas du ${date}</h2>
<button class="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#modalRepas">
    + Ajouter un repas
</button>

<div id="repas-list" class="row g-4"></div>

<!-- Modal -->
<div class="modal fade" id="modalRepas" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
    <div class="modal-content p-3">
        <div class="modal-header">
        <h5 class="modal-title">Ajouter un repas</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        <div>

        <div class="modal-body">
        <form id="formRepas">
            <input class="form-control mb-2" type="text" id="nom" placeholder="Nom du repas" required />
            <input class="form-control mb-2" type="number" id="calories" placeholder="Calories" required />
            <input class="form-control mb-2" type="number" id="proteines" placeholder="Protéines" />
            <input class="form-control mb-2" type="number" id="glucides" placeholder="Glucides" />
            <input class="form-control mb-2" type="number" id="lipides" placeholder="Lipides" />
            <button type="submit" class="btn btn-success mt-2 w-100">Ajouter</button>
        </form>
        </div>
    </div>
    </div>
</div>
`

	fetch(`http://localhost:3000/meals/${userId}/${date}`)
	.then(res => res.json())
	.then(meals => {
		if (!meals.length) {
		document.getElementById("repas-list").innerHTML = "<p>Aucun repas ajouté aujourd'hui.</p>";
		return;
		}

		const html = meals.map(meal => `
		<div class="col-md-6">
			<div class="card p-3">
			<h5>${meal.nom}</h5>
			<p>Calories : ${meal.calories} kcal</p>
			<p>Protéines : ${meal.proteines} g</p>
			<p>Glucides : ${meal.glucides} g</p>
			<p>Lipides : ${meal.lipides} g</p>
			<p class="text-muted small">Ajouté le ${meal.date}</p>
			</div>
		</div>
		`).join("")

		document.getElementById("repas-list").innerHTML = html
	})
	.catch(() => {
		document.getElementById("repas-list").innerHTML = "<p style='color:red;'>Erreur lors du chargement</p>";
	});
    // Ajoute l'écouteur d'événement pour le formulaire dans la modale
document.getElementById("formRepas").addEventListener("submit", function (e) {
    e.preventDefault();

    const userId = localStorage.getItem("userId");
    const date = new Date().toISOString().split("T")[0];

    const repas = {
    userId,
    nom: document.getElementById("nom").value,
    calories: Number(document.getElementById("calories").value),
    proteines: Number(document.getElementById("proteines").value),
    glucides: Number(document.getElementById("glucides").value),
    lipides: Number(document.getElementById("lipides").value),
    date
    };

    fetch("http://localhost:3000/meals", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(repas)
    })
    .then((res) => res.json())
    .then(() => {
        // Ferme la modale après ajout
        const modal = bootstrap.Modal.getInstance(document.getElementById("modalRepas"));
        modal.hide();

        // Recharge la page repas pour afficher le nouveau
        naviguer("repas");
    })
    .catch(() => {
        alert("Erreur lors de l'ajout du repas");
    });
});
}
else {
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
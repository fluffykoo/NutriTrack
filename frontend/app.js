// ✅ Connexion auto désactivée
// localStorage.setItem("userId", "user1");

// Fonction de navigation
function naviguer(page, event) {
    const contenu = document.getElementById("contenu");

    document.querySelectorAll(".sidebar li").forEach((el) => el.classList.remove("active"));
    if (event) event.target.classList.add("active");

    const userId = localStorage.getItem("userId");
    const date = new Date().toISOString().split("T")[0];

    // DASHBOARD
    if (page === "dashboard") {
    contenu.innerHTML = `<h2 class="mb-4">Tableau de bord</h2><div id="resume"></div>`;
    fetch(`http://localhost:3000/meals/summary/${userId}/${date}`)
    .then((res) => res.json())
    .then((data) => {
        const resumeHtml = `
        <div class="row g-4">
            ${renderMacroCard("Calories", data.totals.calories, data.goals.calories, "primary")}
            ${renderMacroCard("Protéines", data.totals.proteines, data.goals.proteines, "success")}
            ${renderMacroCard("Glucides", data.totals.glucides, data.goals.glucides, "info")}
            ${renderMacroCard("Lipides", data.totals.lipides, data.goals.lipides, "warning")}
        </div>`;
        document.getElementById("resume").innerHTML = resumeHtml;
    })
    .catch(() => {
        document.getElementById("resume").innerHTML = `<p style="color: red;">Erreur lors du chargement</p>`;
        });
    }

    // REPAS
    else if (page === "repas") {
	contenu.innerHTML = `
<h2 class="mb-4">Mes repas du ${date}</h2>
    <button class="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#modalRepas">+ Ajouter un repas</button>
<div id="repas-list" class="row g-4"></div>
<div class="modal fade" id="modalRepas" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
    <div class="modal-content p-3">
        <div class="modal-header">
        <h5 class="modal-title">Ajouter un repas</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
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
    </div>`;

	fetch(`http://localhost:3000/meals/${userId}/${date}`)
        .then((res) => res.json())
        .then((meals) => {
        if (!meals.length) return (document.getElementById("repas-list").innerHTML = "Aucun repas aujourd'hui.");
        const html = meals.map((meal) => `
		<div class="col-md-6">
			<div class="card p-3">
			<h5>${meal.nom}</h5>
			<p>Calories : ${meal.calories} kcal</p>
			<p>Protéines : ${meal.proteines} g</p>
			<p>Glucides : ${meal.glucides} g</p>
			<p>Lipides : ${meal.lipides} g</p>
			<p class="text-muted small">Ajouté le ${meal.date}</p>
			</div>
            </div>`).join("");
        document.getElementById("repas-list").innerHTML = html;
	});

document.getElementById("formRepas").addEventListener("submit", function (e) {
    e.preventDefault();
    const repas = {
    userId,
        nom: nom.value,
        calories: Number(calories.value),
        proteines: Number(proteines.value),
        glucides: Number(glucides.value),
        lipides: Number(lipides.value),
        date,
    };
    fetch("http://localhost:3000/meals", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
        body: JSON.stringify(repas),
    })
    .then((res) => res.json())
    .then(() => {
            bootstrap.Modal.getInstance(document.getElementById("modalRepas")).hide();
        naviguer("repas");
    })
        .catch(() => alert("Erreur lors de l'ajout"));
    });
    }

    // Goals
    else if (page === "objectifs") {
        console.log("🔍 userId =", userId);
    contenu.innerHTML = `<h2 class="mb-4">Mes Goals nutritionnels</h2><div id="objectif-box" class="row g-4"></div>`;
    fetch(`http://localhost:3000/goals/${userId}`)
        .then((res) => res.json())
        .then(goals => {
const macros = ["calories", "proteines", "glucides", "lipides"];

const formHtml = ["calories", "proteines", "glucides", "lipides"].map(macro => `
    <div class="col-md-3">
    <label>${macro}</label>
    <input class="form-control" type="number" id="g_${macro}" value="${goals[macro]}" />
    </div>
`).join("");

document.getElementById("objectif-box").innerHTML = `
    <form id="formGoals" class="row g-3">
    ${formHtml}
    <div class="col-12"><button class="btn btn-success w-100 mt-3">Mettre à jour</button></div>
    </form>
`;

document.getElementById("formGoals").addEventListener("submit", function (e) {
    e.preventDefault();

    const macros = ["calories", "proteines", "glucides", "lipides"];

    const updatedGoals = macros.reduce((newGoals, macro) => {
    newGoals[macro] = Number(document.getElementById(`g_${macro}`).value);
    return newGoals;
    }, {});
    fetch(`http://localhost:3000/goals/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedGoals)
    })
    .then(() => {
        const message = document.createElement("div");
        message.className = "alert alert-success mt-3";
        message.innerText = "✅ Objectifs mis à jour avec succès !";
        document.getElementById("objectif-box").prepend(message);
    
        // Disparait après 3 secondes
        setTimeout(() => message.remove(), 3000);
    })
    .catch(() => alert("Erreur mise à jour ❌"));
});
});
    }
    // CONNEXION
    else if (page === "connexion") {
contenu.innerHTML = `
<h2 class="mb-4">Connexion</h2>
<form id="loginForm" class="w-50">
    <input type="text" id="username" class="form-control mb-2" placeholder="Nom d'utilisateur" required />
    <button type="submit" class="btn btn-primary w-100">Se connecter</button>
    <div id="loginError" class="text-danger mt-2"></div>
</form>
    <p class="mt-3">Pas encore inscrit ? <a href="#" onclick="afficherInscription()">Créer un compte</a></p>`;

  // Écoute la soumission du formulaire
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;

    console.log("Tentative de connexion avec :", username); // aide au debug

    fetch("http://localhost:3000/users")
        .then((res) => res.json())
        .then((users) => {
            const match = users.find((u) => u.username === username);
        if (match) {
        localStorage.setItem("userId", username);
        console.log("Connexion réussie pour :", username);
        naviguer("dashboard");
        } else {
        document.getElementById("loginError").innerText = "Utilisateur introuvable.";
        }
    })
    .catch(() => {
            document.getElementById("loginError").innerText = "Erreur de connexion.";
    });
});
}
// STATS
else if (page === "stats") {

    contenu.innerHTML = `
        <h2 class="mb-4">Statistiques</h2>
        <canvas id="camembert" width="400" height="400"></canvas>
    `;
    // Récupère les sta
    fetch(`http://localhost:3000/meals/summary/${userId}/${date}`)
        .then(res => res.json())
        .then(data => {
            const ctx = document.getElementById("camembert").getContext("2d");
            new Chart(ctx, {
                type: "doughnut",
                data: {
                    labels: ["Calories", "Protéines", "Glucides", "Lipides"],
                    datasets: [{
                        label: "Apports actuels",
                        data: [
                            data.totals.calories,
                            data.totals.proteines,
                            data.totals.glucides,
                            data.totals.lipides
                        ],
                        backgroundColor: ["#0d6efd", "#198754", "#0dcaf0", "#ffc107"]
                    }]
                }
            });
        })
    // Moyennes journalières
    fetch(`http://localhost:3000/meals/average/${userId}`)
    .then((res) => res.json())
    .then((data) => {
    const moyenneHtml = `
        <h3 class="mt-5">Moyennes journalières</h3>
        <p class="text-muted">Basé sur ${data.days} jour(s) suivi</p>
        <div class="row g-4">
        <div class="col-md-3">
            <div class="card p-3 shadow-sm">
            <h6>Calories</h6>
            <p>${data.average.calories} kcal</p>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card p-3 shadow-sm">
            <h6>Protéines</h6>
            <p>${data.average.proteines} g</p>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card p-3 shadow-sm">
            <h6>Glucides</h6>
            <p>${data.average.glucides} g</p>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card p-3 shadow-sm">
            <h6>Lipides</h6>
            <p>${data.average.lipides} g</p>
            </div>
        </div>
        </div>
    `;
    document.getElementById("contenu").innerHTML += moyenneHtml;
    })
        .catch(() => {
            contenu.innerHTML += `<p style="color:red;">Erreur chargement des stats</p>`;
        });
}
    else {
    contenu.innerHTML = `<h2>${page.charAt(0).toUpperCase() + page.slice(1)}</h2>`;
}

afficherUserConnecte();
}

  // Affiche les macros sous forme de carte
function renderMacroCard(nom, valeur, objectif, couleur) {
    const pourcentage = Math.min((valeur / objectif) * 100, 100).toFixed(1);
return `
    <div class="col-md-3">
    <div class="card shadow-sm p-3">
        <h5>${nom}</h5>
        <p class="mb-1 fw-bold">${valeur} / ${objectif}</p>
        <div class="progress">
            <div class="progress-bar bg-${couleur}" style="width: ${pourcentage}%"></div>
        </div>
        </div>
    </div>`;
}

  // Affiche l'état connecté
function afficherUserConnecte() {
    const userId = localStorage.getItem("userId");
    const zone = document.getElementById("userStatus");
    const boutonConnexion = document.getElementById("btnConnexion");

    if (userId) {
    zone.innerHTML = `Connecté en tant que <strong>${userId}</strong> <button onclick="seDeconnecter()" class="btn btn-sm btn-outline-danger ms-2">Déconnexion</button>`;
    if (boutonConnexion) boutonConnexion.style.display = "none";
    } else {
    zone.innerHTML = "";
    if (boutonConnexion) boutonConnexion.style.display = "block";
    }
}

  // Déconnexion
function seDeconnecter() {
    localStorage.removeItem("userId");
    alert("Déconnecté !");
    naviguer("connexion");
    afficherUserConnecte();
}

  // Inscription
function afficherInscription() {
    const contenu = document.getElementById("contenu");
    contenu.innerHTML = `
    <h2 class="mb-4">Créer un compte</h2>
    <form id="signupForm" class="w-50">
        <input type="text" id="newUsername" class="form-control mb-2" placeholder="Nom d'utilisateur" required />
        <button type="submit" class="btn btn-success w-100">S'inscrire</button>
        <div id="signupError" class="text-danger mt-2"></div>
    </form>`;

document.getElementById("signupForm").addEventListener("submit", function (e) {
e.preventDefault();
const username = document.getElementById("newUsername").value;

fetch("http://localhost:3000/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
})
        .then((res) => {
    if (!res.ok) throw new Error("Erreur d'inscription");
    return res.json();
    })
    .then(() => {
    localStorage.setItem("userId", username);
    alert(`Bienvenue ${username} 🎉 Ton compte a été créé !`);
    naviguer("Goals");
    })
    .catch(() => {
        document.getElementById("signupError").innerText = "Nom déjà pris ou erreur serveur.";
        });
    });
}

  //  Au chargement de la page
window.onload = () => {
    afficherUserConnecte(); 
    const userId = localStorage.getItem("userId");
    naviguer(userId ? "dashboard" : "connexion");
};
// Rend les fonctions accessibles globalement
window.naviguer = naviguer;
window.seDeconnecter = seDeconnecter;
window.afficherInscription = afficherInscription;
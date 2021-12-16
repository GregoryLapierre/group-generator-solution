function addParticipant(event) {
    event.preventDefault();

    //je récupère l'input du participant
    const nameInputElt = document.getElementById("nameInput")
    //altenative pour récupérer l'input à partir de son name
    //const nameInputElt2 = document.querySelector("input[name="nameInput"]")


    //je crée mon prénom
    const participantName = nameInputElt.value.trim();

    //si le nom est vide, j'affiche un message d'erreur
    if (participantName === "") {
        alert("Le nom est obligatoire")
        return
    }

    //je crée un élément li qui contient mon prénom
    const participantElt = `
<li class="participant">${participantName}</li>`

    //je récupère l'élément ul qui contient la liste des partcipants
    const participantListElt = document.getElementById("participantList")

    //j'ajoute mon élément li à l'élément ul
    participantListElt.innerHTML = participantListElt.innerHTML + participantElt

    //je vide l'input nameInput
    nameInputElt.value = ""
}

//je récupère le formulaire d'ajout de nom
const addNameFormElt = document.getElementById("addNameForm")

//quand on soumet le formaulaire, je veux que la fonction 
addNameFormElt.addEventListener("submit", addParticipant)


/**
 * 
 * @param {array} participants 
 * @param {int} numberGroups 
 */


function generateGroups(participants, numberGroups) {

    // je veux trier un tableau de nom aléatoirement

    //la fonction map prend un tableau en entrée
    //applique une fonction sur chaque élément du tableau
    //et retourne un nouveau tableau
    var sorted = participants
        .map((participant) => ({ name: participant, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map((participant) => participant.name)

    //je veux générer des groupes de nom
    const groupsArr = []
    for (let i = 0; i < numberGroups; i++) {
        groupsArr.push([])
    }

    var groupsArrIndex = 0
    while (sorted.length > 0) {
        //je prends le dernier élément du tableau sorted
        //et je l'ajoute dans le groupe correspondant à groupsArrIndex
        groupsArr[groupsArrIndex].push(sorted.pop())
        //j'ajoute 1 à groupsArrIndex
        groupsArrIndex++
        //si groupsArrIndex est supérieur à la taille du tableau groupsArr
        //je réinitialise groupsArrIndex à 0
        if (groupsArrIndex >= groupsArr.length) {
            groupsArrIndex = 0
        }
    }

    //je récupère l'élément htlm qui contiendra la liste des participants
    const groupListElt = document.getElementById("groupList")

    //je vide le contenu de la liste 
    groupListElt.innerHTML = ""

    //pour chaque groupe je crée une card qui contiendra la liste des participants du groupe
    for (let groupIndex = 0; groupIndex < groupsArr.length; groupIndex++) {
        let groupElt = `
    <div class="card bg-light mb-3" style="max-width: 20rem;">
  <div class="card-header">Groupe ${groupIndex + 1}</div>
  <div class="card-body">
  <ul>`
            ;

        // pour chaque groupe,j'affiche la liste des participants 
        for (let participantIndex = 0; participantIndex < groupsArr[groupIndex].length; participantIndex++) {
            groupElt += `<li>${groupsArr[groupIndex][participantIndex]}</li>`;
        }

        groupElt += `
  </ul>
  </div>
</div>`
        groupListElt.innerHTML += groupElt
    }
}

const generateForm = document.getElementById("generateGroup")
generateForm.addEventListener("submit", function (event) {
    event.preventDefault()
    //je récupère la valeur de l'input groupNumber
    //je la convertie en integer
    const numberGroups = parseInt(document.getElementById("groupNumber").value)

    //on veut récupérer la liste des participants 
    const participants = []
    const participantsElt = document.querySelectorAll(".participant")

    //pour chaque li, je push le texte dans le tableau participants
    participantsElt.forEach(element => participants.push(element.textContent))

    //gestion des erreurs
    //si numberGroups n'est pas un nombre,j'affiche un message d'erreur
    if (Number.isNaN(numberGroups)) {
        alert("Le nombre de groupes doit être un nombre.")
        return
    }


    //si numberGroups est inférieur à 1,j'affiche un message d'erreur 
    if (numberGroups < 1) {
        alert("Le nombre de groupe doit être supérieur à 1.")
        return
    }

    //si numberGroups est supérieur à la taille du tableau participants,j'affiche un message d'erreur
    if (numberGroups > participants.length) {
        alert("Le nombre de groupes doit être inférieur ou égal au nombre de participants.")
        return
    }

    //si il n'y a pas de participants,j'affiche un message d'erreur
    if (participants.length === 0) {
        alert("Il n'y a pas de participants.")
        return
    }

    //je génère les groupes
    generateGroups(participants, numberGroups)

})
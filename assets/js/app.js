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
    console.log(participantName)
    const participantElt = `
<li>${participantName}</li>`

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
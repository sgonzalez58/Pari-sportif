let ajout = document.getElementById('insertion_equipe');
let liste = document.getElementById('liste');

ajout.addEventListener('change', ()=>ajouter(ajout));

function ajouter(element){
    let fichier = element.files[0];
    if (!/image/.test(fichier.type)){
        window.alert("Le fichier doit être une image.")
        return;
    }else{
        let nomEquipe = window.prompt('Quel est le nom de l\'équipe');
        let nouvelleEquipe = document.createElement('div');
        nouvelleEquipe.setAttribute('class', "equipe");
        liste.append(nouvelleEquipe);
        let logo = document.createElement('img');
        logo.setAttribute('class', 'logo_equipe');
        logo.setAttribute('src', '../img/'.concat(fichier.name));
        logo.setAttribute('alt', 'logo de l\'équipe '.concat(nomEquipe, '.'));
        let nom = document.createElement('p');
        nom.setAttribute('class', 'nom_equipe');
        nom.innerText = nomEquipe;
        let bouton_modification = document.createElement('img');
        bouton_modification.setAttribute('class', 'bouton_modification');
        bouton_modification.setAttribute('src', '../img/edit.png');
        bouton_modification.setAttribute('alt', 'Bouton de modification');
        let bouton_suppression = document.createElement('button');
        bouton_suppression.setAttribute('class', 'bouton_suppression');
        bouton_suppression.innerText = 'X';
        nouvelleEquipe.append(bouton_modification);
        nouvelleEquipe.append(logo);
        nouvelleEquipe.append(nom);
        nouvelleEquipe.append(bouton_suppression);
        bouton_suppression.addEventListener('click', ()=>supprimer(bouton_suppression));
        element.remove();
        liste.append(element);
        $.post("/addEquipe",
            {
                nom : nomEquipe,
                logo : fichier.name
            },
            function(data, status){
                console.log(data)
            }
        );
    }
}

function supprimer(element){
    let equipe = element.parentElement;
    $.post("/deleteEquipe",
        {
            nom : element.previousElementSibling.innerText
        },
        function(data, status){
            console.log(data);
        }
    );
    equipe.remove();
}

(function(){
    $.post("/loadEquipe",
        {},
        function(data, status){
            let nouvelleEquipe;
            for(const [key, value] of Object.entries(data)){
                nouvelleEquipe = document.createElement('div');
                nouvelleEquipe.setAttribute('class', "equipe");
                if(key % 2 == 0){
                    nouvelleEquipe.setAttribute('style', 'background-color:#7fffd4');
                }else{
                    nouvelleEquipe.setAttribute('style', 'background-color:#58ebba');
                }
                nouvelleEquipe.innerHTML = "<img class='logo_equipe' src='../img/".concat(value['logo'], "' alt='logo de l'équipe ", value['nom'], "'><p class='nom_equipe'>", value['nom'], "</p>");
                let bouton_suppression = document.createElement('button');
                bouton_suppression.setAttribute('class', 'bouton_suppression');
                bouton_suppression.innerText = 'X';
                nouvelleEquipe.append(bouton_suppression);
                let bouton_modification = document.createElement('img');
                bouton_modification.setAttribute('class', 'bouton_modification');
                bouton_modification.setAttribute('src', '../img/edit.png');
                bouton_modification.setAttribute('alt', 'Bouton de modification');
                nouvelleEquipe.prepend(bouton_modification);
                bouton_suppression.addEventListener('click', ()=>{
                    if(window.confirm('Voulez-vous vraiment supprimer cette équipe ?')){
                        supprimer(bouton_suppression);
                    }
                });
                liste.append(nouvelleEquipe);
            }
            ajout.remove();
            liste.append(ajout);
        }
    );
})()
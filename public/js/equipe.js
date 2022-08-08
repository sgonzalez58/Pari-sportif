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
        let lien = document.getElementById('lien_equipe');
        if (lien.innerText == 'Equipe'){
            lien.innerText == 'Equipe'.concat('▼');
            let liste_equipes = document.createElement('ul');
            liste_equipes.setAttribute('class', 'menu_secondaire');
            lien.parentElement.append(liste_equipes);
        }
        let nouvelle_ligne = document.createElement('li');
        let nouveau_lien = document.createElement('a');
        nouvelle_ligne.append(nouveau_lien);
        lien.parentElement.lastElementChild.append(nouvelle_ligne);
        nouveau_lien.setAttribute('href', nomEquipe.concat('.html'));
        nouveau_lien.innerHTML = nomEquipe;
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
        bouton_modification.addEventListener('click', modifier);
        bouton_suppression.addEventListener('click', supprimer);
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
    if(window.confirm('Voulez-vous vraiment supprimer cette équipe ?')){         
        let equipe = element.srcElement.parentElement;
        $.post("/deleteEquipe",
            {
                nom : element.srcElement.previousElementSibling.innerText
            },
            function(data, status){
                console.log(data);
            }
        );
        let lien = document.getElementById('lien_equipe');
        lien = lien.nextElementSibling;
        for(const [key, value] of Object.entries(lien.children)){
            if (value.firstElementChild.innerHTML == element.srcElement.previousElementSibling.innerHTML){
                value.remove();
            }
        };
        equipe.remove();
    }
}

function modifier(element){
    let equipe = element.srcElement.parentElement.cloneNode(true);
    element.srcElement.nextElementSibling.remove();
    let nouveau_logo = document.createElement('input');
    nouveau_logo.setAttribute('type', 'file');
    element.srcElement.insertAdjacentElement('afterend', nouveau_logo);
    let nom = nouveau_logo.nextElementSibling.innerText;
    nouveau_logo.nextElementSibling.remove();
    let nouveau_nom = document.createElement('input');
    nouveau_nom.setAttribute('type', 'text');
    nouveau_logo.insertAdjacentElement('afterend', nouveau_nom);
    nouveau_nom.value = nom;
    element.srcElement.removeEventListener('click', modifier);
    element.srcElement.addEventListener('click', () => {
        let nom_nouveau_logo = "";
        if (nouveau_logo.files.length != 0){
            nom_nouveau_logo = nouveau_logo.files[0].name;
        }
        $.post('/modifierEquipe', {nom:nom, nouveau_nom:nouveau_nom.value, nouveau_logo:nom_nouveau_logo}, function(data, status){
            if(data == 'succès') {
                console.log('Modification réussie');
                if(nouveau_logo.files.length != 0){
                    equipe.firstElementChild.nextElementSibling.setAttribute('src', '../img/'.concat(nouveau_logo.files[0].name));
                    equipe.firstElementChild.nextElementSibling.setAttribute('alt', nouveau_logo.files[0].name);
                }
                if(nouveau_nom.value != ''){
                    equipe.lastElementChild.previousElementSibling.innerText = nouveau_nom.value;
                }
                element.srcElement.parentElement.insertAdjacentElement('afterend', equipe);
                equipe.firstElementChild.addEventListener('click', modifier);
                equipe.lastElementChild.addEventListener('click', supprimer);
                element.srcElement.parentElement.remove();
            }
        })
    });
    element.srcElement.parentElement.lastElementChild.removeEventListener('click', supprimer);
    element.srcElement.parentElement.lastElementChild.addEventListener('click', ()=>{
        element.srcElement.parentElement.insertAdjacentElement('afterend', equipe);
        equipe.firstElementChild.addEventListener('click', modifier);
        equipe.lastElementChild.addEventListener('click', supprimer);
        element.srcElement.parentElement.remove();
    });
}

(function(){
    $.post("/loadEquipe",
        {},
        function(data, status){
            let nouvelleEquipe;
            if(data.length != 0){
                let lien_equipe = document.getElementById('lien_equipe');
                lien_equipe.innerText = 'Equipe'.concat('▼');
                let liste_equipes = document.createElement('ul');
                liste_equipes.setAttribute('class', 'menu_secondaire');
                lien_equipe.parentElement.append(liste_equipes);
            }
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
                bouton_suppression.addEventListener('click', supprimer);
                bouton_modification.addEventListener('click', modifier);
                liste.append(nouvelleEquipe);
                let nouvelle_ligne = document.createElement('li');
                let nouveau_lien = document.createElement('a');
                nouvelle_ligne.append(nouveau_lien);
                lien_equipe.parentElement.lastElementChild.append(nouvelle_ligne);
                nouveau_lien.setAttribute('href', value['nom'].concat('.html'));
                nouveau_lien.innerHTML = value['nom'];
            }
            ajout.remove();
            liste.append(ajout);
        }
    );
})()
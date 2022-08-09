let ajout = document.getElementById('creation_match');
let liste = document.getElementById('liste');

ajout.addEventListener('click', ajouter);

function ajouter(){
    let match = document.createElement('match');
    match.setAttribute('class', 'match');
    $.post('/loadEquipe', {}, 
        function(data, status){
            let tmp;
            if (data != 'Echec'){
                let equipe1 = document.createElement('select');
                tmp = document.createElement('option');
                tmp.setAttribute('value', "");
                tmp.innerText = "Veuillez choisir une équipe";
                equipe1.append(tmp);
                for(const [key, value] of Object.entries(data)){
                    tmp = document.createElement('option');
                    tmp.setAttribute('value', value['nom']);
                    tmp.innerText = value['nom'];
                    equipe1.append(tmp);
                };
                equipe1.setAttribute('class', 'choix_equipe');
                match.append(equipe1);
                let versus = document.createElement('p');
                versus.setAttribute('class', 'versus');
                versus.innerText = 'VS';
                match.append(versus);
                let equipe2 = document.createElement('select');
                equipe2.setAttribute('class', 'choix_equipe');
                match.append(equipe2);
                let date_match = document.createElement('input');
                date_match.setAttribute('id', 'choix_date_match');
                date_match.setAttribute('type', 'datetime-local');
                match.append(date_match);
                equipe1.addEventListener('change', () => {
                    equipe2.innerHTML = '';
                    tmp = document.createElement('option');
                    tmp.setAttribute('value', "");
                    tmp.innerText = "Veuillez choisir une équipe";
                    equipe2.append(tmp);
                    for(const [key, value] of Object.entries(data)){
                        if(value['nom'] != equipe1.value){
                            tmp = document.createElement('option');
                            tmp.setAttribute('value', value['nom']);
                            tmp.innerText = value['nom'];
                            equipe2.append(tmp);
                        }
                    }
                });
                date_match.addEventListener('change', () => {
                    if (Date.now() > new Date(date_match.value) && match.children.length != 6){
                        if(window.confirm("Voulez-vous rentrer les résultats du match ?")){
                            let resultat1 = document.createElement('input');
                            let resultat2 = document.createElement('input');
                            resultat1.setAttribute('class', 'resultat');
                            resultat2.setAttribute('class', 'resultat');
                            resultat1.setAttribute('type', 'number');
                            resultat2.setAttribute('type', 'number');
                            equipe1.insertAdjacentElement('afterend', resultat1);
                            equipe2.insertAdjacentElement('beforebegin', resultat2);
                            return;
                        }
                    }
                })
            };
        }
    );
    ajout.insertAdjacentElement('beforebegin', match);
    ajout.removeEventListener('click', ajouter);
    ajout.addEventListener('click', confirmer);
    ajout.innerText = 'confirmer';
}

function confirmer(){
    let equipes = document.getElementsByClassName('choix_equipe');
    let date_match = document.getElementById('choix_date_match');
    let resultat1 = '';
    let resultat2 = '';
    if (date_match.parentElement.children.length == 6){
        resultat1 = document.getElementsByClassName('resultat')[0].value;
        resultat2 = document.getElementsByClassName('resultat')[1].value;
    }
    if (equipes[0].value == '' || equipes[1].value == ''){
        window.alert('Veuillez choisir les équipes');
    }else if(date_match.value == date_match.defaultValue){
        window.alert('Veuillez choisir la date');
    }else{
        $.post('/addMatch', {equipe1 : equipes[0].value, equipe2 : equipes[1].value, date : date_match.value, resultat1 : resultat1, resultat2: resultat2},
            function(data, status){
                let date = document.createElement('p');
                date.setAttribute('class', 'date_match');
                date.innerText = new Date(date_match.value).toLocaleString();
                date_match.parentElement.append(date);
                date_match.remove();
                let equipe1 = document.createElement('div');
                let equipe2 = document.createElement('div');
                equipe1.setAttribute('class', 'equipe');
                equipe2.setAttribute('class', 'equipe');
                let nom1 = document.createElement('p');
                let nom2 = document.createElement('p');
                nom1.innerText = data[0]['nom'];
                nom2.innerText = data[1]['nom'];
                let logo1 = document.createElement('img');
                let logo2 = document.createElement('img');
                logo1.setAttribute('class', 'logo');
                logo2.setAttribute('class', 'logo');
                logo1.setAttribute('src', '../img/'.concat(data[0]['logo']));
                logo2.setAttribute('src', '../img/'.concat(data[1]['logo']));
                logo1.setAttribute('alt', 'logo de l\'équipe '.concat(data[0]['nom']));
                logo2.setAttribute('alt', 'logo de l\'équipe '.concat(data[1]['nom']));
                equipe1.append(nom1);
                equipe1.append(logo1);
                equipe2.append(nom2);
                equipe2.append(logo2);
                if (date.parentElement.children.length == 6){
                    let score1 = document.createElement('p');
                    let score2 = document.createElement('p');
                    score1.setAttribute('class', 'score');
                    score2.setAttribute('class', 'score');
                    score1.innerText = resultat1;
                    score2.innerHTML = resultat2;
                    if(nom1.innerText == equipes[0].value){
                        date.insertAdjacentElement('beforebegin', equipe2);
                        equipes[1].remove();
                        date.parentElement.prepend(equipe1);
                        equipes[0].remove();
                        if(resultat1 != "" && resultat2 != ''){
                            equipe1.insertAdjacentElement("afterend", score1);
                            equipe2.insertAdjacentElement('beforebegin', score2);
                        }
                        document.getElementsByClassName('resultat')[0].remove();
                        document.getElementsByClassName('resultat')[0].remove();
                    }else{
                        date.insertAdjacentElement('beforebegin', equipe1);
                        equipes[0].remove();
                        date.parentElement.prepend(equipe2);
                        equipes[0].remove();
                        if(resultat1 != "" && resultat2 != ''){
                            equipe2.insertAdjacentElement("afterend", score1);
                            equipe1.insertAdjacentElement('beforebegin', score2);
                        }
                        document.getElementsByClassName('resultat')[0].remove();
                        document.getElementsByClassName('resultat')[0].remove();
                    }
                }else{
                    if(nom1.innerText == equipes[0].value){
                        date.insertAdjacentElement('beforebegin', equipe2);
                        equipes[1].remove();
                        date.parentElement.prepend(equipe1);
                        equipes[0].remove();
                    }else{
                        date.insertAdjacentElement('beforebegin', equipe1);
                        equipes[0].remove();
                        date.parentElement.prepend(equipe2);
                        equipes[0].remove();
                    }
                }
            }
        );
        ajout.innerText = 'ajouter un match';
        ajout.removeEventListener('click', confirmer);
        ajout.addEventListener('click', ajouter);
    }
}

function supprimer(){
    if(window.confirm('Etes-vous sûr(e) de vouloir supprimer ce match ?')){
        
    }
}

function modifier(){
    
}

(function(){
    $.post('/loadMatch', {},
        function(data, status){
            for(const [key, value] of Object.entries(data)){
                let match = document.createElement('match');
                match.setAttribute('class', 'match');
                let equipe1 = document.createElement('div');
                let equipe2 = document.createElement('div');
                $.post('/loadEquipe', {equipe1 : value['equipe1'], equipe2 : value['equipe2']},
                    function(dataEquipe, statusEquipe){
                        equipe1.setAttribute('class', 'equipe');
                        equipe2.setAttribute('class', 'equipe');
                        let nom1 = document.createElement('p');
                        let nom2 = document.createElement('p');
                        nom1.innerText = dataEquipe[0]['nom'];
                        nom2.innerText = dataEquipe[1]['nom'];
                        let logo1 = document.createElement('img');
                        let logo2 = document.createElement('img');
                        logo1.setAttribute('class', 'logo');
                        logo2.setAttribute('class', 'logo');
                        logo1.setAttribute('src', '../img/'.concat(dataEquipe[0]['logo']));
                        logo2.setAttribute('src', '../img/'.concat(dataEquipe[1]['logo']));
                        logo1.setAttribute('alt', 'logo de l\'équipe '.concat(dataEquipe[0]['nom']));
                        logo2.setAttribute('alt', 'logo de l\'équipe '.concat(dataEquipe[1]['nom']));
                        equipe1.append(nom1);
                        equipe1.append(logo1);
                        equipe2.append(nom2);
                        equipe2.append(logo2);
                    }
                )
                match.append(equipe1);
                if (value['score_equipe1'] != null){
                    let score1 = document.createElement('p');
                    score1.setAttribute('class', 'score');
                    score1.innerText = value['score_equipe1'];
                    match.append(score1);
                }
                let versus = document.createElement('p');
                versus.setAttribute('class', 'versus');
                versus.innerText = 'VS';
                match.append(versus);
                if (value['score_equipe2'] != null){
                    let score2 = document.createElement('p');
                    score2.setAttribute('class', 'score');
                    score2.innerText = value['score_equipe2'];
                    match.append(score2);
                }
                match.append(equipe2);
                let date = document.createElement('p');
                date.setAttribute('class', 'date_match');
                date.innerText = new Date(value['date_match']).toLocaleDateString();
                match.append(date);
                ajout.insertAdjacentElement('beforebegin', match);
                let bouton_suppression = document.createElement('button');
                bouton_suppression.setAttribute('class', 'bouton_suppression');
                bouton_suppression.innerText = 'X';
                match.append(bouton_suppression);
                let bouton_modification = document.createElement('img');
                bouton_modification.setAttribute('class', 'bouton_modification');
                bouton_modification.setAttribute('src', '../img/edit.png');
                bouton_modification.setAttribute('alt', 'Bouton de modification');
                match.prepend(bouton_modification);
                bouton_suppression.addEventListener('click', supprimer);
                bouton_modification.addEventListener('click', modifier);
            }
        }
    );
})()
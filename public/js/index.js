let liste = document.getElementById('liste');


(function(){
$.post("/loadMatch",{},
function(data,status){
    for(const [key, value] of Object.entries(data)){
       
        if(Date.now() < new Date (value['date_match'])){
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
        }else{
            let score2 = document.createElement('p');
            score2.setAttribute('class', 'score');
            score2.innerText ='-';
            match.append(score2);
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
        }else{
            let score2 = document.createElement('p');
            score2.setAttribute('class', 'score');
            score2.innerText = '-';
            match.append(score2);
        }
        match.append(equipe2);
        let date = document.createElement('p');
        date.setAttribute('class', 'date_match');
        date.setAttribute('date', new Date(value['date_match']))
        date.innerText = new Date(value['date_match']).toLocaleString();
        match.append(date);
        liste.append(match);
                
            }}})})()
let logoe = document.getElementById('logo');
let equipe = document.getElementsByClassName('equipe_1_1')[0];
let input = document.querySelector('input[type=file]');

logoe.addEventListener('change',()=>{
  let equipe_2 = logoe.cloneNode();
    let image=document.createElement('img');
    image.setAttribute('class', 'logo_equipe');
    image.setAttribute('src', 'img/'.concat(logoe.files[0].name));
    image.setAttribute('alt', logoe.files.name);
    equipe.append(image);
    logoe.parentElement.parentElement.append(equipe_2);
    let question = window.prompt(' quel est le nom de l\'équipe ?');
    let nom_equipe = document.createElement('p');
    nom_equipe.innerText = question.concat(' - ');
    equipe.append(nom_equipe);
    logoe.remove();
    localStorage.setItem(question, logoe.files[0].name);
    
});

(function(){
    Object.entries(localStorage).forEach(entry =>{
        const[cle,valeur]=entry; 
        let equipe_2 = logoe.cloneNode();
        let nom_equipe = document.createElement('p');
        nom_equipe.innerText = cle.concat(' - ');
        equipe.prepend(nom_equipe);
        let image=document.createElement('img');
        image.setAttribute('class', 'logo_equipe');
        image.setAttribute('src', 'img/'.concat(valeur));
        image.setAttribute('alt', valeur);
        equipe.prepend(image);
        logoe.parentElement.parentElement.append(equipe_2);
    })
})();
const sections = {
    home: `
Ciao, sono Elxes, ho 20 anni e sono una software developer. Vivo in Italia e amo sviluppare software.
Le mie competenze principali includono:
- HTML, CSS, Python, JavaScript, Java, C, C++, C#
- Sviluppo web, desktop e mobile
- Backend, frontend e API development

`,
    about: `
Sono una ragazza appassionata di tecnologia e sviluppo software. Ho iniziato a programmare quando avevo 12 anni e non mi sono più fermata. Credo che il codice sia un potente strumento per cambiare il mondo. :)
`,
    contact: `
Se vuoi metterti in contatto con me, puoi trovarmi qui:
- Matrix: @Elxes:matrix.org
- Mastodon: @Elxes:mastodon.uno
- GitHub: github.com/Elxes04
`
};

let currentSection = 'home';
let i = 0;
let typingTimeout = null;
const speed = 20; 

function typeWriter(text) {
    if (i < text.length) {
        document.getElementById("bio").innerHTML += text.charAt(i);
        i++;
        typingTimeout = setTimeout(() => typeWriter(text), speed);
    }
}

function loadSection(section) {
    clearTimeout(typingTimeout);
    document.getElementById("bio").innerHTML = '';
    i = 0;
    typeWriter(sections[section]);  
}

document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function() {
        
        document.querySelector('.tab.active').classList.remove('active');
        
        this.classList.add('active');
        
        loadSection(this.getAttribute('data-section'));
    });
});

window.onload = function() {
    loadSection(currentSection);
};

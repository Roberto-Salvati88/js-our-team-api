// Stessa pagina di Our Team, ma i dati arrivano da un'API con una chiamata AJAX (axios)

const API_URL = 'https://boolean-teachers.github.io/mock/api/members/';

const teamContainer = document.getElementById('team-container');
const memberForm = document.getElementById('member-form');

// i membri arrivano dall'API: parto con un array vuoto
let teamMembers = [];

// riceve UN membro e restituisce l'HTML della sua card
function createMemberCard(member) {
  const { name, role, email, img } = member;

  return `
    <div class="col-12 col-md-6 col-lg-4">
      <div class="member-card">
        <img src="${img}" alt="${name}">
        <div class="info">
          <h3 class="h5 mb-1">${name}</h3>
          <p class="mb-1">${role}</p>
          <p class="email mb-0">${email}</p>
        </div>
      </div>
    </div>
  `;
}

function renderTeam() {
  teamContainer.innerHTML = teamMembers.map(createMemberCard).join('');
}

// la chiamata è ASINCRONA: i dati li ho solo dentro il .then
axios.get(API_URL)
  .then(response => {
    // con axios i dati sono già convertiti in response.data
    teamMembers = response.data;
    renderTeam();
  })
  .catch(error => {
    console.error(error);
    teamContainer.innerHTML = '<p>Impossibile caricare il team.</p>';
  });

// BONUS: form di aggiunta membri
memberForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const newMember = {
    name: document.getElementById('member-name').value.trim(),
    role: document.getElementById('member-role').value.trim(),
    email: document.getElementById('member-email').value.trim(),
    img: document.getElementById('member-img').value.trim()
  };

  teamMembers.push(newMember);
  renderTeam();
  memberForm.reset();
});

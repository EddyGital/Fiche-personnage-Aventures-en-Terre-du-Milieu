// ... (code précédent)

// Initialisation des compétences
function initializeSkills() {
    const skillList = [
        'Acrobaties', 'Arcanes', 'Athlétisme', 'Discrétion', 'Dressage',
        'Escamotage', 'Histoire', 'Intimidation', 'Investigation', 'Médecine',
        'Nature', 'Perception', 'Perspicacité', 'Persuasion', 'Religion',
        'Représentation', 'Survie', 'Tromperie'
    ];

    const skillsContainer = document.querySelector('.skills');
    skillList.forEach(skill => {
        const skillDiv = document.createElement('div');
        skillDiv.className = 'skill';
        skillDiv.innerHTML = `
            <label>
                <input type="checkbox" name="${skill}" id="${skill}">
                ${skill}
            </label>
            <span class="skill-bonus" id="${skill}Bonus"></span>
        `;
        skillsContainer.appendChild(skillDiv);
    });
}

// Mise à jour des bonus de compétences
function updateSkillBonuses() {
    const proficiencyBonus = parseInt(document.getElementById('proficiencyBonus').value) || 0;
    document.querySelectorAll('.skill').forEach(skillDiv => {
        const skillName = skillDiv.querySelector('input').name;
        const isProficcient = skillDiv.querySelector('input').checked;
        const relatedAbility = getRelatedAbility(skillName);
        const abilityBonus = parseInt(document.getElementById(`${relatedAbility}Bonus`).textContent) || 0;
        
        let skillBonus = abilityBonus;
        if (isProficcient) {
            skillBonus += proficiencyBonus;
        }
        
        skillDiv.querySelector('.skill-bonus').textContent = skillBonus >= 0 ? `+${skillBonus}` : skillBonus;
    });
}

// Obtenir la caractéristique liée à une compétence
function getRelatedAbility(skillName) {
    const skillAbilities = {
        'Force': ['Athlétisme'],
        'Dextérité': ['Acrobaties', 'Discrétion', 'Escamotage'],
        'Intelligence': ['Arcanes', 'Histoire', 'Investigation', 'Nature', 'Religion'],
        'Sagesse': ['Dressage', 'Médecine', 'Perception', 'Perspicacité', 'Survie'],
        'Charisme': ['Intimidation', 'Persuasion', 'Représentation', 'Tromperie']
    };

    for (const [ability, skills] of Object.entries(skillAbilities)) {
        if (skills.includes(skillName)) {
            return ability;
        }
    }
    return 'Force'; // Par défaut, si non trouvé
}

// Calcul des statistiques de combat
function updateCombatStats() {
    // Calcul de la CA (à adapter selon les règles spécifiques de votre jeu)
    const dexterityBonus = parseInt(document.getElementById('dexterityBonus').textContent) || 0;
    const baseAC = 10 + dexterityBonus;
    document.getElementById('ac').value = baseAC;

    // Calcul de l'initiative
    document.getElementById('initiative').value = dexterityBonus;

    // Calcul des points de vie maximum (à adapter selon les règles de votre jeu)
    const constitutionBonus = parseInt(document.getElementById('constitutionBonus').textContent) || 0;
    const totalLevel = parseInt(document.getElementById('totalLevel').value) || 1;
    const maxHP = (totalLevel * (6 + constitutionBonus)); // Exemple simplifié
    document.getElementById('maxHP').value = maxHP;
}

// Mise à jour de toutes les calculs
function updateAllCalculations() {
    updateTotalLevel();
    updateProficiencyBonus();
    updateSkillBonuses();
    updateCombatStats();
}

// Initialisation de l'application
function init() {
    initializeSkills();
    setupEventListeners();
    updateAllCalculations();
}

// ... (reste du code précédent)

document.addEventListener('DOMContentLoaded', init);

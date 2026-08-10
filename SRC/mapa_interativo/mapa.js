document.addEventListener('DOMContentLoaded', () => {
    const regions = document.querySelectorAll('.region');
    const infoPanel = document.getElementById('info-panel');

    const regionData = {
        'Norte': 'A maior região do Brasil em extensão territorial. Abriga a Floresta Amazônica e possui uma rica biodiversidade e cultura indígena.',
        'Nordeste': 'Conhecida por suas belas praias, clima tropical e forte herança cultural, incluindo o frevo, axé e uma culinária única.',
        'Centro-Oeste': 'Onde se localiza a capital federal, Brasília. É o coração do agronegócio brasileiro e abriga o Pantanal.',
        'Sudeste': 'A região mais populosa e desenvolvida economicamente. Inclui grandes metrópoles como São Paulo e Rio de Janeiro.',
        'Sul': 'Caracterizada pelo clima mais frio e forte influência da imigração europeia (alemã e italiana) em sua arquitetura e tradições.'
    };

    regions.forEach(region => {
        region.addEventListener('mouseenter', () => {
            const name = region.getAttribute('data-name');
            const description = regionData[name];
            
            infoPanel.innerHTML = `
                <h2>${name}</h2>
                <p>${description}</p>
            `;
        });

        region.addEventListener('mouseleave', () => {
            // Opcional: Voltar ao estado inicial
            // infoPanel.innerHTML = `
            //     <h2>Passe o mouse sobre uma região</h2>
            //     <p>Selecione uma região no mapa para ver mais detalhes.</p>
            // `;
        });

        region.addEventListener('click', () => {
            // Remove active class from others
            regions.forEach(r => r.classList.remove('active'));
            // Add active class to clicked region
            region.classList.add('active');
        });
    });
});

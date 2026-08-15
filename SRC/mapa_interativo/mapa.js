// Aguarda o HTML terminar de carregar antes de buscar elementos e registrar eventos.
document.addEventListener('DOMContentLoaded', () => {
    // Cada grupo .region representa uma grande região do Brasil dentro do SVG.
    const regions = [...document.querySelectorAll('.region')];
    const infoPanel = document.getElementById('info-panel');

    // Elementos que compõem o modal de detalhes da região selecionada.
    const modal = document.getElementById('legend-modal');
    const modalDialog = modal?.querySelector('.modal-dialog');
    const modalTitle = document.getElementById('modal-title');
    const modalSubtitle = document.getElementById('modal-subtitle');
    const modalDescription = document.getElementById('modal-description');
    const modalMore = document.getElementById('modal-more');
    const modalClose = document.getElementById('modal-close');
    const modalCloseSecondary = document.getElementById('modal-close-secondary');
    const carouselViewport = document.getElementById('carousel-viewport');
    const carouselDots = document.getElementById('carousel-dots');
    const carouselPrev = document.getElementById('carousel-prev');
    const carouselNext = document.getElementById('carousel-next');
    const btnTema = document.getElementById('btnTema');

    // Interrompe a execução com uma mensagem clara se o HTML estiver incompleto.
    if (!regions.length || !infoPanel || !modal || !modalDialog) {
        console.warn('Mapa: elementos essenciais não foram encontrados.');
        return;
    }

    /*
     * Banco de conteúdo das regiões.
     *
     * Para substituir os placeholders, altere:
     * - name: nome exibido no painel e no modal;
     * - title: título da lenda em destaque;
     * - description: resumo inicial da lenda;
     * - page: arquivo que será aberto pelo botão "Saber mais";
     * - images: endereço, texto alternativo e legenda de cada imagem.
     */
    const regionData = {
        norte: {
            name: 'Norte',
            title: ' Região Norte',
            description: 'A Região Norte do Brasil é conhecida pela Floresta Amazônica, seus grandes rios e sua rica cultura. Suas lendas são muito ligadas à natureza, como as do Boto, Iara, Curupira e Vitória-Régia. Essas histórias são transmitidas de geração em geração e fazem parte da cultura e da identidade dos povos da região.',
            page: '../Lendas_Locais/Norte/norte.html',
            images: [
                { src: '../img/Boto Cor-de-Rosa.png', alt: 'boto cor de rosa', caption: 'Imagem da lenda local Boto Cor-de-Rosa' },
                { src: '../img/Iara (Mãe-d\'Água).png', alt: 'Iara (Mãe-d\'Água)', caption: 'Imagem da lenda local Iara (Mãe-d\'Água)' },
                { src: '../img/Curupira.png', alt: 'Curupira', caption: 'Imagem da lenda local Curupira' },
            ]
        },
        nordeste: {
            name: 'Nordeste',
            title: ' Região Nordeste',
            description: 'A Região Nordeste do Brasil é conhecida por sua rica cultura, história e tradições. Suas lendas são profundamente enraizadas na identidade local, refletindo a mistura de influências indígenas, africanas e europeias. Alguns exemplos são o Caipora, o bicho da usina e o Homem do saco.',
            page: '../Lendas_Locais/Nordeste/nordeste.html',
            images: [
                { src: '../img/Bicho da Usina Uruba.png', alt: 'bicho da usina', caption: 'Imagem da lenda local Bicho da Usina.' },
                { src: '../img/Papa-Figo_(Homem do Saco).png', alt: 'Homem do Saco', caption: 'Imagem da lenda local Homem do Saco' },
                { src: '../img/A Caipora.png', alt: 'Caipora', caption: 'Imagem da lenda local Caipora' }
            ]
        },
        'centro-oeste': {
            name: 'Centro-Oeste',
            title: 'Região Centro-Oeste',
            description: 'A Região Centro-Oeste, é marcada pelo Pantanal, pelo Cerrado e por grandes rios, que aparecem em muitas histórias populares. Entre as lendas mais conhecidas estão o Minhocão do Paranaíba, a Mãe-do-Ouro e o Touro negro da serra, que fazem parte do folclore da região',
            page: '../Lendas_Locais/Centro-Oeste/centro-oeste.html',
            images: [
                { src: '../img/Minhocão do Pari.png', alt: 'Minhocão do Paranaíba', caption: 'Imagem da lenda local Minhocão do Paranaíba.' },
                { src: '../img/Mãe do Ouro.png', alt: 'Mãe do Ouro', caption: 'Imagem da lenda local Mãe do Ouro.' },
                { src: '../img/Touro Negro da Serra da Bodoquena.png', alt: 'Touro Negro da Serra', caption: 'Imagem da lenda local Touro Negro da Serra.' }
            ]
        },
        sudeste: {
            name: 'Sudeste',
            title: 'Região Sudeste',
            description: 'A região Sudeste do Brasil mistura diversas culturas e tradições, desde festas, comidas, músicas, religiões e danças. As lendas da região mais conhecidas estão a loira do banheiro, diabo na garrafa e o corpo seco.',
            page: '../Lendas_Locais/Sudeste/sudeste.html',
            images: [
                { src: '../img/Loira do Banheiro.png', alt: 'Loira do Banheiro', caption: 'Imagem da lenda local Loira do Banheiro.' },
                { src: '../img/Diabo na Garrafa.png', alt: 'Diabo na Garrafa', caption: 'Imagem da lenda local Diabo na Garrafa.' },
                { src: '../img/Corpo-Seco.png', alt: 'O Corpo Seco', caption: 'Imagem da lenda local O Corpo Seco.' }
            ]
        },
        sul: {
            name: 'Sul',
            title: 'Região Sul',
            description: 'A região Sul do Brasil é tem uma culturo muito influenciada pelos imigrantes europeus, principalmente alemães, italianos e poloneses. Essas influências aparecem nas festas, comidas, músicas e tradições. Entre as lendas mais conhecidas estão o Negrinho do Pastoreio, a Bruxa de Itaguaçu e a Gruta da Lagoa encantada, que fazem parte do folclore sulista.',
            page: '../Lendas_Locais/Sul/sul.html',
            images: [
                { src: '../img/Negrinho do Pastoreio.png', alt: 'Negrinho do Pastoreio', caption: 'Imagem da lenda local Negrinho do Pastoreio.' },
                { src: '../img/Bruxa de Itaguaçu.png', alt: 'Bruxa de Itaguaçu', caption: 'Imagem da lenda local Bruxa de Itaguaçu.' },
                { src: '../img/Gruta da Lagoa Encantada.png', alt: 'Gruta da Lagoa Encantada', caption: 'Imagem da lenda local Gruta da Lagoa Encantada.' }
            ]
        }
    };

    // Estado temporário da interface.
    let activeRegionId = null;
    let currentSlide = 0;
    let lastFocusedElement = null;

    // Usa o id do grupo SVG para localizar os dados da região no objeto acima.
    const getRegionData = (region) => regionData[region.id] || null;

    // Atualiza o painel que fica abaixo do mapa sem abrir o modal.
    const setInfoPanel = (data) => {
        if (!data) return;
        infoPanel.innerHTML = `
            <div class="info-icon" aria-hidden="true">✦</div>
            <h2>${data.name}</h2>
            <p>${data.description}</p>
        `;
    };

    // Remove o destaque visual de todas as regiões e aplica-o somente à escolhida.
    const setActiveRegion = (region) => {
        regions.forEach((item) => item.classList.toggle('active', item === region));
    };

    // Mostra uma mensagem amigável caso uma imagem externa ou local não carregue.
    const createImageFallback = (slide, alt, caption) => {
        slide.innerHTML = `
            <div class="carousel-placeholder" role="img" aria-label="${alt}">
                Imagem placeholder indisponível. Substitua este espaço pela ilustração da lenda.
            </div>
            <figcaption>${caption}</figcaption>
        `;
    };

    // Sincroniza a classe visual e os atributos de acessibilidade do carrossel.
    const updateCarousel = () => {
        const slides = [...carouselViewport.querySelectorAll('.carousel-slide')];
        const dots = [...carouselDots.querySelectorAll('.carousel-dot')];

        slides.forEach((slide, index) => {
            const isActive = index === currentSlide;
            slide.classList.toggle('is-active', isActive);
            slide.setAttribute('aria-hidden', String(!isActive));
        });

        dots.forEach((dot, index) => {
            const isActive = index === currentSlide;
            dot.classList.toggle('is-active', isActive);
            dot.setAttribute('aria-current', isActive ? 'true' : 'false');
        });
    };

    // Cria os slides e os indicadores sempre que uma nova região é selecionada.
    const renderCarousel = (images) => {
        const safeImages = Array.isArray(images) && images.length ? images : [{
            src: '',
            alt: 'Imagem placeholder',
            caption: 'Adicione imagens da lenda nesta região.'
        }];

        carouselViewport.innerHTML = '';
        carouselDots.innerHTML = '';
        currentSlide = 0;

        // Cada objeto de imagem gera um slide e um botão indicador correspondente.
        safeImages.forEach((image, index) => {
            const figure = document.createElement('figure');
            figure.className = `carousel-slide${index === 0 ? ' is-active' : ''}`;
            figure.setAttribute('aria-hidden', String(index !== 0));
            figure.innerHTML = `
                <img src="${image.src}" alt="${image.alt}" loading="lazy">
                <figcaption>${image.caption}</figcaption>
            `;

            const imageElement = figure.querySelector('img');
            imageElement.addEventListener('error', () => {
                createImageFallback(figure, image.alt, image.caption);
            }, { once: true });

            carouselViewport.appendChild(figure);

            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = `carousel-dot${index === 0 ? ' is-active' : ''}`;
            dot.setAttribute('aria-label', `Mostrar imagem ${index + 1}`);
            dot.setAttribute('aria-current', index === 0 ? 'true' : 'false');
            dot.addEventListener('click', () => {
                currentSlide = index;
                updateCarousel();
            });
            carouselDots.appendChild(dot);
        });

        const hasMultipleSlides = safeImages.length > 1;
        carouselPrev.hidden = !hasMultipleSlides;
        carouselNext.hidden = !hasMultipleSlides;
        carouselDots.hidden = !hasMultipleSlides;
        updateCarousel();
    };

    // Preenche o modal, atualiza o link "Saber mais" e o torna visível.
    const openModal = (region, trigger = region) => {
        const data = getRegionData(region);
        if (!data) return;

        activeRegionId = region.id;
        lastFocusedElement = trigger || document.activeElement;
        setActiveRegion(region);
        setInfoPanel(data);

        modalTitle.textContent = data.name;
        modalSubtitle.textContent = data.title;
        modalDescription.textContent = data.description;
        modalMore.href = data.page;
        modalMore.setAttribute('aria-label', `Saber mais sobre as lendas da região ${data.name}`);
        renderCarousel(data.images);

        modal.hidden = false;
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        modalDialog.focus();
    };

    // Fecha o modal, libera o scroll e devolve o foco ao elemento que o abriu.
    const closeModal = () => {
        modal.hidden = true;
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        activeRegionId = null;

        if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
            lastFocusedElement.focus();
        }
    };

    // Navega circularmente entre os slides: depois do último, volta ao primeiro.
    const moveSlide = (direction) => {
        const totalSlides = carouselViewport.querySelectorAll('.carousel-slide').length;
        if (totalSlides < 2) return;
        currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
        updateCarousel();
    };

    // Torna cada grupo SVG acessível por mouse, teclado e tecnologias assistivas.
    regions.forEach((region) => {
        const data = getRegionData(region);
        if (!data) return;

        region.setAttribute('role', 'button');
        region.setAttribute('tabindex', '0');
        region.setAttribute('aria-label', `Abrir lendas da região ${data.name}`);

        region.addEventListener('mouseenter', () => setInfoPanel(data));
        region.addEventListener('focus', () => setInfoPanel(data));
        region.addEventListener('click', () => openModal(region, region));
        region.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openModal(region, region);
            }
        });
    });

    // Eventos dos controles visuais do modal.
    carouselPrev.addEventListener('click', () => moveSlide(-1));
    carouselNext.addEventListener('click', () => moveSlide(1));
    modalClose.addEventListener('click', closeModal);
    modalCloseSecondary.addEventListener('click', closeModal);

    modal.addEventListener('click', (event) => {
        if (event.target.matches('[data-modal-close]')) {
            closeModal();
        }
    });

    // Atalhos globais enquanto o modal está aberto: Esc fecha, setas navegam e Tab fica contido.
    document.addEventListener('keydown', (event) => {
        if (modal.hidden) return;

        if (event.key === 'Escape') {
            event.preventDefault();
            closeModal();
            return;
        }

        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            moveSlide(-1);
            return;
        }

        if (event.key === 'ArrowRight') {
            event.preventDefault();
            moveSlide(1);
            return;
        }

        if (event.key === 'Tab') {
            const focusable = [...modal.querySelectorAll('button:not([hidden]), a[href], [tabindex]:not([tabindex="-1"])')]
                .filter((element) => !element.disabled && element.offsetParent !== null);
            if (!focusable.length) return;

            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }
    });

    // Persiste a preferência do botão de tema no armazenamento do navegador.
    if (btnTema) {
        const savedTheme = localStorage.getItem('obscurium-theme');
        if (savedTheme === 'claro') document.body.classList.add('tema-claro');

        const updateThemeButton = () => {
            const isLight = document.body.classList.contains('tema-claro');
            btnTema.textContent = isLight ? 'Tema escuro' : 'Tema claro';
            btnTema.setAttribute('aria-pressed', String(isLight));
        };

        updateThemeButton();
        btnTema.addEventListener('click', () => {
            const isLight = document.body.classList.toggle('tema-claro');
            localStorage.setItem('obscurium-theme', isLight ? 'claro' : 'escuro');
            updateThemeButton();
        });
    }
});

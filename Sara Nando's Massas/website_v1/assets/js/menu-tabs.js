class MenuTabs {
    constructor() {
        this.tabsContainer = document.querySelector('.ul-menus-tab-navs');
        this.contentContainer = document.querySelector('.tabs');
        this.activeTab = 'pasta-all';
        
        this.init();
    }

    init() {
        // Renderiza as tabs
        this.renderTabs();
        
        // Renderiza o conteúdo inicial
        this.renderContent(this.activeTab);
        
        // Adiciona os event listeners
        this.addEventListeners();
    }

    renderTabs() {
        Object.keys(menuData).forEach(tabId => {
            const button = document.createElement('button');
            button.setAttribute('data-tab', tabId);
            button.className = `tab-nav ${tabId === this.activeTab ? 'active' : ''}`;
            button.innerHTML = `<span class="txt">${menuData[tabId].title}</span>`;
            this.tabsContainer.appendChild(button);
        });
    }

    renderContent(tabId) {
        const items = menuData[tabId].items;
        const tabContent = document.createElement('div');
        tabContent.className = `ul-tab ul-menu-tab ${tabId === this.activeTab ? 'active' : ''}`;
        tabContent.id = tabId;

        let html = '<div class="row ul-bs-row row-cols-md-2 row-cols-1 align-items-stretch">';
        
        // Renderiza os itens do menu
        items.forEach(item => {
            html += `
                <div class="col d-flex">
                    <div class="ul-menu-item w-100">
                        <div class="ul-menu-item-img">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="ul-menu-item-txt">
                            <div class="left">
                                <a href="shop-details.html" class="ul-menu-item-title">${item.name}</a>
                                <span class="ul-menu-item-sub-title">${item.description}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

        // Adiciona o botão "Sugira um Novo Sabor" apenas na tab "Todas"
        if (tabId === 'pasta-all') {
            html += `
                <div class="col d-flex">
                    <div class="ul-menu-item ul-menu-item-suggest w-100">
                        <div class="ul-menu-item-img suggest-bg">
                            <i class="fas fa-lightbulb"></i>
                        </div>
                        <div class="ul-menu-item-txt">
                            <div class="left">
                                <a href="#" class="ul-menu-item-title" data-bs-toggle="modal" data-bs-target="#sugerirSaborModal">Sugira um Novo Sabor!</a>
                                <span class="ul-menu-item-sub-title">Tem uma ideia incrível para uma nova massa? Compartilhe conosco!</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        html += '</div>';
        tabContent.innerHTML = html;

        // Limpa o conteúdo anterior e adiciona o novo
        this.contentContainer.innerHTML = '';
        this.contentContainer.appendChild(tabContent);
    }

    addEventListeners() {
        this.tabsContainer.addEventListener('click', (e) => {
            const button = e.target.closest('.tab-nav');
            if (!button) return;

            const tabId = button.getAttribute('data-tab');
            
            // Remove a classe active de todas as tabs
            this.tabsContainer.querySelectorAll('.tab-nav').forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Adiciona a classe active na tab clicada
            button.classList.add('active');
            
            // Atualiza a tab ativa
            this.activeTab = tabId;
            
            // Renderiza o novo conteúdo
            this.renderContent(tabId);
        });
    }
}

// Inicializa o sistema de tabs quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new MenuTabs();
}); 
// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Variáveis globais
let currentStep = 1;
let totalSteps = 4;
let formData = {};

// Inicialização da aplicação
function initializeApp() {
    console.log('=== INICIALIZANDO APLICAÇÃO ===');
    
    initializeBackgroundVideo();
    createParticles();
    initializeForm();
    setupEventListeners();
    initializeLucideIcons();
    setupLogoInteraction();
    
    // Garantir que o progresso seja atualizado corretamente
    setTimeout(() => {
        updateProgress();
        console.log('Progresso inicial:', currentStep, '/', totalSteps);
    }, 100);
    
    // Testar se mailto funciona no navegador
    testMailtoSupport();
    
    console.log('=== APLICAÇÃO INICIALIZADA ===');
}

// Inicializar vídeo de background
function initializeBackgroundVideo() {
    const video = document.getElementById('background-video');
    if (video) {
        // Configurações para reprodução fluida
        video.playbackRate = 1.0;
        video.defaultPlaybackRate = 1.0;
        
        // Garantir que o vídeo carregue e reproduza
        video.addEventListener('loadeddata', function() {
            console.log('Vídeo de background carregado');
            
            // Ocultar loading indicator
            const loadingIndicator = document.getElementById('video-loading');
            if (loadingIndicator) {
                loadingIndicator.style.opacity = '0';
                setTimeout(() => {
                    loadingIndicator.style.display = 'none';
                }, 500);
            }
            
            ensureVideoPlayback();
        });
        
        // Garantir reprodução contínua
        video.addEventListener('ended', function() {
            console.log('Vídeo terminou, reiniciando...');
            video.currentTime = 0;
            video.play().catch(function(error) {
                console.log('Erro ao reiniciar vídeo:', error);
            });
        });
        
        // Garantir que o vídeo continue reproduzindo
        video.addEventListener('pause', function() {
            console.log('Vídeo pausado, retomando...');
            setTimeout(() => {
                video.play().catch(function(error) {
                    console.log('Erro ao retomar vídeo:', error);
                });
            }, 100);
        });
        
        // Fallback para dispositivos móveis
        video.addEventListener('error', function() {
            console.log('Erro ao carregar vídeo, usando fallback');
            
            // Ocultar loading indicator
            const loadingIndicator = document.getElementById('video-loading');
            if (loadingIndicator) {
                loadingIndicator.style.display = 'none';
            }
            
            // Criar fallback
            const fallback = document.createElement('div');
            fallback.className = 'absolute inset-0 w-full h-full bg-gradient-to-br from-primary-900 via-black to-primary-800';
            video.parentNode.appendChild(fallback);
        });
        
        // Timeout para fallback se o vídeo não carregar em 10 segundos
        setTimeout(() => {
            if (video.readyState < 2) { // HAVE_CURRENT_DATA
                console.log('Vídeo não carregou em tempo hábil, usando fallback');
                video.dispatchEvent(new Event('error'));
            }
        }, 10000);
        
        // Controle inteligente de visibilidade (mantém reprodução mais fluida)
        let isPageVisible = true;
        document.addEventListener('visibilitychange', function() {
            isPageVisible = !document.hidden;
            
            if (isPageVisible) {
                // Retomar reprodução quando a página se tornar visível
                setTimeout(() => {
                    if (video.paused) {
                        video.play().catch(function(error) {
                            console.log('Erro ao retomar vídeo:', error);
                        });
                    }
                }, 200);
            }
        });
        
        // Função para garantir reprodução
        function ensureVideoPlayback() {
            if (video.paused && isPageVisible) {
                video.play().catch(function(error) {
                    console.log('Erro ao reproduzir vídeo:', error);
                    // Tentar novamente após um delay
                    setTimeout(ensureVideoPlayback, 1000);
                });
            }
        }
        
            // Verificar periodicamente se o vídeo está reproduzindo
    setInterval(ensureVideoPlayback, 5000);
}

// Adicionar interatividade ao logo
function setupLogoInteraction() {
    const logoContainer = document.querySelector('header .group');
    if (logoContainer) {
        logoContainer.addEventListener('click', function() {
            // Efeito de clique
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Scroll suave para o topo
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            console.log('Logo clicado - scroll para o topo');
        });
        
        // Adicionar cursor pointer
        logoContainer.style.cursor = 'pointer';
    }
}
}

// Testar suporte ao mailto
function testMailtoSupport() {
    try {
        const testLink = document.createElement('a');
        testLink.href = 'mailto:test@example.com?subject=Test&body=Test';
        testLink.style.display = 'none';
        document.body.appendChild(testLink);
        
        // Verificar se o navegador suporta mailto
        if (testLink.protocol === 'mailto:') {
            console.log('Mailto suportado pelo navegador');
        } else {
            console.warn('Mailto pode não ser suportado');
        }
        
        document.body.removeChild(testLink);
    } catch (error) {
        console.warn('Erro ao testar mailto:', error);
    }
}

// Criação de partículas animadas
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Inicialização dos ícones Lucide
function initializeLucideIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Configuração dos event listeners
function setupEventListeners() {
    // Máscara de telefone
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 11) {
                value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
                value = value.replace(/(\d)(\d{4})$/, '$1-$2');
                e.target.value = value;
            }
        });
    }

    // Validação de email em tempo real
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', validateEmail);
        emailInput.addEventListener('input', function() {
            removeError(emailInput);
        });
    }

    // Validação de data
    const prazoInput = document.getElementById('prazo');
    if (prazoInput) {
        prazoInput.addEventListener('change', validateDate);
        // Definir data mínima como hoje
        const today = new Date().toISOString().split('T')[0];
        prazoInput.min = today;
    }

    // Radio buttons de prioridade
    const priorityRadios = document.querySelectorAll('input[name="prioridade"]');
    priorityRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            // Remover erro quando uma opção for selecionada
            const priorityContainer = document.querySelector('.priority-option').parentNode;
            const errorMessage = priorityContainer.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
            
            // Adicionar efeito visual de seleção
            priorityRadios.forEach(r => {
                const label = r.closest('.priority-option');
                if (r.checked) {
                    label.classList.add('selected');
                } else {
                    label.classList.remove('selected');
                }
            });
            
            console.log('Prioridade selecionada:', this.value);
        });
    });

    // Campo "Outros" condicional
    const outrosCheckbox = document.querySelector('input[value="outros"]');
    if (outrosCheckbox) {
        outrosCheckbox.addEventListener('change', function() {
            const outrosCampo = document.getElementById('outros-campo');
            const outrosEspecifico = document.getElementById('outros-especifico');
            
            if (this.checked) {
                outrosCampo.classList.remove('hidden');
                outrosEspecifico.required = true;
            } else {
                outrosCampo.classList.add('hidden');
                outrosEspecifico.required = false;
                outrosEspecifico.value = '';
            }
        });
    }

    // Validação de campos obrigatórios
    const requiredInputs = document.querySelectorAll('input[required], textarea[required], select[required]');
    requiredInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateRequiredField(this);
        });
        input.addEventListener('input', function() {
            removeError(this);
        });
    });

    // Auto-save em variáveis JS
    const formInputs = document.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            saveFormData();
        });
        input.addEventListener('change', function() {
            saveFormData();
        });
    });

    // Navegação por teclado
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.ctrlKey) {
            e.preventDefault();
            if (currentStep < totalSteps) {
                nextStep();
            } else {
                submitForm();
            }
        }
    });
    
    // Interceptar envio do formulário
    const form = document.getElementById('briefing-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevenir envio padrão
            submitForm();
        });
    }
}

// Inicialização do formulário
function initializeForm() {
    // Garantir que comece na etapa 1
    currentStep = 1;
    showStep(1);
    updateProgress();
    
    console.log('Formulário inicializado - Etapa 1, Progresso 0%');
}

// Navegação entre etapas
function nextStep() {
    if (validateCurrentStep()) {
        if (currentStep < totalSteps) {
            currentStep++;
            showStep(currentStep);
            updateProgress();
            scrollToTop();
            // Se avançou da primeira para a segunda etapa, ocultar o hero
            if (currentStep === 2) {
                const hero = document.querySelector('section.relative.z-20.py-20');
                if (hero) hero.style.display = 'none';
            }
        }
    }
}

function previousStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
        updateProgress();
        scrollToTop();
    }
}

// Exibir etapa específica
function showStep(step) {
    // Ocultar todas as etapas com animação
    document.querySelectorAll('.form-step').forEach(el => {
        el.classList.remove('active');
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
    });
    
    // Mostrar etapa atual com animação
    const currentStepElement = document.querySelector(`[data-step="${step}"]`);
    if (currentStepElement) {
        currentStepElement.classList.add('active');
        currentStepElement.classList.add('step-transition');
        
        // Animar entrada da etapa
        setTimeout(() => {
            currentStepElement.style.opacity = '1';
            currentStepElement.style.transform = 'translateY(0)';
        }, 100);
        
        // Remover classe de transição após animação
        setTimeout(() => {
            currentStepElement.classList.remove('step-transition');
        }, 600);
    }
    
    // Atualizar botões de navegação
    updateNavigationButtons();
    
    console.log(`Etapa ${step} exibida`);
}

// Atualizar botões de navegação
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    
    if (prevBtn) {
        prevBtn.classList.toggle('hidden', currentStep === 1);
    }
    
    if (nextBtn) {
        nextBtn.classList.toggle('hidden', currentStep === totalSteps);
    }
    
    if (submitBtn) {
        submitBtn.classList.toggle('hidden', currentStep !== totalSteps);
    }
}

// Atualizar barra de progresso
function updateProgress() {
    // Calcular progresso baseado na etapa atual (0% na etapa 1, 100% na última)
    let progress = 0;
    if (totalSteps > 1) {
        progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
    }
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    
    if (progressBar) {
        progressBar.style.width = progress + '%';
        // Adicionar animação suave
        progressBar.style.transition = 'width 0.5s ease-in-out';
    }
    
    if (progressText) {
        progressText.textContent = Math.round(progress) + '%';
        // Adicionar animação de contador
        progressText.style.transition = 'color 0.3s ease';
        if (progress === 100) {
            progressText.style.color = '#22c55e';
        } else {
            progressText.style.color = '#22c55e';
        }
    }
    
    console.log(`Progresso atualizado: ${progress}% (Etapa ${currentStep}/${totalSteps})`);
}

// Validação da etapa atual
function validateCurrentStep() {
    const currentStepElement = document.querySelector(`[data-step="${currentStep}"]`);
    const requiredFields = currentStepElement.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateRequiredField(field)) {
            isValid = false;
        }
    });
    
    // Validações específicas por etapa
    switch (currentStep) {
        case 1:
            isValid = isValid && validateEmail() && validatePhone() && validatePriority();
            break;
        case 3:
            isValid = isValid && validateMaterials();
            break;
    }
    
    return isValid;
}

// Validação de campo obrigatório
function validateRequiredField(field) {
    const value = field.value.trim();
    const isValid = value.length > 0;
    
    if (!isValid) {
        showError(field, 'Este campo é obrigatório');
    } else {
        removeError(field);
    }
    
    return isValid;
}

// Validação de email
function validateEmail() {
    const emailInput = document.getElementById('email');
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email && !emailRegex.test(email)) {
        showError(emailInput, 'Digite um email válido');
        return false;
    } else {
        removeError(emailInput);
        return true;
    }
}

// Validação de telefone
function validatePhone() {
    const phoneInput = document.getElementById('telefone');
    const phone = phoneInput.value.replace(/\D/g, '');
    
    if (phone.length < 10) {
        showError(phoneInput, 'Digite um telefone válido');
        return false;
    } else {
        removeError(phoneInput);
        return true;
    }
}

// Validação de prioridade
function validatePriority() {
    const priorityRadios = document.querySelectorAll('input[name="prioridade"]');
    const selectedPriority = document.querySelector('input[name="prioridade"]:checked');
    const priorityContainer = document.querySelector('.priority-option').parentNode;
    
    if (!selectedPriority) {
        // Mostrar erro no container dos radio buttons
        if (!priorityContainer.querySelector('.error-message')) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message text-red-400 text-sm mt-2 flex items-center';
            errorDiv.innerHTML = '<i data-lucide="alert-circle" class="w-4 h-4 mr-1"></i>Selecione um nível de prioridade';
            priorityContainer.appendChild(errorDiv);
            
            // Re-inicializar ícones
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }
        return false;
    } else {
        // Remover erro se existir
        const errorMessage = priorityContainer.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
        return true;
    }
}

// Validação de data
function validateDate() {
    const dateInput = document.getElementById('prazo');
    const selectedDate = new Date(dateInput.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        showError(dateInput, 'A data não pode ser no passado');
        return false;
    } else {
        removeError(dateInput);
        return true;
    }
}

// Validação de materiais
function validateMaterials() {
    const materialCheckboxes = document.querySelectorAll('input[name="materiais"]:checked');
    const outrosCheckbox = document.querySelector('input[value="outros"]');
    const outrosEspecifico = document.getElementById('outros-especifico');
    
    if (materialCheckboxes.length === 0) {
        showError(document.querySelector('.material-option'), 'Selecione pelo menos um tipo de material');
        return false;
    }
    
    if (outrosCheckbox && outrosCheckbox.checked && !outrosEspecifico.value.trim()) {
        showError(outrosEspecifico, 'Especifique o tipo de material');
        return false;
    }
    
    return true;
}

// Exibir erro
function showError(field, message) {
    removeError(field);
    
    field.classList.add('error');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
    
    // Scroll para o erro
    field.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Remover erro
function removeError(field) {
    field.classList.remove('error');
    
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// Salvar dados do formulário
function saveFormData() {
    const form = document.getElementById('briefing-form');
    const formDataObj = new FormData(form);
    
    for (let [key, value] of formDataObj.entries()) {
        formData[key] = value;
    }
    
    // Salvar arrays para checkboxes
    const materiais = [];
    document.querySelectorAll('input[name="materiais"]:checked').forEach(checkbox => {
        materiais.push(checkbox.value);
    });
    formData.materiais = materiais;
}

// Limpar formulário
function clearForm() {
    showCustomConfirm(
        'Tem certeza que deseja limpar todo o formulário?',
        () => {
            document.getElementById('briefing-form').reset();
            currentStep = 1;
            showStep(1);
            updateProgress();
            formData = {};
            // Limpar erros
            document.querySelectorAll('.error').forEach(field => {
                removeError(field);
            });
            // Ocultar campo "outros"
            document.getElementById('outros-campo').classList.add('hidden');
            // Feedback visual
            showNotification('Formulário limpo com sucesso!', 'success');
        }
    );
}

// Modal customizado de confirmação
function showCustomConfirm(message, onConfirm) {
    // Remover modal existente
    const existing = document.getElementById('custom-confirm-modal');
    if (existing) existing.remove();
    
    const modal = document.createElement('div');
    modal.id = 'custom-confirm-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm';
    modal.innerHTML = `
        <div class="bg-white/10 backdrop-blur-xl border border-accent-500/20 rounded-2xl p-8 max-w-md w-full shadow-2xl flex flex-col items-center">
            <h3 class="text-lg font-bold text-accent-400 mb-4">Confirmação</h3>
            <p class="text-white text-center mb-6">${message}</p>
            <div class="flex gap-4">
                <button id="custom-confirm-ok" class="px-6 py-2 rounded-lg bg-accent-500 text-white font-semibold hover:bg-accent-600 transition">OK</button>
                <button id="custom-confirm-cancel" class="px-6 py-2 rounded-lg bg-gray-700 text-gray-200 font-semibold hover:bg-gray-600 transition">Cancelar</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    document.getElementById('custom-confirm-ok').onclick = () => {
        modal.remove();
        if (typeof onConfirm === 'function') onConfirm();
    };
    document.getElementById('custom-confirm-cancel').onclick = () => {
        modal.remove();
    };
    // Fechar com ESC
    document.addEventListener('keydown', function escListener(e) {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', escListener);
        }
    });
}

// Submissão do formulário
function submitForm() {
    // Prevenir o comportamento padrão do formulário
    event.preventDefault();
    
    console.log('=== INICIANDO SUBMISSÃO DO FORMULÁRIO ===');
    
    // Validar a etapa atual antes de prosseguir
    if (!validateCurrentStep()) {
        console.log('Validação falhou - não prosseguindo');
        return false;
    }
    
    // Salvar dados do formulário
    saveFormData();
    console.log('Dados salvos:', formData);
    
    // Gerar e enviar email
    generateEmail();
    
    // Após envio, mostrar hero, resetar e ocultar formulário
    setTimeout(() => {
        const hero = document.querySelector('section.relative.z-20.py-20');
        const formSection = document.getElementById('formulario');
        if (hero) hero.style.display = '';
        if (formSection) formSection.scrollIntoView({behavior: 'smooth', block: 'start'});
        window.scrollTo({top: 0, behavior: 'smooth'});
        // Resetar o formulário para o estado inicial
        if (typeof clearForm === 'function') {
            clearForm();
        } else {
            // fallback manual
            const form = document.getElementById('briefing-form');
            if (form) form.reset();
            currentStep = 1;
            showStep(1);
            updateProgress();
            formData = {};
        }
    }, 1200); // espera a mensagem de sucesso aparecer
    
    return false; // Prevenir envio padrão
}

// Geração do email
function generateEmail() {
    console.log('=== GERANDO EMAIL ===');
    console.log('Dados do formulário:', formData);
    
    // Template de email estruturado
    const subject = `🎯 Nova Solicitação - ${formData.projeto || 'Sem título'} - ${formData.prioridade || 'Não definida'}`;
    
    // Template de texto estruturado
    const bodyText = `📋 NOVO BRIEFING DE MARKETING - ADUBOS REAL
Data: ${new Date().toLocaleDateString('pt-BR')}

👤 IDENTIFICAÇÃO:
Nome: ${formData.nome || 'Não informado'}
Departamento: ${formData.departamento || 'Não informado'}
Email: ${formData.email || 'Não informado'}
Telefone: ${formData.telefone || 'Não informado'}
Prioridade: ${formData.prioridade || 'Não definida'}

🎯 PROJETO:
Nome do Projeto: ${formData.projeto || 'Não informado'}
Objetivo Principal: ${formData.objetivo || 'Não informado'}
Público-alvo: ${formData.publico || 'Não informado'}
Mensagem-chave: ${formData.mensagem || 'Não informado'}
Tom de Comunicação: ${formData.tom || 'Não definido'}

⚙️ ESPECIFICAÇÕES:
Tipos de Material: ${(formData.materiais || []).join(', ')} ${formData['outros-especifico'] ? `(${formData['outros-especifico']})` : ''}
Dimensões: ${formData.dimensoes || 'Não informado'}
Prazo de Entrega: ${formData.prazo || 'Não informado'}

📝 CONTEÚDO & RECURSOS:
Textos/Copy: ${formData.textos || 'Não informado'}
Referências Visuais: ${formData.referencias || 'Não informado'}
Observações Adicionais: ${formData.observacoes || 'Não informado'}

---
📧 Este briefing foi gerado automaticamente pelo Sistema de Briefing de Marketing da Adubos Real.
Prazo de resposta: até 2 dias úteis`;
    
    console.log('Assunto:', subject);
    console.log('Corpo do email:', bodyText);
    
    try {
        // Estado 2: Processando
        showNotification('Gerando email...', 'info');
        
        // Codificar dados para URL segura
        const encodedSubject = encodeURIComponent(subject);
        const encodedBody = encodeURIComponent(bodyText);
        
        // Construir link mailto
        const mailtoLink = `mailto:henrique.cunha@adubosreal.com.br,juliana.leopoldino@adubosreal.com.br,bruno.friano@adubosreal.com.br?subject=${encodedSubject}&body=${encodedBody}`;
        
        console.log('Link mailto gerado:', mailtoLink);
        
        // Abrir cliente de email usando protocolo mailto
        const link = document.createElement('a');
        link.href = mailtoLink;
        link.style.display = 'none';
        document.body.appendChild(link);
        
        // Simular clique para abrir email
        link.click();
        document.body.removeChild(link);
        
        // Estado 3: Sucesso
        setTimeout(() => {
            showNotification('Email gerado com sucesso! Verifique seu cliente de email.', 'success');
            
            // Confirmação visual
            document.getElementById('briefing-form').classList.add('confirmation');
            setTimeout(() => {
                document.getElementById('briefing-form').classList.remove('confirmation');
            }, 600);
        }, 500);
        
    } catch (error) {
        console.error('Erro ao gerar email:', error);
        
        // Estado de erro
        showNotification('Erro ao abrir email. Copie os dados manualmente.', 'error');
        
        // Modal de fallback
        showEmailDataModal(subject, bodyText);
    }
}

// Modal para mostrar dados do email quando mailto falha
function showEmailDataModal(subject, body) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4';
    modal.innerHTML = `
        <div class="bg-white/10 backdrop-blur-xl border border-accent-500/20 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-bold text-accent-400">Dados do Email</h3>
                <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-white">
                    <i data-lucide="x" class="w-6 h-6"></i>
                </button>
            </div>
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-300 mb-2">Para:</label>
                    <input type="text" value="henrique.cunha@adubosreal.com.br, juliana.leopoldino@adubosreal.com.br, bruno.friano@adubosreal.com.br" readonly 
                           class="w-full px-3 py-2 bg-white/10 border border-gray-600 rounded-lg text-white text-sm">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-300 mb-2">Assunto:</label>
                    <input type="text" value="${subject}" readonly 
                           class="w-full px-3 py-2 bg-white/10 border border-gray-600 rounded-lg text-white text-sm">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-300 mb-2">Corpo do Email:</label>
                    <textarea readonly rows="15" 
                              class="w-full px-3 py-2 bg-white/10 border border-gray-600 rounded-lg text-white text-sm font-mono"
                              style="white-space: pre-wrap;">${body}</textarea>
                </div>
            </div>
            <div class="mt-6 flex justify-end">
                <button onclick="this.closest('.fixed').remove()" 
                        class="px-4 py-2 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-colors">
                    Fechar
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Re-inicializar ícones
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Exibir notificação
function showNotification(message, type = 'info') {
    // Remover notificação existente
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification fixed top-4 right-4 z-50 p-4 rounded-xl backdrop-blur-xl transition-all duration-300 ${
        type === 'success' ? 'bg-green-500/20 border border-green-500/30 text-green-400' :
        type === 'error' ? 'bg-red-500/20 border border-red-500/30 text-red-400' :
        'bg-blue-500/20 border border-blue-500/30 text-blue-400'
    }`;
    
    notification.innerHTML = `
        <div class="flex items-center space-x-3">
            <i data-lucide="${type === 'success' ? 'check-circle' : type === 'error' ? 'alert-circle' : 'info'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Re-inicializar ícones
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Auto-remover após 5 segundos
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Scroll para o formulário
function scrollToForm() {
    const form = document.getElementById('formulario');
    if (form) {
        form.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Scroll para o topo do formulário
function scrollToTop() {
    const form = document.getElementById('formulario');
    if (form) {
        form.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Scroll para o formulário
function scrollToForm() {
    const form = document.getElementById('formulario');
    if (form) {
        form.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Efeitos visuais adicionais
function addMicroInteractions() {
    // Efeito de hover nos cards
    document.querySelectorAll('.card-interactive').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Efeito de focus nos inputs
    document.querySelectorAll('input, textarea, select').forEach(input => {
        input.addEventListener('focus', function() {
            this.parentNode.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentNode.classList.remove('focused');
        });
    });
}

// Validação em tempo real
function setupRealTimeValidation() {
    const emailInput = document.getElementById('email');
    if (emailInput) {
        let timeout;
        emailInput.addEventListener('input', function() {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                if (this.value.trim()) {
                    validateEmail();
                }
            }, 500);
        });
    }
}

// Auto-complete inteligente
function setupAutoComplete() {
    const objetivoInput = document.getElementById('objetivo');
    if (objetivoInput) {
        const suggestions = [
            'Aumentar vendas do produto X',
            'Divulgar novo lançamento',
            'Fidelizar clientes existentes',
            'Atrair novos clientes',
            'Melhorar posicionamento da marca',
            'Promover evento/campanha'
        ];
        
        objetivoInput.addEventListener('focus', function() {
            if (!this.value) {
                this.placeholder = suggestions[Math.floor(Math.random() * suggestions.length)];
            }
        });
    }
}

// Inicializar funcionalidades adicionais
document.addEventListener('DOMContentLoaded', function() {
    addMicroInteractions();
    setupRealTimeValidation();
    setupAutoComplete();
});

// Função de teste do mailto
function testMailto() {
    const testSubject = 'Teste do Sistema de Briefing';
    const testBody = 'Este é um teste da funcionalidade de email do Sistema de Briefing de Marketing da Adubos Real.';
    
    try {
        const mailtoLink = `mailto:marketing@adubosreal.com?subject=${encodeURIComponent(testSubject)}&body=${encodeURIComponent(testBody)}`;
        
        const link = document.createElement('a');
        link.href = mailtoLink;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showNotification('Teste de email enviado! Verifique seu cliente de email.', 'success');
        
    } catch (error) {
        console.error('Erro no teste de email:', error);
        showNotification('Erro no teste de email. Verifique as configurações.', 'error');
    }
}

// Funções do Modal de Ajuda
function showHelpModal() {
    const modal = document.getElementById('help-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        
        // Re-inicializar ícones
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        
        // Focar no modal para acessibilidade
        modal.focus();
        
        // Prevenir scroll do body
        document.body.style.overflow = 'hidden';
    }
}

function hideHelpModal() {
    const modal = document.getElementById('help-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        
        // Restaurar scroll do body
        document.body.style.overflow = 'auto';
    }
}

// Fechar modal com ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        hideHelpModal();
    }
});

// Fechar modal clicando fora
document.addEventListener('click', function(e) {
    const modal = document.getElementById('help-modal');
    if (modal && e.target === modal) {
        hideHelpModal();
    }
});

// Exportar funções para uso global
window.nextStep = nextStep;
window.previousStep = previousStep;
window.clearForm = clearForm;
window.scrollToForm = scrollToForm;
window.testMailto = testMailto;
window.showHelpModal = showHelpModal;
window.hideHelpModal = hideHelpModal; 
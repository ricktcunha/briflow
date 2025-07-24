# Sistema de Briefing de Marketing - Adubos Real

Uma aplicação web moderna e intuitiva para criação de briefings de marketing, desenvolvida para otimizar a comunicação entre departamentos e a equipe de marketing da Adubos Real.

## 🚀 Características

### Design & UX

- **Design Premium 2025** com glassmorphism intenso
- **Paleta de cores** verde e preto da marca
- **Partículas animadas** no background
- **Micro-animações** suaves e elegantes
- **Responsivo** para todos os dispositivos
- **Acessibilidade** completa (WCAG 2.1)

### Funcionalidades

- **Formulário em etapas** com navegação intuitiva
- **Validação em tempo real** de todos os campos
- **Máscaras automáticas** para telefone brasileiro
- **Auto-save** em variáveis JavaScript
- **Geração automática de email** formatado
- **Progress bar** visual do preenchimento

### Heurísticas de Usabilidade Aplicadas

1. **Visibilidade do Status** - Barra de progresso e indicadores visuais
2. **Compatibilidade Sistema-Mundo Real** - Linguagem natural e ícones intuitivos
3. **Controle e Liberdade** - Navegação entre etapas e botão de limpar
4. **Consistência e Padrões** - Design system uniforme
5. **Prevenção de Erros** - Validação preventiva e feedback instantâneo
6. **Reconhecimento vs Lembrança** - Labels descritivos e placeholders inteligentes
7. **Flexibilidade e Eficiência** - Atalhos de teclado e auto-complete
8. **Design Minimalista** - Interface limpa e focada
9. **Ajuda para Reconhecer Erros** - Mensagens claras e sugestões
10. **Ajuda e Documentação** - Tooltips e informações contextuais

## 📁 Estrutura de Arquivos

```
Mailto Marketing/
├── index.html          # Estrutura HTML semântica
├── style.css           # Estilos customizados + Tailwind overrides
├── script.js           # Funcionalidades e validações
└── README.md           # Documentação
```

## 🛠️ Tecnologias Utilizadas

- **HTML5** semântico com acessibilidade
- **Tailwind CSS** via CDN (versão mais recente)
- **JavaScript ES6+** vanilla
- **Lucide Icons** via CDN
- **Compatível com GitHub Pages**

## 🎨 Design System

### Cores

- **Primary**: `#0a0a0a`, `#111111`
- **Accent**: `#22c55e`, `#10b981`, `#00ff88`
- **Gradientes**: Preto para verde escuro

### Efeitos Visuais

- **Glassmorphism**: `backdrop-blur-xl`
- **Hover states**: Glow verde neon
- **Sombras**: Profundas com cor verde
- **Transições**: 300-500ms fluidas

## 📋 Estrutura do Formulário

### Etapa 1: Identificação 🔤

- Nome completo (obrigatório)
- Departamento/Área (select com ícones)
- Email (validação em tempo real)
- Telefone (máscara brasileira automática)
- Nível de prioridade (radio buttons estilizados)

### Etapa 2: Projeto 🎯

- Nome do projeto/campanha (obrigatório)
- Objetivo principal (textarea com placeholder inteligente)
- Público-alvo (textarea com sugestões)
- Mensagem-chave (textarea)
- Tom de comunicação (select visual)

### Etapa 3: Especificações ⚙️

- Tipo de material (checkboxes com ícones)
- Dimensões/tamanhos (input com sugestões)
- Prazo de entrega (date picker customizado)
- Campo "Outros" condicional

### Etapa 4: Conteúdo & Recursos 📝

- Textos/copy necessários (editor rich text básico)
- Referências visuais (textarea + upload simulado)
- Observações adicionais (textarea expansível)

## 🚀 Como Usar

### Instalação Local

1. Clone ou baixe os arquivos
2. Abra o `index.html` em qualquer navegador moderno
3. A aplicação funcionará completamente offline

### Deploy no GitHub Pages

1. Faça upload dos arquivos para um repositório GitHub
2. Vá em Settings > Pages
3. Selecione a branch main
4. A aplicação estará disponível em `https://seu-usuario.github.io/seu-repositorio`

## 📧 Funcionalidade de Email

Ao finalizar o formulário:

- Um email é gerado automaticamente
- **Destinatários**: marketing@adubosreal.com, design@adubosreal.com
- **Assunto**: "🎯 Nova Solicitação - [Nome do Projeto] - [Prioridade]"
- **Corpo**: HTML formatado com todas as informações do briefing

## 🎯 Validações Implementadas

### Campos Obrigatórios

- Nome completo
- Departamento/Área
- Email
- Telefone
- Nível de prioridade
- Nome do projeto
- Objetivo principal
- Tipos de material
- Prazo de entrega

### Validações Específicas

- **Email**: Formato válido com regex
- **Telefone**: Máscara brasileira (11) 99999-9999
- **Data**: Não pode ser no passado
- **Materiais**: Pelo menos um selecionado
- **Outros**: Campo obrigatório se "Outros" estiver marcado

## ⌨️ Atalhos de Teclado

- **Ctrl + Enter**: Avançar para próxima etapa ou enviar formulário
- **Tab**: Navegação entre campos
- **Enter**: Submeter formulário (na última etapa)

## 📱 Responsividade

- **Mobile-first** approach
- **Breakpoints** otimizados
- **Touch-friendly** (44px mínimo)
- **Navegação por gestos** suportada

## 🔧 Personalização

### Cores da Marca

Edite as variáveis CSS em `style.css`:

```css
:root {
  --primary-900: #0a0a0a;
  --primary-800: #111111;
  --accent-500: #22c55e;
  --accent-600: #10b981;
  --accent-400: #00ff88;
}
```

### Emails de Destino

Edite no arquivo `script.js`:

```javascript
const mailtoLink = `mailto:seu-email@empresa.com?subject=...`;
```

## 🐛 Solução de Problemas

### Email não abre

- Verifique se o cliente de email está configurado
- Teste em diferentes navegadores
- Verifique as configurações de segurança

### Validações não funcionam

- Verifique se o JavaScript está habilitado
- Limpe o cache do navegador
- Teste em modo incógnito

### Design não carrega

- Verifique a conexão com internet (para CDNs)
- Verifique se todos os arquivos estão na mesma pasta
- Teste em navegador moderno

## 📞 Suporte

Para dúvidas ou problemas:

- **Email**: marketing@adubosreal.com
- **Telefone/WhatsApp**: (35) 99999-9999
- **Horário**: Segunda a Sexta, 8h às 18h

## 📄 Licença

Sistema desenvolvido para uso interno da Adubos Real.
© 2025 Adubos Real. Todos os direitos reservados.

---

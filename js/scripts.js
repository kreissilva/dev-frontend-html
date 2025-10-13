// Sistema de Single Page Application (SPA) básico
class SPARouter {
    constructor() {
        this.routes = {};
        this.rootElem = document.getElementById('main-content');
        this.init();
    }

    init() {
        window.addEventListener('popstate', () => this.loadRoute(window.location.pathname));
        document.addEventListener('DOMContentLoaded', () => {
            document.body.addEventListener('click', (e) => {
                if (e.target.matches('[data-link]')) {
                    e.preventDefault();
                    this.navigate(e.target.href);
                }
            });
            this.loadRoute(window.location.pathname);
        });
    }

    addRoute(path, template) {
        this.routes[path] = template;
    }

    async loadRoute(path) {
        const template = this.routes[path];
        if (template) {
            const html = await fetch(template).then(response => response.text());
            this.rootElem.innerHTML = html;
        } else {
            this.rootElem.innerHTML = '<h2>Página não encontrada</h2>';
        }
    }

    navigate(path) {
        window.history.pushState({}, path, window.location.origin + path);
        this.loadRoute(path);
    }
}

// Inicializar o router
const router = new SPARouter();
router.addRoute('/', 'templates/home.html');
router.addRoute('/projetos', 'templates/projetos.html');
router.addRoute('/cadastro', 'templates/cadastro.html');

// Sistema de validação de formulários
class FormValidator {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.fields = this.form.querySelectorAll('input, select, textarea');
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.validateForm(e));
        this.fields.forEach(field => {
            field.addEventListener('blur', () => this.validateField(field));
            field.addEventListener('input', () => this.clearError(field));
        });
    }

    validateForm(e) {
        let isValid = true;
        this.fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        if (!isValid) {
            e.preventDefault();
            alert('Por favor, corrija os erros no formulário.');
        }
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Validações específicas por tipo
        if (field.required && !value) {
            errorMessage = 'Este campo é obrigatório.';
            isValid = false;
        } else if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMessage = 'Por favor, insira um e-mail válido.';
                isValid = false;
            }
        } else if (field.id === 'cpf' && value) {
            const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
            if (!cpfRegex.test(value)) {
                errorMessage = 'CPF inválido. Use o formato: 000.000.000-00';
                isValid = false;
            }
        } else if (field.id === 'telefone' && value) {
            const telefoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
            if (!telefoneRegex.test(value)) {
                errorMessage = 'Telefone inválido. Use o formato: (11) 99999-9999';
                isValid = false;
            }
        } else if (field.id === 'cep' && value) {
            const cepRegex = /^\d{5}-\d{3}$/;
            if (!cepRegex.test(value)) {
                errorMessage = 'CEP inválido. Use o formato: 00000-000';
                isValid = false;
            }
        }

        this.setFieldError(field, errorMessage);
        return isValid;
    }

    setFieldError(field, message) {
        this.clearError(field);
        if (message) {
            field.classList.add('error');
            const errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.textContent = message;
            field.parentNode.appendChild(errorElement);
        }
    }

    clearError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }
}

// Inicializar a validação do formulário de cadastro
document.addEventListener('DOMContentLoaded', () => {
    const formCadastro = document.getElementById('formCadastro');
    if (formCadastro) {
        new FormValidator('formCadastro');
    }
});
// assets/js/scripts.js
// Máscaras para os campos do formulário
document.addEventListener('DOMContentLoaded', function() {
    // Máscara para CPF
    const cpfInput = document.getElementById('cpf');
    if (cpfInput) {
        cpfInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 3) {
                value = value.substring(0, 3) + '.' + value.substring(3);
            }
            if (value.length > 7) {
                value = value.substring(0, 7) + '.' + value.substring(7);
            }
            if (value.length > 11) {
                value = value.substring(0, 11) + '-' + value.substring(11, 13);
            }
            e.target.value = value;
        });
    }

    // Máscara para telefone
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                value = '(' + value;
            }
            if (value.length > 3) {
                value = value.substring(0, 3) + ') ' + value.substring(3);
            }
            if (value.length > 10) {
                value = value.substring(0, 10) + '-' + value.substring(10, 14);
            }
            e.target.value = value;
        });
    }

    // Máscara para CEP
    const cepInput = document.getElementById('cep');
    if (cepInput) {
        cepInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 5) {
                value = value.substring(0, 5) + '-' + value.substring(5, 8);
            }
            e.target.value = value;
        });
    }

    // Validação do formulário
    const registrationForm = document.getElementById('registration-form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm()) {
                // Aqui normalmente enviaríamos os dados para o servidor
                alert('Cadastro enviado com sucesso! Em breve entraremos em contato.');
                registrationForm.reset();
            }
        });
    }

    // Função de validação
    function validateForm() {
        let isValid = true;
        const fields = [
            { id: 'fullname', validator: validateRequired },
            { id: 'email', validator: validateEmail },
            { id: 'cpf', validator: validateCPF },
            { id: 'phone', validator: validatePhone },
            { id: 'birthdate', validator: validateBirthdate },
            { id: 'address', validator: validateRequired },
            { id: 'cep', validator: validateCEP },
            { id: 'city', validator: validateRequired },
            { id: 'state', validator: validateRequired }
        ];

        fields.forEach(field => {
            const element = document.getElementById(field.id);
            const errorElement = document.getElementById(field.id + '-error');
            
            if (!field.validator(element.value)) {
                errorElement.textContent = getErrorMessage(field.id);
                element.style.borderColor = '#e74c3c';
                isValid = false;
            } else {
                errorElement.textContent = '';
                element.style.borderColor = '#ddd';
            }
        });

        return isValid;
    }

    // Validadores
    function validateRequired(value) {
        return value.trim() !== '';
    }

    function validateEmail(value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    }

    function validateCPF(value) {
        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        return cpfRegex.test(value);
    }

    function validatePhone(value) {
        const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
        return phoneRegex.test(value);
    }

    function validateBirthdate(value) {
        if (!value) return false;
        const birthDate = new Date(value);
        const today = new Date();
        return birthDate < today;
    }

    function validateCEP(value) {
        const cepRegex = /^\d{5}-\d{3}$/;
        return cepRegex.test(value);
    }

    // Mensagens de erro
    function getErrorMessage(fieldId) {
        const messages = {
            'fullname': 'Por favor, informe seu nome completo',
            'email': 'Por favor, informe um e-mail válido',
            'cpf': 'Por favor, informe um CPF válido',
            'phone': 'Por favor, informe um telefone válido',
            'birthdate': 'Por favor, informe uma data de nascimento válida',
            'address': 'Por favor, informe seu endereço',
            'cep': 'Por favor, informe um CEP válido',
            'city': 'Por favor, informe sua cidade',
            'state': 'Por favor, selecione seu estado'
        };
        return messages[fieldId] || 'Campo inválido';
    }
});
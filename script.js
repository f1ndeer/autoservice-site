document.addEventListener('DOMContentLoaded', function() {
    
    // =========================================================================
    // ⚙️ НАЛАШТУВАННЯ СЕРВЕРА
    // =========================================================================
    
    // 👇 ВАЖЛИВО: Коли заллєте сервер на Render, вставте сюди отримане посилання.
    // Наприклад: const API_URL = 'https://my-autoservice.onrender.com';
    // Поки тестуєте на комп'ютері, залиште localhost.
    const API_URL = 'http://localhost:3000'; 


    // =========================================================================
    // 1. ЛОГІКА МОДАЛЬНИХ ВІКОН (Відображення даних)
    // =========================================================================

    // Модалка "Запис на сервіс"
    const orderModal = document.getElementById('orderModal');
    if (orderModal) {
        orderModal.addEventListener('show.bs.modal', event => {
            const button = event.relatedTarget; 
            const serviceName = button.getAttribute('data-service'); 
            
            const label = document.getElementById('orderModalLabel');
            const input = document.getElementById('selectedService');
            
            if(label) label.textContent = `Замовити: ${serviceName}`;
            if(input) input.value = serviceName;
        });
    }

    // Модалка "Вакансії"
    const vacancyModal = document.getElementById('vacancyModal');
    if (vacancyModal) {
        vacancyModal.addEventListener('show.bs.modal', event => {
            const button = event.relatedTarget;
            const vacancyName = button.getAttribute('data-vacancy');
            
            const label = document.getElementById('vacancyModalLabel');
            const input = document.getElementById('selectedVacancy');

            if(label) label.textContent = `Подати заявку: ${vacancyName}`;
            if(input) input.value = vacancyName;
        });
    }

    // =========================================================================
    // 2. ФУНКЦІЯ ВІДПРАВКИ (Fetch) З ІНДИКАТОРОМ ЗАВАНТАЖЕННЯ
    // =========================================================================
    
    async function sendData(endpoint, data, formElement, modalId = null, buttonId = null) {
        const fullUrl = `${API_URL}${endpoint}`;
        const button = buttonId ? document.getElementById(buttonId) : formElement.querySelector('button[type="submit"]');
        const originalText = button ? button.innerHTML : 'Надіслати';

        try {
            // 1. Блокуємо кнопку і показуємо "Відправка..."
            if (button) {
                button.disabled = true;
                button.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Відправка...';
            }

            console.log(`Відправка на ${fullUrl}:`, data);

            const response = await fetch(fullUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            // 2. Обробка результату
            if (response.ok) {
                alert('Дякуємо! Ваша заявка успішно надіслана.');
                
                if (formElement) formElement.reset();

                if (modalId) {
                    const modalEl = document.getElementById(modalId);
                    const modalInstance = bootstrap.Modal.getInstance(modalEl);
                    if (modalInstance) modalInstance.hide();
                }
            } else {
                throw new Error('Server responded with error');
            }

        } catch (error) {
            console.error('Error:', error);
            alert('Помилка відправки. Можливо, сервер "спить" або вимкнений. Спробуйте ще раз через хвилину.');
        } finally {
            // 3. Повертаємо кнопку до життя
            if (button) {
                button.disabled = false;
                button.innerHTML = originalText;
            }
        }
    }

    // =========================================================================
    // 3. ОБРОБКА КНОПОК ВІДПРАВКИ
    // =========================================================================

    // --- Кнопка "Замовити" (в модалці) ---
    const submitOrderBtn = document.getElementById('submitOrder');
    if (submitOrderBtn) {
        submitOrderBtn.addEventListener('click', function() {
            const nameEl = document.getElementById('orderName');
            const phoneEl = document.getElementById('orderPhone');
            
            // Валідація
            if (!nameEl.value || !phoneEl.value) {
                alert("Будь ласка, заповніть ім'я та телефон");
                return;
            }

            const data = { 
                name: nameEl.value, 
                phone: phoneEl.value, 
                car: document.getElementById('orderCar').value, 
                message: document.getElementById('orderMessage').value, 
                service: document.getElementById('selectedService').value || 'Загальний запис'
            };
            
            const form = document.getElementById('orderForm');
            // Передаємо endpoint, дані, форму, ID модалки і ID кнопки
            sendData('/send-order', data, form, 'orderModal', 'submitOrder');
        });
    }

    // --- Кнопка "Відгукнутися" (в модалці вакансій) ---
    const submitVacancyBtn = document.getElementById('submitVacancy');
    if (submitVacancyBtn) {
        submitVacancyBtn.addEventListener('click', function() {
            const nameEl = document.getElementById('vacancyName');
            const phoneEl = document.getElementById('vacancyPhone');

            if (!nameEl.value || !phoneEl.value) {
                alert("Будь ласка, заповніть ім'я та телефон");
                return;
            }

            const data = { 
                name: nameEl.value, 
                phone: phoneEl.value, 
                email: document.getElementById('vacancyEmail').value, 
                experience: document.getElementById('vacancyExperience').value, 
                message: document.getElementById('vacancyMessage').value, 
                vacancy: document.getElementById('selectedVacancy').value
            };

            const form = document.getElementById('vacancyForm');
            sendData('/send-vacancy', data, form, 'vacancyModal', 'submitVacancy');
        });
    }
    
    // --- Форма внизу сторінки ("Швидка заявка") ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameEl = document.getElementById('contactName');
            const phoneEl = document.getElementById('contactPhone');

            if (!nameEl || !phoneEl) {
                console.error("Помилка: Не знайдено полів форми (перевірте ID в HTML)");
                return;
            }

            const data = { 
                name: nameEl.value, 
                phone: phoneEl.value, 
                car: 'З форми контактів', 
                message: `${document.getElementById('contactMessage').value} (Email: ${document.getElementById('contactEmail').value})`, 
                service: document.getElementById('contactService').value 
            };
            
            // Тут кнопка знаходиться всередині форми, функція сама її знайде
            sendData('/send-order', data, contactForm);
        });
    }

    // =========================================================================
    // 4. ІНШЕ (Зірочки, відгуки)
    // =========================================================================
    
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        const stars = document.querySelectorAll('.star-rating-form .star');
        const ratingInput = document.getElementById('reviewRating');
        
        if (stars.length > 0) {
            stars.forEach(star => {
                star.addEventListener('click', function() {
                    const value = this.getAttribute('data-value');
                    if(ratingInput) ratingInput.value = value;
                    stars.forEach(s => {
                        s.setAttribute('fill', s.getAttribute('data-value') <= value ? '#FFC107' : 'gray');
                    });
                });
            });
        }

        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Дякуємо за ваш відгук! Він з\'явиться на сайті після перевірки.');
            reviewForm.reset();
            stars.forEach(s => s.setAttribute('fill', 'gray'));
            
            const modalEl = document.getElementById('reviewModal');
            if(modalEl) {
                const modal = bootstrap.Modal.getInstance(modalEl);
                if(modal) modal.hide();
            }
        });
    }
});
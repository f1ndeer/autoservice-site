document.addEventListener('DOMContentLoaded', function() {
    
    // --- ВАША ПОЧТА (куда будут приходить письма) ---
    const TARGET_EMAIL = "deniskibzun@gmail.com"; 

    // ============================================================
    // 1. ЛОГИКА ОТПРАВКИ (С модалки -> В почтовый клиент)
    // ============================================================

    // --- А. ЗАКАЗ УСЛУГИ (Order Modal) ---
    
    // 1. Передача названия услуги в заголовок модалки при клике
    const orderModal = document.getElementById('orderModal');
    if (orderModal) {
        orderModal.addEventListener('show.bs.modal', function (event) {
            const button = event.relatedTarget;
            const serviceName = button.getAttribute('data-service');
            const modalInput = orderModal.querySelector('#selectedService');
            const modalTitle = orderModal.querySelector('.modal-title');
            
            if (serviceName) {
                modalInput.value = serviceName;
                modalTitle.textContent = 'Заказать: ' + serviceName;
            }
        });
    }

    // 2. Сбор данных и перенаправление на почту
    const submitOrderBtn = document.getElementById('submitOrder');
    if (submitOrderBtn) {
        submitOrderBtn.addEventListener('click', function(e) {
            e.preventDefault();

            // Берем текст из полей
            const name = document.getElementById('orderName').value;
            const phone = document.getElementById('orderPhone').value;
            const car = document.getElementById('orderCar').value;
            const message = document.getElementById('orderMessage').value;
            const service = document.getElementById('selectedService').value || 'Общий запрос';

            // Проверка
            if (!name || !phone) {
                alert("Пожалуйста, укажите имя и телефон");
                return;
            }

            // Формируем тему и текст письма
            const subject = encodeURIComponent("Заказ услуги: " + service);
            const body = encodeURIComponent(
                `Имя: ${name}\n` +
                `Телефон: ${phone}\n` +
                `Автомобиль: ${car}\n` +
                `Услуга: ${service}\n` +
                `Комментарий: ${message}`
            );

            // ОТКРЫВАЕМ ПОЧТУ С УЖЕ ЗАПОЛНЕННЫМ ТЕКСТОМ
            window.location.href = `mailto:${TARGET_EMAIL}?subject=${subject}&body=${body}`;

            // Закрываем окно и чистим форму
            const modalInstance = bootstrap.Modal.getInstance(orderModal);
            modalInstance.hide();
            document.getElementById('orderForm').reset();
        });
    }


    // --- Б. ВАКАНСИИ (Vacancy Modal) ---

    const vacancyModal = document.getElementById('vacancyModal');
    if (vacancyModal) {
        vacancyModal.addEventListener('show.bs.modal', function (event) {
            const button = event.relatedTarget;
            const vacancyName = button.getAttribute('data-vacancy');
            const modalInput = vacancyModal.querySelector('#selectedVacancy');
            const modalTitle = vacancyModal.querySelector('.modal-title');

            if (vacancyName) {
                modalInput.value = vacancyName;
                modalTitle.textContent = 'Резюме на: ' + vacancyName;
            }
        });
    }

    const submitVacancyBtn = document.getElementById('submitVacancy');
    if (submitVacancyBtn) {
        submitVacancyBtn.addEventListener('click', function(e) {
            e.preventDefault();

            // Берем текст из полей
            const name = document.getElementById('vacancyName').value;
            const phone = document.getElementById('vacancyPhone').value;
            const email = document.getElementById('vacancyEmail').value;
            const exp = document.getElementById('vacancyExperience').value;
            const message = document.getElementById('vacancyMessage').value;
            const vacancy = document.getElementById('selectedVacancy').value;

            if (!name || !phone) {
                alert("Пожалуйста, укажите имя и телефон");
                return;
            }

            // Формируем письмо
            const subject = encodeURIComponent("Резюме: " + vacancy);
            const body = encodeURIComponent(
                `Имя: ${name}\n` +
                `Телефон: ${phone}\n` +
                `Email: ${email}\n` +
                `Опыт работы: ${exp}\n` +
                `Вакансия: ${vacancy}\n` +
                `О себе: ${message}`
            );

            // Перенаправляем
            window.location.href = `mailto:${TARGET_EMAIL}?subject=${subject}&body=${body}`;

            const modalInstance = bootstrap.Modal.getInstance(vacancyModal);
            modalInstance.hide();
            document.getElementById('vacancyForm').reset();
        });
    }


    // --- В. ФОРМА КОНТАКТОВ (Внизу сайта) ---

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('contactName').value;
            const phone = document.getElementById('contactPhone').value;
            const email = document.getElementById('contactEmail').value;
            const service = document.getElementById('contactService').value;
            const message = document.getElementById('contactMessage').value;

            const subject = encodeURIComponent("Быстрая заявка с сайта");
            const body = encodeURIComponent(
                `Имя: ${name}\n` +
                `Телефон: ${phone}\n` +
                `Email: ${email}\n` +
                `Тип услуги: ${service}\n` +
                `Сообщение: ${message}`
            );

            window.location.href = `mailto:${TARGET_EMAIL}?subject=${subject}&body=${body}`;
            contactForm.reset();
        });
    }


    // --- Г. ОТЗЫВЫ (Review Modal) ---

    // Логика звездочек
    const stars = document.querySelectorAll('.star-rating-form .star');
    const ratingInput = document.getElementById('reviewRating');
    
    if (stars.length > 0) {
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const value = this.getAttribute('data-value');
                ratingInput.value = value;
                
                stars.forEach(s => {
                    if(s.getAttribute('data-value') <= value) {
                        s.setAttribute('fill', '#ffc107'); 
                        s.style.color = '#ffc107'; 
                    } else {
                        s.setAttribute('fill', 'gray');
                        s.style.color = 'gray';
                    }
                });
            });
        });
    }

    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('reviewName').value;
            const text = document.getElementById('reviewText').value;
            const rating = document.getElementById('reviewRating').value;
            const email = document.getElementById('reviewEmail').value;

            const subject = encodeURIComponent("Новый отзыв с сайта");
            const body = encodeURIComponent(
                `Имя: ${name}\n` +
                `Email: ${email}\n` +
                `Оценка: ${rating}/5\n` +
                `Отзыв: ${text}`
            );

            window.location.href = `mailto:${TARGET_EMAIL}?subject=${subject}&body=${body}`;

            const modalInstance = bootstrap.Modal.getInstance(document.getElementById('reviewModal'));
            modalInstance.hide();
            reviewForm.reset();
        });
    }


    // ============================================================
    // 2. ИНТЕРФЕЙС (UI) - Выпадающие списки, FAQ, Cookie
    // ============================================================

    // --- Кастомный выбор авто ---
    const carInput = document.getElementById('orderCar');
    const carList = document.getElementById('carOptionsList');
    const carWrapper = document.getElementById('customCarSelectWrapper');
    
    if (carInput && carList && carWrapper) {
        const options = carList.querySelectorAll('li');

        carInput.addEventListener('focus', () => {
            carList.style.display = 'block';
            carWrapper.classList.add('active');
        });

        carInput.addEventListener('input', function() {
            const filter = this.value.toLowerCase();
            let hasVisible = false;
            
            options.forEach(option => {
                const text = option.textContent.toLowerCase();
                if (text.includes(filter)) {
                    option.style.display = 'block';
                    hasVisible = true;
                } else {
                    option.style.display = 'none';
                }
            });
            carList.style.display = hasVisible || this.value === '' ? 'block' : 'none';
        });

        options.forEach(option => {
            option.addEventListener('click', function() {
                carInput.value = this.getAttribute('data-value');
                carList.style.display = 'none';
                carWrapper.classList.remove('active');
            });
        });

        document.addEventListener('click', function(e) {
            if (!carWrapper.contains(e.target)) {
                carList.style.display = 'none';
                carWrapper.classList.remove('active');
            }
        });
    }

    // --- Аккордеон FAQ ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        if (trigger) {
            trigger.addEventListener('click', () => {
                const isOpen = item.classList.contains('active');
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
                    const content = otherItem.querySelector('.faq-content');
                    if(content) content.style.maxHeight = null;
                });

                if (!isOpen) {
                    item.classList.add('active');
                    trigger.setAttribute('aria-expanded', 'true');
                    const content = item.querySelector('.faq-content');
                    if(content) content.style.maxHeight = content.scrollHeight + "px";
                }
            });
        }
    });

    // --- Cookie Banner ---
    const cookieBanner = document.getElementById('cookieBanner');
    const acceptCookieBtn = document.getElementById('acceptCookie');
    const callBtn = document.querySelector('.floating-call-btn');

    if (cookieBanner) {
        if (!localStorage.getItem('cookieAccepted')) {
            cookieBanner.style.display = 'flex';
        } else {
            cookieBanner.style.display = 'none';
            if(callBtn) callBtn.style.bottom = '20px';
        }

        if (acceptCookieBtn) {
            acceptCookieBtn.addEventListener('click', function() {
                cookieBanner.style.display = 'none';
                localStorage.setItem('cookieAccepted', 'true');
                if(callBtn) callBtn.style.bottom = '20px';
            });
        }
    }

    // --- Закрытие мобильного меню ---
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.getElementById('navMenu');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
        });
    });

});
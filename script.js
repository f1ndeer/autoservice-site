document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. Логіка для модального вікна ЗАМОВЛЕННЯ ---
    
    // Передача назви послуги в модальне вікно при відкритті
    const orderModal = document.getElementById('orderModal');
    if (orderModal) {
        orderModal.addEventListener('show.bs.modal', function (event) {
            const button = event.relatedTarget;
            const serviceName = button.getAttribute('data-service');
            const modalInput = orderModal.querySelector('#selectedService');
            const modalTitle = orderModal.querySelector('.modal-title');
            
            if (serviceName) {
                modalInput.value = serviceName;
                modalTitle.textContent = 'Замовити: ' + serviceName;
            }
        });
    }

    // Обробка кнопки "Замовити"
    const submitOrderBtn = document.getElementById('submitOrder');
    if (submitOrderBtn) {
        submitOrderBtn.addEventListener('click', function() {
            const name = document.getElementById('orderName').value;
            const phone = document.getElementById('orderPhone').value;
            const car = document.getElementById('orderCar').value;
            const message = document.getElementById('orderMessage').value;
            const service = document.getElementById('selectedService').value;

            if (!name || !phone) {
                alert("Будь ласка, вкажіть ім'я та телефон");
                return;
            }

            const subject = encodeURIComponent("Замовлення послуги: " + service);
            const body = encodeURIComponent(
                `Ім'я: ${name}\nТелефон: ${phone}\nАвто: ${car}\nПослуга: ${service}\nКоментар: ${message}`
            );

            // Відправка листа
            window.location.href = `mailto:deniskibzun@gmail.com?subject=${subject}&body=${body}`;

            // Закриття модального вікна (Bootstrap спосіб)
            const modalInstance = bootstrap.Modal.getInstance(orderModal);
            modalInstance.hide();
            
            // Очищення форми
            document.getElementById('orderForm').reset();
        });
    }


    // --- 2. Логіка для модального вікна ВАКАНСІЙ ---

    const vacancyModal = document.getElementById('vacancyModal');
    if (vacancyModal) {
        vacancyModal.addEventListener('show.bs.modal', function (event) {
            const button = event.relatedTarget;
            const vacancyName = button.getAttribute('data-vacancy');
            const modalInput = vacancyModal.querySelector('#selectedVacancy');
            const modalTitle = vacancyModal.querySelector('.modal-title');

            if (vacancyName) {
                modalInput.value = vacancyName;
                modalTitle.textContent = 'Резюме на посаду: ' + vacancyName;
            }
        });
    }

    const submitVacancyBtn = document.getElementById('submitVacancy');
    if (submitVacancyBtn) {
        submitVacancyBtn.addEventListener('click', function() {
            const name = document.getElementById('vacancyName').value;
            const phone = document.getElementById('vacancyPhone').value;
            const email = document.getElementById('vacancyEmail').value;
            const exp = document.getElementById('vacancyExperience').value;
            const message = document.getElementById('vacancyMessage').value;
            const vacancy = document.getElementById('selectedVacancy').value;

            if (!name || !phone) {
                alert("Будь ласка, вкажіть ім'я та телефон");
                return;
            }

            const subject = encodeURIComponent("Резюме: " + vacancy);
            const body = encodeURIComponent(
                `Ім'я: ${name}\nТелефон: ${phone}\nEmail: ${email}\nДосвід: ${exp} років\nВакансія: ${vacancy}\nПро себе: ${message}`
            );

            window.location.href = `mailto:deniskibzun@gmail.com?subject=${subject}&body=${body}`;

            const modalInstance = bootstrap.Modal.getInstance(vacancyModal);
            modalInstance.hide();
            document.getElementById('vacancyForm').reset();
        });
    }


    // --- 3. Логіка для ФОРМИ КОНТАКТІВ (внизу сторінки) ---

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Зупиняємо стандартну відправку форми

            const name = document.getElementById('contactName').value;
            const phone = document.getElementById('contactPhone').value;
            const email = document.getElementById('contactEmail').value;
            const service = document.getElementById('contactService').value;
            const message = document.getElementById('contactMessage').value;

            const subject = encodeURIComponent("Заявка з сайту: " + service);
            const body = encodeURIComponent(
                `Ім'я: ${name}\nТелефон: ${phone}\nEmail: ${email}\nТип послуги: ${service}\nПовідомлення: ${message}`
            );

            window.location.href = `mailto:deniskibzun@gmail.com?subject=${subject}&body=${body}`;
            contactForm.reset();
        });
    }


    // --- 4. Логіка для ВІДГУКІВ ---
    
    // Обробка зірочок
    const stars = document.querySelectorAll('.star-rating-form .star');
    const ratingInput = document.getElementById('reviewRating');
    
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            ratingInput.value = value;
            
            // Фарбуємо зірки
            stars.forEach(s => {
                if(s.getAttribute('data-value') <= value) {
                    s.setAttribute('fill', 'gold'); // Або ваш колір #ffc107
                    s.style.color = '#ffc107'; 
                } else {
                    s.setAttribute('fill', 'gray');
                    s.style.color = 'gray';
                }
            });
        });
    });

    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('reviewName').value;
            const text = document.getElementById('reviewText').value;
            const rating = document.getElementById('reviewRating').value;

            const subject = encodeURIComponent("Новий відгук з сайту");
            const body = encodeURIComponent(
                `Ім'я: ${name}\nОцінка: ${rating}/5\nВідгук: ${text}`
            );

            window.location.href = `mailto:deniskibzun@gmail.com?subject=${subject}&body=${body}`;

            const modalInstance = bootstrap.Modal.getInstance(document.getElementById('reviewModal'));
            modalInstance.hide();
            reviewForm.reset();
        });
    }
});
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            const navbarCollapse = document.getElementById('navMenu');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
        });
    });
    document.addEventListener('DOMContentLoaded', function() {
    
    // ... ваш попередній код ...

    // === ЛОГІКА КАСТОМНОГО ВИБОРУ АВТО ===
    const carInput = document.getElementById('orderCar');
    const carList = document.getElementById('carOptionsList');
    const carWrapper = document.getElementById('customCarSelectWrapper');
    const options = carList.querySelectorAll('li');

    // 1. Відкриття списку при фокусі
    carInput.addEventListener('focus', () => {
        carList.style.display = 'block';
        carWrapper.classList.add('active');
    });

    // 2. Фільтрація списку при введенні
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

        // Якщо нічого не знайдено, можна показати/сховати список, 
        // але тут лишаємо відкритим, щоб видно було порожнечу
        carList.style.display = hasVisible ? 'block' : 'none';
        
        // Якщо поле пусте, показуємо все
        if (this.value === '') {
            options.forEach(o => o.style.display = 'block');
            carList.style.display = 'block';
        }
    });

    // 3. Вибір елемента зі списку
    options.forEach(option => {
        option.addEventListener('click', function() {
            carInput.value = this.getAttribute('data-value');
            carList.style.display = 'none';
            carWrapper.classList.remove('active');
        });
    });

    // 4. Закриття списку при кліку за межами
    document.addEventListener('click', function(e) {
        if (!carWrapper.contains(e.target)) {
            carList.style.display = 'none';
            carWrapper.classList.remove('active');
        }
    });
});
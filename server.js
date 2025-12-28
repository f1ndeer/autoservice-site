const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// ВАЖЛИВО ДЛЯ RENDER:
// Render автоматично видає порт через змінну середовища process.env.PORT.
// Якщо ми запускаємо локально, то буде 3000.
const PORT = process.env.PORT || 3000;

// Middleware
// cors дозволяє приймати запити з вашого сайту на GitHub Pages
app.use(cors()); 
app.use(bodyParser.json());

// Цей рядок більше не потрібен на Render, бо HTML хоститься на GitHub
// app.use(express.static(__dirname));

// Налаштування Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'deniskibzun@gmail.com', // Ваша пошта
        pass: 'rauv dqpf ikcr rqdy'     // Ваш пароль додатка
    }
});

// Роут для перевірки, чи сервер живий (можна відкрити в браузері)
app.get('/', (req, res) => {
    res.send('Server is running! You can send requests to /send-order');
});

// Роут для запису на сервіс
app.post('/send-order', (req, res) => {
    console.log("Отримано замовлення:", req.body);

    const { name, phone, car, message, service } = req.body;

    const mailOptions = {
        from: 'deniskibzun@gmail.com',
        to: 'deniskibzun@gmail.com',
        subject: `🆕 Новий запис на сервіс: ${service}`,
        html: `
            <h3>Нова заявка з сайту</h3>
            <ul>
                <li><strong>Послуга:</strong> ${service}</li>
                <li><strong>Ім'я:</strong> ${name}</li>
                <li><strong>Телефон:</strong> ${phone}</li>
                <li><strong>Авто:</strong> ${car || 'Не вказано'}</li>
            </ul>
            <p><strong>Повідомлення:</strong> ${message || 'Без повідомлення'}</p>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Помилка відправки:", error);
            res.status(500).send('Помилка при відправці');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Успішно відправлено');
        }
    });
});

// Роут для вакансій
app.post('/send-vacancy', (req, res) => {
    console.log("Отримано резюме:", req.body);

    const { name, phone, email, experience, message, vacancy } = req.body;

    const mailOptions = {
        from: 'deniskibzun@gmail.com',
        to: 'deniskibzun@gmail.com',
        subject: `💼 Відгук на вакансію: ${vacancy}`,
        html: `
            <h3>Кандидат на посаду ${vacancy}</h3>
            <ul>
                <li><strong>Ім'я:</strong> ${name}</li>
                <li><strong>Телефон:</strong> ${phone}</li>
                <li><strong>Email:</strong> ${email || 'Не вказано'}</li>
                <li><strong>Досвід:</strong> ${experience} років</li>
            </ul>
            <p><strong>Про себе:</strong> ${message || 'Не вказано'}</p>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Помилка відправки:", error);
            res.status(500).send('Помилка при відправці');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Успішно відправлено');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
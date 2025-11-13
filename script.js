// --- 1. ПЕРЕМЕННЫЕ И НАЧАЛЬНОЕ СОСТОЯНИЕ КОРГИ ---

let corgi = {
    // Начальные показатели (от 0 до 100)
    hunger: 100, // Сытость
    thirst: 100, // Жажда
    clean: 100,  // Чистота
    happy: 100   // Счастье
};

// --- 2. ПОЛУЧЕНИЕ ЭЛЕМЕНТОВ ИНТЕРФЕЙСА ---

const statsElements = {
    hunger: document.getElementById('stat-hunger'),
    thirst: document.getElementById('stat-thirst'),
    clean: document.getElementById('stat-clean'),
    happy: document.getElementById('stat-happy')
};

const imageElement = document.getElementById('corgi-image');
// const mainButton = Telegram.WebApp.MainButton; // Будем использовать позже для сложных уведомлений

// --- 3. ФУНКЦИЯ ОБНОВЛЕНИЯ ИНТЕРФЕЙСА (HUD) ---

function updateUI() {
    // Обновляем текст и цвет для каждого показателя
    for (const stat in corgi) {
        let value = corgi[stat];
        let element = statsElements[stat];
        let label = '';
        
        // Определяем текст и эмодзи для показателя
        if (stat === 'hunger') label = '❤️ Сытость';
        else if (stat === 'thirst') label = '💧 Жажда';
        else if (stat === 'clean') label = '🧼 Чистота';
        else if (stat === 'happy') label = '😊 Счастье';

        // Обновляем текст на экране
        element.textContent = `${label}: ${value}%`;

        // Меняем цвет в зависимости от уровня
        if (value > 70) {
            element.style.backgroundColor = '#98fb98'; // Зеленый (Отлично)
        } else if (value > 30) {
            element.style.backgroundColor = '#ffc44d'; // Желтый (Средне)
        } else {
            element.style.backgroundColor = '#ff6961'; // Красный (Критично)
        }
    }
    
    // Меняем настроение Корги (визуально)
    if (corgi.happy < 40 || corgi.hunger < 30) {
        // Грустное состояние
        imageElement.style.transform = 'scale(0.9)'; 
    } else {
        // Нормальное состояние
        imageElement.style.transform = 'scale(1)'; 
    }
}

// --- 4. ФУНКЦИЯ, ЗАСТАВЛЯЮЩАЯ ПОКАЗАТЕЛИ ПАДАТЬ ---

function decreaseStats() {
    // Скорость падения (настраивайте!)
    const decayRate = 1; 

    corgi.hunger = Math.max(0, corgi.hunger - decayRate);
    corgi.thirst = Math.max(0, corgi.thirst - decayRate);
    
    // Чистота и Счастье падают медленнее
    corgi.clean = Math.max(0, corgi.clean - decayRate * 0.5);
    corgi.happy = Math.max(0, corgi.happy - decayRate * 0.7);

    updateUI();
}

// Запускаем падение показателей каждые 5 секунд
setInterval(decreaseStats, 5000); 

// --- 5. ФУНКЦИИ ДЕЙСТВИЙ (РЕАКЦИЯ НА КНОПКИ) ---

function performAction(statKey, amount, happyBoost = 0) {
    // Проверяем, не вызвана ли функция "Гулять"
    if (statKey === 'walk') {
        // Мини-игра "Прогулка" (упрощенная версия)
        corgi.happy = Math.min(100, corgi.happy + 50); // Большой бонус к счастью
        corgi.clean = Math.max(0, corgi.clean - 20); // Немного пачкается (побегал же)
        
        alert("Корги счастливо побегал! 😊 Чистота немного снизилась. Он доволен!");
    } else {
        // Остальные действия (Кормить, Поить, Купать)
        corgi[statKey] = Math.min(100, corgi[statKey] + amount);
        corgi.happy = Math.min(100, corgi.happy + happyBoost);
        
        let message = '';
        if (statKey === 'hunger') message = 'Корги сыт! Гав!';
        else if (statKey === 'thirst') message = 'Корги попил и доволен!';
        else if (statKey === 'clean') message = 'Корги чист!';
        
        // Визуальный фидбэк (онлайн анимация)
        imageElement.style.transform = 'scale(1.1)'; 
        setTimeout(() => {
            imageElement.style.transform = 'scale(1)';
        }, 300);
        
        alert(message);
    }
    
    // Обновляем интерфейс после любого действия
    updateUI();
}

// --- 6. ПРИВЯЗКА КНОПОК К ДЕЙСТВИЯМ ---

document.getElementById('btn-feed').onclick = () => {
    // Кормить: +30 к сытости, +5 к счастью
    performAction('hunger', 30, 5); 
};

document.getElementById('btn-water').onclick = () => {
    // Поить: +40 к жажде
    performAction('thirst', 40);
};

document.getElementById('btn-bathe').onclick = () => {
    // Купать: +100 к чистоте, +10 к счастью 
    performAction('clean', 100, 10); 
};

document.getElementById('btn-walk').onclick = () => {
    // Гулять: Спец-действие
    performAction('walk'); 
};

// --- 7. ИНИЦИАЛИЗАЦИЯ (Запуск при старте игры) ---

// Вызываем функцию один раз, чтобы показать начальные 100% при загрузке
updateUI();
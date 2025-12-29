const elements = {
    createBlockBtn: document.querySelector('#create-block-btn'),
    list: document.querySelector('#blocks'),
    html: document.querySelector('#steam-html'),
    delete: document.querySelector('#delete-btn'),
    createHTMLButton: document.querySelector('#create-html-btn'),
}


const STORAGE_KEY = 'blocks';


// РАДИО КНОПКИ

const answers = [
    { value: '🚬', text: '🚬' },
    { value: '💣', text: '💣' },
    { value: '🌟', text: '🌟' },
    { value: '🔥', text: '🔥' },
];

const mouseButtons = [
    { value: '0', text: 'ЛКМ' },
    { value: '1', text: 'ЛКМ + ПКМ' },
    { value: '2', text: 'ПКМ' },
];

const movement = [
    { value: '0', text: 'Стой на месте' },
    { value: '1', text: 'Прыжок' },
    { value: '2', text: 'Прыжок + Вперёд' },
    { value: '3', text: 'Вперёд' },
    { value: '4', text: 'Другое' },
];

function createRadio(container, itemValue) {
    const id = crypto.randomUUID();
    const div = document.createElement('div');
    div.classList.add("template__radio-container");
    answers.forEach((item) => {
        const label = document.createElement('label');

        const input = document.createElement('input');

        if (itemValue == item.text) {
            console.log("true");
            input.checked = true;
        }
        input.type = 'radio';
        input.name = 'answer' + id;
        input.value = item.value;
        input.classList.add("radio-icon");
        input.classList.add("template__icon");

        const text = document.createTextNode(' ' + item.text);

        label.appendChild(text);
        label.appendChild(input);

        div.appendChild(label);
    });
    container.appendChild(div);
}

function createRadioMouse(container, itemValue) {
    const id = crypto.randomUUID();
    const div = document.createElement('div');
    div.classList.add("template__radio-container");
    mouseButtons.forEach((item) => {
        const label = document.createElement('label');

        const input = document.createElement('input');
        if (itemValue == item.text) {
            console.log("true");
            input.checked = true;
        }
        input.type = 'radio';
        input.name = 'mouseButton' + id;
        input.value = item.text;
        input.classList.add("template__mouse-button");

        const text = document.createTextNode(' ' + item.text);

        label.appendChild(text);
        label.appendChild(input);

        div.appendChild(label);
    });
    container.appendChild(div);
}

function createRadioMovement(container, itemValue) {
    const id = crypto.randomUUID();
    const div = document.createElement('div');
    div.classList.add("template__radio-container");
    movement.forEach((item) => {
        const label = document.createElement('label');

        const input = document.createElement('input');
        if (itemValue == item.text) {
            console.log("true");
            input.checked = true;
        }
        input.type = 'radio';
        input.name = 'movement' + id;
        input.value = item.text;
        input.classList.add("template__movement");

        const text = document.createTextNode(' ' + item.text);

        label.appendChild(text);
        label.appendChild(input);

        div.appendChild(label);
    });
    container.appendChild(div);
}

// =====

elements.createBlockBtn.addEventListener('click', function (event) {
    console.log("hi");
    const newItem = {
        icon: "",
        title: "",
        subtitle: "",
        imageId: "",
        images: ["", "src-2"],
        keys: "[keys]",
    }
    MOCKDATA.push(newItem);
    saveState();
    renderList();
});


let MOCKDATA = [];

function loadState() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) MOCKDATA = JSON.parse(saved);
}

function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCKDATA));
    createSteamHTML();

}

// const MOCKDATA = [
//     {
//         title: "title",
//         subtitle: "subtitle",
//         images: ["src-1", "src-2"],
//         keys: "[keys]",
//     },
//     {
//         title: "title-2",
//         subtitle: "subtitle-2",
//         images: ["src-1", "src-2"],
//         keys: "[keys]",
//     },
//     {
//         title: "title-3",
//         subtitle: "subtitle-3",
//         images: ["src-1", "src-2"],
//         keys: "[keys]",
//     },
// ];

function renderList() {
    // Чтобы при ререндере не дублировались блоки
    elements.list.innerHTML = "";

    MOCKDATA.forEach((item, index) => {
        createBlock(item, index);
    });

    // TODO Это точно должно быть тут???
    createSteamHTML();
};

function createBlock(item, index) {
    const li = document.createElement('li');
    li.classList.add('block');
    li.dataset.id = index;
    li.appendChild(createTemplate(item));
    li.appendChild(createPreview(item));
    elements.list.appendChild(li);
}

function createTemplate(item) {

    //TODO ДОБАВИТЬ ПРОВЕРКИ НА СУЩЕСТВОВАНИЕ
    const template = document.createElement('div');
    template.classList.add('template');

    // INPUTS
    // === RADIO

    createRadio(template, item.icon);

    createRadioMouse(template, item.mouseButton);

    createRadioMovement(template, item.movement);

    const title = document.createElement('input');
    title.classList.add('template__input--title');
    title.classList.add('template__input');
    title.value = item.title;
    title.placeholder = "НАЗВАНИЕ";

    const subtitle = document.createElement('textarea');
    subtitle.classList.add('template__input--subtitle');
    subtitle.classList.add('template__input');
    subtitle.value = item.subtitle;
    subtitle.placeholder = "ОПИСАНИЕ ";

    const imgId = document.createElement('input');
    imgId.classList.add('template__input--img-id');
    imgId.classList.add('template__input');
    imgId.value = "НЕ ИСПОЛЬЗОВАТЬ. УДАЛИТЬ. НЕ ТРОГАТЬ";

    const img_1 = document.createElement('input');
    img_1.classList.add('template__input--img-1');
    img_1.classList.add('template__input');
    img_1.value = item.images[0];
    img_1.placeholder = "ССЫЛКА НА КАРТИНКУ";

    // const img_2 = document.createElement('input');
    // img_2.classList.add('template__input--img-2');
    // img_2.classList.add('template__input');
    // img_2.value = item.images[1];


    // TODO добавить остальные инпуты
    template.appendChild(title);
    template.appendChild(subtitle);
    template.appendChild(imgId);
    template.appendChild(img_1);
    // template.appendChild(img_2);
    return template;
}

function createPreview(item) {
    //TODO ДОБАВИТЬ ПРОВЕРКИ НА СУЩЕСТВОВАНИЕ
    const preview = document.createElement('div');
    preview.classList.add('preview');

    // ICON
    const icon = document.createElement('span');
    icon.classList.add('preview__icon');
    icon.textContent = `[${item.icon}] `;

    // Mouse Button
    const mouseButton = document.createElement('div');
    mouseButton.classList.add('preview__mouse-button');
    mouseButton.textContent = `Мышь: ${item.mouseButton} `;

    // Movement
    const movement = document.createElement('div');
    movement.classList.add('preview__movement');
    movement.textContent = `Движение: ${item.movement} `;

    const title = document.createElement('p');
    title.classList.add('preview__title');
    title.textContent = item.title;

    const subtitle = document.createElement('p');
    subtitle.classList.add('preview__subtitle');
    subtitle.textContent = item.subtitle;

    const gallery = document.createElement('div');
    gallery.classList.add('preview__gallery');

    const img_1 = document.createElement('img');
    img_1.classList.add('preview__img-1');
    // img_1.src = item.images[0];
    img_1.src = steamImageHTMLToImageLink(item.images[0]);
    // console.log(item.images[0]);
    console.log("img src");
    console.log(img_1.src);

    img_1.alt = "image";

    // const img_2 = document.createElement('img');
    // img_2.classList.add('preview__img-2');
    // img_2.src = item.images[1];
    // img_2.alt = "right img";

    // Gallery
    gallery.appendChild(img_1);
    // gallery.appendChild(img_2);



    // TODO добавить картинки и ключи
    preview.appendChild(icon);
    preview.appendChild(title);
    preview.appendChild(subtitle);
    preview.appendChild(mouseButton);
    preview.appendChild(movement);
    preview.appendChild(gallery);

    return preview;
}

// ДЕЛЕГИРОВАНИЕ
elements.list.addEventListener("input", function (event) {
    const input = event.target;
    // TODO УЛУЧШИТЬ СЕЛЕКТОР!!! ОН НА все инпуты вешается щас
    if (input.classList.contains('template__input--title')) {
        const li = input.closest('li');
        const p = li.querySelector('.preview__title');
        p.textContent = input.value; // тут меняется текст параграфа
        MOCKDATA[li.dataset.id].title = input.value;
    }
    if (input.classList.contains('template__input--subtitle')) {
        const li = input.closest('li');
        const p = li.querySelector('.preview__subtitle');
        p.textContent = input.value; // тут меняется текст параграфа
        MOCKDATA[li.dataset.id].subtitle = input.value;
    }
    if (input.classList.contains('template__input--img-id')) {
        const li = input.closest('li');
        console.log(MOCKDATA[li.dataset.id].imageId);
        MOCKDATA[li.dataset.id].imageId = input.value;
        console.log(MOCKDATA[li.dataset.id].imageId);

    }
    if (input.classList.contains('template__input--img-1')) {
        const li = input.closest('li');
        const img = li.querySelector('.preview__img-1');
        // console.log(img);
        img.src = steamImageHTMLToImageLink(input.value); // тут меняется текст параграфа
        // img.src = input.value; // тут меняется текст параграфа
        img.alt = "alt"; // тут меняется текст параграфа
        MOCKDATA[li.dataset.id].images[0] = input.value;
    }
    // if (input.classList.contains('template__input--img-2')) {
    //     const li = input.closest('li');
    //     const img = li.querySelector('.preview__img-2');
    //     console.log(img);
    //     img.src = input.value; // тут меняется текст параграфа
    //     img.alt = input.value; // тут меняется текст параграфа
    //     MOCKDATA[li.dataset.id].images[1] = input.value;
    // }
    saveState();
    // renderList();
});

// ДЕЛЕГИРОВАНИЕ РАДИО ДВИЖЕНИЯ
elements.list.addEventListener('change', (event) => {
    const target = event.target;
    const li = target.closest('li');

    if (target.matches('input[type="radio"]')) {
        console.log('Выбрано значение для движения:', target.value);
        // Вставить
        const movement = li.querySelector('.preview__movement');
        // Вставить
        movement.textContent = `Движение: ${target.value}`;
        MOCKDATA[li.dataset.id].movement = target.value;
    }
    saveState();
});
// ДЕЛЕГИРОВАНИЕ РАДИО КНОПОК МЫШИ
elements.list.addEventListener('change', (event) => {
    const target = event.target;
    const li = target.closest('li');

    if (target.matches('input[type="radio"]')) {
        console.log('Выбрано значение для кнопки мыши:', target.value);
        // Вставить
        const mouseButton = li.querySelector('.preview__mouse-button');
        // Вставить
        mouseButton.textContent = `Мышь: ${target.value}`;
        MOCKDATA[li.dataset.id].mouseButton = target.value;
    }
    saveState();
});

// ДЕЛЕГИРОВАНИЕ РАДИО
elements.list.addEventListener('change', (event) => {
    const target = event.target;
    const li = target.closest('li');

    if (target.matches('input[type="radio"]')) {
        console.log('Выбрано значение:', target.value);
        const icon = li.querySelector('.preview__icon');
        icon.textContent = `[${target.value}] `;
        MOCKDATA[li.dataset.id].icon = target.value;
    }
    saveState();
});

function createSteamHTML() {
    elements.html.textContent = '';
    MOCKDATA.forEach((item, index) => {
        let text = createHTMLForSingleBlock(item, index);
        elements.html.textContent += text;
    });
};

function createHTMLForSingleBlock(item, index) {
    let text = ``;
    // Иконка
    // text += `${item.icon} `;
    // Текст
    // text += `[b]${item.title}:[/b] ${item.subtitle} \n\n`;

    // Заголовок
    text += `[h1]${item.icon} ${item.title}[/h1]\n`;
    // Описание
    text += item.subtitle ? `${item.subtitle}\n` : ``;
    // Воздух
    text += `\n`;
    // Мышь
    text += `Мышь: ${item.mouseButton} \n`;
    // Движение
    text += `Движение: ${item.movement} \n`;
    // Воздух
    text += `\n`;
    // Картинка
    text += item.images[0] ? `${item.images[0]}\n` : `ТУТ ДОЛЖНА БЫТЬ КАРТИНКА\n`;
    // if (item.imageId && item.images[0]) {
    // text += `\n[screenshot=${item.imageId};sizeFull,inline;${item.images[0]}][/screenshot]\n`;
    // } else {
    // text += `ОШИБКА ВСТАВКИ КАРТИНКИ\n`;
    // }
    // Обязательный разделитель
    text += `[hr][/hr]\n`;
    // Воздух
    text += `\n`;
    return text;
};

elements.delete.addEventListener('click', function (event) {
    event.preventDefault();
    if (confirm("ARE YOU SURE?")) {
        MOCKDATA = [];
        saveState();
        renderList();
    }
})

elements.createHTMLButton.addEventListener('click', function (event) {
    event.preventDefault();
    createSteamHTML();
})

function steamImageHTMLToImageLink(string) {
    const match = string.match(/https?:\/\/[^;[\]]+/);
    const url = match ? match[0] : string;
    return url;
}

function init() {
    loadState();
    renderList();
    // renderHTML(); НЕ РАБОТАЕТ КАК НАДО 
    // createSteamHTML();

};
init();
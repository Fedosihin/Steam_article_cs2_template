const elements = {
    createBlockBtn: document.querySelector('#create-block-btn'),
    list: document.querySelector('#blocks'),
    html: document.querySelector('#steam-html'),
    delete: document.querySelector('#delete-btn'),
}


const STORAGE_KEY = 'blocks';


// РАДИО КНОПКИ

const answers = [
    { value: '🚬', text: '🚬' },
    { value: '💣', text: '💣' },
    { value: '🌟', text: '🌟' },
    { value: '🔥', text: '🔥' },
];


function createRadio(container) {
    answers.forEach((item) => {
        const label = document.createElement('label');

        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'answer';
        input.value = item.value;
        input.classList.add("template__icon");

        const text = document.createTextNode(' ' + item.text);

        label.appendChild(text);
        label.appendChild(input);

        container.appendChild(label);
    });
}

// =====

elements.createBlockBtn.addEventListener('click', function (event) {
    console.log("hi");
    const newItem = {
        icon: "🚬",
        title: "new-title",
        subtitle: "new-subtitle",
        imageId: "3619115822",
        images: ["src-1", "src-2"],
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

    createRadio(template);

    const title = document.createElement('input');
    title.classList.add('template__input--title');
    title.classList.add('template__input');
    title.value = item.title;

    const subtitle = document.createElement('textarea');
    subtitle.classList.add('template__input--subtitle');
    subtitle.classList.add('template__input');
    subtitle.value = item.subtitle;

    const imgId = document.createElement('input');
    imgId.classList.add('template__input--img-id');
    imgId.classList.add('template__input');
    imgId.value = item.imageId;

    const img_1 = document.createElement('input');
    img_1.classList.add('template__input--img-1');
    img_1.classList.add('template__input');
    img_1.value = item.images[0];

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
    img_1.src = item.images[0];
    img_1.alt = "left img";

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
        console.log(img);
        img.src = input.value; // тут меняется текст параграфа
        img.alt = input.value; // тут меняется текст параграфа
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
});

// ДЕЛЕГИРОВАНИЕ РАДИО
elements.list.addEventListener('change', (event) => {
    const target = event.target;
    const li = target.closest('li');

    if (target.matches('input[type="radio"][name="answer"]')) {
        console.log('Выбрано значение:', target.value);
        const icon = li.querySelector('.preview__icon');
        icon.textContent = `[${target.value}] `;
        MOCKDATA[li.dataset.id].icon = target.value;
    }
    saveState();
});

function createSteamHTML() {
    MOCKDATA.forEach((item, index) => {
        let text = createHTMLForSingleBlock(item, index);
        elements.html.textContent += text;
    });
};

function createHTMLForSingleBlock(item, index) {
    let text = ``;
    // Иконка
    text += `[${item.icon}] `;
    // Текст
    text += `[b]${item.title}:[/b] ${item.subtitle} \n`;
    // Картинка
    if (item.imageId && item.images[0]) {
        text += `\n[screenshot=${item.imageId};sizeFull,inline;${item.images[0]}][/screenshot]\n`;
    } else {
        text += `ОШИБКА ВСТАВКИ КАРТИНКИ\n`;
    }
    // Обязательный разделитель
    text += `\n`;
    return text;
};

elements.delete.addEventListener('click', function(event){
    event.preventDefault();
    if(confirm("ARE YOU SURE?")){
        MOCKDATA = [];
        saveState();
        renderList();
    }
})

function init() {
    loadState();
    renderList();
    // renderHTML(); НЕ РАБОТАЕТ КАК НАДО 
    createSteamHTML();
};
init();
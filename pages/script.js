let profile = document.querySelector('.profile-info__title');
let subtitle = document.querySelector('.profile-info__subtitle');

let input = document.querySelector("input");
input.focus();
input.selectionStart = input.value.length;

function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

// Находим форму в DOM
let formElement = document.querySelector('.popup');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.
    // Находим поля формы в DOM

    let nameInput = document.getElementById("name").value;
    let jobInput = document.getElementById("work").value;

    // Получите значение полей из свойства value
    // Выберите элементы, куда должны быть вставлены значения полей
    // Вставьте новые значения с помощью textContent
    document.querySelector('.profile-info__title').textContent = nameInput;
    document.querySelector('.profile-info__subtitle').textContent = jobInput;
    closeForm();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
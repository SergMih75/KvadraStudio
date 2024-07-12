const controlBtn = document.querySelectorAll('.control__btn')
const controlItem = document.querySelectorAll('.control__item')
const feedbackItem = document.querySelectorAll('.feedback')

// Выбираем активный отзыв при первоначальной загрузке. Первоначальный активный отзыв задан случайным образом
document.addEventListener('DOMContentLoaded', () => {
	let firstInit = true
	step = Math.floor(Math.random() * (feedbackItem.length - 1 + 1) + 1)
	getFeedback(step, firstInit)
})

// Перемещаемся по отзывам при помощи нажатия на стрелки управления слайдером
controlBtn.forEach(controlBtn => {
	controlBtn.addEventListener('click', () => {
		if (controlBtn.classList.contains('control__btn-left')) {
			step = -1
		} else {
			step = 1
		}

		getFeedback(step)
	})
})

// Переход к отзыву через нажатие на полоску отзыва
controlItem.forEach(controlItem => {
	controlItem.addEventListener('click', () => {
		if (!controlItem.classList.contains('control__item-active')) {
			nowActive = +controlItem.dataset.numberItem

			controlItemChange(nowActive)
			feedbackItemChange(nowActive)
		}
	})
})

// Функция смены отзыва в зависимости от реакции на элементы управления (нажатие на кнопки или полоски отзывов). Слайдер поддерживает бесконечность прокрутки. При достижении последнего отзыва и по нажатии на стрелку вправо, открывается первый отзыв и наоборот

function getFeedback(step, firstInit, jump) {
	let nowActive
	for (i = 0; i < feedbackItem.length; i++) {
		if (firstInit === true) {
			firstInit = false
			nowActive = step

			controlItemChange(nowActive)
			feedbackItemChange(nowActive)
			break
		}
		if (controlItem[i].classList.contains('control__item-active')) {
			nowActive = +controlItem[i].dataset.numberItem + step
			if (nowActive === 0) {
				nowActive = feedbackItem.length
			}
			if (nowActive > feedbackItem.length) {
				nowActive = 1
			}
			controlItemChange(nowActive)
			feedbackItemChange(nowActive)
			break
		}
	}
}

// Функция изменения полосы отметки активного отзыва
function controlItemChange(nowActive) {
	controlItem.forEach(item => {
		if (item.dataset.numberItem == nowActive) {
			item.classList.add('control__item-active')
		} else {
			item.classList.remove('control__item-active')
		}
	})
}

// Функция изменения активного отзыва
function feedbackItemChange(nowActive) {
	feedbackItem.forEach(feedbackItem => {
		if (feedbackItem.dataset.numberFeedback == nowActive) {
			feedbackItem.classList.add('feedback-active')
		} else {
			feedbackItem.classList.remove('feedback-active')
		}
	})
}

// Собираем элементы для анимации через scale
let scaleAnimation = document.querySelectorAll('.animation-scale')
// Собираем элементы для анимации через translate Х или У
let translateBlockAnimation = document.querySelectorAll('.animation-translate')

// Анимация набора текста
// Строки, куда будет выводиться текст по анимации (содержание выводимого текста и места, куда он будет выдоится,  в дата-атрибутах строки для вывода)
const letterByLetterAnimationElem = document.querySelectorAll(
	'.animation-letter'
)
let textDataBlock = []
let textOutBlock = []

// Анимация возрастания цифр
// Блок results
let resultsData = document.querySelectorAll('.results__item-text')
let digitCounterFromResults = true

function letterByLetterTextOut(str, output, delay) {
	let arr = [...str]
	let out = ''
	arr.forEach((item, index) => {
		setTimeout(() => {
			out = out + item
			output.textContent = out
		}, (delay / arr.length) * index)
	})
}
// Анимация набора текста end

document.addEventListener('scroll', () => {
	letterByLetterAnimationElem.forEach(item => {
		if (item.getBoundingClientRect().top - window.innerHeight * 0.75 < 0) {
			if (
				textDataBlock.indexOf(item.dataset.text) === -1 &&
				textOutBlock.indexOf(item.dataset.place) === -1
			) {
				textDataBlock.push(item.dataset.text)
				textOutBlock.push(item.dataset.place)

				letterByLetterTextOut(
					item.dataset.text,
					document.querySelector(`[data-place=${item.dataset.place}]`),
					3500
				)
			}
		}
	})

	// Анимация увеличения картинок при скролле
	scaleAnimation.forEach(item => {
		// Добавляем увеличение картинки при прокручивании до неё
		if (item.getBoundingClientRect().top - window.innerHeight / 2 < 0) {
			item
				.getElementsByTagName('img')[0]
				.classList.add('animation-scale-active')
		}

		// Убираем увеличение картинки при прокручивании её вниз за границы экрана
		if (
			item.getBoundingClientRect().top - (window.innerHeight + 5) > 0 &&
			item
				.getElementsByTagName('img')[0]
				.classList.contains('animation-scale-active')
		) {
			item
				.getElementsByTagName('img')[0]
				.classList.remove('animation-scale-active')
		}
	})

	// Анимация движения блоков через translate
	translateBlockAnimation.forEach(item => {
		// Сдвигаем блок в границы экрана при прокручивании до него
		if (item.getBoundingClientRect().top - (window.innerHeight - 20) < 0) {
			item.style.opacity = 1
			if (item.classList.contains('results') && item.style.opacity == 1) {
				if (digitCounterFromResults === true) {
					digitCounterFromResults = false
					digitCounter(resultsData)
				}
			}
		}

		if (item.getBoundingClientRect().top - (window.innerHeight + 5) > 0) {
			item.style.opacity = 0
			if (item.classList.contains('results')) {
				digitCounterFromResults = true
				resultsData.forEach(digit => {
					digit.textContent = ''
				})
			}
		}
	})
})

function digitCounter(digit) {
	digit.forEach(digit => {
		setTimeout(() => {
			let step = 0

			const interval = setInterval(() => {
				if (step < 50) {
					step++
				}
				if (step < 100 && step >= 50) {
					step = step + 2
					if (step >= digit.dataset.result) {
						step = digit.dataset.result
					}
				}
				if (step < 500 && step >= 100) {
					step = step + Math.floor(Math.random() * (50 - 2 + 1) + 2)
					if (step >= digit.dataset.result) {
						step = digit.dataset.result
					}
				}
				if (step < 1000 && step >= 500) {
					step = step + Math.floor(Math.random() * (100 - 50 + 1) + 50)
					if (step >= digit.dataset.result) {
						step = digit.dataset.result
					}
				}
				if (step < 5000 && step >= 1000) {
					step = step + Math.floor(Math.random() * (500 - 100 + 1) + 100)
					if (step >= digit.dataset.result) {
						step = digit.dataset.result
					}
				}
				if (step >= 5000) {
					step = step + Math.floor(Math.random() * (1000 - 500 + 1) + 500)
					if (step >= digit.dataset.result) {
						step = digit.dataset.result
					}
				}

				digit.textContent = step
				if (step === digit.dataset.result) {
					clearInterval(interval)
				}
			}, 20)
		}, 500)
	})
}

// Анимация движения текста на блоке просмотра фотографий всех проектов портфолио. Запускается на экранах меньше 1080 пикселей шириной. На больших экранах статичен
const allProjectBtn = document.querySelector('.all__mask')

// Движение текста влево до конца блока
function allProjectBtnShiftLeft(shift) {
	const shiftAnimation = setInterval(() => {
		shift = shift - 2
		allProjectBtn.style.left = shift + 'px'

		if (allProjectBtn.getBoundingClientRect().right - window.innerWidth <= 0) {
			clearInterval(shiftAnimation)
			setTimeout(() => {
				allProjectBtnShiftRight(shift)
			}, 250)
		}
	}, 50)
}

// Движение текста  в право до начала блока
function allProjectBtnShiftRight(shift) {
	const shiftAnimation = setInterval(() => {
		shift = shift + 2
		allProjectBtn.style.left = shift + 'px'

		if (allProjectBtn.getBoundingClientRect().left >= 0) {
			clearInterval(shiftAnimation)
			setTimeout(() => {
				allProjectBtnShiftLeft(shift)
			}, 250)
		}
	}, 50)
}

document.addEventListener('DOMContentLoaded', () => {
	let shift = 0
	if (window.innerWidth < 1080) {
		allProjectBtnShiftLeft(shift)
	}
})

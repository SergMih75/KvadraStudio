const btn = document.querySelectorAll('.btn')
const allProject = document.querySelector('.all')
// Удаление признака активной кнопки у всех вариантов портфолио
const removeActive = function () {
	btn.forEach(item => {
		item.classList.remove('btn-active')
	})
}

// Выбор вкладки с персональными или публичными дизайнами портфолио
btn.forEach(btn => {
	btn.addEventListener('click', () => {
		removeActive()
		// Устанавливаем активную кнопку выбранного портфолио
		btn.classList.add('btn-active')
		// Активация выбранного портфолио
		if (btn.id === 'personal') {
			document.querySelector('.persons').style.display = 'flex'
			document.querySelector('.public').style.display = 'none'
		} else {
			document.querySelector('.public').style.display = 'flex'
			document.querySelector('.persons').style.display = 'none'
		}
	})
})
// Выбор вкладки с персональными или публичными дизайнами портфолио END

const descriptionLink = document.querySelectorAll('.description__link')

descriptionLink.forEach(link => {
	link.addEventListener('click', () => {
		let projectFilter = link.dataset.link
		getPortfolioObjectData(projectFilter)
		document.getElementById('popup').classList.add('popup-active')
	})
})

// Выбор фото всех проектов
allProject.addEventListener('click', () => {
	getPortfolioObjectData()
	document.getElementById('popup').classList.add('popup-active')
})

// Выбор картинок по выбранному проекту для детального с ним ознакомления в popup окне слайдера. Данные по ссылкам на фотографии проектов берутся из json файла. При выборе просмотра всего портфолио - показываются все фотографии проектов по очереди по проектам.
function getPortfolioObjectData(projectFilter) {
	let filter
	fetch('./data/portfolio.json')
		.then(response => {
			if (!response.ok) {
				throw new Error('Ой, ошибка в fetch: ' + response.statusText)
			}
			return response.json()
		})
		.then(jsonData => {
			if (projectFilter !== undefined) {
				filter = jsonData.filter(item => item.interior === projectFilter)
			} else {
				filter = jsonData
			}

			filter.forEach(item => {
				let galleryImg = document.createElement('img')
				galleryImg.classList = 'gallery__img'
				galleryImg.src = item.link
				document.querySelector('.gallery__block').append(galleryImg)
			})
			document
				.querySelector('.gallery__close')
				.classList.add('gallery__close-active')
		})
		.catch(error => console.error('Ошибка при исполнении запроса: ', error))
}
// Закрытие popup окна галереи
document.querySelector('.gallery__close').addEventListener('click', () => {
	document
		.querySelector('.gallery__close')
		.classList.remove('gallery__close-active')
	document.querySelectorAll('.gallery__img').forEach(item => {
		item.remove()
	})
	document.getElementById('popup').classList.remove('popup-active')
})

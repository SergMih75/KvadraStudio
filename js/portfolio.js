const btn = document.querySelectorAll('.btn')
// Удаление признака активной кнопки у всех вариантов портфолио
const removeActive = function() {
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
console.log('descriptionLink: ', descriptionLink);
descriptionLink.forEach(link=>{
	link.addEventListener('click',()=>{
		let projectFilter = link.dataset.link
		console.log(projectFilter);
	})
})

// Открывание и закрывание меню для мобилы + переключение мобильного меню
document.querySelector('.burger').addEventListener('click', () => {
	document.querySelector('.burger').classList.toggle('burger-active')
	document
		.querySelector('.menu__block-mobile')
		.classList.toggle('menu__block-mobile-active')
})
// Открывание и закрывание меню для мобилы + переключение мобильного меню end
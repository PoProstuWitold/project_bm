// Navigation
const menuToggle = document.getElementById('menu-toggle')
const menuClose = document.getElementById('menu-close')
const menu = document.getElementById('menu')
const navLinks = menu.querySelectorAll('a')

navLinks.forEach(link => {
	link.addEventListener('click', () => {
		menu.classList.remove('open')
	})
})

menuToggle.addEventListener('click', () => {
	menu.classList.add('open')
})

menuClose.addEventListener('click', () => {
	menu.classList.remove('open')
})

// Featured Products
const featuredProducts = [
	{
		badge: 'BESTSELLER',
		badgeClass: 'product-badge',
		img: 'assets/img/mock_jacket.png',
		alt: 'Blue Jacket',
		title: 'Dark blue alpine climbing jacket',
		price: '€300,00 EUR'
	},
	{
		badge: 'LIMITED EDITION',
		badgeClass: 'product-badge--purple',
		img: 'assets/img/ski_helmet.png',
		alt: 'Orange Helmet',
		title: 'Orange helmet for alpine TOUNDRA',
		price: '€300,00 EUR'
	},
	{
		badge: '',
		badgeClass: '',
		img: 'assets/img/mock_jacket.png',
		alt: 'Blue Jacket',
		title: 'Dark blue alpine climbing jacket',
		price: '€300,00 EUR'
	},
	{
		badge: 'BESTSELLER',
		badgeClass: 'product-badge',
		img: 'assets/img/mock_jacket.png',
		alt: 'Blue Jacket',
		title: 'Dark blue alpine climbing jacket',
		price: '€300,00 EUR'
	},
	{
		badge: '',
		badgeClass: '',
		img: 'assets/img/ski_helmet.png',
		alt: 'Orange Helmet',
		title: 'Orange helmet for alpine TOUNDRA',
		price: '€300,00 EUR'
	},
	{
		badge: 'BESTSELLER',
		badgeClass: 'product-badge',
		img: 'assets/img/ski_helmet.png',
		alt: 'Orange Helmet',
		title: 'Orange helmet for alpine TOUNDRA',
		price: '€300,00 EUR'
	}
]
const wrapper = document.querySelector('.featured-swiper .swiper-wrapper')

wrapper.innerHTML = featuredProducts.map(product => `
	<div class="swiper-slide product-card">
		<div class="product-image">
			${product.badge ? `<span class="product-badge ${product.badgeClass || ''}">${product.badge}</span>` : ''}
			<span class="favorite-icon">
				<img src="assets/icons/favorite_icon.svg" alt="Favorite" class="icon-outline" />
				<img src="assets/icons/favorite_icon_filled.svg" alt="Favorite Filled" class="icon-filled" />
			</span>
			<img src="${product.img}" alt="${product.alt}" />
		</div>
		<div class="product-info">
			<h4>${product.title}</h4>
			<p>${product.price}</p>
		</div>
	</div>
`).join('')


const swiper = new Swiper('.featured-swiper', {
	slidesPerView: 1,
	spaceBetween: 20,
	loop: true,
	navigation: {
		nextEl: '.swiper-button-next',
		
	},
	breakpoints: {
		640: { slidesPerView: 1 },
		768: { slidesPerView: 1 },
		1024: { slidesPerView: 4 }
	}
})
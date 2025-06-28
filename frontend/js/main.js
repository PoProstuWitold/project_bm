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
		nextEl: '.swiper-button-next'
	},
	breakpoints: {
		640: { slidesPerView: 1 },
		768: { slidesPerView: 1 },
		1024: { slidesPerView: 4 }
	}
})

// All Products
class ProductGrid {
	static products = []
	static grid = document.getElementById('products-grid')
	static page = 1
	static pageSize = 14
	static loading = false

	static init() {
		this.bindEvents()
		this.resetAndLoad()
	}

	static bindEvents() {
		window.addEventListener('resize', () => this.reorder())
		window.addEventListener('scroll', () => {
			if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100)
				this.loadNext()
		})
		document.getElementById('productsPerPage').addEventListener('change', e => {
			this.pageSize = parseInt(e.target.value)
			this.resetAndLoad()
		})
	}

	static async loadNext() {
		if (this.loading) return
		this.loading = true

		const url = `https://brandstestowy.smallhost.pl/api/random?pageNumber=${this.page}&pageSize=${this.pageSize}`
		const res = await fetch(url)
		const json = await res.json()
		console.log(json)
		this.products.push(...json.data)
		this.page++
		this.render()
		this.loading = false
	}

	static resetAndLoad() {
		this.products = []
		this.page = 1
		this.grid.innerHTML = ''
		this.loadNext()
	}

	static render() {
		this.grid.innerHTML = ''
		this.products.forEach((product, i) => {
			if (i === 4) {
				this.grid.appendChild(this.createCard(product, true))
				this.grid.appendChild(this.createBanner())
			} else {
				this.grid.appendChild(this.createCard(product))
			}
		})
		this.reorder()
	}

	static createCard(product, isMobile5th = false) {
		const div = document.createElement('div')
		div.className = 'all-products-card'
		if (isMobile5th) div.classList.add('mobile-move-down')
		div.dataset.id = product.id
		div.innerHTML = `
			<p>ID: ${String(product.id).padStart(2, '0')}</p>
			<img src="${product.image || 'assets/img/mock_jacket.png'}" alt="ID ${product.id}" />
		`
		return div
	}

	static createBanner() {
		const div = document.createElement('div')
		div.className = 'all-products-banner'
		div.id = 'main-banner'
		div.innerHTML = `
			<img src="assets/img/skier.png" alt="Banner" />
			<div class="all-products-banner-content">
				<div class="all-products-banner-text">
					<p class="all-products-banner-subtitle">Forma'Sint.</p>
					<p class="all-products-banner-title">You'll look and feel like the champion.</p>
				</div>
				<a href="#" class="all-products-banner-btn">
				Check this out
				<img src="assets/icons/chevron_right_icon.svg" alt="Forma Icon" />
				</a>
			</div>
		`
		return div
	}

	static reorder() {
		const card = this.grid.querySelector('.mobile-move-down')
		const banner = this.grid.querySelector('#main-banner')
		if (!card || !banner) return
		if (window.innerWidth <= 768) {
			this.grid.insertBefore(banner, card.nextSibling)
			this.grid.insertBefore(card, banner.nextSibling)
		} else {
			this.grid.insertBefore(card, banner)
		}
	}
}

window.addEventListener('DOMContentLoaded', () => ProductGrid.init())

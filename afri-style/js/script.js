// Lightbox pour agrandir les images
class Lightbox {
    constructor() {
        this.lightbox = document.getElementById('imageLightbox');
        this.lightboxImg = document.getElementById('lightboxImage');
        this.lightboxCaption = document.querySelector('.lightbox-caption');
        this.closeBtn = document.querySelector('.close-btn');
        
        this.init();
    }
    
    init() {
        // Fermer la lightbox
        this.closeBtn.addEventListener('click', () => this.close());
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) this.close();
        });
        
        // Échap pour fermer
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.close();
        });
    }
    
    open(imgSrc, altText) {
        this.lightbox.style.display = 'block';
        this.lightboxImg.src = imgSrc;
        this.lightboxCaption.textContent = altText;
        document.body.style.overflow = 'hidden';
    }
    
    close() {
        this.lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Gestion des produits
class ProductManager {
    constructor() {
        this.products = this.generateProducts();
        this.lightbox = new Lightbox();
        this.favorites = new Set();
        this.init();
    }
    
    generateProducts() {
        const products = [];
        const productNames = [
            "Tissu Wax Élégant", "Statue Bois Sculpté", "Bijoux Perles", 
            "Panier Artisanal", "Masque Cérémonial", "Tapis Traditionnel",
            "Robe Brodée", "Vase Céramique", "Sculpture Animale",
            "Collier Ethnique", "Bracelet Tressé", "Sac en Rafia",
            "Tableau Batik", "Tambour Africain", "Statuette Fertilité",
            "Boucles d'Oreilles", "Ceinture Perlé", "Couvre-lit Wax",
            "Rideaux Imprimés", "Coussin Décor", "Nappe Colorée",
            "Serviettes Brodées", "Set de Table", "Plateau Bois",
            "Théière Tradition", "Tasse Artisanale", "Sous-verres",
            "Cadre Sculpté", "Miroir Décor", "Lumière Africaine",
            "Pouf Cuir", "Tabouret Bois", "Chaise Tradition",
            "Parure Lit", "Rideaux Perlé", "Tenture Murale",
            "Boîte Bijoux", "Coffret Secret", "Plateau Service",
            "Set Cuisine"
        ];
        
        // Liste de toutes les images disponibles dans votre dossier
        const availableImages = [
            1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,20,21,22,23,24,25,
            26,27,28,29,30,31,32,33,34,35,36,37,38,39,40
        ];
        
        // Créer 39 produits avec toutes les images disponibles
        for (let i = 0; i < availableImages.length; i++) {
            const imageNumber = availableImages[i];
            products.push({
                id: i + 1,
                name: productNames[i] || `Création GocestGo ${i + 1}`,
                image: `images/produit${imageNumber}.jpg`,
                seller: "+24166239354"
            });
        }
        
        console.log('Produits générés:', products.length);
        return products;
    }
    
    init() {
        this.renderFeaturedProducts();
        this.renderAllProducts();
        this.attachEventListeners();
    }
    
    renderFeaturedProducts() {
        const featuredGrid = document.getElementById('featuredProducts');
        if (!featuredGrid) return;
        
        // Prendre 8 produits au hasard pour l'accueil
        const shuffled = [...this.products].sort(() => 0.5 - Math.random());
        const featuredProducts = shuffled.slice(0, 8);
        
        featuredGrid.innerHTML = featuredProducts.map(product => `
            <div class="product-card">
                <button class="favorite-btn" data-id="${product.id}">
                    <i class="far fa-heart"></i>
                </button>
                <img src="${product.image}" alt="${product.name}" 
                     onerror="this.src='https://via.placeholder.com/200x200/f8f9fa/666?text=Image+Non+Disponible'">
                <button class="buy-btn" data-seller="${product.seller}" 
                        data-name="${product.name}">
                    <i class="fas fa-shopping-cart"></i>
                    Acheter
                </button>
            </div>
        `).join('');
    }
    
    renderAllProducts() {
        const productsGrid = document.getElementById('allProducts');
        if (!productsGrid) return;
        
        productsGrid.innerHTML = this.products.map(product => `
            <div class="product-card">
                <button class="favorite-btn" data-id="${product.id}">
                    <i class="far fa-heart"></i>
                </button>
                <img src="${product.image}" alt="${product.name}" 
                     onerror="this.src='https://via.placeholder.com/200x200/f8f9fa/666?text=Image+Non+Disponible'">
                <p class="cfa-price">00 FCFA</p>
                <button class="buy-btn" data-seller="${product.seller}" 
                        data-name="${product.name}">
                    <i class="fas fa-shopping-cart"></i>
                    Acheter
                </button>
            </div>
        `).join('');
    }
    
    attachEventListeners() {
        setTimeout(() => {
            // Boutons favoris
            const favoriteButtons = document.querySelectorAll('.favorite-btn');
            favoriteButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.toggleFavorite(e.target.closest('.favorite-btn'));
                });
            });
            
            // Boutons d'achat
            const buyButtons = document.querySelectorAll('.buy-btn');
            buyButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    const sellerNumber = e.target.getAttribute('data-seller');
                    const productName = e.target.getAttribute('data-name');
                    this.openWhatsApp(sellerNumber, productName);
                });
            });
            
            // Clic sur les images
            const productImages = document.querySelectorAll('.product-card img');
            productImages.forEach(img => {
                img.addEventListener('click', () => {
                    this.lightbox.open(img.src, img.alt);
                });
            });
        }, 100);
    }
    
    toggleFavorite(button) {
        const productId = button.getAttribute('data-id');
        const heartIcon = button.querySelector('i');
        
        if (this.favorites.has(productId)) {
            this.favorites.delete(productId);
            heartIcon.className = 'far fa-heart';
            button.classList.remove('active');
        } else {
            this.favorites.add(productId);
            heartIcon.className = 'fas fa-heart';
            button.classList.add('active');
        }
    }
    
    openWhatsApp(sellerNumber, productName) {
        const cleanNumber = sellerNumber.replace(/\D/g, '');
        const message = `Bonjour GocestGo ! 🛍️\nJe souhaite acheter : ${productName}\nPrix : 00 FCFA\nPouvez-vous me contacter pour finaliser la commande ?`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
        window.open(whatsappURL, '_blank');
    }
}

// Gestion du formulaire de contact
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            const sellerNumber = "+24166239354";
            const whatsappMessage = `Nouveau message de contact:\nNom: ${name}\nEmail: ${email}\nSujet: ${subject}\nMessage: ${message}`;
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappURL = `https://wa.me/${sellerNumber.replace(/\D/g, '')}?text=${encodedMessage}`;
            
            window.open(whatsappURL, '_blank');
            contactForm.reset();
            alert('Votre message a été envoyé! Nous vous répondrons bientôt.');
        });
    }
}

// Gestion des boutons de service
function initServiceButtons() {
    const serviceButtons = document.querySelectorAll('.service-btn');
    serviceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const service = this.closest('.service-card').querySelector('h3').textContent;
            
            if (service.includes('Coiffure')) {
                const message = `Bonjour ! Je souhaite prendre un rendez-vous pour une prestation de coiffure. Pouvez-vous me contacter pour convenir d'une date ?`;
                const encodedMessage = encodeURIComponent(message);
                const whatsappURL = `https://wa.me/+24166239354?text=${encodedMessage}`;
                window.open(whatsappURL, '_blank');
            } else if (service.includes('Livraison')) {
                const message = `Bonjour ! Je souhaite en savoir plus sur votre service de livraison express.`;
                const encodedMessage = encodeURIComponent(message);
                const whatsappURL = `https://wa.me/+24166239354?text=${encodedMessage}`;
                window.open(whatsappURL, '_blank');
            }
        });
    });
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page chargée - Initialisation des produits');
    new ProductManager();
    initContactForm();
    initServiceButtons();
});
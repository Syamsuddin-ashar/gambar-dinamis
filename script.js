// Mengatur index slide awal
let slideIndex = 0;

// Mengambil semua elemen gambar dan video dalam carousel
const slides = document.querySelectorAll('.carousel-slide img, .carousel-slide video');

// Mengambil kontainer slide untuk mengatur translasi (perpindahan) slide
const slideContainer = document.querySelector('.carousel-slide');

// Fungsi untuk menampilkan slide berdasarkan slideIndex
function showSlides() {
    slideContainer.style.transform = `translateX(-${slideIndex * 100}%)`; // Menggeser slide secara horizontal
}

// Fungsi untuk mengatur auto-play (perpindahan otomatis) slide
function autoPlay() {
    slideIndex++; // Menambah index untuk berpindah ke slide berikutnya
    if (slideIndex >= slides.length) {
        slideIndex = 0; // Mengatur index kembali ke awal jika sudah mencapai slide terakhir
    }
    showSlides(); // Menampilkan slide baru berdasarkan index terbaru
}

// Memulai auto-play dengan interval 3 detik
setInterval(autoPlay, 3000);

// Mengambil elemen lightbox dan elemen-elemen terkait
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeLightbox = document.querySelector('.close');
let currentVideo = null; // Variabel untuk melacak video yang sedang diputar

// Menambahkan event listener ke setiap slide (gambar/video) untuk membuka lightbox
slides.forEach((slide) => {
    slide.addEventListener('click', () => {
        lightbox.style.display = "block"; // Menampilkan lightbox
        
        if (slide.tagName === 'VIDEO') {
            lightboxImg.style.display = 'none';  // Menyembunyikan elemen gambar jika yang diklik adalah video
            if (!currentVideo) {
                currentVideo = document.createElement('video'); // Membuat elemen video jika belum ada
                currentVideo.controls = true; // Menambahkan kontrol pada video
                currentVideo.classList.add('lightbox-content'); // Menambahkan kelas CSS yang sesuai
                lightbox.insertBefore(currentVideo, lightboxCaption); // Menyisipkan video sebelum caption di lightbox
            }
            currentVideo.src = slide.querySelector('source').src; // Mengatur sumber video yang akan diputar
            currentVideo.style.display = 'block'; // Menampilkan elemen video
        } else {
            lightboxImg.style.display = 'block'; // Menampilkan elemen gambar jika yang diklik adalah gambar
            lightboxImg.src = slide.src; // Mengatur sumber gambar yang ditampilkan di lightbox
            lightboxCaption.innerHTML = slide.dataset.caption; // Menampilkan caption gambar di lightbox
            if (currentVideo) {
                currentVideo.style.display = 'none'; // Menyembunyikan elemen video jika yang ditampilkan adalah gambar
            }
        }
        lightboxCaption.innerHTML = slide.dataset.caption; // Menampilkan caption sesuai data dari slide
    });
});

// Menambahkan event listener ke tombol close untuk menutup lightbox
closeLightbox.addEventListener('click', () => {
    lightbox.style.display = "none"; // Menyembunyikan lightbox
    if (currentVideo) {
        currentVideo.pause(); // Menghentikan video jika sedang diputar saat lightbox ditutup
    }
});

// Mengambil semua tombol filter dan thumbnail
const filterButtons = document.querySelectorAll('.filter-button');
const thumbnails = document.querySelectorAll('.thumbnail');

// Menambahkan event listener ke setiap tombol filter untuk mengatur filter gambar/video
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter; // Mengambil jenis filter dari data tombol

        // Menampilkan atau menyembunyikan slide berdasarkan filter yang dipilih
        slides.forEach(slide => {
            if (filter === 'all' || slide.classList.contains(filter)) {
                slide.style.display = 'block'; // Menampilkan slide yang sesuai dengan filter
            } else {
                slide.style.display = 'none'; // Menyembunyikan slide yang tidak sesuai
            }
        });

        // Menampilkan atau menyembunyikan thumbnail berdasarkan filter yang dipilih
        thumbnails.forEach(thumbnail => {
            if (filter === 'all' || thumbnail.classList.contains(filter)) {
                thumbnail.style.display = 'inline-block'; // Menampilkan thumbnail yang sesuai dengan filter
            } else {
                thumbnail.style.display = 'none'; // Menyembunyikan thumbnail yang tidak sesuai
            }
        });

        // Mengatur ulang index slide setelah filter diterapkan
        slideIndex = 0;
        showSlides(); // Menampilkan slide sesuai dengan index yang baru
    });
});

// Menambahkan event listener ke setiap thumbnail untuk menavigasi slide
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        slideIndex = index; // Mengatur index slide sesuai dengan thumbnail yang diklik
        showSlides(); // Menampilkan slide sesuai dengan index yang baru
    });
});

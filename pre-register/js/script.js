// ฟังก์ชันหยุดวิดีโอทั้งหมด
    function stopAllVideos() {
        // กรณีเป็น <video>
        document.querySelectorAll('.character-slide video').forEach(v => {
            v.pause();
            v.currentTime = 0;
        });

        // กรณีเป็น YouTube iframe
        document.querySelectorAll('.character-slide iframe').forEach(iframe => {
            const src = iframe.src;
            iframe.src = src; // reload เพื่อหยุด
        });
    }

    document.querySelectorAll('.character-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const charIndex = this.getAttribute('data-char');

            // หยุดวิดีโอทุกแท็บก่อน
            stopAllVideos();

            // ซ่อนทุก slide
            document.querySelectorAll('.character-slide').forEach(slide => {
                slide.style.display = 'none';
            });

            // เอา active ออกจากปุ่มทั้งหมด
            document.querySelectorAll('.character-btn').forEach(b => b.classList.remove('active'));

            // แสดง slide ที่เลือก
            document.querySelectorAll('.character-slide')[charIndex].style.display = 'block';

            // active ปุ่ม
            this.classList.add('active');
        });
    });

    // เปิดสไลด์แรก
    document.querySelectorAll('.character-slide')[0].style.display = 'block';

// Back to Top Button
const backToTopBtn = document.getElementById('backToTopBtn');

// Show/hide button based on scroll position
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

// Scroll to top smoothly when button is clicked
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Language switcher: change text based on `?lang=` parameter (th / en / id)
document.addEventListener('DOMContentLoaded', () => {
    function getLangFromUrl() {
        const params = new URLSearchParams(window.location.search);
        return (params.get('lang') || 'en').toLowerCase();
    }

    const translations = {
        en: {
            'ctf-nav-register': 'Register',
            'ctf-nav-introduction': 'Introduction',
            'ctf-nav-trailers': 'Trailers',
            'ctf-head-text': "CLASSIC HACK ‘N’ SLASH ARPG<br>WITH ENDLESS BUILD DIVERSITY",
            'ctf-class-character': 'Class / Character',
            'ctf-class-description': 'Choose your class and survive in a world destroyed by a mysterious asteroid, fighting steampunk enemies in search of epic loot.',
            'ctf-class-learnMore1': 'Learn More',
            'ctf-class-learnMore2': 'Learn More',
            'ctf-class-learnMore3': 'Learn More',
            'ctf-class-description1': 'Character description and backstory goes here.',
            'ctf-class-description2': 'Character description and backstory goes here.',
            'ctf-class-description3': 'Character description and backstory goes here.',
            'ctf-trailer-description': 'Kickstart your adventure in a classic hack ‘n’ slash Action RPG—featuring randomized dungeons, procedural skills, and an endless endgame.',
            'ctf-footer-subtitle': "CLASSIC HACK ‘N’ SLASH ARPG<br>WITH ENDLESS BUILD DIVERSITY"
        },
        th: {
            'ctf-nav-register': 'ลงทะเบียน',
            'ctf-nav-introduction': 'แนะนำ',
            'ctf-nav-trailers': 'ตัวอย่าง',
            'ctf-head-text': 'เกมแอ็คชั่น RPG แบบคลาสสิก<br>ที่มีความหลากหลายของการสร้างตัวละครไม่สิ้นสุด',
            'ctf-class-character': 'คลาส / ตัวละคร',
            'ctf-class-description': 'เลือกคลาสของคุณและเอาตัวรอดในโลกที่ถูกทำลายจากดาวเคราะห์น้อยลึกลับ ต่อสู้กับศัตรูสไตม์พังก์เพื่อค้นหาของดีๆ',
            'ctf-class-learnMore1': 'อ่านเพิ่มเติม',
            'ctf-class-learnMore2': 'อ่านเพิ่มเติม',
            'ctf-class-learnMore3': 'อ่านเพิ่มเติม',
            'ctf-class-description1': 'คำอธิบายตัวละครและภูมิหลังจะถูกใส่ที่นี่',
            'ctf-class-description2': 'คำอธิบายตัวละครและภูมิหลังจะถูกใส่ที่นี่',
            'ctf-class-description3': 'คำอธิบายตัวละครและภูมิหลังจะถูกใส่ที่นี่',
            'ctf-trailer-description': 'เริ่มการผจญภัยของคุณในเกมแอ็คชั่น RPG แบบแอ็คชัน—มีดันเจี้ยนสุ่ม ทักษะที่เปลี่ยนแปลงได้ และเนื้อหาสำหรับเล่นได้ไม่สิ้นสุด',
            'ctf-footer-subtitle': 'เกมแอ็คชั่น RPG แบบคลาสสิก<br>ที่มีความหลากหลายของการสร้างตัวละครไม่สิ้นสุด'
        },
        id: {
            'ctf-nav-register': 'Daftar',
            'ctf-nav-introduction': 'Perkenalan',
            'ctf-nav-trailers': 'Trailer',
            'ctf-head-text': 'ARPG HACK N\' SLASH KLASIK<br>DENGAN KEBEBASAN BUILD TANPA BATAS',
            'ctf-class-character': 'Kelas / Karakter',
            'ctf-class-description': 'Pilih kelas Anda dan bertahan hidup di dunia yang hancur oleh asteroid misterius, melawan musuh steampunk untuk mencari loots epik.',
            'ctf-class-learnMore1': 'Pelajari Lebih Lanjut',
            'ctf-class-learnMore2': 'Pelajari Lebih Lanjut',
            'ctf-class-learnMore3': 'Pelajari Lebih Lanjut',
            'ctf-class-description1': 'Deskripsi dan latar belakang karakter akan ditempatkan di sini.',
            'ctf-class-description2': 'Deskripsi dan latar belakang karakter akan ditempatkan di sini.',
            'ctf-class-description3': 'Deskripsi dan latar belakang karakter akan ditempatkan di sini.',
            'ctf-trailer-description': 'Mulai petualangan Anda dalam ARPG hack n\' slash klasik—menampilkan dungeon acak, keterampilan prosedural, dan konten endgame yang tak terbatas.',
            'ctf-footer-subtitle': 'ARPG HACK N\' SLASH KLASIK<br>DENGAN KEBEBASAN BUILD TANPA BATAS'
        }
    };

    function applyLanguage(lang) {
        const map = translations[lang] || translations['en'];
        Object.keys(map).forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;
            // If image, set alt
            if (el.tagName === 'IMG') {
                el.setAttribute('alt', map[id]);
            } else if (el.tagName === 'A' && el.querySelector('img')) {
                // anchor that wraps an image (pre-reg buttons) -> set title attribute
                el.setAttribute('title', map[id]);
            } else {
                el.innerHTML = map[id];
            }
        });

        // Update dropdown label and mark active
        const languageDropdown = document.getElementById('languageDropdown');
        const labels = { th: 'ไทย', en: 'English', id: 'Bahasa' };
        if (languageDropdown) languageDropdown.innerHTML = labels[lang] || 'Language';

        document.querySelectorAll('.lang-link').forEach(a => {
            a.classList.toggle('active', a.getAttribute('data-lang') === lang);
        });
    }

    const selectedLang = getLangFromUrl();
    applyLanguage(selectedLang);

    // Ensure dropdown links include full path (preserve pathname)
    document.querySelectorAll('.lang-link').forEach(a => {
        const lang = a.getAttribute('data-lang');
        a.href = window.location.pathname + '?lang=' + lang;
    });
});
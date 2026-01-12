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
// Navbar element
const navbar = document.querySelector('.navbar');

// Show/hide button based on scroll position & Sticky Navbar
window.addEventListener('scroll', () => {
    // Back to Top Logic
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }

    // Sticky Navbar Logic (Works only on PC screen >= 992px)
    const scrollThreshold = document.documentElement.scrollHeight * 0.20;

    // Check if screen width is >= 992px (Desktop)
    if (window.innerWidth >= 992 && window.scrollY > scrollThreshold) {
        if (!navbar.classList.contains('sticky-menu')) {
            // Prevent layout jump by adding padding to body equal to navbar height
            document.body.style.paddingTop = navbar.offsetHeight + 'px';
            navbar.classList.add('sticky-menu');
        }
    } else {
        if (navbar.classList.contains('sticky-menu')) {
            // Reset padding
            document.body.style.paddingTop = '0';
            navbar.classList.remove('sticky-menu');
        }
    }
});

// Scroll to top smoothly when button is clicked
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Stop video playback when carousel slide changes
document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.getElementById('slideCtfCarousel');

    carousel.addEventListener('slide.bs.carousel', function () {
        const iframes = carousel.querySelectorAll('iframe');
        iframes.forEach(iframe => {
            const src = iframe.src;
            iframe.src = src; // reset iframe = หยุดวิดีโอ
        });
    });
});

// Language switcher: change text based on `?lang=` parameter (th / en / id)
document.addEventListener('DOMContentLoaded', () => {
    function getInitialLang() {
        const params = new URLSearchParams(window.location.search);
        const urlLang = params.get('lang');

        // 1. ถ้ามี param ใน url ให้ยึดตาม url เป็นหลัก และบันทึกทับลง localStorage ทันที
        if (urlLang && ['th', 'en', 'id'].includes(urlLang.toLowerCase())) {
            const lang = urlLang.toLowerCase();
            localStorage.setItem('lang', lang);
            return lang;
        }

        // 2. ถ้าไม่มีใน url ค่อยไปดูใน localStorage
        const stored = localStorage.getItem('lang');
        if (stored) return stored;

        // 3. ถ้าไม่มีอะไรเลย ใช้ default
        return 'en';
    }

    const translations = {
        en: {
            'ctf-nav-register': 'Register',
            'ctf-nav-rewards': 'Rewards',
            'ctf-nav-introduction': 'Introduction',
            'ctf-nav-trailers': 'Trailers',
            'ctf-head-text': "CLASSIC ARPG<br>WITH ENDLESS BUILD DIVERSITY",
            'ctf-class-character': 'Class / Character',
            'ctf-class-description': 'Choose your class and survive in a free online steampunk world devastated by a mysterious asteroid, battling enemies and hunting for epic loot.',
            'ctf-class-learnMore1': 'Learn More',
            'ctf-class-learnMore2': 'Learn More',
            'ctf-class-learnMore3': 'Learn More',
            'ctf-class-description1': 'Powerful hybrid of human and lion, specializing in melee combat with blades and shields.',
            'ctf-class-description2': 'Mutated foxes adept at dealing consistent damage from close or long range with pistols, rifles and shotguns.',
            'ctf-class-description3': 'Enigmatic hybrids of human and crow, wielding steampunk staffs infused with aether.',
            'ctf-trailer-description': 'Kickstart your adventure in a free to play online steampunk action RPG, featuring randomized dungeons, procedural skills, and an endless endgame set in a steampunk world.',
            'ctf-footer-subtitle': "CLASSIC ARPG<br>WITH ENDLESS BUILD DIVERSITY",
            'register-banner': 'Register',
            'ctf-reward-description': 'Rewards are unlocked based on the total number of players who complete both pre-registration and add the game to their Steam Wishlist',
            'ctf-rewards-notice': 'Rewards will be sent to the pre-registration email address and are available only to pre-registered and wishlisted players<br>Players who already wishlisted Crystalfall on Steam only need to pre-register.',
            'ctf-footer-contact': 'If you encounter any issues with pre-registration, please contact us <a href="https://playpark.com/support-crystalfall" target="_blank">here</a>.',
            'ctf-footer-disclaimer': 'Disclaimer',
            'ctf-footer-disclaimer-text': 'Crystalfall is an action RPG still in development and while we aspire to accurately describe the game, we cannot guarantee that everything you are presented with here will make it into the final product.',
            'ctf-footer-resource': 'Resource',
            'ctf-footer-resource-privacy': 'Privacy Policy',
            'ctf-footer-resource-terms': 'Terms of Use',
            'ctf-footer-resource-eula': 'EULA',
            'ctf-footer-resource-support': 'Support',
            'ctf-footer-resource-faq': 'FAQ',
            'page-title': 'Crystalfall – Free to play online action RPG on PC | Pre-Register',
            'meta-description': 'Crystalfall is a free online hack’n’slash Action RPG on PC, featuring endless build diversity, dungeon crawling, and deep character progression in a steampunk world. Pre-register now for exclusive rewards.',
            'og-title': 'Crystalfall – Free Online Classic ARPG on PC | Pre-Register',
            'og-description': 'Crystalfall is a free online classic hack’n’slash ARPG on PC, featuring endless build diversity, dungeon crawling, and deep character progression in a steampunk world. Pre-register now for exclusive rewards.',
            'meta-keywords': 'Crystalfall, Crystalfall ARPG, Crystalfall PC game, Free Online ARPG, Free-to-play ARPG, Action RPG, Hack & Slash, Dungeon Crawler, Dungeon crawl, Loot-driven ARPG, Steampunk ARPG, Steampunk world, Dark Fantasy, Passive talents, Synergy build, Build diversity, Power upgrades, Path of Exile, Diablo, Last Epoch, Torchlight, Steam game'
        },
        th: {
            'ctf-nav-register': 'ลงทะเบียน',
            'ctf-nav-rewards': 'รางวัลลงทะเบียน',
            'ctf-nav-introduction': 'แนะนำคลาส',
            'ctf-nav-trailers': 'ตัวอย่างเกม',
            'ctf-head-text': 'CLASSIC ARPG<br>WITH ENDLESS BUILD DIVERSITY',
            'ctf-class-character': 'คลาส / ตัวละคร',
            'ctf-class-description': 'เลือกคลาสที่ใช่ แล้วเอาชีวิตรอดในโลก steampunk ออนไลน์ เล่นฟรี ที่ถูกทำลายโดยอุกกาบาตปริศนา ต่อสู้กับศัตรู และล่าไอเทมสุดแรร์',
            'ctf-class-learnMore1': 'อ่านเพิ่มเติม',
            'ctf-class-learnMore2': 'อ่านเพิ่มเติม',
            'ctf-class-learnMore3': 'อ่านเพิ่มเติม',
            'ctf-class-description1': 'ลูกผสมระหว่างมนุษย์กับสิงโตอันทรงพลัง ถนัดในการต่อสู้ระยะประชิดด้วยดาบและโล่',
            'ctf-class-description2': 'หมาจิ้งจอกกลายพันธุ์ที่ถนัดด้านการสร้างความเสียหายต่อเนื่องทั้งแบบประชิดและระยะไกลด้วยปืนพก, ไรเฟิล, และปืนลูกซอง',
            'ctf-class-description3': 'ลูกผสมระหว่างมนุษย์กับอีกาที่ว่องไว ใช้ไม้เท้าสตีมพังค์ที่บรรจุอีเธอร์เป็นอาวุธ',
            'ctf-trailer-description': 'เริ่มต้นการผจญภัยของคุณในเกม Action RPG ออนไลน์แบบ Free-to-Play ธีม steampunk ที่มาพร้อมดันเจี้ยนแบบสุ่ม สกิลที่สร้างแบบสุ่มตามระบบ (procedural) และ end game ที่ไม่มีที่สิ้นสุดในโลก steampunk',
            'ctf-footer-subtitle': 'CLASSIC ARPG<br>WITH ENDLESS BUILD DIVERSITY',
            'register-banner': 'จำนวนผู้ลงทะเบียน',
            'ctf-reward-description': 'รางวัลจะปลดล็อคตามจำนวนของผู้เล่นที่ดำเนินการเรียบร้อยทั้งการลงทะเบียนล่วงหน้าและกด wishlist เกมใน Steam',
            'ctf-rewards-notice': 'รางวัลจะส่งผ่านอีเมล์ที่ลงทะเบียนล่วงหน้า และมอบให้แก่ผู้ที่ลงทะเบียนล่วงหน้าและกด wishlist เท่านั้น<br>ผู้เล่นที่เพิ่ม Crystalfall ไว้ใน Wishlist บน Steam แล้ว',
            'ctf-footer-contact': 'หากพบปัญหาในการลงทะเบียน โปรดติดต่อเรา <a href="https://playpark.com/support-crystalfall" target="_blank">ที่นี่</a>.',
            'ctf-footer-disclaimer': 'Disclaimer',
            'ctf-footer-disclaimer-text': 'Crystalfall เป็นเกม Action RPG ที่อยู่ระหว่างการพัฒนา แม้ว่าเราจะพยายามสื่อสารถึงสิ่งที่เรากำลังพัฒนาอย่างดีที่สุด แต่เราไม่สามารถรับประกันได้ว่าทุกสิ่งที่ท่านเห็นนี้ จะมีอยู่ในเกมตัวจริง',
            'ctf-footer-resource': 'Resources',
            'ctf-footer-resource-privacy': 'นโยบายความเป็นส่วนตัว',
            'ctf-footer-resource-terms': 'เงื่อนไขการใช้งาน',
            'ctf-footer-resource-eula': 'EULA',
            'ctf-footer-resource-support': 'การสนับสนุน',
            'ctf-footer-resource-faq': 'คำถามที่พบบ่อย',
            'page-title': 'Crystalfall – เกมออนไลน์ Action RPG เล่นฟรี บน PC | Pre-Register',
            'meta-description': 'Crystalfall เกมออนไลน์ Action RPG แนว hack’n’slash เล่นฟรีบน PC มาสำรวจดันเจี้ยน พร้อมระบบบิลด์ที่หลากหลาย และพัฒนาตัวละครในโลก steampunk ลงทะเบียนล่วงหน้าเพื่อรับรางวัลพิเศษ!',
            'og-title': 'Crystalfall – เกมออนไลน์ ARPG สุดคลาสสิก เล่นฟรี บน PC | Pre-Register',
            'og-description': 'Crystalfall เกมออนไลน์ฟรีแนว Classic Hack’n’Slash ARPG บน PC พบกับความหลากหลายในการสร้างตัวละคร ดันเจี้ยน และการพัฒนาตัวละครในโลก Steampunk ลงทะเบียนล่วงหน้าเพื่อรับรางวัลสุดพิเศษ',
            'meta-keywords': 'Crystalfall, Crystalfall ARPG, Crystalfall PC game, Free Online ARPG, เกม ARPG เล่นฟรี, Action RPG, Hack and Slash, Steampunk ARPG, โลก Steampunk, เกมแฟนตาซีดาร์ก, ตะลุยดันเจี้ยน, ดันเจี้ยนแบบสุ่ม, เกม ARPG เน้นลูท, ระบบสกิลพาสซีฟ, บิลด์ตัวละครแบบผสมผสาน, ความหลากหลายของบิลด์, ระบบอัปเกรดพลัง, เกมบน Steam, Path of Exile, Diablo, Last Epoch, Torchlight'
        },
        id: {
            'ctf-nav-register': 'Registrasi',
            'ctf-nav-rewards': 'Hadiah',
            'ctf-nav-introduction': 'Pengenalan',
            'ctf-nav-trailers': 'Trailer',
            'ctf-head-text': 'CLASSIC ARPG<br>WITH ENDLESS BUILD DIVERSITY',
            'ctf-class-character': 'Kelas / Karakter',
            'ctf-class-description': 'Pilih kelas Anda dan bertahan hidup di dunia yang hancur oleh asteroid misterius, melawan musuh steampunk untuk mencari loots epik.',
            'ctf-class-learnMore1': 'baca selengkapnya',
            'ctf-class-learnMore2': 'baca selengkapnya',
            'ctf-class-learnMore3': 'baca selengkapnya',
            'ctf-class-description1': 'Deskripsi dan latar belakang karakter akan ditempatkan di sini.',
            'ctf-class-description2': 'Deskripsi dan latar belakang karakter akan ditempatkan di sini.',
            'ctf-class-description3': 'Deskripsi dan latar belakang karakter akan ditempatkan di sini.',
            'ctf-trailer-description': 'Mulai petualanganmu dalam action RPG online steampunk yang gratis dimainkan, dengan dungeon acak, keterampilan prosedural, dan permainan akhir tanpa batas yang berlatar dunia steampunk.',
            'ctf-footer-subtitle': 'CLASSIC ARPG<br>WITH ENDLESS BUILD DIVERSITY',
            'register-banner': 'Jumlah pendaftar',
            'ctf-reward-description': 'Hadiah akan terbuka sesuai dengan jumlah total pemain yang sudah melakukan pre-registrasi dan menambahkan game ke Steam Wishlist.',
            'ctf-rewards-notice': 'Hadiah akan dikirimkan ke alamat email pada saat pre-registrasi dan hanya tersedia untuk pemain yang telah melakukan pre-registrasi dan masuk dalam wishlist.<br>Pengguna yang sudah menambahkan Crystalfall ke wishlist di Steam hanya perlu melakukan pre-registrasi.',
            'ctf-footer-contact': 'Jika Anda mengalami kendala saat melakukan pre-registrasi, silakan hubungi kami di <a href="https://playpark.com/support-crystalfall" target="_blank">sini</a>.',
            'ctf-footer-disclaimer': 'Desclaimer',
            'ctf-footer-disclaimer-text': 'Crystalfall adalah game Action RPG yang masih dalam tahap pengembangan. Kami tidak dapat menjamin bahwa semua konten yang ditampilkan saat ini akan tersedia pada produk akhir.',
            'ctf-footer-resource': 'Sumber Daya',
            'ctf-footer-resource-privacy': 'Kebijakan Privasi',
            'ctf-footer-resource-terms': 'Syarat Penggunaan',
            'ctf-footer-resource-eula': 'EULA',
            'ctf-footer-resource-support': 'Dukungan',
            'ctf-footer-resource-faq': 'FAQ',
            'page-title': 'Crystalfall – Gratis untuk dimainkan, action RPG online di PC | Pre-Registrasi',
            'meta-description': 'Crystalfall adalah game Action RPG hack’n’slash online gratis di PC, dengan keragaman build tanpa batas, penjelajahan dungeon, dan perkembangan karakter yang mendalam di dalam dunia steampunk. Pre-Registrasi sekarang untuk mendapatkan hadiah eksklusif.',
            'og-title': 'Crystalfall – ARPG Klasik Online Gratis di PC | Pre-Registrasi',
            'og-description': 'Crystalfall adalah game ARPG klasik hack’n’slash online gratis di PC, dengan ragam build tanpa batas, dungeon crawling yang seru, serta progres karakter yang mendalam dalam dunia steampunk.',
            'meta-keywords': 'Crystalfall, Crystalfall ARPG, Crystalfall PC game, Game Online Gratis, ARPG Free-to-Play, Action RPG, Hack & Slash, Dungeon Crawler, Loot-driven ARPG, Steampunk ARPG, Dunia Steampunk, Dark Fantasy, Sistem Talent Pasif, Build Karakter Sinergi, Variasi Build Tanpa Batas, Dungeon Acak, Sistem Upgrade Kekuatan, Game PC Steam, Path of Exile, Diablo, Last Epoch, Torchlight'
        }
    };

    const imageTranslations = {
        'ctf-nav-enter-site': {
            en: 'images/enter-site.png',
            th: 'images/enter-site-th.png',
            id: 'images/enter-site-id.png'
        },
        'ctf-head-preRegModal': {
            en: 'images/pre-regis-btn.png',
            th: 'images/pre-regis-btn-th.png',
            id: 'images/pre-regis-btn-id.png'
        },
        'ctf-rewards-preRegModal': {
            en: 'images/pre-regis-btn.png',
            th: 'images/pre-regis-btn-th.png',
            id: 'images/pre-regis-btn-id.png'
        },
        'ctf-footer-preRegModal': {
            en: 'images/pre-regis-btn.png',
            th: 'images/pre-regis-btn-th.png',
            id: 'images/pre-regis-btn-id.png'
        },
        'ctf-head-steam': {
            en: 'images/stream-btn.png',
            th: 'images/stream-btn.png',
            id: 'images/stream-btn.png'
        },
        'ctf-rewards-steam': {
            en: 'images/stream-btn.png',
            th: 'images/stream-btn.png',
            id: 'images/stream-btn.png'
        },
        'ctf-footer-steam': {
            en: 'images/stream-btn.png',
            th: 'images/stream-btn.png',
            id: 'images/stream-btn.png'
        },
        'ctf-epicBtn': {
            en: 'images/epic-btn.png',
            th: 'images/epic-btn.png',
            id: 'images/epic-btn.png'
        },
        'ctf-class-intro-title': {
            en: 'images/class-intro-title.png',
            th: 'images/class-intro-title.png',
            id: 'images/class-intro-title-id.png'
        },
        'ctf-trailer-title': {
            en: 'images/trailer-title.png',
            th: 'images/trailer-title.png',
            id: 'images/trailer-title-id.png'
        },
        'ctf-preRegBtn': {
            en: 'images/pre-regis-btn.png',
            th: 'images/pre-regis-btn-th.png',
            id: 'images/pre-regis-btn-id.png'
        },
        'ctf-reward-title': {
            en: 'images/reward-title.png',
            th: 'images/reward-title-th.png',
            id: 'images/reward-title-id.png'
        },
        'ctf-reward-preRegModal': {
            en: 'images/pre-regis-btn.png',
            th: 'images/pre-regis-btn-th.png',
            id: 'images/pre-regis-btn-id.png'
        },
        'ctf-head-text-img': {
            en: 'images/main-title-en.png',
            th: 'images/main-title-th.png',
            id: 'images/main-title-id.png'
        },
        'ctf-footer-text-img': {
            en: 'images/main-title-en.png',
            th: 'images/main-title-th.png',
            id: 'images/main-title-id.png'
        }
    };

    const linkTranslations = {
        'ctf-nav-link-discord': {
            en: 'https://discord.com/invite/UKj53gGr9Y',
            th: 'https://discord.com/invite/UKj53gGr9Y',
            id: 'https://discord.com/invite/UKj53gGr9Y'
        },
        'ctf-nav-link-facebook': {
            en: 'https://crystalfall.playpark.com/pre-register/fb-link.html',
            th: 'https://www.facebook.com/CrystalfallTH',
            id: 'https://www.facebook.com/Crystalfall.ID'
        },
        'ctf-nav-link-reddit': {
            en: 'https://www.reddit.com/r/Crystalfall/',
            th: 'https://www.reddit.com/r/Crystalfall/',
            id: 'https://www.reddit.com/r/Crystalfall/'
        },
        'ctf-nav-link-x': {
            en: 'https://x.com/playcrystalfall',
            th: 'https://x.com/playcrystalfall',
            id: 'https://x.com/playcrystalfall'
        },
        'ctf-nav-link-youtube': {
            en: 'https://www.youtube.com/@playcrystalfall',
            th: 'https://www.youtube.com/@playcrystalfall',
            id: 'https://www.youtube.com/@playcrystalfall'
        },
        'ctf-nav-link-enter-site': {
            en: 'https://crystalfall.com/',
            th: 'https://crystalfall.com/',
            id: 'https://crystalfall.com/'
        },
        'ctf-footer-link-discord': {
            en: 'https://discord.com/invite/UKj53gGr9Y',
            th: 'https://discord.com/invite/UKj53gGr9Y',
            id: 'https://discord.com/invite/UKj53gGr9Y'
        },
        'ctf-footer-link-facebook': {
            en: 'https://crystalfall.playpark.com/pre-register/fb-link.html',
            th: 'https://www.facebook.com/CrystalfallTH',
            id: 'https://www.facebook.com/Crystalfall.ID'
        },
        'ctf-footer-link-reddit': {
            en: 'https://www.reddit.com/r/Crystalfall/',
            th: 'https://www.reddit.com/r/Crystalfall/',
            id: 'https://www.reddit.com/r/Crystalfall/'
        },
        'ctf-footer-link-x': {
            en: 'https://x.com/playcrystalfall',
            th: 'https://x.com/playcrystalfall',
            id: 'https://x.com/playcrystalfall'
        },
        'ctf-footer-link-youtube': {
            en: 'https://www.youtube.com/@playcrystalfall',
            th: 'https://www.youtube.com/@playcrystalfall',
            id: 'https://www.youtube.com/@playcrystalfall'
        },
        'ctf-head-steam-link': {
            en: 'https://store.steampowered.com/app/2574970/Crystalfall/?utm_source=PPlanding_Pre-register_EN',
            th: 'https://store.steampowered.com/app/2574970/Crystalfall/?utm_source=PPlanding_Pre-register_TH',
            id: 'https://store.steampowered.com/app/2574970/Crystalfall/?utm_source=PPlanding_Pre-register_ID'
        },
        'ctf-rewards-steam-link': {
            en: 'https://store.steampowered.com/app/2574970/Crystalfall/?utm_source=PPlanding_Pre-register_EN',
            th: 'https://store.steampowered.com/app/2574970/Crystalfall/?utm_source=PPlanding_Pre-register_TH',
            id: 'https://store.steampowered.com/app/2574970/Crystalfall/?utm_source=PPlanding_Pre-register_ID'
        },
        'ctf-footer-steam-link': {
            en: 'https://store.steampowered.com/app/2574970/Crystalfall/?utm_source=PPlanding_Pre-register_EN',
            th: 'https://store.steampowered.com/app/2574970/Crystalfall/?utm_source=PPlanding_Pre-register_TH',
            id: 'https://store.steampowered.com/app/2574970/Crystalfall/?utm_source=PPlanding_Pre-register_ID'
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
            } else if (el.tagName === 'META') {
                el.setAttribute('content', map[id]);
            } else {
                el.innerHTML = map[id];
            }
        });

        // Switch images based on language
        Object.keys(imageTranslations).forEach(id => {
            const el = document.getElementById(id);
            if (el && el.tagName === 'IMG') {
                const imgMap = imageTranslations[id];
                const newSrc = imgMap[lang] || imgMap['en'];
                el.src = newSrc;
            }
        });

        // Switch links based on language
        Object.keys(linkTranslations).forEach(id => {
            const el = document.getElementById(id);
            if (el && el.tagName === 'A') {
                const linkMap = linkTranslations[id];
                const newHref = linkMap[lang] || linkMap['en'];
                el.href = newHref;
            }
        });

        // Update dropdown label and mark active
        const languageDropdown = document.getElementById('languageDropdown');
        const labels = { th: 'ไทย', en: 'English', id: 'Bahasa' };
        if (languageDropdown) languageDropdown.innerHTML = labels[lang] || 'Language';

        document.querySelectorAll('.lang-link').forEach(a => {
            a.classList.toggle('active', a.getAttribute('data-lang') === lang);
        });

        // Update html lang attribute
        document.documentElement.lang = lang;

        // Update canonical and og:url to match hreflang structure
        const baseUrl = "https://crystalfall.playpark.com/pre-register";
        const newUrl = lang === 'en' ? baseUrl : `${baseUrl}?lang=${lang}`;

        const canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) canonical.href = newUrl;

        const ogUrl = document.querySelector('meta[property="og:url"]');
        if (ogUrl) ogUrl.content = newUrl;
    }

    let selectedLang = getInitialLang();
    applyLanguage(selectedLang);

    // Initial URL cleanup code removed to support SEO (Method 3)
    // We want to keep ?lang= param in the URL now.

    // Handle language switch clicks with reload (to ensure form and all components update)
    document.querySelectorAll('.lang-link').forEach(a => {
        a.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = a.getAttribute('data-lang');

            // Update state (optional, getInitialLang handles it on next load too)
            localStorage.setItem('lang', lang);

            // Set URL param and navigate (Preserves other params like UTM)
            const url = new URL(window.location.href);
            url.searchParams.set('lang', lang);
            window.location.href = url.toString();
        });
    });

    // Milestone Logic
    // const MILESTONE_API_URL = 'https://secure2.playpark.com/milestone/MileStone.ashx?eventid=bTRqWS9aSTdDTkZuME5FTEhsYXBFQT09';
    // Manual value if API is disabled or fails
    const MANUAL_MILESTONE = 54338;

    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function updateMilestoneUI(count) {
        // Update text
        const countEl = document.getElementById('register-count');
        if (countEl) {
            countEl.innerText = formatNumber(count);
        }

        // Determine reward level (1-5)
        let level = 1;
        if (count >= 300000) {
            level = 5;
        } else if (count >= 200000) {
            level = 4;
        } else if (count >= 100000) {
            level = 3;
        } else if (count > 0) {
            level = 2;
        } else {
            level = 1;
        }

        // Suffix for language (except en)
        let suffix = '';
        if (selectedLang !== 'en') {
            suffix = '-' + selectedLang;
        }

        // Update PC image
        const pcImg = document.getElementById('ctf-reward-pc');
        if (pcImg) {
            pcImg.src = `images/reward-${level}${suffix}.png`;
        }

        // Update Mobile image
        const mbImg = document.getElementById('ctf-reward-mobile');
        if (mbImg) {
            mbImg.src = `images/reward-${level}-mb${suffix}.png`;
        }
    }

    function fetchMilestone() {
        if (typeof MILESTONE_API_URL === 'undefined') {
            console.log('API URL is not defined. Using manual milestone.');
            updateMilestoneUI(MANUAL_MILESTONE);
            return;
        }

        fetch(MILESTONE_API_URL)
            .then(response => response.json())
            .then(data => {
                if (data && data.Result === "Success" && typeof data.MileStone === 'number') {
                    updateMilestoneUI(data.MileStone);
                } else {
                    console.warn('Invalid milestone data, using manual value.');
                    updateMilestoneUI(MANUAL_MILESTONE);
                }
            })
            .catch(err => {
                console.error('Error fetching milestone:', err);
                updateMilestoneUI(MANUAL_MILESTONE);
            });
    }

    // Init milestone fetch
    fetchMilestone();


    // Video modal handler
    const videoModal = document.getElementById('videoModal');
    if (videoModal) {
        const videoIframe = document.getElementById('videoIframe');
        const videoSrc = "https://www.youtube.com/embed/hvZTsgzUsPc?autoplay=1&rel=0";

        videoModal.addEventListener('show.bs.modal', function () {
            // Stop other videos if playing (optional but good UX)
            stopAllVideos();
            videoIframe.src = videoSrc;
        });

        videoModal.addEventListener('hide.bs.modal', function () {
            videoIframe.src = "";
        });
    }

    // Auto trigger Modal on scroll
    const triggerEl = document.getElementById('ctf-rewards-play');
    if (triggerEl) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Show modal
                    const modalEl = document.getElementById('videoModal');
                    if (modalEl) {
                        const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
                        modal.show();
                        // Unobserve to trigger only once
                        observer.unobserve(entry.target);
                    }
                }
            });
        }, { threshold: 0.5 });

        observer.observe(triggerEl);
    }
});
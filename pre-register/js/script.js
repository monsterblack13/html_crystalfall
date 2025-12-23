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
    function getLangFromUrl() {
        const params = new URLSearchParams(window.location.search);
        return (params.get('lang') || 'en').toLowerCase();
    }

    const translations = {
        en: {
            'ctf-nav-register': 'Register',
            'ctf-nav-rewards': 'Rewards',
            'ctf-nav-introduction': 'Introduction',
            'ctf-nav-trailers': 'Trailers',
            'ctf-head-text': "CLASSIC ARPG<br>WITH ENDLESS BUILD DIVERSITY",
            'ctf-class-character': 'Class / Character',
            'ctf-class-description': 'Choose your class and survive in a world destroyed by a mysterious asteroid, fighting steampunk enemies in search of epic loot.',
            'ctf-class-learnMore1': 'Learn More',
            'ctf-class-learnMore2': 'Learn More',
            'ctf-class-learnMore3': 'Learn More',
            'ctf-class-description1': 'Powerful hybrid of human and lion, specializing in melee combat with blades and shields.',
            'ctf-class-description2': 'Mutated foxes adept at dealing consistent damage from close or long range with pistols, rifles and shotguns.',
            'ctf-class-description3': 'Enigmatic hybrids of human and crow, wielding steampunk staffs infused with aether.',
            'ctf-trailer-description': 'Kickstart your adventure in a classic hack ‘n’ slash Action RPG—featuring randomized dungeons, procedural skills, and an endless endgame.',
            'ctf-footer-subtitle': "CLASSIC ARPG<br>WITH ENDLESS BUILD DIVERSITY",
            'register-banner': 'Register',
            'ctf-reward-description': 'Rewards are unlocked based on the total number of users who complete both pre-registration and add the game to their Steam Wishlist',
            'ctf-rewards-notice': 'Rewards are available for pre-registered & wishlist users only.'
        },
        th: {
            'ctf-nav-register': 'Register',
            'ctf-nav-rewards': 'Rewards',
            'ctf-nav-introduction': 'Introduction',
            'ctf-nav-trailers': 'Trailers',
            'ctf-head-text': 'CLASSIC ARPG<br>WITH ENDLESS BUILD DIVERSITY',
            'ctf-class-character': 'คลาส / ตัวละคร',
            'ctf-class-description': 'เลือกคลาสที่ชอบ แล้วเอาชีวิตรอดในโลกที่ถูกทำลายโดยอุกกาบาตปริศนา ต่อสู้กับศัตรูแนว steampunk เพื่อออกล่าสมบัติสุดแรร์',
            'ctf-class-learnMore1': 'อ่านเพิ่มเติม',
            'ctf-class-learnMore2': 'อ่านเพิ่มเติม',
            'ctf-class-learnMore3': 'อ่านเพิ่มเติม',
            'ctf-class-description1': 'ลูกผสมระหว่างมนุษย์กับสิงโตอันทรงพลัง ถนัดในการต่อสู้ระยะประชิดด้วยดาบและโล่',
            'ctf-class-description2': 'หมาจิ้งจอกกลายพันธุ์ที่ถนัดด้านการสร้างความเสียหายต่อเนื่องทั้งแบบประชิดและระยะไกลด้วยปืนพก, ไรเฟิล, และปืนลูกซอง',
            'ctf-class-description3': 'ลูกผสมระหว่างมนุษย์กับอีกาที่ว่องไว ใช้ไม้เท้าสตีมพังค์ที่บรรจุอีเธอร์เป็นอาวุธ',
            'ctf-trailer-description': 'เริ่มต้นการผจญภัยของคุณในเกม Action RPG สไตล์ hack ‘n’ slash พร้อมดันเจียนสไตล์ roguelike สกิลหลากหลาย และ endgame ที่เล่นได้ไม่มีวันจบ',
            'ctf-footer-subtitle': 'CLASSIC ARPG<br>WITH ENDLESS BUILD DIVERSITY',
            'register-banner': 'จำนวนผู้ลงทะเบียน',
            'ctf-reward-description': 'Rewards are unlocked based on the total number of users who complete both pre-registration and add the game to their Steam Wishlist',
            'ctf-rewards-notice': 'Rewards are available for pre-registered & wishlist users only.'
        },
        id: {
            'ctf-nav-register': 'Register',
            'ctf-nav-rewards': 'Rewards',
            'ctf-nav-introduction': 'Introduction',
            'ctf-nav-trailers': 'Trailers',
            'ctf-head-text': 'CLASSIC ARPG<br>WITH ENDLESS BUILD DIVERSITY',
            'ctf-class-character': 'Kelas / Karakter',
            'ctf-class-description': 'Pilih kelas Anda dan bertahan hidup di dunia yang hancur oleh asteroid misterius, melawan musuh steampunk untuk mencari loots epik.',
            'ctf-class-learnMore1': 'Tonton trailer',
            'ctf-class-learnMore2': 'Tonton trailer',
            'ctf-class-learnMore3': 'Tonton trailer',
            'ctf-class-description1': 'Deskripsi dan latar belakang karakter akan ditempatkan di sini.',
            'ctf-class-description2': 'Deskripsi dan latar belakang karakter akan ditempatkan di sini.',
            'ctf-class-description3': 'Deskripsi dan latar belakang karakter akan ditempatkan di sini.',
            'ctf-trailer-description': 'Mulai petualangan Anda dalam ARPG hack n\' slash klasik—menampilkan dungeon acak, keterampilan prosedural, dan konten endgame yang tak terbatas.',
            'ctf-footer-subtitle': 'CLASSIC ARPG<br>WITH ENDLESS BUILD DIVERSITY',
            'register-banner': 'Jumlah pendaftar',
            'ctf-reward-description': 'Rewards are unlocked based on the total number of users who complete both pre-registration and add the game to their Steam Wishlist',
            'ctf-rewards-notice': 'Rewards are available for pre-registered & wishlist users only.'
        }
    };

    const imageTranslations = {
        'ctf-nav-enter-site': {
            en: 'images/enter-site.png',
            th: 'images/enter-site.png',
            id: 'images/enter-site.png'
        },
        'ctf-head-preRegModal': {
            en: 'images/pre-regis-btn.png',
            th: 'images/pre-regis-btn.png',
            id: 'images/pre-regis-btn.png'
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
            id: 'images/class-intro-title.png'
        },
        'ctf-trailer-title': {
            en: 'images/trailer-title.png',
            th: 'images/trailer-title.png',
            id: 'images/trailer-title.png'
        },
        'ctf-preRegBtn': {
            en: 'images/pre-regis-btn.png',
            th: 'images/pre-regis-btn.png',
            id: 'images/pre-regis-btn.png'
        },
        'ctf-reward-title': {
            en: 'images/reward-title.png',
            th: 'images/reward-title.png',
            id: 'images/reward-title.png'
        },
        'ctf-reward-preRegModal': {
            en: 'images/pre-regis-btn.png',
            th: 'images/pre-regis-btn.png',
            id: 'images/pre-regis-btn.png'
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

        // Switch images based on language
        Object.keys(imageTranslations).forEach(id => {
            const el = document.getElementById(id);
            if (el && el.tagName === 'IMG') {
                const imgMap = imageTranslations[id];
                const newSrc = imgMap[lang] || imgMap['en'];
                el.src = newSrc;
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

    // Milestone Logic
    // const MILESTONE_API_URL = 'https://secure2.playpark.com/milestone/MileStone.ashx?eventid=bTRqWS9aSTdDTkZuME5FTEhsYXBFQT09';
    // Manual value if API is disabled or fails
    const MANUAL_MILESTONE = 0;

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
});
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
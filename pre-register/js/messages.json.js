// ======================================
// Messages & Error Messages Configuration
// รองรับหลายภาษา: th, en, id, ph, vn, zh
// ======================================

const ALL_MESSAGES = {
    // ภาษาไทย
    th: {
        general: {
            pageTitle: 'ลงทะเบียน',
            pageSubtitle: 'โปรดใช้อีเมลล์เดียวกับอีเมลล์ที่คุณจะใช้ในเกมเพื่อรับรางวัลและสิทธิพิเศษทั้งหมด',
            submitting: 'กำลังส่งข้อมูล...',
            submitButton: 'ยืนยัน',
            success: 'ลงทะเบียนสำเร็จ!',
            successDescription: 'เพิ่ม Crystalfall ลงใน Steam Wishlist เพื่อให้สามารถรับรางวัลการลงทะเบียนล่วงหน้าได้<br><a href="#" target="_blank"><img src="images/stream-btn.png" class="img-fluid mt-1" alt="Stream"></a>',
            demoLink: 'นี่คือลิงก์สาธิต (Demo Link)'
        },
        labels: {
            email: 'อีเมล',
            emailPlaceholder: 'example@email.com',
            phone: 'เบอร์มือถือ',
            phonePlaceholder: '0812345678',
            fullname: 'ชื่อ-นามสกุล',
            fullnamePlaceholder: 'กรอกชื่อของคุณ',
            acceptTerms: 'ฉันยอมรับ <a href="https://secure2.playpark.com/register/Term-of-Service.aspx" target="_blank" class="policy-link">ข้อกำหนดและเงื่อนไข</a>, <a href="https://secure2.playpark.com/register/Term-of-PDPA.aspx" target="_blank" class="policy-link">นโยบายความเป็นส่วนตัว</a>',
            nickname: 'ชื่อเล่น',
            nicknamePlaceholder: 'กรอกชื่อเล่น',
            age: 'อายุ',
            agePlaceholder: 'กรอกอายุของคุณ',
            address: 'ที่อยู่',
            addressPlaceholder: 'กรอกที่อยู่ของคุณ',
            gender: 'เพศ',
            country: 'ประเทศ'
        },
        options: {
            genderOptions: [
                { value: '', label: '-- เลือกเพศ --' },
                { value: 'male', label: 'ชาย' },
                { value: 'female', label: 'หญิง' },
                { value: 'other', label: 'อื่นๆ' }
            ],
            countryOptions: [
                { value: '', label: '-- เลือกประเทศ --' },
                { value: 'TH', label: 'ไทย' },
                { value: 'SG', label: 'สิงคโปร์' },
                { value: 'MY', label: 'มาเลเซีย' },
                { value: 'ID', label: 'อินโดนีเซีย' },
                { value: 'PH', label: 'ฟิลิปปินส์' },
                { value: 'VN', label: 'เวียดนาม' },
                { value: 'MM', label: 'พม่า' },
                { value: 'KH', label: 'กัมพูชา' },
                { value: 'LA', label: 'ลาว' },
                { value: 'BN', label: 'บรูไน' }
            ]
        },
        apiErrors: {
            code1: 'ไม่พบกิจกรรมหรือกิจกรรมปิดอยู่ กรุณาลองใหม่ภายหลัง',
            code3: 'เกิดข้อผิดพลาดอื่นๆ กรุณาติดต่อเจ้าหน้าที่',
            code4: 'ข้อมูลที่ส่งไม่ครบถ้วน กรุณาลองใหม่อีกครั้ง',
            code9: 'ข้อมูลที่ส่งมายังไม่ถูกต้อง กำลังตรวจสอบรายละเอียด...',
            unknown: 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ กรุณาลองใหม่อีกครั้ง',
            connection: 'เกิดข้อผิดพลาดในการเชื่อมต่อ (อาจเป็นปัญหา CORS)\nกรุณาลองใหม่อีกครั้ง'
        },
        freeTextErrors: {
            code0: 'ข้อมูลถูกต้อง',
            code1: 'ไม่พบตัวแปร',
            code2: 'ข้อมูลอีเมลเป็นค่าว่าง',
            code3: 'รูปแบบข้อมูลอีเมลไม่ถูกต้อง',
            code4: 'ข้อมูลเบอร์โทรเป็นค่าว่าง',
            code5: 'รูปแบบข้อมูลเบอร์โทรไม่ถูกต้อง',
            code6: 'ข้อมูลตัวเลขเป็นค่าว่าง',
            code7: 'รูปแบบข้อมูลตัวเลขไม่ถูกต้อง',
            code8: 'ข้อมูลตัวอักษรเป็นค่าว่าง',
            code9: 'รูปแบบข้อมูลตัวอักษรไม่ถูกต้อง',
            code10: 'ข้อมูลอีเมลซ้ำในระบบ',
            code11: 'ข้อมูลเบอร์โทรซ้ำในระบบ',
            code12: 'ข้อมูลตัวเลขซ้ำในระบบ',
            code13: 'ข้อมูลตัวอักษรซ้ำในระบบ',
            default: 'ข้อมูลไม่ถูกต้อง'
        },
        validation: {
            phoneRequired: 'กรุณากรอกเบอร์มือถือ',
            phoneInvalid: 'กรอกเบอร์มือถือให้ถูกต้อง'
        },
        console: {
            sendingData: '=== กำลังส่งข้อมูลไปยัง API (GET) ===',
            eventId: 'Event ID:',
            fullUrl: 'Full URL:',
            parameters: 'Parameters:',
            responseStatus: '=== Response Status ===',
            status: 'Status:',
            statusText: 'Status Text:',
            ok: 'OK:',
            responseData: '=== API Response Data ===',
            fullResponse: 'Full Response:',
            code: 'Code:',
            count: 'Count:',
            result: 'Result:',
            separator: '===============================',
            success: '✅ ลงทะเบียนสำเร็จ!',
            errorPrefix: '❌',
            warningPrefix: '⚠️',
            freeTextError: '❌ FreeText Error Code:',
            validationError: '❌ พบข้อผิดพลาดในการกรอกข้อมูล กรุณาตรวจสอบและแก้ไข',
            unknownCode: '❓ รหัสตอบกลับที่ไม่รู้จัก:',
            apiError: '=== API Error ===',
            error: 'Error:',
            errorMessage: 'Error Message:'
        }
    },

    // English
    en: {
        general: {
            pageTitle: 'Registration',
            pageSubtitle: 'Please use the same email address you plan to use in the game to receive all rewards and benefits.',
            submitting: 'Submitting...',
            submitButton: 'Submit',
            success: 'Registration Successful!',
            successDescription: 'Add Crystalfall to your Steam Wishlist to qualify for pre-registration rewards.<br><a href="#" target="_blank"><img src="images/stream-btn.png" class="img-fluid mt-1" alt="Stream"></a>',
            demoLink: 'This is a demo link'
        },
        labels: {
            email: 'Email',
            emailPlaceholder: 'example@email.com',
            phone: 'Phone Number',
            phonePlaceholder: '0812345678',
            fullname: 'Full Name',
            fullnamePlaceholder: 'Enter your full name',
            acceptTerms: 'I accept the <a href="https://secure2.playpark.com/register/Term-of-Service.aspx" target="_blank" class="policy-link">Terms and Conditions</a>, <a href="https://secure2.playpark.com/register/Term-of-PDPA.aspx" target="_blank" class="policy-link">Privacy Policy</a>',
            nickname: 'Nickname',
            nicknamePlaceholder: 'Enter your nickname',
            age: 'Age',
            agePlaceholder: 'Enter your age',
            address: 'Address',
            addressPlaceholder: 'Enter your address',
            gender: 'Gender',
            country: 'Country'
        },
        options: {
            genderOptions: [
                { value: '', label: '-- Select Gender --' },
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
                { value: 'other', label: 'Other' }
            ],
            countryOptions: [
                { value: '', label: '-- Select Country --' },
                { value: 'TH', label: 'Thailand' },
                { value: 'SG', label: 'Singapore' },
                { value: 'MY', label: 'Malaysia' },
                { value: 'ID', label: 'Indonesia' },
                { value: 'PH', label: 'Philippines' },
                { value: 'VN', label: 'Vietnam' },
                { value: 'MM', label: 'Myanmar' },
                { value: 'KH', label: 'Cambodia' },
                { value: 'LA', label: 'Laos' },
                { value: 'BN', label: 'Brunei' }
            ]
        },
        apiErrors: {
            code1: 'Event not found or closed. Please try again later',
            code3: 'An error occurred. Please contact support',
            code4: 'Incomplete data. Please try again',
            code9: 'Invalid data. Checking details...',
            unknown: 'Unknown error occurred. Please try again',
            connection: 'Connection error (possibly CORS issue)\nPlease try again'
        },
        freeTextErrors: {
            code0: 'Data is valid',
            code1: 'Variable not found',
            code2: 'Email data is empty',
            code3: 'Email format is invalid',
            code4: 'Phone data is empty',
            code5: 'Phone format is invalid',
            code6: 'Number data is empty',
            code7: 'Number format is invalid',
            code8: 'Text data is empty',
            code9: 'Text format is invalid',
            code10: 'Email already exists in system',
            code11: 'Phone already exists in system',
            code12: 'Number already exists in system',
            code13: 'Text already exists in system',
            default: 'Invalid data'
        },
        validation: {
            phoneRequired: 'Please enter phone number',
            phoneInvalid: 'Please enter a valid mobile phone number.'
        },
        console: {
            sendingData: '=== Sending data to API (GET) ===',
            eventId: 'Event ID:',
            fullUrl: 'Full URL:',
            parameters: 'Parameters:',
            responseStatus: '=== Response Status ===',
            status: 'Status:',
            statusText: 'Status Text:',
            ok: 'OK:',
            responseData: '=== API Response Data ===',
            fullResponse: 'Full Response:',
            code: 'Code:',
            count: 'Count:',
            result: 'Result:',
            separator: '===============================',
            success: '✅ Registration successful!',
            errorPrefix: '❌',
            warningPrefix: '⚠️',
            freeTextError: '❌ FreeText Error Code:',
            validationError: '❌ Validation errors found. Please check and correct',
            unknownCode: '❓ Unknown response code:',
            apiError: '=== API Error ===',
            error: 'Error:',
            errorMessage: 'Error Message:'
        }
    },

    // Indonesia
    id: {
        general: {
            pageTitle: 'Registrasi',
            pageSubtitle: 'Gunakan alamat email yang sama dengan yang akan kamu pakai di dalam game agar semua hadiah dan benefit bisa diterima.',
            submitting: 'Mengirim...',
            submitButton: 'Kirim',
            success: 'Registrasi Berhasil!',
            successDescription: 'Tambahkan Crystalfall ke Steam Wishlist kamu untuk mendapatkan hadiah pre-registrasi.<br><a href="#" target="_blank"><img src="images/stream-btn.png" class="img-fluid mt-1" alt="Stream"></a>',
            demoLink: 'Ini adalah link demo'
        },
        labels: {
            email: 'Email',
            emailPlaceholder: 'example@email.com',
            phone: 'Nomor Telepon',
            phonePlaceholder: '0812345678',
            fullname: 'Nama Lengkap',
            fullnamePlaceholder: 'Masukkan nama lengkap Anda',
            acceptTerms: 'Saya menerima <a href="https://secure2.playpark.com/register/Term-of-Service.aspx" target="_blank" class="policy-link">Syarat dan Ketentuan</a>, <a href="https://secure2.playpark.com/register/Term-of-PDPA.aspx" target="_blank" class="policy-link">Privacy Policy</a>',
            nickname: 'Nama Panggilan',
            nicknamePlaceholder: 'Masukkan nama panggilan',
            age: 'Umur',
            agePlaceholder: 'Masukkan umur Anda',
            address: 'Alamat',
            addressPlaceholder: 'Masukkan alamat Anda',
            gender: 'Jenis Kelamin',
            country: 'Negara'
        },
        options: {
            genderOptions: [
                { value: '', label: '-- Pilih Jenis Kelamin --' },
                { value: 'male', label: 'Laki-laki' },
                { value: 'female', label: 'Perempuan' },
                { value: 'other', label: 'Lainnya' }
            ],
            countryOptions: [
                { value: '', label: '-- Pilih Negara --' },
                { value: 'TH', label: 'Thailand' },
                { value: 'SG', label: 'Singapura' },
                { value: 'MY', label: 'Malaysia' },
                { value: 'ID', label: 'Indonesia' },
                { value: 'PH', label: 'Filipina' },
                { value: 'VN', label: 'Vietnam' },
                { value: 'MM', label: 'Myanmar' },
                { value: 'KH', label: 'Kamboja' },
                { value: 'LA', label: 'Laos' },
                { value: 'BN', label: 'Brunei' }
            ]
        },
        apiErrors: {
            code1: 'Event tidak ditemukan atau ditutup. Silakan coba lagi nanti',
            code3: 'Terjadi kesalahan. Silakan hubungi dukungan',
            code4: 'Data tidak lengkap. Silakan coba lagi',
            code9: 'Data tidak valid. Memeriksa detail...',
            unknown: 'Terjadi kesalahan yang tidak diketahui. Silakan coba lagi',
            connection: 'Kesalahan koneksi (mungkin masalah CORS)\nSilakan coba lagi'
        },
        freeTextErrors: {
            code0: 'Data valid',
            code1: 'Variabel tidak ditemukan',
            code2: 'Data email kosong',
            code3: 'Format email tidak valid',
            code4: 'Data telepon kosong',
            code5: 'Format telepon tidak valid',
            code6: 'Data nomor kosong',
            code7: 'Format nomor tidak valid',
            code8: 'Data teks kosong',
            code9: 'Format teks tidak valid',
            code10: 'Email sudah ada dalam sistem',
            code11: 'Telepon sudah ada dalam sistem',
            code12: 'Nomor sudah ada dalam sistem',
            code13: 'Teks sudah ada dalam sistem',
            default: 'Data tidak valid'
        },
        validation: {
            phoneRequired: 'Silakan masukkan nomor telepon',
            phoneInvalid: 'Silakan masukkan nomor ponsel yang benar.'
        },
        console: {
            sendingData: '=== Mengirim data ke API (GET) ===',
            eventId: 'Event ID:',
            fullUrl: 'Full URL:',
            parameters: 'Parameters:',
            responseStatus: '=== Status Respons ===',
            status: 'Status:',
            statusText: 'Status Text:',
            ok: 'OK:',
            responseData: '=== Data Respons API ===',
            fullResponse: 'Respons Lengkap:',
            code: 'Kode:',
            count: 'Jumlah:',
            result: 'Hasil:',
            separator: '===============================',
            success: '✅ Registrasi berhasil!',
            errorPrefix: '❌',
            warningPrefix: '⚠️',
            freeTextError: '❌ FreeText Kode Error:',
            validationError: '❌ Ditemukan kesalahan validasi. Silakan periksa dan perbaiki',
            unknownCode: '❓ Kode respons tidak diketahui:',
            apiError: '=== Kesalahan API ===',
            error: 'Error:',
            errorMessage: 'Pesan Error:'
        }
    },

    // Philippines (Tagalog)
    ph: {
        general: {
            pageTitle: 'Pagpaparehistro',
            pageSubtitle: 'Mangyaring punan ang iyong impormasyon upang makapagparehistro',
            submitting: 'Nagsusumite...',
            submitButton: 'Isumite',
            success: 'Matagumpay ang Pagpaparehistro!',
            successDescription: 'Add Crystalfall to your Steam Wishlist to qualify for pre-registration rewards.<br><a href="#" target="_blank"><img src="images/stream-btn.png" class="img-fluid mt-1" alt="Stream"></a>',
            demoLink: 'Ito ay isang demo link'
        },
        labels: {
            email: 'Email',
            emailPlaceholder: 'example@email.com',
            phone: 'Numero ng Telepono',
            phonePlaceholder: '0812345678',
            fullname: 'Buong Pangalan',
            fullnamePlaceholder: 'Ilagay ang iyong buong pangalan',
            acceptTerms: 'Tinatanggap ko ang mga <a href="#" class="policy-link">Tuntunin at Kundisyon</a>',
            nickname: 'Palayaw',
            nicknamePlaceholder: 'Ilagay ang iyong palayaw',
            age: 'Edad',
            agePlaceholder: 'Ilagay ang iyong edad',
            address: 'Address',
            addressPlaceholder: 'Ilagay ang iyong address',
            gender: 'Kasarian',
            country: 'Bansa'
        },
        options: {
            genderOptions: [
                { value: '', label: '-- Pumili ng Kasarian --' },
                { value: 'male', label: 'Lalaki' },
                { value: 'female', label: 'Babae' },
                { value: 'other', label: 'Iba pa' }
            ],
            countryOptions: [
                { value: '', label: '-- Pumili ng Bansa --' },
                { value: 'TH', label: 'Thailand' },
                { value: 'SG', label: 'Singapore' },
                { value: 'MY', label: 'Malaysia' },
                { value: 'ID', label: 'Indonesia' },
                { value: 'PH', label: 'Pilipinas' },
                { value: 'VN', label: 'Vietnam' },
                { value: 'MM', label: 'Myanmar' },
                { value: 'KH', label: 'Cambodia' },
                { value: 'LA', label: 'Laos' },
                { value: 'BN', label: 'Brunei' }
            ]
        },
        apiErrors: {
            code1: 'Hindi nahanap ang event o sarado na. Subukan muli mamaya',
            code3: 'May naganap na error. Mangyaring makipag-ugnayan sa suporta',
            code4: 'Hindi kumpleto ang data. Subukan muli',
            code9: 'Hindi valid ang data. Sinusuri ang mga detalye...',
            unknown: 'May naganap na hindi kilalang error. Subukan muli',
            connection: 'Error sa koneksyon (posibleng problema sa CORS)\nSubukan muli'
        },
        freeTextErrors: {
            code0: 'Valid ang data',
            code1: 'Hindi nahanap ang variable',
            code2: 'Walang laman ang email data',
            code3: 'Hindi valid ang format ng email',
            code4: 'Walang laman ang phone data',
            code5: 'Hindi valid ang format ng phone',
            code6: 'Walang laman ang number data',
            code7: 'Hindi valid ang format ng number',
            code8: 'Walang laman ang text data',
            code9: 'Hindi valid ang format ng text',
            code10: 'Ang email ay mayroon na sa system',
            code11: 'Ang phone ay mayroon na sa system',
            code12: 'Ang number ay mayroon na sa system',
            code13: 'Ang text ay mayroon na sa system',
            default: 'Hindi valid ang data'
        },
        validation: {
            phoneRequired: 'Mangyaring maglagay ng phone number',
            phoneInvalid: 'Ang phone number ay dapat 10 digits'
        },
        console: {
            sendingData: '=== Nagsusumite ng data sa API (GET) ===',
            eventId: 'Event ID:',
            fullUrl: 'Full URL:',
            parameters: 'Parameters:',
            responseStatus: '=== Response Status ===',
            status: 'Status:',
            statusText: 'Status Text:',
            ok: 'OK:',
            responseData: '=== API Response Data ===',
            fullResponse: 'Buong Tugon:',
            code: 'Code:',
            count: 'Bilang:',
            result: 'Resulta:',
            separator: '===============================',
            success: '✅ Matagumpay ang pagpaparehistro!',
            errorPrefix: '❌',
            warningPrefix: '⚠️',
            freeTextError: '❌ FreeText Error Code:',
            validationError: '❌ May mga validation error. Mangyaring suriin at itama',
            unknownCode: '❓ Hindi kilalang response code:',
            apiError: '=== API Error ===',
            error: 'Error:',
            errorMessage: 'Error Message:'
        }
    },

    // Vietnam
    vn: {
        general: {
            pageTitle: 'Đăng ký',
            pageSubtitle: 'Vui lòng điền thông tin của bạn để đăng ký',
            submitting: 'Đang gửi...',
            submitButton: 'Gửi',
            success: 'Đăng ký thành công!',
            successDescription: 'Add Crystalfall to your Steam Wishlist to qualify for pre-registration rewards.<br><a href="#" target="_blank"><img src="images/stream-btn.png" class="img-fluid mt-1" alt="Stream"></a>',
            demoLink: 'Đây là liên kết demo'
        },
        labels: {
            email: 'Email',
            emailPlaceholder: 'example@email.com',
            phone: 'Số điện thoại',
            phonePlaceholder: '0812345678',
            fullname: 'Họ và tên',
            fullnamePlaceholder: 'Nhập họ và tên của bạn',
            acceptTerms: 'Tôi chấp nhận <a href="#" class="policy-link">Điều khoản và Điều kiện</a>',
            nickname: 'Biệt danh',
            nicknamePlaceholder: 'Nhập biệt danh của bạn',
            age: 'Tuổi',
            agePlaceholder: 'Nhập tuổi của bạn',
            address: 'Địa chỉ',
            addressPlaceholder: 'Nhập địa chỉ của bạn',
            gender: 'Giới tính',
            country: 'Quốc gia'
        },
        options: {
            genderOptions: [
                { value: '', label: '-- Chọn Giới tính --' },
                { value: 'male', label: 'Nam' },
                { value: 'female', label: 'Nữ' },
                { value: 'other', label: 'Khác' }
            ],
            countryOptions: [
                { value: '', label: '-- Chọn Quốc gia --' },
                { value: 'TH', label: 'Thái Lan' },
                { value: 'SG', label: 'Singapore' },
                { value: 'MY', label: 'Malaysia' },
                { value: 'ID', label: 'Indonesia' },
                { value: 'PH', label: 'Philippines' },
                { value: 'VN', label: 'Việt Nam' },
                { value: 'MM', label: 'Myanmar' },
                { value: 'KH', label: 'Campuchia' },
                { value: 'LA', label: 'Lào' },
                { value: 'BN', label: 'Brunei' }
            ]
        },
        apiErrors: {
            code1: 'Không tìm thấy sự kiện hoặc đã đóng. Vui lòng thử lại sau',
            code3: 'Đã xảy ra lỗi. Vui lòng liên hệ hỗ trợ',
            code4: 'Dữ liệu không đầy đủ. Vui lòng thử lại',
            code9: 'Dữ liệu không hợp lệ. Đang kiểm tra chi tiết...',
            unknown: 'Đã xảy ra lỗi không xác định. Vui lòng thử lại',
            connection: 'Lỗi kết nối (có thể là vấn đề CORS)\nVui lòng thử lại'
        },
        freeTextErrors: {
            code0: 'Dữ liệu hợp lệ',
            code1: 'Không tìm thấy biến',
            code2: 'Dữ liệu email trống',
            code3: 'Định dạng email không hợp lệ',
            code4: 'Dữ liệu điện thoại trống',
            code5: 'Định dạng điện thoại không hợp lệ',
            code6: 'Dữ liệu số trống',
            code7: 'Định dạng số không hợp lệ',
            code8: 'Dữ liệu văn bản trống',
            code9: 'Định dạng văn bản không hợp lệ',
            code10: 'Email đã tồn tại trong hệ thống',
            code11: 'Điện thoại đã tồn tại trong hệ thống',
            code12: 'Số đã tồn tại trong hệ thống',
            code13: 'Văn bản đã tồn tại trong hệ thống',
            default: 'Dữ liệu không hợp lệ'
        },
        validation: {
            phoneRequired: 'Vui lòng nhập số điện thoại',
            phoneInvalid: 'Số điện thoại phải có 10 chữ số'
        },
        console: {
            sendingData: '=== Đang gửi dữ liệu đến API (GET) ===',
            eventId: 'Event ID:',
            fullUrl: 'Full URL:',
            parameters: 'Parameters:',
            responseStatus: '=== Trạng thái phản hồi ===',
            status: 'Trạng thái:',
            statusText: 'Văn bản trạng thái:',
            ok: 'OK:',
            responseData: '=== Dữ liệu phản hồi API ===',
            fullResponse: 'Phản hồi đầy đủ:',
            code: 'Mã:',
            count: 'Số lượng:',
            result: 'Kết quả:',
            separator: '===============================',
            success: '✅ Đăng ký thành công!',
            errorPrefix: '❌',
            warningPrefix: '⚠️',
            freeTextError: '❌ FreeText Mã lỗi:',
            validationError: '❌ Tìm thấy lỗi xác thực. Vui lòng kiểm tra và sửa',
            unknownCode: '❓ Mã phản hồi không xác định:',
            apiError: '=== Lỗi API ===',
            error: 'Lỗi:',
            errorMessage: 'Thông báo lỗi:'
        }
    },

    // Chinese (Simplified)
    zh: {
        general: {
            pageTitle: '注册',
            pageSubtitle: '请填写您的信息以进行注册',
            submitting: '提交中...',
            submitButton: '提交',
            success: '注册成功！',
            successDescription: 'Add Crystalfall to your Steam Wishlist to qualify for pre-registration rewards.<br><a href="#" target="_blank"><img src="images/stream-btn.png" class="img-fluid mt-1" alt="Stream"></a>',
            demoLink: '这是演示链接'
        },
        labels: {
            email: '电子邮件',
            emailPlaceholder: 'example@email.com',
            phone: '电话号码',
            phonePlaceholder: '0812345678',
            fullname: '全名',
            fullnamePlaceholder: '输入您的全名',
            acceptTerms: '我接受<a href="#" class="policy-link">条款和条件</a>',
            nickname: '昵称',
            nicknamePlaceholder: '输入您的昵称',
            age: '年龄',
            agePlaceholder: '输入您的年龄',
            address: '地址',
            addressPlaceholder: '输入您的地址',
            gender: '性别',
            country: '国家'
        },
        options: {
            genderOptions: [
                { value: '', label: '-- 选择性别 --' },
                { value: 'male', label: '男' },
                { value: 'female', label: '女' },
                { value: 'other', label: '其他' }
            ],
            countryOptions: [
                { value: '', label: '-- 选择国家 --' },
                { value: 'TH', label: '泰国' },
                { value: 'SG', label: '新加坡' },
                { value: 'MY', label: '马来西亚' },
                { value: 'ID', label: '印度尼西亚' },
                { value: 'PH', label: '菲律宾' },
                { value: 'VN', label: '越南' },
                { value: 'MM', label: '缅甸' },
                { value: 'KH', label: '柬埔寨' },
                { value: 'LA', label: '老挝' },
                { value: 'BN', label: '文莱' }
            ]
        },
        apiErrors: {
            code1: '未找到活动或已关闭。请稍后再试',
            code3: '发生错误。请联系支持',
            code4: '数据不完整。请重试',
            code9: '数据无效。正在检查详细信息...',
            unknown: '发生未知错误。请重试',
            connection: '连接错误（可能是CORS问题）\n请重试'
        },
        freeTextErrors: {
            code0: '数据有效',
            code1: '未找到变量',
            code2: '电子邮件数据为空',
            code3: '电子邮件格式无效',
            code4: '电话数据为空',
            code5: '电话格式无效',
            code6: '数字数据为空',
            code7: '数字格式无效',
            code8: '文本数据为空',
            code9: '文本格式无效',
            code10: '电子邮件已存在于系统中',
            code11: '电话已存在于系统中',
            code12: '数字已存在于系统中',
            code13: '文本已存在于系统中',
            default: '数据无效'
        },
        validation: {
            phoneRequired: '请输入电话号码',
            phoneInvalid: '电话号码必须是10位数字'
        },
        console: {
            sendingData: '=== 正在向API发送数据（GET）===',
            eventId: '活动ID:',
            fullUrl: '完整URL:',
            parameters: '参数:',
            responseStatus: '=== 响应状态 ===',
            status: '状态:',
            statusText: '状态文本:',
            ok: '确定:',
            responseData: '=== API响应数据 ===',
            fullResponse: '完整响应:',
            code: '代码:',
            count: '数量:',
            result: '结果:',
            separator: '===============================',
            success: '✅ 注册成功！',
            errorPrefix: '❌',
            warningPrefix: '⚠️',
            freeTextError: '❌ FreeText 错误代码:',
            validationError: '❌ 发现验证错误。请检查并更正',
            unknownCode: '❓ 未知响应代码:',
            apiError: '=== API错误 ===',
            error: '错误:',
            errorMessage: '错误消息:'
        }
    }
};

// ฟังก์ชันเลือกภาษาตาม CONFIG
function getMessages() {
    const lang = CONFIG.language || 'th';
    return ALL_MESSAGES[lang] || ALL_MESSAGES.th;
}

// Export MESSAGES ตามภาษาที่เลือก
const MESSAGES = getMessages();

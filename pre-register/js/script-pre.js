// ======================================
// ฟังก์ชันสร้างฟอร์มอัตโนมัติจาก CONFIG
// update 15/01/2026
// ======================================

// ฟังก์ชัน escape HTML เพื่อป้องกัน XSS
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// เก็บ intl-tel-input instances
const intlTelInputInstances = {};

function generateForm() {
    const card = document.getElementById('registrationCard');
    if (!card) return;

    const prefix = CONFIG.prefix || '';

    let formHTML = `
        <h1>${escapeHtml(MESSAGES.general.pageTitle || 'Registration')}</h1>
        <p class="${prefix}subtitle">${escapeHtml(MESSAGES.general.pageSubtitle || 'Please fill in your information to register')}</p>
        
        <form id="${prefix}registrationForm">
    `;

    // วนลูปสร้าง fields จาก CONFIG
    Object.keys(CONFIG.fields).forEach(fieldKey => {
        const field = CONFIG.fields[fieldKey];

        // สร้าง hidden fields (ไม่แสดง UI แต่มี input element)
        if (field.type === 'hidden') {
            const hiddenValue = escapeHtml(field.value !== undefined ? String(field.value) : '');
            formHTML += `
                <input 
                    type="hidden" 
                    id="${prefix}${fieldKey}" 
                    name="${fieldKey}" 
                    value="${hiddenValue}"
                >
            `;
            return;
        }

        // ดึง label และ placeholder จาก MESSAGES
        const label = MESSAGES.labels[field.labelKey] || field.labelKey || 'Field';
        const placeholder = field.placeholderKey ? escapeHtml(MESSAGES.labels[field.placeholderKey] || '') : '';

        // สร้าง form-group
        if (field.type === 'checkbox') {
            // Checkbox field
            const isChecked = field.defaultValue === true;
            formHTML += `
                <div class="${prefix}form-group ${prefix}checkbox-group">
                    <label class="${prefix}checkbox-label">
                        <input 
                            type="checkbox" 
                            id="${prefix}${field.htmlId}" 
                            name="${field.htmlId}"
                            ${field.required ? 'required' : ''}
                            ${isChecked ? 'checked' : ''}
                        >
                        <span class="${prefix}checkmark"></span>
                        <span class="${prefix}checkbox-text">
                            ${label}
                        </span>
                    </label>
                    <span class="${prefix}error-message" id="${prefix}${field.errorId}"></span>
                </div>
            `;
        } else if (field.type === 'select') {
            // Select/Dropdown field
            const defaultValue = escapeHtml(field.defaultValue !== undefined ? String(field.defaultValue) : '');

            // ดึง options จาก MESSAGES.options หรือใช้ options จาก config
            let options = [];
            if (field.optionsKey && MESSAGES.options && MESSAGES.options[field.optionsKey]) {
                options = MESSAGES.options[field.optionsKey];
            } else if (field.options) {
                options = field.options;
            }

            let optionsHTML = '';
            options.forEach(option => {
                const optionValue = escapeHtml(option.value || '');
                const optionLabel = escapeHtml(option.label || option.value || '');
                const selected = optionValue === defaultValue ? 'selected' : '';
                optionsHTML += `<option value="${optionValue}" ${selected}>${optionLabel}</option>`;
            });

            formHTML += `
                <div class="${prefix}form-group">
                    <label for="${prefix}${field.htmlId}">
                        ${label}
                        ${field.required ? `<span class="${prefix}required">*</span>` : ''}
                    </label>
                    <select 
                        id="${prefix}${field.htmlId}" 
                        name="${field.htmlId}"
                        ${field.required ? 'required' : ''}
                    >
                        ${optionsHTML}
                    </select>
                    <span class="${prefix}error-message" id="${prefix}${field.errorId}"></span>
                </div>
            `;
        } else {
            // Text input fields (email, text, tel, number, etc.)
            const defaultValue = escapeHtml(field.defaultValue !== undefined ? String(field.defaultValue) : '');
            // สำหรับ tel ถ้าใช้ International Phone Input ไม่ต้องจำกัด maxlength
            const maxLength = (field.type === 'tel' && !field.useInternationalPhone) ? 'maxlength="10"' : '';

            formHTML += `
                <div class="${prefix}form-group">
                    <label for="${prefix}${field.htmlId}">
                        ${label}
                        ${field.required ? `<span class="${prefix}required">*</span>` : ''}
                    </label>
                    <input 
                        type="${field.type}" 
                        id="${prefix}${field.htmlId}" 
                        name="${field.htmlId}" 
                        placeholder="${placeholder}"
                        value="${defaultValue}"
                        ${maxLength}
                        ${field.required ? 'required' : ''}
                        ${field.type === 'email' ? 'autocapitalize="none" spellcheck="false"' : ''}
                    >
                    <span class="${prefix}error-message" id="${prefix}${field.errorId}"></span>
                </div>
            `;
        }
    });

    // เพิ่มปุ่ม submit
    formHTML += `
            <button type="submit" id="${prefix}submitBtn" class="${prefix}submit-btn">${escapeHtml(MESSAGES.general.submitButton)}</button>
        </form>

        <div id="${prefix}successMessage" class="${prefix}success-message" style="display: none;">
            <div class="${prefix}success-icon">✓</div>
            <h2>${escapeHtml(MESSAGES.general.success)}</h2>
            <p>${MESSAGES.general.successDescription}</p>
        </div>
    `;

    card.innerHTML = formHTML;
}

// ======================================
// ฟังก์ชันดึงข้อมูลจาก IP Detection API
// ======================================

async function fetchIPLocation() {
    if (!CONFIG.ipDetectionAPI || !CONFIG.ipDetectionAPI.enabled) {
        return null;
    }

    try {
        console.log('🌍 กำลังตรวจจับประเทศจาก IP...');
        const response = await fetch(CONFIG.ipDetectionAPI.url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('✅ ตรวจจับประเทศสำเร็จ:', data);
        return data; // { countryCode: "SG", countryName: "Singapore" }
    } catch (error) {
        console.error('❌ ไม่สามารถตรวจจับประเทศได้:', error);
        return null;
    }
}

// ======================================
// ฟังก์ชัน Auto-fill ค่าจาก IP Detection
// ======================================

function autoFillFromIPData(ipData, formInputs) {
    if (!ipData) return;

    Object.keys(CONFIG.fields).forEach(fieldKey => {
        const field = CONFIG.fields[fieldKey];

        if (!field.autoFillFrom) return;

        // เซ็ตค่าตาม autoFillFrom
        let value = '';
        if (field.autoFillFrom === 'countryCode') {
            // ดึงค่ามา (ถ้า detect ไม่ผ่าน ให้ใช้ empty string หรือ fallbackDefault ถ้ามี)
            value = (ipData && ipData.countryCode) ? ipData.countryCode : (field.fallbackDefault || '');

            // ถ้ามี allowedCountries ให้เช็คว่าประเทศที่ detect มาอยู่ในลิสต์หรือไม่
            if (field.allowedCountries && Array.isArray(field.allowedCountries)) {
                const upperValue = value.toUpperCase();
                const upperAllowed = field.allowedCountries.map(c => c.toUpperCase());

                if (!upperAllowed.includes(upperValue)) {
                    // ถ้าไม่อยู่ในลิสต์ ใช้ fallbackDefault แทน
                    value = field.fallbackDefault || '';
                    console.log(`⚠️ Country ${upperValue} ไม่อยู่ในรายการที่อนุญาต, ใช้ fallback: ${value}`);
                } else {
                    console.log(`✅ Country ${upperValue} อยู่ในรายการที่อนุญาต`);
                }
            }
        } else if (field.autoFillFrom === 'countryName' && ipData && ipData.countryName) {
            value = ipData.countryName;
        }

        if (value !== undefined && value !== null && value !== '') {
            // ถ้าเป็น hidden field
            if (field.type === 'hidden') {
                // อัปเดตค่าใน CONFIG และ input element
                CONFIG.fields[fieldKey].value = value;
                const input = formInputs[fieldKey];
                if (input) {
                    input.value = value;
                }
                console.log(`📍 Auto-fill (Hidden) ${fieldKey}: ${value}`);
            } else {
                // ถ้าเป็น visible field
                const input = formInputs[fieldKey];
                if (!input) return;

                // ถ้าเป็น select field ให้เช็คว่า value มีใน options หรือไม่
                if (field.type === 'select' && input.tagName === 'SELECT') {
                    const optionExists = Array.from(input.options).some(opt => opt.value === value);
                    if (!optionExists) {
                        value = field.fallbackDefault || '';
                        console.log(`⚠️ Option ${value} ไม่พบใน dropdown, ใช้ fallback: ${value}`);
                    }
                }

                // ถ้าเป็น tel field และใช้ international phone ให้เซ็ต country ใน ITI ด้วย
                if (field.type === 'tel' && intlTelInputInstances[fieldKey]) {
                    intlTelInputInstances[fieldKey].setCountry(value);
                    console.log(`📞 Set ITI Country ${fieldKey}: ${value}`);
                } else {
                    input.value = value;
                }

                console.log(`📍 Auto-fill ${fieldKey}: ${value}`);

                // Trigger change event
                const event = new Event('change', { bubbles: true });
                input.dispatchEvent(event);
            }
        }
    });
}

// ======================================
// ฟังก์ชันหา country field key สำหรับ International Phone
// ======================================

function findCountryFieldKey(telFieldKey) {
    const fieldKeys = Object.keys(CONFIG.fields);
    const telFieldIndex = fieldKeys.indexOf(telFieldKey);

    if (telFieldIndex === -1) return null;

    // 1. เช็คว่ามี field ที่ _linkedTo ตรงกับ telFieldKey หรือไม่
    for (const [key, field] of Object.entries(CONFIG.fields)) {
        if (field._linkedTo === telFieldKey) {
            return key;
        }
    }

    // 2. เช็ค field ถัดไป - ถ้าเป็น hidden field และมี value เป็น '' (empty)
    // แสดงว่าน่าจะเป็น auto-generated field สำหรับ country code
    const nextFieldKey = fieldKeys[telFieldIndex + 1];
    if (nextFieldKey) {
        const nextField = CONFIG.fields[nextFieldKey];
        if (nextField.type === 'hidden' && (nextField.value === '' || nextField.value === undefined)) {
            return nextFieldKey;
        }
    }

    // 3. ลอง pattern แบบเก่า
    const oldPatternKey = `${telFieldKey}_country`;
    if (CONFIG.fields[oldPatternKey]) {
        return oldPatternKey;
    }

    return null;
}

// ======================================
// ฟังก์ชัน Initialize International Telephone Input
// ======================================

function initializeInternationalPhone(formInputs) {
    Object.keys(CONFIG.fields).forEach(fieldKey => {
        const field = CONFIG.fields[fieldKey];

        // ถ้าเป็น tel field และเปิดใช้งาน useInternationalPhone
        if (field.type === 'tel' && field.useInternationalPhone) {
            const input = formInputs[fieldKey];

            if (!input || !window.intlTelInput) {
                console.warn(`⚠️ ไม่สามารถ initialize International Phone สำหรับ ${fieldKey}`);
                return;
            }

            // ดึง options จาก config
            const options = field.intlPhoneOptions || {};
            const defaultOptions = {
                initialCountry: options.initialCountry || 'th',
                // ใช้ preferredCountries เพื่อแสดงประเทศที่กำหนดไว้ข้างบน แต่ยังเลือกประเทศอื่นได้ทั้งหมด
                preferredCountries: options.preferredCountries || ['th', 'sg', 'my', 'id', 'ph', 'vn'],
                separateDialCode: options.separateDialCode !== undefined ? options.separateDialCode : false,
                autoPlaceholder: 'aggressive',
                nationalMode: false,  // แสดงรหัสประเทศใน input
                formatOnDisplay: true,
                utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@24.6.0/build/js/utils.js"
            };

            // Initialize intl-tel-input
            const iti = window.intlTelInput(input, defaultOptions);

            // เก็บ instance ไว้
            intlTelInputInstances[fieldKey] = iti;

            // อัปเดต hidden field ของ country code
            const updateCountryCode = () => {
                const countryData = iti.getSelectedCountryData();
                const countryFieldKey = findCountryFieldKey(fieldKey);

                if (countryFieldKey && CONFIG.fields[countryFieldKey]) {
                    const countryCode = countryData.iso2.toUpperCase();
                    CONFIG.fields[countryFieldKey].value = countryCode;

                    // อัปเดต hidden input element ด้วย
                    const countryInput = formInputs[countryFieldKey];
                    if (countryInput) {
                        countryInput.value = countryCode;
                    }

                    console.log(`📞 อัปเดต ${countryFieldKey}: ${countryCode}`);
                }
            };

            // อัปเดตทันทีเมื่อ initialize
            updateCountryCode();

            // อัปเดตเมื่อเปลี่ยนประเทศ
            input.addEventListener('countrychange', updateCountryCode);

            console.log(`✅ Initialize International Phone สำหรับ ${fieldKey}`);
        }
    });
}

// ======================================
// เริ่มต้นระบบ
// ======================================

document.addEventListener('DOMContentLoaded', async function () {
    // อัปเดต HTML lang attribute ตามภาษาที่เลือก
    document.documentElement.lang = CONFIG.language || 'th';

    // สร้างฟอร์มอัตโนมัติ
    generateForm();

    // ดึง elements หลังจากสร้างฟอร์มแล้ว
    const prefix = CONFIG.prefix || '';
    const form = document.getElementById(`${prefix}registrationForm`);

    // สร้าง mapping ของ inputs และ errors จาก CONFIG
    const formInputs = {};
    const formErrors = {};

    Object.keys(CONFIG.fields).forEach(fieldKey => {
        const field = CONFIG.fields[fieldKey];

        if (field.type === 'hidden') {
            // Hidden fields - ใช้ fieldKey เป็น id
            formInputs[fieldKey] = document.getElementById(`${prefix}${fieldKey}`);
        } else {
            // Visible fields - ใช้ htmlId
            formInputs[fieldKey] = document.getElementById(`${prefix}${field.htmlId}`);
            formErrors[fieldKey] = document.getElementById(`${prefix}${field.errorId}`);
        }
    });

    // ⭐ Initialize International Telephone Input
    initializeInternationalPhone(formInputs);

    // ⭐ ดึงข้อมูลจาก IP Detection API และ auto-fill
    const ipData = await fetchIPLocation();
    if (ipData) {
        autoFillFromIPData(ipData, formInputs);
    }

    // ตรวจสอบอีเมล
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // ตรวจสอบเบอร์มือถือ
    function validatePhone(phone, fieldKey) {
        // ถ้าใช้ International Phone Input ให้ใช้ intl-tel-input validation
        if (intlTelInputInstances[fieldKey]) {
            const iti = intlTelInputInstances[fieldKey];
            return iti.isValidNumber();
        }

        // ถ้าไม่ใช้ International Phone Input ให้ validate แบบเดิม
        const re = /^[0-9]{10}$/;
        return re.test(phone);
    }

    // แสดงข้อความ error
    function showError(input, errorElement, message) {
        input.classList.add('error');
        errorElement.textContent = message;
    }

    // ลบข้อความ error
    function clearError(input, errorElement) {
        input.classList.remove('error');
        errorElement.textContent = '';
    }

    // ฟังก์ชันแปลง error code เป็นข้อความ
    function getErrorMessage(code) {
        const errorKey = `code${code}`;
        return MESSAGES.freeTextErrors[errorKey] || MESSAGES.freeTextErrors.default;
    }

    // ตั้งค่า event listeners แบบ dynamic
    Object.keys(CONFIG.fields).forEach(fieldKey => {
        const field = CONFIG.fields[fieldKey];
        const input = formInputs[fieldKey];
        const errorElement = formErrors[fieldKey];

        if (!input || field.type === 'hidden') return;

        if (field.type === 'tel') {
            // Tel input
            // ถ้าไม่ใช้ International Phone Input ให้อนุญาตเฉพาะตัวเลข และลบ space
            if (!field.useInternationalPhone) {
                input.addEventListener('input', function () {
                    // ลบ space และอักขระที่ไม่ใช่ตัวเลขทั้งหมด
                    this.value = this.value.replace(/\s/g, '').replace(/[^0-9]/g, '');

                    if (this.value !== '' && validatePhone(this.value, fieldKey)) {
                        clearError(this, errorElement);
                    }
                });
            }

            input.addEventListener('blur', function () {
                // ลบ space ออกก่อนตรวจสอบ
                this.value = this.value.replace(/\s/g, '');

                if (this.value === '') {
                    if (field.required) {
                        showError(this, errorElement, MESSAGES.validation.phoneRequired);
                    } else {
                        clearError(this, errorElement);
                    }
                } else if (!validatePhone(this.value, fieldKey)) {
                    showError(this, errorElement, MESSAGES.validation.phoneInvalid);
                } else {
                    clearError(this, errorElement);
                }
            });

            // ถ้าใช้ International Phone Input ให้ clear error เมื่อ input มีการเปลี่ยนแปลง
            if (field.useInternationalPhone) {
                input.addEventListener('input', function () {
                    // อนุญาตเฉพาะตัวเลขเท่านั้น
                    this.value = this.value.replace(/[^0-9]/g, '');

                    if (this.value !== '' && validatePhone(this.value, fieldKey)) {
                        clearError(this, errorElement);
                    }
                });
            }
        } else if (field.type === 'email') {
            // Email - validation และลบ error เมื่อกรอกถูกต้อง
            input.addEventListener('blur', function () {
                if (this.value === '') {
                    if (field.required) {
                        showError(this, errorElement, MESSAGES.validation.emailRequired || 'Please enter email');
                    } else {
                        clearError(this, errorElement);
                    }
                } else if (!validateEmail(this.value)) {
                    showError(this, errorElement, MESSAGES.freeTextErrors.code3 || 'Invalid email format');
                } else {
                    clearError(this, errorElement);
                }
            });

            input.addEventListener('input', function () {
                if (this.value !== '' && validateEmail(this.value)) {
                    clearError(this, errorElement);
                }
            });
        } else if (field.type === 'checkbox') {
            // Checkbox - ลบ error เมื่อ checked
            input.addEventListener('change', function () {
                if (this.checked) {
                    clearError(this, errorElement);
                }
            });
        }
    });

    // Stop propagation for policy links to prevent checkbox toggling
    document.querySelectorAll('.policy-link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.stopPropagation();
        });
    });



    // จัดการการ submit ฟอร์ม
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // ปิดการใช้งานปุ่ม submit ขณะส่งข้อมูล
        const submitBtn = form.querySelector(`.${prefix}submit-btn`);
        submitBtn.disabled = true;
        submitBtn.textContent = MESSAGES.general.submitting;

        // เตรียมข้อมูลที่จะส่งไป API
        const apiUrl = CONFIG.apiUrl;

        // สร้าง parameters แบบ dynamic จาก CONFIG
        const paramsData = { EventID: CONFIG.eventId };

        Object.keys(CONFIG.fields).forEach((fieldKey, index) => {
            const field = CONFIG.fields[fieldKey];
            const freeTextKey = `FreeText${index + 1}`;
            let value = '';

            if (field.type === 'hidden') {
                // Hidden field - ใช้ค่าจาก input element (อาจถูกอัปเดตโดย IP Detection)
                const input = formInputs[fieldKey];
                value = input ? input.value : (field.value || '');
            } else if (field.type === 'checkbox') {
                // Checkbox - ใช้ trueValue หรือ falseValue
                const input = formInputs[fieldKey];
                value = input && input.checked ? field.trueValue : field.falseValue;
            } else if (field.type === 'tel' && field.useInternationalPhone && intlTelInputInstances[fieldKey]) {
                // Tel field with International Phone - ใช้ international format
                const iti = intlTelInputInstances[fieldKey];
                const internationalNumber = iti.getNumber();  // รูปแบบ: +66812345678
                value = internationalNumber || '';
                console.log(`📞 ${fieldKey} (International): ${internationalNumber}`);
            } else {
                // Input fields อื่นๆ - ใช้ค่าจาก input
                const input = formInputs[fieldKey];
                value = input ? input.value : '';

                // หากเป็น email ให้แปลงเป็นตัวพิมพ์เล็กก่อนส่งไป API
                if (field.type === 'email' && value && value !== '-') {
                    value = value.toLowerCase();
                    console.log(`📧 ${fieldKey} (Normalized to lowercase): ${value}`);
                }
            }

            // ถ้า field ไม่ใช่ required และค่าว่าง ให้ส่ง '-' แทน
            if (!field.required && (value === '' || value === null || value === undefined)) {
                value = '-';
            }

            paramsData[freeTextKey] = value;
        });

        const params = new URLSearchParams(paramsData);
        const fullUrl = `${apiUrl}?${params.toString()}`;

        console.log(MESSAGES.console.sendingData);
        console.log(MESSAGES.console.eventId, CONFIG.eventId);
        console.log(MESSAGES.console.fullUrl, fullUrl);
        console.log(MESSAGES.console.parameters, paramsData);

        // ส่งข้อมูลด้วย fetch GET
        fetch(fullUrl, {
            method: 'GET'
        })
            .then(response => {
                console.log(MESSAGES.console.responseStatus);
                console.log(MESSAGES.console.status, response.status);
                console.log(MESSAGES.console.statusText, response.statusText);
                console.log(MESSAGES.console.ok, response.ok);

                return response.json();
            })
            .then(data => {
                console.log(MESSAGES.console.responseData);
                console.log(MESSAGES.console.fullResponse, data);
                console.log(MESSAGES.console.code, data.code);
                console.log(MESSAGES.console.count, data.count);
                console.log(MESSAGES.console.result, data.result);
                console.log(MESSAGES.console.separator);

                // เปิดใช้งานปุ่ม submit อีกครั้ง
                submitBtn.disabled = false;
                submitBtn.textContent = MESSAGES.general.submitButton;

                // ตรวจสอบ code ที่ได้รับจาก API
                if (data.code === 0) {
                    // ลงทะเบียนสำเร็จ
                    console.log(MESSAGES.console.success);
                    form.style.display = 'none';
                    const successMessage = document.getElementById(`${prefix}successMessage`);

                    // Hide title and subtitle
                    const title = document.querySelector('#registrationCard h1');
                    const subtitle = document.querySelector(`.${prefix}subtitle`);
                    if (title) title.style.display = 'none';
                    if (subtitle) subtitle.style.display = 'none';

                    successMessage.style.display = 'block';

                    // Create Success Iframe (req: 10x10, close in 5s)
                    const iframe = document.createElement('iframe');

                    // Append UTM parameters from current URL
                    const currentParams = new URLSearchParams(window.location.search);
                    const utmParams = new URLSearchParams();
                    currentParams.forEach((value, key) => {
                        if (key.toLowerCase().startsWith('utm_')) {
                            utmParams.set(key, value);
                        }
                    });

                    let iframeSrc = 'success.html?=preg';
                    const utmString = utmParams.toString();
                    if (utmString) {
                        iframeSrc += '&' + utmString;
                    }

                    iframe.src = iframeSrc;
                    iframe.style.width = '10px';
                    iframe.style.height = '10px';
                    iframe.style.border = 'none';
                    iframe.style.background = '#1d1c24';


                    successMessage.appendChild(iframe);

                    // Auto close iframe after 5s
                    setTimeout(() => {
                        iframe.remove();
                    }, 30000);

                    // Reset ฟอร์มหลัง 3 วินาที
                    setTimeout(() => {
                        form.style.display = 'block';
                        if (title) title.style.display = 'block';
                        if (subtitle) subtitle.style.display = 'block';
                        successMessage.style.display = 'none';
                        form.reset();
                    }, 30000);

                } else if (data.code === 1) {
                    // ไม่พบกิจกรรมหรือกิจกรรมปิดอยู่
                    console.log(MESSAGES.console.errorPrefix, MESSAGES.apiErrors.code1);
                    alert(MESSAGES.apiErrors.code1);

                } else if (data.code === 3) {
                    // เกิดข้อผิดพลาดอื่นๆ
                    console.log(MESSAGES.console.errorPrefix, MESSAGES.apiErrors.code3);
                    alert(MESSAGES.apiErrors.code3);

                } else if (data.code === 4) {
                    // ไม่พบ param ที่ส่งไป
                    console.log(MESSAGES.console.errorPrefix, MESSAGES.apiErrors.code4);
                    alert(MESSAGES.apiErrors.code4);

                } else if (data.code === 9) {
                    // ข้อมูลที่ส่งมายังไม่ถูกต้อง ต้องเช็ค FreeText
                    console.log(MESSAGES.console.warningPrefix, MESSAGES.apiErrors.code9);

                    if (data.result && data.result.length > 0) {
                        const result = data.result[0];
                        let hasError = false;

                        // ตรวจสอบทุก FreeText แบบ dynamic
                        Object.keys(CONFIG.fields).forEach((fieldKey, index) => {
                            const field = CONFIG.fields[fieldKey];
                            const freeTextKey = `FreeText${index + 1}`;

                            if (result[freeTextKey] !== undefined) {
                                const errorCode = parseInt(result[freeTextKey]);

                                if (errorCode !== 0) {
                                    hasError = true;
                                    const errorMessage = getErrorMessage(errorCode);
                                    console.log(`${MESSAGES.console.freeTextError} ${freeTextKey} = ${errorCode}`);

                                    if (field.type === 'hidden') {
                                        // Hidden field - แสดง alert
                                        alert(`${freeTextKey}: ${errorMessage}`);
                                    } else if (field.type === 'checkbox') {
                                        // Checkbox - แสดงใน error element
                                        const errorElement = formErrors[fieldKey];
                                        if (errorElement) {
                                            errorElement.textContent = errorMessage;
                                        }
                                    } else {
                                        // Input fields - แสดงใน error element
                                        const input = formInputs[fieldKey];
                                        const errorElement = formErrors[fieldKey];
                                        if (input && errorElement) {
                                            showError(input, errorElement, errorMessage);
                                        }
                                    }
                                }
                            }
                        });

                        if (hasError) {
                            console.log(MESSAGES.console.validationError);
                        }
                    }
                } else {
                    // กรณีอื่นๆ ที่ไม่ได้กำหนดไว้
                    console.log(MESSAGES.console.unknownCode, data.code);
                    alert(MESSAGES.apiErrors.unknown);
                }
            })
            .catch(error => {
                console.error(MESSAGES.console.apiError);
                console.error(MESSAGES.console.error, error);
                console.error(MESSAGES.console.errorMessage, error.message);
                console.error(MESSAGES.console.separator);

                // แสดงข้อความ error
                alert(MESSAGES.apiErrors.connection);

                // เปิดใช้งานปุ่ม submit อีกครั้ง
                submitBtn.disabled = false;
                submitBtn.textContent = MESSAGES.general.submitButton;
            });
    });

    // ======================================
    // Modal Reset Logic
    // ======================================
    const preRegModal = document.getElementById('preRegModal');
    if (preRegModal) {
        preRegModal.addEventListener('hidden.bs.modal', function () {
            // 1. Reset Form (Clears user input)
            form.reset();

            // 2. Re-apply Auto-fill data (Restores IP-detected values)
            if (typeof ipData !== 'undefined' && ipData) {
                autoFillFromIPData(ipData, formInputs);
            }

            // 3. Clear Error Messages & Classes
            Object.keys(CONFIG.fields).forEach(fieldKey => {
                const input = formInputs[fieldKey];
                const errorElement = formErrors[fieldKey];

                if (input) input.classList.remove('error');
                if (errorElement) errorElement.textContent = '';
            });

            // 4. Reset UI States (Show Form, Hide Success)
            form.style.display = 'block';
            const title = document.querySelector('#registrationCard h1');
            const subtitle = document.querySelector(`.${prefix}subtitle`);
            if (title) title.style.display = 'block';
            if (subtitle) subtitle.style.display = 'block';

            const successMessage = document.getElementById(`${prefix}successMessage`);
            if (successMessage) {
                successMessage.style.display = 'none';
                const iframe = successMessage.querySelector('iframe');
                if (iframe) iframe.remove();
            }

            // 5. Reset Submit Button
            const submitBtn = form.querySelector(`.${prefix}submit-btn`);
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = MESSAGES.general.submitButton;
            }
        });
    }
});


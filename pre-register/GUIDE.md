# คู่มือการใช้งานและแก้ไขเว็บไซต์ Pre-Registration (Crystalfall)

คู่มือนี้จัดทำขึ้นเพื่อให้ทีมพัฒนาหรือผู้ดูแลเว็บไซต์สามารถเข้าใจโครงสร้างและรู้วิธีแก้ไขส่วนต่างๆ ของเว็บไซต์ได้อย่างถูกต้อง

---

## 1. โครงสร้างโฟลเดอร์ (Project Structure)

*   `index.html`: ไฟล์หลักของหน้า Landing Page ประกอบด้วยโครงสร้าง HTML, SEO Meta Tags และการเรียกใช้ Scripts/Styles
*   `css/`: เก็บไฟล์ Stylesheet
    *   `style.css`: ไฟล์สไตล์หลักของหน้าเว็บ
*   `js/`: เก็บไฟล์ Logic และ Configuration
    *   `config.js`: ไฟล์ตั้งค่าระบบ (API, Event ID, Form Fields)
    *   `messages.json.js`: ไฟล์เก็บข้อความ (Text) และคำแปลภาษาต่างๆ (Localization)
    *   `script-pre.js`: ไฟล์หลักที่จัดการ Form Generation, Validation และ API Submission
    *   `script.js`: ไฟล์จัดการ UI (เช่น Carousel, Character Selection, Back to Top)
*   `images/`: เก็บไฟล์รูปภาพทั้งหมดที่ใช้ในเว็บไซต์

---

## 2. วิธีแก้ไขเนื้อหาและภาษา (Content & Localization)

ข้อความทั้งหมดในหน้าเว็บ (ยกเว้นใน Meta Tags) จะถูกเก็บไว้ในไฟล์ `js/messages.json.js`

### การแก้ไขข้อความที่มีอยู่แล้ว
1.  เปิดไฟล์ `js/messages.json.js`
2.  ค้นหาภาษาที่ต้องการแก้ไข (เช่น `th`, `en`, `id`)
3.  แก้ไขข้อความในส่วนที่ต้องการ เช่น:
    *   `general`: ข้อความทั่วไป เช่น หัวข้อหน้า (pageTitle), ปุ่มตกลง (submitButton)
    *   `labels`: ป้ายกำกับในฟอร์ม เช่น Email, Phone, Placeholder ต่างๆ
    *   `apiErrors` / `freeTextErrors`: ข้อความแจ้งเตือนเมื่อเกิดข้อผิดพลาด

### การเพิ่มภาษาใหม่
1.  เพิ่ม Key ภาษาใหม่ใน `ALL_MESSAGES` (เช่น `cn: { ... }`) ในไฟล์ `js/messages.json.js`
2.  คัดลองโครงสร้างข้อความจากภาษาอื่นมาวางและแปลเป็นภาษาใหม่
3.  ในไฟล์ `index.html` ให้เพิ่มปุ่มเลือกภาษาในส่วน Navbar (Dropdown) และอัปเดตระบบตรวจสอบภาษา

---

## 3. วิธีแก้ไขการตั้งค่าระบบ (System Settings)

การตั้งค่าที่เกี่ยวข้องกับระบบหลังบ้านจะอยู่ในไฟล์ `js/config.js`

### การเปลี่ยน API และ Event ID
หากต้องการเปลี่ยนกิจกรรมหรือเชื่อมต่อกับ Server อื่น:
```javascript
const CONFIG = {
    apiUrl: 'https://secure2.playpark.com/PreRegisterAPI/PreRegisterAPI.ashx',
    eventId: '37', // เปลี่ยน ID กิจกรรมที่นี่
    // ...
};
```

### การตั้งค่าฟอร์ม (Form Fields)
ฟิลด์ในฟอร์มถูกสร้างแบบ Dynamic ตามการตั้งค่าใน `fields`:
*   คุณสามารถเปลี่ยนประเภท (`type`), กำหนดว่าเป็นค่าที่จำเป็นต้องกรอกหรือไม่ (`required`), หรือตั้งค่า `autoFillFrom` จากการตรวจจับ IP ได้ที่นี่

---

## 4. การจัดการ SEO และ Social Sharing

ข้อมูล SEO จะถูกกำหนดไว้ในส่วน `<head>` ของไฟล์ `index.html`

*   **Title**: แท็ก `<title>`
*   **Description**: แท็ก `<meta name="description">`
*   **Keywords**: แท็ก `<meta name="keywords">`
*   **OG Tags (Facebook)**: แท็ก `<meta property="og:...">` สำหรับกำหนดรูปภาพและข้อความที่จะแสดงเมื่อแชร์ลิงก์

> **หมายเหตุ**: มี Script ใน `index.html` ที่ช่วยอัปเดต Canonical URL และ Meta Tags ให้ตรงตามภาษาที่ผู้ใช้เลือกผ่าน Parameter `?lang=` อัตโนมัติ

---

## 5. ระบบตรวจจับประเทศ (IP Detection)

เว็บไซต์มีระบบตรวจจับประเทศของผู้ใช้งานอัตโนมัติ (ผ่าน API ของ PlayPark) เพื่อ:
1.  เลือกภาษาเริ่มต้นให้เหมาะสม (TH สำหรับไทย, ID สำหรับอินโดนีเซีย, อื่นๆ เป็น EN)
2.  เติมค่าประเทศในฟอร์มลงทะเบียนอัตโนมัติ (Hidden Field)

หากต้องการแก้ไข API ตรวจจับ IP หรือปิดการใช้งาน:
*   แก้ไขใน `js/config.js` ส่วน `ipDetectionAPI`

---

## 6. ข้อควรระวังในการแก้ไข

*   **การตั้งชื่อ ID**: หากมีการเพิ่มปุ่มหรือส่วนใหม่ และต้องการทำ Tracking (GTM/GA) ควรตั้งชื่อ ID ให้ชัดเจนตาม Format ของทีม (เช่น `ctf-nav-xxx`)
*   **รูปภาพ**: หากมีการเปลี่ยนรูปภาพที่มีข้อความภาษาฝังอยู่ ควรตรวจสอบว่าได้เปลี่ยนครบทุกภาษาหรือไม่
*   **Mobile Responsive**: การแก้ไข CSS ใน `style.css` ควรทดสอบในหน้าจอมือถือเสมอ เนื่องจากมีหลายส่วนที่แยกการแสดงผลระหว่าง PC และ Mobile

---

*จัดทำโดย: Antigravity AI Assistant*
*วันที่: 29 มกราคม 2026*

// التحكم بزر التبديل بين اللغات
document.addEventListener('DOMContentLoaded', function() {
    const langSwitcher = document.querySelector('.lang-switcher');
    const langToggle = document.getElementById('langToggle');
    
    // فتح/إغلاق القائمة المنسدلة
    langToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        langSwitcher.classList.toggle('active');
    });
    
    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', function() {
        langSwitcher.classList.remove('active');
    });
    
    // منع إغلاق القائمة عند النقر داخلها
    langSwitcher.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // حفظ تفضيل اللغة
    const savedLang = localStorage.getItem('preferredLang');
    if (savedLang) {
        updateActiveLang(savedLang);
    }
    
    // تحديث اللغة النشطة
    function updateActiveLang(lang) {
        const langOptions = document.querySelectorAll('.lang-option');
        langOptions.forEach(option => {
            option.classList.remove('active');
            if (option.getAttribute('href').includes(lang)) {
                option.classList.add('active');
            }
        });
        
        // تحديث الزر الرئيسي
        const activeOption = document.querySelector('.lang-option.active');
        if (activeOption) {
            const flag = activeOption.querySelector('.flag-icon').textContent;
            const text = activeOption.querySelector('.lang-text').textContent;
            langToggle.querySelector('.flag-icon').textContent = flag;
            langToggle.querySelector('.lang-text').textContent = text;
        }
    }
    
    // حفظ تفضيل اللغة عند التبديل
    const langOptions = document.querySelectorAll('.lang-option');
    langOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('href').includes('en') ? 'en' : 'ar';
            localStorage.setItem('preferredLang', lang);
            window.location.href = this.getAttribute('href');
        });
    });
});
// קבועים
const SUPABASE_URL = 'https://ouuugtgasfbxtrjswlsh.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91dXVndGdhc2ZieHRyanN3bHNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYxNjc1MzcsImV4cCI6MjA1MTc0MzUzN30.3-tJuH1CRNjAC7Xq6c6dwGnEoQx4KYGhGLsxO5Xru0k';

// אתחול Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// אתחול EmailJS
emailjs.init("HbIpcYDXjdswqgJ1B");

// הגדרת האטרקציות
const additionalAttractions = [
    {
        title: "בית קפה 'המתומן'",
        description: "תפריט איכותי ומגוון שכולו (כמעט) מתוצרת החווה. קפה איכותי ומגוון, גבינות וביצים אורגניות מהחווה, לחמי מחמצת איכותיים ומאפים מקונדיטוריית 'רוזיליה' בבקעת הירדן. 10% הנחה לאורחי הצימר. כשר בהשגחת הרבנות שומרון. המוצרים בחווה בכשרות בד\"ץ העדה החרדית ומהדרין רבנות שומרון.",
        location: "חוות גבעות עולם, 5 דקות נסיעה"
    },
    {
        title: "מצפה מתן",
        description: "מצפה אל נוף הבקעה המטריף, במקום נדנדות ענקיות למול הנוף, שולחנות פיקניק והמון שקט ושלווה. המצפה הוקם לזכרו של מתן זגרון הי\"ד, בן היישוב איתמר.",
        location: "2 דקות נסיעה או מסלול הליכה יפיפה של כ-20 דקות מהצימר"
    },
    {
        title: "בור מים",
        description: "בור מים משופץ, פינת חמד מהממת בין כרמים, לטבילה קרירה בימי הקיץ החמים ושכשוך לאמיצים בעונות הקרות יותר... המקום שופץ לאחרונה ובו דק מרווח, פרגולה, שולחן פיקניק, פינת ישיבה נעימה ופינת מדורה. הבור נקרא ע\"ש דוד יהודה יצחק הי\"ד.",
        location: "2 דקות נסיעה או מסלול הליכה יפיפה של כ-20 דקות מהצימר"
    }
];

// פונקציית התראה מותאמת אישית
function showCustomAlert(title, message, type = 'success') {
    const alert = document.getElementById('customAlert');
    const alertTitle = document.getElementById('alertTitle');
    const alertMessage = document.getElementById('alertMessage');
    const alertIcon = document.getElementById('alertIcon');

    alertTitle.textContent = title;
    alertMessage.textContent = message;

    // עדכון האייקון בהתאם לסוג ההתראה
    if (type === 'error') {
        alertIcon.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        `;
    } else {
        alertIcon.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        `;
    }

    alert.classList.remove('hidden');
    alert.classList.add('show');
}

// פונקציה לסגירת ההתראה
function closeCustomAlert() {
    const alert = document.getElementById('customAlert');
    alert.classList.remove('show');
    alert.classList.add('hidden');
}

// משתנה גלובלי ללוח השנה של המנהל
let adminCalendarInstance = null;

// פונקציה להמרת תאריך לפורמט עברי
function getHebrewDate(date) {
    try {
        const hebrewDate = new Intl.DateTimeFormat('he-IL-u-ca-hebrew', {
            day: 'numeric',
            month: 'numeric'
        }).format(new Date(date));
        return hebrewDate;
    } catch (error) {
        console.error('Error converting date:', error);
        return '';
    }
}

// הגדרות לוח השנה
const calendarOptions = {
    type: 'single',
    settings: {
        lang: 'he-IL',
        range: {
            min: new Date().toISOString().split('T')[0],
            max: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]
        },
        visibility: {
            weekend: true,
            today: true
        },
        selection: {
            day: 'single'
        }
    }
};

// הגדרות לוח השנה למנהל
const adminCalendarOptions = {
    type: 'multiple',
    settings: {
        lang: 'he-IL',
        range: {
            min: new Date().toISOString().split('T')[0],
            max: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]
        },
        visibility: {
            weekend: true,
            today: true
        },
        selection: {
            day: 'multiple'
        }
    }
};

// פונקציה לטיפול בחסימת תאריכים
async function handleBlockDates() {
    const selectedDates = adminCalendarInstance.selectedDates;
    if (!selectedDates || selectedDates.length === 0) {
        showCustomAlert('שגיאה', 'נא לבחור תאריכים לחסימה', 'error');
        return;
    }

    try {
        const { error } = await supabase
            .from('blocked_dates')
            .insert(selectedDates.map(date => ({ date })));

        if (error) throw error;
        showCustomAlert('הצלחה', 'התאריכים נחסמו בהצלחה');
        setTimeout(() => location.reload(), 1500);
    } catch (error) {
        console.error('Error blocking dates:', error);
        showCustomAlert('שגיאה', 'אירעה שגיאה בחסימת התאריכים', 'error');
    }
}

// פונקציה לטיפול בפתיחת תאריכים
async function handleUnblockDates() {
    const selectedDates = adminCalendarInstance.selectedDates;
    if (!selectedDates || selectedDates.length === 0) {
        showCustomAlert('שגיאה', 'נא לבחור תאריכים לפתיחה', 'error');
        return;
    }

    try {
        const { error } = await supabase
            .from('blocked_dates')
            .delete()
            .in('date', selectedDates);

        if (error) throw error;
        showCustomAlert('הצלחה', 'התאריכים נפתחו בהצלחה');
        setTimeout(() => location.reload(), 1500);
    } catch (error) {
        console.error('Error unblocking dates:', error);
        showCustomAlert('שגיאה', 'אירעה שגיאה בפתיחת התאריכים', 'error');
    }
}

// פונקציה לטיפול בשליחת טופס הזמנה
async function handleBookingSubmit(e) {
    e.preventDefault();
    
    const selectedDate = document.getElementById('selected_date').value;
    if (!selectedDate) {
        showCustomAlert('שגיאה', 'נא לבחור תאריך להזמנה', 'error');
        return;
    }
    
    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        guests: document.getElementById('guests').value || '2',
        date: selectedDate,
        created_at: new Date().toISOString(),
        status: 'pending'
    };

    if (!formData.name || !formData.phone || !formData.email) {
        showCustomAlert('שגיאה', 'נא למלא את כל השדות', 'error');
        return;
    }
    
    try {
        const { error } = await supabase
            .from('bookings')
            .insert([formData]);
            
        if (error) throw error;
        
        const hebrewDate = new Intl.DateTimeFormat('he-IL', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(new Date(selectedDate));
        
        await emailjs.send(
            "service_k9gm1tj",
            "template_4oq5d2k",
            {
                to_email: formData.email,
                from_name: "צימר טרה רוסה",
                to_name: formData.name,
                booking_date: hebrewDate,
                guests: formData.guests
            }
        );
        
        showCustomAlert('הצלחה', 'בקשת הזמינות נשלחה בהצלחה! נחזור אליך בהקדם');
        this.reset();
        document.getElementById('selected_date').value = '';
        
    } catch (error) {
        console.error('Error:', error);
        showCustomAlert('שגיאה', 'אירעה שגיאה בשליחת הבקשה. נא לנסות שוב מאוחר יותר', 'error');
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    // יצירת לוח השנה הראשי
    const calendar = new VanillaCalendar('#calendar', calendarOptions);
    calendar.init();

    // יצירת לוח השנה למנהל
    const adminCalendarElement = document.getElementById('adminCalendar');
    if (adminCalendarElement) {
        adminCalendarInstance = new VanillaCalendar('#adminCalendar', adminCalendarOptions);
        adminCalendarInstance.init();
    }

    // טיפול בממשק הניהול
    const adminBtn = document.getElementById('adminBtn');
    const adminModal = document.getElementById('adminModal');
    const adminForm = document.getElementById('adminForm');
    const adminCalendarModal = document.getElementById('adminCalendarModal');
    
    if (adminBtn && adminModal) {
        adminBtn.addEventListener('click', () => {
            adminModal.classList.remove('hidden');
        });
    }

    if (adminForm) {
        adminForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const password = document.getElementById('adminPassword').value;
            if (password === '1234') {
                adminModal.classList.add('hidden');
                adminCalendarModal.classList.remove('hidden');
            } else {
                showCustomAlert('שגיאה', 'סיסמה שגויה', 'error');
            }
        });
    }

    // טיפול בכפתורי חסימת תאריכים
    const blockDatesBtn = document.getElementById('blockDatesBtn');
    const unblockDatesBtn = document.getElementById('unblockDatesBtn');
    if (blockDatesBtn && unblockDatesBtn) {
        blockDatesBtn.addEventListener('click', handleBlockDates);
        unblockDatesBtn.addEventListener('click', handleUnblockDates);
    }

    // טיפול בטופס הזמנה
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmit);
    }

    // טיפול בכפתור האטרקציות
    const showMoreBtn = document.getElementById('showMoreAttractions');
    const attractionsModal = document.getElementById('attractionsModal');
    const closeModalBtn = document.getElementById('closeAttractionsModal');
    const modalContent = attractionsModal?.querySelector('.grid');

    if (showMoreBtn && attractionsModal && modalContent) {
        // הוספת האטרקציות למודל
        additionalAttractions.forEach(attraction => {
            const card = document.createElement('div');
            card.className = 'bg-white p-6 rounded-lg shadow-lg attraction-card';
            
            let contactInfo = '';
            if (attraction.contact) {
                contactInfo = `
                    <p class="text-gray-600 mb-4">טלפון: ${attraction.contact}</p>
                    <a href="tel:${attraction.contact}" 
                       class="inline-block bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 transition-colors">
                       לתיאום: ${attraction.contactName || 'התקשר'}
                    </a>
                `;
            } else if (attraction.waze) {
                contactInfo = `
                    <a href="${attraction.waze}" 
                       target="_blank"
                       class="inline-block bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 transition-colors">
                       ניווט למקום
                    </a>
                `;
            }

            card.innerHTML = `
                ${attraction.image ? `<img src="${attraction.image}" class="attraction-image" alt="${attraction.title}">` : ''}
                <h3 class="text-xl font-bold mb-3">${attraction.title}</h3>
                <p class="text-gray-600 mb-4">${attraction.location}</p>
                <p class="mb-4">${attraction.description}</p>
                ${attraction.hours ? `<p class="text-sm text-gray-600 mb-4">${attraction.hours}</p>` : ''}
                ${contactInfo}
            `;

            modalContent.appendChild(card);
        });

        // אירועי פתיחה וסגירה של המודל
        showMoreBtn.addEventListener('click', () => {
            attractionsModal.classList.remove('hidden');
        });

        closeModalBtn.addEventListener('click', () => {
            attractionsModal.classList.add('hidden');
        });

        attractionsModal.addEventListener('click', (e) => {
            if (e.target === attractionsModal) {
                attractionsModal.classList.add('hidden');
            }
        });
    }
}); 
// אתחול Supabase
const SUPABASE_URL = 'https://ouuugtgasfbxtrjswlsh.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91dXVndGdhc2ZieHRyanN3bHNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYxNjc1MzcsImV4cCI6MjA1MTc0MzUzN30.3-tJuH1CRNjAC7Xq6c6dwGnEoQx4KYGhGLsxO5Xru0k';

// משתנים גלובליים
let selectedDate = null;
let adminCalendarInstance = null;
let currentTestimonial = 0;
let isTestimonialAnimating = false;

// הגדרת האטרקציות הנוספות
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
    },
    {
        title: "יקב תום",
        description: "בחווה חקלאית צמודה לגבעה שוכן יקב בוטיק ובו יינות איכותיים ומגוונים נושאי פרסים בעלי שם עולמי. במקום דיר כבשים והמון אנשים טובים, וכמובן יין מובחר מאדמת הארץ הטובה.",
        location: "הליכה נעימה בתוך הגבעה עד לחווה של משפ' פניני למרגלות הגבעה",
        contact: "0527390763",
        contactName: "מיטל פניני"
    },
    {
        title: "סטודיו בוץ",
        description: "הסטודיו של בתיה ארדשטיין בו תוכלו למצוא תוצרת קרמיקה מקומית, יפיפיה, איכותית ומיוחדת בעבודת יד. במקום סדנאות קרמיקה לזוגות ומשפחות (בתיאום מראש) וכמובן אפשרות קנייה של ספלים, בקבוקי שמן זית, כלי הגשה ועוד ועוד...",
        location: "גבעת שיר חדש, כ-8 דקות נסיעה",
        contact: "0523445019",
        contactName: "בתיה"
    },
    {
        title: "עיסויים לנשים",
        description: "אסתי המוכשרת מעלת ידי הזהב, מעסה מקצועית, מגיעה עד אלינו לצימר ובמחיר מיוחד לאורחים! מעניקה חוויה מרגיעה, נעימה ובלתי נשכחת של עיסוי מפנק ומשחרר... מעסה גם הריוניות.",
        contact: "0528745591",
        contactName: "אסתי לויתן"
    },
    {
        title: "sunflower studio",
        description: "הסטודיו של ציפורה - סטודיו מיוחד לנרות, סבונים ושלל מוצרי טיפוח טבעיים ואיכותיים בעבודת יד! במקום ניתן לרכוש מוצרים בודדים ומארזים מפנקים ביותר. בקרוב סדנאות זוגיות ומשפחתיות",
        location: "גבעת אלומות, כ-10 דקות נסיעה",
        contact: "0538264688",
        contactName: "ציפורה"
    },
    {
        title: "שירת העשבים",
        description: "מאפיית בוטיק על קצה ההר - מידיה הקסומות של עמליה יוצאים מידי יום מאפים טריים מקמח ארץ ישראלי מובחר, מטבלים צבעוניים ומתוקים מיוחדים... מארזים איכותיים לזוגות ומשפחות וקנייה של מאפים מטריפים מידי יום.",
        location: "גבעת שיר חדש, כ-7 דקות נסיעה",
        contact: "0584107396",
        contactName: "עמליה חושן"
    },
    {
        title: "מגשי פירות מעוצבים",
        description: "מגשי פירות מעוצבים מפנקים עם משלוחים עד לצימר!",
        location: "יצהר",
        contact: "0545430891",
        contactName: "רבקה לוי"
    },
    {
        title: "סדנת ליבוד",
        description: "סדנאות ליבוד לזוגות ומשפחות - ליבוד היא מלאכה קדומה בצמר. בעזרת מחט מיוחדת ניצור תמונות ציוריות וססגוניות. אין צורך בניסיון קודם!",
        location: "חוות גלעד",
        contact: "0542126869",
        contactName: "איתיאל בראלי"
    },
    {
        title: "יקב כביר",
        description: "מרכז המבקרים של היקב כולל מסעדה חלבית, המשלימה את חווית היין. התפריט שם דגש על מרכיבים עונתיים, טריים ואיכותיים.",
        location: "אלון מורה, כ-25 דקות נסיעה",
        hours: "שני 10:00-16:00, שלישי-רביעי 10:00-16:00 ו-19:00-22:00, חמישי 10:00-16:00, שישי בראנץ' בופה חופשי 9:00-13:30 (105 ש\"ח לאדם)"
    },
    {
        title: "חנות הכל love",
        description: "ב וכולם באיכות מעולה ומחירים מדהימים! שעות פתיחה משתנות. חנות יד שנייה בוטיקית מוקפדת, הבגדים בחנות נבחרים אחד אחד ומגיעים מארה\"ב וכולם באיכות מעולה ומחירים מדהימים! שעות פתיחה משתנות.",
        location: "איתמר, 15 דקות נסיעה",
        contact: "0509975053",
        contactName: "מיכל",
        waze: "https://waze.com/ul/hsv9p53nhh"
    },
    {
        title: "מעין אירוס השומרון",
        description: "מעין שמתאים למשפחות וילדים, במקום שתי בריכות רדודות וקרירות, נקיות, מדשאות, פרגולות ושולחנות פיקניק. המעין מלא בחודשי הקיץ.",
        location: "השער הצהוב לכיוון איתמר, כ-13 דקות נסיעה",
        image: "https://i.imgur.com/BmjlkBR.jpg"
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
    input: false,
    type: 'single',
    settings: {
        lang: 'he-IL',
        iso8601: false,
        range: {
            min: new Date().toISOString().split('T')[0],
            max: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]
        },
        visibility: {
            weekend: true,
            today: true,
            theme: 'light'
        },
        selection: {
            day: 'single'
        }
    },
    actions: {
        clickDay(event, self) {
            const selectedDate = event.target.closest('.vanilla-calendar-day').dataset.calendarDay;
            if (selectedDate) {
                document.getElementById('selected_date').value = selectedDate;
            }
        }
    }
};

// יונקציה לעדכון תאריכים חסומים ותאריכים עבריים
async function updateCalendarDates() {
    try {
        // טעינת תאריכים חסומים
        const { data: blockedDates, error } = await supabase
            .from('blocked_dates')
            .select('date');

        if (error) throw error;

        const blockedDatesArray = blockedDates ? blockedDates.map(item => item.date) : [];
        
        // עדכון התאריכים בלוח
        const days = document.querySelectorAll('.vanilla-calendar-day');
        days.forEach(day => {
            const dateStr = day.dataset.calendarDay;
            if (!dateStr) return;

            // הוספת התאריך העברי
            if (!day.querySelector('.vanilla-calendar-day__hebrew-date')) {
                const hebrewDateDiv = document.createElement('div');
                hebrewDateDiv.className = 'vanilla-calendar-day__hebrew-date';
                hebrewDateDiv.textContent = getHebrewDate(dateStr);
                day.appendChild(hebrewDateDiv);
            }

            // סימון תאריכים חסומים
            if (blockedDatesArray.includes(dateStr)) {
                day.classList.add('vanilla-calendar-day--disabled');
            } else {
                day.classList.remove('vanilla-calendar-day--disabled');
            }
        });
    } catch (error) {
        console.error('Error updating calendar:', error);
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    // יצירת לוח השנה
    const calendar = new VanillaCalendar('#calendar', calendarOptions);
    calendar.init();

    // עדכון ראשוני של התאריכים
    setTimeout(updateCalendarDates, 100);

    // הגדרת עדכון בשינוי חודש
    calendar.onMonthChange = () => {
        setTimeout(updateCalendarDates, 100);
    };

    // אתחול Masonry לגלריות
    const masonryGrids = document.querySelectorAll('.masonry-grid');
    masonryGrids.forEach(grid => {
        new Masonry(grid, {
            itemSelector: '.masonry-item',
            columnWidth: '.masonry-grid-column',
            percentPosition: true
        });
    });

    // טיפול בטופס הזמנה
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmit);
    }

    // טיפול בכפתורי חסימת תאריכים
    const blockDatesBtn = document.getElementById('blockDatesBtn');
    const unblockDatesBtn = document.getElementById('unblockDatesBtn');
    if (blockDatesBtn && unblockDatesBtn) {
        blockDatesBtn.addEventListener('click', handleBlockDates);
        unblockDatesBtn.addEventListener('click', handleUnblockDates);
    }
}); 
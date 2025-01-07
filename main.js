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
            today: true
        },
        selection: {
            day: 'single'
        }
    },
    actions: {
        clickDay(event, self) {
            const selectedDate = event.target.closest('.vanilla-calendar-day').dataset.calendarDay;
            document.getElementById('selected_date').value = selectedDate;
        }
    }
};

// יצירת לוח השנה
const calendar = new VanillaCalendar('#calendar', calendarOptions);
calendar.init();

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

// עדכון התאריכים העבריים והתאריכים החסומים
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
            const hebrewDateDiv = day.querySelector('.vanilla-calendar-day__hebrew-date') || 
                                document.createElement('div');
            hebrewDateDiv.className = 'vanilla-calendar-day__hebrew-date';
            hebrewDateDiv.textContent = getHebrewDate(dateStr);
            if (!day.querySelector('.vanilla-calendar-day__hebrew-date')) {
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

// עדכון בטעינה ובשינוי חודש
calendar.onMonthChange = updateCalendarDates;
document.addEventListener('DOMContentLoaded', updateCalendarDates);

// עדכון התאריכים העבריים בטעינה
setTimeout(updateHebrewDates, 100);

// פונקציה לטעינת תאריכים תפוסים
async function loadBlockedDates() {
    try {
        const { data: blockedDates } = await supabase
            .from('blocked_dates')
            .select('date');

        if (blockedDates) {
            const blockedDatesArray = blockedDates.map(item => item.date);
            
            // עדכון התאריכים התפוסים בלוח
            const days = document.querySelectorAll('.vanilla-calendar-day');
            days.forEach(day => {
                const dateStr = day.getAttribute('data-calendar-day');
                if (blockedDatesArray.includes(dateStr)) {
                    day.classList.add('vanilla-calendar-day--disabled');
                }
            });
        }
    } catch (error) {
        console.error('Error loading blocked dates:', error);
    }
}

// טעינת תאריכים תפוסים בטעינת הדף ובכל שינוי חודש
loadBlockedDates();
calendar.onMonthChange = () => {
    setTimeout(() => {
        updateHebrewDates();
        loadBlockedDates();
    }, 100);
};

document.addEventListener('DOMContentLoaded', async function() {
    try {
        // אתחול Supabase
        const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

        // אתחול EmailJS
        emailjs.init("HbIpcYDXjdswqgJ1B");

        // אתחול Masonry
        const masonryGrids = document.querySelectorAll('.masonry-grid');
        masonryGrids.forEach(grid => {
            new Masonry(grid, {
                itemSelector: '.masonry-item',
                columnWidth: '.masonry-grid-column',
                percentPosition: true
            });
        });

        // אתחול לוח השנה
        const calendarElement = document.getElementById('calendar');
        if (calendarElement) {
            const blockedDates = await getBlockedDates();
            const calendarOptions = {
                settings: {
                    lang: 'he',
                    iso8601: false,
                    selection: {
                        day: 'single'
                    },
                    visibility: {
                        theme: 'light'
                    }
                },
                DOMTemplates: {
                    day: `
                        <div class="vanilla-calendar-day" data-calendar-day="{{day}}" date="{{date}}">
                            <div class="vanilla-calendar-day__num">{{day}}</div>
                            <div class="vanilla-calendar-day__hebrew-date"></div>
                        </div>
                    `
                },
                actions: {
                    clickDay(event, dates) {
                        const clickedDate = dates[0];
                        if (clickedDate) {
                            if (blockedDates.includes(clickedDate)) {
                                showCustomAlert('מצטערים', 'תאריך זה אינו פנוי', 'info');
                                return;
                            }
                            selectedDate = clickedDate;
                            const hebrewDate = new Intl.DateTimeFormat('he-IL', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            }).format(new Date(clickedDate));
                            
                            const dateDisplay = document.getElementById('selectedDateDisplay');
                            if (dateDisplay) {
                                dateDisplay.textContent = `תאריך נבחר: ${hebrewDate}`;
                                dateDisplay.classList.remove('hidden');
                            }
                        }
                    }
                }
            };

            // יצירת לוח שנה
            const calendar = new VanillaCalendar('#calendar', calendarOptions);
            calendar.init();

            // הגדרת החודש הנוכחי כברירת מחדל
            const today = new Date();
            calendar.settings.selected.month = today.getMonth();
            calendar.settings.selected.year = today.getFullYear();

            // הוספת תאריכים עבריים
            function updateHebrewDates() {
                const days = document.querySelectorAll('.vanilla-calendar-day');
                days.forEach(day => {
                    const date = day.getAttribute('date');
                    if (date) {
                        const hebrewDate = getHebrewDate(new Date(date));
                        const hebrewElement = day.querySelector('.vanilla-calendar-day__hebrew-date');
                        if (hebrewElement) {
                            hebrewElement.textContent = hebrewDate;
                        }
                    }
                });
            }

            // עדכון תאריכים עבריים בטעינה ובשינוי חודש
            updateHebrewDates();
            document.querySelector('.vanilla-calendar-header').addEventListener('click', () => {
                setTimeout(() => {
                    updateHebrewDates();
                    updateBlockedDates();
                }, 100);
            });

            // צביעת תאריכים חסומים
            function updateBlockedDates() {
                const days = document.querySelectorAll('.vanilla-calendar-day');
                days.forEach(day => {
                    const date = day.dataset.calendarDate;
                    if (blockedDates.includes(date)) {
                        day.classList.add('blocked-date');
                        day.title = 'תאריך זה תפוס';
                    }
                });
            }
        }

        // אתחול קרוסלת המלצות
        const testimonialsWrapper = document.querySelector('.testimonials-wrapper');
        const prevButton = document.querySelector('.testimonials-nav-button.prev');
        const nextButton = document.querySelector('.testimonials-nav-button.next');

        if (testimonialsWrapper && prevButton && nextButton) {
            const scrollAmount = 400; // כמות הגלילה בכל לחיצה

            prevButton.addEventListener('click', () => {
                testimonialsWrapper.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            });

            nextButton.addEventListener('click', () => {
                testimonialsWrapper.scrollBy({
                    left: -scrollAmount,
                    behavior: 'smooth'
                });
            });
        }

        // טיפול בתמונות בגלריה
        const imageModal = document.getElementById('imageModal');
        const modalImage = document.getElementById('modalImage');

        if (imageModal && modalImage) {
            document.querySelectorAll('.gallery-item img, .benefits img').forEach(item => {
                item.addEventListener('click', function() {
                    modalImage.src = this.src;
                    imageModal.classList.remove('hidden');
                    imageModal.style.display = 'flex';
                });
            });

            imageModal.addEventListener('click', function() {
                this.classList.add('hidden');
                this.style.display = 'none';
            });
        }

        // פיפול באטרקציות
        const showMoreBtn = document.getElementById('showMoreAttractions');
        const attractionsModal = document.getElementById('attractionsModal');
        const closeModalBtn = document.getElementById('closeAttractionsModal');
        const modalContent = attractionsModal?.querySelector('.grid');

        if (showMoreBtn && attractionsModal && modalContent) {
            // הוספת האטרקציות הנוספות למודל
            additionalAttractions.forEach(attraction => {
                const card = document.createElement('div');
                card.className = 'bg-white p-6 rounded-lg shadow-lg attraction-card';
                
                // הוספת תמונת רקע אם קיימת
                if (attraction.image) {
                    card.style.setProperty('--bg-image', `url(${attraction.image})`);
                }
                
                let contactInfo = '';
                if (attraction.contact) {
                    contactInfo = `
                        <p class="text-gray-600 mb-4">טלפון: ${attraction.contact}</p>
                        <a href="tel:${attraction.contact}" 
                           class="inline-block bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 transition-colors">
                           לתיאום: ${attraction.contactName}
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

        // פונקציה להבאת תאריכים חסומים מ-Supabase
        async function getBlockedDates() {
            try {
                const { data, error } = await supabase
                    .from('blocked_dates')
                    .select('date');
                
                if (error) {
                    console.error('Supabase error:', error);
                    throw error;
                }
                return data ? data.map(item => item.date) : [];
            } catch (error) {
                console.error('Error fetching blocked dates:', error);
                return [];
            }
        }

        // ממשק ניהול
        const ADMIN_PASSWORD = '1234';
        const adminBtn = document.getElementById('adminBtn');
        const adminModal = document.getElementById('adminModal');
        const adminCalendarModal = document.getElementById('adminCalendarModal');
        const adminForm = document.getElementById('adminForm');
        const adminCancelBtn = document.getElementById('adminCancelBtn');
        const adminCloseBtn = document.getElementById('adminCloseBtn');
        const blockDatesBtn = document.getElementById('blockDatesBtn');
        const unblockDatesBtn = document.getElementById('unblockDatesBtn');

        if (adminBtn && adminModal) {
            adminBtn.addEventListener('click', () => adminModal.classList.remove('hidden'));
        }
        
        if (adminCancelBtn && adminModal) {
            adminCancelBtn.addEventListener('click', () => adminModal.classList.add('hidden'));
        }
        
        if (adminCloseBtn && adminCalendarModal) {
            adminCloseBtn.addEventListener('click', () => adminCalendarModal.classList.add('hidden'));
        }

        if (adminForm && adminCalendarModal) {
            adminForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const password = document.getElementById('adminPassword')?.value;
                
                if (password === ADMIN_PASSWORD) {
                    adminModal.classList.add('hidden');
                    adminCalendarModal.classList.remove('hidden');
                    
                    const adminCalendarElement = document.getElementById('adminCalendar');
                    if (adminCalendarElement) {
                        adminCalendarInstance = new VanillaCalendar('#adminCalendar', {
                            settings: {
                                lang: 'he-IL',
                                selection: {
                                    day: 'multiple'
                                }
                            }
                        });
                        adminCalendarInstance.init();
                    }
                } else {
                    alert('סיסמה שגויה');
                }
            });
        }

        if (blockDatesBtn) {
            blockDatesBtn.addEventListener('click', async () => {
                if (!adminCalendarInstance) {
                    showCustomAlert('שגיאה', 'אירעה שגיאה. נא לרענן את הדף ולנסות שוב', 'error');
                    return;
                }

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
            });
        }

        if (unblockDatesBtn) {
            unblockDatesBtn.addEventListener('click', async () => {
                if (!adminCalendarInstance) {
                    showCustomAlert('שגיאה', 'אירעה שגיאה. נא לרענן את הדף ולנסות שוב', 'error');
                    return;
                }

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
            });
        }

        // האזנה לטופס ההזמנה
        const bookingForm = document.getElementById('bookingForm');
        if (bookingForm) {
            bookingForm.addEventListener('submit', async function(e) {
                e.preventDefault();
                
                if (!selectedDate) {
                    showCustomAlert('שגיאה', 'נא לבחור תאריך להזמנה', 'error');
                    return;
                }
                
                const formData = {
                    name: document.getElementById('name')?.value || '',
                    phone: document.getElementById('phone')?.value || '',
                    email: document.getElementById('email')?.value || '',
                    guests: document.getElementById('guests')?.value || '2',
                    date: selectedDate,
                    created_at: new Date().toISOString(),
                    status: 'pending'
                };

                if (!formData.name || !formData.phone || !formData.email) {
                    showCustomAlert('שגיאה', 'נא למלא את כל השדות', 'error');
                    return;
                }
                
                try {
                    console.log('שולח בקשת זמינות:', formData);
                    
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
                    const dateDisplay = document.getElementById('selectedDateDisplay');
                    if (dateDisplay) {
                        dateDisplay.classList.add('hidden');
                    }
                    selectedDate = null;
                    
                } catch (error) {
                    console.error('Error:', error);
                    showCustomAlert('שגיאה', 'אירעה שגיאה בשליחת הבקשה. נא לנסות שוב מאוחר יותר', 'error');
                }
            });
        }

        // אנימציות גלילה חלקה
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            }
        });

        // יצירת כפתור WhatsApp צף
        const whatsappButton = document.createElement('div');
        whatsappButton.innerHTML = `
          <div id="whatsappButton" class="fixed bottom-4 left-4 z-50 flex flex-col items-start">
            <button id="closeWhatsapp" class="mb-2 text-gray-600 hover:text-gray-800 bg-white rounded-full p-1 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <a href="https://wa.me/972547872807?text=אני%20פונה%20בקשר%20לצימר" target="_blank" 
               class="bg-[#25D366] text-white rounded-full p-3 shadow-lg hover:bg-[#128C7E] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.598.723 4.907 2.034 1.31 1.311 2.031 3.054 2.03 4.908-.001 3.825-3.113 6.938-6.937 6.938z"/>
              </svg>
            </a>
          </div>
        `;
        document.body.appendChild(whatsappButton);

        // הוספת אירוע לכפתור הסגירה
        document.getElementById('closeWhatsapp').addEventListener('click', function() {
          document.getElementById('whatsappButton').style.display = 'none';
        });

    } catch (error) {
        console.error('Error initializing app:', error);
        showCustomAlert('שגיאה', 'אירעה שגיאה בטעינת האפליקציה. נא לרענן את הדף', 'error');
    }
}); 
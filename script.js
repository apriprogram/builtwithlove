// Wedding Invitation Script Logic

const API_PUBLIC = '/api/public';
const API_WISHES = '/api/wishes';
const API_RSVP = '/api/rsvp';
const getGuestToken = () => {
    const params = new URLSearchParams(window.location.search);
    const v = params.get('v');
    if (v) {
        try { return atob(v); } catch(e) { return null; }
    }
    return params.get('guest');
};
const guestToken = getGuestToken();
let currentGuest = null;

function showModal(title, message, type = 'success') {
    const modal = document.getElementById('customModal');
    const modalIcon = document.getElementById('modalIcon');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');

    if (!modal || !modalIcon || !modalTitle || !modalMessage) return;

    modalTitle.innerText = title;
    modalMessage.innerText = message;

    // Set icon based on type
    let iconHtml = '';
    if (type === 'success') {
        iconHtml = '<i class="fas fa-circle-check"></i>';
        modalIcon.className = 'modal-icon success';
    } else if (type === 'error') {
        iconHtml = '<i class="fas fa-circle-xmark"></i>';
        modalIcon.className = 'modal-icon error';
    } else if (type === 'warning') {
        iconHtml = '<i class="fas fa-triangle-exclamation"></i>';
        modalIcon.className = 'modal-icon warning';
    }
    modalIcon.innerHTML = iconHtml;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('customModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

window.showModal = showModal;
window.closeModal = closeModal;

function safeText(id, value) {
    const el = document.getElementById(id);
    if (el) el.innerText = value;
}

function safeHref(id, value) {
    const el = document.getElementById(id);
    if (el && value) el.href = value;
}

function safeSrc(id, value) {
    const el = document.getElementById(id);
    if (el && value) el.src = value;
}

async function loadPublicData() {
    try {
        const url = guestToken ? `${API_PUBLIC}?token=${encodeURIComponent(guestToken)}&t=${Date.now()}` : `${API_PUBLIC}?t=${Date.now()}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Public data gagal dimuat');

        const data = await response.json();
        const settings = data.settings || {};
        window.invitationSettings = settings; // Save globally for other functions
        const events = data.events || [];
        const couple = data.couple || [];
        const gallery = data.gallery || [];
        const wishes = data.wishes || [];
        const guest = data.guest || null;

        currentGuest = guest;
        safeText('coverTitle', settings.cover_title || 'The Wedding');
        safeText('coverSubtitle', settings.cover_subtitle || 'Of');
        safeText('heroName', settings.hero_name || 'Riandino & Aurora');
        safeText('guestPrefix', settings.guest_prefix || 'Kepada Yth. Bapak/Ibu/Saudara/i:');
        safeText('eventHeaderTitle', settings.event_header_title || 'Wedding Event');
        safeText('eventHeaderQuote', settings.event_header_quote || 'Kami sangat berharap kehadiran Anda dalam momen spesial kami.');
        const openButtonText = document.getElementById('openInvitationText');
        if (openButtonText) openButtonText.innerText = settings.hero_button || 'Buka Undangan';

        // Apply Greeting Logo
        const logoImg = document.getElementById('greetingLogo');
        const logoFallback = document.getElementById('greetingLogoFallback');
        
        if (settings.greeting_logo) {
            if (logoImg) {
                logoImg.src = settings.greeting_logo;
                logoImg.style.display = 'block';
            }
            if (logoFallback) logoFallback.style.display = 'none';
        } else {
            if (logoImg) logoImg.style.display = 'none';
            if (logoFallback) {
                logoFallback.style.display = 'flex';
                logoFallback.classList.remove('hidden');
            }
        }

        // Greeting text fields (use '-' if empty)
        const greetingHeadingEl = document.getElementById('greetingHeading');
        if (greetingHeadingEl) greetingHeadingEl.textContent = settings.greeting_heading || '-';
        const greetingQuoteEl = document.getElementById('greetingQuote');
        if (greetingQuoteEl) greetingQuoteEl.textContent = settings.greeting_quote || '-';
        const greetingInvitationEl = document.getElementById('greetingInvitation');
        if (greetingInvitationEl) greetingInvitationEl.textContent = settings.greeting_invitation || '-';

        // Apply Backgrounds with priority logic
        const applyBg = (elId, img, color, isFixed = true) => {
            const el = document.getElementById(elId);
            if (!el) return;
            if (img) {
                el.style.background = `url('${img}') center/cover no-repeat ${isFixed ? 'fixed' : ''}`;
            } else if (color) {
                el.style.background = color;
            } else {
                // If it's the gallery, we might want to show a default or icon
                el.style.background = '#000000';
            }
        };

        // Cover Background (Opening)
        const coverEl = document.getElementById('cover');
        const slideshowContainer = document.getElementById('coverSlideshow');
        if (coverEl && slideshowContainer) {
            const openingMode = settings.opening_bg_mode || 'color';
            const openingBgImg = settings.opening_bg_img || '';
            if (openingMode === 'image' && openingBgImg) {
                const openingImages = openingBgImg.split(',').filter(u => u.trim() !== '').map(src => ({ src }));
                if (openingImages.length > 0) {
                    renderCoverSlideshow(openingImages);
                    coverEl.style.background = 'transparent';
                }
            } else {
                slideshowContainer.innerHTML = '';
                if (coverInterval) clearInterval(coverInterval);
                coverEl.style.background = settings.opening_bg_color || '#000000';
            }
        }

        // Greeting Section Background (Sambutan)
        const greetingEl = document.getElementById('greetingSection');
        if (greetingEl) {
            const greetingMode = settings.greeting_bg_mode || 'color';
            const greetingBgImg = settings.greeting_bg_img || '';
            if (greetingMode === 'image' && greetingBgImg) {
                const greetingImgs = greetingBgImg.split(',').filter(u => u.trim() !== '');
                if (greetingImgs.length > 0) {
                    // Use first image (or cycle if multiple)
                    greetingEl.style.background = `url('${greetingImgs[0]}') center/cover no-repeat fixed`;
                } else {
                    greetingEl.style.background = settings.greeting_bg_color || '#000000';
                }
            } else {
                greetingEl.style.background = settings.greeting_bg_color || '#000000';
            }
        }

        // Couple Section Title
        const coupleSectionTitleEl = document.getElementById('coupleSectionTitle');
        if (coupleSectionTitleEl && settings.couple_section_title && settings.couple_section_title !== 'Bride & Groom') {
            coupleSectionTitleEl.textContent = settings.couple_section_title;
            coupleSectionTitleEl.className = 'text-[#F5A623] text-5xl md:text-7xl leading-none tracking-normal drop-shadow-xl text-center flex items-center justify-center w-full';
        }

        // Couple Section Background
        const coupleSection = document.getElementById('couple');
        if (coupleSection) {
            const coupleMode = settings.couple_bg_mode || 'color';
            if (coupleMode === 'image' && settings.couple_bg_img) {
                // If it's a comma-separated list, take the first one
                const coupleImgs = settings.couple_bg_img.split(',').filter(u => u.trim() !== '');
                if (coupleImgs.length > 0) {
                    coupleSection.style.background = `url('${coupleImgs[0]}') center/cover no-repeat fixed`;
                } else {
                    coupleSection.style.background = settings.couple_bg_color || '#000000';
                }
            } else {
                coupleSection.style.background = settings.couple_bg_color || '#000000';
            }
        }

        applyBg('events', settings.event_bg, settings.event_bg_color);
        applyBg('gallery', settings.gallery_bg_img, settings.gallery_bg_color);
        applyBg('lovestory', settings.lovestory_bg, settings.lovestory_bg_color);
        
        // Love Story Chat Area (Card Background)
        const lsChatArea = document.querySelector('#lovestory .styling-scrollbar');
        if (lsChatArea) {
            if (settings.lovestory_card_bg) {
                lsChatArea.style.backgroundImage = `url('${settings.lovestory_card_bg}')`;
                lsChatArea.style.backgroundSize = 'cover';
                lsChatArea.style.backgroundPosition = 'center';
                lsChatArea.style.backgroundBlendMode = 'multiply';
            } else if (settings.lovestory_card_bg_color) {
                lsChatArea.style.backgroundImage = 'none';
                lsChatArea.style.backgroundColor = settings.lovestory_card_bg_color;
                if (settings.lovestory_card_bg_color.includes('gradient')) {
                    lsChatArea.style.background = settings.lovestory_card_bg_color;
                }
            }
        }

        applyBg('digitalEnvelope', settings.gift_bg_img, settings.gift_bg_color);
        
        // Wishes (Ucapan) Mode Handling
        const wishesSection = document.getElementById('sectionWishes');
        if (wishesSection) {
            const mode = settings.wishes_bg_mode || 'color';
            if (mode === 'image' && settings.wishes_bg_img) {
                wishesSection.style.background = `url('${settings.wishes_bg_img}') center/cover no-repeat fixed`;
            } else {
                wishesSection.style.background = settings.wishes_bg_color || '#000000';
            }
        }

        applyBg('sectionRsvp', settings.rsvp_bg_img, settings.rsvp_bg_color);

        safeText('guestName', currentGuest?.name || 'Tamu Undangan');
        updateGuestForms();

        if (events[0]) {
            if (events[0].date_iso) {
                let timeStr = '00:00:00';
                if (events[0].time) {
                    const timeMatch = events[0].time.match(/(\d{1,2})[.:](\d{2})/);
                    if (timeMatch) timeStr = `${timeMatch[1].padStart(2, '0')}:${timeMatch[2]}:00`;
                }
                let parsedDate = NaN;
                if (events[0].date_iso) {
                    const dateParts = events[0].date_iso.split('-'); // [YYYY, MM, DD]
                    if (dateParts.length === 3) {
                        parsedDate = new Date(`${dateParts[1]}/${dateParts[2]}/${dateParts[0]} ${timeStr}`).getTime();
                    }
                }
                
                // Fallback smart parser for Indonesian text date if ISO fails or defaults
                if (isNaN(parsedDate) || events[0].date_iso === '2026-06-26') {
                    if (events[0].date) {
                        const monthsID = {'januari':'01', 'februari':'02', 'maret':'03', 'april':'04', 'mei':'05', 'juni':'06', 'juli':'07', 'agustus':'08', 'september':'09', 'oktober':'10', 'november':'11', 'desember':'12'};
                        const dParts = events[0].date.replace(/,/g, '').split(' ');
                        let day = '', month = '', year = '';
                        dParts.forEach(p => {
                            if (!isNaN(p) && p.length <= 2) day = p.padStart(2, '0');
                            if (!isNaN(p) && p.length === 4) year = p;
                            if (isNaN(p) && monthsID[p.toLowerCase()]) month = monthsID[p.toLowerCase()];
                        });
                        if (day && month && year) {
                            parsedDate = new Date(`${month}/${day}/${year} ${timeStr}`).getTime();
                        }
                    }
                }

                if (!isNaN(parsedDate)) {
                    targetDate = parsedDate;
                }
            }
            safeSrc('event1Icon', events[0].icon_src || 'img/icon/Gereja.png');
            safeText('event1Heading', events[0].heading || events[0].name);
            safeText('event1Time', events[0].time || '14.00 WIB - Selesai');
            safeText('event1Date', events[0].date || 'Jumat, 26 Juni 2026');
            safeText('event1Location', events[0].location_name || 'GBKP Rg. Km. 7 Pd. Bulan Medan');
            safeText('event1Address', events[0].address || 'Jl. Jamin Ginting Km.7 No.47, Kwala Bekala, Kec. Medan Johor, Kota Medan, Sumatera Utara 20142');
            safeSrc('event1Map', events[0].map_src);
            safeHref('event1Link', events[0].map_link);
        }

        if (events[1]) {
            safeSrc('event2Icon', events[1].icon_src || 'img/icon/Traditional%20Batak%20house%20icon.png');
            safeText('event2Heading', events[1].heading || events[1].name);
            safeText('event2Time', events[1].time || '07.00 WIB - Selesai');
            safeText('event2Date', events[1].date || 'Sabtu, 27 Juni 2026');
            safeText('event2Location', events[1].location_name || 'Jambur Namaken');
            safeText('event2Address', events[1].address || 'JL Letjen Jamin Ginting No, Gg. Jati No.30, Beringin, Kec. Medan Selayang, Kota Medan, Sumatera Utara 20146');
            safeSrc('event2Map', events[1].map_src);
            safeHref('event2Link', events[1].map_link);
        }

        if (couple[0]) {
            safeSrc('groomImage', couple[0].image_src);
            safeText('groomTitle', couple[0].description || couple[0].role);
            safeText('groomName', couple[0].name);
            safeText('groomParents', couple[0].parents || 'Putra dari\nBapak Drs. Tampe Malem Tarigan & Ibu Toberina Surbakti');
            safeText('groomInstagram', couple[0].instagram || '@ryan_tarigan');
        }

        if (couple[1]) {
            safeSrc('brideImage', couple[1].image_src);
            safeText('brideTitle', couple[1].description || couple[1].role);
            safeText('brideName', couple[1].name);
            safeText('brideParents', couple[1].parents || 'Putri dari\nBapak Ir. Marthin Luther Brahmana & Ibu Ir. Roslila Br Perangin-angin');
            safeText('brideInstagram', couple[1].instagram || '@aurorapcsa');
        }

        // Default cover slideshow removed to prioritize Opening Page settings
        // renderCoverSlideshow(gallery.slice(0, 5));
        renderGalleryCarousel(gallery);
        renderWishes(wishes);
        renderLoveStory(data.lovestory || [], data.lovestory_settings || {});
        renderGifts(data.gifts || [], settings.gift_physical_address);

        // Update Background Music only if changed to prevent audio interruption
        if (settings.bg_music) {
            const bgMusic = document.getElementById('bgMusic');
            if (bgMusic) {
                const currentMusicPath = bgMusic.getAttribute('data-current-path');
                if (currentMusicPath !== settings.bg_music) {
                    const source = bgMusic.querySelector('source');
                    if (source) source.src = settings.bg_music;
                    else bgMusic.src = settings.bg_music;
                    
                    bgMusic.load();
                    bgMusic.setAttribute('data-current-path', settings.bg_music);
                }
            }
        }
    } catch (error) {
        console.error(error);
    }
}

function renderWishes(wishes) {
    const container = document.getElementById('wishesContainer');
    if (!container) return;
    container.innerHTML = '';
    
    // Get Hero Name for the reply label
    const heroNameElement = document.getElementById('heroName');
    const heroName = heroNameElement ? heroNameElement.innerText : 'Riandino & Aurora';

    wishes.forEach((item) => {
        const guestName = item.guest_name || 'Tamu Undangan';
        const initial = guestName.charAt(0).toUpperCase();
        const date = new Date(item.created_at);
        const timeString = `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        
        let replyHTML = '';
        if (item.reply) {
            const repliedAt = item.replied_at ? new Date(item.replied_at) : null;
            const replyTimeString = repliedAt ? `${repliedAt.toLocaleDateString()} ${repliedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : '';
            replyHTML = `
                <div class="flex flex-col items-end gap-1 w-full mt-3 pr-2 animate-fadeInUp">
                    <span class="text-white/60 text-[10px] font-sans mr-1 tracking-wide">${heroName} (Admin)</span>
                    <div class="flex gap-2 items-start justify-end w-full">
                        <div class="relative bg-indigo-600/90 backdrop-blur-sm text-white px-5 py-3 rounded-2xl rounded-tr-sm max-w-[85%] shadow-xl border border-white/10">
                            <p class="font-sans text-sm md:text-[15px] leading-relaxed italic">"${item.reply}"</p>
                        </div>
                        <div class="w-8 h-8 shrink-0 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-900 font-bold font-sans text-xs shadow-xl border border-white/20 capitalize">${heroName.charAt(0)}</div>
                    </div>
                    <span class="text-white/40 text-[9px] font-sans mr-12 mt-1">${replyTimeString}</span>
                </div>
            `;
        }

        const wishHTML = `
            <div class="flex flex-col items-start gap-1 w-full mt-6 animate-fadeInUp">
                <span class="text-white/60 text-[10px] font-sans ml-12 tracking-wide">${guestName}</span>
                <div class="flex gap-2 items-end justify-start w-full">
                    <div class="w-8 h-8 shrink-0 bg-white rounded-full flex items-center justify-center text-black font-bold font-sans text-sm shadow-xl border border-white/20">${initial}</div>
                    <div class="relative bg-white/90 backdrop-blur-sm text-black px-5 py-3 rounded-2xl rounded-bl-sm max-w-[80%] shadow-xl border border-white/20">
                        <p class="font-sans text-sm md:text-[15px] leading-relaxed">${item.message.replace(/\n/g, '<br>')}</p>
                    </div>
                </div>
                <span class="text-white/40 text-[9px] font-sans ml-12 mt-1">${timeString}</span>
                ${replyHTML}
            </div>
        `;
        container.insertAdjacentHTML('beforeend', wishHTML);
    });
}

function renderLoveStory(messages, settings) {
    const chatTitle = document.getElementById('lsChatTitle');
    const headerAvatar = document.getElementById('lsHeaderAvatar');
    const chatContainer = document.getElementById('lovestoryChatContainer');

    if (chatTitle && settings.chat_title) chatTitle.innerText = settings.chat_title;
    if (headerAvatar && settings.female_avatar) headerAvatar.src = settings.female_avatar;

    if (!chatContainer) return;
    chatContainer.innerHTML = '';
    
    if (!messages || !messages.length) return;

    messages.forEach(msg => {
        if (msg.type === 'date') {
            chatContainer.insertAdjacentHTML('beforeend', `
                <div class="flex justify-center mt-6 mb-4 animate-fadeInUp">
                    <span class="bg-[#182229] text-[#8696a0] text-[11px] md:text-xs px-3 py-1.5 rounded-lg shadow-sm font-medium">${msg.date_label}</span>
                </div>
            `);
        } else {
            const isFemale = msg.sender === 'female';
            const avatarSrc = isFemale ? (settings.female_avatar || 'img/aurora.jpeg') : (settings.male_avatar || 'img/rian.jpeg');
            const bgClass = isFemale ? 'bg-[#202c33]' : 'bg-[#005c4b]';
            const roundClass = isFemale ? 'rounded-bl-sm' : 'rounded-br-sm';
            const plPr = isFemale ? 'justify-start pr-12 md:pr-20' : 'justify-end pl-12 md:pl-20';
            const doubleCheck = isFemale ? '' : '<i class="fas fa-check-double text-[#53bdeb] text-[12px]"></i>';
            
            const msgHtml = `
                <div class="flex items-end gap-2 w-full ${plPr} animate-fadeInUp">
                    ${isFemale ? `<img src="${avatarSrc}" class="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover shrink-0 ml-1 border-2 border-[#8696a0]/40">` : ''}
                    <div class="${bgClass} text-[#e9edef] p-2.5 md:p-3 rounded-[18px] ${roundClass} shadow-sm relative text-[14px] md:text-[15px]">
                        <p class="leading-snug pr-2">${msg.message}</p>
                        <div class="flex justify-end items-center gap-1 mt-1 -mb-1">
                            <span class="text-[#8696a0] text-[10px] md:text-[11px]">${msg.time}</span>
                            ${doubleCheck}
                        </div>
                    </div>
                    ${!isFemale ? `<img src="${avatarSrc}" class="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover shrink-0 mr-1 border-2 border-[#8696a0]/40">` : ''}
                </div>
            `;
            chatContainer.insertAdjacentHTML('beforeend', msgHtml);
        }
    });
}

function renderGifts(gifts, physicalAddress) {
    const section = document.getElementById('digitalEnvelope');
    const bankContainer = document.getElementById('bankAccountsContainer');
    const physContainer = document.getElementById('physicalAddressContainer');
    const physText = document.getElementById('physicalAddressText');

    if (!section || !bankContainer || !physContainer || !physText) return;

    if ((!gifts || gifts.length === 0) && !physicalAddress) {
        section.classList.add('hidden');
        return;
    }
    
    section.classList.remove('hidden');

    if (gifts && gifts.length > 0) {
        bankContainer.innerHTML = gifts.map(gift => `
            <div class="flex flex-col items-center">
                <div class="${gift.logo_src ? 'w-24 h-12 mb-3' : 'hidden'}">
                    <img src="${gift.logo_src}" alt="${gift.bank_name}" class="w-full h-full object-contain" onerror="this.src=''; this.parentElement.className='hidden'">
                </div>
                ${!gift.logo_src ? `<p class="font-sans font-bold text-xl mb-1 text-[#e6d5b8] tracking-widest">${gift.bank_name}</p>` : ''}
                <p class="font-sans text-[14px] md:text-[15px] font-semibold tracking-[0.15em] text-[#e6d5b8] uppercase mb-1 drop-shadow-md">${gift.logo_src ? gift.bank_name + ' &mdash; ' : ''}<span id="account-${gift.id}">${gift.account_number}</span></p>
                <p class="font-sans text-[11px] md:text-xs font-medium tracking-[0.2em] text-[#e6d5b8]/70 uppercase mt-2 mb-6">${gift.account_name}</p>
                <button onclick="window.copyToClipboard('${gift.account_number}')" class="backdrop-blur-md bg-black/40 hover:bg-black/60 border border-[#988a70]/50 text-[#f3e3c6] px-8 py-3 rounded-full font-sans text-xs tracking-[0.2em] uppercase transition-all shadow-2xl inline-flex items-center gap-3">
                    <i class="far fa-clone text-sm"></i> Salin Rekening
                </button>
            </div>
        `).join(''); 
    }

    if (physicalAddress && physicalAddress.trim() !== '') {
        physContainer.classList.remove('hidden');
        physText.innerText = physicalAddress;
        window.giftPhysicalAddressVal = physicalAddress; 
    } else {
        physContainer.classList.add('hidden');
    }
}

window.copyToClipboard = function(text) {
    navigator.clipboard.writeText(text).then(() => {
        showModal('Disalin!', 'Teks berhasil disalin ke clipboard.', 'success');
    }).catch(err => {
        showModal('Oops!', 'Tidak dapat menyalin. Browser tidak mendukung.', 'error');
    });
};

window.copyPhysicalAddress = function() {
    if(!window.giftPhysicalAddressVal) return;
    window.copyToClipboard(window.giftPhysicalAddressVal);
};

let coverInterval;
function renderCoverSlideshow(slides) {
    const container = document.getElementById('coverSlideshow');
    if (!container || !slides.length) return;
    container.innerHTML = '';
    slides.forEach((slide, index) => {
        const img = document.createElement('img');
        img.src = slide.src;
        img.className = `slide ${index === 0 ? 'active' : ''}`;
        container.appendChild(img);
    });
    if (coverInterval) clearInterval(coverInterval);

    const slideElements = container.querySelectorAll('.slide');
    let currentActive = 0;
    if (slideElements.length > 1) {
        coverInterval = setInterval(() => {
            slideElements[currentActive].classList.remove('active');
            currentActive = (currentActive + 1) % slideElements.length;
            slideElements[currentActive].classList.add('active');
        }, 3000);
    }
}

let galleryState = { currentIndex: 0, slides: [] };
function renderGalleryCarousel(gallery) {
    const section = document.getElementById('gallery');
    if (section) {
        if (!gallery || gallery.length === 0) {
            section.style.display = 'none';
            return;
        } else {
            section.style.display = 'block';
        }
    }

    const track = document.getElementById('carouselTrack');
    const thumbnailsContainer = document.getElementById('carouselThumbnails');
    if (!track || !thumbnailsContainer) return;
    track.innerHTML = '';
    thumbnailsContainer.innerHTML = '';
    galleryState.slides = gallery;
    galleryState.currentIndex = 0;

    gallery.forEach((item, index) => {
        const slide = document.createElement('div');
        slide.className = 'min-w-full h-full overflow-hidden';
        slide.innerHTML = `<img src="${item.src}" alt="${item.alt}" class="w-full h-full object-cover">`;
        track.appendChild(slide);

        const thumb = document.createElement('div');
        thumb.className = `thumb-item ${index === 0 ? 'active' : ''}`;
        thumb.dataset.index = index;
        thumb.innerHTML = `<img src="${item.src}" alt="${item.alt}">`;
        thumbnailsContainer.appendChild(thumb);
        thumb.addEventListener('click', () => {
            galleryState.currentIndex = index;
            updateGalleryCarousel(true);
            resetGalleryTimer();
        });
    });
    updateGalleryCarousel(true);
    startGalleryTimer();
}

function updateGalleryCarousel(skipScroll = false) {
    const track = document.getElementById('carouselTrack');
    const thumbnailsContainer = document.getElementById('carouselThumbnails');
    if (!track || !thumbnailsContainer) return;
    const thumbs = thumbnailsContainer.querySelectorAll('.thumb-item');
    track.style.transform = `translateX(-${galleryState.currentIndex * 100}%)`;

    thumbs.forEach((thumb, idx) => {
        if (idx === galleryState.currentIndex) {
            thumb.classList.add('active');
            if (!skipScroll) {
                const scrollLeft = thumb.offsetLeft - (thumbnailsContainer.offsetWidth / 2) + (thumb.offsetWidth / 2);
                thumbnailsContainer.scrollTo({ left: scrollLeft, behavior: 'smooth' });
            }
        } else {
            thumb.classList.remove('active');
        }
    });
}

let galleryTimer;
function startGalleryTimer() {
    clearInterval(galleryTimer);
    if (!galleryState.slides.length) return;
    galleryTimer = setInterval(() => {
        galleryState.currentIndex = (galleryState.currentIndex + 1) % galleryState.slides.length;
        updateGalleryCarousel();
    }, 4000);
}

function resetGalleryTimer() {
    clearInterval(galleryTimer);
    startGalleryTimer();
}

function handleRsvpSubmit(e) {
    e.preventDefault();
    if (!currentGuest) {
        showModal('Perhatian', 'Gunakan link undangan unik Anda untuk mengisi konfirmasi kehadiran.', 'warning');
        return;
    }

    if (currentGuest.rsvp_status) {
        showModal('Perhatian', 'Anda sudah melakukan konfirmasi kehadiran sebelumnya.', 'warning');
        return;
    }

    const status = 'Hadir';
    const guestCount = document.getElementById('rsvpCount').value.trim();

    if (!guestCount) {
        showModal('Perhatian', 'Isi jumlah tamu terlebih dahulu.', 'warning');
        return;
    }

    fetch(API_RSVP, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guest_token: currentGuest.token, status, guest_count: guestCount })
    })
    .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
            showModal('Oops!', data.error || 'Gagal mengirim RSVP', 'error');
            return;
        }
        showModal('Terima Kasih!', 'Konfirmasi kehadiran Anda telah tersimpan.', 'success');
        await loadPublicData(); // Reload to update UI status
    })
    .catch((err) => {
        console.error(err);
        showModal('Oops!', 'Tidak dapat mengirim RSVP sekarang. Silakan coba lagi.', 'error');
    });
}

function submitWish() {
    if (!currentGuest) {
        showModal('Perhatian', 'Gunakan link undangan unik Anda untuk mengirim ucapan.', 'warning');
        return;
    }

    const message = document.getElementById('wishMessage').value.trim();
    if (!message) return;

    fetch(API_WISHES, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guest_token: currentGuest.token, message })
    })
    .then(async (res) => {
        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.error || 'Gagal mengirim pesan');
        }
        await res.json();
        document.getElementById('wishMessage').value = '';
        document.getElementById('charCount').innerText = '300';
        await loadPublicData();
        showModal('Terima Kasih!', 'Pesan ucapan Anda berhasil terkirim.', 'success');
    })
    .catch((err) => {
        console.error(err);
        showModal('Oops!', err.message || 'Tidak dapat mengirim pesan sekarang. Silakan coba lagi.', 'error');
    });
}

function handleScrollLinks() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

let targetDate = new Date('June 26, 2026 14:00:00').getTime();
function updateCountdown() {
    const now = Date.now();
    const distance = targetDate - now;
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minsEl = document.getElementById('minutes');
    const secsEl = document.getElementById('seconds');
    if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

    if (distance < 0) {
        daysEl.innerText = '00';
        hoursEl.innerText = '00';
        minsEl.innerText = '00';
        secsEl.innerText = '00';
        return;
    }

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.innerText = String(d).padStart(2, '0');
    hoursEl.innerText = String(h).padStart(2, '0');
    minsEl.innerText = String(m).padStart(2, '0');
    secsEl.innerText = String(s).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();



function updateGuestForms() {
    // Universal fallback for RSVP caption
    const defaultRsvpMsg = (window.invitationSettings && window.invitationSettings.rsvp_caption) 
        ? window.invitationSettings.rsvp_caption 
        : 'Silakan isi kehadiran dan ucapan Anda untuk langsung mengisi konfirmasi.';

    const guestMessage = currentGuest 
        ? `Halo ${currentGuest.name}, ${defaultRsvpMsg}` 
        : defaultRsvpMsg;
    const disabled = !currentGuest;
    const hasRsvp = currentGuest && currentGuest.rsvp_status;

    const guestNoticeRsvp = document.getElementById('guestNoticeRsvp');
    const guestNoticeWish = document.getElementById('guestNoticeWish');
    const rsvpCount = document.getElementById('rsvpCount');
    const rsvpSubmit = document.querySelector('#rsvpForm button[type="submit"]');
    const wishSubmit = document.querySelector('#wishesForm button');

    if (guestNoticeRsvp) guestNoticeRsvp.innerText = guestMessage;
    if (guestNoticeWish) guestNoticeWish.innerText = guestMessage;
    
    if (rsvpCount) {
        rsvpCount.disabled = disabled || hasRsvp;
        if (hasRsvp) rsvpCount.value = currentGuest.rsvp_guest_count;
    }
    
    if (rsvpSubmit) {
        rsvpSubmit.disabled = disabled || hasRsvp;
        if (hasRsvp) {
            rsvpSubmit.innerText = 'SUDAH KONFIRMASI';
            rsvpSubmit.classList.add('opacity-50', 'cursor-not-allowed');
        } else {
            rsvpSubmit.innerText = 'Konfirmasi Kehadiran';
            rsvpSubmit.classList.remove('opacity-50', 'cursor-not-allowed');
        }
    }
    
    if (wishSubmit) wishSubmit.disabled = disabled;
}

function setupPage() {
    const cover = document.getElementById('cover');
    const mainContent = document.getElementById('mainContent');
    const openBtn = document.getElementById('openInvitation');
    const musicBtn = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    let isPlaying = false;

    if (openBtn) {
        openBtn.addEventListener('click', () => {
            document.body.classList.remove('overflow-hidden');
            if (cover) cover.classList.add('cover-out');
            if (mainContent) {
                mainContent.classList.remove('opacity-0');
                mainContent.classList.add('opacity-100');
            }
            if (bgMusic) {
                // Check if autoplay is enabled in settings
                const isAutoPlay = window.invitationSettings?.music_autoplay !== 'false';
                
                if (isAutoPlay) {
                    const startTime = parseFloat(window.invitationSettings?.music_start_time || 0);
                    bgMusic.currentTime = startTime;
                    
                    bgMusic.play().then(() => {
                        isPlaying = true;
                        if (musicBtn) {
                            musicBtn.innerHTML = '<i class="fas fa-volume-up text-lg"></i>';
                            musicBtn.classList.remove('opacity-0', 'pointer-events-none');
                        }
                    }).catch(err => {
                        console.log("Autoplay blocked by browser. User must interact again.");
                        // Fallback: make music button visible so they can start manually if needed
                        if (musicBtn) musicBtn.classList.remove('opacity-0', 'pointer-events-none');
                    });
                } else {
                    // If autoplay is off, just show the music toggle so they can play manually
                    if (musicBtn) musicBtn.classList.remove('opacity-0', 'pointer-events-none');
                }
            }
            window.scrollTo(0, 0);
            setTimeout(() => {
                AOS.init({ duration: 1000, easing: 'ease-in-out', once: true, mirror: false });
            }, 100);
        });
    }

    if (musicBtn && bgMusic) {
        musicBtn.addEventListener('click', () => {
            if (isPlaying) {
                bgMusic.pause();
                musicBtn.innerHTML = '<i class="fas fa-volume-xmark text-lg"></i>';
            } else {
                bgMusic.play();
                musicBtn.innerHTML = '<i class="fas fa-volume-up text-lg"></i>';
            }
            isPlaying = !isPlaying;
        });
    }

    const rsvpForm = document.getElementById('rsvpForm');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', handleRsvpSubmit);
    }

    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
                scrollToTopBtn.classList.add('opacity-100');
            } else {
                scrollToTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
                scrollToTopBtn.classList.remove('opacity-100');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

window.submitWish = submitWish;

// Track page view when invitation is opened
async function trackPageView() {
    try {
        await fetch('/api/pageview', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                guest_token: guestToken || null,
                page: 'invitation'
            })
        });
    } catch (e) {
        // Silently fail — tracking is non-critical
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setupPage();
    handleScrollLinks();
    loadPublicData();

    trackPageView();
});

// Global function (accessible from onclick attributes)
window.saveToCalendar = () => {
    const title = encodeURIComponent('Pemberkatan & Resepsi Riandino & Aurora');
    const details = encodeURIComponent('Pemberkatan: GBKP KM 7 (14:00 WIB, 26 Juni), Resepsi: Jambur Namaken (07:00 WIB, 27 Juni)');
    const location = encodeURIComponent('GBKP KM 7, Jambur Namaken');
    const dates = '20260626T070000Z/20260627T100000Z';
    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
    window.open(googleUrl, '_blank');
};

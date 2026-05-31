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

function applyBg(elId, img, color, isFixed = true) {
    const el = document.getElementById(elId);
    if (!el) return;
    
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    
    if (isIOS) {
        document.body.classList.add('is-ios');
    }
    
    if (img) {
        el.style.backgroundImage = `url('${img}')`;
        el.style.backgroundPosition = 'center';
        el.style.backgroundSize = 'cover';
        el.style.backgroundRepeat = 'no-repeat';
        el.style.backgroundAttachment = (isFixed && !isIOS) ? 'fixed' : 'scroll';
        // Reset background color if it was set before
        if (!color) el.style.backgroundColor = 'transparent';
    } else if (color) {
        el.style.backgroundImage = 'none';
        el.style.background = color; // Keep shorthand for color/gradient
    } else {
        el.style.backgroundImage = 'none';
        el.style.backgroundColor = '#000000';
    }
}

window.applyBg = applyBg;

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

function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast-premium toast-${type}`;
    
    let icon = 'fa-info-circle';
    if (type === 'success') icon = 'fa-check-circle';
    if (type === 'error') icon = 'fa-exclamation-circle';
    if (type === 'warning') icon = 'fa-exclamation-triangle';

    toast.innerHTML = `
        <i class="fas ${icon}"></i>
        <span class="flex-1">${message}</span>
    `;

    container.appendChild(toast);

    // Animate in
    setTimeout(() => toast.classList.add('show'), 10);

    // Auto remove
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 4000);
}

window.showToast = showToast;

function safeText(id, value) {
    const el = document.getElementById(id);
    if (el) {
        // If it's a specific field like name or parents, and it's empty, use '-'
        el.innerText = (value && value.trim() !== '') ? value : '';
    }
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
        safeText('coverTitle', settings.cover_title || '-');
        safeText('coverSubtitle', settings.cover_subtitle || '-');
        safeText('heroName', settings.hero_name || '-');
        safeText('guestPrefix', settings.guest_prefix || '-');
        safeText('eventHeaderTitle', settings.event_header_title || 'Wedding Event');
        safeText('eventHeaderQuote', settings.event_header_quote || 'Kami sangat berharap kehadiran Anda dalam momen spesial kami.');
        safeText('wishesTitle', settings.wishes_title || 'Wedding Wishes');
        safeText('wishesQuote', settings.wishes_quote || '');
        safeText('rsvpTitle', settings.rsvp_header_title || 'Kehadiran');
        safeText('rsvpQuote', settings.rsvp_header_quote || '');
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
        if (greetingHeadingEl) greetingHeadingEl.textContent = settings.greeting_heading || '';
        const greetingQuoteEl = document.getElementById('greetingQuote');
        if (greetingQuoteEl) greetingQuoteEl.textContent = settings.greeting_quote || '';
        const greetingInvitationEl = document.getElementById('greetingInvitation');
        if (greetingInvitationEl) greetingInvitationEl.textContent = settings.greeting_invitation || '';

        // Apply Backgrounds with priority logic


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
                    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
                    greetingEl.style.background = `url('${greetingImgs[0]}') center/cover no-repeat ${isIOS ? 'scroll' : 'fixed'}`;
                } else {
                    greetingEl.style.background = settings.greeting_bg_color || '#000000';
                }
            } else {
                greetingEl.style.background = settings.greeting_bg_color || '#000000';
            }
        }

        // Couple Section Title
        const coupleSectionTitleEl = document.getElementById('coupleSectionTitle');
        if (coupleSectionTitleEl) {
            const title = (settings.couple_section_title || '').trim();
            
            if (title === '' || title === '-') {
                coupleSectionTitleEl.innerText = '-';
                coupleSectionTitleEl.style.display = 'flex';
                coupleSectionTitleEl.style.justifyContent = 'center';
                coupleSectionTitleEl.style.width = '100%';
                coupleSectionTitleEl.className = 'text-[#F5A623] text-5xl md:text-7xl font-script';
            } else if (title.includes('&')) {
                const parts = title.split('&');
                const p1 = parts[0].trim();
                const p2 = parts[1] ? parts[1].trim() : '';
                
                coupleSectionTitleEl.style.display = 'flex';
                coupleSectionTitleEl.innerHTML = `
                    <span class="relative text-7xl md:text-9xl z-10">
                        ${p1}
                        ${p2 ? `<span class="absolute top-1/2 -right-8 md:-right-14 translate-y-[-25%] text-5xl md:text-4xl italic opacity-90 z-20">&</span>` : ''}
                    </span>
                    ${p2 ? `<span class="text-7xl md:text-9xl ml-24 md:ml-36 -mt-6 md:-mt-10 relative z-10">${p2}</span>` : ''}
                `;
                coupleSectionTitleEl.className = 'text-[#F5A623] leading-none tracking-normal drop-shadow-xl relative flex flex-col items-start font-script';
            } else {
                coupleSectionTitleEl.innerText = title;
                coupleSectionTitleEl.style.display = 'flex';
                coupleSectionTitleEl.style.justifyContent = 'center';
                coupleSectionTitleEl.className = 'text-[#F5A623] text-6xl md:text-8xl leading-none tracking-normal drop-shadow-xl text-center w-full font-script';
            }
        }

        // Couple Section Background
        const coupleSection = document.getElementById('couple');
        const coupleBefore = document.querySelector('#couple::before') || { style: {} }; // For pseudo-element we use CSS variable
        
        if (coupleSection) {
            const coupleMode = settings.couple_bg_mode || 'color';
            const coupleBgImg = settings.couple_bg_img || '';
            const coupleBgColor = settings.couple_bg_color || '#000000';
            const groomBg = document.getElementById('groomBg');
            const brideBg = document.getElementById('brideBg');

            if (coupleMode === 'image' && coupleBgImg) {
                const imgUrl = coupleBgImg.split(',')[0];
                coupleSection.style.setProperty('--couple-bg', `url('${imgUrl}')`);
                coupleSection.classList.add('show-before');
                coupleSection.style.backgroundColor = 'transparent';
                
                // Also apply to backgrounds for mobile
                if (groomBg) groomBg.style.setProperty('--half-bg', `url('${imgUrl}')`);
                if (brideBg) brideBg.style.setProperty('--half-bg', `url('${imgUrl}')`);
            } else {
                coupleSection.classList.remove('show-before');
                coupleSection.style.setProperty('--couple-bg', 'none');
                if (groomBg) groomBg.style.setProperty('--half-bg', 'none');
                if (brideBg) brideBg.style.setProperty('--half-bg', 'none');

                if (coupleBgColor.includes('gradient')) {
                    coupleSection.style.background = coupleBgColor;
                } else {
                    coupleSection.style.background = '';
                    coupleSection.style.backgroundColor = coupleBgColor;
                }
            }
        }




        // Event Section Background Mode Handling
        const eventSection = document.getElementById('events');
        const lovestoryEl = document.getElementById('lovestory');
        const sharedWrapper = document.getElementById('sharedEventWrapper');
        
        const eMode = eventSection ? (settings.event_bg_mode || 'color') : 'color';
        const eBgImg = eventSection ? (settings.event_bg || '') : '';
        const eBgColor = eventSection ? (settings.event_bg_color || '#000000') : '#000000';

        const lsSettings = data.lovestory_settings || {};
        const lsBgImg = (lsSettings.lovestory_bg_mode === 'image') ? (lsSettings.lovestory_bg_img || '') : '';
        const lsBgColor = lsSettings.lovestory_bg || '#000000';

        // Check if both sections have the SAME image background
        const bothUseImage = (eMode === 'image' && eBgImg && lsBgImg);
        const sameImage = bothUseImage && (eBgImg.trim() === lsBgImg.trim());

        if (sharedWrapper) {
            if (sameImage) {
                // === SAME BACKGROUND: Use wrapper as single unified fixed background ===
                sharedWrapper.classList.add('shared-bg');
                sharedWrapper.style.backgroundImage = `url('${eBgImg}')`;
                sharedWrapper.style.setProperty('--shared-bg-img', `url('${eBgImg}')`);

                // Make both child sections transparent (CSS handles this, but reinforce via JS)
                if (eventSection) {
                    eventSection.style.backgroundImage = 'none';
                    eventSection.style.backgroundColor = 'transparent';
                    eventSection.style.removeProperty('--events-bg-img');
                }
                if (lovestoryEl) {
                    lovestoryEl.style.backgroundImage = 'none';
                    lovestoryEl.style.backgroundColor = 'transparent';
                    lovestoryEl.style.removeProperty('--lovestory-bg-img');
                }
            } else {
                // === DIFFERENT BACKGROUNDS: Each section has its own fixed background ===
                sharedWrapper.classList.remove('shared-bg');
                sharedWrapper.style.backgroundImage = 'none';
                sharedWrapper.style.removeProperty('--shared-bg-img');

                // Apply events background
                if (eventSection) {
                    if (eMode === 'image' && eBgImg) {
                        applyBg('events', eBgImg, null);
                        eventSection.style.setProperty('--events-bg-img', `url('${eBgImg}')`);
                    } else {
                        applyBg('events', null, eBgColor);
                        eventSection.style.setProperty('--events-bg-img', 'none');
                    }
                }

                // Apply lovestory background
                if (lovestoryEl) {
                    if (lsSettings.lovestory_bg_mode === 'image' && lsBgImg) {
                        applyBg('lovestory', lsBgImg, null);
                        lovestoryEl.style.setProperty('--lovestory-bg-img', `url('${lsBgImg}')`);
                    } else {
                        applyBg('lovestory', null, lsBgColor);
                        lovestoryEl.style.setProperty('--lovestory-bg-img', 'none');
                    }
                }
            }
        }

        applyBg('gallery', settings.gallery_bg_img, settings.gallery_bg_color);


        // Card Background (Dalam Chat)
        if (lsSettings.lovestory_card_bg_mode === 'image' && lsSettings.lovestory_card_bg_img) {
            applyBg('lovestoryChatArea', lsSettings.lovestory_card_bg_img, null, false); // Not fixed for inner area
        } else {
            applyBg('lovestoryChatArea', null, lsSettings.lovestory_card_bg || 'rgba(11,20,26,0.88)', false);
        }

        applyBg('digitalEnvelope', settings.gift_bg_img, settings.gift_bg_color);
        
        // Gallery Title Update
        const galleryTitleEl = document.getElementById('galleryTitle');
        if (galleryTitleEl) {
            galleryTitleEl.innerText = settings.gallery_title || 'Sweet Moments';
        }

        // Wishes (Ucapan) Mode Handling

        const wishesSection = document.getElementById('sectionWishes');
        if (wishesSection) {
            const mode = settings.wishes_bg_mode || 'color';
            if (mode === 'image' && settings.wishes_bg_img) {
                const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
                wishesSection.style.background = `url('${settings.wishes_bg_img}') center/cover no-repeat ${isIOS ? 'scroll' : 'fixed'}`;
            } else {
                wishesSection.style.background = settings.wishes_bg_color || '#000000';
            }
        }

        const rsvpSection = document.getElementById('sectionRsvp');
        if (rsvpSection) {
            const rMode = settings.rsvp_bg_mode || 'color';
            if (rMode === 'image' && settings.rsvp_bg_img) {
                const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
                rsvpSection.style.background = `url('${settings.rsvp_bg_img}') center/cover no-repeat ${isIOS ? 'scroll' : 'fixed'}`;
            } else {
                const rBgColor = settings.rsvp_bg_color || '#000000';
                if (rBgColor.includes('gradient')) {
                    rsvpSection.style.background = rBgColor;
                } else {
                    rsvpSection.style.background = '';
                    rsvpSection.style.backgroundColor = rBgColor;
                }
            }
        }

        const nameEl = document.getElementById('guestName');
        const jabatanEl = document.getElementById('guestJabatan');
        const guestNameStr = currentGuest?.name || settings.guest_label || '-';
        if (nameEl) {
            nameEl.innerText = guestNameStr;
            const adjustFontSize = () => {
                nameEl.style.fontSize = ''; 
                document.fonts.ready.then(() => {
                    // Script fonts often have long tails/swashes that overflow the exact bounding box.
                    // Use 85% on mobile and 90% on desktop to leave a safe margin so edges aren't cut off.
                    let containerWidth = window.innerWidth < 768 ? (window.innerWidth * 0.85) : (window.innerWidth * 0.90);
                    
                    let size = parseFloat(window.getComputedStyle(nameEl).fontSize) || (window.innerWidth < 768 ? 42 : 72);
                    let minSize = window.innerWidth < 768 ? 14 : 32; // Lowered minSize to allow very long names to fit
                    
                    let lastScrollWidth = nameEl.scrollWidth;
                    
                    while (nameEl.scrollWidth > containerWidth && size > minSize) {
                        size -= 1;
                        nameEl.style.fontSize = size + 'px';
                        
                        // Prevent infinite loop if size reduction doesn't reduce scrollWidth
                        if (nameEl.scrollWidth >= lastScrollWidth && size < (lastScrollWidth/2)) break;
                        lastScrollWidth = nameEl.scrollWidth;
                    }
                    
                    // Reveal smoothly after sizing is done
                    nameEl.classList.remove('opacity-0');
                    nameEl.classList.add('opacity-100');
                });
            };
            adjustFontSize();
            window.addEventListener('resize', adjustFontSize);
        }
        if (jabatanEl) {
            if (currentGuest?.jabatan) {
                jabatanEl.innerText = currentGuest.jabatan;
                jabatanEl.classList.remove('hidden');
            } else {
                jabatanEl.classList.add('hidden');
            }
        }
        updateGuestForms();

        renderPublicEvents(events);

        const isImageValid = (src) => {
            if (!src) return false;
            const s = src.toLowerCase();
            if (s.includes('ui-avatars.com')) return false;
            if (s.includes('rian.jpeg') || s.includes('aurora.jpeg')) return false; 
            return src.trim() !== '';
        };

        if (couple[0]) {
            const img = document.getElementById('groomImage');
            const placeholder = document.getElementById('groomPlaceholder');
            if (img && placeholder) {
                if (isImageValid(couple[0].image_src)) {
                    img.src = couple[0].image_src;
                    img.style.opacity = '1';
                    placeholder.style.display = 'none';
                } else {
                    img.src = ''; // Clear broken src
                    img.style.opacity = '0';
                    placeholder.style.display = 'flex';
                }
            }
            safeText('groomTitle', couple[0].description || couple[0].role);
            safeText('groomName', couple[0].name);
            safeText('groomParents', couple[0].parents);
            safeText('groomInstagram', couple[0].instagram);
            safeText('groomInstagramAlt', couple[0].instagram);
            safeHref('groomInstagramLink', couple[0].instagram_link);
            safeHref('groomInstagramLinkAlt', couple[0].instagram_link);
        }

        if (couple[1]) {
            const img = document.getElementById('brideImage');
            const placeholder = document.getElementById('bridePlaceholder');
            if (img && placeholder) {
                if (isImageValid(couple[1].image_src)) {
                    img.src = couple[1].image_src;
                    img.style.opacity = '1';
                    placeholder.style.display = 'none';
                } else {
                    img.src = ''; // Clear broken src
                    img.style.opacity = '0';
                    placeholder.style.display = 'flex';
                }
            }
            safeText('brideTitle', couple[1].description || couple[1].role);
            safeText('brideName', couple[1].name);
            safeText('brideParents', couple[1].parents);
            safeText('brideInstagram', couple[1].instagram);
            safeText('brideInstagramAlt', couple[1].instagram);
            safeHref('brideInstagramLink', couple[1].instagram_link);
            safeHref('brideInstagramLinkAlt', couple[1].instagram_link);
        }




        // Default cover slideshow removed to prioritize Opening Page settings
        // renderCoverSlideshow(gallery.slice(0, 5));
        try { renderGalleryCarousel(gallery); } catch(e) { console.error('Gallery failed:', e); }
        try { renderWishes(wishes); } catch(e) { console.error('Wishes failed:', e); }
        try { renderLoveStory(data.lovestory || [], data.lovestory_settings || {}); } catch(e) { console.error('LoveStory failed:', e); }
        try { renderGifts(data.gifts || [], settings.gift_physical_address, settings); } catch(e) { console.error('Gifts failed:', e); }

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

function renderPublicEvents(events) {
    const grid = document.getElementById('eventsGrid');
    if (!grid) return;
    grid.innerHTML = '';

    // Handle targetDate for countdown (Find first future event)
    const now = Date.now();
    let foundTarget = false;

    for (const event of events) {
        if (!event) continue;
        
        let timeStr = '00:00:00';
        if (event.time) {
            const timeMatch = event.time.match(/(\d{1,2})[.:](\d{2})/);
            if (timeMatch) timeStr = `${timeMatch[1].padStart(2, '0')}:${timeMatch[2]}:00`;
        }

        let parsedDate = NaN;
        if (event.date_iso) {
            // Use ISO format for better cross-browser support
            parsedDate = new Date(`${event.date_iso}T${timeStr}`).getTime();
        }
        
        // Fallback smart parser for Indonesian text date
        if (isNaN(parsedDate) && event.date) {
            const monthsID = {'januari':'01', 'februari':'02', 'maret':'03', 'april':'04', 'mei':'05', 'juni':'06', 'juli':'07', 'agustus':'08', 'september':'09', 'oktober':'10', 'november':'11', 'desember':'12'};
            const dParts = event.date.replace(/,/g, '').split(' ');
            let day = '', month = '', year = '';
            dParts.forEach(p => {
                if (!isNaN(p) && p.length <= 2) day = p.padStart(2, '0');
                if (!isNaN(p) && p.length === 4) year = p;
                if (isNaN(p) && monthsID[p.toLowerCase()]) month = monthsID[p.toLowerCase()];
            });
            if (day && month && year) {
                // Use a standard format YYYY-MM-DD
                parsedDate = new Date(`${year}-${month}-${day}T${timeStr}`).getTime();
            }
        }

        if (!isNaN(parsedDate) && parsedDate > now) {
            targetDate = parsedDate;
            foundTarget = true;
            break; 
        }
    }

    const displayEvents = [null, null];
    if (events[0]) displayEvents[0] = events[0];
    if (events[1]) displayEvents[1] = events[1];

    displayEvents.forEach((event, i) => {
        let html = '';
        if (event && (event.name || event.location_name)) {
            // Check if it has any data worth displaying
            const hasData = (event.name || event.location_name || event.address || event.date);
            
            if (hasData) {
                html = `
                    <div class="flex flex-col items-center group w-full bg-black/50 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-2xl shadow-xl transition-all duration-300 hover:scale-105" data-aos="fade-up" data-aos-delay="${i === 0 ? '100' : '300'}">
                        <div class="w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/20 flex items-center justify-center mb-6 group-hover:border-white transition-colors duration-500 bg-white/5 backdrop-blur-sm">
                            <img src="${event.icon_src || (i === 0 ? 'img/icon/Gereja.png' : 'img/icon/Traditional%20Batak%20house%20icon.png')}" class="w-8 h-8 md:w-10 md:h-10 object-contain filter brightness-0 invert opacity-70 group-hover:opacity-100 transition-opacity duration-500" alt="Icon">
                        </div>
                        <h4 class="font-sans font-semibold uppercase tracking-[0.25em] text-lg md:text-xl mb-6 pb-3 border-b border-white/20 text-[#F5A623]">${event.heading || event.name || '-'}</h4>
                        <p class="font-sans font-medium text-white/90 text-xl md:text-2xl mb-2">${event.time || '-'}</p>
                        <p class="font-sans font-light text-white/60 mb-8 tracking-wider text-base md:text-lg">${event.date || '-'}</p>
                        <div class="font-sans font-medium text-[#F5A623] uppercase tracking-[0.1em] bg-white/5 py-1.5 px-5 rounded-full border border-white/10 text-[10px] md:text-xs flex items-center justify-center">
                           ${event.location_name || '-'}
                        </div>
                        <p class="font-sans font-light text-white/60 mt-4 tracking-wider text-[11px] md:text-sm">${event.address || '-'}</p>
                        ${event.map_src ? `
                        <div class="mt-8 w-full h-48 md:h-64 rounded-xl overflow-hidden border border-white/20 bg-[#111]">
                            <iframe src="${event.map_src}" width="100%" height="100%" style="border:0; filter: invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2);" allowfullscreen="" loading="lazy"></iframe>
                        </div>
                        ` : ''}
                        ${event.map_link ? `
                        <a href="${event.map_link}" target="_blank" class="mt-6 inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/30 px-6 py-2.5 rounded-full hover:bg-white hover:text-black transition-all duration-500 uppercase tracking-widest text-[9px] md:text-[11px] font-sans font-semibold group">
                            <i class="fa-solid fa-map-location-dot group-hover:scale-110 transition-transform duration-300"></i>
                            <span>Lihat Lokasi</span>
                        </a>
                        ` : ''}
                    </div>
                `;
            } else {
                html = renderStripedPlaceholder(i);
            }
        } else {
            html = renderStripedPlaceholder(i);
        }
        grid.insertAdjacentHTML('beforeend', html);
    });

    // Re-initialize AOS for dynamic content
    if (window.AOS) AOS.refresh();
}

function renderStripedPlaceholder(index) {
    return `
        <div class="no-data-card w-full" data-aos="fade-up" data-aos-delay="${index === 0 ? '100' : '300'}">
            <div class="striped-bg">
                <div class="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center mb-6 bg-white/5 opacity-20">
                    <i class="fas ${index === 0 ? 'fa-ring' : 'fa-utensils'} text-2xl text-white"></i>
                </div>
                <p class="font-sans font-bold uppercase tracking-widest text-white/30 text-sm mb-1">Acara ${index === 0 ? 'Utama' : 'Tambahan'}</p>
                <p class="font-serif italic text-white/20 text-lg">Data belum tersedia</p>
            </div>
        </div>
    `;
}

function renderWishes(wishes) {
    const container = document.getElementById('wishesContainer');
    if (!container) return;
    container.innerHTML = '';
    
    // Get Hero Name for the reply label
    const heroNameElement = document.getElementById('heroName');
    const heroName = heroNameElement ? heroNameElement.innerText : 'Riandino & Aurora';

    let lastGuestName = null;
    let lastDateLabel = null;

    wishes.forEach((item, index) => {
        const guestName = item.guest_name || 'Tamu Undangan';
        const initial = guestName.charAt(0).toUpperCase();
        const date = new Date(item.created_at);
        
        // Date Separator Logic (e.g., May 20)
        const dateLabel = date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
        if (dateLabel !== lastDateLabel) {
            container.insertAdjacentHTML('beforeend', `
                <div class="flex justify-center mt-10 mb-6 animate-fadeInUp">
                    <div class="flex items-center gap-4 w-full">
                        <div class="h-[1px] flex-1 bg-white/10"></div>
                        <span class="text-white/40 text-[10px] md:text-xs font-sans tracking-[0.2em] uppercase font-bold">
                            ${dateLabel}
                        </span>
                        <div class="h-[1px] flex-1 bg-white/10"></div>
                    </div>
                </div>
            `);
            lastDateLabel = dateLabel;
            lastGuestName = null; // Reset stacking on new day
        }

        const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        // Look ahead and behind to determine position in stack
        const prevItem = wishes[index - 1];
        const nextItem = wishes[index + 1];
        const isFirstInStack = !prevItem || (prevItem.guest_name || 'Tamu Undangan') !== guestName || !!prevItem.reply || (new Date(prevItem.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) !== dateLabel);
        const isLastInStack = !nextItem || (nextItem.guest_name || 'Tamu Undangan') !== guestName || !!item.reply || (new Date(nextItem.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) !== dateLabel);

        let replyHTML = '';
        if (item.reply) {
            const repliedAt = item.replied_at ? new Date(item.replied_at) : null;
            const replyTimeString = repliedAt ? repliedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
            replyHTML = `
                <div class="flex flex-col items-end gap-1 w-full mt-2 pr-1 md:pr-2 animate-fadeInUp">
                    <div class="flex items-center gap-2 mr-1">
                        <span class="text-white/40 text-[7px] md:text-[9px] font-sans">${replyTimeString}</span>
                        <span class="text-white/60 text-[8px] md:text-[10px] font-sans tracking-wide font-medium">${heroName}</span>
                    </div>
                    <div class="flex gap-1 md:gap-2 items-start justify-end w-full">
                        <div class="relative bg-blue-600/90 backdrop-blur-sm text-white px-2.5 py-1.5 md:px-5 md:py-3 rounded-2xl rounded-tr-sm max-w-[85%] shadow-xl border border-white/10">
                            <p class="font-sans text-[11px] md:text-[15px] leading-relaxed italic">"${item.reply}"</p>
                        </div>
                        <div class="w-6 h-6 md:w-8 md:h-8 shrink-0 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-xl border border-white/20 animate-pulse-slow">
                            <i class="fas fa-heart text-[8px] md:text-xs"></i>
                        </div>
                    </div>
                </div>
            `;
        }

        const wishHTML = `
            <div class="flex flex-col items-start gap-0 w-full ${!isFirstInStack ? 'mt-[2px]' : 'mt-4 md:mt-6'} animate-fadeInUp">
                ${isFirstInStack ? `
                <div class="flex items-center gap-2 ml-8 md:ml-12 mb-1">
                    <span class="text-white/60 text-[8px] md:text-[10px] font-sans tracking-wide font-medium">${guestName}</span>
                    <span class="text-white/40 text-[7px] md:text-[9px] font-sans">${timeString}</span>
                </div>` : ''}
                <div class="flex gap-1 md:gap-2 items-end justify-start w-full">
                    <div class="w-6 h-6 md:w-8 md:h-8 shrink-0 ${!isFirstInStack ? 'invisible' : 'bg-white'} rounded-full flex items-center justify-center text-black font-bold font-sans text-[10px] md:text-sm shadow-xl">${initial}</div>
                    <div class="relative bg-white/90 backdrop-blur-sm text-black px-2.5 py-1.5 md:px-5 md:py-3 
                        ${(isFirstInStack && isLastInStack) ? 'rounded-2xl rounded-bl-sm' : 
                          isFirstInStack ? 'rounded-2xl rounded-bl-sm' : 
                          isLastInStack ? 'rounded-2xl rounded-tl-sm' : 
                          'rounded-2xl rounded-bl-sm rounded-tl-sm'} max-w-[80%] shadow-xl border border-white/20">
                        <p class="font-sans text-[11px] md:text-[15px] leading-relaxed">${item.message.replace(/\n/g, '<br>')}</p>
                    </div>
                </div>
                ${replyHTML}
            </div>
        `;
        container.insertAdjacentHTML('beforeend', wishHTML);
        lastGuestName = guestName;
    });
}

function renderLoveStory(messages, settings) {
    const section = document.getElementById('lovestory');
    const chatTitle = document.getElementById('lsChatTitle');
    const headerAvatar = document.getElementById('lsHeaderAvatar');
    const chatContainer = document.getElementById('lovestoryChatContainer');

    if (!section) return;

    if (!messages || !messages.length) {
        section.classList.add('hidden');
        return;
    } else {
        section.classList.remove('hidden');
    }

    if (chatTitle && settings.ls_title) chatTitle.innerText = settings.ls_title;
    
    if (headerAvatar) {
        const hAv = settings.ls_header_avatar || '';
        if (hAv) {
            headerAvatar.src = hAv;
            headerAvatar.style.display = '';
            headerAvatar.classList.remove('hidden');
            const iconEl = document.getElementById('lsHeaderAvatarIcon');
            if (iconEl) iconEl.style.display = 'none';
        } else {
            headerAvatar.classList.add('hidden');
            headerAvatar.style.display = 'none';
            const iconEl = document.getElementById('lsHeaderAvatarIcon');
            if (iconEl) iconEl.style.display = 'flex';
        }
    }

    if (!chatContainer) return;
    chatContainer.innerHTML = '';

    let lastSender = null;

    messages.forEach(msg => {
        if (msg.type === 'date') {
            chatContainer.insertAdjacentHTML('beforeend', `
                <div class="flex justify-center mt-6 mb-3 md:mt-8 md:mb-5 animate-fadeInUp">
                    <span class="bg-[#182229] text-[#8696a0] text-[11px] md:text-xs px-3 py-1 rounded-lg font-sans shadow-sm">
                        ${msg.date_label}
                    </span>
                </div>
            `);
            lastSender = null;
        } else {
            const isStacked = lastSender === msg.sender;
            lastSender = msg.sender;

            const isFemale = msg.sender === 'female';
            const avatarSrc = isFemale ? (settings.ls_female_avatar || '') : (settings.ls_male_avatar || '');
            const bgClass = isFemale ? 'bg-[#202c33]' : 'bg-[#005c4b]';
            const roundClass = isFemale ? 'rounded-tl-none' : 'rounded-tr-none';
            const plPr = isFemale ? 'justify-start pl-2' : 'justify-end pr-2';
            const doubleCheck = isFemale ? '' : '<i class="fas fa-check-double text-[#53bdeb] text-[10px] md:text-[11px]"></i>';

            const avatarHtml = avatarSrc 
                ? `<img src="${avatarSrc}" class="w-7 h-7 md:w-11 md:h-11 rounded-full object-cover shrink-0 ${isFemale ? 'mr-2' : 'ml-2'}">`
                : `<div class="w-7 h-7 md:w-11 md:h-11 rounded-full shrink-0 ${isFemale ? 'mr-2' : 'ml-2'} bg-[#202c33] flex items-center justify-center">
                    <i class="fas ${isFemale ? 'fa-venus' : 'fa-mars'} text-white/50 text-sm md:text-xl"></i>
                   </div>`;

            const radiusStyle = isStacked 
                ? 'border-radius: 16px;' 
                : (isFemale ? 'border-radius: 0 16px 16px 16px;' : 'border-radius: 16px 0 16px 16px;');
            
            const msgHtml = `
                <div class="flex w-full ${isFemale ? 'justify-start' : 'justify-end'} ${isStacked ? 'mt-1' : 'mt-4 md:mt-6'} animate-fadeInUp px-2 items-start">
                    ${isFemale ? (isStacked ? '<div class="w-7 h-7 md:w-11 shrink-0 mr-2"></div>' : avatarHtml) : ''}
                    <div class="${bgClass} text-[#e9edef] px-2.5 py-1.5 md:px-4 md:py-3 shadow-sm relative max-w-[80%] md:max-w-[70%]" style="${radiusStyle}">
                        <div class="flex flex-col gap-1">
                            <p class="text-[11px] md:text-[15px] leading-relaxed break-words">${msg.message}</p>
                            <div class="flex items-center justify-end gap-1 opacity-80 mt-1">
                                <span class="text-[#8696a0] text-[8px] md:text-[10px] font-sans font-medium uppercase">${msg.time}</span>
                                ${doubleCheck}
                            </div>
                        </div>
                    </div>
                    ${!isFemale ? (isStacked ? '<div class="w-8 h-8 md:w-11 shrink-0 ml-2"></div>' : avatarHtml) : ''}
                </div>
            `;
            chatContainer.insertAdjacentHTML('beforeend', msgHtml);
        }
    });
}

function renderGifts(gifts, physicalAddress, settings) {
    console.log('Rendering Gifts:', { giftsCount: gifts?.length, hasAddress: !!physicalAddress, settings: !!settings });
    const section = document.getElementById('digitalEnvelope');
    const bankContainer = document.getElementById('bankAccountsContainer');
    const physContainer = document.getElementById('physicalAddressContainer');
    const physText = document.getElementById('physicalAddressText');

    if (!section || !bankContainer || !physContainer || !physText) {
        console.warn('Gifts elements not found in DOM');
        return;
    }

    const giftTitleEl = document.getElementById('giftTitle');
    if (giftTitleEl && settings && settings.gift_title) {
        giftTitleEl.innerText = settings.gift_title;
    }

    // Apply Background
    if (settings) {
        const gMode = settings.gift_bg_mode || 'color';
        const gBgImg = settings.gift_bg_img || '';
        const gBgColor = settings.gift_bg_color || 'linear-gradient(to bottom, #0a0b0f 0%, #996732 100%)';
        
        console.log('Gift Background:', { mode: gMode, img: gBgImg, color: gBgColor });
        
        if (gMode === 'image' && gBgImg) {
            applyBg('digitalEnvelope', gBgImg, null);
        } else {
            applyBg('digitalEnvelope', null, gBgColor);
        }
    }

    const hasGifts = gifts && gifts.length > 0;
    const hasAddress = physicalAddress && physicalAddress.trim() !== '';
    const hasBg = settings && ((settings.gift_bg_mode === 'image' && settings.gift_bg_img) || (settings.gift_bg_color && settings.gift_bg_color !== ''));

    console.log('Visibility Check:', { hasGifts, hasAddress, hasBg });

    if (!hasGifts && !hasAddress && !hasBg) {
        section.classList.add('hidden');
        return;
    }
    
    section.classList.remove('hidden');

    if (gifts && gifts.length > 0) {
        bankContainer.innerHTML = gifts.map((gift, index) => `
            <div class="flex flex-col items-center bg-black/50 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-2xl shadow-xl transition-all duration-300 hover:scale-105" data-aos="zoom-in" data-aos-delay="${index * 150 + 100}" data-aos-duration="1200">
                <div class="${gift.logo_src ? 'w-24 h-12 mb-2 md:mb-3' : 'hidden'}">
                    <img src="${gift.logo_src}" alt="${gift.bank_name}" class="w-full h-full object-contain" onerror="this.src=''; this.parentElement.className='hidden'">
                </div>
                ${!gift.logo_src ? `<p class="font-sans font-bold text-xl mb-0.5 text-[#e6d5b8] tracking-widest">${gift.bank_name}</p>` : ''}
                <p class="font-sans text-[14px] md:text-[15px] font-semibold tracking-[0.15em] text-[#e6d5b8] uppercase mb-0.5 drop-shadow-md">${gift.logo_src ? gift.bank_name + ' &mdash; ' : ''}<span id="account-${gift.id}">${gift.account_number}</span></p>
                <p class="font-sans text-[11px] md:text-xs font-medium tracking-[0.2em] text-[#e6d5b8]/70 uppercase mt-1 mb-4 md:mb-6">${gift.account_name}</p>
                <button onclick="window.copyToClipboard('${gift.account_number}')" class="backdrop-blur-md bg-black/40 hover:bg-black/60 border border-[#988a70]/50 text-[#f3e3c6] px-6 py-2.5 rounded-full font-sans text-[9px] md:text-[11px] tracking-[0.2em] uppercase transition-all shadow-2xl inline-flex items-center gap-3 cursor-pointer mt-auto">
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

    // Refresh AOS to handle dynamic content showing up
    if (window.AOS) {
        setTimeout(() => {
            AOS.refreshHard(); // Use refreshHard to recalculate positions correctly when unhiding section
        }, 100);
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
    
    // Clear previous state
    container.innerHTML = '';
    if (coverInterval) clearInterval(coverInterval);

    // Create fragments for better performance
    const fragment = document.createDocumentFragment();
    const slideElements = [];

    slides.forEach((slide, index) => {
        const img = document.createElement('img');
        img.src = slide.src;
        img.className = `slide ${index === 0 ? 'active opacity-0' : ''}`; // Start first image with opacity-0
        img.loading = index === 0 ? 'eager' : 'lazy';
        
        if (index === 0) {
            const showImg = () => {
                img.classList.remove('opacity-0');
            };
            if (img.complete) {
                showImg();
            } else {
                img.onload = showImg;
            }
        }
        
        fragment.appendChild(img);
        slideElements.push(img);
    });

    container.appendChild(fragment);

    // Smooth transition logic
    let currentActive = 0;
    if (slideElements.length > 1) {
        coverInterval = setInterval(() => {
            slideElements[currentActive].classList.remove('active');
            currentActive = (currentActive + 1) % slideElements.length;
            slideElements[currentActive].classList.add('active');
        }, 4000); // Increased duration for smoother feel
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
        if (err.message.includes('batas') || err.message.includes('maksimal')) {
            showToast(err.message, 'warning');
        } else {
            showModal('Oops!', err.message || 'Tidak dapat mengirim pesan sekarang. Silakan coba lagi.', 'error');
        }
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
    const disabled = !currentGuest;
    const hasRsvp = currentGuest && currentGuest.rsvp_status;

    const rsvpCount = document.getElementById('rsvpCount');
    const rsvpSubmit = document.querySelector('#rsvpForm button[type="submit"]');
    const wishSubmit = document.querySelector('#wishesForm button');
    
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
            
            // Tunggu sampai animasi cover selesai sepenuhnya (1200ms) sebelum inisialisasi AOS
            // agar semua elemen terdeteksi posisinya dengan benar oleh AOS
            setTimeout(() => {
                if (window.initAOS) {
                    window.initAOS();
                } else if (window.AOS) {
                    AOS.init({
                        duration: 1000,
                        once: false,
                        mirror: true,
                        offset: 80,
                        easing: 'ease-out-quart'
                    });
                }
                // Refresh ulang posisi setelah AOS init agar elemen tidak dianggap sudah "animated"
                if (window.AOS) {
                    setTimeout(() => AOS.refreshHard(), 100);
                }
            }, 1400);
            
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
        let isScrolling = false;
        window.addEventListener('scroll', () => {
            if (!isScrolling) {
                window.requestAnimationFrame(() => {
                    if (window.scrollY > 300) {
                        scrollToTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
                        scrollToTopBtn.classList.add('opacity-100');
                    } else {
                        scrollToTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
                        scrollToTopBtn.classList.remove('opacity-100');
                    }
                    isScrolling = false;
                });
                isScrolling = true;
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Gallery Arrows Navigation
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (!galleryState.slides || galleryState.slides.length === 0) return;
            galleryState.currentIndex = (galleryState.currentIndex - 1 + galleryState.slides.length) % galleryState.slides.length;
            updateGalleryCarousel(true);
            resetGalleryTimer();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (!galleryState.slides || galleryState.slides.length === 0) return;
            galleryState.currentIndex = (galleryState.currentIndex + 1) % galleryState.slides.length;
            updateGalleryCarousel(true);
            resetGalleryTimer();
        });
    }

    // Wedding Wishes Keyboard Shortcut
    const wishMessage = document.getElementById('wishMessage');
    if (wishMessage) {
        wishMessage.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                submitWish();
            }
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

// General Settings Admin Module

window.renderSettings = function() {
    const settings = window.state.dashboard?.settings || {};
    if (document.getElementById('settingCoverTitle')) document.getElementById('settingCoverTitle').value = settings.cover_title || '-';
    if (document.getElementById('settingCoverSubtitle')) document.getElementById('settingCoverSubtitle').value = settings.cover_subtitle || '-';
    if (document.getElementById('settingHeroName')) document.getElementById('settingHeroName').value = settings.hero_name || '-';
    if (document.getElementById('settingGuestPrefix')) document.getElementById('settingGuestPrefix').value = settings.guest_prefix || '-';
    if (document.getElementById('settingGuestLabel')) document.getElementById('settingGuestLabel').value = settings.guest_label || '-';
    if (document.getElementById('settingHeroButton')) document.getElementById('settingHeroButton').value = settings.hero_button || '-';
    if (document.getElementById('settingNotificationRetention')) {
        const val = settings.notification_retention || '30';
        document.getElementById('settingNotificationRetention').value = val;

        const activeOpt = document.querySelector(`.retention-option[data-value="${val}"]`);
        if (activeOpt && document.getElementById('retentionSelectedLabel')) {
            document.getElementById('retentionSelectedLabel').textContent = activeOpt.querySelector('span').textContent;
            document.querySelectorAll('.retention-option').forEach(el => el.classList.remove('active'));
            activeOpt.classList.add('active');
        }

        const wishesVal = settings.wishes_limit || '0';
        const wishesSelect = document.getElementById('settingWishesLimit');
        if (wishesSelect) wishesSelect.value = wishesVal;

        const activeWishesOpt = document.querySelector(`.wisheslimit-option[data-value="${wishesVal}"]`);
        if (activeWishesOpt && document.getElementById('wishesLimitSelectedLabel')) {
            document.getElementById('wishesLimitSelectedLabel').textContent = activeWishesOpt.querySelector('span').textContent;
            document.querySelectorAll('.wisheslimit-option').forEach(el => el.classList.remove('active'));
            activeWishesOpt.classList.add('active');
        }
    }

    if (document.getElementById('settingOgTitle')) document.getElementById('settingOgTitle').value = settings.og_title || '';
    if (document.getElementById('settingOgDescription')) document.getElementById('settingOgDescription').value = settings.og_description || '';
    
    if (document.getElementById('settingOgImage')) {
        const ogImage = settings.og_image || '';
        document.getElementById('settingOgImage').value = ogImage;
        const ogPreview = document.getElementById('ogImagePreview');
        const ogPlaceholder = document.getElementById('ogImagePlaceholder');
        const btnRemoveOg = document.getElementById('btnRemoveOgImage');
        if (ogPreview && ogPlaceholder) {
            if (ogImage && ogImage !== 'null' && ogImage !== 'undefined') {
                ogPreview.src = ogImage;
                ogPreview.classList.remove('hidden');
                ogPlaceholder.classList.add('hidden');
                if (btnRemoveOg) btnRemoveOg.classList.remove('hidden');
            } else {
                ogPreview.src = '';
                ogPreview.classList.add('hidden');
                ogPlaceholder.classList.remove('hidden');
                if (btnRemoveOg) btnRemoveOg.classList.add('hidden');
            }
        }
    }

    // Greeting Settings
    if (document.getElementById('settingGreetingHeading')) document.getElementById('settingGreetingHeading').value = settings.greeting_heading || '';
    if (document.getElementById('settingGreetingQuote')) document.getElementById('settingGreetingQuote').value = settings.greeting_quote || '';
    if (document.getElementById('settingGreetingLogo')) {
        const logo = settings.greeting_logo || '';
        document.getElementById('settingGreetingLogo').value = logo;
        const logoPreview = document.getElementById('greetingLogoPreview');
        if (logoPreview) {
            logoPreview.src = logo;
            logoPreview.style.opacity = logo ? '1' : '0';
        }
    }
    if (document.getElementById('settingGreetingInvitation')) document.getElementById('settingGreetingInvitation').value = settings.greeting_invitation || '';
    if (document.getElementById('settingCoupleSectionTitle')) document.getElementById('settingCoupleSectionTitle').value = settings.couple_section_title !== undefined ? settings.couple_section_title : 'Bride & Groom';
    if (document.getElementById('settingEventHeaderTitle')) document.getElementById('settingEventHeaderTitle').value = settings.event_header_title || '';
    if (document.getElementById('settingEventHeaderQuote')) document.getElementById('settingEventHeaderQuote').value = settings.event_header_quote || '';
    if (document.getElementById('settingWishesTitle')) document.getElementById('settingWishesTitle').value = settings.wishes_title || '';
    if (document.getElementById('settingWishesQuote')) document.getElementById('settingWishesQuote').value = settings.wishes_quote || '';
    if (document.getElementById('settingRsvpHeaderTitle')) document.getElementById('settingRsvpHeaderTitle').value = settings.rsvp_header_title || '';
    if (document.getElementById('settingRsvpHeaderQuote')) document.getElementById('settingRsvpHeaderQuote').value = settings.rsvp_header_quote || '';
    if (document.getElementById('settingRsvpCaption')) document.getElementById('settingRsvpCaption').value = settings.rsvp_caption || '';
    if (document.getElementById('settingEventBg')) document.getElementById('settingEventBg').value = settings.event_bg || '';
    if (document.getElementById('settingGiftBgImg')) document.getElementById('settingGiftBgImg').value = settings.gift_bg_img || '';
    if (document.getElementById('settingWishesBgImg')) document.getElementById('settingWishesBgImg').value = settings.wishes_bg_img || '';
    if (document.getElementById('settingRsvpBgImg')) document.getElementById('settingRsvpBgImg').value = settings.rsvp_bg_img || '';
    if (document.getElementById('settingGreetingBgImg')) document.getElementById('settingGreetingBgImg').value = settings.greeting_bg_img || '';
    if (document.getElementById('settingGiftTitle')) document.getElementById('settingGiftTitle').value = settings.gift_title || '';
    if (document.getElementById('giftPhysicalAddress')) document.getElementById('giftPhysicalAddress').value = settings.gift_physical_address || '';
    
    // Background Color Handlers
    if (document.getElementById('settingOpeningBgColor')) {
        const oColor = settings.opening_bg_color || '#000000';
        document.getElementById('settingOpeningBgColor').value = oColor;
        if (document.getElementById('openingColorPicker')) {
            document.getElementById('openingColorPicker').value = oColor.startsWith('#') ? oColor : '#000000';
        }
        window.syncOpeningColor(oColor, 'picker');
    }
    if (document.getElementById('settingGreetingBgColor')) {
        const grColor = settings.greeting_bg_color || '#000000';
        document.getElementById('settingGreetingBgColor').value = grColor;
        if (document.getElementById('greetingColorPicker') && grColor.startsWith('#')) {
            document.getElementById('greetingColorPicker').value = grColor;
        }
        window.syncGreetingColor(grColor, 'picker');
    }
    if (document.getElementById('settingCoupleBgColor')) {
        const cColor = settings.couple_bg_color || '#0e0f11';
        document.getElementById('settingCoupleBgColor').value = cColor;
        if (window.syncCoupleColor) window.syncCoupleColor(cColor, 'picker');
    }
    if (document.getElementById('settingCoupleBgImg')) {
        document.getElementById('settingCoupleBgImg').value = settings.couple_bg_img || '';
        if (window.renderCoupleSlider) window.renderCoupleSlider();
    }
    if (document.getElementById('settingCoupleBgMode')) {
        const cMode = settings.couple_bg_mode || 'color';
        document.getElementById('settingCoupleBgMode').value = cMode;
        if (window.setCoupleBgMode) window.setCoupleBgMode(cMode, true);
    }
    if (document.getElementById('settingOpeningBgMode')) {
        const oMode = settings.opening_bg_mode || 'color';
        document.getElementById('settingOpeningBgMode').value = oMode;
        if (window.setOpeningBgMode) window.setOpeningBgMode(oMode, true);
    }
    if (document.getElementById('settingOpeningBgImg')) {
        document.getElementById('settingOpeningBgImg').value = settings.opening_bg_img || '';
        if (window.renderOpeningSlider) window.renderOpeningSlider();
    }
    if (document.getElementById('settingGreetingBgMode')) {
        const gMode = settings.greeting_bg_mode || 'color';
        document.getElementById('settingGreetingBgMode').value = gMode;
        if (window.setGreetingBgMode) window.setGreetingBgMode(gMode, true);
    }
    // Restore greeting background image preview
    if (document.getElementById('settingGreetingBgImg')) {
        document.getElementById('settingGreetingBgImg').value = settings.greeting_bg_img || '';
    }
    const greetingImg = settings.greeting_bg_img || '';
    const greetingBgPreview = document.getElementById('greetingBgPreview');
    const greetingBgPlaceholder = document.getElementById('greetingBgPreviewPlaceholder');
    if (greetingBgPreview && greetingBgPlaceholder) {
        if (greetingImg && greetingImg !== 'null' && greetingImg !== 'undefined') {
            greetingBgPreview.src = greetingImg;
            greetingBgPreview.classList.remove('hidden');
            greetingBgPlaceholder.classList.add('hidden');
        } else {
            greetingBgPreview.src = '';
            greetingBgPreview.classList.add('hidden');
            greetingBgPlaceholder.classList.remove('hidden');
        }
        greetingBgPreview.onerror = () => {
            greetingBgPreview.classList.add('hidden');
            greetingBgPlaceholder.classList.remove('hidden');
        };
    }
    // Restore couple background image preview
    const coupleImg = settings.couple_bg_img || '';
    const coupleBgPreview = document.getElementById('coupleBgPreview');
    const coupleBgPlaceholder = document.getElementById('coupleBgPreviewPlaceholder');
    if (coupleBgPreview && coupleBgPlaceholder) {
        if (coupleImg && coupleImg !== 'null' && coupleImg !== 'undefined') {
            coupleBgPreview.src = coupleImg;
            coupleBgPreview.classList.remove('hidden');
            coupleBgPlaceholder.classList.add('hidden');
        } else {
            coupleBgPreview.src = '';
            coupleBgPreview.classList.add('hidden');
            coupleBgPlaceholder.classList.remove('hidden');
        }
        coupleBgPreview.onerror = () => {
            coupleBgPreview.classList.add('hidden');
            coupleBgPlaceholder.classList.remove('hidden');
        };
    }
    if (document.getElementById('settingEventBgColor')) {
        const eColor = settings.event_bg_color || '#000000';
        document.getElementById('settingEventBgColor').value = eColor;
        if (document.getElementById('eventColorPicker') && eColor.startsWith('#')) {
            document.getElementById('eventColorPicker').value = eColor;
        }
    }
    if (document.getElementById('settingGalleryTitle')) document.getElementById('settingGalleryTitle').value = settings.gallery_title || 'Sweet Moments';

    if (document.getElementById('settingEventBgMode')) {
        const eMode = settings.event_bg_mode || 'color';
        window.setEventBgMode(eMode, true);
    }

    const eventImg = settings.event_bg || '';
    if (document.getElementById('settingEventBg')) {
        document.getElementById('settingEventBg').value = eventImg;
    }
    const eventPreview = document.getElementById('eventBgPreview');
    const eventPlaceholder = document.getElementById('eventBgPreviewPlaceholder');
    if (eventPreview && eventPlaceholder) {
        if (eventImg && eventImg !== 'null' && eventImg !== 'undefined') {
            eventPreview.src = eventImg;
            eventPreview.classList.remove('hidden');
            eventPlaceholder.classList.add('hidden');
        } else {
            eventPreview.src = '';
            eventPreview.classList.add('hidden');
            eventPlaceholder.classList.remove('hidden');
        }
        eventPreview.onerror = () => {
            eventPreview.classList.add('hidden');
            eventPlaceholder.classList.remove('hidden');
        };
    }

    // Wishes background logic
    if (document.getElementById('settingWishesBgMode')) {
        const wMode = settings.wishes_bg_mode || 'color';
        window.setWishesBgMode(wMode, true);
    }
    const wishesImg = settings.wishes_bg_img || '';
    const wishesPreview = document.getElementById('wishesBgPreview');
    const wishesPlaceholder = document.getElementById('wishesBgPreviewPlaceholder');
    if (wishesPreview && wishesPlaceholder) {
        if (wishesImg && wishesImg !== 'null' && wishesImg !== 'undefined') {
            wishesPreview.src = wishesImg;
            wishesPreview.classList.remove('hidden');
            wishesPlaceholder.classList.add('hidden');
        } else {
            wishesPreview.src = '';
            wishesPreview.classList.add('hidden');
            wishesPlaceholder.classList.remove('hidden');
        }
        wishesPreview.onerror = () => {
            wishesPreview.classList.add('hidden');
            wishesPlaceholder.classList.remove('hidden');
        };
    }

    // RSVP background logic
    if (document.getElementById('settingRsvpBgMode')) {
        const rMode = settings.rsvp_bg_mode || 'color';
        window.setRsvpBgMode(rMode, true);
    }
    const rsvpImg = settings.rsvp_bg_img || '';
    const rsvpPreview = document.getElementById('rsvpBgPreview');
    const rsvpPlaceholder = document.getElementById('rsvpBgPreviewPlaceholder');
    if (rsvpPreview && rsvpPlaceholder) {
        if (rsvpImg && rsvpImg !== 'null' && rsvpImg !== 'undefined') {
            rsvpPreview.src = rsvpImg;
            rsvpPreview.classList.remove('hidden');
            rsvpPlaceholder.classList.add('hidden');
        } else {
            rsvpPreview.src = '';
            rsvpPreview.classList.add('hidden');
            rsvpPlaceholder.classList.remove('hidden');
        }
        rsvpPreview.onerror = () => {
            rsvpPreview.classList.add('hidden');
            rsvpPlaceholder.classList.remove('hidden');
        };
    }

    // Gift background logic
    if (document.getElementById('settingGiftBgMode')) {
        const gMode = settings.gift_bg_mode || 'color';
        window.setGiftBgMode(gMode, true);
    }
    const giftImg = settings.gift_bg_img || '';
    if (document.getElementById('settingGiftBgImg')) {
        document.getElementById('settingGiftBgImg').value = giftImg;
    }
    const giftPreview = document.getElementById('giftBgPreview');
    const giftPlaceholder = document.getElementById('giftBgPreviewPlaceholder');
    if (giftPreview && giftPlaceholder) {
        if (giftImg && giftImg !== 'null' && giftImg !== 'undefined') {
            giftPreview.src = giftImg;
            giftPreview.classList.remove('hidden');
            giftPlaceholder.classList.add('hidden');
        } else {
            giftPreview.src = '';
            giftPreview.classList.add('hidden');
            giftPlaceholder.classList.remove('hidden');
        }
        giftPreview.onerror = () => {
            giftPreview.classList.add('hidden');
            giftPlaceholder.classList.remove('hidden');
        };
    }

    if (document.getElementById('settingWishesBgColor')) {
        const wColor = settings.wishes_bg_color || '#000000';
        document.getElementById('settingWishesBgColor').value = wColor;
        if (window.syncWishesColor) window.syncWishesColor(wColor, 'picker');
    }

    if (document.getElementById('settingRsvpBgColor')) {
        const rColor = settings.rsvp_bg_color || '#000000';
        document.getElementById('settingRsvpBgColor').value = rColor;
        if (window.syncRsvpColor) window.syncRsvpColor(rColor, 'picker');
    }

    if (document.getElementById('settingGiftBgColor')) {
        const giColor = settings.gift_bg_color || '#000000';
        document.getElementById('settingGiftBgColor').value = giColor;
        if (window.syncGiftColor) window.syncGiftColor(giColor, 'picker');
    }

    if (document.getElementById('settingGalleryBgColor')) {
        const galColor = settings.gallery_bg_color || '#000000';
        document.getElementById('settingGalleryBgColor').value = galColor;
        if (document.getElementById('galleryColorPicker') && galColor.startsWith('#')) {
            document.getElementById('galleryColorPicker').value = galColor;
        }
    }
    if (document.getElementById('settingGalleryBgImg')) {
        document.getElementById('settingGalleryBgImg').value = settings.gallery_bg_img || '';
    }

    // Show/Hide delete buttons
    const deleteBtnMap = {
        'wishes_bg_img': 'btnDeleteWishesBg',
        'opening_bg_img': 'btnDeleteOpeningBg',
        'greeting_bg_img': 'btnDeleteGreetingBg',
        'couple_bg_img': 'btnDeleteCoupleBg',
        'event_bg': 'btnDeleteEventBg',
        'lovestory_bg_img': 'btnDeleteLovestoryBg',
        'lovestory_card_bg_img': 'btnDeleteLovestoryCardBg',
        'gift_bg_img': 'btnDeleteGiftBg',
        'rsvp_bg_img': 'btnDeleteRsvpBg'
    };

    Object.entries(deleteBtnMap).forEach(([key, btnId]) => {
        const btn = document.getElementById(btnId);
        if (btn) {
            let hasImage = settings[key];
            if (key.startsWith('lovestory_')) {
                const lsSet = window.state.dashboard?.lovestory_settings || {};
                hasImage = lsSet[key];
            }
            if (hasImage) btn.classList.remove('hidden');
            else btn.classList.add('hidden');
        }
    });

    if (document.getElementById('settingEnableNotifications')) {
        document.getElementById('settingEnableNotifications').checked = settings.notifications_enabled !== 'false';
    }

    if (document.getElementById('settingBgMusic')) {
        document.getElementById('settingBgMusic').value = settings.bg_music || '';
    }

    if (document.getElementById('waTemplateInput')) {
        document.getElementById('waTemplateInput').innerHTML = settings.wa_template || '';
    }

    // Music Settings
    const musicDisplay = document.getElementById('music_name_display');
    const previewContainer = document.getElementById('music_preview_container');
    const previewEl = document.getElementById('music_preview');
    const autoPlayEl = document.getElementById('settingAutoPlay');

    if (settings.bg_music) {
        const fileName = settings.bg_music.split('/').pop();
        if (musicDisplay) musicDisplay.innerText = fileName;
        if (previewContainer) previewContainer.classList.remove('hidden');
        if (previewEl) {
            previewEl.src = settings.bg_music + '?t=' + Date.now();
            previewEl.load();
            
            // Reset Custom UI
            const playIcon = document.getElementById('playIcon');
            if (playIcon) playIcon.className = 'fas fa-play text-xs transition-transform group-active:scale-90';
            const progressBar = document.getElementById('progressBar');
            if (progressBar) progressBar.style.width = '0%';
            const currentTimeEl = document.getElementById('currentTime');
            if (currentTimeEl) currentTimeEl.innerText = '0:00';
        }
    } else {
        if (musicDisplay) musicDisplay.innerText = 'Belum ada musik yang diunggah';
        if (previewContainer) previewContainer.classList.add('hidden');
        if (previewEl) {
            previewEl.src = '';
            previewEl.load();
        }
    }

    if (autoPlayEl) autoPlayEl.checked = settings.music_autoplay === 'true';
    if (document.getElementById('settingBgMusic')) {
        document.getElementById('settingBgMusic').value = settings.bg_music || '';
    }

    if (document.getElementById('settingMusicStart')) {
        document.getElementById('settingMusicStart').value = settings.music_start_time || 0;
    }
};

window.saveSettings = async function(quiet = false, customMsg = null, skipReload = false) {
    if (!isAppLoaded) return;
    const payload = {};

    const fields = {
        cover_title: 'settingCoverTitle',
        cover_subtitle: 'settingCoverSubtitle',
        hero_name: 'settingHeroName',
        guest_prefix: 'settingGuestPrefix',
        guest_label: 'settingGuestLabel',
        hero_button: 'settingHeroButton',
        og_title: 'settingOgTitle',
        og_description: 'settingOgDescription',
        og_image: 'settingOgImage',
        notification_retention: 'settingNotificationRetention',
        wishes_limit: 'settingWishesLimit',
        greeting_heading: 'settingGreetingHeading',
        greeting_quote: 'settingGreetingQuote',
        greeting_logo: 'settingGreetingLogo',
        greeting_invitation: 'settingGreetingInvitation',
        wishes_title: 'settingWishesTitle',
        wishes_quote: 'settingWishesQuote',
        couple_section_title: 'settingCoupleSectionTitle',
        event_header_quote: 'settingEventHeaderQuote',
        event_header_title: 'settingEventHeaderTitle',
        rsvp_header_quote: 'settingRsvpHeaderQuote',
        rsvp_header_title: 'settingRsvpHeaderTitle',
        rsvp_caption: 'settingRsvpCaption',
        event_bg: 'settingEventBg',
        gift_bg_img: 'settingGiftBgImg',
        gift_bg_color: 'settingGiftBgColor',
        wishes_bg_img: 'settingWishesBgImg',
        wishes_bg_color: 'settingWishesBgColor',
        gallery_title: 'settingGalleryTitle',
        rsvp_bg_img: 'settingRsvpBgImg',
        rsvp_bg_color: 'settingRsvpBgColor',
        opening_bg_color: 'settingOpeningBgColor',
        couple_bg_color: 'settingCoupleBgColor',
        couple_bg_img: 'settingCoupleBgImg',
        gallery_bg_img: 'settingGalleryBgImg',
        gallery_bg_color: 'settingGalleryBgColor',
        couple_bg_mode: 'settingCoupleBgMode',
        event_bg_color: 'settingEventBgColor',
        wa_template: 'waTemplateInput',
        opening_bg_img: 'settingOpeningBgImg',
        opening_bg_mode: 'settingOpeningBgMode',
        greeting_bg_img: 'settingGreetingBgImg',
        greeting_bg_color: 'settingGreetingBgColor',
        greeting_bg_mode: 'settingGreetingBgMode',
        bg_music: 'settingBgMusic',
        music_start_time: 'settingMusicStart',
        gift_physical_address: 'giftPhysicalAddress',
        gift_title: 'settingGiftTitle'
    };

    for (const [key, id] of Object.entries(fields)) {
        const el = document.getElementById(id);
        if (el) payload[key] = el.value;
    }

    const checks = {
        notifications_enabled: 'settingEnableNotifications',
        music_autoplay: 'settingAutoPlay'
    };
    for (const [key, id] of Object.entries(checks)) {
        const el = document.getElementById(id);
        if (el) payload[key] = el.checked ? 'true' : 'false';
    }

    if (document.getElementById('settingWishesBgMode')) {
        payload.wishes_bg_mode = document.getElementById('settingWishesBgMode').checked ? 'image' : 'color';
    }
    if (document.getElementById('settingRsvpBgMode')) {
        payload.rsvp_bg_mode = document.getElementById('settingRsvpBgMode').checked ? 'image' : 'color';
    }
    if (document.getElementById('settingGiftBgMode')) {
        payload.gift_bg_mode = document.getElementById('settingGiftBgMode').checked ? 'image' : 'color';
    }
    if (document.getElementById('waTemplateInput')) {
        payload.wa_template = document.getElementById('waTemplateInput').innerHTML;
    }
    if (document.getElementById('settingEventBgMode')) {
        payload.event_bg_mode = document.getElementById('settingEventBgMode').checked ? 'image' : 'color';
    }

    if (Object.keys(payload).length === 0) return;

    try {
        // Handle Gallery Reorder if in gallery section
        const galleryBody = document.getElementById('galleryTableBody');
        const gallerySection = document.getElementById('section_galeri');
        if (gallerySection && !gallerySection.classList.contains('hidden') && galleryBody) {
            const newSequence = Array.from(galleryBody.querySelectorAll('tr')).map(tr => tr.dataset.id);
            if (newSequence.length > 0) {
                await api('/api/admin/gallery/reorder', {
                    method: 'POST',
                    body: JSON.stringify({ sequence: newSequence })
                });
            }
        }

        await api('/api/admin/settings', {
            method: 'PUT',
            body: JSON.stringify(payload)
        });
         if (!quiet) window.showToast(customMsg || 'Pengaturan berhasil disimpan!', 'success');
        if (!skipReload) await window.loadDashboard();
    } catch (err) {
        if (!quiet) showToast(err.message, 'error');
    }
};

window.uploadSettingImg = async function(input, key, previewId) {
    if (!input.files || !input.files[0]) return;
    
    // Validation for WhatsApp preview limit (300KB)
    if (key === 'og_image' && input.files[0].size > 300 * 1024) {
        showToast('Gagal: Ukuran gambar harus di bawah 300 KB agar bisa tampil di WhatsApp.', 'error');
        input.value = '';
        return;
    }

    const formData = new FormData();
    formData.append('image', input.files[0]);
    formData.append('setting_key', key);

    try {
        const response = await fetch('/api/admin/settings/upload', {
            method: 'POST',
            body: formData,
            credentials: 'include'
        });

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const result = await response.json();
            if (result.success) {
                const preview = document.getElementById(previewId);
                if (preview) {
                    preview.src = result.src;
                    preview.classList.remove('hidden');
                    const placeholder = document.getElementById(previewId + 'Placeholder');
                    if (placeholder) placeholder.classList.add('hidden');
                }

                const camelKey = key.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
                const hiddenInput = document.getElementById('setting' + camelKey);
                if (hiddenInput) {
                    hiddenInput.value = result.src;
                }
                window.state.dashboard.settings[key] = result.src;
                showToast('Gambar berhasil diunggah', 'success');
                window.saveSettings(true);
            } else {
                showToast(result.error || 'Gagal mengunggah gambar', 'error');
            }
        } else {
            const text = await response.text();
            showToast(`Server error (${response.status}): ${text.substring(0, 50)}`, 'error');
        }
    } catch (err) {
        console.error(err);
        showToast('Gagal mengunggah gambar', 'error');
    }
};

window.deleteSettingImg = function(key, previewId) {
    const preview = document.getElementById(previewId);
    const camelKey = key.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
    const hiddenInput = document.getElementById('setting' + camelKey);

    if (preview) {
        preview.src = '';
        preview.classList.add('hidden');
    }
    if (hiddenInput) hiddenInput.value = '';

    const placeholder = document.getElementById(previewId + 'Placeholder');
    if (placeholder) placeholder.classList.remove('hidden');

    window.state.dashboard.settings[key] = '';
    window.saveSettings(true);
    showToast('Gambar berhasil dihapus', 'delete');
};

// Mode and Color Sync Functions
window.syncWishesColor = function(val, target) {
    const input = document.getElementById('settingWishesBgColor');
    const picker = document.getElementById('wishesColorPicker');
    const previewContainer = document.getElementById('wishesBgPreviewContainer');
    if (target === 'input') { if (input) input.value = val.toUpperCase(); }
    else { if (picker) picker.value = val; }
    if (previewContainer) {
        if (val.includes('gradient')) previewContainer.style.background = val;
        else { previewContainer.style.background = ''; previewContainer.style.backgroundColor = val; }
    }
};

window.syncGiftColor = function(val, target) {
    const input = document.getElementById('settingGiftBgColor');
    const picker = document.getElementById('giftColorPicker');
    const previewContainer = document.getElementById('giftBgPreviewContainer');
    if (target === 'input') { if (input) input.value = val.toUpperCase(); }
    else { if (picker) picker.value = val; }
    if (previewContainer) {
        if (val.includes('gradient')) previewContainer.style.background = val;
        else { previewContainer.style.background = ''; previewContainer.style.backgroundColor = val; }
    }
};

window.setOpeningBgPreset = function(value) {
    const input = document.getElementById('settingOpeningBgColor');
    if (input) { input.value = value; window.saveSettings(); }
};

window.setGreetingBgPreset = function(value) {
    const input = document.getElementById('settingGreetingBgColor');
    if (input) { input.value = value; window.saveSettings(); }
};

window.setCoupleBgPreset = function(value) {
    const input = document.getElementById('settingCoupleBgColor');
    if (input) { input.value = value; window.saveSettings(); }
};

window.setEventBgPreset = function(value) {
    const input = document.getElementById('settingEventBgColor');
    if (input) { input.value = value; window.saveSettings(); }
};

window.setLovestoryBgPreset = function(value) {
    const input = document.getElementById('settingLovestoryBgColor');
    if (input) { input.value = value; window.saveSettings(); }
};

window.setLovestoryCardBgPreset = function(value) {
    const input = document.getElementById('settingLovestoryCardBgColor');
    if (input) { input.value = value; window.saveSettings(); }
};

window.setOpeningBgMode = function(mode, skipSave = false) {
    const slider = document.getElementById('openingModeIndicator');
    const colorBtn = document.getElementById('btnModeColor');
    const imageBtn = document.getElementById('btnModeImage');
    const modeInput = document.getElementById('settingOpeningBgMode');
    if (!slider || !colorBtn || !imageBtn || !modeInput) return;

    const isImage = mode === 'image';
    modeInput.value = mode;
    
    const colorSpan = colorBtn.querySelector('span') || colorBtn;
    const imageSpan = imageBtn.querySelector('span') || imageBtn;

    if (isImage) {
        slider.style.left = 'calc(50% - 1px)'; slider.style.width = 'calc(50% - 3px)';
        colorSpan.classList.add('text-slate-400'); colorSpan.classList.remove('text-white', 'active');
        imageSpan.classList.add('text-white', 'active'); imageSpan.classList.remove('text-slate-400');
    } else {
        slider.style.left = '4px'; slider.style.width = 'calc(50% - 3px)';
        colorSpan.classList.add('text-white', 'active'); colorSpan.classList.remove('text-slate-400');
        imageSpan.classList.add('text-slate-400'); imageSpan.classList.remove('text-white', 'active');
    }
    if (!skipSave) window.saveSettings();
};

window.syncOpeningColor = function(val, target) {
    const input = document.getElementById('settingOpeningBgColor');
    const picker = document.getElementById('openingColorPicker');
    if (target === 'input') { if (input) input.value = val.toUpperCase(); }
    else { if (picker) picker.value = val; }
    const previewContainer = document.getElementById('openingBgPreviewContainer');
    if (previewContainer) {
        if (val.includes('gradient')) previewContainer.style.background = val;
        else { previewContainer.style.background = ''; previewContainer.style.backgroundColor = val; }
    }
};

window.setGreetingBgMode = function(mode, skipSave = false) {
    const slider = document.getElementById('greetingModeIndicator');
    const colorBtn = document.getElementById('btnGreetingModeColor');
    const imageBtn = document.getElementById('btnGreetingModeImage');
    const modeInput = document.getElementById('settingGreetingBgMode');
    if (!slider || !colorBtn || !imageBtn || !modeInput) return;

    const isImage = mode === 'image';
    modeInput.value = mode;

    const colorSpan = colorBtn.querySelector('span') || colorBtn;
    const imageSpan = imageBtn.querySelector('span') || imageBtn;

    if (isImage) {
        slider.style.left = 'calc(50% - 1px)'; slider.style.width = 'calc(50% - 3px)';
        colorSpan.classList.add('text-slate-400'); colorSpan.classList.remove('text-white', 'active');
        imageSpan.classList.add('text-white', 'active'); imageSpan.classList.remove('text-slate-400');
    } else {
        slider.style.left = '4px'; slider.style.width = 'calc(50% - 3px)';
        colorSpan.classList.add('text-white', 'active'); colorSpan.classList.remove('text-slate-400');
        imageSpan.classList.add('text-slate-400'); imageSpan.classList.remove('text-white', 'active');
    }
    if (!skipSave) window.saveSettings();
};

window.syncGreetingColor = function(val, target) {
    const input = document.getElementById('settingGreetingBgColor');
    const picker = document.getElementById('greetingColorPicker');
    if (target === 'input') { if (input) input.value = val.toUpperCase(); }
    else { if (picker) picker.value = val; }
    const previewContainer = document.getElementById('greetingBgPreviewContainer');
    if (previewContainer) {
        if (val.includes('gradient')) previewContainer.style.background = val;
        else { previewContainer.style.background = ''; previewContainer.style.backgroundColor = val; }
    }
};

window.setCoupleBgMode = function(mode, skipSave = false) {
    const slider = document.getElementById('coupleModeIndicator');
    const colorBtn = document.getElementById('btnCoupleModeColor');
    const imageBtn = document.getElementById('btnCoupleModeImage');
    const modeInput = document.getElementById('settingCoupleBgMode');
    if (!slider || !colorBtn || !imageBtn || !modeInput) return;

    const isImage = mode === 'image';
    modeInput.value = mode;

    const colorSpan = colorBtn.querySelector('span') || colorBtn;
    const imageSpan = imageBtn.querySelector('span') || imageBtn;

    if (isImage) {
        slider.style.left = 'calc(50% - 1px)'; slider.style.width = 'calc(50% - 3px)';
        colorSpan.classList.add('text-slate-400'); colorSpan.classList.remove('text-white', 'active');
        imageSpan.classList.add('text-white', 'active'); imageSpan.classList.remove('text-slate-400');
    } else {
        slider.style.left = '4px'; slider.style.width = 'calc(50% - 3px)';
        colorSpan.classList.add('text-white', 'active'); colorSpan.classList.remove('text-slate-400');
        imageSpan.classList.add('text-slate-400'); imageSpan.classList.remove('text-white', 'active');
    }
    if (!skipSave) window.saveSettings();
};

window.syncCoupleColor = function(val, target) {
    const input = document.getElementById('settingCoupleBgColor');
    const picker = document.getElementById('coupleColorPicker');
    if (target === 'input') { if (input) input.value = val.toUpperCase(); }
    else { if (picker) picker.value = val; }
    const previewContainer = document.getElementById('coupleBgPreviewContainer');
    if (previewContainer) {
        if (val.includes('gradient')) previewContainer.style.background = val;
        else { previewContainer.style.background = ''; previewContainer.style.backgroundColor = val; }
    }
};

window.setWishesBgMode = function(mode, skipSave = false) {
    const slider = document.getElementById('wishesBgModeSlider');
    const colorBtn = document.getElementById('wishesModeColorBtn');
    const imageBtn = document.getElementById('wishesModeImageBtn');
    const checkbox = document.getElementById('settingWishesBgMode');
    if (!slider || !colorBtn || !imageBtn || !checkbox) return;

    const isImage = mode === 'image';
    checkbox.checked = isImage;
    if (isImage) {
        slider.style.left = 'calc(50% - 1px)'; slider.style.width = 'calc(50% - 3px)';
        colorBtn.classList.remove('text-white', 'active'); colorBtn.classList.add('text-slate-400');
        imageBtn.classList.remove('text-slate-400'); imageBtn.classList.add('text-white', 'active');
    } else {
        slider.style.left = '4px'; slider.style.width = 'calc(50% - 3px)';
        colorBtn.classList.remove('text-slate-400'); colorBtn.classList.add('text-white', 'active');
        imageBtn.classList.remove('text-white', 'active'); imageBtn.classList.add('text-slate-400');
    }
    if (!skipSave) window.saveSettings();
};

window.setRsvpBgMode = function(mode, skipSave = false) {
    const slider = document.getElementById('rsvpBgModeSlider');
    const colorBtn = document.getElementById('rsvpModeColorBtn');
    const imageBtn = document.getElementById('rsvpModeImageBtn');
    const checkbox = document.getElementById('settingRsvpBgMode');
    if (!slider || !colorBtn || !imageBtn || !checkbox) return;

    const isImage = mode === 'image';
    checkbox.checked = isImage;
    if (isImage) {
        slider.style.left = 'calc(50% - 1px)'; slider.style.width = 'calc(50% - 3px)';
        colorBtn.classList.remove('text-white', 'active'); colorBtn.classList.add('text-slate-400');
        imageBtn.classList.remove('text-slate-400'); imageBtn.classList.add('text-white', 'active');
    } else {
        slider.style.left = '4px'; slider.style.width = 'calc(50% - 3px)';
        colorBtn.classList.remove('text-slate-400'); colorBtn.classList.add('text-white', 'active');
        imageBtn.classList.remove('text-white', 'active'); imageBtn.classList.add('text-slate-400');
    }
    if (!skipSave) window.saveSettings();
};

window.syncRsvpColor = function(val, target) {
    const input = document.getElementById('settingRsvpBgColor');
    const picker = document.getElementById('rsvpColorPicker');
    if (target === 'input') { if (input) input.value = val.toUpperCase(); }
    else { if (picker) picker.value = val; }
    const previewContainer = document.getElementById('rsvpBgPreviewContainer');
    if (previewContainer) {
        if (val.includes('gradient')) previewContainer.style.background = val;
        else { previewContainer.style.background = ''; previewContainer.style.backgroundColor = val; }
    }
};

window.renderOpeningSlider = function() {
    const list = document.getElementById('openingBgList');
    const input = document.getElementById('settingOpeningBgImg');
    if (!list || !input) return;

    list.innerHTML = '';
    const images = input.value.split(',').filter(u => u.trim() !== '');
    
    if (images.length === 0) {
        list.innerHTML = `
            <div class="min-w-full h-48 md:h-64 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex flex-col items-center justify-center text-slate-400 shrink-0">
                <i class="fas fa-image text-4xl mb-3 opacity-20"></i>
                <p class="text-xs font-semibold uppercase tracking-wider opacity-50">Belum ada foto utama</p>
            </div>
        `;
        return;
    }

    images.forEach((src, idx) => {
        list.insertAdjacentHTML('beforeend', `
            <div class="relative w-36 h-48 md:w-44 md:h-56 lg:w-52 lg:h-64 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 shrink-0 overflow-hidden group/item snap-start shadow-sm cursor-grab active:cursor-grabbing">
                <img src="${src}" data-src="${src}" class="opening-slider-img w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-110">
                <div class="absolute inset-0 bg-slate-900/40 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center backdrop-blur-[2px] gap-3">
                    <button type="button" onclick="window.viewImageModal('${src}')" class="w-10 h-10 rounded-full bg-indigo-500 text-white hover:bg-indigo-600 transition-colors shadow-lg flex items-center justify-center transform scale-75 group-hover/item:scale-100 duration-300 delay-75">
                        <i class="fas fa-eye text-sm pointer-events-none"></i>
                    </button>
                    <button type="button" onclick="window.deleteOpeningSliderImg(${idx})" class="w-10 h-10 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors shadow-lg flex items-center justify-center transform scale-75 group-hover/item:scale-100 duration-300">
                        <i class="fas fa-trash text-sm pointer-events-none"></i>
                    </button>
                </div>
            </div>
        `);
    });

    if (window.Sortable) {
        if (window.openingSortable) {
            window.openingSortable.destroy();
        }
        window.openingSortable = new Sortable(list, {
            animation: 150,
            ghostClass: 'sortable-ghost',
            delay: 100, // delay to prevent accidental drag when clicking
            delayOnTouchOnly: true,
            onEnd: function() {
                const newOrder = [];
                list.querySelectorAll('img.opening-slider-img').forEach(img => {
                    newOrder.push(img.getAttribute('data-src'));
                });
                const newValue = newOrder.join(',');
                document.getElementById('settingOpeningBgImg').value = newValue;
                window.state.dashboard.settings.opening_bg_img = newValue;
                window.saveSettings(true);
                // Re-render to correct delete indices
                setTimeout(() => window.renderOpeningSlider(), 100);
            }
        });
    }
};

window.viewImageModal = function(src) {
    const existing = document.getElementById('dynamicImageModal');
    if (existing) existing.remove();

    const html = `
        <div id="dynamicImageModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 opacity-0 transition-opacity duration-300">
            <div class="absolute inset-0 bg-black/90 backdrop-blur-sm cursor-pointer" onclick="this.parentElement.remove()"></div>
            <button class="absolute top-4 right-4 text-white hover:text-red-500 z-[110] transition-colors" onclick="document.getElementById('dynamicImageModal').remove()">
                <i class="fas fa-times text-2xl"></i>
            </button>
            <div class="relative z-[105] max-w-full max-h-full">
                <img src="${src}" class="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl">
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);
    setTimeout(() => {
        const modal = document.getElementById('dynamicImageModal');
        if (modal) modal.classList.remove('opacity-0');
    }, 10);
};

window.uploadOpeningSliderImg = async function(input) {
    if (!input.files || !input.files[0]) return;
    const formData = new FormData();
    formData.append('image', input.files[0]);
    formData.append('setting_key', 'opening_bg_img_temp'); // Use temp key so we just get the URL back

    try {
        const res = await fetch('/api/admin/settings/upload', {
            method: 'POST',
            body: formData,
            credentials: 'include'
        });

        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const data = await res.json();
            if (res.ok && data.success) {
                const hiddenInput = document.getElementById('settingOpeningBgImg');
                let images = hiddenInput.value.split(',').filter(u => u.trim() !== '');
                images.push(data.src);
                hiddenInput.value = images.join(',');
                window.state.dashboard.settings.opening_bg_img = hiddenInput.value;
                window.renderOpeningSlider();
                window.saveSettings(true);
                showToast('Foto sampul berhasil ditambahkan!', 'success');
            } else {
                throw new Error(data.error || 'Upload gagal');
            }
        } else {
            const text = await res.text();
            throw new Error(`Server error (${res.status}): ${text.substring(0, 100)}`);
        }
    } catch (e) {
        showToast(e.message, 'error');
    }
    input.value = '';
};

window.deleteOpeningSliderImg = function(index) {
    const hiddenInput = document.getElementById('settingOpeningBgImg');
    let images = hiddenInput.value.split(',').filter(u => u.trim() !== '');
    images.splice(index, 1);
    hiddenInput.value = images.join(',');
    window.state.dashboard.settings.opening_bg_img = hiddenInput.value;
    window.renderOpeningSlider();
    window.saveSettings(true);
    showToast('Foto berhasil dihapus', 'delete');
};

window.scrollOpeningBg = function(direction) {
    const list = document.getElementById('openingBgList');
    if (!list) return;
    const scrollAmount = list.clientWidth * 0.8;
    if (direction === 'left') list.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    else list.scrollBy({ left: scrollAmount, behavior: 'smooth' });
};

(function() {
    function setupCustomDropdown(btnId, listId, optionClass, selectId, labelId) {
        const btn = document.getElementById(btnId);
        const list = document.getElementById(listId);
        const select = document.getElementById(selectId);
        const label = document.getElementById(labelId);
        const options = document.querySelectorAll(`.${optionClass}`);

        if (!btn || !list || !select || !label || !options.length) return;

        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = !list.classList.contains('invisible');
            
            document.querySelectorAll('.dropdown-list-custom').forEach(el => {
                el.classList.add('invisible', 'opacity-0', 'translate-y-2');
            });

            if (!isOpen) {
                list.classList.remove('invisible', 'opacity-0', 'translate-y-2');
            }
        });

        options.forEach(opt => {
            opt.addEventListener('click', (e) => {
                e.stopPropagation();
                const val = opt.getAttribute('data-value');
                const text = opt.querySelector('span').textContent;

                select.value = val;
                label.textContent = text;

                options.forEach(o => o.classList.remove('active'));
                opt.classList.add('active');

                list.classList.add('invisible', 'opacity-0', 'translate-y-2');
            });
        });

        document.addEventListener('click', (e) => {
            if (!btn.contains(e.target) && !list.contains(e.target)) {
                list.classList.add('invisible', 'opacity-0', 'translate-y-2');
            }
        });
    }

    const initDropdowns = () => {
        const rList = document.getElementById('retentionOptionsList');
        if (rList) rList.classList.add('dropdown-list-custom');
        const wList = document.getElementById('wishesLimitOptionsList');
        if (wList) wList.classList.add('dropdown-list-custom');

        setupCustomDropdown('retentionDropdownBtn', 'retentionOptionsList', 'retention-option', 'settingNotificationRetention', 'retentionSelectedLabel');
        setupCustomDropdown('wishesLimitDropdownBtn', 'wishesLimitOptionsList', 'wisheslimit-option', 'settingWishesLimit', 'wishesLimitSelectedLabel');
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDropdowns);
    } else {
        initDropdowns();
    }
})();

window.handleOgImageUpload = function(input) {
    window.uploadSettingImg(input, 'og_image', 'ogImagePreview');
    const btn = document.getElementById('btnRemoveOgImage');
    if (btn) btn.classList.remove('hidden');
};

window.removeOgImage = function() {
    window.deleteSettingImg('og_image', 'ogImagePreview');
    const btn = document.getElementById('btnRemoveOgImage');
    if (btn) btn.classList.add('hidden');
};

// Love Story Admin Module
let lsMessages = [];

window.renderLoveStoryChat = function() {
    const chatList = document.getElementById('lsChatList');
    if (!chatList) return;

    const countEl = document.getElementById('ls_count');
    if (countEl) countEl.innerText = `(${lsMessages.length})`;

    // Handle placeholder
    const placeholder = document.getElementById('chatPlaceholder');
    if (placeholder) {
        placeholder.style.display = lsMessages.length > 0 ? 'none' : 'flex';
    }

    // Clear list
    const existingItems = chatList.querySelectorAll('.chat-item-node');
    existingItems.forEach(el => el.remove());

    lsMessages.forEach((msg, idx) => {
        let contentHTML = '';
        let cardClass = '';

        if (msg.type === 'date') {
            cardClass = 'bg-slate-50 border-slate-200';
            contentHTML = `
                <div class="flex items-center gap-2 w-full">
                    <div class="accent-square bg-slate-400 dark:bg-slate-600 !w-6 !h-6 shrink-0">
                        <i class="fas fa-calendar-day text-[10px]"></i>
                    </div>
                    <div class="flex-1">
                        <label class="text-[10px] sm:text-[11px] font-semibold text-slate-600 px-1">Penanda Tanggal</label>
                        <input type="text" class="input-premium dark:bg-[#141416] dark:border-[#23262f] py-1 h-8 text-xs w-full" placeholder="Cth: 14 Februari 2024" value="${msg.date_label || ''}" onchange="lsMessages[${idx}].date_label = this.value">
                    </div>
                </div>
            `;
        } else {
            const isFemale = msg.sender === 'female';
            const roleName = isFemale ? 'Perempuan' : 'Laki-laki';
            const roleColor = isFemale ? 'pink' : 'blue';

            const lsSettings = (window.state && window.state.dashboard) ? window.state.dashboard.lovestory_settings : {};
            const avatarUrl = isFemale ? (lsSettings.ls_female_avatar || '') : (lsSettings.ls_male_avatar || '');

            cardClass = isFemale ? 'bg-pink-50/50 border-pink-200/50 dark:bg-pink-950/20 dark:border-pink-900/30' : 'bg-blue-50/50 border-blue-200/50 dark:bg-blue-950/20 dark:border-blue-900/30';

            contentHTML = `
                <div class="flex flex-col gap-2 w-full">
                    <div class="flex justify-between items-center bg-white/50 dark:bg-slate-800/50 px-3 py-2 rounded-xl border border-white/80 dark:border-slate-700/50 shadow-sm">
                        <div class="flex items-center gap-2">
                            <div class="w-8 h-8 rounded-full bg-${roleColor}-500 overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-center relative">
                                <img src="${avatarUrl}" class="absolute inset-0 w-full h-full object-cover z-10" onerror="this.classList.add('opacity-0')">
                                <i class="fas ${isFemale ? 'fa-user' : 'fa-user-tie'} text-white text-[13px] leading-none"></i>
                            </div>
                            <span class="text-[10px] font-bold text-${roleColor}-700 dark:text-${roleColor}-400 tracking-tight">${roleName}</span>
                        </div>
                        <div class="flex items-center gap-2 bg-slate-100 dark:bg-[#0b141a] px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-800 transition-all hover:border-indigo-500">
                            <i class="fas fa-clock text-slate-400 dark:text-slate-600 text-[10px]"></i>
                            <input type="text" class="bg-transparent border-none p-0 h-5 w-14 text-center text-[10px] font-bold text-slate-700 dark:text-slate-300 rounded focus:ring-0 outline-none" placeholder="10:00" value="${msg.time || ''}" oninput="lsMessages[${idx}].time = this.value">
                        </div>
                    </div>
                    <div class="relative">
                        <textarea class="input-premium dark:bg-[#141416] dark:border-[#23262f] min-h-[60px] p-2 text-xs w-full font-medium" placeholder="Tulis pesan chat..." onchange="lsMessages[${idx}].message = this.value">${msg.message || ''}</textarea>
                        <div class="absolute bottom-2 right-2 opacity-20 pointer-events-none">
                            <i class="fas fa-quote-right text-sm text-${roleColor}-600 dark:text-${roleColor}-400"></i>
                        </div>
                    </div>
                </div>
            `;
        }

        const li = document.createElement('div');
        li.className = `${cardClass} border rounded-[16px] p-2.5 flex gap-2 mt-2 relative group transition-all duration-300 hover:shadow-md chat-item-node`;
        li.innerHTML = `
            <div class="w-full">
                ${contentHTML}
            </div>
            <button onclick="removeLsMessage(${idx})" class="w-7 h-7 rounded-lg bg-white text-red-500 border border-red-100 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all self-start opacity-0 group-hover:opacity-100 absolute -right-2 -top-2 shadow-md z-10">
                <i class="fas fa-trash-alt text-sm"></i>
            </button>
        `;
        chatList.appendChild(li);
    });
};

window.addLsMessage = function(type) {
    if (type === 'date') {
        lsMessages.push({ type: 'date', date_label: '' });
    } else {
        const now = new Date();
        const hour = now.getHours().toString().padStart(2, '0');
        const min = now.getMinutes().toString().padStart(2, '0');
        const timeStr = `${hour}:${min}`;
        lsMessages.push({ type: 'chat', sender: type, message: '', time: timeStr });
    }
    window.renderLoveStoryChat();
};

window.removeLsMessage = function(idx) {
    lsMessages.splice(idx, 1);
    window.renderLoveStoryChat();
};

window.uploadLsAvatar = async function(input, role, previewId) {
    if (!input.files || !input.files[0]) return;

    const formData = new FormData();
    formData.append('image', input.files[0]);

    try {
        const res = await fetch(`/api/admin/lovestory/avatar/${role}`, {
            method: 'POST',
            body: formData,
            credentials: 'include'
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Upload failed');

        const previewImg = document.getElementById(previewId);
        if (previewImg) {
            previewImg.src = data.src + '?t=' + Date.now(); // Cache bust
            previewImg.classList.remove('opacity-0');
            previewImg.style.opacity = '1';
            
            // Hide the placeholder icon
            const iconId = previewId + 'Icon';
            const iconEl = document.getElementById(iconId);
            if (iconEl) iconEl.style.display = 'none';
        }

        // Update global state
        if (window.state && window.state.dashboard) {
            if (!window.state.dashboard.lovestory_settings) window.state.dashboard.lovestory_settings = {};
            const key = role === 'male' ? 'ls_male_avatar' : (role === 'female' ? 'ls_female_avatar' : 'ls_header_avatar');
            window.state.dashboard.lovestory_settings[key] = data.src;
        }

        // Re-render chat to reflect new avatar
        window.renderLoveStoryChat();

        showToast(currentLang === 'id' ? 'Avatar berhasil diunggah!' : 'Avatar uploaded!', 'success');
    } catch (e) {
        showToast(e.message, 'error');
    } finally {
        input.value = ''; // Reset input
    }
};

window.setLovestoryBgMode = function(mode, skipSave = false) {
    const slider = document.getElementById('lovestoryBgModeSlider');
    const colorBtn = document.getElementById('lovestoryModeColorBtn');
    const imageBtn = document.getElementById('lovestoryModeImageBtn');
    const modeInput = document.getElementById('settingLovestoryBgMode');
    if (!slider || !colorBtn || !imageBtn || !modeInput) return;

    const isImage = mode === 'image';
    modeInput.checked = isImage;
    if (isImage) {
        slider.style.left = 'calc(50% - 1px)';
        slider.style.width = 'calc(50% - 3px)';
        colorBtn.classList.remove('text-white');
        colorBtn.classList.add('text-slate-400');
        imageBtn.classList.remove('text-slate-400');
        imageBtn.classList.add('text-white');
    } else {
        slider.style.left = '4px';
        slider.style.width = 'calc(50% - 3px)';
        colorBtn.classList.remove('text-slate-400');
        colorBtn.classList.add('text-white');
        imageBtn.classList.remove('text-white');
        imageBtn.classList.add('text-slate-400');
    }
    if (isImage) {
        const c = document.getElementById('lovestoryBgPreviewContainer');
        if (c) { c.style.background = ''; c.style.backgroundColor = ''; }
    }
    if (!skipSave) window.saveLoveStory();
};

window.setLovestoryCardBgMode = function(mode, skipSave = false) {
    const slider = document.getElementById('lovestoryCardBgModeSlider');
    const colorBtn = document.getElementById('lovestoryCardModeColorBtn');
    const imageBtn = document.getElementById('lovestoryCardModeImageBtn');
    const modeInput = document.getElementById('settingLovestoryCardBgMode');
    if (!slider || !colorBtn || !imageBtn || !modeInput) return;

    const isImage = mode === 'image';
    modeInput.checked = isImage;
    if (isImage) {
        slider.style.left = 'calc(50% - 1px)';
        slider.style.width = 'calc(50% - 3px)';
        colorBtn.classList.remove('text-white');
        colorBtn.classList.add('text-slate-400');
        imageBtn.classList.remove('text-slate-400');
        imageBtn.classList.add('text-white');
    } else {
        slider.style.left = '4px';
        slider.style.width = 'calc(50% - 3px)';
        colorBtn.classList.remove('text-slate-400');
        colorBtn.classList.add('text-white');
        imageBtn.classList.remove('text-white');
        imageBtn.classList.add('text-slate-400');
    }
    if (isImage) {
        const c = document.getElementById('lovestoryCardBgPreviewContainer');
        if (c) { c.style.background = ''; c.style.backgroundColor = ''; }
    }
    if (!skipSave) window.saveLoveStory();
};

window.uploadLovestoryBgImg = async function(input, target = 'section') {
    if (!input.files || !input.files[0]) return;
    const formData = new FormData();
    formData.append('image', input.files[0]);
    
    const settingKey = target === 'card' ? 'lovestory_card_bg_img' : 'lovestory_bg_img';
    const inputId = target === 'card' ? 'settingLovestoryCardBgImg' : 'settingLovestoryBgImg';
    const previewId = target === 'card' ? 'lovestoryCardBgPreview' : 'lovestoryBgPreview';
    
    formData.append('setting_key', settingKey);

    try {
        const response = await fetch('/api/admin/settings/upload', {
            method: 'POST',
            body: formData,
            credentials: 'include'
        });
        const result = await response.json();
        if (result.success) {
            const hiddenInput = document.getElementById(inputId);
            if (hiddenInput) hiddenInput.value = result.src;
            
            const preview = document.getElementById(previewId);
            if (preview) {
                preview.src = result.src;
                preview.classList.remove('hidden');
                // Hide placeholder icon
                const placeholder = document.getElementById(previewId + 'Placeholder');
                if (placeholder) placeholder.classList.add('hidden');
            }
            window.saveLoveStory();
            showToast('Background berhasil diunggah', 'success');
        } else {
            showToast(result.error || 'Gagal mengunggah gambar', 'error');
        }
    } catch (err) {
        console.error(err);
        showToast('Gagal mengunggah gambar', 'error');
    }
};

window.syncLovestoryColor = function(val, target = 'section') {
    const inputId = target === 'card' ? 'settingLovestoryCardBg' : 'settingLovestoryBg';
    const pickerId = target === 'card' ? 'lovestoryCardColorPicker' : 'lovestoryColorPicker';
    
    const input = document.getElementById(inputId);
    const picker = document.getElementById(pickerId);
    if (!input || !picker) return;

    input.value = val;

    const previewId = target === 'card' ? 'lovestoryCardBgPreviewContainer' : 'lovestoryBgPreviewContainer';
    const previewContainer = document.getElementById(previewId);
    if (previewContainer) {
        if (val.includes('gradient')) previewContainer.style.background = val;
        else {
            previewContainer.style.background = '';
            previewContainer.style.backgroundColor = val;
        }
    }

    window.saveLoveStory();
};

window.saveLoveStory = async function() {
    const titleInput = document.getElementById('ls_title');
    if (!titleInput) return;
    const title = titleInput.value;
    
    const body = {
        title: title,
        lovestory_bg: document.getElementById('settingLovestoryBg')?.value || '',
        lovestory_bg_img: document.getElementById('settingLovestoryBgImg')?.value || '',
        lovestory_bg_mode: document.getElementById('settingLovestoryBgMode')?.checked ? 'image' : 'color',
        lovestory_card_bg: document.getElementById('settingLovestoryCardBg')?.value || '',
        lovestory_card_bg_img: document.getElementById('settingLovestoryCardBgImg')?.value || '',
        lovestory_card_bg_mode: document.getElementById('settingLovestoryCardBgMode')?.checked ? 'image' : 'color',
        messages: lsMessages
    };

    try {
        await api('/api/admin/lovestory', {
            method: 'PUT',
            body: JSON.stringify(body)
        });
        showToast(currentLang === 'id' ? 'Kisah cinta berhasil disimpan!' : 'Love story saved!', 'success');
        await window.loadDashboard();
    } catch (err) {
        showToast(err.message, 'error');
    }
};

window.loadLoveStoryAdmin = async function() {
    try {
        const response = await api('/api/admin/lovestory');
        lsMessages = response.messages || [];
        const lsSettings = response.settings || {};

        const titleEl = document.getElementById('ls_title');
        const mAvatar = document.getElementById('lsGroomAvatar');
        const fAvatar = document.getElementById('lsBrideAvatar');
        const hAvatar = document.getElementById('lsHeaderAvatar');
        const bgInput = document.getElementById('settingLovestoryBg');
        const cardBgInput = document.getElementById('settingLovestoryCardBg');

        if (titleEl) titleEl.value = lsSettings.ls_title || '';
        
        if (mAvatar) {
            mAvatar.src = lsSettings.ls_male_avatar ? (lsSettings.ls_male_avatar + '?t=' + Date.now()) : '';
            const mIcon = document.getElementById('lsGroomAvatarIcon');
            if (lsSettings.ls_male_avatar) {
                mAvatar.classList.remove('opacity-0');
                mAvatar.style.opacity = '1';
                if (mIcon) mIcon.style.display = 'none';
            } else {
                mAvatar.classList.add('opacity-0');
                mAvatar.style.opacity = '0';
                if (mIcon) mIcon.style.display = 'flex';
            }
        }
        if (fAvatar) {
            fAvatar.src = lsSettings.ls_female_avatar ? (lsSettings.ls_female_avatar + '?t=' + Date.now()) : '';
            const fIcon = document.getElementById('lsBrideAvatarIcon');
            if (lsSettings.ls_female_avatar) {
                fAvatar.classList.remove('opacity-0');
                fAvatar.style.opacity = '1';
                if (fIcon) fIcon.style.display = 'none';
            } else {
                fAvatar.classList.add('opacity-0');
                fAvatar.style.opacity = '0';
                if (fIcon) fIcon.style.display = 'flex';
            }
        }
        if (hAvatar) {
            hAvatar.src = lsSettings.ls_header_avatar ? (lsSettings.ls_header_avatar + '?t=' + Date.now()) : '';
            const hIcon = document.getElementById('lsHeaderAvatarIcon');
            if (lsSettings.ls_header_avatar) {
                hAvatar.classList.remove('opacity-0');
                hAvatar.style.opacity = '1';
                if (hIcon) hIcon.style.display = 'none';
            } else {
                hAvatar.classList.add('opacity-0');
                hAvatar.style.opacity = '0';
                if (hIcon) hIcon.style.display = 'flex';
            }
        }

        // Sync to global state to ensure chat bubbles use the same data
        if (window.state && window.state.dashboard) {
            window.state.dashboard.lovestory_settings = {
                ...window.state.dashboard.lovestory_settings,
                ...lsSettings
            };
        }

        if (bgInput) bgInput.value = lsSettings.lovestory_bg || '';
        if (cardBgInput) cardBgInput.value = lsSettings.lovestory_card_bg || '';

        const bgImgInput = document.getElementById('settingLovestoryBgImg');
        const bgPreview = document.getElementById('lovestoryBgPreview');
        if (bgImgInput) bgImgInput.value = lsSettings.lovestory_bg_img || '';
        if (bgPreview && lsSettings.lovestory_bg_img) {
            bgPreview.src = lsSettings.lovestory_bg_img;
            bgPreview.classList.remove('hidden');
        }
        if (lsSettings.lovestory_bg_mode) {
            window.setLovestoryBgMode(lsSettings.lovestory_bg_mode, true);
        }

        // Card settings loading
        const cardBgImgInput = document.getElementById('settingLovestoryCardBgImg');
        const cardBgPreview = document.getElementById('lovestoryCardBgPreview');
        if (cardBgImgInput) cardBgImgInput.value = lsSettings.lovestory_card_bg_img || '';
        if (cardBgPreview && lsSettings.lovestory_card_bg_img) {
            cardBgPreview.src = lsSettings.lovestory_card_bg_img;
            cardBgPreview.classList.remove('hidden');
        }
        if (lsSettings.lovestory_card_bg_mode) {
            window.setLovestoryCardBgMode(lsSettings.lovestory_card_bg_mode, true);
        }

        window.renderLoveStoryChat();
    } catch (err) {
        console.error('Failed to load Love Story:', err);
    }
};

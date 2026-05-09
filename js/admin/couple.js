// Couple Admin Module

window.renderCouple = function() {
    const section = document.getElementById('coupleContainer');
    if (!section) return;
    if (!window.state.dashboard.couple || window.state.dashboard.couple.length < 2) return;
    const [groom, bride] = window.state.dashboard.couple;

    section.innerHTML = `
        <div class="col-span-1 lg:col-span-2 flex justify-between items-center mb-2">
            <h4 class="text-sm font-bold text-slate-900 dark:text-white px-1">Detail Pasangan</h4>
        </div>

        ${[groom, bride].map((person, i) => `
            <article class="bg-white dark:bg-slate-800 card-premium overflow-hidden group border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                <div class="${i === 0 ? 'bg-slate-900 dark:bg-slate-900 border-slate-800' : 'bg-pink-600 dark:bg-pink-900 border-pink-500'} p-6 sm:p-8 text-white relative border-b dark:border-slate-700">
                    <div class="relative z-10">
                        <h3 class="text-2xl sm:text-3xl font-bold tracking-tight">${i === 0 ? t('couple_groom') : t('couple_bride')}</h3>
                        <p class="text-[10px] sm:text-[11px] ${i === 0 ? 'text-slate-400' : 'text-pink-100'} font-semibold mt-1 uppercase tracking-wider opacity-80">${t('couple_profile')}</p>
                    </div>
                    <i class="fas ${i === 0 ? 'fa-mars' : 'fa-venus'} absolute top-6 sm:top-8 right-6 sm:right-8 text-5xl sm:text-6xl opacity-10 group-hover:scale-110 transition-transform"></i>
                </div>
                <div class="p-6 sm:p-8 space-y-6">
                    <div class="space-y-2">
                        <label class="text-[10px] sm:text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-1">${t('couple_role')}</label>
                        <input id="couple${i + 1}Role" type="text" value="${person.role || ''}" class="input-premium" placeholder="Cth: Mempelai Pria">
                    </div>
                    <div class="space-y-2">
                        <label class="text-[10px] sm:text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-1">${t('couple_name')}</label>
                        <input id="couple${i + 1}Name" type="text" value="${person.name || ''}" class="font-bold input-premium" placeholder="Nama Lengkap & Gelar">
                    </div>
                    <div class="space-y-2">
                        <label class="text-[10px] sm:text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-1">${t('couple_parents')}</label>
                        <textarea id="couple${i + 1}Parents" class="input-premium min-h-[80px]" placeholder="Putra/Putri dari Bapak... & Ibu...">${person.parents || ''}</textarea>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div class="space-y-2">
                            <label class="text-[10px] sm:text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-1">Username Instagram</label>
                            <div class="relative">
                                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">@</span>
                                <input id="couple${i + 1}Instagram" type="text" value="${person.instagram ? person.instagram.replace(/^@/, '') : ''}" class="input-premium pl-7" placeholder="username">
                            </div>
                        </div>
                        <div class="space-y-2">
                            <label class="text-[10px] sm:text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-1">Link Instagram (URL)</label>
                            <input id="couple${i + 1}InstagramLink" type="text" value="${person.instagram_link || ''}" class="input-premium" placeholder="https://instagram.com/...">
                        </div>
                    </div>
                    <div class="space-y-2">
                        <label class="text-[10px] sm:text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-1">${t('couple_img')}</label>
                        <div class="flex items-center gap-4">
                            <div class="relative shrink-0 w-16 h-16 sm:w-20 sm:h-20">
                                <div class="w-full h-full bg-slate-50 dark:bg-slate-900 rounded-2xl border-2 border-slate-100 dark:border-slate-700 overflow-hidden flex items-center justify-center">
                                    <img id="couple${i + 1}Preview" src="${person.image_src || ''}" class="w-full h-full object-cover ${person.image_src ? '' : 'hidden'}">
                                    <div id="couple${i + 1}Placeholder" class="${person.image_src ? 'hidden' : 'flex'} items-center justify-center w-full h-full">
                                        <i class="fas ${i === 0 ? 'fa-mars' : 'fa-venus'} text-slate-300 dark:text-slate-600 text-2xl"></i>
                                    </div>
                                </div>
                                ${person.image_src ? `
                                <button type="button" onclick="window.removeCouplePhoto(${i + 1})" style="pointer-events:all" class="absolute -top-2 -right-2 w-7 h-7 bg-rose-500 text-white rounded-full flex items-center justify-center hover:bg-rose-600 transition-all hover:scale-110 active:scale-95 z-30 border-2 border-white dark:border-slate-800 shadow-lg">
                                    <i class="fas fa-times text-[10px] pointer-events-none"></i>
                                </button>
                                ` : ''}
                            </div>
                            <label class="flex-1 cursor-pointer px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-[11px] font-bold hover:bg-indigo-50 dark:hover:bg-indigo-900/50 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-500/50 transition-all text-center group">
                                <i class="fas fa-camera mr-2 opacity-60 group-hover:scale-110 transition-transform"></i> UPLOAD FOTO
                                <input type="file" accept="image/*" class="hidden" onchange="window.uploadCoupleAvatar(this, ${i + 1}, 'couple${i + 1}Preview')">
                            </label>
                            <p class="text-[9px] text-slate-400 mt-2">(Maks. 10MB)</p>
                        </div>
                        <input id="couple${i + 1}Image" type="hidden" value="${person.image_src || ''}">
                    </div>
                </div>
            </article>
        `).join('')}
    `;
};

window.removeCouplePhoto = async function(id) {
    const hiddenInput = document.getElementById(`couple${id}Image`);
    const preview = document.getElementById(`couple${id}Preview`);
    if (hiddenInput) hiddenInput.value = '';
    if (preview) {
        preview.src = '';
        preview.classList.add('hidden');
    }

    const person = window.state.dashboard.couple[id - 1];
    if (person) person.image_src = '';

    try {
        await api(`/api/admin/couple/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                role: document.getElementById(`couple${id}Role`)?.value || '',
                name: document.getElementById(`couple${id}Name`)?.value || '',
                parents: document.getElementById(`couple${id}Parents`)?.value || '',
                instagram: document.getElementById(`couple${id}Instagram`)?.value || '',
                instagram_link: document.getElementById(`couple${id}InstagramLink`)?.value || '',
                image_src: ''
            })
        });
        window.showToast('Foto berhasil dihapus!', 'delete');
    } catch (e) {
        window.showToast('Foto dihapus secara lokal. Simpan untuk menerapkan.', 'info');
    }
    window.renderCouple();
};

window.saveAllCoupleData = async function(btn) {
    try {
        const originalHTML = btn ? btn.innerHTML : '';
        if (btn) {
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> MENYIMPAN...';
        }

        // 1. Ambil data dari input SEBELUM saveSettings (agar tidak kena tindih refresh)
        const couplePayloads = [1, 2].map(id => {
            const prefix = `couple${id}`;
            const roleEl = document.getElementById(`${prefix}Role`);
            const nameEl = document.getElementById(`${prefix}Name`);
            const parentsEl = document.getElementById(`${prefix}Parents`);
            const igEl = document.getElementById(`${prefix}Instagram`);
            const igLinkEl = document.getElementById(`${prefix}InstagramLink`);
            const imgEl = document.getElementById(`${prefix}Image`);

            let instagram = igEl ? igEl.value.trim() : '';
            if (instagram && !instagram.startsWith('@')) instagram = '@' + instagram;

            return {
                id,
                payload: {
                    role: roleEl ? roleEl.value : '',
                    name: nameEl ? nameEl.value : '',
                    parents: parentsEl ? parentsEl.value : '',
                    instagram: instagram,
                    instagram_link: igLinkEl ? igLinkEl.value : '',
                    image_src: imgEl ? imgEl.value : '',
                    description: '' // Sesuai kolom di database
                }
            };
        });

        // 2. Simpan pengaturan umum (Lewati reload otomatis)
        await window.saveSettings(true, null, true);

        // 3. Simpan data pasangan satu per satu secara berurutan (Sequential)
        for (const item of couplePayloads) {
            await api(`/api/admin/couple/${item.id}`, { 
                method: 'PUT', 
                body: JSON.stringify(item.payload) 
            });
        }
        
        window.showToast('Semua data pasangan berhasil diperbarui!', 'success');
        
        // 4. Muat ulang dashboard SEKALI saja di akhir
        await window.loadDashboard();
    } catch (err) {
        console.error('Save error:', err);
        let msg = err.message;
        if (err.data && err.data.error) msg = err.data.error;
        window.showToast('Gagal menyimpan data: ' + msg, 'error');
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = 'Simpan';
        }
        const btns = document.querySelectorAll('button[onclick="window.saveAllCoupleData(this)"]');
        btns.forEach(b => {
            if (b) {
                b.disabled = false;
                b.innerHTML = 'Simpan';
            }
        });
    }
};

window.uploadCoupleAvatar = async function(input, coupleId, previewId) {
    if (!input.files || !input.files[0]) return;

    const formData = new FormData();
    formData.append('image', input.files[0]);

    try {
        const res = await fetch(`/api/admin/couple/${coupleId}/photo`, {
            method: 'POST',
            body: formData,
            credentials: 'include'
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Upload failed');

        // Update state
        const person = window.state.dashboard.couple[coupleId - 1];
        if (person) person.image_src = data.src;

        // Re-render to show delete button
        window.renderCouple();

        window.showToast('Foto pasangan berhasil diunggah!', 'success');
    } catch (e) {
        window.showToast('Gagal mengupload foto: ' + e.message, 'error');
    }
};

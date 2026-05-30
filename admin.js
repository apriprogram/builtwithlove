async function loadPageViews() {
    try {
        const data = await api('/api/admin/pageviews');
        const total = data.total || 0;
        const unique = data.unique || 0;
        const today = data.today || 0;
        const week = data.week || 0;

        if (document.getElementById('totalPageViews'))
            document.getElementById('totalPageViews').innerText = total;
        if (document.getElementById('pageViewsTodayBadge'))
            document.getElementById('pageViewsTodayBadge').innerText = `+${today} hari ini`;
        if (document.getElementById('uniquePageViews'))
            document.getElementById('uniquePageViews').innerText = unique;

        // Progress bar: ratio of this week vs total
        const bar = document.getElementById('pageViewsBar');
        if (bar) {
            const pct = total > 0 ? Math.min(100, Math.round((week / total) * 100)) : 0;
            bar.style.width = pct + '%';
        }
    } catch (e) {
        console.error('Failed to load page views:', e);
    }
}

window.resetPageViews = function() {
    window.deleteWithConfirm(async () => {
        const btn = document.getElementById('resetPageViewsBtn');
        if (btn) {
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin text-[9px]"></i><span class="text-[9px] font-semibold uppercase">Mereset...</span>';
        }
        try {
            await api('/api/admin/pageviews', { method: 'DELETE' });

            // Reset all UI counters to zero immediately
            if (document.getElementById('totalPageViews')) document.getElementById('totalPageViews').innerText = '0';
            if (document.getElementById('pageViewsTodayBadge')) document.getElementById('pageViewsTodayBadge').innerText = '+0 hari ini';
            if (document.getElementById('uniquePageViews')) document.getElementById('uniquePageViews').innerText = '0';
            const bar = document.getElementById('pageViewsBar');
            if (bar) bar.style.width = '0%';

            window.showToast('Data page views berhasil direset!', 'success');
        } catch (err) {
            window.showToast('Gagal mereset data views: ' + err.message, 'error');
        } finally {
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = '<i class="fas fa-trash-alt text-[9px]"></i><span class="text-[9px] font-semibold uppercase">Reset</span>';
            }
        }
    }, {
        message: `Semua data Page Views (${document.getElementById('totalPageViews')?.innerText || '0'} kunjungan) akan dihapus permanen. Hitungan akan dimulai dari nol.`
    });
};

window.deleteAllData = function(type) {
    let title = '';
    let url = '';
    if (type === 'guests') { title = 'semua Undangan Tamu'; url = '/api/admin/guests/all'; }
    if (type === 'rsvps') { title = 'semua Kehadiran (RSVP)'; url = '/api/admin/rsvps/all'; }
    if (type === 'wishes') { title = 'semua Papan Pesan (Ucapan)'; url = '/api/admin/wishes/all'; }

    window.deleteWithConfirm(async () => {
        try {
            await api(url, { method: 'DELETE' });
            window.showToast('Data berhasil dihapus semua!', 'success');
            await window.loadDashboard();
        } catch (err) {
            window.showToast('Gagal menghapus data: ' + err.message, 'error');
        }
    }, {
        message: `Apakah Anda yakin ingin menghapus ${title}? Tindakan ini tidak dapat dibatalkan.`
    });
};
const translations = {
    id: {
        // HTML Translations
        "brand_title": "Undangan Digital",
        "brand_subtitle": "Panel Admin",
        "menu_main_invitation": "Atur Undangan",
        "menu_main_guest": "Manajemen Tamu",
        "menu_dashboard": "Dasbor",
        "menu_settings": "Pengaturan",
        "menu_events": "Acara",
        "menu_couple": "Pasangan",
        "menu_guests": "Buat Undangan Tamu",
        "menu_gallery": "Galeri",
        "menu_lovestory": "Kisah Cinta",
        "menu_rsvp": "Kehadiran",
        "menu_wishes": "Ucapan",
        "page_title_rsvp": "Manajemen Kehadiran",
        "page_title_wishes": "Daftar Ucapan",
        "page_title_guests": "Undangan Tamu",
        "profile_role": "Admin Utama",
        "status_active": "Aktif",
        "login_title": "Area Terlindungi",
        "login_subtitle": "Masuk untuk mengelola portal masa pernikahan Anda",
        "login_id": "Email",
        "login_id_ph": "Masukkan email",
        "login_key": "Password",
        "login_key_ph": "Sandi / Password",
        "login_btn": "Login",
        "login_hint": "Kredensial bawaan:",
        "login_forgot": "Lupa password?",
        "stat_badge_1": "Waktu Nyata",
        "stat_badge_2": "Interaksi",
        "stat_badge_3": "Aset",
        "stat_badge_4": "Buku Tamu",
        "stat_title_1": "Total Kehadiran",
        "stat_title_2": "Ucapan Pernikahan",
        "stat_title_3": "Gambar Galeri",
        "stat_title_4": "Undangan Tamu",
        "guide_title": "Panduan",
        "guide_desc": "Semua fitur terhubung langsung ke situs web utama. Perubahan akan langsung terlihat oleh tamu undangan.",
        "guide_warn": "PENTING: Selalu periksa kembali data lokasi dan sematan peta untuk memastikan tamu tidak tersesat!",
        "workflow_title": "Alur Kerja Cepat",
        "wf_1_a": "Pilih Bagian:",
        "wf_1_b": "Pilih topik dari bilah sisi.",
        "wf_2_a": "Ubah Data:",
        "wf_2_b": "Isi formulir nilai.",
        "wf_3_a": "Sinkronisasi:",
        "wf_3_b": "Klik simpan untuk memperbarui portal.",
        "set_title": "Pengaturan Umum",
        "set_subtitle": "Identitas website & teks",
        "set_sync_btn": "Sinkronkan",
        "set_label_1": "Branding Sampul",
        "set_label_2": "Tampilan Mempelai",
        "set_label_3": "Nama Panggilan Hero",
        "set_label_4": "Awalan Sapaan Tamu",
        "set_label_5": "Label Teks Undangan",
        "set_label_6": "Label Tombol Utama",
        "gst_title": "Link Undangan Tamu",
        "gst_subtitle": "Pusat token akses tamu",
        "gst_ph": "Nama tamu...",
        "gst_add_btn": "TAMBAH",
        "col_id": "ID",
        "col_guest_name": "Nama Tamu",
        "col_access_url": "URL Akses",
        "col_command": "Aksi",
        "gal_title": "Galeri Foto",
        "gal_upload_btn": "UNGGAH BARU",
        "col_no": "No Urut",
        "col_asset": "Galeri Foto",
        "col_desc": "Judul foto",
        "col_manage": "Aksi",
        "data_total_rsvp": "Total Kehadiran",
        "data_confirmed": "Tamu Terkonfirmasi",
        "data_wishes": "Ucapan",
        "data_replies": "Balasan",
        "tbl_track_title": "Pelacak Konfirmasi",
        "col_name": "Nama",
        "col_decision": "Keputusan",
        "col_pax": "Jumlah Tamu",
        "col_time": "Waktu",
        "tbl_msg_title": "Papan Pesan",
        "col_from": "Dari",
        "col_message": "Pesan",
        "col_sent": "Terkirim",
        "footer_brand": "Panel Admin Undangan Digital",
        "mod_title": "Tambah Aset Visual",
        "mod_upload": "Unggah Media",
        "mod_new_asset": "Aset Baru",
        "mod_drag": "Tarik & Lepaskan Bukti",
        "mod_alt": "Deskripsi (Alt)",
        "mod_alt_ph": "Cth: Cincin kawin",
        "mod_cancel": "Batal",
        "mod_submit": "Simpan",
        "search_placeholder": "Pencarian cepat...",
        "menu_profile": "Profil",
        "menu_help": "Bantuan",
        "menu_logout": "Keluar",

        // JS Dynamic Translations
        "event_prefix": "Acara #",
        "event_op_details": "Detail operasional",
        "event_btn_update": "Simpan",
        "event_display_name": "Nama Tampilan",
        "event_header_heading": "Judul Header",
        "event_timeline": "Jadwal",
        "event_cal_date": "Tanggal Kalender",
        "event_venue_id": "Identitas Tempat",
        "event_phys_addr": "Alamat Fisik",
        "event_map_src": "Sumber Google Maps",
        "event_dir_link": "Tautan Arah",
        "event_icon_key": "Kunci Ikon Visual",

        "couple_groom": "Mempelai Pria",
        "couple_bride": "Mempelai Wanita",
        "couple_profile": "Profil Utama",
        "couple_role": "Peran Inti",
        "couple_name": "Nama Lengkap",
        "couple_parents": "Garis Keluarga (Orang Tua)",
        "couple_ig": "Identitas Instagram",
        "couple_img": "Tautan Gambar",
        "couple_btn": "Simpan",

        "alert_logout": "Minta otorisasi penghentian sesi saat ini?",
        "alert_settings_sync": "Perubahan berhasil disimpan.",
        "alert_event_updated": "Acara #{id} diperbarui.",
        "alert_couple_updated": "Profil utama #{id} diperbarui.",
        "alert_guest_revoke": "Cabut akses untuk tamu ini?",
        "alert_link_copied": "URL Akses disalin ke papan klip.",
        "alert_gallery_purge": "Hapus aset ini dari perpustakaan?",
        "welcome": "Selamat Datang!",
        "data_loaded": "Data berhasil dimuat"
    }
};

window.currentLang = 'id';
let isAppLoaded = false;
window.state = {
    dashboard: null,
    currentNotificationTab: 'all'
};

function t(key, params = {}) {
    if (!translations[currentLang]) return key;
    let str = translations[currentLang][key] || key;
    Object.keys(params).forEach(p => {
        str = str.replace(`{${p}}`, params[p]);
    });
    return str;
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.innerText = t(key);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        el.setAttribute('placeholder', t(key));
    });
}

async function api(path, options = {}) {
    const url = new URL(path, window.location.origin);
    if (!options.method || options.method === 'GET') {
        url.searchParams.append('_t', Date.now());
    }
    const res = await fetch(url, {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        ...options,
    });

    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        const data = await res.json();
        if (!res.ok) {
            const err = new Error(data.error || `API Error (${res.status})`);
            err.data = data;
            throw err;
        }
        return data;
    } else {
        const text = await res.text();
        if (!res.ok) {
            if (res.status === 404) throw new Error('Route tidak ditemukan. Mohon RESTART server Node.js Anda.');
            throw new Error(`Server Error (${res.status})`);
        }
        return text;
    }
}

// Section Management
const sections = ['overview', 'settings', 'events', 'guests', 'lovestory', 'rsvp_data', 'wishes_data', 'profile', 'help'];
let navButtons = Array.from(document.querySelectorAll('.admin-nav-button'));
const sidebar = document.getElementById('sidebar');
const dashboardPanel = document.getElementById('dashboardPanel');
const loginPanel = document.getElementById('loginPanel');
const pageTitle = document.getElementById('pageTitle');

window.showSection = function (name) {
    sections.forEach((section) => {
        const panel = document.getElementById(section);
        if (panel) panel.classList.toggle('hidden', section !== name);
    });
    navButtons.forEach((button) => button.classList.toggle('active', button.dataset.section === name));

    if (window.innerWidth < 1024) sidebar.classList.add('-translate-x-full');

    const activeBtn = navButtons.find(b => b.dataset.section === name);
    if (activeBtn && pageTitle) pageTitle.innerText = activeBtn.innerText.trim();

    if (name === 'profile') loadProfileData();
    if (name === 'wishes_data') {
        if (window.renderWishesData) window.renderWishesData();
    }
    if (name === 'lovestory' || name === 'events') {
        window.loadLoveStoryAdmin();
        if (name === 'events') {
            setTimeout(() => {
                const activeTab = document.querySelector('.atur-tab-btn.active');
                if (activeTab) window.switchAturTab(activeTab.getAttribute('data-tab'));
                else window.switchAturTab('pembuka');
            }, 50);
        }
    }
    scrollTo(0, 0);
};

// Dashboard Counts & Previews
function renderDashboardCounts() {
    if (!window.state.dashboard) return;
    const rsvps = window.state.dashboard.rsvps || [];
    const guests = window.state.dashboard.guests || [];
    const wishes = window.state.dashboard.wishes || [];

    if (document.getElementById('totalRsvp')) document.getElementById('totalRsvp').innerText = rsvps.length;
    if (document.getElementById('totalWishes')) document.getElementById('totalWishes').innerText = wishes.length;

    const totalGuestsOverview = document.getElementById('totalGuestsOverview');
    if (totalGuestsOverview) totalGuestsOverview.innerText = guests.length;

    const confirmedCount = rsvps.length;
    const totalGuestsCount = guests.length;
    const pendingCount = Math.max(0, totalGuestsCount - confirmedCount);

    if (document.getElementById('rsvpConfirmedCount')) document.getElementById('rsvpConfirmedCount').innerText = confirmedCount;
    if (document.getElementById('rsvpPendingCount')) document.getElementById('rsvpPendingCount').innerText = pendingCount;
    const barEl = document.getElementById('rsvpProgressBar');
    if (barEl) {
        const pct = totalGuestsCount > 0 ? Math.min(100, Math.round((confirmedCount / totalGuestsCount) * 100)) : 0;
        barEl.style.width = pct + '%';
    }

    renderDashboardPreviews();
}

let dashboardRsvpVisibleCount = 20;
let dashboardWishesVisibleCount = 10;
let isRsvpRendering = false;
let isWishesRendering = false;

function renderDashboardPreviews() {
    if (!window.state.dashboard) return;
    renderRsvpItems();
    renderWishesItems();
    setupDashboardLazyLoad();
}

function setupDashboardLazyLoad() {
    const rsvpContainer = document.querySelector('#dashboardRsvpPreview')?.parentElement;
    const wishesContainer = document.querySelector('#dashboardWishesPreview');

    if (rsvpContainer && !rsvpContainer.dataset.lazyLoaded) {
        rsvpContainer.dataset.lazyLoaded = 'true';
        rsvpContainer.addEventListener('scroll', () => {
            if (isRsvpRendering) return;
            if (rsvpContainer.scrollTop + rsvpContainer.clientHeight >= rsvpContainer.scrollHeight - 100) {
                if (dashboardRsvpVisibleCount < (window.state.dashboard.rsvps || []).length) {
                    dashboardRsvpVisibleCount += 20;
                    renderRsvpItems(true);
                }
            }
        });
    }

    if (wishesContainer && !wishesContainer.dataset.lazyLoaded) {
        wishesContainer.dataset.lazyLoaded = 'true';
        wishesContainer.addEventListener('scroll', () => {
            if (isWishesRendering) return;
            if (wishesContainer.scrollTop + wishesContainer.clientHeight >= wishesContainer.scrollHeight - 100) {
                if (dashboardWishesVisibleCount < (window.state.dashboard.wishes || []).length) {
                    dashboardWishesVisibleCount += 10;
                    renderWishesItems(true);
                }
            }
        });
    }
}

function renderRsvpItems(isMore = false) {
    const rsvpBody = document.getElementById('dashboardRsvpPreview');
    const loading = document.getElementById('rsvpLoading');
    if (!rsvpBody || !window.state.dashboard) return;

    isRsvpRendering = true;
    if (loading) loading.classList.remove('hidden');

    const list = (window.state.dashboard.rsvps || []).slice(0, dashboardRsvpVisibleCount);

    setTimeout(() => {
        if (list.length === 0) {
            rsvpBody.innerHTML = `<tr><td colspan="5" class="px-8 py-16 text-center text-slate-400 dark:text-slate-500"><div class="text-4xl font-black opacity-10 mb-2">-</div><p class="text-[10px] font-bold uppercase tracking-widest opacity-30">Belum ada data</p></td></tr>`;
        } else {
            rsvpBody.innerHTML = list.map(item => {
                const guestName = item.guest_name || '-';
                const status = item.status || '-';
                const badgeClass = status.toLowerCase() === 'hadir' ? 'badge-paid' : (status === '-' ? 'bg-slate-100 text-slate-400' : 'badge-pending');
                const dateStr = item.created_at ? new Date(item.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' }) : '-';
                return `
                    <tr class="group hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors border-b border-slate-100 dark:border-slate-800/50 last:border-0">
                        <td class="font-semibold text-slate-900 dark:text-slate-100 text-[11px] sm:text-sm tracking-tight px-8 py-0 whitespace-nowrap">
                            <div class="flex items-center gap-2 sm:gap-3">
                                <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black text-[10px] sm:text-xs shrink-0">${((guestName && guestName !== '-') ? guestName.charAt(0) : '?').toUpperCase()}</div>
                                ${guestName}
                            </div>
                        </td>
                        <td class="px-8 py-0"><span class="badge-modern !text-[9px] sm:!text-[11px] ${badgeClass}">${status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}</span></td>
                        <td class="text-center font-semibold text-slate-900 dark:text-white text-[10px] sm:text-sm px-8 py-0">${item.guest_count || '-'} ${item.guest_count ? 'org' : ''}</td>
                        <td class="text-right text-slate-400 dark:text-slate-100 text-[10px] sm:text-sm font-semibold tracking-tight px-8 py-0">${dateStr}</td>
                        <td class="text-right px-8 py-0">
                            <button onclick="window.deleteRsvp('${item.id}')" class="btn-premium btn-secondary !p-0 w-8 h-8 ml-auto text-slate-400 dark:text-slate-500 hover:!bg-red-500 hover:!text-white hover:!border-red-500">
                                <i class="fas fa-trash-can text-xs pointer-events-none"></i>
                            </button>
                        </td>
                    </tr>
                `;
            }).join('');
        }
        if (loading) loading.classList.add('hidden');
        isRsvpRendering = false;
    }, isMore ? 300 : 0);
}

function renderWishesItems(isMore = false) {
    const wishesContainer = document.getElementById('dashboardWishesPreview');
    const loading = document.getElementById('wishesLoading');
    if (!wishesContainer || !window.state.dashboard) return;

    isWishesRendering = true;
    if (loading) loading.classList.remove('hidden');

    const list = (window.state.dashboard.wishes || []).slice(0, dashboardWishesVisibleCount);

    setTimeout(() => {
        if (list.length === 0) {
            wishesContainer.innerHTML = `<div class="py-16 text-center text-slate-400 dark:text-slate-500"><div class="text-4xl font-black opacity-10 mb-2">-</div><p class="text-[10px] font-bold uppercase tracking-widest opacity-30">Belum ada ucapan</p></div>`;
        } else {
            wishesContainer.innerHTML = list.map(item => {
                const guestName = item.guest_name || '-';
                const message = item.message || '-';
                const dateStr = item.created_at ? new Date(item.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' }) : '-';
                const initial = (guestName !== '-' ? guestName.charAt(0) : '?').toUpperCase();
                const adminAvatar = document.getElementById('headerUserAvatar') ? document.getElementById('headerUserAvatar').src : '';
                const adminName = (window.state.dashboard.settings && window.state.dashboard.settings.hero_name) || 'Admin';
                const replyDisplay = item.reply ? `
                    <div class="mt-2 ml-10 flex items-start gap-3 opacity-95 scale-[0.98] origin-top-left transition-all bg-indigo-50/50 dark:bg-indigo-500/5 p-2.5 rounded-xl border border-indigo-100/50 dark:border-indigo-500/20">
                        <img src="${adminAvatar}" alt="${adminName}" class="w-6 h-6 rounded-full object-cover border-2 border-white dark:border-slate-900 shadow-sm shrink-0" onerror="this.src='https://ui-avatars.com/api/?name=A&background=4f46e5&color=fff&bold=true&size=56'">
                        <div class="min-w-0">
                            <p class="text-[9px] mb-0.5 leading-none"><span class="font-bold text-slate-900 dark:text-slate-100">${adminName}</span></p>
                            <p class="text-[11px] text-slate-600 dark:text-slate-400 leading-snug font-medium">${item.reply}</p>
                        </div>
                    </div>
                ` : '';

                return `
                    <div class="px-4 py-2.5 hover:bg-indigo-50/50 dark:hover:bg-slate-800/50 transition-all rounded-xl mx-1 my-0.5 hover:ring-2 hover:ring-indigo-400 dark:hover:ring-indigo-500/30 group">
                        <div class="flex items-start gap-3.5">
                            <div class="w-7 h-7 rounded-full bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 flex items-center justify-center font-black text-[11px] shrink-0 border border-blue-100 dark:border-slate-700 mt-1 shadow-sm">${initial}</div>
                            <div class="flex-1 min-w-0">
                                <div class="flex items-center gap-2">
                                    <h5 class="text-[12px] font-bold text-slate-900 dark:text-slate-100 truncate">${guestName}</h5>
                                    <span class="text-[9px] text-slate-400 dark:text-slate-500 font-bold">${dateStr}</span>
                                </div>
                                <p class="text-[12px] text-slate-700 dark:text-slate-300 mt-0.5 leading-snug font-medium">${message}</p>
                                <div class="flex items-center gap-2 mt-1.5">
                                    <button onclick="window.toggleReplyInput(this, '${item.id}')" class="text-blue-500 hover:text-blue-700 transition-colors p-1" title="Reply">
                                        <i class="fas ${item.reply ? 'fa-edit' : 'fa-reply'} text-[11px] pointer-events-none"></i>
                                    </button>
                                    ${item.reply ? `<button onclick="window.deleteReply('${item.id}')" class="text-amber-500 hover:text-amber-700 transition-colors p-1" title="Delete Reply"><i class="fas fa-times text-[11px] pointer-events-none"></i></button>` : ''}
                                    <button onclick="window.deleteWish('${item.id}')" class="text-rose-500 hover:text-rose-700 transition-colors p-1" title="Delete Wish">
                                        <i class="fas fa-trash-can text-[11px] pointer-events-none"></i>
                                    </button>
                                </div>
                                <div id="replyBox_${item.id}" class="hidden mt-2 flex items-center gap-2">
                                    <input type="text" id="replyInput_${item.id}" value="${(item.reply || '').replace(/"/g, '&quot;')}" placeholder="Tulis balasan..." class="flex-1 h-8 bg-white border border-slate-200 rounded-full px-3 text-[10px] focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all">
                                    <button onclick="window.submitReply(this, '${item.id}')" class="btn-premium btn-primary !h-8 !px-4 !rounded-full !text-[10px] shrink-0 font-bold">
                                        Kirim
                                    </button>
                                </div>
                                ${replyDisplay}
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }
        if (loading) loading.classList.add('hidden');
        isWishesRendering = false;
    }, isMore ? 300 : 0);
}

// Core App Initialization
window.loadDashboard = async function() {
    try {
        const data = await api('/api/admin/dashboard');
        window.state.dashboard = data;

        try { renderDashboardCounts(); } catch (e) { console.error('Dashboard counts error:', e); }
        try { window.renderSettings(); } catch (e) { console.error('Settings error:', e); }
        try { window.renderRsvpData(); } catch (e) { console.error('RSVP data error:', e); }
        try { window.renderWishesData(); } catch (e) { console.error('Wishes data error:', e); }
        try { window.renderEvents(); } catch (e) { console.error('Events error:', e); }
        try { window.renderGifts(); } catch (e) { console.error('Gifts error:', e); }
        try { window.renderCouple(); } catch (e) { console.error('Couple error:', e); }
        try { window.renderGuests(); } catch (e) { console.error('Guests error:', e); }
        try { window.renderGallery(); } catch (e) { console.error('Gallery error:', e); }
        try { await window.loadLoveStoryAdmin(); } catch (e) { console.error('Love story error:', e); }
        try { await window.loadProfileData(); } catch (e) { console.error('Profile data error:', e); }
        try { populateNotifications(); } catch (e) { console.error('Notifications error:', e); }
        try { await loadPageViews(); } catch (e) { console.error('Page views error:', e); }
        
        // Clear search inputs to prevent autofill
        const dsInput = document.getElementById('desktopSearchInput');
        const mbInput = document.getElementById('mobileSearchInput');
        if (dsInput) dsInput.value = '';
        if (mbInput) mbInput.value = '';
        
        if (!sessionStorage.getItem('welcome_toast_shown')) {
            window.showToast('Selamat Datang di Panel Admin!', 'success');
            sessionStorage.setItem('welcome_toast_shown', 'true');
        } else {
            // Optional: toast on refresh but only once in a while or different message
            // window.showToast('Data berhasil dimuat', 'info');
        }

        applyTranslations();
        isAppLoaded = true;
    } catch (err) {
        throw err;
    }
};

async function checkLogin() {
    try {
        const ver = await fetch('/api/version').then(r => r.json()).catch(() => ({ version: 'old' }));
        console.log('API Version:', ver.version);
        if (ver.version === 'old') {
            console.warn('SERVER BELUM DI-RESTART! Mohon restart Node.js Anda.');
        }

        const status = await api('/api/admin/status');
        if (status.authenticated) {
            const dashboardPanel = document.getElementById('dashboardPanel');
            if (dashboardPanel) dashboardPanel.classList.remove('hidden');
            const profileContainer = document.getElementById('profileDropdownContainer');
            if (profileContainer) profileContainer.classList.remove('hidden');
            await window.loadDashboard();
        } else {
            window.location.href = '/login';
        }
    } catch (err) {
        window.location.href = '/login';
    }
}

window.logout = function () {
    window.deleteWithConfirm(async () => {
        try {
            await api('/api/admin/logout', { method: 'POST' });
        } catch (e) {
            console.error('Logout API failed:', e);
        }
        window.location.href = '/login';
    }, {
        message: t('alert_logout'),
        confirmText: 'Keluar Sekarang',
        btnClass: 'btn-danger',
        icon: 'fa-power-off'
    });
};

// Event Listeners

document.addEventListener('click', (e) => {
    const navBtn = e.target.closest('.admin-nav-button');
    if (navBtn) window.showSection(navBtn.dataset.section);

    if (e.target.closest('#mobileSidebarToggle')) {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) sidebar.classList.toggle('-translate-x-full');
    } else if (!e.target.closest('#sidebar') && window.innerWidth < 1024) {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) sidebar.classList.add('-translate-x-full');
    }

    // Close all header menus if clicked outside
    if (!e.target.closest('#profileDropdownBtn') && !e.target.closest('#profileDropdownMenu') &&
        !e.target.closest('#notificationsBtn') && !e.target.closest('#notificationsMenu') &&
        !e.target.closest('#desktopSearchContainer') && !e.target.closest('#globalSearchResults') &&
        !e.target.closest('#mobileSearchPanel') && !e.target.closest('#mobileSearchToggle')) {
        if (typeof closeAllHeaderMenus === 'function') closeAllHeaderMenus();
    }
});

// Profile & Menus
function closeAllHeaderMenus(keepSearchPanel = false) {
    const profileMenu = document.getElementById('profileDropdownMenu');
    if (profileMenu) {
        profileMenu.classList.add('opacity-0', 'scale-95', 'pointer-events-none', '-translate-y-4');
        profileMenu.classList.remove('opacity-100', 'scale-100', 'translate-y-0');
    }
    
    const notifMenu = document.getElementById('notificationsMenu');
    if (notifMenu) {
        notifMenu.classList.add('opacity-0', 'scale-95', 'pointer-events-none', '-translate-y-4');
        notifMenu.classList.remove('opacity-100', 'scale-100', 'translate-y-0');
    }
    
    if (!keepSearchPanel) {
        const searchPanel = document.getElementById('mobileSearchPanel');
        if (searchPanel) {
            searchPanel.classList.add('opacity-0', '-translate-y-4');
            searchPanel.classList.remove('opacity-100', 'translate-y-0');
            setTimeout(() => searchPanel.classList.add('hidden'), 300);
        }

        const globalResults = document.getElementById('globalSearchResults');
        if (globalResults) globalResults.classList.add('hidden');
    }
}

const profileBtn = document.getElementById('profileDropdownBtn');
if (profileBtn) {
    profileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const profileMenu = document.getElementById('profileDropdownMenu');
        const isCurrentlyHidden = profileMenu.classList.contains('opacity-0');
        if (isCurrentlyHidden) {
            closeAllHeaderMenus();
            profileMenu.classList.remove('opacity-0', 'scale-95', 'pointer-events-none', '-translate-y-4');
            profileMenu.classList.add('opacity-100', 'scale-100', 'translate-y-0');
        } else {
            profileMenu.classList.add('opacity-0', 'scale-95', 'pointer-events-none', '-translate-y-4');
            profileMenu.classList.remove('opacity-100', 'scale-100', 'translate-y-0');
        }
    });
}

// Music Management
window.openMusicModal = function() { window.showModal('musicUploadModal'); };
window.removeBgMusic = async function() {
    if (!confirm('Hapus musik latar?')) return;
    try {
        await api('/api/admin/settings', { method: 'PUT', body: JSON.stringify({ bg_music: '' }) });
        window.showToast('Musik latar dihapus', 'success');
        await window.loadDashboard();
    } catch (err) { window.showToast(err.message, 'error'); }
};

window.closeMusicModal = function() { window.hideModal('musicUploadModal'); };

window.resetMusicInput = function() {
    const input = document.getElementById('musicFileInput');
    const placeholder = document.getElementById('musicUploadPlaceholder');
    const selected = document.getElementById('musicFileSelected');
    if (input) input.value = '';
    if (placeholder) placeholder.classList.remove('hidden');
    if (selected) selected.classList.add('hidden');
};

document.addEventListener('DOMContentLoaded', () => {
    const musicInput = document.getElementById('musicFileInput');
    if (musicInput) {
        musicInput.addEventListener('change', (e) => {
            if (e.target.files && e.target.files[0]) {
                const name = e.target.files[0].name;
                const nameLabel = document.getElementById('musicSelectedName');
                const placeholder = document.getElementById('musicUploadPlaceholder');
                const selected = document.getElementById('musicFileSelected');
                
                if (nameLabel) nameLabel.innerText = name;
                if (placeholder) placeholder.classList.add('hidden');
                if (selected) selected.classList.remove('hidden');
            }
        });
    }

    // Custom Audio Player Listeners
    const audio = document.getElementById('music_preview');
    if (audio) {
        audio.addEventListener('timeupdate', () => {
            const current = audio.currentTime;
            const duration = audio.duration || 0;
            const progress = duration > 0 ? (current / duration) * 100 : 0;
            
            const progressBar = document.getElementById('progressBar');
            const currentTimeEl = document.getElementById('currentTime');
            
            if (progressBar) progressBar.style.width = `${progress}%`;
            if (currentTimeEl) currentTimeEl.innerText = formatAudioTime(current);
        });

        audio.addEventListener('loadedmetadata', () => {
            const durationEl = document.getElementById('duration');
            if (durationEl) durationEl.innerText = formatAudioTime(audio.duration);
        });

        audio.addEventListener('ended', () => {
            const playIcon = document.getElementById('playIcon');
            if (playIcon) playIcon.className = 'fas fa-play text-xs transition-transform group-active:scale-90';
            const progressBar = document.getElementById('progressBar');
            if (progressBar) progressBar.style.width = '0%';
        });

        audio.addEventListener('play', () => {
            const playIcon = document.getElementById('playIcon');
            if (playIcon) playIcon.className = 'fas fa-pause text-xs transition-transform group-active:scale-90';
        });

        audio.addEventListener('pause', () => {
            const playIcon = document.getElementById('playIcon');
            if (playIcon) playIcon.className = 'fas fa-play text-xs transition-transform group-active:scale-90';
        });
    }

    function formatAudioTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min}:${sec.toString().padStart(2, '0')}`;
    }
});

window.toggleMusicPreview = function() {
    const audio = document.getElementById('music_preview');
    if (!audio) return;
    if (audio.paused) audio.play();
    else audio.pause();
};

window.seekMusic = function(e) {
    const audio = document.getElementById('music_preview');
    const container = document.getElementById('progressContainer');
    if (!audio || !container || !audio.duration) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const percentage = Math.max(0, Math.min(1, x / width));
    audio.currentTime = percentage * audio.duration;
};

window.updateVolume = function(val) {
    const audio = document.getElementById('music_preview');
    const icon = document.getElementById('volumeIcon');
    if (!audio) return;
    audio.volume = val;
    
    if (icon) {
        if (val == 0) icon.className = 'fas fa-volume-mute text-red-400 text-[10px]';
        else if (val < 0.5) icon.className = 'fas fa-volume-down text-slate-400 text-[10px]';
        else icon.className = 'fas fa-volume-up text-slate-400 text-[10px]';
    }
};

window.startMusicAnalysis = async function() {
    const audio = document.getElementById('music_preview');
    const btn = document.getElementById('btnAnalyzeRef');
    const input = document.getElementById('settingMusicStart');
    
    if (!audio || !audio.src || audio.src === window.location.href || audio.src.includes('null')) {
        window.showToast('Unggah musik terlebih dahulu', 'error');
        return;
    }

    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Menganalisa...';
    }

    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
        let bestStart = 0;
        const duration = audio.duration;
        
        if (duration > 60) bestStart = 30;
        else if (duration > 30) bestStart = 15;
        else if (duration > 10) bestStart = 5;

        if (input) {
            input.value = bestStart;
        }
        
        // Preview the ref
        audio.currentTime = bestStart;
        if (audio.paused) audio.play();

    } catch (err) {
        window.showToast('Gagal menganalisa lagu', 'error');
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-wand-magic-sparkles text-[9px] sm:text-[10px]"></i><span>Analisa Ref</span>';
        }
    }
};

window.handleMusicUpload = async function() {
    const input = document.getElementById('musicFileInput');
    if (!input.files || !input.files[0]) {
        window.showToast('Pilih file musik terlebih dahulu', 'error');
        return;
    }

    const formData = new FormData();
    formData.append('music', input.files[0]);

    const btn = document.getElementById('startMusicUpload');
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> MENGUNGGAH...';
    }

    try {
        const res = await fetch('/api/admin/music/upload', { method: 'POST', body: formData, credentials: 'include' });
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Upload gagal');
            
            // Set music in hidden input & state
            if (document.getElementById('settingBgMusic')) document.getElementById('settingBgMusic').value = data.src;
            window.state.dashboard.settings.bg_music = data.src;
            
            window.showToast('Musik berhasil diunggah!', 'success');
            window.closeMusicModal();
            window.resetMusicInput();
            await window.loadDashboard();
        } else {
            const text = await res.text();
            throw new Error(`Server error (${res.status})`);
        }
    } catch (err) { 
        window.showToast(err.message, 'error'); 
    } finally { 
        if (btn) {
            btn.disabled = false; 
            btn.innerHTML = '<i class="fas fa-check-circle"></i><span class="font-semibold uppercase text-[11px]">Simpan & Terapkan Musik</span>';
        }
    }
};

// WA Template logic
window.showWaTemplateModal = function() { window.showModal('waTemplateModal'); };
window.formatRichText = function (command, value = null) {
    document.execCommand(command, false, value);
    const editor = document.getElementById('waTemplateInput');
    if (editor) editor.focus();
};
window.insertWaTag = function (tag) {
    const editor = document.getElementById('waTemplateInput');
    if (!editor) return;
    editor.focus();
    const sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
        const range = sel.getRangeAt(0);
        range.deleteContents();
        const textNode = document.createTextNode(tag);
        range.insertNode(textNode);
        range.setStartAfter(textNode);
        range.setEndAfter(textNode);
        sel.removeAllRanges(); sel.addRange(range);
    } else { editor.innerHTML += tag; }
};
window.saveWaTemplate = function () {
    window.saveSettings(false, 'Template WA berhasil disimpan');
    window.hideModal('waTemplateModal');
};


// Tab switching
window.switchAturTab = function (tabId) {
    document.querySelectorAll('.atur-section').forEach(s => s.classList.add('hidden'));
    const target = document.getElementById('section_' + tabId);
    if (target) target.classList.remove('hidden');
    document.querySelectorAll('.atur-tab-btn').forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId));
};

// Global init functions
window.initOpeningUI = function() {
    const mode = window.state.dashboard?.settings?.opening_bg_mode || 'color';
    window.setOpeningBgMode(mode, true);
};

// Start the app
checkLogin();

// Export to window for global access
window.api = api;
window.t = t;
window.translations = translations;
window.closeAllHeaderMenus = closeAllHeaderMenus;

// Search Input Listeners
document.getElementById('desktopSearchInput')?.addEventListener('input', (e) => {
    window.handleGlobalSearch(e.target.value);
});

document.getElementById('mobileSearchInput')?.addEventListener('input', (e) => {
    window.handleGlobalSearch(e.target.value);
});

document.getElementById('refreshNotificationsBtn')?.addEventListener('click', () => {
    if (window.populateNotifications) window.populateNotifications();
});

// Explicit Logout Listeners

document.getElementById('sidebarLogoutBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.logout();
});
document.getElementById('headerLogoutBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.logout();
});
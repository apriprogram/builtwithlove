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
    "login_key_ph": "••••••••",
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
    "gal_title": "Pustaka Visual",
    "gal_upload_btn": "UNGGAH BARU",
    "col_asset": "Aset Endpoint",
    "col_desc": "Deskripsi Meta",
    "col_manage": "Kelola",
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
    "alert_settings_sync": "Berhasil disinkronkan dengan mesin cloud.",
    "alert_event_updated": "Acara #{id} diperbarui.",
    "alert_couple_updated": "Profil utama #{id} diperbarui.",
    "alert_guest_revoke": "Cabut akses untuk tamu ini?",
    "alert_link_copied": "URL Akses disalin ke papan klip.",
    "alert_gallery_purge": "Hapus aset ini dari perpustakaan?"
  }
};

let currentLang = 'id';

window.searchTable = function(inputId, tbodyId) {
    const input = document.getElementById(inputId);
    const filter = input.value.toLowerCase();
    const tbody = document.getElementById(tbodyId);
    if (!tbody || !input) return;
    
    const trs = tbody.getElementsByTagName('tr');
    
    for (let i = 0; i < trs.length; i++) {
        const tr = trs[i];
        let textFound = false;
        
        const tds = tr.getElementsByTagName('td');
        for (let j = 0; j < tds.length; j++) {
            if (tds[j].innerText.toLowerCase().indexOf(filter) > -1) {
                textFound = true;
                break;
            }
        }
        
        if (textFound) {
            tr.style.display = "";
        } else {
            tr.style.display = "none";
        }
    }
};

window.tablePagination = {
    guests: { page: 1, limit: 10, search: '' },
    rsvp: { page: 1, limit: 10, search: '' },
    wishes: { search: '' }
};

window.guestSort = { column: 'created_at', order: 'desc' };

window.sortGuests = function(column) {
    if (window.guestSort.column === column) {
        window.guestSort.order = window.guestSort.order === 'asc' ? 'desc' : 'asc';
    } else {
        window.guestSort.column = column;
        window.guestSort.order = 'asc';
    }
    
    // Update Icons
    const allUp = document.querySelectorAll('[id$="_up"]');
    const allDown = document.querySelectorAll('[id$="_down"]');
    allUp.forEach(i => i.style.opacity = '0.2');
    allDown.forEach(i => i.style.opacity = '0.2');
    
    if (window.guestSort.order === 'asc') {
        const up = document.getElementById(`sortIcon_${column}_up`);
        if (up) {
            up.style.opacity = '1';
            up.classList.add('text-indigo-600');
        }
    } else {
        const down = document.getElementById(`sortIcon_${column}_down`);
        if (down) {
            down.style.opacity = '1';
            down.classList.add('text-indigo-600');
        }
    }

    renderGuests();
};

window.renderPaginationControls = function(type, total, limit, currentPage) {
    const container = document.getElementById(`${type}Pagination`);
    if (!container) return;
    
    const totalPages = Math.ceil(total / limit) || 1;
    
    let html = `
        <div class="text-[10px] sm:text-xs text-slate-500 font-medium whitespace-nowrap">
            Menampilkan ${total === 0 ? 0 : (currentPage - 1) * limit + 1} - ${Math.min(total, currentPage * limit)} dari ${total} data
        </div>
        <div class="flex items-center gap-1 mt-3 sm:mt-0">
            <button onclick="window.changePage('${type}', ${currentPage - 1})" class="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-200 disabled:opacity-50 disabled:hover:bg-transparent transition-colors" ${currentPage <= 1 ? 'disabled' : ''}>
                <i class="fas fa-chevron-left text-[9px] sm:text-[10px]"></i>
            </button>
    `;
    
    for(let i=1; i<=totalPages; i++) {
        if (totalPages > 5) {
            if (i !== 1 && i !== totalPages && Math.abs(i - currentPage) > 1) {
                if (i === 2 || i === totalPages - 1) {
                    html += `<span class="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-slate-400 text-xs">...</span>`;
                }
                continue;
            }
        }
        
        const activeClass = i === currentPage ? 'bg-indigo-600 text-white font-bold shadow-sm' : 'text-slate-600 hover:bg-slate-200';
        html += `
            <button onclick="window.changePage('${type}', ${i})" class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-[10px] sm:text-xs transition-colors ${activeClass}">
                ${i}
            </button>
        `;
    }
    
    html += `
            <button onclick="window.changePage('${type}', ${currentPage + 1})" class="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-200 disabled:opacity-50 disabled:hover:bg-transparent transition-colors" ${currentPage >= totalPages ? 'disabled' : ''}>
                <i class="fas fa-chevron-right text-[9px] sm:text-[10px]"></i>
            </button>
        </div>
    `;
    container.innerHTML = html;
};

window.changePage = function(type, newPage) {
    if (newPage < 1) newPage = 1;
    tablePagination[type].page = newPage;
    if (type === 'guests') renderGuests();
    if (type === 'rsvp') renderDataLists();
};

window.changePageLimit = function(type, element) {
    tablePagination[type].limit = parseInt(element.value);
    tablePagination[type].page = 1;
    if (type === 'guests') renderGuests();
    if (type === 'rsvp') renderDataLists();
};

window.handleLiveSearch = function(type, element) {
    if (type === 'wishes') {
        tablePagination[type].search = element.value;
        renderDataLists();
        return;
    }
    tablePagination[type].search = element.value;
    tablePagination[type].page = 1;
    if (type === 'guests') renderGuests();
    if (type === 'rsvp') renderDataLists();
};

window.showToast = function(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'relative overflow-hidden flex items-center gap-3 px-5 py-4 rounded-2xl shadow-xl transform transition-all duration-500 ease-out opacity-0 -translate-y-8 pointer-events-auto border border-slate-100/50 dark:border-slate-800/50 backdrop-blur-sm dark:backdrop-blur-md z-[100] min-w-[300px] max-w-sm';
  
  let icon = 'fa-check-circle';
  let colorClass = 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400';
  let shadowClass = 'shadow-emerald-500/20';
  let progressColor = 'bg-emerald-500';
  
  if (type === 'error') {
    icon = 'fa-exclamation-circle';
    colorClass = 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400';
    shadowClass = 'shadow-rose-500/20';
    progressColor = 'bg-rose-500';
  } else if (type === 'info') {
    icon = 'fa-info-circle';
    colorClass = 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400';
    shadowClass = 'shadow-blue-500/20';
    progressColor = 'bg-blue-500';
  } else if (type === 'delete') {
    icon = 'fa-trash-alt';
    colorClass = 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400';
    shadowClass = 'shadow-amber-500/20';
    progressColor = 'bg-amber-500';
  }

  toast.classList.add(...colorClass.split(' '), shadowClass);
  toast.innerHTML = `
    <i class="fas ${icon} text-lg"></i>
    <div class="flex-1">
      <p class="font-sans font-semibold text-[13px] text-slate-800 dark:text-slate-100 leading-tight">${message}</p>
    </div>
    <div class="absolute bottom-0 left-0 h-1 w-full bg-black/5 dark:bg-white/10">
      <div class="toast-progress h-full ${progressColor} origin-left" style="width: 100%; transition: width 3000ms linear;"></div>
    </div>
  `;

  container.appendChild(toast);
  const progressBar = toast.querySelector('.toast-progress');

  // Trigger animation enter in next frame
  requestAnimationFrame(() => {
    toast.classList.remove('opacity-0', '-translate-y-8');
    toast.classList.add('opacity-100', 'translate-y-0');
    
    // Start progress bar automatically depleting
    requestAnimationFrame(() => {
        if (progressBar) progressBar.style.width = '0%';
    });
  });

  // Remove toast after 3 seconds
  setTimeout(() => {
    toast.classList.remove('opacity-100', 'translate-y-0', 'ease-out');
    toast.classList.add('opacity-0', '-translate-y-8', 'ease-in');
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

function t(key, params = {}) {
  let str = translations[currentLang][key] || key;
  Object.keys(params).forEach(p => {
    str = str.replace(`{${p}}`, params[p]);
  });
  return str;
}



const state = {
  dashboard: null,
};

const sections = ['overview', 'settings', 'events', 'guests', 'lovestory', 'rsvp_data', 'wishes_data', 'profile', 'help'];
let navButtons = Array.from(document.querySelectorAll('.admin-nav-button'));
const sidebar = document.getElementById('sidebar');
const dashboardPanel = document.getElementById('dashboardPanel');
const loginPanel = document.getElementById('loginPanel');
const loginButton = document.getElementById('loginButton');
const profileDropdownContainer = document.getElementById('profileDropdownContainer');
const pageTitle = document.getElementById('pageTitle');
const mobileSidebarToggle = document.getElementById('mobileSidebarToggle');

async function api(path, options = {}) {
  const res = await fetch(path, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'API request failed');
  }
  return data;
}

window.showSection = function(name) {
  sections.forEach((section) => {
    const panel = document.getElementById(section);
    if (panel) panel.classList.toggle('hidden', section !== name);
  });
  navButtons.forEach((button) => button.classList.toggle('active', button.dataset.section === name));
  
  // Close sidebar on mobile after click
  if (window.innerWidth < 1024) sidebar.classList.add('-translate-x-full');
  
  // Update header title
  const activeBtn = navButtons.find(b => b.dataset.section === name);
  if (activeBtn && pageTitle) pageTitle.innerText = activeBtn.innerText.trim();
  
  // Special Section Loading
  if (name === 'profile') loadProfileData();
  if (name === 'lovestory') loadLoveStoryAdmin();
  scrollTo(0,0);
}


function renderDashboardCounts() {
  if (!state.dashboard) return;
  const rsvps = state.dashboard.rsvps || [];
  const guests = state.dashboard.guests || [];
  
  // Update big numbers
  document.getElementById('totalRsvp').innerText = rsvps.length;
  document.getElementById('totalWishes').innerText = (state.dashboard.wishes || []).length;

  const totalGuestsOverview = document.getElementById('totalGuestsOverview');
  if (totalGuestsOverview) totalGuestsOverview.innerText = guests.length;
  
  // RSVP Progress Bar logic
  const confirmedCount = rsvps.length;
  const totalGuests = guests.length;
  const pendingCount = Math.max(0, totalGuests - confirmedCount);
  
  const confirmedEl = document.getElementById('rsvpConfirmedCount');
  const pendingEl = document.getElementById('rsvpPendingCount');
  const barEl = document.getElementById('rsvpProgressBar');
  
  if (confirmedEl) confirmedEl.innerText = confirmedCount;
  if (pendingEl) pendingEl.innerText = pendingCount;
  if (barEl) {
    const pct = totalGuests > 0 ? Math.min(100, Math.round((confirmedCount / totalGuests) * 100)) : 0;
    barEl.style.width = pct + '%';
  }

  // Update the Real-time previews too
  renderDashboardPreviews();
}

let dashboardRsvpVisibleCount = 20;
let dashboardWishesVisibleCount = 10;
let isRsvpRendering = false;
let isWishesRendering = false;

function renderDashboardPreviews() {
    if (!state.dashboard) return;
    
    // Initial Render
    renderRsvpItems();
    renderWishesItems();
    
    // Attach Scroll Listeners (Only once)
    setupDashboardLazyLoad();
}

function setupDashboardLazyLoad() {
    const rsvpContainer = document.querySelector('#dashboardRsvpPreview')?.parentElement;
    const wishesContainer = document.querySelector('#dashboardWishesPreview');
    
    if (rsvpContainer && !rsvpContainer.dataset.lazyLoaded) {
        rsvpContainer.dataset.lazyLoaded = 'true';
        rsvpContainer.addEventListener('scroll', () => {
            if (isRsvpRendering) return;
            const threshold = 100;
            if (rsvpContainer.scrollTop + rsvpContainer.clientHeight >= rsvpContainer.scrollHeight - threshold) {
                if (dashboardRsvpVisibleCount < (state.dashboard.rsvps || []).length) {
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
            const threshold = 100;
            if (wishesContainer.scrollTop + wishesContainer.clientHeight >= wishesContainer.scrollHeight - threshold) {
                if (dashboardWishesVisibleCount < (state.dashboard.wishes || []).length) {
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
    if (!rsvpBody || !state.dashboard) return;
    
    isRsvpRendering = true;
    if (loading) loading.classList.remove('hidden');

    const list = (state.dashboard.rsvps || []).slice(0, dashboardRsvpVisibleCount);
    
    setTimeout(() => {
        if (list.length === 0) {
            rsvpBody.innerHTML = `<tr><td colspan="5" class="px-8 py-10 text-center text-slate-400 text-xs italic">Belum ada aktivitas konfirmasi</td></tr>`;
        } else {
            rsvpBody.innerHTML = list.map(item => {
                const badgeClass = (item.status || '').toLowerCase() === 'hadir' ? 'badge-paid' : 'badge-pending';
                const dateStr = item.created_at ? new Date(item.created_at).toLocaleDateString('id-ID', { day:'2-digit', month:'short' }) : '-';
                return `
                    <tr class="group hover:bg-slate-50 transition-colors">
                        <td class="font-bold text-slate-900 text-xs tracking-tight px-8 py-4">
                            <div class="flex items-center gap-3">
                                <div class="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-xs shrink-0">${(item.guest_name || 'A').charAt(0).toUpperCase()}</div>
                                ${item.guest_name || 'Tamu Anonim'}
                            </div>
                        </td>
                        <td class="px-8 py-4"><span class="badge-modern ${badgeClass} text-[9px]">${(item.status || '').toUpperCase()}</span></td>
                        <td class="text-center font-black text-slate-900 text-xs px-8 py-4">${item.guest_count} <span class="text-[10px] font-normal text-slate-400">orang</span></td>
                        <td class="text-right text-slate-400 text-[9px] font-bold tracking-widest px-8 py-4">${dateStr}</td>
                        <td class="text-right px-8 py-4">
                            <button onclick="window.deleteRsvp('${item.id}')" class="btn-premium btn-secondary !p-0 w-8 h-8 ml-auto text-slate-400 hover:!bg-red-500 hover:!text-white hover:!border-red-500">
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
    if (!wishesContainer || !state.dashboard) return;
    
    isWishesRendering = true;
    if (loading) loading.classList.remove('hidden');

    const list = (state.dashboard.wishes || []).slice(0, dashboardWishesVisibleCount);
    
    setTimeout(() => {
        if (list.length === 0) {
            wishesContainer.innerHTML = `<div class="p-10 text-center text-slate-400 text-xs italic">Belum ada ucapan terbaru</div>`;
        } else {
            wishesContainer.innerHTML = list.map(item => {
                const dateStr = item.created_at ? new Date(item.created_at).toLocaleDateString('id-ID', { day:'2-digit', month:'short' }) : '-';
                const initial = (item.guest_name && item.guest_name.length > 0 ? item.guest_name.charAt(0) : 'A').toUpperCase();
                const adminAvatar = document.getElementById('headerUserAvatar') ? document.getElementById('headerUserAvatar').src : '';
                const adminName = (state.dashboard.settings && state.dashboard.settings.hero_name) || 'Admin';
                const replyDisplay = item.reply ? `
                    <div class="mt-2 ml-10 flex items-start gap-3 opacity-95 scale-[0.98] origin-top-left transition-all bg-indigo-50/50 p-2.5 rounded-xl border border-indigo-100/50">
                        <img src="${adminAvatar}" alt="${adminName}" class="w-6 h-6 rounded-full object-cover border-2 border-white shadow-sm shrink-0" onerror="this.src='https://ui-avatars.com/api/?name=A&background=4f46e5&color=fff&bold=true&size=56'">
                        <div class="min-w-0">
                            <p class="text-[9px] mb-0.5 leading-none"><span class="font-bold text-slate-900">${adminName}</span></p>
                            <p class="text-[11px] text-slate-600 leading-snug">${item.reply}</p>
                        </div>
                    </div>
                ` : '';

                return `
                    <div class="px-4 py-2.5 hover:bg-indigo-50/50 transition-all rounded-xl mx-1 my-0.5 hover:ring-2 hover:ring-indigo-400 group">
                        <div class="flex items-start gap-3.5">
                            <div class="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-black text-[11px] shrink-0 border border-blue-100 mt-1 shadow-sm">${initial}</div>
                            <div class="flex-1 min-w-0">
                                <div class="flex items-center gap-2">
                                    <h5 class="text-[12px] font-bold text-slate-900 truncate">${item.guest_name || 'Tamu Anonim'}</h5>
                                    <span class="text-[9px] text-slate-400 font-bold">${dateStr}</span>
                                </div>
                                <p class="text-[12px] text-slate-700 mt-0.5 leading-snug">${item.message}</p>
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

async function loadPageViews() {
  try {
    const data = await api('/api/admin/pageviews');
    const totalEl = document.getElementById('totalPageViews');
    const todayEl = document.getElementById('pageViewsTodayBadge');
    const uniqueEl = document.getElementById('uniquePageViews');
    const barEl = document.getElementById('pageViewsBar');

    if (totalEl) totalEl.innerText = data.total || 0;
    if (todayEl) todayEl.innerText = `+${data.today || 0} hari ini`;
    if (uniqueEl) uniqueEl.innerText = data.unique || 0;
    if (barEl) {
      // Bar represents % of total that came this week vs total
      const pct = data.total > 0 ? Math.min(100, Math.round((data.week / data.total) * 100)) : 0;
      barEl.style.width = pct + '%';
    }
  } catch (e) {
    // Silently fail if pageviews table doesn't exist yet
    console.warn('Page views not loaded:', e.message);
  }
}

function renderSettings() {
  const settings = state.dashboard?.settings || {};
  if (document.getElementById('settingCoverTitle')) document.getElementById('settingCoverTitle').value = settings.cover_title || '';
  if (document.getElementById('settingCoverSubtitle')) document.getElementById('settingCoverSubtitle').value = settings.cover_subtitle || '';
  if (document.getElementById('settingHeroName')) document.getElementById('settingHeroName').value = settings.hero_name || '';
  if (document.getElementById('settingGuestPrefix')) document.getElementById('settingGuestPrefix').value = settings.guest_prefix || '';
  if (document.getElementById('settingGuestLabel')) document.getElementById('settingGuestLabel').value = settings.guest_label || '';
  if (document.getElementById('settingHeroButton')) document.getElementById('settingHeroButton').value = settings.hero_button || '';
  if (document.getElementById('settingNotificationRetention')) {
      // Setup Notification Retention Initial Value
      const val = settings.notification_retention || '30';
      document.getElementById('settingNotificationRetention').value = val;
      
      const activeOpt = document.querySelector(`.retention-option[data-value="${val}"]`);
      if (activeOpt && document.getElementById('retentionSelectedLabel')) {
          document.getElementById('retentionSelectedLabel').innerText = activeOpt.querySelector('span').innerText;
          document.querySelectorAll('.retention-option').forEach(el => el.classList.remove('active'));
          activeOpt.classList.add('active');
      }

      // Setup Wishes Limit Initial Value
      const wishesVal = settings.wishes_limit || '0';
      const wishesSelect = document.getElementById('settingWishesLimit');
      if (wishesSelect) wishesSelect.value = wishesVal;
      
      const activeWishesOpt = document.querySelector(`.wisheslimit-option[data-value="${wishesVal}"]`);
      if (activeWishesOpt && document.getElementById('wishesLimitSelectedLabel')) {
          document.getElementById('wishesLimitSelectedLabel').innerText = activeWishesOpt.querySelector('span').innerText;
          document.querySelectorAll('.wisheslimit-option').forEach(el => el.classList.remove('active'));
          activeWishesOpt.classList.add('active');
      }
  }
  
  // Greeting Settings
  if (document.getElementById('settingGreetingHeading')) document.getElementById('settingGreetingHeading').value = settings.greeting_heading || '';
  if (document.getElementById('settingGreetingQuote')) document.getElementById('settingGreetingQuote').value = settings.greeting_quote || '';
  if (document.getElementById('settingGreetingLogo')) document.getElementById('settingGreetingLogo').value = settings.greeting_logo || '';
  if (document.getElementById('settingGreetingBg')) document.getElementById('settingGreetingBg').value = settings.greeting_bg || '';
  if (document.getElementById('settingGreetingInvitation')) document.getElementById('settingGreetingInvitation').value = settings.greeting_invitation || '';
  if (document.getElementById('settingCoupleSectionTitle')) document.getElementById('settingCoupleSectionTitle').value = settings.couple_section_title || 'Bride & Groom';
  if (document.getElementById('settingEventHeaderQuote')) document.getElementById('settingEventHeaderQuote').value = settings.event_header_quote || 'Kami sangat berharap kehadiran Anda dalam momen spesial kami.';
  if (document.getElementById('settingEventHeaderTitle')) document.getElementById('settingEventHeaderTitle').value = settings.event_header_title || 'Wedding Event';
  if (document.getElementById('settingRsvpCaption')) document.getElementById('settingRsvpCaption').value = settings.rsvp_caption || 'Mohon konfirmasikan kehadiran Anda melalui formulir di bawah ini.';
  if (document.getElementById('settingEventBg')) document.getElementById('settingEventBg').value = settings.event_bg || '';
  if (document.getElementById('settingLovestoryBg')) document.getElementById('settingLovestoryBg').value = settings.lovestory_bg || '';
  if (document.getElementById('settingLovestoryCardBg')) document.getElementById('settingLovestoryCardBg').value = settings.lovestory_card_bg || '';
  if (document.getElementById('settingGiftBgImg')) document.getElementById('settingGiftBgImg').value = settings.gift_bg_img || '';
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
  }
  if (document.getElementById('settingCoupleBgColor')) {
      const cColor = settings.couple_bg_color || '#000000';
      document.getElementById('settingCoupleBgColor').value = cColor;
      if (window.syncCoupleColor) window.syncCoupleColor(cColor, 'picker');
  }
  if (document.getElementById('settingCoupleBgImg')) {
      document.getElementById('settingCoupleBgImg').value = settings.couple_bg_img || '';
  }
  if (document.getElementById('settingCoupleBgMode')) {
      const cMode = settings.couple_bg_mode || 'color';
      document.getElementById('settingCoupleBgMode').value = cMode;
      if (window.setCoupleBgMode) window.setCoupleBgMode(cMode);
  }
  if (document.getElementById('settingEventBgColor')) {
      const eColor = settings.event_bg_color || '#000000';
      document.getElementById('settingEventBgColor').value = eColor;
      if (document.getElementById('eventColorPicker') && eColor.startsWith('#')) {
          document.getElementById('eventColorPicker').value = eColor;
      }
  }
  if (document.getElementById('settingLovestoryBgColor')) {
      const lsColor = settings.lovestory_bg_color || '#000000';
      document.getElementById('settingLovestoryBgColor').value = lsColor;
      if (document.getElementById('lovestoryColorPicker') && lsColor.startsWith('#')) {
          document.getElementById('lovestoryColorPicker').value = lsColor;
      }
  }
  if (document.getElementById('settingLovestoryCardBgColor')) {
      const lscColor = settings.lovestory_card_bg_color || '#000000';
      document.getElementById('settingLovestoryCardBgColor').value = lscColor;
      if (document.getElementById('lovestoryCardColorPicker') && lscColor.startsWith('#')) {
          document.getElementById('lovestoryCardColorPicker').value = lscColor;
      }
  }
  
  if (document.getElementById('settingWishesBgImg')) document.getElementById('settingWishesBgImg').value = settings.wishes_bg_img || '';
  if (document.getElementById('settingRsvpBgImg')) document.getElementById('settingRsvpBgImg').value = settings.rsvp_bg_img || '';
  
  if (document.getElementById('settingOpeningBgImg')) {
      document.getElementById('settingOpeningBgImg').value = settings.opening_bg_img || '';
      if (window.renderOpeningSlider) window.renderOpeningSlider();
  }
  
  if (document.getElementById('settingOpeningBgMode')) {
      const oMode = settings.opening_bg_mode || 'color';
      document.getElementById('settingOpeningBgMode').value = oMode;
      if (window.setOpeningBgMode) window.setOpeningBgMode(oMode);
  }

  // Greeting (Sambutan) background settings
  if (document.getElementById('settingGreetingBgImg')) {
      document.getElementById('settingGreetingBgImg').value = settings.greeting_bg_img || '';
      if (window.renderGreetingSlider) window.renderGreetingSlider();
  }
  if (document.getElementById('settingGreetingBgColor')) {
      const gColor = settings.greeting_bg_color || '#000000';
      document.getElementById('settingGreetingBgColor').value = gColor;
      if (window.syncGreetingColor) window.syncGreetingColor(gColor, 'picker');
  }
  if (document.getElementById('settingGreetingBgMode')) {
      const gMode = settings.greeting_bg_mode || 'color';
      document.getElementById('settingGreetingBgMode').value = gMode;
      if (window.setGreetingBgMode) window.setGreetingBgMode(gMode);
  }
  
  if (document.getElementById('settingWishesBgMode')) {
      const mode = settings.wishes_bg_mode || 'color';
      window.setWishesBgMode(mode);
  }
  
  if (document.getElementById('settingWishesBgColor')) {
      const wColor = settings.wishes_bg_color || '#000000';
      document.getElementById('settingWishesBgColor').value = wColor;
      if (document.getElementById('wishesColorPicker') && wColor.startsWith('#')) {
          document.getElementById('wishesColorPicker').value = wColor;
      }
  }

  if (document.getElementById('settingRsvpBgColor')) {
      const rColor = settings.rsvp_bg_color || '#000000';
      document.getElementById('settingRsvpBgColor').value = rColor;
      if (document.getElementById('rsvpColorPicker') && rColor.startsWith('#')) {
          document.getElementById('rsvpColorPicker').value = rColor;
      }
  }

  if (document.getElementById('settingGiftBgColor')) {
      const gColor = settings.gift_bg_color || '#000000';
      document.getElementById('settingGiftBgColor').value = gColor;
      if (document.getElementById('giftColorPicker') && gColor.startsWith('#')) {
          document.getElementById('giftColorPicker').value = gColor;
      }
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
  
  // Show/Hide delete buttons based on image existence
  const deleteBtnMap = {
      'wishes_bg_img': 'btnDeleteWishesBg',
      'opening_bg_img': 'btnDeleteOpeningBg',
      'greeting_bg_img': 'btnDeleteGreetingBg',
      'couple_bg_img': 'btnDeleteCoupleBg',
      'event_bg': 'btnDeleteEventBg',
      'lovestory_bg': 'btnDeleteLovestoryBg',
      'lovestory_card_bg': 'btnDeleteLovestoryCardBg',
      'gift_bg_img': 'btnDeleteGiftBg',
      'rsvp_bg_img': 'btnDeleteRsvpBg'
  };

  Object.entries(deleteBtnMap).forEach(([key, btnId]) => {
      const btn = document.getElementById(btnId);
      if (btn) {
          if (settings[key]) btn.classList.remove('hidden');
          else btn.classList.add('hidden');
      }
  });
  
  if (document.getElementById('settingEnableNotifications')) {
      document.getElementById('settingEnableNotifications').checked = settings.notifications_enabled !== 'false';
  }
  


  if (settings.greeting_logo && document.getElementById('greetingLogoPreview')) {
      document.getElementById('greetingLogoPreview').src = settings.greeting_logo;
  }
  if (settings.greeting_bg && document.getElementById('greetingBgPreview')) {
      document.getElementById('greetingBgPreview').src = settings.greeting_bg;
  }
  if (settings.couple_bg_img && document.getElementById('coupleBgPreview')) {
      document.getElementById('coupleBgPreview').src = settings.couple_bg_img;
  }
  if (settings.event_bg && document.getElementById('eventBgPreview')) {
      document.getElementById('eventBgPreview').src = settings.event_bg;
  }
  if (settings.lovestory_bg && document.getElementById('lovestoryBgPreview')) {
      document.getElementById('lovestoryBgPreview').src = settings.lovestory_bg;
  }
  if (settings.lovestory_card_bg && document.getElementById('lovestoryCardBgPreview')) {
      document.getElementById('lovestoryCardBgPreview').src = settings.lovestory_card_bg;
  }
  if (settings.gift_bg_img && document.getElementById('giftBgPreview')) {
      document.getElementById('giftBgPreview').src = settings.gift_bg_img;
  }
  if (settings.gallery_bg_img && document.getElementById('galleryBgPreview')) {
      document.getElementById('galleryBgPreview').src = settings.gallery_bg_img;
  }
  if (settings.wishes_bg_img && document.getElementById('wishesBgPreview')) {
      document.getElementById('wishesBgPreview').src = settings.wishes_bg_img;
  }
  if (settings.rsvp_bg_img && document.getElementById('rsvpBgPreview')) {
      document.getElementById('rsvpBgPreview').src = settings.rsvp_bg_img;
  }

  if (document.getElementById('settingBgMusic')) {
      document.getElementById('settingBgMusic').value = settings.bg_music || '';
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
        // Add cache buster and load
        previewEl.src = settings.bg_music + '?t=' + Date.now();
        previewEl.load();
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
  
  if (document.getElementById('settingMusicStart')) {
      document.getElementById('settingMusicStart').value = settings.music_start_time || 0;
  }
}

function renderEvents() {
    const section = document.getElementById('eventsContainer');
    if (!section || !state.dashboard?.events) return;
    const events = state.dashboard.events || [];
    if (events.length < 2) return;
    const [e1, e2] = events;

    section.innerHTML = `
        ${[e1, e2].map((event, i) => `
            <article class="bg-white card-premium px-6 py-5 sm:px-8 sm:py-6">
                <div class="flex items-center justify-between mb-4 sm:mb-5 border-b border-slate-50 pb-3 sm:pb-3.5">
                    <div class="flex items-center gap-3 sm:gap-4">
                        <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl ${i === 0 ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'} border flex items-center justify-center text-lg sm:text-xl">
                            <i class="fas ${i === 0 ? 'fa-ring' : 'fa-utensils'}"></i>
                        </div>
                        <div>
                            <h3 class="text-lg sm:text-xl font-semibold text-slate-900 tracking-tight">${event.name || `${t('event_prefix')}${i+1}`}</h3>
                            <p class="text-[11px] sm:text-xs text-slate-600 font-semibold mt-1">${t('event_op_details')}</p>
                        </div>
                    </div>
                    <button data-event-id="${i+1}" class="btn-premium btn-primary !h-9 sm:!h-10 !px-4 sm:!px-5 !text-[9px] sm:!text-[10px] uppercase tracking-widest save-event">
                        ${t('event_btn_update')}
                    </button>
                </div>
                <div class="grid gap-6">
                    <div class="grid grid-cols-2 gap-4">
                        <div class="space-y-2">
                            <label class="text-[10px] sm:text-[11px] font-semibold text-slate-600 px-1">${t('event_display_name')}</label>
                            <input id="event${i+1}Name" type="text" value="${event.name || ''}" class="input-premium">
                        </div>
                        <div class="space-y-2">
                            <label class="text-[10px] sm:text-[11px] font-semibold text-slate-600 px-1">${t('event_header_heading')}</label>
                            <input id="event${i+1}Heading" type="text" value="${event.heading || ''}" class="input-premium">
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="space-y-2">
                            <label class="text-[10px] sm:text-[11px] font-semibold text-slate-600 px-1">${t('event_timeline')}</label>
                            <input id="event${i+1}Time" type="text" value="${event.time || ''}" class="input-premium">
                        </div>
                    <div class="space-y-2">
                            <label class="text-[10px] sm:text-[11px] font-semibold text-slate-600 px-1">${t('event_cal_date')}</label>
                            <input id="event${i+1}DatePicker" type="date" value="${event.date_iso || ''}" class="input-premium cursor-pointer" 
                                onchange="updateEventDateDisplay(${i+1}, this.value)">
                            <input id="event${i+1}Date" type="hidden" value="${event.date || ''}">
                            <input id="event${i+1}DateIso" type="hidden" value="${event.date_iso || ''}">
                            <p id="event${i+1}DateLabel" class="text-xs text-indigo-600 font-semibold px-1 mt-1">${event.date || '(Pilih tanggal di atas)'}</p>
                        </div>
                    </div>
                    <div class="space-y-2">
                        <label class="text-[10px] sm:text-[11px] font-semibold text-slate-600 px-1">${t('event_venue_id')}</label>
                        <input id="event${i+1}Location" type="text" value="${event.location_name || ''}" class="input-premium">
                    </div>
                    <div class="space-y-2">
                        <label class="text-[10px] sm:text-[11px] font-semibold text-slate-600 px-1">${t('event_phys_addr')}</label>
                        <textarea id="event${i+1}Address" class="input-premium min-h-[100px]">${event.address || ''}</textarea>
                    </div>
                    <div class="space-y-2">
                        <label class="text-[10px] sm:text-[11px] font-semibold text-slate-600 px-1">${t('event_map_src')}</label>
                        <textarea id="event${i+1}MapSrc" class="input-premium min-h-[80px] break-all" oninput="window.updateMapPreview(${i+1}, this.value)" placeholder="Tempel URL atau tag <iframe> Google Maps di sini">${event.map_src || ''}</textarea>
                        <div id="event${i+1}MapContainer" class="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition-all ${event.map_src ? 'block' : 'hidden'}">
                            <iframe id="event${i+1}MapIframe" src="${event.map_src || ''}" width="100%" height="250" style="border:0;" allowfullscreen="" loading="lazy" class="w-full"></iframe>
                        </div>
                    </div>
                    <div class="space-y-2">
                        <label class="text-[10px] sm:text-[11px] font-semibold text-slate-600 px-1">${t('event_dir_link')}</label>
                        <textarea id="event${i+1}MapLink" class="input-premium min-h-[60px] break-all">${event.map_link || ''}</textarea>
                    </div>
                    <div class="space-y-2">
                        <label class="text-[10px] sm:text-[11px] font-semibold text-slate-600 px-1">${t('event_icon_key')}</label>
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                                <img id="event${i+1}IconPreview" src="${event.icon_src || 'img/icon/Ring.png'}" class="w-6 h-6 sm:w-8 sm:h-8 object-contain" onerror="this.src='https://ui-avatars.com/api/?name=Icon&background=f1f5f9'">
                            </div>
                            <label class="flex-1 cursor-pointer px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 text-[11px] font-semibold hover:bg-slate-100 hover:text-slate-700 hover:border-slate-300 transition-all text-center group font-sans">
                                <i class="fas fa-upload mr-2 opacity-60 group-hover:scale-110 transition-transform"></i> UPLOAD ICON
                                <input type="file" accept="image/*" class="hidden" onchange="uploadEventIcon(this, ${i+1}, 'event${i+1}IconPreview')">
                            </label>
                        </div>
                        <input id="event${i+1}Icon" type="hidden" value="${event.icon_src || ''}">
                    </div>
                </div>
            </article>
        `).join('')}
    `;

    section.querySelectorAll('.save-event').forEach(btn => {
        btn.addEventListener('click', () => saveEvent(btn.dataset.eventId));
    });
}

window.renderGifts = function() {
    const section = document.getElementById('giftsContainer');
    if (!section) return;
    
    const addrElem = document.getElementById('giftPhysicalAddress');
    if (addrElem && state.dashboard.settings) {
        addrElem.value = state.dashboard.settings.gift_physical_address || '';
    }

    const gifts = state.dashboard.gifts || [];
    
    section.innerHTML = `
        ${gifts.map((gift, i) => `
            <article data-id="${gift.id}" class="bg-white card-premium border border-slate-100 p-6 shadow-sm group relative cursor-move hover:border-indigo-200 transition-all duration-300">
                <div class="absolute top-4 left-4 text-slate-300 group-hover:text-indigo-400 drag-handle p-2 -m-2">
                    <i class="fas fa-grip-vertical text-lg"></i>
                </div>
                <button onclick="window.deleteGiftItem(${gift.id})" class="absolute top-4 right-4 w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white z-10">
                    <i class="fas fa-trash-alt text-[10px]"></i>
                </button>
                <div class="flex items-center gap-4 mb-4 mt-6">
                    <div class="w-16 h-12 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center p-2 overflow-hidden shadow-sm">
                        <img id="gift${gift.id}Preview" src="${gift.logo_src || 'https://ui-avatars.com/api/?name=Bank&background=f1f5f9'}" class="w-full h-full object-contain" onerror="this.src='https://ui-avatars.com/api/?name=Bank&background=f1f5f9'">
                    </div>
                     <label class="cursor-pointer text-[10px] font-semibold text-slate-500 hover:text-indigo-600 transition-colors">
                        <i class="fas fa-upload mr-1"></i> UPLOAD LOGO
                        <input type="file" accept="image/*" class="hidden" onchange="window.uploadGiftIcon(this, ${gift.id}, 'gift${gift.id}Preview')">
                     </label>
                </div>
                <div class="space-y-3">
                    <div>
                        <label class="text-[10px] sm:text-[11px] font-semibold text-slate-600 px-1">Nama Bank / E-Wallet</label>
                        <input type="text" id="gift${gift.id}Bank" value="${gift.bank_name || ''}" class="input-premium h-10 w-full" placeholder="Cth: BCA">
                    </div>
                    <div>
                        <label class="text-[10px] sm:text-[11px] font-semibold text-slate-600 px-1">Nomor Rekening</label>
                        <input type="text" id="gift${gift.id}Number" value="${gift.account_number || ''}" class="input-premium h-10 w-full" placeholder="Cth: 1234567890">
                    </div>
                    <div>
                        <label class="text-[10px] sm:text-[11px] font-semibold text-slate-600 px-1">Atas Nama (Pemilik)</label>
                        <input type="text" id="gift${gift.id}Name" value="${gift.account_name || ''}" class="input-premium h-10 w-full" placeholder="Cth: John Doe">
                    </div>
                    <button onclick="window.saveGiftItem(${gift.id})" class="btn-premium btn-primary w-full mt-2"><i class="fas fa-check mr-1"></i> SIMPAN</button>
                    <input type="hidden" id="gift${gift.id}Logo" value="${gift.logo_src || ''}">
                </div>
            </article>
        `).join('')}
    `;

    // Initialize SortableJS
    if (window.Sortable && gifts.length > 0) {
        new Sortable(section, {
            animation: 350,
            handle: '.drag-handle',
            ghostClass: 'sortable-ghost',
            chosenClass: 'sortable-chosen',
            dragClass: 'sortable-drag',
            forceFallback: true, 
            fallbackOnBody: true,
            swapThreshold: 0.65,
            onEnd: async function() {
                const ids = Array.from(section.querySelectorAll('article')).map(el => parseInt(el.dataset.id));
                const newGifts = ids.map(id => state.dashboard.gifts.find(g => g.id === id));
                state.dashboard.gifts = newGifts;
                
                try {
                    await api('/api/admin/gifts/reorder', { method: 'POST', body: JSON.stringify({ ids }) });
                } catch(err) {
                    window.showToast('Gagal menyimpan urutan', 'error');
                }
            }
        });
    }
};

// Removed native drag functions in favor of SortableJS

window.saveGiftAddress = async function() {
    const address = document.getElementById('giftPhysicalAddress').value;
    try {
        await api('/api/admin/settings', { method: 'PUT', body: JSON.stringify({ gift_physical_address: address }) });
        window.showToast('Alamat fisik berhasil disimpan', 'success');
        if(!state.dashboard.settings) state.dashboard.settings = {};
        state.dashboard.settings.gift_physical_address = address;
    } catch(err) {
        window.showToast('Gagal menyimpan alamat', 'error');
    }
};

window.addGiftItem = async function() {
    try {
        const response = await api('/api/admin/gifts', { method: 'POST', body: JSON.stringify({ bank_name: '', account_number: '', account_name: '', logo_src: '' }) });
        if(!state.dashboard.gifts) state.dashboard.gifts = [];
        state.dashboard.gifts.push(response.gift);
        window.renderGifts();
        window.showToast('Bank baru berhasil ditambahkan', 'success');
    } catch(err) {
        window.showToast('Gagal menambah bank', 'error');
    }
};

window.saveGiftItem = async function(id) {
    const bank_name = document.getElementById(`gift${id}Bank`).value;
    const account_number = document.getElementById(`gift${id}Number`).value;
    const account_name = document.getElementById(`gift${id}Name`).value;
    const logo_src = document.getElementById(`gift${id}Logo`).value;
    
    try {
        await api(`/api/admin/gifts/${id}`, { method: 'PUT', body: JSON.stringify({ bank_name, account_number, account_name, logo_src }) });
        window.showToast('Data bank berhasil disimpan', 'success');
        const giftIdx = state.dashboard.gifts.findIndex(g => g.id === id);
        if(giftIdx !== -1) {
            state.dashboard.gifts[giftIdx] = {...state.dashboard.gifts[giftIdx], bank_name, account_number, account_name, logo_src};
        }
    } catch (err) {
        window.showToast('Gagal menyimpan bank', 'error');
    }
}

window.deleteGiftItem = async function(id) {
    if(!confirm('Anda yakin ingin menghapus bank / dompet digital ini?')) return;
    try {
        await api(`/api/admin/gifts/${id}`, { method: 'DELETE' });
        window.showToast('Berhasil dihapus', 'success');
        state.dashboard.gifts = state.dashboard.gifts.filter(g => g.id !== id);
        window.renderGifts();
    } catch (err) {
        window.showToast('Gagal menghapus', 'error');
    }
};

window.uploadGiftIcon = async function(input, id, previewId) {
    if (!input.files || !input.files[0]) return;
    const file = input.files[0];
    const formData = new FormData();
    formData.append('image', file);

    const btn = input.parentElement;
    const initHTML = btn.innerHTML;
    btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Mengunggah...`;
    
    try {
        const res = await fetch(`/api/admin/gifts/${id}/logo`, {
            method: 'POST',
            body: formData
        });
        if (!res.ok) throw new Error('Upload failed');
        const data = await res.json();
        const preview = document.getElementById(previewId);
        if (preview) preview.src = data.src;
        document.getElementById(`gift${id}Logo`).value = data.src;
        window.showToast('Logo bank berhasil diunggah', 'success');
        
        const giftIdx = state.dashboard.gifts.findIndex(g => g.id === id);
        if(giftIdx !== -1) state.dashboard.gifts[giftIdx].logo_src = data.src;
        
    } catch (error) {
        window.showToast('Gagal mengunggah gambar', 'error');
        console.error(error);
    } finally {
        btn.innerHTML = initHTML;
    }
};

function renderCouple() {
    const section = document.getElementById('coupleContainer');
    if (!section) return;
    const [groom, bride] = state.dashboard.couple;
    if (!groom || !bride) return;

    section.innerHTML = `
        ${[groom, bride].map((person, i) => `
            <article class="bg-white card-premium overflow-hidden group">
                <div class="${i === 0 ? 'bg-slate-900 border-slate-800' : 'bg-pink-600 border-pink-500'} p-6 sm:p-10 text-white relative border-b">
                    <div class="relative z-10">
                        <h3 class="text-2xl sm:text-4xl font-medium tracking-tighter">${i === 0 ? t('couple_groom') : t('couple_bride')}</h3>
                        <p class="text-[10px] sm:text-[11px] ${i === 0 ? 'text-slate-600' : 'text-pink-200'} font-semibold mt-1 sm:mt-2">${t('couple_profile')}</p>
                    </div>
                    <i class="fas ${i === 0 ? 'fa-mars' : 'fa-venus'} absolute top-6 sm:top-10 right-6 sm:right-10 text-5xl sm:text-8xl opacity-10 group-hover:scale-110 transition-transform"></i>
                </div>
                <div class="p-6 sm:p-10 space-y-6">
                    <div class="space-y-2">
                        <label class="text-[10px] sm:text-[11px] font-semibold text-slate-600 px-1">${t('couple_role')}</label>
                        <input id="couple${i+1}Role" type="text" value="${person.role || ''}" class="input-premium">
                    </div>
                    <div class="space-y-2">
                        <label class="text-[10px] sm:text-[11px] font-semibold text-slate-600 px-1">${t('couple_name')}</label>
                        <input id="couple${i+1}Name" type="text" value="${person.name || ''}" class="font-bold input-premium">
                    </div>
                    <div class="space-y-2">
                        <label class="text-[10px] sm:text-[11px] font-semibold text-slate-600 px-1">${t('couple_parents')}</label>
                        <textarea id="couple${i+1}Parents" class="input-premium min-h-[100px]">${person.parents || ''}</textarea>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div class="space-y-2">
                            <label class="text-[10px] sm:text-[11px] font-semibold text-slate-600 px-1">${t('couple_ig')}</label>
                            <input id="couple${i+1}Instagram" type="text" value="${person.instagram || ''}" class="input-premium">
                        </div>
                        <div class="space-y-2">
                            <label class="text-[10px] sm:text-[11px] font-semibold text-slate-600 px-1">${t('couple_img')}</label>
                            <div class="flex items-center gap-3">
                                <img id="couple${i+1}Preview" src="${person.image_src || 'https://ui-avatars.com/api/?name=Photo&background=f1f5f9'}" class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover border border-slate-200 shadow-sm shrink-0">
                                <label class="flex-1 cursor-pointer px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 text-[11px] sm:text-xs font-medium hover:bg-slate-100 hover:text-slate-700 hover:border-slate-300 transition-all text-center group font-sans">
                                    <i class="fas fa-camera mr-2 opacity-60 group-hover:scale-110 transition-transform"></i> Pilih Foto
                                    <input type="file" accept="image/*" class="hidden" onchange="uploadCoupleAvatar(this, ${i+1}, 'couple${i+1}Preview')">
                                </label>
                            </div>
                            <input id="couple${i+1}Image" type="hidden" value="${person.image_src || ''}">
                        </div>
                    </div>
                    <button data-couple-id="${i+1}" class="btn-premium btn-primary w-full !h-14 ${i === 0 ? '!bg-slate-900 !shadow-slate-100' : '!bg-pink-600 !shadow-pink-100'} !text-[11px] uppercase tracking-[0.2em] save-couple">
                        ${t('couple_btn')}
                    </button>
                </div>
            </article>
        `).join('')}
    `;

    section.querySelectorAll('.save-couple').forEach(btn => {
        btn.addEventListener('click', () => saveCouple(btn.dataset.coupleId));
    });
}

function renderGuests() {
  const body = document.getElementById('guestsTableBody');
  if (!body) return;
  body.innerHTML = '';
  
  let guestList = state.dashboard.guests || [];
  
  // Filtering
  const query = window.tablePagination.guests.search.toLowerCase();
  if (query) {
      guestList = guestList.filter(g => g.name.toLowerCase().includes(query) || (g.token && g.token.toLowerCase().includes(query)));
  }

  // Sorting
  const sortCol = window.guestSort.column;
  const sortOrd = window.guestSort.order;
  guestList.sort((a, b) => {
      let valA = a[sortCol] || '';
      let valB = b[sortCol] || '';
      if (typeof valA === 'string') {
          valA = valA.toLowerCase();
          valB = valB.toLowerCase();
      }
      if (valA < valB) return sortOrd === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrd === 'asc' ? 1 : -1;
      return 0;
  });

  const indicator = document.getElementById('totalGuestsIndicator');
  if (indicator) indicator.innerText = guestList.length;

  // Pagination
  const { page, limit } = window.tablePagination.guests;
  const totalPages = Math.ceil(guestList.length / limit) || 1;
  if (window.tablePagination.guests.page > totalPages) window.tablePagination.guests.page = totalPages;
  const startIndex = (window.tablePagination.guests.page - 1) * limit;
  const pagedList = guestList.slice(startIndex, startIndex + limit);

  pagedList.forEach((guest, index) => {
    const absoluteIndex = startIndex + index + 1;
    const link = `${window.location.origin}/?guest=${guest.token}`;
    const tr = document.createElement('tr');
    tr.className = "";
    tr.innerHTML = `
      <td class="font-black text-slate-300 text-[10px] px-3 sm:px-6">${String(absoluteIndex).padStart(2, '0')}</td>
      <td class="px-3 sm:px-6">
         <span class="font-bold text-slate-900 text-xs sm:text-sm tracking-tight">${guest.name}</span>
      </td>
      <td class="px-3 sm:px-6">
         <div class="flex items-center gap-2 sm:gap-3">
              <div class="bg-indigo-50 text-indigo-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border border-indigo-100 font-mono text-[10px] sm:text-xs font-semibold overflow-hidden truncate max-w-[150px] sm:max-w-[400px] cursor-pointer hover:bg-indigo-100 hover:border-indigo-300 transition-all group/link" onclick="window.copyGuestLink('${link}')" title="Click to Copy Link">
                 <i class="fas fa-link mr-2 text-indigo-400 group-hover/link:text-indigo-600 transition-colors"></i>${link}
              </div>
         </div>
      </td>
      <td class="text-center px-3 sm:px-6">
         <button class="btn-premium !h-9 !px-4 bg-emerald-100 text-emerald-700 border border-emerald-200 hover:bg-emerald-200 hover:border-emerald-600 mx-auto flex items-center gap-2 transition-all duration-300 rounded-lg !shadow-none" onclick="window.copyGuestMessage('${guest.name}', '${link}')" title="Salin Pesan WA">
                <i class="fab fa-whatsapp text-xs"></i>
                <span class="text-[9px] sm:text-[10px] font-semibold uppercase tracking-tight">WhatsApp</span>
         </button>
      </td>
      <td class="text-right px-3 sm:px-6">
        <div class="flex items-center justify-end gap-1.5 sm:gap-2.5">
            <button class="btn-premium !p-0 w-9 h-9 bg-amber-100 text-amber-700 border border-amber-200 hover:bg-amber-200 hover:border-amber-600 transition-all duration-300 rounded-lg !shadow-none" onclick="window.editGuest('${guest.id}', \`${(guest.name || '').replace(/`/g, '\\`').replace(/"/g, '&quot;')}\`)" title="Edit Nama">
                <i class="fas fa-edit text-xs pointer-events-none"></i>
            </button>
            <button class="btn-premium !p-0 w-9 h-9 bg-red-100 text-red-700 border border-red-200 hover:bg-red-200 hover:border-red-600 transition-all duration-300 rounded-lg !shadow-none" onclick="window.deleteGuest('${guest.id}')" title="Hapus Akses">
                <i class="fas fa-trash text-xs pointer-events-none"></i>
            </button>
        </div>
      </td>
    `;
    body.appendChild(tr);
  });
  
  window.renderPaginationControls('guests', guestList.length, limit, window.tablePagination.guests.page);
}

window.editGuest = function(id, name) {
    showActionModal({
        title: currentLang === 'id' ? 'Ubah Nama Tamu' : 'Edit Guest Name',
        icon: 'fa-user-edit',
        color: 'bg-indigo-600',
        fields: [
            { label: currentLang === 'id' ? 'Nama Lengkap' : 'Full Name', id: 'editGuestName', type: 'text', value: name, icon: 'fa-user' }
        ],
        onSubmit: async () => {
            const newName = document.getElementById('editGuestName').value.trim();
            if (!newName) throw new Error('Name is required');
            await api(`/api/admin/guests/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ name: newName })
            });
            showToast(currentLang === 'id' ? 'Nama tamu diperbarui!' : 'Guest name updated!', 'success');
            await loadDashboard();
        }
    });
}


function renderGallery() {
  const body = document.getElementById('galleryTableBody');
  if (!body) return;
  body.innerHTML = '';

  let dragSrcEl = null;

  async function handleDrop(e) {
    if (e.stopPropagation) e.stopPropagation();
    this.classList.remove('bg-indigo-50/50', 'border-indigo-200', 'shadow-inner');

    if (dragSrcEl !== this) {
      const siblings = [...body.children];
      const draggedIndex = siblings.indexOf(dragSrcEl);
      const droppedIndex = siblings.indexOf(this);

      if (draggedIndex < droppedIndex) {
          this.parentNode.insertBefore(dragSrcEl, this.nextSibling);
      } else {
          this.parentNode.insertBefore(dragSrcEl, this);
      }
      
      dragSrcEl.style.opacity = '1';

      // Update backend using the new sequence
      const newSequence = [...body.children].map(tr => tr.dataset.id);
      try {
          const response = await api('/api/admin/gallery/reorder', {
              method: 'PUT',
              body: JSON.stringify({ sequence: newSequence })
          });
          showToast(currentLang === 'id' ? 'Urutan galeri berhasil disimpan!' : 'Gallery order saved!', 'success');
          await loadDashboard(); // refresh to correct the index numbers
      } catch (err) {
          showToast(err.message, 'error');
      }
    }
    return false;
  }

  state.dashboard.gallery.forEach((item, index) => {
    const tr = document.createElement('tr');
    tr.dataset.id = item.id;
    tr.draggable = true;
    tr.className = "cursor-move transition-colors duration-200 hover:bg-slate-50/50";
    
    tr.addEventListener('dragstart', function(e) {
        this.style.opacity = '0.4';
        dragSrcEl = this;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
    });
    tr.addEventListener('dragenter', function(e) {
        this.classList.add('bg-indigo-50/50', 'border-indigo-200', 'shadow-inner');
    });
    tr.addEventListener('dragover', function(e) {
        if (e.preventDefault) e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        return false;
    });
    tr.addEventListener('dragleave', function(e) {
        this.classList.remove('bg-indigo-50/50', 'border-indigo-200', 'shadow-inner');
    });
    tr.addEventListener('drop', handleDrop);
    tr.addEventListener('dragend', function(e) {
        this.style.opacity = '1';
        [...body.children].forEach(row => {
            row.classList.remove('bg-indigo-50/50', 'border-indigo-200', 'shadow-inner');
        });
    });

    tr.innerHTML = `
      <td class="text-center px-3 sm:px-4 align-middle text-slate-300">
        <i class="fas fa-grip-vertical text-xs sm:text-base"></i>
      </td>
      <td class="font-black text-slate-200 text-[9px] sm:text-[10px] px-3 sm:px-6 align-middle pointer-events-none">${index + 1}</td>
      <td class="px-3 sm:px-6 py-2 sm:py-3">
        <div class="flex items-center gap-3 sm:gap-4">
             <div class="w-16 h-16 sm:w-24 sm:h-24 shrink-0 rounded-lg sm:rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-300 overflow-hidden shadow-sm group cursor-pointer" onclick="openImagePreview('${item.src}')">
                <img src="${item.src}" alt="${item.alt}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 pointer-events-none" onerror="this.src='https://ui-avatars.com/api/?name=${index+1}&background=f1f5f9&color=94a3b8'">
             </div>
             <span class="max-w-[100px] sm:max-w-[200px] truncate text-[9px] sm:text-[11px] font-mono text-slate-400 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100 pointer-events-none">${item.src}</span>
        </div>
      </td>
      <td class="font-bold text-slate-700 text-xs sm:text-base tracking-tight px-3 sm:px-6 align-middle pointer-events-none">${item.alt}</td>
      <td class="text-right px-3 sm:px-6 align-middle">
        <div class="flex items-center justify-end gap-2">
            <button class="btn-premium btn-secondary !p-0 w-8 h-8 sm:w-10 sm:h-10 shrink-0 text-amber-500 hover:!bg-amber-500 hover:!text-white hover:!border-amber-500" onclick="window.editGalleryImage('${item.id}', \`${item.alt.replace(/`/g, '\\`').replace(/"/g, '&quot;')}\`, '${item.src}')">
                <i class="fas fa-edit text-[10px] sm:text-sm pointer-events-none"></i>
            </button>
            <button class="btn-premium btn-secondary !p-0 w-8 h-8 sm:w-10 sm:h-10 shrink-0 text-red-500 hover:!bg-red-500 hover:!text-white hover:!border-red-500" onclick="window.deleteGalleryImage('${item.id}')">
                <i class="fas fa-trash-can text-[10px] sm:text-sm pointer-events-none"></i>
            </button>
        </div>
      </td>
    `;
    body.appendChild(tr);
  });
}

function renderDataLists() {
  const rsvpBody = document.getElementById('rsvpTableBody');
  if (!rsvpBody) return;

  rsvpBody.innerHTML = '';

  let totalGuests = 0;
  
  let rsvpList = state.dashboard.rsvps || [];
  
  // Filtering
  const query = window.tablePagination.rsvp.search.toLowerCase();
  if (query) {
      rsvpList = rsvpList.filter(g => (g.guest_name && g.guest_name.toLowerCase().includes(query)) || (g.status && g.status.toLowerCase().includes(query)));
  }

  // Calculate total confirmed pax across ALL rsvps (unfiltered) or just the entire list.
  (state.dashboard.rsvps || []).forEach(item => {
      totalGuests += parseInt(item.guest_count, 10) || 0;
  });

  if (rsvpList.length === 0) {
    if (state.dashboard.rsvps.length === 0) {
        rsvpBody.innerHTML = `<tr><td colspan="5" class="text-center py-16 text-slate-300"><i class="fas fa-inbox text-3xl mb-3 block opacity-30"></i><p class="text-xs font-semibold">Belum ada data kehadiran</p></td></tr>`;
    } else {
        rsvpBody.innerHTML = `<tr><td colspan="5" class="text-center py-10 text-slate-400 font-medium">Pencarian tidak ditemukan</td></tr>`;
    }
  } else {
    // Pagination
    const { page, limit } = window.tablePagination.rsvp;
    const totalPages = Math.ceil(rsvpList.length / limit) || 1;
    if (window.tablePagination.rsvp.page > totalPages) window.tablePagination.rsvp.page = totalPages;
    const startIndex = (window.tablePagination.rsvp.page - 1) * limit;
    const pagedList = rsvpList.slice(startIndex, startIndex + limit);

    pagedList.forEach((item) => {
      const badgeClass = item.status.toLowerCase() === 'hadir' ? 'badge-paid' : 'badge-pending';
      const dateStr = item.created_at ? new Date(item.created_at).toLocaleDateString('id-ID', { day:'2-digit', month:'short', year:'numeric' }) : '-';
      const tr = document.createElement('tr');
      tr.className = 'group';
      tr.innerHTML = `
        <td class="font-bold text-slate-900 text-xs sm:text-sm tracking-tight px-4 sm:px-6 py-4">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-xs shrink-0">${(item.guest_name || 'A').charAt(0).toUpperCase()}</div>
            ${item.guest_name || 'Tamu Anonim'}
          </div>
        </td>
        <td class="px-4 sm:px-6"><span class="badge-modern ${badgeClass} text-[9px] sm:text-[11px]">${item.status.toUpperCase()}</span></td>
        <td class="text-center font-black text-slate-900 text-xs sm:text-base px-4 sm:px-6">${item.guest_count} <span class="text-[10px] font-normal text-slate-400">orang</span></td>
        <td class="text-right text-slate-400 text-[9px] sm:text-[11px] font-semibold px-4 sm:px-6">${dateStr}</td>
        <td class="text-right px-4 sm:px-6 py-3">
          <button onclick="window.deleteRsvp('${item.id}')" class="btn-premium btn-secondary !p-0 w-8 h-8 sm:w-9 sm:h-9 ml-auto text-slate-400 hover:!bg-red-500 hover:!text-white hover:!border-red-500">
            <i class="fas fa-trash-can text-xs pointer-events-none"></i>
          </button>
        </td>
      `;
      rsvpBody.appendChild(tr);
    });
  }

  window.renderPaginationControls('rsvp', rsvpList.length, window.tablePagination.rsvp.limit, window.tablePagination.rsvp.page);

  // Wishes - Instagram-style cards
  const wishContainer = document.getElementById('wishesCardContainer');
  if (wishContainer) {
    const wishes = state.dashboard?.wishes || [];
    let wishesList = [...wishes];
    const wishQuery = (window.tablePagination.wishes.search || '').toLowerCase();
    
    if (wishQuery) {
        wishesList = wishesList.filter(item => {
            const dateStr = item.created_at ? new Date(item.created_at).toLocaleDateString('id-ID', { day:'2-digit', month:'short', year:'numeric' }) : '-';
            return (item.guest_name && item.guest_name.toLowerCase().includes(wishQuery)) ||
                   (item.message && item.message.toLowerCase().includes(wishQuery)) ||
                   (dateStr.toLowerCase().includes(wishQuery));
        });
    }

    wishContainer.innerHTML = '';

    if (wishesList.length === 0) {
      if (wishes.length === 0) {
          wishContainer.innerHTML = `<div class="flex flex-col items-center justify-center py-16 text-slate-300"><i class="fas fa-comment-slash text-3xl mb-3 opacity-30"></i><p class="text-xs font-semibold">Belum ada ucapan</p></div>`;
      } else {
          wishContainer.innerHTML = `<div class="flex flex-col items-center justify-center py-10 text-slate-400 font-medium italic"><p>Pencarian tidak ditemukan</p></div>`;
      }
    } else {
      wishesList.forEach((item) => {
        const dateStr = item.created_at ? new Date(item.created_at).toLocaleDateString('id-ID', { day:'2-digit', month:'short', year:'numeric' }) : '-';
        const initial = (item.guest_name && item.guest_name.length > 0 ? item.guest_name.charAt(0) : 'A').toUpperCase();
        const card = document.createElement('div');
        card.className = 'px-4 py-2.5 hover:bg-blue-50/50 transition-all rounded-xl mx-1 my-0.5 hover:ring-2 hover:ring-blue-400 group';

        const adminAvatar = document.getElementById('headerUserAvatar') ? document.getElementById('headerUserAvatar').src : '';
        const adminName = (state.dashboard.settings && state.dashboard.settings.hero_name) || 'Admin';
        const replyDisplay = item.reply ? `
          <div class="mt-2 ml-10 flex items-start gap-4 opacity-95 scale-[0.98] origin-top-left transition-all bg-indigo-50/50 p-2.5 rounded-xl border border-indigo-100/50">
              <img src="${adminAvatar}" alt="${adminName}" class="w-6 h-6 rounded-full object-cover border-2 border-white shadow-sm shrink-0" onerror="this.src='https://ui-avatars.com/api/?name=A&background=4f46e5&color=fff&bold=true&size=56'">
              <div class="min-w-0">
                  <p class="text-[9px] mb-0.5 leading-none"><span class="font-bold text-slate-900">${adminName}</span> <span class="text-slate-400 font-normal ml-1">${item.replied_at ? new Date(item.replied_at).toLocaleDateString('id-ID', { day:'2-digit', month:'short' }) : ''}</span></p>
                  <p class="text-[11px] text-slate-600 mt-0.5 leading-snug">${item.reply}</p>
              </div>
          </div>
        ` : '';

        card.innerHTML = `
          <div class="flex items-start gap-3.5">
              <div class="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-black text-[11px] shrink-0 border border-blue-100 mt-1 shadow-sm">${initial}</div>
              <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2">
                      <span class="font-bold text-slate-900 text-[12px]">${item.guest_name || 'Tamu Anonim'}</span>
                      <span class="text-[9px] text-slate-400 font-bold">${dateStr}</span>
                  </div>
                  <p class="text-[12px] text-slate-700 mt-0.5 leading-snug">${item.message}</p>
                  
                  <div class="flex items-center gap-2 mt-1.5">
                      <button title="${item.reply ? 'Edit balasan' : 'Balas ucapan'}" onclick="window.toggleReplyInput(this, '${item.id}')" class="text-blue-500 hover:text-blue-700 transition-colors p-1">
                          <i class="fas ${item.reply ? 'fa-edit' : 'fa-reply'} text-[11px] pointer-events-none"></i>
                      </button>
                      ${item.reply ? `<button title="Hapus balasan" onclick="window.deleteReply('${item.id}')" class="text-amber-500 hover:text-amber-700 transition-colors p-1"><i class="fas fa-times text-[11px] pointer-events-none"></i></button>` : ''}
                      <button title="Hapus ucapan" onclick="window.deleteWish('${item.id}')" class="text-rose-500 hover:text-rose-700 transition-colors p-1">
                          <i class="fas fa-trash-can text-[11px] pointer-events-none"></i>
                      </button>
                  </div>

                  <div id="replyBox_${item.id}" class="hidden mt-2 flex items-center gap-2">
                      <input type="text" id="replyInput_${item.id}" value="${(item.reply || '').replace(/"/g, '&quot;')}" placeholder="Tulis balasan..." class="flex-1 h-8 bg-white border border-slate-200 rounded-full px-3 text-[10px] focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all">
                      <button onclick="window.submitReply(this, '${item.id}')" class="btn-premium btn-primary !h-8 !px-4 !rounded-full !text-[10px] shrink-0 font-bold">
                          Kirim
                      </button>
                  </div>
              </div>
          </div>
          ${replyDisplay}
        `;
        wishContainer.appendChild(card);
      });
    }
  }

  if (document.getElementById('totalGuestsOverview')) document.getElementById('totalGuestsOverview').innerText = totalGuests;
  if (document.getElementById('totalWishes')) document.getElementById('totalWishes').innerText = (state.dashboard.wishes || []).length;
  if (document.getElementById('totalWishesCount')) document.getElementById('totalWishesCount').innerText = (state.dashboard.wishes || []).length;
  if (document.getElementById('totalRsvp')) document.getElementById('totalRsvp').innerText = (state.dashboard.rsvps || []).length;
  if (document.getElementById('totalRsvpCount')) document.getElementById('totalRsvpCount').innerText = (state.dashboard.rsvps || []).length;
  if (document.getElementById('totalGuests')) document.getElementById('totalGuests').innerText = totalGuests;
  if (document.getElementById('totalGuestsIndicator')) document.getElementById('totalGuestsIndicator').innerText = totalGuests;
  
  // Count replies
  const totalReplies = (state.dashboard.wishes || []).filter(w => w.reply && w.reply.trim().length > 0).length;
  if (document.getElementById('totalRepliesCount')) document.getElementById('totalRepliesCount').innerText = totalReplies;
}

async function loadPageViews() {
  try {
    const data = await api('/api/admin/pageviews');
    if (document.getElementById('totalPageViews')) document.getElementById('totalPageViews').innerText = data.total;
    if (document.getElementById('pageViewsTodayBadge')) document.getElementById('pageViewsTodayBadge').innerText = `+${data.today} hari ini`;
    if (document.getElementById('uniquePageViews')) document.getElementById('uniquePageViews').innerText = `${data.unique} Pengunjung Unik`;
    
    // Update simple growth indicators if elements exist
    if (document.getElementById('pageViewsBar')) {
        const growth = data.total > 0 ? Math.round((data.today / data.total) * 100) : 0;
        document.getElementById('pageViewsBar').style.width = `${Math.min(growth + 10, 100)}%`;
    }
  } catch (e) {
    console.error('Error loading page views:', e);
  }
}

async function loadDashboard() {
  try {
    const data = await api('/api/admin/dashboard');
    state.dashboard = data;
    
    // Group sub-calls in try-catch to ensure one failure doesn't block others
    try { renderDashboardCounts(); } catch (e) { console.error('Dashboard counts error:', e); }
    try { renderSettings(); } catch (e) { console.error('Settings error:', e); }
    
    // setLanguage call removed
    
    try { renderDataLists(); } catch (e) { console.error('Data lists error:', e); }
    try { renderEvents(); } catch (e) { console.error('Events error:', e); }
    try { window.renderGifts(); } catch (e) { console.error('Gifts error:', e); }
    try { renderCouple(); } catch (e) { console.error('Couple error:', e); }
    try { renderGuests(); } catch (e) { console.error('Guests error:', e); }
    try { renderGallery(); } catch (e) { console.error('Gallery error:', e); }
    try { await loadLoveStoryAdmin(); } catch (e) { console.error('Love story error:', e); }
    try { populateNotifications(); } catch (e) { console.error('Notifications error:', e); }
    try { await loadPageViews(); } catch (e) { console.error('Page views error:', e); }
  } catch (err) {
    throw err; // Re-throw main dashboard API error to be caught by checkLogin
  }
}

async function checkLogin() {

  let status;
  
  try {
    status = await api('/api/admin/status');
  } catch (err) {
    console.error('Authentication status check failed:', err);
    showLoginUI();
    return;
  }

  if (status.authenticated) {
    showDashboardUI(status.user);
    try {
      await loadDashboard();
      showSection('overview');
    } catch (err) {
      console.error('Dashboard data failed to load:', err);
      showToast('Gagal memuat data dashboard. Silakan refresh.', 'error');
    }
  } else {
    showLoginUI();
  }
}

function showDashboardUI(user) {
  if (loginPanel) loginPanel.classList.add('hidden');
  if (dashboardPanel) dashboardPanel.classList.remove('hidden');
  if (profileDropdownContainer) profileDropdownContainer.classList.remove('hidden');
  
  if (document.getElementById('headerUserName')) document.getElementById('headerUserName').innerText = user.full_name || user.email || 'Administrator';
  if (document.getElementById('dropdownUserName')) document.getElementById('dropdownUserName').innerText = user.full_name || user.email || 'Administrator';
  if (document.getElementById('dropdownUserEmail')) document.getElementById('dropdownUserEmail').innerText = user.email || '';
  
  // Show header elements (Visibility managed by Tailwind)
  const toShow = ['notificationsContainer', 'desktopSearchContainer', 'mobileSearchToggle'];
  toShow.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('hidden');
  });

  const avatarSrc = user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.full_name || user.email || 'Admin')}&background=4f46e5&color=fff&bold=true`;
  if (document.getElementById('headerUserAvatar')) document.getElementById('headerUserAvatar').src = avatarSrc;
  if (document.getElementById('dropdownUserAvatar')) document.getElementById('dropdownUserAvatar').src = avatarSrc;
}

function showLoginUI() {
  if (loginPanel) loginPanel.classList.remove('hidden');
  if (dashboardPanel) dashboardPanel.classList.add('hidden');
  if (profileDropdownContainer) profileDropdownContainer.classList.add('hidden');
  
  // Hide all header interactivity (Visibility managed by Tailwind/CSS)
  const toHide = [
    'notificationsContainer', 
    'desktopSearchContainer', 
    'mobileSearchToggle', 
    'mobileSearchPanel', 
    'globalSearchResults',
    'languageToggleBtn'
  ];
  toHide.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
        el.classList.add('hidden');
        el.style.display = ''; // Clear overrides
    }
  });
}

window.togglePasswordVisibility = function(inputId, iconId) {
  const input = document.getElementById(inputId);
  const icon = document.getElementById(iconId);
  if (!input || !icon) return;

  if (input.type === 'password') {
    input.type = 'text';
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
  } else {
    input.type = 'password';
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
  }
}

async function login() {
  const email = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value.trim();
  if (!email || !password) return;
  try {
    await api('/api/admin/login', { method: 'POST', body: JSON.stringify({ email, password }) });
    await checkLogin();
    showToast(currentLang === 'id' ? 'Berhasil Masuk!' : 'Logged in successfully!', 'success');
  } catch (error) {
    showToast(error.message, 'error');
  }
}

// Enter key to login
async function startMusicAnalysis() {
    const musicPath = document.getElementById('settingBgMusic')?.value;
    const btn = document.getElementById('btnAnalyzeRef');
    const input = document.getElementById('settingMusicStart');
    
    if (!musicPath) {
        showToast('Pilih musik terlebih dahulu', 'error');
        return;
    }

    try {
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analisa...';
        showToast('Menganalisa data audio...', 'info');

        const response = await fetch(musicPath);
        const arrayBuffer = await response.arrayBuffer();
        
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
        
        const rawData = audioBuffer.getChannelData(0); // Ambil channel kiri
        const sampleRate = audioBuffer.sampleRate;
        const chunkSize = sampleRate; // 1 detik per chunk
        const energies = [];

        // Hitung energi (RMS) per detik
        for (let i = 0; i < rawData.length; i += chunkSize) {
            let sum = 0;
            for (let j = 0; j < chunkSize && (i + j) < rawData.length; j++) {
                sum += rawData[i + j] * rawData[i + j];
            }
            energies.push(Math.sqrt(sum / chunkSize));
        }

        // Cari bagian paling "berisik" (biasanya Ref)
        // Kita cari rata-rata energi tertinggi dalam blok 10 detik
        let maxEnergy = 0;
        let refStartSecond = 0;
        const windowSize = 10;

        for (let i = 0; i < energies.length - windowSize; i++) {
            let avg = 0;
            for (let j = 0; j < windowSize; j++) {
                avg += energies[i + j];
            }
            avg /= windowSize;

            if (avg > maxEnergy) {
                maxEnergy = avg;
                refStartSecond = i;
            }
        }

        // Set ke input dengan sedikit offset agar tidak terlalu mendadak (misal di awal puncak energi)
        input.value = refStartSecond.toFixed(1);
        saveSettings();
        
        showToast(`Ref terdeteksi pada detik ${refStartSecond}!`, 'success');
        
        // Preview langsung
        const preview = document.getElementById('music_preview');
        if (preview) {
            preview.currentTime = refStartSecond;
            preview.play();
        }

    } catch (err) {
        console.error('Analysis failed:', err);
        showToast('Gagal menganalisa musik.', 'error');
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-wand-magic-sparkles"></i> Analisa Ref';
    }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.innerText = t(key);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.setAttribute('placeholder', t(key));
  });
  checkLogin();
  
  const passwordInput = document.getElementById('loginPassword');
  const usernameInput = document.getElementById('loginUsername');
  if (passwordInput) {
    passwordInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') login();
    });
  }
  if (usernameInput) {
    usernameInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') login();
    });
  }
});

async function logout() {
  window.deleteWithConfirm(async () => {
      await api('/api/admin/logout', { method: 'POST' });
      await checkLogin();
  }, {
      message: t('alert_logout')
  });
}

async function saveSettings(quiet = false) {
  // Helper to safely get value or default
  const val = (id, def = '') => document.getElementById(id)?.value || def;
  const checked = (id) => document.getElementById(id)?.checked ? 'true' : 'false';

  const payload = {
    cover_title: val('settingCoverTitle'),
    cover_subtitle: val('settingCoverSubtitle'),
    hero_name: val('settingHeroName'),
    guest_prefix: val('settingGuestPrefix'),
    guest_label: val('settingGuestLabel'),
    hero_button: val('settingHeroButton'),
    notification_retention: val('settingNotificationRetention'),
    wishes_limit: val('settingWishesLimit', '0'),
    notifications_enabled: checked('settingEnableNotifications'),
    music_autoplay: checked('settingAutoPlay'),
    music_start_time: val('settingMusicStart', '0'),
    bg_music: val('settingBgMusic'),
    greeting_heading: val('settingGreetingHeading'),
    greeting_quote: val('settingGreetingQuote'),
    greeting_logo: val('settingGreetingLogo'),
    greeting_invitation: val('settingGreetingInvitation'),
    couple_section_title: val('settingCoupleSectionTitle'),
    event_header_quote: val('settingEventHeaderQuote'),
    event_header_title: val('settingEventHeaderTitle'),
    rsvp_caption: val('settingRsvpCaption'),
    event_bg: val('settingEventBg'),
    lovestory_bg: val('settingLovestoryBg'),
    lovestory_card_bg: val('settingLovestoryCardBg'),
    gift_bg_img: val('settingGiftBgImg'),
    gift_bg_color: val('settingGiftBgColor'),
    wishes_bg_img: val('settingWishesBgImg'),
    wishes_bg_color: val('settingWishesBgColor'),
    wishes_bg_mode: checked('settingWishesBgMode') === 'true' ? 'image' : 'color',
    rsvp_bg_img: val('settingRsvpBgImg'),
    rsvp_bg_color: val('settingRsvpBgColor'),
    opening_bg_color: val('settingOpeningBgColor'),
    couple_bg_color: val('settingCoupleBgColor', '#000000'),
    couple_bg_img: val('settingCoupleBgImg'),
    gallery_bg_img: val('settingGalleryBgImg'),
    gallery_bg_color: val('settingGalleryBgColor', '#000000'),
    couple_bg_mode: val('settingCoupleBgMode', 'color'),
    event_bg_color: val('settingEventBgColor'),
    lovestory_bg_color: val('settingLovestoryBgColor'),
    lovestory_card_bg_color: val('settingLovestoryCardBgColor'),
    wa_template: val('waTemplateInput'),
    opening_bg_img: val('settingOpeningBgImg'),
    opening_bg_mode: val('settingOpeningBgMode', 'color'),
    greeting_bg_img: val('settingGreetingBgImg'),
    greeting_bg_color: val('settingGreetingBgColor', '#000000'),
    greeting_bg_mode: val('settingGreetingBgMode', 'color')
  };
  
  const response = await fetch('/api/admin/settings', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const text = await response.text();
  let result;
  try {
    result = JSON.parse(text);
  } catch (e) {
    throw new Error('Respon server tidak valid (bukan JSON).');
  }

  if (!response.ok || !result.success) {
    throw new Error(result.error || 'Gagal menyimpan pengaturan.');
  }

  // Update local state immediately
  if (!state.dashboard.settings) state.dashboard.settings = {};
  Object.assign(state.dashboard.settings, payload);
  
  if (!quiet) {
    showToast(t('alert_settings_sync'), 'success');
  }
}

window.uploadSettingImg = async function(input, key, previewId) {
    if (!input.files || !input.files[0]) return;
    const formData = new FormData();
    formData.append('image', input.files[0]);
    formData.append('setting_key', key);

    try {
        const response = await fetch('/api/admin/settings/upload', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();
        if (result.success) {
            if (document.getElementById(previewId)) document.getElementById(previewId).src = result.src;
            
            // Show delete button if it exists (specifically for Wishes)
            if (key === 'wishes_bg_img' && document.getElementById('btnDeleteWishesBg')) {
                document.getElementById('btnDeleteWishesBg').classList.remove('hidden');
            }
            
            // Map key like 'greeting_logo' to ID like 'settingGreetingLogo'
            const camelKey = key.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
            const hiddenInput = document.getElementById('setting' + camelKey);
            if (hiddenInput) {
                hiddenInput.value = result.src;
            }
            // Update local state
            state.dashboard.settings[key] = result.src;
            showToast('Gambar berhasil diunggah', 'success');
        } else {
            showToast(result.error || 'Gagal mengunggah gambar', 'error');
        }
    } catch (err) {
        console.error(err);
        showToast('Gagal mengunggah gambar', 'error');
    }
}

window.deleteSettingImg = function(key, previewId) {
    if (!confirm('Hapus gambar ini?')) return;
    const preview = document.getElementById(previewId);
    const camelKey = key.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
    const hiddenInput = document.getElementById('setting' + camelKey);
    
    if (preview) preview.src = '';
    if (hiddenInput) hiddenInput.value = '';
    
    // Specifically for wishes, hide the delete button if any
    if (key === 'wishes_bg_img' && document.getElementById('btnDeleteWishesBg')) {
        document.getElementById('btnDeleteWishesBg').classList.add('hidden');
    }
    
    // Update local state
    if (state.dashboard && state.dashboard.settings) {
        state.dashboard.settings[key] = '';
    }
    
    saveSettings();
    showToast('Gambar berhasil dihapus', 'success');
}
function updateEventDateDisplay(eventId, dateIsoString) {
    if (!dateIsoString) return;
    
    // ... [existing array logic] ...
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    
    const dateObj = new Date(dateIsoString);
    if (isNaN(dateObj)) return;
    
    const dayName = days[dateObj.getDay()];
    const dateNum = dateObj.getDate();
    const monthName = months[dateObj.getMonth()];
    const year = dateObj.getFullYear();
    
    const formattedDate = `${dayName}, ${dateNum} ${monthName} ${year}`;
    
    const hiddenDateInput = document.getElementById(`event${eventId}Date`);
    const dateLabel = document.getElementById(`event${eventId}DateLabel`);
    const dateIsoInput = document.getElementById(`event${eventId}DateIso`);
    
    if (hiddenDateInput) hiddenDateInput.value = formattedDate;
    if (dateLabel) dateLabel.innerText = formattedDate;
    if (dateIsoInput) dateIsoInput.value = dateIsoString;
}

window.updateMapPreview = function(eventId, value) {
    let src = value;
    if (value && value.includes('<iframe')) {
        const match = value.match(/src=["']([^"']+)["']/);
        if (match) {
            src = match[1];
            document.getElementById(`event${eventId}MapSrc`).value = src;
        }
    }
    
    const iframe = document.getElementById(`event${eventId}MapIframe`);
    const container = document.getElementById(`event${eventId}MapContainer`);
    if (iframe && container) {
        if (src && src.trim() !== '') {
            iframe.src = src;
            container.classList.remove('hidden');
            container.classList.add('block');
        } else {
            iframe.src = '';
            container.classList.remove('block');
            container.classList.add('hidden');
        }
    }
};

async function saveEvent(id) {
  const prefix = `event${id}`;
  const dateIso = document.getElementById(`${prefix}DateIso`)?.value || document.getElementById(`${prefix}DatePicker`)?.value || '';
  const payload = {
    name: document.getElementById(`${prefix}Name`).value,
    heading: document.getElementById(`${prefix}Heading`).value,
    time: document.getElementById(`${prefix}Time`).value,
    date: document.getElementById(`${prefix}Date`).value,
    date_iso: dateIso,
    location_name: document.getElementById(`${prefix}Location`).value,
    address: document.getElementById(`${prefix}Address`).value,
    map_src: document.getElementById(`${prefix}MapSrc`).value,
    map_link: document.getElementById(`${prefix}MapLink`).value,
    icon_src: document.getElementById(`${prefix}Icon`).value,
  };
  await api(`/api/admin/events/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
  showToast(t('alert_event_updated', {id}), 'success');
}

async function saveCouple(id) {
  const prefix = `couple${id}`;
  const payload = {
    role: document.getElementById(`${prefix}Role`).value,
    name: document.getElementById(`${prefix}Name`).value,
    parents: document.getElementById(`${prefix}Parents`).value,
    instagram: document.getElementById(`${prefix}Instagram`).value,
    image_src: document.getElementById(`${prefix}Image`).value,
  };
  await api(`/api/admin/couple/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
  showToast(t('alert_couple_updated', {id}), 'success');
}

async function addGuest() {
  const name = document.getElementById('guestNameInput').value.trim();
  if (!name) return;

  try {
    await api('/api/admin/guests', { method: 'POST', body: JSON.stringify({ name }) });
    document.getElementById('guestNameInput').value = '';
    await loadDashboard();
    showToast(currentLang === 'id' ? 'Tamu berhasil ditambahkan!' : 'Guest added successfully!', 'success');
  } catch (error) {
    showToast(error.message, 'error');
  }
}

window.deleteGuest = function(id) {
    window.deleteWithConfirm(async () => {
        await api(`/api/admin/guests/${id}`, { method: 'DELETE' });
        await loadDashboard();
        showToast(currentLang === 'id' ? 'Tamu dihapus dari daftar!' : 'Guest revoked from list!', 'delete');
    }, {
        message: t('alert_guest_revoke')
    });
}

window.toggleReplyInput = function(btn, id) {
    const parent = btn.closest('.flex-1');
    const box = parent.querySelector(`[id^="replyBox_"]`);
    if (!box) return;
    
    const isHidden = box.classList.contains('hidden');
    // Close other reply boxes globally to keep it clean
    document.querySelectorAll('[id^="replyBox_"]').forEach(el => el.classList.add('hidden'));
    
    if (isHidden) {
        box.classList.remove('hidden');
        const input = box.querySelector('input');
        if (input) input.focus();
    }
}

window.submitReply = async function(btn, id) {
    const parent = btn.closest('.flex-1');
    const input = parent.querySelector('input');
    if (!input) return;
    const reply = input.value.trim();
    if (!reply) {
        showToast('Balasan tidak boleh kosong', 'error');
        return;
    }
    
    btn.disabled = true;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

    try {
        await api(`/api/admin/wishes/${id}/reply`, {
            method: 'POST',
            body: JSON.stringify({ reply })
        });
        showToast('Balasan berhasil disimpan!', 'success');
        await loadDashboard();
    } catch (err) {
        showToast(err.message, 'error');
    } finally {
        btn.disabled = false;
        btn.innerHTML = originalText;
    }
}

window.deleteReply = async function(id) {
    window.deleteWithConfirm(async () => {
        await api(`/api/admin/wishes/${id}/reply`, {
            method: 'POST',
            body: JSON.stringify({ reply: '' })
        });
        showToast(currentLang === 'id' ? 'Balasan dihapus!' : 'Reply purged!', 'success');
        await loadDashboard();
    }, {
        message: 'Apakah Anda yakin ingin menghapus balasan ini?'
    });
}

window.deleteWish = function(id) {
    window.deleteWithConfirm(async () => {
        await api(`/api/admin/wishes/${id}`, { method: 'DELETE' });
        await loadDashboard();
        showToast('Ucapan berhasil dihapus.', 'delete');
    }, {
        message: 'Ucapan ini akan dihapus permanen dan tidak bisa dikembalikan.'
    });
}

window.deleteRsvp = function(id) {
    window.deleteWithConfirm(async () => {
        await api(`/api/admin/rsvps/${id}`, { method: 'DELETE' });
        await loadDashboard();
        showToast('Data kehadiran berhasil dihapus.', 'delete');
    }, {
        message: 'Data kehadiran ini akan dihapus permanen.'
    });
}


window.copyGuestLink = function(link) {
  navigator.clipboard.writeText(link).then(() => {
    showToast(t('alert_link_copied'), 'info');
  });
}

window.showModal = function(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  const backdrop = modal.querySelector('.modal-premium-backdrop');
  const content = modal.querySelector('.modal-premium-content');
  
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  
  setTimeout(() => {
    if (backdrop) {
        backdrop.classList.remove('opacity-0');
        backdrop.classList.add('opacity-100');
    }
    if (content) {
        content.classList.remove('opacity-0', 'scale-90');
        content.classList.add('opacity-100', 'scale-100');
    }
  }, 10);
}

window.hideModal = function(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  const backdrop = modal.querySelector('.modal-premium-backdrop');
  const content = modal.querySelector('.modal-premium-content');
  
  if (backdrop) {
      backdrop.classList.remove('opacity-100');
      backdrop.classList.add('opacity-0');
  }
  if (content) {
      content.classList.remove('opacity-100', 'scale-100');
      content.classList.add('opacity-0', 'scale-90');
  }
  
  setTimeout(() => {
    modal.classList.remove('flex');
    modal.classList.add('hidden');
    // Common resets
    const form = modal.querySelector('form');
    if (form) form.reset();
    const preview = modal.querySelector('#galleryUploadPreview');
    if (preview) preview.classList.add('hidden');
    const placeholder = modal.querySelector('#galleryUploadPlaceholder');
    if (placeholder) placeholder.classList.remove('hidden');
  }, 300);
}

window.showActionModal = function(options) {
    const modal = document.getElementById('adminActionModal');
    const title = document.getElementById('actionModalTitle');
    const iconContainer = document.getElementById('actionModalIcon');
    const fieldsContainer = document.getElementById('actionModalFields');
    const submitBtn = document.getElementById('actionModalSubmit');
    
    title.innerText = options.title || 'Action';
    iconContainer.className = `accent-square ${options.color || 'bg-indigo-600'}`;
    iconContainer.innerHTML = `<i class="fas ${options.icon || 'fa-edit'}"></i>`;
    
    fieldsContainer.innerHTML = (options.fields || []).map(f => `
        <div class="space-y-2">
            <label class="text-[11px] sm:text-xs font-semibold text-slate-600 px-1">${f.label}</label>
            <div class="relative">
                <i class="fas ${f.icon || 'fa-tag'} absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"></i>
                ${f.type === 'textarea' ? 
                    `<textarea id="${f.id}" class="input-premium pl-11 min-h-[100px]">${f.value || ''}</textarea>` :
                    `<input id="${f.id}" type="${f.type || 'text'}" value="${f.value || ''}" class="input-premium pl-11">`
                }
            </div>
        </div>
    `).join('');
    
    submitBtn.onclick = async () => {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Processing...';
        try {
            await options.onSubmit();
            hideModal('adminActionModal');
        } catch (e) {
            showToast(e.message, 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `<span>${currentLang === 'id' ? 'Simpan' : 'Save Changes'}</span> <i class="fas fa-check text-[10px] opacity-50 ml-2"></i>`;
        }
    };
    
    showModal('adminActionModal');
}

window.deleteWithConfirm = function(onConfirm, options = {}) {
    const modal = document.getElementById('adminConfirmModal');
    const msg = document.getElementById('confirmModalMessage');
    const submitBtn = document.getElementById('confirmModalSubmit');
    
    if (options.message) msg.innerText = options.message;
    
    submitBtn.onclick = async () => {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        try {
            await onConfirm();
            hideModal('adminConfirmModal');
        } catch (e) {
            showToast(e.message, 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `Confirm Delete <i class="fas fa-chevron-right text-[10px] opacity-40 ml-2"></i>`;
        }
    };
    
    showModal('adminConfirmModal');
}

function openGalleryModal() {
  document.getElementById('galleryEditId').value = '';
  document.getElementById('galleryFileAlt').value = '';
  document.getElementById('galleryFile').required = true;
  document.title = currentLang === 'id' ? 'Tambah Asset' : 'Add Asset';
  showModal('galleryUploadModal');
}

function closeGalleryModal() {
  hideModal('galleryUploadModal');
}

async function submitGalleryUpload(event) {
  event.preventDefault();
  const id = document.getElementById('galleryEditId').value;
  const fileInput = document.getElementById('galleryFile');
  const alt = document.getElementById('galleryFileAlt').value.trim();
  
  if (!id && !fileInput.files.length) {
      showToast('Please select a file', 'error');
      return;
  }
  if (!alt) return;

  const formData = new FormData();
  if (fileInput.files.length) formData.append('image', fileInput.files[0]);
  formData.append('alt', alt);

  try {
    let url = '/api/admin/gallery';
    let method = 'POST';
    
    if (id) {
        url = `/api/admin/gallery/${id}/meta`; // I'll add this endpoint or just use standard update
        method = 'PUT';
    }

    const response = await fetch(url, {
      method: method,
      body: formData,
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Upload failed');
    await loadDashboard();
    closeGalleryModal();
    showToast(currentLang === 'id' ? 'Aset galeri berhasil diperbarui!' : 'Gallery asset updated!', 'success');
  } catch (error) {
    showToast(error.message, 'error');
  }
}

window.editGalleryImage = function(id, alt, src) {
    const modal = document.getElementById('galleryUploadModal');
    document.getElementById('galleryEditId').value = id;
    document.getElementById('galleryFileAlt').value = alt;
    document.getElementById('galleryFile').required = false;
    
    const preview = document.getElementById('galleryUploadPreview');
    const placeholder = document.getElementById('galleryUploadPlaceholder');
    const img = document.getElementById('galleryPreviewImg');
    
    img.src = src;
    placeholder.classList.add('hidden');
    preview.classList.remove('hidden');
    
    showModal('galleryUploadModal');
}

window.deleteGalleryImage = function(id) {
    window.deleteWithConfirm(async () => {
        await api(`/api/admin/gallery/${id}`, { method: 'DELETE' });
        await loadDashboard();
        showToast(currentLang === 'id' ? 'Aset dihapus permanen' : 'Asset purged permanently', 'delete');
    }, {
        message: t('alert_gallery_purge')
    });
}

// Event Listeners
if (loginButton) loginButton.addEventListener('click', login);
if (document.getElementById('headerLogoutBtn')) document.getElementById('headerLogoutBtn').addEventListener('click', logout);
if (document.getElementById('saveSettingsButton')) document.getElementById('saveSettingsButton').addEventListener('click', saveSettings);

const galleryFileInput = document.getElementById('galleryFile');
if (galleryFileInput) {
    galleryFileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const preview = document.getElementById('galleryUploadPreview');
                const placeholder = document.getElementById('galleryUploadPlaceholder');
                const img = document.getElementById('galleryPreviewImg');
                if (preview && placeholder && img) {
                    img.src = event.target.result;
                    placeholder.classList.add('hidden');
                    preview.classList.remove('hidden');
                }
            };
            reader.readAsDataURL(file);
        }
    });
}

// --- Header Menus Mutual Exclusion Helper ---
function closeAllHeaderMenus() {
    // 1. Close Profile Menu
    const profileMenu = document.getElementById('profileDropdownMenu');
    if (profileMenu) profileMenu.classList.add('opacity-0', 'scale-95', 'pointer-events-none');
    
    // 2. Close Notification Menu
    const notificationsMenu = document.getElementById('notificationsMenu');
    if (notificationsMenu) {
        notificationsMenu.classList.remove('opacity-100', 'scale-100', 'pointer-events-auto');
        notificationsMenu.classList.add('opacity-0', 'scale-95', 'pointer-events-none');
    }
    
    // 3. Close Mobile Search Panel
    const mobileSearchPanel = document.getElementById('mobileSearchPanel');
    if (mobileSearchPanel && !mobileSearchPanel.classList.contains('hidden')) {
        mobileSearchPanel.classList.remove('opacity-100', 'translate-y-0');
        mobileSearchPanel.classList.add('opacity-0', '-translate-y-4');
        setTimeout(() => mobileSearchPanel.classList.add('hidden'), 300);
    }
    
    // 4. Close Global Search Results
    const globalSearchResults = document.getElementById('globalSearchResults');
    if (globalSearchResults) globalSearchResults.classList.add('hidden');
}

// Profile Dropdown Logic
const profileBtn = document.getElementById('profileDropdownBtn');
const profileMenu = document.getElementById('profileDropdownMenu');
if (profileBtn && profileMenu) {
  profileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isCurrentlyHidden = profileMenu.classList.contains('opacity-0');
    
    if (isCurrentlyHidden) {
      closeAllHeaderMenus(); // Close others before opening this one
      profileMenu.classList.remove('opacity-0', 'scale-95', 'pointer-events-none');
    } else {
      profileMenu.classList.add('opacity-0', 'scale-95', 'pointer-events-none');
    }
  });

  document.addEventListener('click', (e) => {
    if (profileMenu && !profileMenu.contains(e.target)) {
      profileMenu.classList.add('opacity-0', 'scale-95', 'pointer-events-none');
    }
  });
}
if (document.getElementById('addGuestButton')) document.getElementById('addGuestButton').addEventListener('click', addGuest);
if (document.getElementById('openGalleryUpload')) document.getElementById('openGalleryUpload').addEventListener('click', openGalleryModal);
if (document.getElementById('closeGalleryUpload')) document.getElementById('closeGalleryUpload').addEventListener('click', closeGalleryModal);
if (document.getElementById('cancelGalleryUpload')) document.getElementById('cancelGalleryUpload').addEventListener('click', closeGalleryModal);
if (document.getElementById('galleryUploadForm')) document.getElementById('galleryUploadForm').addEventListener('submit', submitGalleryUpload);

document.addEventListener('click', (e) => {
  const navBtn = e.target.closest('.admin-nav-button');
  
  if (navBtn) showSection(navBtn.dataset.section);
  
  if (e.target.closest('#mobileSidebarToggle')) {
     sidebar.classList.toggle('-translate-x-full');
  } else if (!e.target.closest('#sidebar') && window.innerWidth < 1024) {
     sidebar.classList.add('-translate-x-full');
  }
});

let lsMessages = [];

function renderLoveStoryChat() {
    const chatList = document.getElementById('lsChatList');
    if (!chatList) return;

    const countEl = document.getElementById('ls_count');
    if (countEl) countEl.innerText = `(${lsMessages.length})`;
    
    // Handle placeholder
    const placeholder = document.getElementById('chatPlaceholder');
    if (placeholder) {
        placeholder.style.display = lsMessages.length > 0 ? 'none' : 'flex';
    }

    // Keep existing items if needed or clear list
    // If clearing, we should append items after the placeholder if it exists
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
            const roleIcon = isFemale ? 'fa-venus' : 'fa-mars';
            
            cardClass = isFemale ? 'bg-pink-50/50 border-pink-200/50 dark:bg-pink-950/20 dark:border-pink-900/30' : 'bg-blue-50/50 border-blue-200/50 dark:bg-blue-950/20 dark:border-blue-900/30';
            
            contentHTML = `
                <div class="flex flex-col gap-2 w-full">
                    <div class="flex justify-between items-center bg-white/50 dark:bg-slate-800/50 px-3 py-2 rounded-xl border border-white/80 dark:border-slate-700/50 shadow-sm">
                        <div class="flex items-center gap-2">
                            <div class="w-6 h-6 rounded-md bg-${roleColor}-500 text-white flex items-center justify-center shadow-sm">
                                <i class="fas ${roleIcon} text-[10px]"></i>
                            </div>
                            <span class="text-[10px] font-semibold text-${roleColor}-700 dark:text-${roleColor}-400">${roleName}</span>
                        </div>
                        <div class="flex items-center gap-1.5">
                            <i class="far fa-clock text-${roleColor}-300 dark:text-${roleColor}-600 text-[10px]"></i>
                            <input type="text" class="bg-white dark:bg-[#141416] border-none py-0 h-5 w-12 text-center text-[10px] font-bold text-${roleColor}-600 dark:text-${roleColor}-400 rounded focus:ring-0" placeholder="10:00" value="${msg.time || ''}" onchange="lsMessages[${idx}].time = this.value">
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
}

window.addLsMessage = function(type) {
    if (type === 'date') {
        lsMessages.push({ type: 'date', date_label: '' });
    } else {
        lsMessages.push({ type: 'chat', sender: type, message: '', time: '' });
    }
    renderLoveStoryChat();
}

window.removeLsMessage = function(idx) {
    lsMessages.splice(idx, 1);
    renderLoveStoryChat();
}

window.uploadCoupleAvatar = async function(input, coupleId, previewId) {
    if (!input.files.length) return;
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
        
        document.getElementById(previewId).src = data.src;
        document.getElementById(`couple${coupleId}Image`).value = data.src;
        showToast(currentLang === 'id' ? 'Foto profil berhasil diunggah!' : 'Profile photo uploaded successfully!', 'success');
        await loadDashboard(); // refresh state
    } catch (e) {
        showToast(currentLang === 'id' ? 'Gagal mengupload foto: ' + e.message : 'Upload failed: ' + e.message, 'error');
    }
}

window.openImagePreview = function(src) {
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/90 opacity-0 transition-opacity duration-300';
  modal.onclick = (e) => {
    if (e.target === modal) closeImagePreview(modal);
  };

  modal.innerHTML = `
    <div class="relative max-w-5xl max-h-[90vh] p-2 scale-95 transition-transform duration-300" id="previewImageWrapper">
      <button onclick="closeImagePreview(this.closest('.fixed'))" class="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full text-slate-900 shadow-2xl hover:bg-slate-100 hover:scale-110 transition-all font-bold z-10 flex items-center justify-center">
        <i class="fas fa-times"></i>
      </button>
      <img src="${src}" class="max-w-full max-h-[85vh] rounded-2xl shadow-2xl object-contain border border-slate-800">
    </div>
  `;

  document.body.appendChild(modal);
  
  requestAnimationFrame(() => {
    modal.classList.remove('opacity-0');
    modal.classList.add('opacity-100');
    const wrapper = modal.querySelector('#previewImageWrapper');
    wrapper.classList.remove('scale-95');
    wrapper.classList.add('scale-100');
  });
};

window.closeImagePreview = function(modal) {
  modal.classList.remove('opacity-100');
  modal.classList.add('opacity-0');
  const wrapper = modal.querySelector('#previewImageWrapper');
  wrapper.classList.remove('scale-100');
  wrapper.classList.add('scale-95');
  setTimeout(() => modal.remove(), 300);
};

window.uploadEventIcon = async function(input, eventId, previewId) {
    if (!input.files.length) return;
    const formData = new FormData();
    formData.append('image', input.files[0]);
    
    try {
        const res = await fetch(`/api/admin/events/${eventId}/icon`, {
            method: 'POST',
            body: formData,
            credentials: 'include'
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Upload failed');
        
        const previewImg = document.getElementById(previewId);
        if (previewImg) previewImg.src = data.src;
        
        const hiddenInput = document.getElementById(`event${eventId}Icon`);
        if (hiddenInput) hiddenInput.value = data.src;
        
        showToast(currentLang === 'id' ? 'Ikon acara berhasil diunggah!' : 'Event icon uploaded successfully!', 'success');
    } catch (e) {
        showToast(currentLang === 'id' ? 'Gagal mengupload ikon: ' + e.message : 'Upload failed: ' + e.message, 'error');
    }
}

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
        if (previewImg) previewImg.src = data.src;
        
        showToast(currentLang === 'id' ? 'Avatar berhasil diunggah!' : 'Avatar uploaded!', 'success');
    } catch (e) {
        showToast(e.message, 'error');
    } finally {
        input.value = ''; // Reset input
    }
}

window.saveLoveStory = async function() {
    const title = document.getElementById('ls_title').value;
    const lovestory_bg = document.getElementById('settingLovestoryBg')?.value || '';
    const lovestory_card_bg = document.getElementById('settingLovestoryCardBg')?.value || '';
    const body = {
        title: title,
        lovestory_bg: lovestory_bg,
        lovestory_card_bg: lovestory_card_bg,
        messages: lsMessages
    };
    
    try {
        await api('/api/admin/lovestory', {
            method: 'PUT',
            body: JSON.stringify(body)
        });
        showToast(currentLang === 'id' ? 'Kisah cinta berhasil disimpan!' : 'Love story saved!', 'success');
        await loadDashboard();
    } catch (err) {
        showToast(err.message, 'error');
    }
}

window.showImportExcelModal = function() {
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm opacity-0 transition-opacity duration-300';
  modal.onclick = (e) => {
    if (e.target === modal) window.closeImportExcelModal(modal);
  };

  modal.innerHTML = `
    <div class="bg-white rounded-2xl shadow-2xl w-[90%] max-w-sm overflow-hidden scale-95 transition-transform duration-300 flex flex-col" id="importExcelWrapper">
      <div class="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg shadow-sm">
                <i class="fas fa-file-excel"></i>
            </div>
            <div>
                <h3 class="font-bold text-slate-900 text-sm">Import Tamu</h3>
                <p class="text-[11px] sm:text-xs font-semibold text-slate-600 mt-0.5">Format: Excel</p>
            </div>
        </div>
        <button onclick="window.closeImportExcelModal(this.closest('.fixed'))" class="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors flex items-center justify-center font-bold pb-0.5">&times;</button>
      </div>
      <div class="p-6">
        <label class="block w-full cursor-pointer hover:border-emerald-400 transition-colors border-2 border-dashed border-slate-200 rounded-2xl p-10 text-center bg-slate-50/50 group shadow-sm mb-4">
          <i class="fas fa-file-import text-3xl text-emerald-500 mb-3 group-hover:scale-110 transition-transform"></i>
          <p class="text-xs font-bold text-slate-700">Pilih berkas Excel (.xlsx / .xls / .csv)</p>
          <p class="text-[10px] text-slate-400 mt-1">Klik untuk memilih atau seret file ke sini</p>
          <input type="file" accept=".xlsx, .xls, .csv" class="hidden" id="excelFileInput" onchange="window.handleSelectedExcel(this)">
        </label>

        <p id="excelFileName" class="text-center font-bold text-xs text-indigo-600 mb-4 hidden bg-indigo-50/50 py-2 rounded-lg border border-indigo-100"></p>

        <div class="flex items-center justify-center">
            <button onclick="window.downloadExcelTemplate()" class="text-[9px] sm:text-[10px] font-bold text-indigo-600 hover:text-indigo-800 flex flex-col items-center gap-1 px-3 sm:px-5 py-2 sm:py-3 bg-indigo-50 rounded-xl border border-indigo-100 transition-all hover:bg-indigo-100 active:scale-95 shadow-sm">
                <div class="flex items-center gap-1.5 sm:gap-2">
                    <i class="fas fa-download text-[11px] sm:text-base"></i> 
                    <span>UNDUH TEMPLATE EXCEL</span>
                </div>
                <span class="text-[7px] sm:text-[8px] opacity-60 uppercase tracking-wider font-medium">(Template Exel Undangan Tamu)</span>
            </button>
        </div>
      </div>
      <div class="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
        <button onclick="window.closeImportExcelModal(this.closest('.fixed'))" class="px-5 py-2.5 rounded-xl font-bold text-[11px] text-slate-600 hover:bg-slate-200 transition-colors">BATAL</button>
        <button id="importSubmitBtn" onclick="window.uploadExcel()" class="bg-emerald-600 text-white font-bold px-6 py-2.5 rounded-xl text-[11px] hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed" disabled>
          MULAI IMPORT
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  
  requestAnimationFrame(() => {
    modal.classList.remove('opacity-0');
    modal.classList.add('opacity-100');
    const wrapper = modal.querySelector('#importExcelWrapper');
    wrapper.classList.remove('scale-95');
    wrapper.classList.add('scale-100');
  });
};

window.closeImportExcelModal = function(modal) {
  modal.classList.remove('opacity-100');
  modal.classList.add('opacity-0');
  const wrapper = modal.querySelector('#importExcelWrapper');
  wrapper.classList.remove('scale-100');
  wrapper.classList.add('scale-95');
  setTimeout(() => modal.remove(), 300);
};

window.handleSelectedExcel = function(input) {
  const fileNameDisplay = document.getElementById('excelFileName');
  const submitBtn = document.getElementById('importSubmitBtn');
  if (input.files.length > 0) {
      fileNameDisplay.innerText = "Terpilih: " + input.files[0].name;
      fileNameDisplay.classList.remove('hidden');
      submitBtn.disabled = false;
  } else {
      fileNameDisplay.classList.add('hidden');
      submitBtn.disabled = true;
  }
};

window.uploadExcel = async function() {
  const input = document.getElementById('excelFileInput');
  if (!input || !input.files.length) return;

  const btn = document.getElementById('importSubmitBtn');
  btn.disabled = true;
  btn.innerText = 'MENGIMPOR...';

  const formData = new FormData();
  formData.append('file', input.files[0]);

  try {
      const res = await fetch('/api/admin/guests/import', {
          method: 'POST',
          body: formData,
          credentials: 'include'
      });
      
      if (!res.ok) {
          const text = await res.text();
          let errorMsg = 'Upload failed';
          try {
              const json = JSON.parse(text);
              errorMsg = json.error || errorMsg;
          } catch(e) {
              errorMsg = `Server Error (${res.status}): Mohon RESTART server Node.js Anda.`;
          }
          throw new Error(errorMsg);
      }

      const data = await res.json();
      showToast(currentLang === 'id' ? `Berhasil mengimpor ${data.count} tamu!` : `Successfully imported ${data.count} guests!`, 'success');
      window.closeImportExcelModal(document.getElementById('importExcelWrapper').closest('.fixed'));
      await loadDashboard();
  } catch (e) {
      showToast(e.message, 'error');
      btn.disabled = false;
      btn.innerText = 'MULAI IMPORT';
  }
};
window.downloadExcelTemplate = function() {
  const content = "Nama Tamu\nNama Tamu 1\nNama Tamu 2\nNama Tamu 3";
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", "template_undangan_tamu.csv");
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

async function loadLoveStoryAdmin() {
    try {
        const response = await api('/api/admin/lovestory');
        lsMessages = response.messages || [];
        const settings = response.settings || {};
        
        const titleEl = document.getElementById('ls_title');
        const mAvatar = document.getElementById('ls_male_preview');
        const fAvatar = document.getElementById('ls_female_preview');
        const bgPreview = document.getElementById('lovestoryBgPreview');
        const bgInput = document.getElementById('settingLovestoryBg');
        const cardBgPreview = document.getElementById('lovestoryCardBgPreview');
        const cardBgInput = document.getElementById('settingLovestoryCardBg');
        
        if (titleEl) titleEl.value = settings.title || settings.chat_title || '';
        if (mAvatar) mAvatar.src = settings.male_avatar || 'img/rian.jpeg';
        if (fAvatar) fAvatar.src = settings.female_avatar || 'img/aurora.jpeg';
        
        if (bgPreview && settings.lovestory_bg) bgPreview.src = settings.lovestory_bg;
        if (bgInput) bgInput.value = settings.lovestory_bg || '';
        
        if (cardBgPreview && settings.lovestory_card_bg) cardBgPreview.src = settings.lovestory_card_bg;
        if (cardBgInput) cardBgInput.value = settings.lovestory_card_bg || '';
        
        renderLoveStoryChat();
    } catch (err) {
        console.error('Failed to load Love Story:', err);
    }
}

async function loadProfileData() {
    try {
        const data = await api('/api/admin/profile');
        if (data.admin) {
            document.getElementById('profileFullName').value = data.admin.full_name || '';
            document.getElementById('profileEmail').value = data.admin.email || '';
            document.getElementById('profilePhone').value = data.admin.phone || '';
            document.getElementById('profileNewPassword').value = '';
            document.getElementById('profileCurrentPassword').value = '';
            
            // Load avatar preview
            const avatarPreview = document.getElementById('profileAvatarPreview');
            if (avatarPreview) {
                avatarPreview.src = data.admin.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.admin.full_name || data.admin.email || 'Admin')}&background=4f46e5&color=fff&bold=true&size=200`;
            }
        }
    } catch (e) {
        showToast(e.message, 'error');
    }
}

window.uploadProfileAvatar = async function(input) {
    if (!input.files || !input.files.length) return;
    const formData = new FormData();
    formData.append('avatar', input.files[0]);
    
    try {
        const res = await fetch('/api/admin/profile/avatar', {
            method: 'POST',
            body: formData,
            credentials: 'include'
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Upload failed');
        
        // Update preview
        const preview = document.getElementById('profileAvatarPreview');
        if (preview) preview.src = data.src;
        
        // Update header avatar
        const headerAvatar = document.getElementById('headerUserAvatar');
        const dropdownAvatar = document.getElementById('dropdownUserAvatar');
        if (headerAvatar) headerAvatar.src = data.src;
        if (dropdownAvatar) dropdownAvatar.src = data.src;
        
        showToast(currentLang === 'id' ? 'Foto profil berhasil diupdate!' : 'Profile photo updated!', 'success');
    } catch (e) {
        showToast(currentLang === 'id' ? 'Gagal mengupload foto: ' + e.message : 'Upload failed: ' + e.message, 'error');
    }
}

window.handleProfileUpdate = async function() {
    const full_name = document.getElementById('profileFullName').value.trim();
    const email = document.getElementById('profileEmail').value.trim();
    const phone = document.getElementById('profilePhone').value.trim();
    const password = document.getElementById('profileNewPassword').value.trim();
    const current_password = document.getElementById('profileCurrentPassword').value.trim();

    if (!current_password) {
        showToast('Kata sandi saat ini diperlukan untuk verifikasi', 'error');
        return;
    }

    try {
        await api('/api/admin/profile', {
            method: 'PUT',
            body: JSON.stringify({ full_name, email, phone, password, current_password })
        });
        
        showToast('Profil berhasil diperbarui!', 'success');
        document.getElementById('profileCurrentPassword').value = '';
        document.getElementById('profileNewPassword').value = '';
        
        // Update header UI
        const headerName = document.getElementById('headerUserName');
        const dropdownName = document.getElementById('dropdownUserName');
        if (headerName) headerName.innerText = full_name || 'Administrator';
        if (dropdownName) dropdownName.innerText = full_name || 'Administrator';
        
        // Update header avatar fallback name
        const headerAvatar = document.getElementById('headerUserAvatar');
        const dropdownAvatar = document.getElementById('dropdownUserAvatar');
        if (headerAvatar && headerAvatar.src.includes('ui-avatars.com')) {
            headerAvatar.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(full_name || 'Admin')}&background=4f46e5&color=fff&bold=true`;
        }
        if (dropdownAvatar && dropdownAvatar.src.includes('ui-avatars.com')) {
            dropdownAvatar.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(full_name || 'Admin')}&background=4f46e5&color=fff&bold=true`;
        }
        
    } catch (e) {
        showToast(e.message, 'error');
    }
}

// checkLogin is now called inside DOMContentLoaded listener above

// --- Mobile Search Logic ---
window.toggleMobileSearch = function() {
    const panel = document.getElementById('mobileSearchPanel');
    if (!panel) return;
    if (panel.classList.contains('hidden')) {
        closeAllHeaderMenus(); // Close others before opening
        panel.classList.remove('hidden', 'opacity-0', '-translate-y-4');
        panel.classList.add('opacity-100', 'translate-y-0');
        setTimeout(() => {
            document.getElementById('mobileSearchInput')?.focus();
        }, 10);
    } else {
        panel.classList.remove('opacity-100', 'translate-y-0');
        panel.classList.add('opacity-0', '-translate-y-4');
        setTimeout(() => panel.classList.add('hidden'), 300);
    }
};

document.getElementById('mobileSearchToggle')?.addEventListener('click', toggleMobileSearch);

document.getElementById('desktopSearchInput')?.addEventListener('keyup', (e) => handleGlobalSearch(e.target.value));
document.getElementById('mobileSearchInput')?.addEventListener('keyup', (e) => handleGlobalSearch(e.target.value));

function handleGlobalSearch(query) {
    // Legacy mapping (disabled for global search)
    // We now use the globalSearchResults container
    const panel = document.getElementById('globalSearchResults');
    const list = document.getElementById('globalSearchList');
    if (!panel || !list) return;

    if (!query || query.trim() === '') {
        panel.classList.add('hidden');
        return;
    }

    panel.classList.remove('hidden');

    const q = query.toLowerCase().trim();
    if (!state.dashboard) {
        list.innerHTML = `<div class="p-4 text-center text-slate-400 text-xs">Data belum siap...</div>`;
        return;
    }

    const allNamesMap = new Map();
    
    (state.dashboard.guests || []).forEach(g => {
        const name = (g.name || '').trim();
        if (name && (name.toLowerCase().includes(q) || (g.token && g.token.toLowerCase().includes(q)))) {
            allNamesMap.set(name.toLowerCase(), name);
        }
    });

    (state.dashboard.rsvps || []).forEach(r => {
        const name = (r.guest_name || '').trim();
        if (name && name.toLowerCase().includes(q)) {
            allNamesMap.set(name.toLowerCase(), name);
        }
    });

    (state.dashboard.wishes || []).forEach(w => {
        const name = (w.guest_name || '').trim();
        if (name && name.toLowerCase().includes(q)) {
            allNamesMap.set(name.toLowerCase(), name);
        }
    });

    const matches = Array.from(allNamesMap.values());

    if (matches.length === 0) {
        list.innerHTML = `
            <div class="p-8 text-center text-slate-400 flex flex-col items-center">
                <i class="fas fa-search-minus text-3xl mb-3 opacity-20"></i>
                <p class="text-xs font-bold">Tidak ada hasil pencarian</p>
                <p class="text-[10px] mt-1">Coba kata kunci lain atau periksa nama tamu.</p>
            </div>
        `;
    } else {
        list.innerHTML = matches.map(guestName => {
            const guestKey = guestName.toLowerCase();
            const rsvp = (state.dashboard.rsvps || []).find(r => (r.guest_name || '').trim().toLowerCase() === guestKey);

            let rsvpHtml = `<span class="text-slate-400 italic font-medium"><i class="fas fa-clock mr-1 opacity-50"></i>Belum konfirmasi kehadiran</span>`;
            if (rsvp && rsvp.status) {
                if (rsvp.status.toLowerCase() === 'hadir') {
                    rsvpHtml = `<span class="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100"><i class="fas fa-check mr-1 text-[10px]"></i>Hadir (${rsvp.guest_count || 0} pax)</span>`;
                } else {
                    rsvpHtml = `<span class="text-red-500 font-bold bg-red-50 px-2 py-0.5 rounded-md border border-red-100"><i class="fas fa-times mr-1 text-[10px]"></i>Tidak Hadir</span>`;
                }
            }

            const wishList = (state.dashboard.wishes || []).filter(w => (w.guest_name || '').trim().toLowerCase() === guestKey);
            let wishHtml = `<div class="mt-2 text-slate-400 text-[10px] italic bg-slate-50 border border-slate-100 p-2 rounded-lg flex items-center gap-2"><i class="fas fa-comment-slash opacity-50"></i>Tidak ada pesan / ucapan</div>`;
            if (wishList && wishList.length > 0) {
                wishHtml = wishList.map(w => `<div class="mt-2 bg-indigo-50 border border-indigo-100 p-2 rounded-lg"><div class="text-indigo-700 text-[11px] leading-tight"><i class="fas fa-quote-left mr-1 opacity-50 text-[8px]"></i> ${w.message}</div>${w.reply ? `<div class="mt-1.5 pl-2 border-l-2 border-indigo-200 text-indigo-600/80 text-[10px]"><i class="fas fa-reply mr-1 opacity-50 text-[8px]"></i>${w.reply}</div>` : ''}</div>`).join('');
            }

            return `
                <div class="mb-3 border border-slate-100 rounded-xl hover:border-slate-300 transition-colors bg-white overflow-hidden shadow-sm group">
                    <div class="px-4 py-2 border-b border-slate-50 flex justify-between items-center bg-slate-50/50 group-hover:bg-slate-50 transition-colors">
                        <span class="font-bold text-slate-800 text-sm flex items-center gap-2"><i class="fas fa-user-circle text-slate-300"></i> ${guestName}</span>
                        <div class="text-[10px]">
                            ${rsvpHtml}
                        </div>
                    </div>
                    <div class="px-4 py-3">
                        ${wishHtml}
                    </div>
                </div>
            `;
        }).join('');
    }
}

window.closeGlobalSearch = function() {
    const panel = document.getElementById('globalSearchResults');
    if (panel) panel.classList.add('hidden');
    // Clear inputs optionally
    // document.getElementById('desktopSearchInput').value = '';
    // document.getElementById('mobileSearchInput').value = '';
}

// Close when clicking outside
document.addEventListener('click', (e) => {
    // 1. Global Search Results (desktop + mobile dropdown)
    const panel = document.getElementById('globalSearchResults');
    const dInput = document.getElementById('desktopSearchInput');
    const mInput = document.getElementById('mobileSearchInput');
    if (panel && !panel.classList.contains('hidden')) {
        if (!panel.contains(e.target) && dInput !== e.target && mInput !== e.target) {
            closeGlobalSearch();
        }
    }
    
    // 2. Mobile Search Bar Panel
    const mPanel = document.getElementById('mobileSearchPanel');
    const mToggle = document.getElementById('mobileSearchToggle');
    if (mPanel && !mPanel.classList.contains('hidden')) {
        if (!mPanel.contains(e.target) && (!mToggle || !mToggle.contains(e.target))) {
            mPanel.classList.remove('opacity-100', 'translate-y-0');
            mPanel.classList.add('opacity-0', '-translate-y-4');
            setTimeout(() => mPanel.classList.add('hidden'), 300);
            closeGlobalSearch(); // Automatically close results dropdown too
        }
    }
});

// --- Notifications Logic ---
window.toggleNotifications = function() {
    const menu = document.getElementById('notificationsMenu');
    if (!menu) return;
    const isCurrentlyHidden = menu.classList.contains('opacity-0');
    if (isCurrentlyHidden) {
        closeAllHeaderMenus(); // Close others before opening
        menu.classList.remove('opacity-0', 'scale-95', 'pointer-events-none');
        menu.classList.add('opacity-100', 'scale-100', 'pointer-events-auto');
        
        // Mark as Read
        localStorage.setItem('lastReadNotifications', Date.now());
        populateNotifications();
    } else {
        menu.classList.remove('opacity-100', 'scale-100', 'pointer-events-auto');
        menu.classList.add('opacity-0', 'scale-95', 'pointer-events-none');
    }
}

document.getElementById('notificationsBtn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleNotifications();
});

document.addEventListener('click', (e) => {
    const menu = document.getElementById('notificationsMenu');
    const btn = document.getElementById('notificationsBtn');
    if (menu && !menu.classList.contains('opacity-0') && !menu.contains(e.target) && (!btn || !btn.contains(e.target))) {
        toggleNotifications();
    }
});

document.getElementById('refreshNotificationsBtn')?.addEventListener('click', async (e) => {
    e.stopPropagation();
    const btn = e.currentTarget;
    const icon = btn.querySelector('i');
    if (!icon) return;
    
    // Start spinning animation
    icon.className = 'fas fa-sync-alt fa-spin text-sm text-indigo-500';
    
    // Create a minimum duration for the spin (e.g. 800ms)
    const minSpin = new Promise(resolve => setTimeout(resolve, 800));
    
    try {
        // Refresh dashboard data and wait for both min duration and data
        await Promise.all([loadDashboard(), minSpin]);
        
        // Populate the notifications list with fresh data if menu is open
        populateNotifications();
        
        // Show success checkmark
        icon.className = 'fas fa-check text-sm text-emerald-500';
    } catch (err) {
        // Show error indicator
        icon.className = 'fas fa-times text-sm text-red-500';
        console.error('Failed to refresh notifications:', err);
    }
    
    // Revert to stable refresh icon after 1.5s
    setTimeout(() => {
        icon.className = 'fas fa-sync-alt text-sm';
    }, 1500);
});

let activeNotificationTab = 'all';
window.setNotificationTab = function(tab) {
    activeNotificationTab = tab;
    
    // Update UI
    ['all', 'today', 'week', 'earlier'].forEach(t => {
        const btn = document.getElementById(`tab-notif-${t}`);
        if (btn) {
            if (t === tab) {
                btn.className = 'flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-200 dark:border-slate-700';
            } else {
                btn.className = 'flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all text-slate-400 hover:text-slate-600 dark:hover:text-slate-300';
            }
        }
    });
    
    populateNotifications();
};

window.populateNotifications = function() {
    const list = document.getElementById('notificationsList');
    if (!list || !state.dashboard) return;
    
    // Check if notifications are globally enabled
    const isNotificationsEnabled = state.dashboard.settings?.notifications_enabled !== 'false';
    const badge = document.getElementById('notificationBadge');
    
    if (!isNotificationsEnabled) {
        if (badge) badge.classList.add('hidden');
        list.innerHTML = `
            <div class="p-8 text-center text-slate-400 flex flex-col items-center">
                <div class="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                    <i class="fas fa-bell-slash text-xl opacity-40"></i>
                </div>
                <p class="text-xs font-bold text-slate-600">Notifikasi Dimatikan</p>
                <p class="text-[10px] mt-1 leading-relaxed">Sistem tidak akan menampilkan pemberitahuan baru.<br>Aktifkan kembali melalui menu Pengaturan.</p>
            </div>
        `;
        // Clear counts
        ['all', 'today', 'week', 'earlier'].forEach(t => {
            const el = document.getElementById(`tab-notif-${t}`);
            if (el) el.innerText = t.charAt(0).toUpperCase() + t.slice(1);
        });
        return;
    }
    
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - (24 * 60 * 60 * 1000));
    const lastRead = parseInt(localStorage.getItem('lastReadNotifications') || '0');
    
    // Retention Logic
    const retentionDays = parseInt(state.dashboard.settings?.notification_retention || '30');
    let thresholdDate = null;
    if (retentionDays > 0) {
        thresholdDate = new Date();
        thresholdDate.setDate(thresholdDate.getDate() - retentionDays);
    }
    
    const rsvps = (state.dashboard.rsvps || [])
        .map(r => ({...r, _type: 'rsvp', _date: new Date(r.created_at || new Date())}))
        .filter(r => !thresholdDate || r._date >= thresholdDate);
        
    const wishes = (state.dashboard.wishes || [])
        .map(w => ({...w, _type: 'wish', _date: new Date(w.created_at || new Date())}))
        .filter(w => !thresholdDate || w._date >= thresholdDate);
    
    const combined = [...rsvps, ...wishes].sort((a,b) => b._date - a._date);
    
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const sevenDaysAgo = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));

    // Calculate counts for each tab
    const counts = {
        all: combined.length,
        today: combined.filter(item => item._date >= startOfToday).length,
        week: combined.filter(item => item._date < startOfToday && item._date >= sevenDaysAgo).length,
        earlier: combined.filter(item => item._date < sevenDaysAgo).length
    };

    // Update tab labels with counts
    if (document.getElementById('tab-notif-all')) document.getElementById('tab-notif-all').innerText = `All${counts.all > 0 ? ' (' + counts.all + ')' : ''}`;
    if (document.getElementById('tab-notif-today')) document.getElementById('tab-notif-today').innerText = `Today${counts.today > 0 ? ' (' + counts.today + ')' : ''}`;
    if (document.getElementById('tab-notif-week')) document.getElementById('tab-notif-week').innerText = `This Week${counts.week > 0 ? ' (' + counts.week + ')' : ''}`;
    if (document.getElementById('tab-notif-earlier')) document.getElementById('tab-notif-earlier').innerText = `Earlier${counts.earlier > 0 ? ' (' + counts.earlier + ')' : ''}`;

    const filtered = combined.filter(item => {
        if (activeNotificationTab === 'all') return true;
        if (activeNotificationTab === 'today') {
            return item._date >= startOfToday;
        } else if (activeNotificationTab === 'week') {
            return item._date < startOfToday && item._date >= sevenDaysAgo;
        } else {
            return item._date < sevenDaysAgo;
        }
    }).slice(0, 15);
    
    if (filtered.length === 0) {
        const emptyMsgs = {
            all: 'Belum ada notifikasi',
            today: 'Belum ada notifikasi hari ini',
            week: 'Tidak ada notifikasi minggu ini',
            earlier: 'Tidak ada notifikasi sebelumnya'
        };
        list.innerHTML = `
            <div class="p-6 text-center text-slate-400">
                <i class="fas fa-bell-slash text-2xl mb-2 opacity-50"></i>
                <p class="text-xs">${emptyMsgs[activeNotificationTab]}</p>
            </div>
        `;
        // Still show badge if there are unread items in other tabs
        const globalUnread = combined.some(item => item._date > oneDayAgo && item._date.getTime() > lastRead);
        if (!globalUnread) {
            document.getElementById('notificationBadge')?.classList.add('hidden');
        } else {
            document.getElementById('notificationBadge')?.classList.remove('hidden');
        }
        return;
    }
    
    let unreadCount = 0;

    list.innerHTML = filtered.map(item => {
        const timeStr = item._date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        // Only "New" if it's within 24h AND after lastRead
        const isNew = item._date > oneDayAgo && item._date.getTime() > lastRead;
        if (isNew) unreadCount++;

        const newMarker = isNew ? `<span class="w-1.5 h-1.5 rounded-full bg-rose-500 mr-2 shrink-0"></span>` : '';
        
        if (item._type === 'rsvp') {
            const isHadir = (item.status || '').toLowerCase() === 'hadir';
            return `
                <div class="p-2 border-b border-slate-50 dark:border-slate-800 hover:bg-slate-100/70 dark:hover:bg-slate-800/50 transition-colors cursor-pointer" onclick="showSection('rsvp_data'); toggleNotifications();">
                    <div class="flex gap-3 items-start">
                        <div class="w-8 h-8 flex items-center justify-center shrink-0 ${isHadir ? 'text-emerald-500' : 'text-slate-400 dark:text-slate-500'} mt-0.5">
                            <i class="fas ${isHadir ? 'fa-check' : 'fa-times'} text-base"></i>
                        </div>
                        <div class="flex-1 flex justify-between items-start min-w-0 gap-3">
                            <div class="min-w-0 shrink-0">
                                <div class="flex items-center">
                                    ${newMarker}<p class="text-[11px] font-bold text-slate-800 dark:text-slate-200 truncate">${item.guest_name || 'Tamu'}</p>
                                </div>
                                <p class="text-[9px] text-slate-400 dark:text-slate-500 mt-1 font-medium text-left">${timeStr}</p>
                            </div>
                            <div class="text-right flex-1 min-w-0">
                                <p class="text-[11px] font-medium text-slate-900 dark:text-slate-100 leading-tight">
                                    ${isHadir ? 'Hadir' : 'Tidak Hadir'} (${item.guest_count || 0} orang)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else {
            return `
                <div class="p-2 border-b border-slate-50 dark:border-slate-800 hover:bg-slate-100/70 dark:hover:bg-slate-800/50 transition-colors cursor-pointer" onclick="showSection('wishes_data'); toggleNotifications();">
                    <div class="flex gap-3 items-start">
                        <div class="w-8 h-8 flex items-center justify-center shrink-0 text-slate-900 dark:text-slate-300 mt-0.5">
                            <i class="fas fa-comment-dots text-base"></i>
                        </div>
                        <div class="flex-1 flex justify-between items-start min-w-0 gap-3">
                            <div class="min-w-0 shrink-0">
                                <div class="flex items-center">
                                    ${newMarker}<p class="text-[11px] font-bold text-slate-800 dark:text-slate-200 truncate">${item.guest_name || 'Tamu'}</p>
                                </div>
                                <p class="text-[9px] text-slate-400 dark:text-slate-500 mt-1 font-medium text-left">${timeStr}</p>
                            </div>
                            <div class="text-right flex-1 min-w-0">
                                <p class="text-[11px] font-medium text-slate-900 dark:text-slate-100 leading-tight whitespace-normal break-words italic">"${item.message || ''}"</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    }).join('');
    
    // Update badge based on global unread status (across all tabs)
    const globalUnread = combined.some(item => {
        const oneDayAgo = new Date(now.getTime() - (24 * 60 * 60 * 1000));
        const lastRead = parseInt(localStorage.getItem('lastReadNotifications') || '0');
        return item._date > oneDayAgo && item._date.getTime() > lastRead;
    });

    if (globalUnread) {
        document.getElementById('notificationBadge')?.classList.remove('hidden');
    } else {
        document.getElementById('notificationBadge')?.classList.add('hidden');
    }
}

window.openMusicModal = function() {
    window.showModal('musicUploadModal');
    resetMusicInput();
};

window.closeMusicModal = function() {
    window.hideModal('musicUploadModal');
};

window.resetMusicInput = function() {
    const fileInput = document.getElementById('musicFileInput');
    const placeholder = document.getElementById('musicUploadPlaceholder');
    const selected = document.getElementById('musicFileSelected');
    const progress = document.getElementById('musicUploadProgress');
    const startBtn = document.getElementById('startMusicUpload');

    if (fileInput) fileInput.value = '';
    if (placeholder) placeholder.classList.remove('hidden');
    if (selected) selected.classList.add('hidden');
    if (progress) {
        progress.classList.add('hidden');
        const statusText = progress.querySelector('span');
        if (statusText) statusText.innerHTML = '<i class="fas fa-spinner fa-spin text-indigo-600"></i> Sedang Mengunggah...';
        const bar = document.getElementById('musicProgressBar');
        if (bar) bar.style.width = '0%';
        const pct = document.getElementById('musicProgressPercent');
        if (pct) pct.innerText = '0%';
    }
    if (startBtn) {
        startBtn.disabled = true;
        startBtn.classList.add('opacity-50');
    }
    
    // Setup listener if not already done
    if (fileInput && !fileInput.dataset.listenerSet) {
        fileInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const file = this.files[0];
                document.getElementById('musicSelectedName').innerText = file.name;
                document.getElementById('musicUploadPlaceholder').classList.add('hidden');
                document.getElementById('musicFileSelected').classList.remove('hidden');
                const btn = document.getElementById('startMusicUpload');
                btn.disabled = false;
                btn.classList.remove('opacity-50');
            }
        });
        fileInput.dataset.listenerSet = 'true';
    }
};

window.handleMusicUpload = async function() {
    const fileInput = document.getElementById('musicFileInput');
    if (!fileInput || !fileInput.files || !fileInput.files[0]) return;

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('audio', file);

    const progressArea = document.getElementById('musicUploadProgress');
    const progressBar = document.getElementById('musicProgressBar');
    const progressPercent = document.getElementById('musicProgressPercent');
    const startBtn = document.getElementById('startMusicUpload');

    progressArea.classList.remove('hidden');
    startBtn.disabled = true;
    startBtn.classList.add('opacity-50');

    try {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/admin/music/upload', true);

        xhr.upload.onprogress = function(e) {
            if (e.lengthComputable) {
                const percent = Math.round((e.loaded / e.total) * 100);
                progressBar.style.width = percent + '%';
                progressPercent.innerText = percent + '%';
                
                if (percent === 100) {
                    const statusText = document.querySelector('#musicUploadProgress span');
                    if (statusText) statusText.innerHTML = '<i class="fas fa-sync fa-spin text-indigo-600"></i> Memproses & Menyimpan...';
                }
            }
        };

        xhr.onload = function() {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                if (data.success) {
                    showToast('Musik berhasil diperbarui!', 'success');
                    if (!state.dashboard.settings) state.dashboard.settings = {};
                    state.dashboard.settings.bg_music = data.src;
                    renderSettings();
                    setTimeout(() => {
                        closeMusicModal();
                    }, 500);
                } else {
                    showToast(data.error || 'Gagal mengunggah musik.', 'error');
                    startBtn.disabled = false;
                    startBtn.classList.remove('opacity-50');
                    resetUploadStatus();
                }
            } else {
                let errorMsg = 'Gagal mengunggah musik.';
                try {
                    const data = JSON.parse(xhr.responseText);
                    errorMsg = data.error || errorMsg;
                } catch(e) {}
                showToast(errorMsg, 'error');
                startBtn.disabled = false;
                startBtn.classList.remove('opacity-50');
                resetUploadStatus();
            }
        };

        function resetUploadStatus() {
            const statusText = document.querySelector('#musicUploadProgress span');
            if (statusText) statusText.innerHTML = '<i class="fas fa-spinner fa-spin text-indigo-600"></i> Sedang Mengunggah...';
        }

        xhr.onerror = function() {
            showToast('Terjadi kesalahan jaringan.', 'error');
            startBtn.disabled = false;
            startBtn.classList.remove('opacity-50');
        };

        xhr.send(formData);

    } catch (error) {
        console.error(error);
        showToast('Terjadi kesalahan saat mengunggah.', 'error');
        startBtn.disabled = false;
        startBtn.classList.remove('opacity-50');
    }
};

window.removeBgMusic = async function() {
    window.deleteWithConfirm(async () => {
        try {
            const payload = { bg_music: '' };
            await api('/api/admin/settings', { method: 'PUT', body: JSON.stringify(payload) });
            if (state.dashboard.settings) state.dashboard.settings.bg_music = '';
            renderSettings();
            showToast('Musik latar dihapus.', 'success');
        } catch (error) {
            console.error(error);
            showToast('Gagal menghapus musik.', 'error');
        }
    }, {
        message: 'Apakah Anda yakin ingin menghapus musik latar?'
    });
};

// Custom Dropdown for Notification Retention & Wishes Limit
document.addEventListener('click', (e) => {
    // 1. Handling Retention Dropdown
    const container = document.getElementById('retentionDropdownContainer');
    const list = document.getElementById('retentionOptionsList');
    const chevron = document.getElementById('retentionChevron');
    
    if (container) {
        const btn = e.target.closest('#retentionDropdownBtn');
        const opt = e.target.closest('.retention-option');
        
        if (btn) {
            e.stopPropagation();
            const isOpen = !list.classList.contains('opacity-0');
            
            if (isOpen) {
                list.classList.add('opacity-0', 'invisible', 'translate-y-2');
                chevron.classList.remove('rotate-180');
                btn.classList.remove('border-indigo-400', 'ring-2', 'ring-indigo-100');
            } else {
                list.classList.remove('opacity-0', 'invisible', 'translate-y-2');
                chevron.classList.add('rotate-180');
                btn.classList.add('border-indigo-400', 'ring-2', 'ring-indigo-100');
            }
        } else if (opt) {
            const val = opt.getAttribute('data-value');
            const selectEl = document.getElementById('settingNotificationRetention');
            const labelEl = document.getElementById('retentionSelectedLabel');
            
            selectEl.value = val;
            labelEl.innerText = opt.querySelector('span').innerText;
            
            document.querySelectorAll('.retention-option').forEach(el => el.classList.remove('active'));
            opt.classList.add('active');
            
            saveSettings();
        }
        
        // Auto Close
        if (!e.target.closest('#retentionDropdownContainer') && list && !list.classList.contains('opacity-0')) {
            list.classList.add('opacity-0', 'invisible', 'translate-y-2');
            if (chevron) chevron.classList.remove('rotate-180');
            const dBtn = document.getElementById('retentionDropdownBtn');
            if (dBtn) dBtn.classList.remove('border-indigo-400', 'ring-2', 'ring-indigo-100');
        }
    }

    // 2. Handling Wishes Limit Dropdown
    const wContainer = document.getElementById('wishesLimitDropdownContainer');
    const wList = document.getElementById('wishesLimitOptionsList');
    const wChevron = document.getElementById('wishesLimitChevron');
    
    if (wContainer) {
        const wBtn = e.target.closest('#wishesLimitDropdownBtn');
        const wOpt = e.target.closest('.wisheslimit-option');
        
        if (wBtn) {
            e.stopPropagation();
            const isWOpen = !wList.classList.contains('opacity-0');
            
            if (isWOpen) {
                wList.classList.add('opacity-0', 'invisible', 'translate-y-2');
                wChevron.classList.remove('rotate-180');
                wBtn.classList.remove('border-indigo-400', 'ring-2', 'ring-indigo-100');
            } else {
                wList.classList.remove('opacity-0', 'invisible', 'translate-y-2');
                wChevron.classList.add('rotate-180');
                wBtn.classList.add('border-indigo-400', 'ring-2', 'ring-indigo-100');
            }
        } else if (wOpt) {
            const wVal = wOpt.getAttribute('data-value');
            const wSelectEl = document.getElementById('settingWishesLimit');
            const wLabelEl = document.getElementById('wishesLimitSelectedLabel');
            
            wSelectEl.value = wVal;
            wLabelEl.innerText = wOpt.querySelector('span').innerText;
            
            document.querySelectorAll('.wisheslimit-option').forEach(el => el.classList.remove('active'));
            wOpt.classList.add('active');
            
            saveSettings();
        }
        
        // Auto Close
        if (!e.target.closest('#wishesLimitDropdownContainer') && wList && !wList.classList.contains('opacity-0')) {
            wList.classList.add('opacity-0', 'invisible', 'translate-y-2');
            if (wChevron) wChevron.classList.remove('rotate-180');
            const dWBtn = document.getElementById('wishesLimitDropdownBtn');
            if (dWBtn) dWBtn.classList.remove('border-indigo-400', 'ring-2', 'ring-indigo-100');
        }
    }
});


// WhatsApp Template Management
window.showWaTemplateModal = function() {
    const template = state.dashboard.settings?.wa_template || '';
    document.getElementById('waTemplateInput').value = template;
    showModal('waTemplateModal');
};

window.saveWaTemplate = async function() {
    const template = document.getElementById('waTemplateInput').value;
    try {
        await api('/api/admin/settings', {
            method: 'PUT',
            body: JSON.stringify({ wa_template: template })
        });
        if (!state.dashboard.settings) state.dashboard.settings = {};
        state.dashboard.settings.wa_template = template;
        showToast('Template WA berhasil disimpan!', 'success');
        hideModal('waTemplateModal');
    } catch (err) {
        showToast(err.message, 'error');
    }
};

window.copyGuestMessage = function(name, link) {
    const template = state.dashboard.settings?.wa_template || 'Halo @nama, berikut link undangan Anda: @link';
    const message = template
        .replace(/@nama/g, name)
        .replace(/@link/g, link);
    
    navigator.clipboard.writeText(message).then(() => {
        showToast(`Pesan untuk ${name} berhasil disalin!`, 'success');
    }).catch(err => {
        console.error(err);
        showToast('Gagal menyalin pesan.', 'error');
    });
};

window.formatWaText = function(char) {
    const textarea = document.getElementById('waTemplateInput');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);
    const len = char.length;
    
    if (start === end) {
        // Just insert pair if nothing selected
        const newText = text.substring(0, start) + char + char + text.substring(end);
        textarea.value = newText;
        textarea.setSelectionRange(start + len, start + len);
    } else {
        const newText = text.substring(0, start) + char + selectedText + char + text.substring(end);
        textarea.value = newText;
        textarea.setSelectionRange(start, end + (len * 2));
    }
    textarea.focus();
};

window.insertWaTag = function(tag) {
    const textarea = document.getElementById('waTemplateInput');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    
    const newText = text.substring(0, start) + tag + text.substring(end);
    textarea.value = newText;
    textarea.focus();
    textarea.setSelectionRange(start + tag.length, start + tag.length);
};

// Dark Mode Feature
window.toggleDarkMode = function() {
    const isDark = document.documentElement.classList.contains('dark');
    if (isDark) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('admin-theme', 'light');
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('admin-theme', 'dark');
    }
};

window.togglePasswordVisibility = function(inputId, iconId) {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);
    if (!input || !icon) return;
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
};

window.setWishesBgPreset = function(value) {
    const input = document.getElementById('settingWishesBgColor');
    if (input) {
        input.value = value;
        saveSettings();
    }
};

window.setRsvpBgPreset = function(value) {
    const input = document.getElementById('settingRsvpBgColor');
    if (input) {
        input.value = value;
        saveSettings();
    }
};

window.setGiftBgPreset = function(value) {
    const input = document.getElementById('settingGiftBgColor');
    if (input) {
        input.value = value;
        saveSettings();
    }
};

window.setWishesBgMode = function(mode) {
    const modeInput = document.getElementById('settingWishesBgMode');
    if (modeInput) modeInput.value = mode;
    
    const btnColor = document.getElementById('btnWishesModeColor');
    const btnImage = document.getElementById('btnWishesModeImage');
    
    if (mode === 'color') {
        if (btnColor) {
            btnColor.classList.add('bg-white', 'dark:bg-indigo-600', 'text-indigo-600', 'dark:text-white', 'shadow-sm');
            btnColor.classList.remove('text-slate-400', 'dark:text-slate-500');
        }
        if (btnImage) {
            btnImage.classList.remove('bg-white', 'dark:bg-indigo-600', 'text-indigo-600', 'dark:text-white', 'shadow-sm');
            btnImage.classList.add('text-slate-400', 'dark:text-slate-500');
        }
    } else {
        if (btnImage) {
            btnImage.classList.add('bg-white', 'dark:bg-indigo-600', 'text-indigo-600', 'dark:text-white', 'shadow-sm');
            btnImage.classList.remove('text-slate-400', 'dark:text-slate-500');
        }
        if (btnColor) {
            btnColor.classList.remove('bg-white', 'dark:bg-indigo-600', 'text-indigo-600', 'dark:text-white', 'shadow-sm');
            btnColor.classList.add('text-slate-400', 'dark:text-slate-500');
        }
    }
    saveSettings(); // Persist mode change
};

window.setOpeningBgPreset = function(value) {
    const input = document.getElementById('settingOpeningBgColor');
    if (input) {
        input.value = value;
        saveSettings();
    }
};

window.setGreetingBgPreset = function(value) {
    const input = document.getElementById('settingGreetingBgColor');
    if (input) {
        input.value = value;
        saveSettings();
    }
};

window.setCoupleBgPreset = function(value) {
    const input = document.getElementById('settingCoupleBgColor');
    if (input) {
        input.value = value;
        saveSettings();
    }
};

window.setEventBgPreset = function(value) {
    const input = document.getElementById('settingEventBgColor');
    if (input) {
        input.value = value;
        saveSettings();
    }
};

window.setLovestoryBgPreset = function(value) {
    const input = document.getElementById('settingLovestoryBgColor');
    if (input) {
        input.value = value;
        saveSettings();
    }
};

window.setLovestoryCardBgPreset = function(value) {
    const input = document.getElementById('settingLovestoryCardBgColor');
    if (input) {
        input.value = value;
        saveSettings();
    }
};

// --- Opening Page Logic ---
window.setOpeningBgMode = function(mode) {
    const modeInput = document.getElementById('settingOpeningBgMode');
    const indicator = document.getElementById('openingModeIndicator');
    const textWarna = document.querySelector('#btnModeColor .mode-text');
    const textGambar = document.querySelector('#btnModeImage .mode-text');
    
    if (!modeInput || !indicator || !textWarna || !textGambar) return;

    modeInput.value = mode;
    
    if (mode === 'image') {
        indicator.style.transform = 'translateX(100%)';
        textWarna.className = 'mode-text transition-colors duration-300 text-slate-400 dark:text-slate-100';
        textGambar.className = 'mode-text transition-colors duration-300 text-white';
    } else {
        indicator.style.transform = 'translateX(0)';
        textWarna.className = 'mode-text transition-colors duration-300 text-white';
        textGambar.className = 'mode-text transition-colors duration-300 text-slate-400 dark:text-slate-100';
    }
    saveSettings();
};

window.syncOpeningColor = function(val, target) {
    const input = document.getElementById('settingOpeningBgColor');
    const picker = document.getElementById('openingColorPicker');
    const box = document.getElementById('openingColorBox');
    
    if (target === 'input') {
        input.value = val.toUpperCase();
    } else {
        picker.value = val;
    }
    
    if (box) {
        box.style.backgroundColor = val;
    }
};

window.saveOpeningSettings = async function() {
    try {
        await saveSettings(true);
        showToast('Halaman Pembuka berhasil disimpan', 'success');
    } catch (err) {
        console.error('Error saving opening settings:', err);
        showToast(`Gagal menyimpan Halaman Pembuka: ${err.message}`, 'error');
    }
};

// Initialize UI states for Opening Page
function initOpeningUI() {
    const modeInput = document.getElementById('settingOpeningBgMode');
    if (modeInput) {
        // Delay slightly to ensure DOM is ready for transform
        setTimeout(() => {
            window.setOpeningBgMode(modeInput.value || 'color');
        }, 100);
    }
}

window.renderOpeningSlider = function() {
    const listContainer = document.getElementById('openingBgList');
    const hiddenInput = document.getElementById('settingOpeningBgImg');
    if (!listContainer || !hiddenInput) return;

    const urls = hiddenInput.value ? hiddenInput.value.split(',').filter(u => u.trim() !== '') : [];
    listContainer.innerHTML = '';

    if (urls.length === 0) {
        listContainer.innerHTML = `
            <div class="flex flex-col items-center justify-center w-full py-8 text-slate-300 border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/50">
                <i class="fas fa-images text-3xl mb-2"></i>
                <span class="text-[10px] font-semibold uppercase tracking-wider">Belum ada foto slider</span>
            </div>
        `;
        return;
    }

    urls.forEach((url, index) => {
        const item = document.createElement('div');
        item.className = 'relative shrink-0 w-32 sm:w-40 aspect-[4/5] rounded-2xl overflow-hidden border border-slate-200 group/item snap-start shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing';
        item.setAttribute('data-url', url);
        item.innerHTML = `
            <img src="${url}" class="w-full h-full object-cover" onclick="window.previewOpeningImg('${url}')">
            <div class="absolute inset-0 bg-black/10 opacity-0 group-hover/item:opacity-100 transition-opacity pointer-events-none"></div>
            <div class="absolute top-2 left-2 w-7 h-7 bg-white/90 backdrop-blur-sm text-slate-400 rounded-full flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-all shadow-md z-10">
                <i class="fas fa-grip-vertical text-[10px]"></i>
            </div>
            <button onclick="window.removeOpeningSliderImg(${index})" class="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm text-rose-500 rounded-full flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-all shadow-lg hover:bg-rose-500 hover:text-white z-10">
                <i class="fas fa-trash-alt text-xs"></i>
            </button>
        `;
        listContainer.appendChild(item);
    });

    // Initialize Sortable for Drag and Drop
    if (urls.length > 1 && typeof Sortable !== 'undefined') {
        if (listContainer._sortable) listContainer._sortable.destroy();
        listContainer._sortable = Sortable.create(listContainer, {
            animation: 250,
            ghostClass: 'opacity-20',
            dragClass: 'shadow-2xl',
            onEnd: function() {
                const items = listContainer.querySelectorAll('[data-url]');
                const newUrls = Array.from(items).map(el => el.getAttribute('data-url'));
                hiddenInput.value = newUrls.join(',');
                // Re-render to update the delete button indices
                window.renderOpeningSlider();
            }
        });
    }
};

window.previewOpeningImg = function(url) {
    const modal = document.getElementById('imagePreviewModal');
    const img = document.getElementById('previewImgFull');
    if (modal && img) {
        img.src = url;
        showModal('imagePreviewModal');
    }
};

window.uploadOpeningSliderImg = async function(input) {
    if (!input.files || !input.files[0]) return;
    const formData = new FormData();
    formData.append('image', input.files[0]);
    formData.append('setting_key', 'opening_slider');

    try {
        const response = await fetch('/api/admin/settings/upload', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();
        if (result.success) {
            const hiddenInput = document.getElementById('settingOpeningBgImg');
            let currentUrls = hiddenInput.value ? hiddenInput.value.split(',').filter(u => u.trim() !== '') : [];
            currentUrls.push(result.src);
            hiddenInput.value = currentUrls.join(',');
            
            window.renderOpeningSlider();
            showToast('Gambar slider ditambahkan', 'success');
            saveSettings();
        } else {
            showToast(result.error || 'Gagal mengunggah gambar', 'error');
        }
    } catch (err) {
        console.error(err);
        showToast('Gagal mengunggah gambar', 'error');
    }
    input.value = ''; // Reset input
};

window.removeOpeningSliderImg = function(index) {
    const hiddenInput = document.getElementById('settingOpeningBgImg');
    let currentUrls = hiddenInput.value ? hiddenInput.value.split(',').filter(u => u.trim() !== '') : [];
    currentUrls.splice(index, 1);
    hiddenInput.value = currentUrls.join(',');
    window.renderOpeningSlider();
    showToast('Gambar slider dihapus', 'info');
};

// =============================================
// Section Sambutan Background Management
// =============================================

window.setGreetingBgMode = function(mode) {
    const indicator = document.getElementById('greetingModeIndicator');
    const modeInput = document.getElementById('settingGreetingBgMode');
    const textWarna = document.querySelector('#btnGreetingModeColor .greeting-mode-text');
    const textGambar = document.querySelector('#btnGreetingModeImage .greeting-mode-text');
    if (!indicator || !modeInput) return;
    modeInput.value = mode;
    if (mode === 'image') {
        indicator.style.transform = 'translateX(100%)';
        if (textWarna) textWarna.className = 'greeting-mode-text transition-colors duration-300 text-slate-400 dark:text-slate-100';
        if (textGambar) textGambar.className = 'greeting-mode-text transition-colors duration-300 text-white';
    } else {
        indicator.style.transform = 'translateX(0)';
        if (textWarna) textWarna.className = 'greeting-mode-text transition-colors duration-300 text-white';
        if (textGambar) textGambar.className = 'greeting-mode-text transition-colors duration-300 text-slate-400 dark:text-slate-100';
    }
    saveSettings();
};

window.syncGreetingColor = function(val, target) {
    const input = document.getElementById('settingGreetingBgColor');
    const picker = document.getElementById('greetingColorPicker');
    const box = document.getElementById('greetingColorBox');
    if (target === 'input') {
        if (input) input.value = val.toUpperCase();
    } else {
        if (picker) picker.value = val;
    }
    if (box) box.style.backgroundColor = val;
};

window.setCoupleBgMode = function(mode) {
    const indicator = document.getElementById('coupleModeIndicator');
    const modeInput = document.getElementById('settingCoupleBgMode');
    const textWarna = document.querySelector('#btnCoupleModeColor .couple-mode-text');
    const textGambar = document.querySelector('#btnCoupleModeImage .couple-mode-text');
    if (!indicator || !modeInput) return;
    modeInput.value = mode;
    if (mode === 'image') {
        indicator.style.transform = 'translateX(100%)';
        if (textWarna) textWarna.className = 'couple-mode-text transition-colors duration-300 text-slate-400 dark:text-slate-100';
        if (textGambar) textGambar.className = 'couple-mode-text transition-colors duration-300 text-white';
    } else {
        indicator.style.transform = 'translateX(0)';
        if (textWarna) textWarna.className = 'couple-mode-text transition-colors duration-300 text-white';
        if (textGambar) textGambar.className = 'couple-mode-text transition-colors duration-300 text-slate-400 dark:text-slate-100';
    }
    saveSettings();
};

window.syncCoupleColor = function(val, target) {
    const input = document.getElementById('settingCoupleBgColor');
    const picker = document.getElementById('coupleColorPicker');
    const box = document.getElementById('coupleColorBox');
    const previewContainer = document.getElementById('couplePreviewContainer');
    if (target === 'input') {
        if (input) input.value = val.toUpperCase();
    } else {
        if (picker) picker.value = val;
    }
    if (box) box.style.backgroundColor = val;
    if (previewContainer) {
        if (val.includes('gradient')) {
            previewContainer.style.background = val;
        } else {
            previewContainer.style.background = '';
            previewContainer.style.backgroundColor = val;
        }
    }
};

window.removeCoupleBgImg = function() {
    const hiddenInput = document.getElementById('settingCoupleBgImg');
    const preview = document.getElementById('coupleBgPreview');
    if (hiddenInput) hiddenInput.value = '';
    if (preview) {
        preview.src = '';
        preview.style.opacity = '0';
    }
    showToast('Background gambar dihapus. Silakan simpan pengaturan.', 'success');
};

window.renderGreetingSlider = function() {
    const listContainer = document.getElementById('greetingBgList');
    const hiddenInput = document.getElementById('settingGreetingBgImg');
    if (!listContainer || !hiddenInput) return;

    const urls = hiddenInput.value ? hiddenInput.value.split(',').filter(u => u.trim() !== '') : [];
    listContainer.innerHTML = '';

    if (urls.length === 0) {
        listContainer.innerHTML = `
            <div class="flex flex-col items-center justify-center w-full py-8 text-slate-300 border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/50">
                <i class="fas fa-images text-3xl mb-2"></i>
                <span class="text-[10px] font-semibold uppercase tracking-wider">Belum ada foto background</span>
            </div>
        `;
        return;
    }

    urls.forEach((url, index) => {
        const item = document.createElement('div');
        item.className = 'relative shrink-0 w-32 sm:w-40 aspect-[4/5] rounded-2xl overflow-hidden border border-slate-200 group/item snap-start hover:shadow-md transition-all cursor-grab active:cursor-grabbing';
        item.setAttribute('data-url', url);
        item.innerHTML = `
            <img src="${url}" class="w-full h-full object-cover" onclick="window.previewGreetingImg('${url}')">
            <div class="absolute inset-0 bg-black/10 opacity-0 group-hover/item:opacity-100 transition-opacity pointer-events-none"></div>
            <div class="absolute top-2 left-2 w-7 h-7 bg-white/90 backdrop-blur-sm text-slate-400 rounded-full flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-all shadow-md z-10">
                <i class="fas fa-grip-vertical text-[10px]"></i>
            </div>
            <button onclick="window.removeGreetingBgImg(${index})" class="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm text-rose-500 rounded-full flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-all shadow-lg hover:bg-rose-500 hover:text-white z-10">
                <i class="fas fa-trash-alt text-xs"></i>
            </button>
        `;
        listContainer.appendChild(item);
    });

    if (urls.length > 1 && typeof Sortable !== 'undefined') {
        if (listContainer._sortable) listContainer._sortable.destroy();
        listContainer._sortable = Sortable.create(listContainer, {
            animation: 250,
            ghostClass: 'opacity-20',
            onEnd: function() {
                const items = listContainer.querySelectorAll('[data-url]');
                const newUrls = Array.from(items).map(el => el.getAttribute('data-url'));
                hiddenInput.value = newUrls.join(',');
                window.renderGreetingSlider();
            }
        });
    }
};

window.previewGreetingImg = function(url) {
    const modal = document.getElementById('imagePreviewModal');
    const img = document.getElementById('previewImgFull');
    if (modal && img) { img.src = url; showModal('imagePreviewModal'); }
};

window.uploadGreetingBgImg = async function(input) {
    if (!input.files || !input.files[0]) return;
    const formData = new FormData();
    formData.append('image', input.files[0]);
    formData.append('setting_key', 'greeting_slider');
    try {
        const response = await fetch('/api/admin/settings/upload', { method: 'POST', body: formData });
        const result = await response.json();
        if (result.success) {
            const hiddenInput = document.getElementById('settingGreetingBgImg');
            let currentUrls = hiddenInput.value ? hiddenInput.value.split(',').filter(u => u.trim() !== '') : [];
            currentUrls.push(result.src);
            hiddenInput.value = currentUrls.join(',');
            window.renderGreetingSlider();
            showToast('Gambar background ditambahkan', 'success');
            saveSettings();
        } else {
            showToast(result.error || 'Gagal mengunggah gambar', 'error');
        }
    } catch (err) {
        showToast('Gagal mengunggah gambar', 'error');
    }
    input.value = '';
};

window.removeGreetingBgImg = function(index) {
    const hiddenInput = document.getElementById('settingGreetingBgImg');
    let currentUrls = hiddenInput.value ? hiddenInput.value.split(',').filter(u => u.trim() !== '') : [];
    currentUrls.splice(index, 1);
    hiddenInput.value = currentUrls.join(',');
    window.renderGreetingSlider();
    showToast('Gambar background dihapus', 'info');
};

// Initialize Greeting Section UI on load
(function initGreetingUI() {
    const modeInput = document.getElementById('settingGreetingBgMode');
    if (modeInput) {
        setTimeout(() => { window.setGreetingBgMode(modeInput.value || 'color'); }, 150);
    }
})();
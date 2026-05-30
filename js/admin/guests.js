// Guests Admin Module

window.renderGuests = function() {
    const body = document.getElementById('guestsTableBody');
    if (!body) return;

    let guestList = window.state.dashboard.guests || [];

    // Sort filter
    const { key, dir } = window.tablePagination.guests.sort;
    if (key) {
        guestList.sort((a, b) => {
            const valA = (a[key] || '').toString().toLowerCase();
            const valB = (b[key] || '').toString().toLowerCase();
            if (valA < valB) return dir === 'asc' ? -1 : 1;
            if (valA > valB) return dir === 'asc' ? 1 : -1;
            return 0;
        });
    }

    // Search filter
    const query = window.tablePagination.guests.search.toLowerCase();
    if (query) {
        guestList = guestList.filter(g => (g.name || '').toLowerCase().includes(query) || (g.token || '').toLowerCase().includes(query));
    }

    if (guestList.length === 0) {
        body.innerHTML = `<tr><td colspan="5" class="text-center py-24 text-slate-400"><div class="text-6xl font-black opacity-10 mb-4">-</div><p class="text-sm font-bold uppercase tracking-widest opacity-30">Belum ada tamu terdaftar</p></td></tr>`;
        return;
    }

    body.innerHTML = '';

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
        tr.className = "group hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors border-b border-slate-100 dark:border-slate-800/50 last:border-0";
        tr.innerHTML = `
      <td class="font-semibold text-slate-500 dark:text-slate-400 text-xs px-8 py-0">${absoluteIndex}</td>
      <td class="px-8 py-0 whitespace-nowrap">
         <span class="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm tracking-tight">${guest.name}</span>
         ${guest.jabatan ? `<p class="text-[9px] sm:text-[10px] text-slate-500 font-medium uppercase tracking-wider mt-0.5">${guest.jabatan}</p>` : ''}
      </td>
      <td class="px-8 py-0">
         <div class="flex items-center gap-2">
              <div class="bg-indigo-50 dark:bg-slate-800/60 text-indigo-700 dark:text-indigo-300 px-3 py-2 rounded-xl border border-indigo-100 dark:border-slate-700 font-sans text-[10px] sm:text-[11px] font-normal overflow-hidden truncate max-w-[200px] sm:max-w-[400px] cursor-pointer hover:bg-indigo-100 dark:hover:bg-slate-700 hover:border-indigo-300 dark:hover:border-slate-600 transition-all group/link" onclick="window.copyGuestLink('${link}')" title="Click to Copy Link">
                 <i class="fas fa-link mr-2 text-indigo-400 dark:text-indigo-500 group-hover/link:text-indigo-600 dark:group-hover/link:text-indigo-300 transition-colors"></i>${link}
              </div>
         </div>
      </td>
      <td class="text-center px-8 py-0">
         <button class="btn-premium !h-9 !px-4 bg-emerald-100 text-emerald-700 border border-emerald-200 hover:bg-emerald-200 hover:border-emerald-600 
                        dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20 dark:hover:bg-emerald-500/20 dark:hover:border-emerald-500/40
                        mx-auto flex items-center gap-2 transition-all duration-300 rounded-lg !shadow-none whitespace-nowrap" onclick="window.copyGuestMessage('${guest.name}', '${link}')" title="Salin Pesan WA">
                <i class="fab fa-whatsapp text-xs"></i>
                <span class="text-[10px] font-bold uppercase tracking-tight whitespace-nowrap">Salin Pesan</span>
         </button>
      </td>
      <td class="text-right px-8 py-0">
        <div class="flex items-center justify-end gap-2">
            <button class="btn-premium !p-0 w-9 h-9 bg-amber-100 text-amber-700 border border-amber-200 hover:bg-amber-200 hover:border-amber-600 
                           dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20 dark:hover:bg-amber-500/20 dark:hover:border-amber-500/40
                           transition-all duration-300 rounded-lg !shadow-none" onclick="window.editGuest('${guest.id}', \`${(guest.name || '').replace(/`/g, '\\`').replace(/"/g, '&quot;')}\`, \`${(guest.jabatan || '').replace(/`/g, '\\`').replace(/"/g, '&quot;')}\`)" title="Edit Nama">
                <i class="fas fa-edit text-xs pointer-events-none"></i>
            </button>
            <button class="btn-premium !p-0 w-9 h-9 bg-red-100 text-red-700 border border-red-200 hover:bg-red-200 hover:border-red-600 
                           dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20 dark:hover:bg-red-500/20 dark:hover:border-red-500/40
                           transition-all duration-300 rounded-lg !shadow-none" onclick="window.deleteGuest('${guest.id}')" title="Hapus Akses">
                <i class="fas fa-trash text-xs pointer-events-none"></i>
            </button>
        </div>
      </td>
    `;
        body.appendChild(tr);
    });

    // Update sort icons UI
    const upIcon = document.getElementById(`sortIcon_${key}_up`);
    const downIcon = document.getElementById(`sortIcon_${key}_down`);
    
    // Reset all icons first (optional, if you have more columns)
    document.querySelectorAll('[id^="sortIcon_"]').forEach(el => {
        el.classList.remove('text-indigo-600', 'dark:text-indigo-400', 'opacity-100');
        el.classList.add('opacity-20');
    });

    if (upIcon && downIcon) {
        if (dir === 'asc') {
            upIcon.classList.add('text-indigo-600', 'dark:text-indigo-400', 'opacity-100');
            upIcon.classList.remove('opacity-20');
        } else {
            downIcon.classList.add('text-indigo-600', 'dark:text-indigo-400', 'opacity-100');
            downIcon.classList.remove('opacity-20');
        }
    }

    window.renderPaginationControls('guests', guestList.length, limit, window.tablePagination.guests.page);
};

window.sortGuests = function(key) {
    const sort = window.tablePagination.guests.sort;
    if (sort.key === key) {
        sort.dir = sort.dir === 'asc' ? 'desc' : 'asc';
    } else {
        sort.key = key;
        sort.dir = 'asc';
    }
    window.renderGuests();
};

window.copyGuestMessage = async function(name, link) {
    const settings = window.state.dashboard?.settings || {};
    let templateHtml = settings.wa_template || "Halo *{nama}*,\nKami mengundang Anda ke pernikahan kami.\nLink: {link}";
    
    // Use the browser to cleanly parse HTML to text (handles spacing and unescapes &amp;)
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = templateHtml;
    let templateText = tempDiv.innerText || tempDiv.textContent;
    
    // Support multiple formats: @nama, {nama}, @link, {link} (case insensitive)
    let msg = templateText
        .replace(/@nama/gi, name)
        .replace(/{nama}/gi, name)
        .replace(/@link/gi, link)
        .replace(/{link}/gi, link);
    
    msg = msg.trim();

    try {
        await navigator.clipboard.writeText(msg);
        showToast('Pesan WhatsApp disalin!', 'success');
    } catch (err) {
        // Fallback for older browsers or non-secure contexts
        const textArea = document.createElement("textarea");
        textArea.value = msg;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            showToast('Pesan WhatsApp disalin!', 'success');
        } catch (copyErr) {
            console.error('Failed to copy:', copyErr);
        }
        document.body.removeChild(textArea);
    }
};

window.addGuest = async function() {
    const input = document.getElementById('guestNameInput');
    const jabatanInput = document.getElementById('guestJabatanInput');
    if (!input || !input.value.trim()) return;
    const name = input.value.trim();
    const jabatan = jabatanInput ? jabatanInput.value.trim() : '';
    const btn = document.querySelector('button[onclick="window.addGuest()"]');
    if (btn) btn.disabled = true;

    try {
        await api('/api/admin/guests', {
            method: 'POST',
            body: JSON.stringify({ name, jabatan })
        });
        input.value = '';
        if (jabatanInput) jabatanInput.value = '';
        showToast('Tamu berhasil ditambahkan!', 'success');
        await window.loadDashboard();
    } catch (err) {
        showToast(err.message, 'error');
    } finally {
        if (btn) btn.disabled = false;
    }
};

window.editGuest = function(id, name, jabatan) {
    window.showActionModal({
        title: window.currentLang === 'id' ? 'Ubah Nama Tamu' : 'Edit Guest Name',
        icon: 'fa-user-edit',
        color: 'bg-indigo-600',
        fields: [
            { label: window.currentLang === 'id' ? 'Nama Lengkap' : 'Full Name', id: 'editGuestName', type: 'text', value: name, icon: 'fa-user' },
            { label: window.currentLang === 'id' ? 'Jabatan (Opsional)' : 'Job Title (Optional)', id: 'editGuestJabatan', type: 'text', value: jabatan || '', icon: 'fa-briefcase' }
        ],
        onSubmit: async () => {
            const newName = document.getElementById('editGuestName').value.trim();
            const newJabatan = document.getElementById('editGuestJabatan').value.trim();
            if (!newName) throw new Error('Name is required');
            await api(`/api/admin/guests/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ name: newName, jabatan: newJabatan })
            });
            showToast(window.currentLang === 'id' ? 'Nama tamu diperbarui!' : 'Guest name updated!', 'success');
            await window.loadDashboard();
        }
    });
};

window.deleteGuest = function(id) {
    window.deleteWithConfirm(async () => {
        await api(`/api/admin/guests/${id}`, { method: 'DELETE' });
        await window.loadDashboard();
        showToast(window.currentLang === 'id' ? 'Tamu dihapus dari daftar!' : 'Guest revoked from list!', 'delete');
    }, {
        message: t('alert_guest_revoke')
    });
};

window.copyGuestLink = function(link) {
    navigator.clipboard.writeText(link).then(() => {
        showToast(t('alert_link_copied'), 'info');
    });
};

window.showImportExcelModal = function() {
    const modal = document.createElement('div');
    // Force transparent backdrop without blur
    modal.className = 'fixed inset-0 z-[200] flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300';
    modal.onclick = (e) => {
        if (e.target === modal) window.closeImportExcelModal(modal);
    };

    modal.innerHTML = `
    <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl dark:shadow-none border border-slate-100 dark:border-slate-800 w-[90%] max-w-sm overflow-hidden scale-95 transition-transform duration-300 flex flex-col" id="importExcelWrapper">
      <div class="px-6 py-5 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 flex items-center justify-between">
        <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-lg">
                <i class="fas fa-file-excel"></i>
            </div>
            <div>
                <h3 class="font-bold text-slate-900 dark:text-slate-100 text-sm">Import Tamu</h3>
                <p class="text-[11px] sm:text-xs font-semibold text-slate-600 dark:text-slate-500 mt-0.5">Format: Excel</p>
            </div>
        </div>
        <button onclick="window.closeImportExcelModal(this.closest('.fixed'))" class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-red-500 transition-colors flex items-center justify-center font-bold pb-0.5">&times;</button>
      </div>
      <div class="p-6">
        <label class="block w-full cursor-pointer hover:border-emerald-400 dark:hover:border-emerald-500 transition-colors border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-10 text-center bg-slate-50/50 dark:bg-slate-800/20 group mb-4">
          <i class="fas fa-file-import text-3xl text-emerald-500 dark:text-emerald-400 mb-3 group-hover:scale-110 transition-transform"></i>
          <p class="text-xs font-bold text-slate-700 dark:text-slate-300">Pilih berkas Excel (.xlsx / .xls / .csv)</p>
          <p class="text-[10px] text-slate-400 dark:text-slate-500 mt-1">Klik untuk memilih atau seret file ke sini</p>
          <input type="file" accept=".xlsx, .xls, .csv" class="hidden" id="excelFileInput" onchange="window.handleSelectedExcel(this)">
        </label>
        
        <p id="excelFileName" class="text-center font-bold text-xs text-indigo-600 dark:text-indigo-400 mb-4 hidden bg-indigo-50/50 dark:bg-indigo-500/10 py-2 rounded-lg border border-indigo-100 dark:border-indigo-500/20"></p>

        <div class="flex items-center justify-center">
            <button onclick="window.downloadExcelTemplate()" class="text-[9px] sm:text-[10px] font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex flex-col items-center gap-1 px-3 sm:px-5 py-2 sm:py-3 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl border border-indigo-100 dark:border-indigo-500/20 transition-all hover:bg-indigo-100 dark:hover:bg-indigo-500/20 active:scale-95">
                <div class="flex items-center gap-1.5 sm:gap-2">
                    <i class="fas fa-download text-[11px] sm:text-base"></i> 
                    <span>UNDUH TEMPLATE EXCEL</span>
                </div>
                <span class="text-[7px] sm:text-[8px] opacity-60 uppercase tracking-wider font-medium">(TEMPLATE EXEL UNDANGAN TAMU)</span>
            </button>
        </div>
      </div>
      <div class="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex justify-end gap-3">
        <button onclick="window.closeImportExcelModal(this.closest('.fixed'))" class="px-5 py-2.5 rounded-xl font-bold text-[11px] text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">BATAL</button>
        <button id="importSubmitBtn" onclick="window.uploadExcel()" class="bg-emerald-600 dark:bg-emerald-600 text-white font-bold px-6 py-2.5 rounded-xl text-[11px] hover:bg-emerald-700 dark:hover:bg-emerald-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed" disabled>
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
            } catch (e) {
                errorMsg = `Server Error (${res.status}): Mohon RESTART server Node.js Anda.`;
            }
            throw new Error(errorMsg);
        }

        const data = await res.json();
        showToast(currentLang === 'id' ? `Berhasil mengimpor ${data.count} tamu!` : `Successfully imported ${data.count} guests!`, 'success');
        window.closeImportExcelModal(document.getElementById('importExcelWrapper').closest('.fixed'));
        await window.loadDashboard();
    } catch (e) {
        showToast(e.message, 'error');
        btn.disabled = false;
        btn.innerText = 'MULAI IMPORT';
    }
};

window.downloadExcelTemplate = function() {
    const headers = [["NO", "NAMA TAMU"]];
    const data = [
        [1, "Bpk. Andi & Istri"],
        [2, "Keluarga Besar Bpk. Budiman"],
        [3, "Teman Kantor - Rian"],
        [4, "Sahabat Aurora"],
        [5, "Dr. Siti Aminah"]
    ];
    
    const ws_data = headers.concat(data);
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(ws_data);
    
    // Set column widths
    const wscols = [
        { wch: 5 },  // NO
        { wch: 40 }  // NAMA TAMU
    ];
    ws['!cols'] = wscols;
    
    XLSX.utils.book_append_sheet(wb, ws, "Daftar Tamu");
    
    // Write and download
    XLSX.writeFile(wb, "Template_Daftar_Tamu_Undangan.xlsx");
};

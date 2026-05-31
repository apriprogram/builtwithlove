// RSVP Admin Module

window.renderRsvpData = function() {
    const rsvpBody = document.getElementById('rsvpTableBody');
    if (!rsvpBody) return;

    rsvpBody.innerHTML = '';

    let totalGuests = 0;
    let rsvpList = window.state.dashboard.rsvps || [];

    // Filtering
    const query = window.tablePagination.rsvp.search.toLowerCase();
    if (query) {
        rsvpList = rsvpList.filter(g => (g.guest_name && g.guest_name.toLowerCase().includes(query)) || (g.status && g.status.toLowerCase().includes(query)));
    }

    // Calculate total confirmed pax across ALL rsvps
    (window.state.dashboard.rsvps || []).forEach(item => {
        totalGuests += parseInt(item.guest_count, 10) || 0;
    });

    if (rsvpList.length === 0) {
        if (window.state.dashboard.rsvps.length === 0) {
            rsvpBody.innerHTML = `<tr><td colspan="5" class="text-center py-24 text-slate-400"><div class="text-6xl font-black opacity-10 mb-4">-</div><p class="text-sm font-bold uppercase tracking-widest opacity-30">Belum ada data kehadiran</p></td></tr>`;
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
            const guestName = item.guest_name;
            const status = item.status;
            const badgeClass = status.toLowerCase() === 'hadir' ? 'badge-paid' : 'badge-pending';
            const dateStr = item.created_at ? new Date(item.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : '';
            const tr = document.createElement('tr');
            tr.className = 'group';
            tr.innerHTML = `
        <td class="font-semibold text-slate-900 dark:text-white text-[11px] sm:text-sm tracking-tight px-4 sm:px-6 py-0 whitespace-nowrap">
          <div class="flex items-center gap-2 sm:gap-3">
            <div class="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black text-[10px] sm:text-xs shrink-0">${((guestName && guestName !== '-') ? guestName.charAt(0) : '?').toUpperCase()}</div>
            ${guestName}
          </div>
        </td>
        <td class="px-4 sm:px-6 py-0 whitespace-nowrap"><span class="badge-modern !text-[9px] sm:!text-[11px] ${badgeClass}">${status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}</span></td>
        <td class="text-center font-semibold text-slate-900 dark:text-white text-[10px] sm:text-sm px-4 sm:px-6 py-0 whitespace-nowrap">${item.guest_count} ${item.guest_count ? 'org' : ''}</td>
        <td class="text-right text-slate-400 dark:text-slate-100 text-[10px] sm:text-sm font-semibold tracking-tight px-4 sm:px-6 py-0 whitespace-nowrap">${dateStr}</td>
        <td class="text-right px-4 sm:px-6 py-0">
          <button onclick="window.deleteRsvp('${item.id}')" class="btn-premium btn-secondary !p-0 w-7 h-7 sm:w-9 sm:h-9 ml-auto text-slate-400 hover:!bg-red-500 hover:!text-white hover:!border-red-500">
            <i class="fas fa-trash-can text-[10px] pointer-events-none"></i>
          </button>
        </td>
      `;
            rsvpBody.appendChild(tr);
        });
    }

    window.renderPaginationControls('rsvp', rsvpList.length, window.tablePagination.rsvp.limit, window.tablePagination.rsvp.page);

    if (document.getElementById('totalGuestsOverview')) document.getElementById('totalGuestsOverview').innerText = (window.state.dashboard.guests || []).length;
    if (document.getElementById('totalRsvp')) document.getElementById('totalRsvp').innerText = (window.state.dashboard.rsvps || []).length;
    if (document.getElementById('totalRsvpCount')) document.getElementById('totalRsvpCount').innerText = (window.state.dashboard.rsvps || []).length;
    if (document.getElementById('totalGuests')) document.getElementById('totalGuests').innerText = totalGuests;
    if (document.getElementById('totalGuestsIndicator')) document.getElementById('totalGuestsIndicator').innerText = (window.state.dashboard.guests || []).length;
};

window.deleteRsvp = function(id) {
    window.deleteWithConfirm(async () => {
        await api(`/api/admin/rsvps/${id}`, { method: 'DELETE' });
        await window.loadDashboard();
        showToast('Data kehadiran berhasil dihapus.', 'delete');
    }, {
        message: 'Data kehadiran ini akan dihapus permanen.'
    });
};

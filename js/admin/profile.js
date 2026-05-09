// Profile Admin Module

window.loadProfileData = async function() {
    try {
        const data = await api('/api/admin/profile');
        const admin = data.admin;
        if (!admin) return;

        if (document.getElementById('profileFullName')) document.getElementById('profileFullName').value = admin.full_name || '';
        if (document.getElementById('profileEmail')) document.getElementById('profileEmail').value = admin.email || '';
        if (document.getElementById('profilePhone')) document.getElementById('profilePhone').value = admin.phone || '';
        
        // Sync avatars
        ['headerUserAvatar', 'profileAvatarPreview', 'dropdownUserAvatar'].forEach(id => {
            const el = document.getElementById(id);
            if (el && admin.avatar) el.src = admin.avatar;
        });
        
        // Sync names
        ['headerUserName', 'dropdownUserName'].forEach(id => {
            const el = document.getElementById(id);
            if (el && admin.full_name) el.innerText = admin.full_name;
        });

        // Sync email in dropdown
        const dropEmail = document.getElementById('dropdownUserEmail');
        if (dropEmail && admin.email) dropEmail.innerText = admin.email;

    } catch (e) {
        console.error('Failed to load profile:', e);
    }
};

window.saveProfile = async function(btn) {
    const fullName = document.getElementById('profileFullName').value;
    const email = document.getElementById('profileEmail').value;
    const phone = document.getElementById('profilePhone').value;
    const currentPassword = document.getElementById('profileCurrentPassword').value;
    const newPassword = document.getElementById('profileNewPassword').value;

    if (!currentPassword) {
        window.showToast('Password saat ini diperlukan untuk verifikasi', 'error');
        return;
    }

    const originalHTML = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> MENYIMPAN...';

    try {
        await api('/api/admin/profile', {
            method: 'PUT',
            body: JSON.stringify({
                full_name: fullName,
                email: email,
                phone: phone,
                current_password: currentPassword,
                password: newPassword
            })
        });
        window.showToast('Profil berhasil diperbarui!', 'success');
        document.getElementById('profileCurrentPassword').value = '';
        document.getElementById('profileNewPassword').value = '';
        await window.loadProfileData();
    } catch (err) {
        window.showToast(err.message, 'error');
    } finally {
        btn.disabled = false;
        btn.innerHTML = originalHTML;
    }
};

window.uploadProfileAvatar = async function(input) {
    if (!input.files || !input.files[0]) return;
    const formData = new FormData();
    formData.append('avatar', input.files[0]);

    try {
        const res = await fetch('/api/admin/profile/avatar', {
            method: 'POST',
            body: formData,
            credentials: 'include'
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);

        window.showToast('Foto profil diperbarui!', 'success');
        await window.loadProfileData();
    } catch (e) {
        window.showToast(e.message, 'error');
    }
};

window.populateNotifications = async function() {
    const list = document.getElementById('notificationsList');
    const badge = document.getElementById('notificationBadge');
    const refreshBtn = document.getElementById('refreshNotificationsBtn');
    if (!list) return;
    
    // Add animation to refresh button if it exists
    if (refreshBtn) {
        const icon = refreshBtn.querySelector('i');
        if (icon) icon.classList.add('fa-spin');
    }
    
    try {
        const dashboard = window.state.dashboard;
        if (!dashboard) return;
        
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        
        // Combine RSVP and Wishes for notifications
        const rsvps = (dashboard.rsvps || []).map(r => ({
            id: r.id,
            type: 'rsvp',
            title: r.guest_name || 'Tamu Tanpa Nama',
            desc: `Konfirmasi: ${r.status === 'hadir' ? 'Hadir' : 'Tidak Hadir'} (${r.guest_count || 0} orang)`,
            time: r.created_at,
            icon: 'fa-user-check',
            color: 'text-emerald-500'
        }));
        
        const wishes = (dashboard.wishes || []).map(w => ({
            id: w.id,
            type: 'wish',
            title: w.guest_name || 'Tamu Tanpa Nama',
            desc: w.message || 'Mengirim ucapan',
            time: w.created_at,
            icon: 'fa-comment-dots',
            color: 'text-indigo-500'
        }));
        
        const all = [...rsvps, ...wishes].sort((a, b) => new Date(b.time) - new Date(a.time));
        
        // Calculate counts for tabs
        const counts = {
            all: all.length,
            today: all.filter(n => new Date(n.time) >= today).length,
            week: all.filter(n => new Date(n.time) >= oneWeekAgo).length,
            earlier: all.filter(n => new Date(n.time) < oneWeekAgo).length
        };
        
        // Update tab buttons with counts
        const updateTabLabel = (id, label, count) => {
            const btn = document.getElementById(id);
            if (btn) {
                btn.innerHTML = `${label} ${count > 0 ? `<span class="opacity-70">(${count})</span>` : ''}`;
                btn.classList.add('uppercase', 'text-[10px]', 'tracking-tight');
            }
        };
        
        updateTabLabel('tab-notif-all', 'ALL', counts.all);
        updateTabLabel('tab-notif-today', 'TODAY', counts.today);
        updateTabLabel('tab-notif-week', 'THIS WEEK', counts.week);
        updateTabLabel('tab-notif-earlier', 'EARLIER', counts.earlier);

        // Filter based on current tab
        const currentTab = window.state.currentNotificationTab || 'all';
        let filteredItems = all;
        
        if (currentTab === 'today') {
            filteredItems = all.filter(n => new Date(n.time) >= today);
        } else if (currentTab === 'week') {
            filteredItems = all.filter(n => new Date(n.time) >= oneWeekAgo);
        } else if (currentTab === 'earlier') {
            filteredItems = all.filter(n => new Date(n.time) < oneWeekAgo);
        }
        
        const displayItems = filteredItems.slice(0, 15);
        
        if (displayItems.length === 0) {
            list.innerHTML = `<div class="p-8 text-center text-slate-400"><i class="fas fa-bell-slash text-2xl mb-2 opacity-20"></i><p class="text-[10px] uppercase font-bold tracking-widest opacity-40">No Notifications</p></div>`;
            if (currentTab === 'all' && badge) badge.classList.add('hidden');
            return;
        }
        
        if (badge && counts.today > 0) badge.classList.remove('hidden');
        else if (badge && counts.today === 0) badge.classList.add('hidden');
        
        list.innerHTML = displayItems.map(n => {
            const timeStr = new Date(n.time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
            return `
            <div class="px-6 py-4 border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50/80 dark:hover:bg-slate-800/80 transition-all group cursor-default">
                <div class="flex items-center gap-4">
                    <div class="shrink-0">
                        <i class="fas ${n.icon} ${n.color} text-sm"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="flex justify-between items-start gap-4">
                            <div>
                                <h5 class="text-[13px] font-bold text-slate-900 dark:text-slate-100 mb-0.5 leading-none">${n.title}</h5>
                                <p class="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">${timeStr}</p>
                            </div>
                            <div class="text-right shrink-0">
                                <p class="text-[11px] font-bold text-slate-600 dark:text-slate-300 leading-tight">
                                    ${n.type === 'wish' ? `"${n.desc}"` : n.desc}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;}).join('');
        
    } catch (e) {
        list.innerHTML = '<div class="px-6 py-8 text-center text-slate-400">Gagal memuat notifikasi</div>';
    } finally {
        // Stop animation
        if (refreshBtn) {
            const icon = refreshBtn.querySelector('i');
            if (icon) setTimeout(() => icon.classList.remove('fa-spin'), 600);
        }
    }
};

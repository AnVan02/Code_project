// Profile Page JavaScript - AI Bán Sỉ
document.addEventListener('DOMContentLoaded', function () {

    // ===== SIDEBAR NAVIGATION =====
    const navItems = document.querySelectorAll('.nav-item');
    const profileSections = document.querySelectorAll('.profile-section');

    // Map navigation items to sections
    const sectionMap = {
        0: [0], // Thông tin cá nhân
        1: [1], // Doanh nghiệp  
        2: [2], // Bảo mật
        3: [3], // Thông báo
        4: [4], // Thiết bị
        5: [5]  // Thanh toán
    };

    // Handle sidebar navigation
    navItems.forEach((item, index) => {
        item.addEventListener('click', function () {
            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');

            // Hide all sections
            profileSections.forEach(section => section.style.display = 'none');

            // Show corresponding sections
            const sectionsToShow = sectionMap[index];
            if (sectionsToShow) {
                sectionsToShow.forEach(sectionIndex => {
                    if (profileSections[sectionIndex]) {
                        profileSections[sectionIndex].style.display = 'block';
                    }
                });
            }
        });
    });

    // Initialize - show only personal info section
    profileSections.forEach((section, index) => {
        section.style.display = index === 0 ? 'block' : 'none';
    });

    // ===== AVATAR UPLOAD =====
    const changeAvatarBtn = document.querySelector('.change-avatar-btn');
    const avatarPlaceholder = document.querySelector('.avatar-placeholder');

    changeAvatarBtn.addEventListener('click', function () {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';

        input.onchange = function (e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    avatarPlaceholder.style.backgroundImage = `url(${e.target.result})`;
                    avatarPlaceholder.style.backgroundSize = 'cover';
                    avatarPlaceholder.style.backgroundPosition = 'center';
                    showNotification('Ảnh đại diện đã được cập nhật!', 'success');
                };
                reader.readAsDataURL(file);
            }
        };

        input.click();
    });

    // ===== FORM VALIDATION & SAVE =====
    const saveButtons = document.querySelectorAll('.btn-primary, .btn-secondary');

    saveButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            const section = this.closest('.profile-section');
            const inputs = section.querySelectorAll('input, textarea');
            let isValid = true;

            // Basic validation
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    input.style.borderColor = '#e74c3c';
                    isValid = false;
                } else {
                    input.style.borderColor = '#ddd';
                }
            });

            if (isValid) {
                // Simulate save process
                button.disabled = true;
                button.textContent = 'Đang lưu...';

                setTimeout(() => {
                    button.disabled = false;
                    button.textContent = this.textContent.includes('Lưu') ? 'Lưu thay đổi' :
                        this.textContent.includes('Cập nhật') ? 'Cập nhật mật khẩu' :
                            'Xác nhận thông tin doanh nghiệp';
                    showNotification('Thông tin đã được lưu thành công!', 'success');
                }, 1500);
            } else {
                showNotification('Vui lòng điền đầy đủ thông tin bắt buộc!', 'error');
            }
        });
    });

    // ===== FILE UPLOAD =====
    const fileUploadArea = document.querySelector('.file-upload-area');

    if (fileUploadArea) {
        fileUploadArea.addEventListener('click', function () {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.pdf,.jpg,.jpeg,.png';

            input.onchange = function (e) {
                const file = e.target.files[0];
                if (file) {
                    if (file.size > 10 * 1024 * 1024) { // 10MB
                        showNotification('File quá lớn! Vui lòng chọn file dưới 10MB.', 'error');
                        return;
                    }

                    fileUploadArea.innerHTML = `
                        <div class="upload-icon">✓</div>
                        <p>Đã tải lên: ${file.name}</p>
                        <small>Kích thước: ${(file.size / 1024 / 1024).toFixed(2)} MB</small>
                    `;
                    fileUploadArea.style.borderColor = '#27ae60';
                    showNotification('File đã được tải lên thành công!', 'success');
                }
            };

            input.click();
        });

        // Drag and drop functionality
        fileUploadArea.addEventListener('dragover', function (e) {
            e.preventDefault();
            this.style.borderColor = '#3498db';
            this.style.backgroundColor = '#f8f9fa';
        });

        fileUploadArea.addEventListener('dragleave', function (e) {
            e.preventDefault();
            this.style.borderColor = '#ddd';
            this.style.backgroundColor = 'transparent';
        });

        fileUploadArea.addEventListener('drop', function (e) {
            e.preventDefault();
            this.style.borderColor = '#ddd';
            this.style.backgroundColor = 'transparent';

            const files = e.dataTransfer.files;
            if (files.length > 0) {
                const file = files[0];
                if (file.size > 10 * 1024 * 1024) {
                    showNotification('File quá lớn! Vui lòng chọn file dưới 10MB.', 'error');
                    return;
                }

                this.innerHTML = `
                    <div class="upload-icon">✓</div>
                    <p>Đã tải lên: ${file.name}</p>
                    <small>Kích thước: ${(file.size / 1024 / 1024).toFixed(2)} MB</small>
                `;
                this.style.borderColor = '#27ae60';
                showNotification('File đã được tải lên thành công!', 'success');
            }
        });
    }

    // ===== NOTIFICATION TOGGLES =====
    const toggleSwitches = document.querySelectorAll('.toggle-switch input');

    toggleSwitches.forEach(toggle => {
        toggle.addEventListener('change', function () {
            const notificationItem = this.closest('.notification-item');
            const title = notificationItem.querySelector('h3').textContent;
            const status = this.checked ? 'bật' : 'tắt';

            showNotification(`Đã ${status} "${title}"`, 'info');
        });
    });

    // ===== DEVICE MANAGEMENT =====

    // Load real device information
    loadDeviceInformation();

    const logoutAllBtn = document.querySelector('.logout-all');

    if (logoutAllBtn) {
        logoutAllBtn.addEventListener('click', function () {
            if (confirm('Bạn có chắc muốn đăng xuất khỏi tất cả thiết bị?')) {
                // Simulate logout process
                this.disabled = true;
                this.textContent = 'Đang đăng xuất...';

                setTimeout(() => {
                    showNotification('Đã đăng xuất khỏi tất cả thiết bị!', 'success');
                    this.disabled = false;
                    this.textContent = 'Đăng xuất tất cả';

                    // Update device status
                    const statusElements = document.querySelectorAll('.status.active');
                    statusElements.forEach(status => {
                        status.className = 'status inactive';
                        status.textContent = 'Đã đăng xuất';
                    });
                }, 2000);
            }
        });
    }

    // ===== PAYMENT METHODS =====
    const addPaymentBtn = document.querySelector('.add-payment');
    const editPaymentBtns = document.querySelectorAll('.payment-card .btn-link');

    if (addPaymentBtn) {
        addPaymentBtn.addEventListener('click', function () {
            showPaymentModal();
        });
    }

    editPaymentBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            showPaymentModal(true);
        });
    });

    // ===== PASSWORD STRENGTH INDICATOR =====
    const passwordInputs = document.querySelectorAll('input[type="password"]');

    passwordInputs.forEach(input => {
        if (input.previousElementSibling && input.previousElementSibling.textContent.includes('mới')) {
            input.addEventListener('input', function () {
                const strength = checkPasswordStrength(this.value);
                updatePasswordStrengthIndicator(this, strength);
            });
        }
    });

    // ===== SEARCH FUNCTIONALITY =====
    const searchInput = document.querySelector('.header-search-input');

    if (searchInput) {
        searchInput.addEventListener('input', function () {
            const searchTerm = this.value.toLowerCase();

            // Search through navigation items
            navItems.forEach((item, index) => {
                const text = item.querySelector('.nav-text').textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = searchTerm ? 'none' : 'flex';
                }
            });
        });
    }

    // ===== MOBILE MENU =====
    const mobileToggle = document.querySelector('.header-toggle');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', function () {
            document.body.classList.toggle('show-menu');
        });
    }
});

// ===== UTILITY FUNCTIONS =====

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${getNotificationIcon(type)}</span>
            <span class="notification-message">${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">×</button>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 300px;
        animation: slideIn 0.3s ease-out;
    `;

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        .notification-content { display: flex; align-items: center; gap: 10px; }
        .notification-close { 
            background: none; 
            border: none; 
            color: white; 
            font-size: 20px; 
            cursor: pointer; 
            padding: 0 0 0 15px;
        }
    `;
    document.head.appendChild(style);

    // Add to page
    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        'success': '✓',
        'error': '✗',
        'warning': '⚠',
        'info': 'ℹ'
    };
    return icons[type] || icons.info;
}

function getNotificationColor(type) {
    const colors = {
        'success': '#27ae60',
        'error': '#e74c3c',
        'warning': '#f39c12',
        'info': '#3498db'
    };
    return colors[type] || colors.info;
}

function checkPasswordStrength(password) {
    let score = 0;

    // Length check
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;

    // Character variety checks
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return Math.min(score, 4);
}

function updatePasswordStrengthIndicator(input, strength) {
    // Remove existing indicator
    let indicator = input.parentNode.querySelector('.password-strength');
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.className = 'password-strength';
        input.parentNode.appendChild(indicator);
    }

    const levels = ['Rất yếu', 'Yếu', 'Trung bình', 'Mạnh', 'Rất mạnh'];
    const colors = ['#e74c3c', '#e67e22', '#f39c12', '#27ae60', '#2ecc71'];

    indicator.textContent = levels[strength] || 'Rất yếu';
    indicator.style.cssText = `
        color: ${colors[strength] || colors[0]};
        font-size: 12px;
        margin-top: 5px;
        font-weight: 500;
    `;
}

function showPaymentModal(isEdit = false) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'payment-modal-overlay';
    modal.innerHTML = `
        <div class="payment-modal">
            <div class="modal-header">
                <h3>${isEdit ? 'Chỉnh sửa phương thức thanh toán' : 'Thêm phương thức thanh toán'}</h3>
                <button class="modal-close" onclick="this.closest('.payment-modal-overlay').remove()">×</button>
            </div>
            <div class="modal-body">
                <form class="payment-form">
                    <div class="form-group">
                        <label>Số thẻ</label>
                        <input type="text" placeholder="1234 5678 9012 3456" maxlength="19">
                    </div>
                    <div class="form-group">
                        <label>Tên chủ thẻ</label>
                        <input type="text" placeholder="Nguyễn Văn A">
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Ngày hết hạn</label>
                            <input type="text" placeholder="MM/YY" maxlength="5">
                        </div>
                        <div class="form-group">
                            <label>CVV</label>
                            <input type="text" placeholder="123" maxlength="3">
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn-secondary" onclick="this.closest('.payment-modal-overlay').remove()">Hủy</button>
                <button class="btn-primary" onclick="savePaymentMethod()">${isEdit ? 'Cập nhật' : 'Thêm'}</button>
            </div>
        </div>
    `;

    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1001;
    `;

    document.body.appendChild(modal);

    // Format card number input
    const cardInput = modal.querySelector('input[placeholder="1234 5678 9012 3456"]');
    cardInput.addEventListener('input', function () {
        this.value = this.value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
    });

    // Format expiry date input
    const expiryInput = modal.querySelector('input[placeholder="MM/YY"]');
    expiryInput.addEventListener('input', function () {
        this.value = this.value.replace(/\D/g, '').replace(/(\d{2})(\d{2})/, '$1/$2');
    });
}

// ===== DEVICE INFORMATION FUNCTIONS =====

function loadDeviceInformation() {
    const deviceTableBody = document.querySelector('.devices-table tbody');
    if (!deviceTableBody) return;

    // Get current device information
    const currentDevice = getCurrentDeviceInfo();

    // Get device list from localStorage (simulating server data)
    let deviceList = getStoredDeviceList();

    // Add current device if not exists
    const currentDeviceExists = deviceList.some(device =>
        device.userAgent === currentDevice.userAgent &&
        device.ip === currentDevice.ip
    );

    if (!currentDeviceExists) {
        deviceList.unshift({
            ...currentDevice,
            lastLogin: new Date(),
            status: 'active'
        });
        saveDeviceList(deviceList);
    } else {
        // Update current device login time
        const deviceIndex = deviceList.findIndex(device =>
            device.userAgent === currentDevice.userAgent &&
            device.ip === currentDevice.ip
        );
        if (deviceIndex !== -1) {
            deviceList[deviceIndex].lastLogin = new Date();
            deviceList[deviceIndex].status = 'active';
        }
        saveDeviceList(deviceList);
    }

    // Render device table
    renderDeviceTable(deviceList);
}

function getCurrentDeviceInfo() {
    const userAgent = navigator.userAgent;
    let deviceInfo = {
        browser: 'Unknown Browser',
        os: 'Unknown OS',
        deviceType: '🖥️',
        userAgent: userAgent
    };

    // Detect browser
    if (userAgent.includes('Chrome') && !userAgent.includes('Edge')) {
        deviceInfo.browser = 'Chrome';
    } else if (userAgent.includes('Firefox')) {
        deviceInfo.browser = 'Firefox';
    } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
        deviceInfo.browser = 'Safari';
    } else if (userAgent.includes('Edge')) {
        deviceInfo.browser = 'Edge';
    } else if (userAgent.includes('Opera')) {
        deviceInfo.browser = 'Opera';
    }

    // Detect OS
    if (userAgent.includes('Windows')) {
        deviceInfo.os = 'Windows';
        deviceInfo.deviceType = '💻';
    } else if (userAgent.includes('Mac')) {
        deviceInfo.os = 'macOS';
        deviceInfo.deviceType = '💻';
    } else if (userAgent.includes('Linux')) {
        deviceInfo.os = 'Linux';
        deviceInfo.deviceType = '💻';
    } else if (userAgent.includes('Android')) {
        deviceInfo.os = 'Android';
        deviceInfo.deviceType = '📱';
    } else if (userAgent.includes('iPhone') || userAgent.includes('iPad')) {
        deviceInfo.os = userAgent.includes('iPad') ? 'iPadOS' : 'iOS';
        deviceInfo.deviceType = userAgent.includes('iPad') ? '📱' : '📱';
    }

    // Get IP address (simulated - in real app you'd get this from server)
    deviceInfo.ip = getSimulatedIP();

    return deviceInfo;
}

function getSimulatedIP() {
    // In a real application, you would get the IP from your server
    // For demo purposes, we'll generate a realistic looking local IP
    const localIPs = [
        '192.168.1.' + Math.floor(Math.random() * 254 + 1),
        '192.168.0.' + Math.floor(Math.random() * 254 + 1),
        '10.0.0.' + Math.floor(Math.random() * 254 + 1)
    ];
    return localIPs[Math.floor(Math.random() * localIPs.length)];
}

function getStoredDeviceList() {
    // In a real app, this would be an API call to your server
    const stored = localStorage.getItem('user_devices');
    if (stored) {
        const devices = JSON.parse(stored);
        // Convert date strings back to Date objects
        devices.forEach(device => {
            device.lastLogin = new Date(device.lastLogin);
        });
        return devices;
    }

    // Return some sample devices for demo
    return [
        {
            browser: 'Safari',
            os: 'iOS',
            deviceType: '📱',
            userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X)',
            ip: '10.0.0.50',
            lastLogin: new Date(Date.now() - 3600000), // 1 hour ago
            status: 'inactive'
        }
    ];
}

function saveDeviceList(deviceList) {
    // In a real app, this would be an API call to your server
    localStorage.setItem('user_devices', JSON.stringify(deviceList));
}

function renderDeviceTable(deviceList) {
    const deviceTableBody = document.querySelector('.devices-table tbody');
    if (!deviceTableBody) return;

    deviceTableBody.innerHTML = '';

    deviceList.forEach((device, index) => {
        const row = document.createElement('tr');

        const lastLoginText = formatLastLogin(device.lastLogin);
        const isCurrentDevice = index === 0; // First device is current device

        row.innerHTML = `
            <td>
                <div class="device-info">
                    <span class="device-icon">${device.deviceType}</span>
                    <span>${device.browser} trên ${device.os}${isCurrentDevice ? ' (Thiết bị này)' : ''}</span>
                </div>
            </td>
            <td>${device.ip}</td>
            <td>${lastLoginText}</td>
            <td>
                <span class="status ${device.status}">
                    ${device.status === 'active' ? 'Đang hoạt động' : 'Không hoạt động'}
                </span>
                ${!isCurrentDevice ? `<button class="btn-link logout-device" data-index="${index}">Đăng xuất</button>` : ''}
            </td>
        `;

        deviceTableBody.appendChild(row);
    });

    // Add event listeners for individual device logout
    const logoutDeviceBtns = document.querySelectorAll('.logout-device');
    logoutDeviceBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const deviceIndex = parseInt(this.dataset.index);
            logoutSpecificDevice(deviceIndex);
        });
    });
}

function formatLastLogin(lastLogin) {
    const now = new Date();
    const diffMs = now - lastLogin;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) {
        return 'Vừa xong';
    } else if (diffMins < 60) {
        return `${diffMins} phút trước`;
    } else if (diffHours < 24) {
        return `${diffHours} giờ trước`;
    } else if (diffDays < 7) {
        return `${diffDays} ngày trước`;
    } else {
        return lastLogin.toLocaleDateString('vi-VN');
    }
}

function logoutSpecificDevice(deviceIndex) {
    const deviceList = getStoredDeviceList();
    if (deviceIndex > 0 && deviceIndex < deviceList.length) { // Can't logout current device (index 0)
        if (confirm('Bạn có chắc muốn đăng xuất thiết bị này?')) {
            deviceList.splice(deviceIndex, 1);
            saveDeviceList(deviceList);
            renderDeviceTable(deviceList);
            showNotification('Đã đăng xuất thiết bị!', 'success');
        }
    }
}

// Function to get real IP address (requires external service)
async function getRealIP() {
    try {
        // Using a free IP service - in production, you should use your own backend
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.log('Could not get real IP, using simulated IP');
        return getSimulatedIP();
    }
}

function savePaymentMethod() {
    // Simulate saving payment method
    const modal = document.querySelector('.payment-modal-overlay');
    const saveBtn = modal.querySelector('.btn-primary');

    saveBtn.disabled = true;
    saveBtn.textContent = 'Đang lưu...';

    setTimeout(() => {
        modal.remove();
        showNotification('Phương thức thanh toán đã được lưu!', 'success');
    }, 1500);
}

// Auto-refresh device list every 5 minutes
setInterval(() => {
    if (document.querySelector('.devices-table')) {
        loadDeviceInformation();
    }
}, 300000); // 5 minutes
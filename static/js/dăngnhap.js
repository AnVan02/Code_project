let currentUserType = 'supplier';
let currentAction = 'login';
let verificationCode = '';

function switchTab(userType) {
    currentUserType = userType;

    // Cập nhật tab active
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');

    // Cập nhật tiêu đề
    const leftPanel = document.querySelector('.left-panel h1');
    if (userType === 'supplier') {
        leftPanel.textContent = 'NỀN TẢNG AI DÀNH RIÊNG CHO NHÀ CUNG CẤP';
    } else {
        leftPanel.textContent = 'NỀN TẢNG AI DÀNH RIÊNG CHO ĐẠI LÝ';
    }
}

function showLoginForm() {
    document.getElementById('loginForm').classList.add('active');
    document.getElementById('registerForm').classList.remove('active');
    document.getElementById('verificationContainer').classList.remove('active');
    currentAction = 'login';
}

function showRegisterForm() {
    document.getElementById('loginForm').classList.remove('active');
    document.getElementById('registerForm').classList.add('active');
    document.getElementById('verificationContainer').classList.remove('active');
    currentAction = 'register';
}

function showVerification() {
    document.getElementById('loginForm').classList.remove('active');
    document.getElementById('registerForm').classList.remove('active');
    document.getElementById('verificationContainer').classList.add('active');
}

function goBack() {
    if (currentAction === 'login') {
        showLoginForm();
    } else {
        showRegisterForm();
    }
}

function generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Kiểm tra thông tin đăng nhập (giả lập)
    if (email && password) {
        verificationCode = generateVerificationCode();
        showVerification();

        // Giả lập gửi email
        setTimeout(() => {
            alert(`Mã xác thực đã được gửi đến ${email}\nMã xác thực: ${verificationCode}`);
        }, 1000);
    } else {
        showMessage('verificationMessage', 'Vui lòng nhập đầy đủ thông tin', 'error');
    }
}

function handleRegister(event) {
    event.preventDefault();

    const companyName = document.getElementById('companyName').value;
    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Kiểm tra thông tin đăng ký
    if (!companyName || !username || !email || !password || !confirmPassword) {
        showMessage('verificationMessage', 'Vui lòng nhập đầy đủ thông tin', 'error');
        return;
    }

    if (password !== confirmPassword) {
        showMessage('verificationMessage', 'Mật khẩu xác nhận không khớp', 'error');
        return;
    }

    if (password.length < 6) {
        showMessage('verificationMessage', 'Mật khẩu phải có ít nhất 6 ký tự', 'error');
        return;
    }

    verificationCode = generateVerificationCode();
    showVerification();

    // Giả lập gửi email
    setTimeout(() => {
        alert(`Mã xác thực đã được gửi đến ${email}\nMã xác thực: ${verificationCode}`);
    }, 1000);
}

function verifyCode() {
    const inputCode = document.getElementById('verificationCode').value;

    if (inputCode === verificationCode) {
        showMessage('verificationMessage', 'Xác thực thành công!', 'success');

        setTimeout(() => {
            if (currentAction === 'login') {
                alert('Đăng nhập thành công! Chuyển hướng đến trang chủ...');
                window.location.href = 'index.html';
            } else {
                alert('Đăng ký thành công! Chuyển hướng đến trang đăng nhập...');
                showLoginForm();
                // Reset form
                document.getElementById('registerForm').reset();
            }
        }, 1500);
    } else {
        showMessage('verificationMessage', 'Mã xác thực không đúng. Vui lòng thử lại.', 'error');
    }
}

function showMessage(elementId, message, type) {
    const messageElement = document.getElementById(elementId);
    messageElement.textContent = message;
    messageElement.className = type === 'error' ? 'error-message' : 'success-message';

    // Ẩn thông báo sau 5 giây
    setTimeout(() => {
        messageElement.textContent = '';
    }, 5000);
}

// Xử lý sự kiện Enter trong ô mã xác thực
document.getElementById('verificationCode').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        verifyCode();
    }
});

// Xử lý quên mật khẩu
document.querySelector('.forgot-password').addEventListener('click', function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    if (email) {
        alert(`Hướng dẫn đặt lại mật khẩu đã được gửi đến ${email}`);
    } else {
        alert('Vui lòng nhập email trước khi yêu cầu đặt lại mật khẩu');
    }
});
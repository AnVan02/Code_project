// Chatbot JavaScript - AI Bán Sỉ
document.addEventListener('DOMContentLoaded', function () {

    // ===== TOGGLE PANELS =====
    initializePanelToggles();

    // ===== CHAT FUNCTIONALITY =====
    initializeChatFeatures();

    // ===== MOBILE RESPONSIVE =====
    handleMobileResponsive();

    // ===== PRODUCT INTERACTIONS =====
    initializeProductInteractions();
});

// ===== PANEL TOGGLE FUNCTIONS =====
function initializePanelToggles() {
    // Toggle Chat History Panel (Left)
    const chatHistoryHeader = document.querySelector('.history-header');
    const chatHistory = document.querySelector('.chat-history');

    if (chatHistoryHeader && chatHistory) {
        // Tạo trạng thái mặc định
        let chatHistoryExpanded = true;

        chatHistoryHeader.addEventListener('click', function () {
            chatHistoryExpanded = !chatHistoryExpanded;
            toggleChatHistory(chatHistoryExpanded);
        });

        // Thêm cursor pointer
        chatHistoryHeader.style.cursor = 'pointer';
    }

    // Toggle Product Suggestions Panel (Right)
    const suggestionsHeader = document.querySelector('.suggestions-header');
    const productSuggestions = document.querySelector('.product-suggestions');

    if (suggestionsHeader && productSuggestions) {
        // Tạo trạng thái mặc định
        let suggestionsExpanded = true;

        suggestionsHeader.addEventListener('click', function () {
            suggestionsExpanded = !suggestionsExpanded;
            toggleProductSuggestions(suggestionsExpanded);
        });

        // Thêm cursor pointer
        suggestionsHeader.style.cursor = 'pointer';
    }

    // Toggle Mobile Suggestions Panel
    const mobileSuggestionsHeader = document.querySelector('.mobile-suggestions-header');
    const mobileSuggestions = document.querySelector('.mobile-suggestions');

    if (mobileSuggestionsHeader && mobileSuggestions) {
        // Tạo trạng thái mặc định cho mobile
        let mobileSuggestionsExpanded = false;

        mobileSuggestionsHeader.addEventListener('click', function () {
            mobileSuggestionsExpanded = !mobileSuggestionsExpanded;
            toggleMobileSuggestions(mobileSuggestionsExpanded);
        });

        // Thêm cursor pointer
        mobileSuggestionsHeader.style.cursor = 'pointer';

        // Đóng mặc định trên mobile
        toggleMobileSuggestions(false);
    }
}

function toggleChatHistory(isExpanded) {
    const chatHistory = document.querySelector('.chat-history');
    const chatHistoryIcon = document.querySelector('.history-header img');
    const chatContainer = document.querySelector('.chat-container');

    if (isExpanded) {
        // Mở rộng panel
        chatHistory.classList.remove('collapsed');
        chatHistory.style.width = '280px';
        chatHistory.style.minWidth = '280px';

        // Xoay icon về trạng thái ban đầu (mũi tên trái)
        if (chatHistoryIcon) {
            chatHistoryIcon.style.transform = 'rotate(0deg)';
        }

        // Hiển thị nội dung
        const chatItems = chatHistory.querySelectorAll('.chat-item');
        chatItems.forEach(item => {
            item.style.display = 'block';
        });

        // Cập nhật layout container
        if (chatContainer) {
            chatContainer.style.gridTemplateColumns = '280px 1fr 300px';
        }

        // Animation
        setTimeout(() => {
            chatItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, index * 50);
            });
        }, 100);

    } else {
        // Thu gọn panel
        chatHistory.classList.add('collapsed');
        chatHistory.style.width = '60px';
        chatHistory.style.minWidth = '60px';

        // Xoay icon (mũi tên phải)
        if (chatHistoryIcon) {
            chatHistoryIcon.style.transform = 'rotate(180deg)';
        }

        // Ẩn nội dung
        const chatItems = chatHistory.querySelectorAll('.chat-item');
        chatItems.forEach(item => {
            item.style.display = 'none';
        });

        // Cập nhật layout container
        if (chatContainer) {
            chatContainer.style.gridTemplateColumns = '60px 1fr 300px';
        }
    }

    // Thêm transition effect
    chatHistory.style.transition = 'width 0.3s ease';
    if (chatHistoryIcon) {
        chatHistoryIcon.style.transition = 'transform 0.3s ease';
    }
}

function toggleProductSuggestions(isExpanded) {
    const productSuggestions = document.querySelector('.product-suggestions');
    const suggestionsIcon = document.querySelector('.suggestions-header img');
    const chatContainer = document.querySelector('.chat-container');

    if (isExpanded) {
        // Mở rộng panel
        productSuggestions.classList.remove('collapsed');
        productSuggestions.style.width = '300px';
        productSuggestions.style.minWidth = '300px';

        // Xoay icon về trạng thái ban đầu (mũi tên phải)
        if (suggestionsIcon) {
            suggestionsIcon.style.transform = 'rotate(0deg)';
        }

        // Hiển thị nội dung
        const historyItems = productSuggestions.querySelectorAll('.history-item');
        historyItems.forEach(item => {
            item.style.display = 'flex';
        });

        // Cập nhật layout container
        const chatHistory = document.querySelector('.chat-history');
        const chatHistoryWidth = chatHistory.classList.contains('collapsed') ? '60px' : '280px';
        if (chatContainer) {
            chatContainer.style.gridTemplateColumns = `${chatHistoryWidth} 1fr 300px`;
        }

        // Animation
        setTimeout(() => {
            historyItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, index * 50);
            });
        }, 100);

    } else {
        // Thu gọn panel
        productSuggestions.classList.add('collapsed');
        productSuggestions.style.width = '60px';
        productSuggestions.style.minWidth = '60px';

        // Xoay icon (mũi tên trái)
        if (suggestionsIcon) {
            suggestionsIcon.style.transform = 'rotate(180deg)';
        }

        // Ẩn nội dung
        const historyItems = productSuggestions.querySelectorAll('.history-item');
        historyItems.forEach(item => {
            item.style.display = 'none';
        });

        // Cập nhật layout container
        const chatHistory = document.querySelector('.chat-history');
        const chatHistoryWidth = chatHistory.classList.contains('collapsed') ? '60px' : '280px';
        if (chatContainer) {
            chatContainer.style.gridTemplateColumns = `${chatHistoryWidth} 1fr 60px`;
        }
    }

    // Thêm transition effect
    productSuggestions.style.transition = 'width 0.3s ease';
    if (suggestionsIcon) {
        suggestionsIcon.style.transition = 'transform 0.3s ease';
    }
}

function toggleMobileSuggestions(isExpanded) {
    const mobileSuggestions = document.querySelector('.mobile-suggestions');
    const mobileSuggestionsContainer = document.querySelector('.mobile-suggestions-container');
    const mobileIcon = document.querySelector('.mobile-suggestions-header img');

    if (isExpanded) {
        // Mở rộng mobile panel
        mobileSuggestions.classList.add('expanded');
        if (mobileSuggestionsContainer) {
            mobileSuggestionsContainer.style.display = 'block';
            mobileSuggestionsContainer.style.maxHeight = '400px';
        }

        // Xoay icon
        if (mobileIcon) {
            mobileIcon.style.transform = 'rotate(90deg)';
        }

        // Animation cho items
        const mobileItems = mobileSuggestionsContainer?.querySelectorAll('.mobile-history-item');
        if (mobileItems) {
            setTimeout(() => {
                mobileItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 30);
                });
            }, 100);
        }

    } else {
        // Thu gọn mobile panel
        mobileSuggestions.classList.remove('expanded');
        if (mobileSuggestionsContainer) {
            mobileSuggestionsContainer.style.maxHeight = '0';
            setTimeout(() => {
                mobileSuggestionsContainer.style.display = 'none';
            }, 300);
        }

        // Xoay icon về vị trí ban đầu
        if (mobileIcon) {
            mobileIcon.style.transform = 'rotate(0deg)';
        }
    }

    // Thêm transitions
    if (mobileSuggestionsContainer) {
        mobileSuggestionsContainer.style.transition = 'max-height 0.3s ease, opacity 0.3s ease';
    }
    if (mobileIcon) {
        mobileIcon.style.transition = 'transform 0.3s ease';
    }
}

// ===== CHAT FUNCTIONALITY =====
function initializeChatFeatures() {
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.querySelector('.send-button');

    // Send message on button click
    if (sendButton) {
        sendButton.addEventListener('click', sendMessage);
    }

    // Send message on Enter key
    if (messageInput) {
        messageInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        // Auto-resize input
        messageInput.addEventListener('input', function () {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 120) + 'px';
        });
    }

    // Chat item selection
    const chatItems = document.querySelectorAll('.chat-item');
    chatItems.forEach(item => {
        item.addEventListener('click', function () {
            // Remove active class from all items
            chatItems.forEach(i => i.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');

            // Load chat for this item (simulate)
            loadChatHistory(this);
        });
    });
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const chatMessages = document.querySelector('.chat-messages');

    if (!messageInput || !chatMessages) return;

    const messageText = messageInput.value.trim();
    if (!messageText) return;

    // Add user message
    addMessage(messageText, 'user');
    messageInput.value = '';
    messageInput.style.height = 'auto';

    // Show typing indicator
    showTypingIndicator();

    // Simulate AI response
    setTimeout(() => {
        hideTypingIndicator();
        const aiResponse = generateAIResponse(messageText);
        addMessage(aiResponse, 'ai');

        // Auto-scroll to bottom
        scrollToBottom();
    }, 1500);

    // Auto-scroll to bottom
    scrollToBottom();
}

function addMessage(text, type) {
    const chatMessages = document.querySelector('.chat-messages');
    if (!chatMessages) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;

    if (type === 'ai') {
        messageDiv.innerHTML = `
            <img src="static/image/bot.png" alt="Bot" width="25" height="25">
            <div class="message-bubble">${text}</div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="message-bubble">${text}</div>
        `;
    }

    // Add with animation
    messageDiv.style.opacity = '0';
    messageDiv.style.transform = 'translateY(20px)';
    chatMessages.appendChild(messageDiv);

    // Animate in
    setTimeout(() => {
        messageDiv.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateY(0)';
    }, 10);
}

function generateAIResponse(userMessage) {
    // Simple AI response simulation
    const responses = {
        'ssd': 'Tôi đã tìm thấy một số lựa chọn SSD tốt cho bạn. Bạn cần dung lượng bao nhiêu?',
        'ram': 'Đây là những lựa chọn RAM phù hợp: DDR4 16GB, DDR5 32GB. Bạn muốn loại nào?',
        'cpu': 'Tôi khuyên bạn nên chọn Intel Core i5 hoặc AMD Ryzen 5. Bạn có ngân sách bao nhiêu?',
        'laptop': 'Có rất nhiều lựa chọn laptop. Bạn cần dùng để làm gì chủ yếu?',
        'giá': 'Tôi sẽ tìm những sản phẩm có giá tốt nhất cho bạn.',
        'default': 'Tôi hiểu yêu cầu của bạn. Hãy để tôi tìm kiếm thông tin phù hợp...'
    };

    const lowerMessage = userMessage.toLowerCase();

    for (const [key, response] of Object.entries(responses)) {
        if (key !== 'default' && lowerMessage.includes(key)) {
            return response;
        }
    }

    return responses.default;
}

function showTypingIndicator() {
    const chatMessages = document.querySelector('.chat-messages');
    if (!chatMessages) return;

    const typingDiv = document.createElement('div');
    typingDiv.className = 'message ai typing-indicator';
    typingDiv.innerHTML = `
        <img src="static/image/bot.png" alt="Bot" width="25" height="25">
        <div class="message-bubble">
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;

    chatMessages.appendChild(typingDiv);
    scrollToBottom();
}

function hideTypingIndicator() {
    const typingIndicator = document.querySelector('.typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function scrollToBottom() {
    const chatMessages = document.querySelector('.chat-messages');
    if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

function loadChatHistory(chatItem) {
    const chatTitle = chatItem.querySelector('.chat-title').textContent;

    // Simulate loading different chat
    showNotification(`Đã tải cuộc trò chuyện: ${chatTitle}`, 'info');

    // You can implement actual chat loading logic here
    // For example, clear current messages and load from storage/API
}

// ===== PRODUCT INTERACTIONS =====
function initializeProductInteractions() {
    // Main product click
    const mainProduct = document.querySelector('.main-product');
    if (mainProduct) {
        mainProduct.addEventListener('click', function () {
            showProductDetails(this);
        });
        mainProduct.style.cursor = 'pointer';
    }

    // History items click
    const historyItems = document.querySelectorAll('.history-item, .mobile-history-item');
    historyItems.forEach(item => {
        item.addEventListener('click', function () {
            showProductDetails(this);
        });
        item.style.cursor = 'pointer';
    });

    // Other options click
    const otherOptions = document.querySelector('.other-options');
    if (otherOptions) {
        otherOptions.addEventListener('click', function () {
            showMoreOptions();
        });
        otherOptions.style.cursor = 'pointer';
    }
}

function showProductDetails(productElement) {
    const productName = productElement.querySelector('.product-name, .history-product-name, .mobile-history-product-name')?.textContent;
    const productPrice = productElement.querySelector('.product-price, .history-product-price, .mobile-history-product-price')?.textContent;

    showNotification(`Đã chọn sản phẩm: ${productName} - ${productPrice}`, 'success');

    // Add to cart simulation
    updateCartBadge();
}

function showMoreOptions() {
    showNotification('Đang tải thêm lựa chọn sản phẩm...', 'info');

    // Simulate loading more products
    setTimeout(() => {
        addMoreProductOptions();
    }, 1000);
}

function addMoreProductOptions() {
    const chatMessages = document.querySelector('.chat-messages');
    if (!chatMessages) return;

    // Add AI message with more options
    const moreOptionsMessage = `
        <div class="message ai">
            <img src="static/image/bot.png" alt="Bot" width="25" height="25">
            <div class="message-bubble">Đây là thêm một số lựa chọn khác:</div>
        </div>
        <div class="additional-products">
            <div class="product-option">
                <img src="https://cdn.tgdd.vn/Products/Images/7699/323015/ssd-samsung-980-pro-500gb-m2-2280-pcie-40-mz-v8p500bw-1.jpg" width="60">
                <div>
                    <div class="option-name">Samsung 980 PRO 512GB</div>
                    <div class="option-price">1.200.000₫</div>
                </div>
            </div>
            <div class="product-option">
                <img src="https://cdn.tgdd.vn/Products/Images/7699/264888/ssd-kingston-nv2-500gb-m2-2280-pcie-40-snv2s-500g-1.jpg" width="60">
                <div>
                    <div class="option-name">Kingston NV2 512GB</div>
                    <div class="option-price">850.000₫</div>
                </div>
            </div>
        </div>
    `;

    chatMessages.insertAdjacentHTML('beforeend', moreOptionsMessage);
    scrollToBottom();
}

function updateCartBadge() {
    const cartBadge = document.getElementById('cartBadge');
    if (cartBadge) {
        let currentCount = parseInt(cartBadge.textContent) || 0;
        cartBadge.textContent = currentCount + 1;

        // Animation
        cartBadge.style.transform = 'scale(1.3)';
        setTimeout(() => {
            cartBadge.style.transform = 'scale(1)';
        }, 200);
    }
}

// ===== MOBILE RESPONSIVE =====
function handleMobileResponsive() {
    // Handle window resize
    window.addEventListener('resize', function () {
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            // On mobile, collapse desktop panels
            const chatHistory = document.querySelector('.chat-history');
            const productSuggestions = document.querySelector('.product-suggestions');

            if (chatHistory && !chatHistory.classList.contains('mobile-hidden')) {
                chatHistory.classList.add('mobile-hidden');
            }

            if (productSuggestions && !productSuggestions.classList.contains('mobile-hidden')) {
                productSuggestions.classList.add('mobile-hidden');
            }
        } else {
            // On desktop, show panels
            const chatHistory = document.querySelector('.chat-history');
            const productSuggestions = document.querySelector('.product-suggestions');

            if (chatHistory) {
                chatHistory.classList.remove('mobile-hidden');
            }

            if (productSuggestions) {
                productSuggestions.classList.remove('mobile-hidden');
            }
        }
    });

    // Initial check
    window.dispatchEvent(new Event('resize'));
}

// ===== UTILITY FUNCTIONS =====
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.chat-notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification
    const notification = document.createElement('div');
    notification.className = `chat-notification ${type}`;
    notification.textContent = message;

    // Styling
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 12px 20px;
        border-radius: 6px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        z-index: 1000;
        font-size: 14px;
        max-width: 300px;
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Auto remove
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 3000);
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

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .typing-dots {
        display: flex;
        gap: 4px;
        padding: 8px 0;
    }
    
    .typing-dots span {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #999;
        animation: typingAnimation 1.4s infinite ease-in-out;
    }
    
    .typing-dots span:nth-child(1) { animation-delay: -0.32s; }
    .typing-dots span:nth-child(2) { animation-delay: -0.16s; }
    
    @keyframes typingAnimation {
        0%, 80%, 100% { 
            transform: scale(0.8);
            opacity: 0.5;
        }
        40% { 
            transform: scale(1);
            opacity: 1;
        }
    }
    
    .additional-products {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin: 10px 0;
    }
    
    .product-option {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 10px;
        background: #f5f5f5;
        border-radius: 8px;
        cursor: pointer;
        transition: background 0.2s ease;
    }
    
    .product-option:hover {
        background: #e9e9e9;
    }
    
    .option-name {
        font-weight: 500;
        margin-bottom: 4px;
    }
    
    .option-price {
        color: #e74c3c;
        font-weight: 600;
    }
    
    .mobile-hidden {
        display: none !important;
    }
    
    @media (max-width: 768px) {
        .mobile-hidden {
            display: none !important;
        }
    }
`;
document.head.appendChild(style);
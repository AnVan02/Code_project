<?php 
require "../header.php";

// Bật hiển thị lỗi
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Bao gồm tệp kết nối
include('../tintuc_test/admin/config/config.php');

// Kiểm tra nếu `link` được truyền qua URL
if (!isset($_GET['link']) || empty($_GET['link'])) {
    die("Không tìm thấy link bài viết.");
}

// Lấy link bài viết từ URL và xử lý để tránh lỗi SQL Injection
$article_link = mysqli_real_escape_string($mysqli, $_GET['link']);

// Truy vấn bài viết dựa trên `article_link`
$sql_article = "SELECT * FROM article WHERE article_link = '$article_link' LIMIT 1";
$query_article = mysqli_query($mysqli, $sql_article);

// Kiểm tra nếu xảy ra lỗi truy vấn SQL
if (!$query_article) {
    die("Lỗi truy vấn SQL: " . mysqli_error($mysqli));
}

// Kiểm tra nếu không tìm thấy bài viết
if (mysqli_num_rows($query_article) === 0) {
    die("Bài viết không tồn tại hoặc đã bị xóa.");
}

// Lấy dữ liệu bài viết
$article = mysqli_fetch_assoc($query_article);
function renderWithImage($text) {
    // Decode HTML entities để các thẻ HTML hiển thị đúng
    $text = htmlspecialchars_decode($text, ENT_QUOTES | ENT_HTML5);
    // Xử lý các thẻ HTML bị encode
    $text = html_entity_decode($text, ENT_QUOTES | ENT_HTML5, 'UTF-8');
    
    // Xử lý ảnh
    $pattern = '/(https?:\/\/[^\s"\']+\.(?:jpg|jpeg|png|gif|webp))/i';
    $replacement = '<img class="article-image" src="$1" alt="image" loading="lazy" style="max-width:100%;height:auto;display:block;margin:10px auto;">';
    $text = preg_replace($pattern, $replacement, $text);
    
    // Xử lý bảng
    $text = preg_replace('/<table([^>]*)>/', '<table$1 class="article-table">', $text);
    return $text;
}
?>

<script async src="https://www.googletagmanager.com/gtag/js?id=G-MSGJRVX2NY"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-MSGJRVX2NY');
</script>

<div class="container-layout">
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">TRANG CHỦ</a></li>
            <li class="breadcrumb-item active" aria-current="page">TIN TỨC</li>
        </ol>
    </nav>
    <div class="main-layout">
        <section class="article">
            <div class="article__content">
                <h1 class="article-title"><?= htmlspecialchars($article['article_title']); ?></h1>
                <div class="article-info">
                    <div class="article-meta d-flex space-between align-center">
                        <span style="font-size:17px">
                            <?= date("d/m/Y", strtotime($article['article_date'])); ?> - <?php echo " " . htmlspecialchars($article['article_author']); ?>
                        </span>
                        <span class="social-icons">
                            <a href="https://www.facebook.com/people/ROSA-AI-Computer/61559427752479/" target="_blank" aria-label="Facebook">
                                <i class="fab fa-facebook" style="color: #1877F2; font-size:25px"></i>
                            </a>
                            <a href="https://www.linkedin.com/in/rosa-ai-computer-20980b352/" target="_blank" aria-label="LinkedIn">
                                <i class="fab fa-linkedin" style="color: #0A66C2; font-size:25px "></i>
                            </a>
                            <a href="javascript:void(0);" onclick="copyLink()" title="Sao chép liên kết" aria-label="Sao chép liên kết">
                                <i class="fas fa-link" style="color: #000000; font-size:20px;"></i>
                            </a>
                        </span>
                    </div>
                </div>
                <div class="article-body">
                    <div class="article__context">
                        <?= renderWithImage($article['article_content']); ?>
                    </div>
                    <?php if (!empty($article['article_summary'])): ?>
                    <div class="article__summary">
                        <h3>Tóm tắt</h3>
                        <?= renderWithImage($article['article_summary']); ?>
                    </div>
                    <?php endif; ?>
                </div>
                <div class="article__tag">
                    <strong>Thẻ: </strong>
                    <?php
                    $tags = explode(',', $article['article_tag']);
                    foreach ($tags as $tag) {
                        $tag = trim($tag);
                        if (!empty($tag)) {
                            echo '<a href="../tintuc/tag/' . urlencode($tag) . '" class="article_link">' . htmlspecialchars($tag) . '</a>';
                        }
                    }
                    ?>
                </div>
                <div class="rosa-contact">
                    <h4>ROSA COMPUTER</h4>
                    <p>Địa chỉ: 150 Ter Bùi Thị Xuân, Phường Bến Thành, TP. Hồ Chí Minh.</p>
                    <p>Phòng KD: (028) 39293770 - (028) 39293765</p>
                    <p>Phòng kỹ thuật & Bảo hành: (028) 39260996</p>
                    <p>Website:
                        <a href="https://www.rosacomputer.vn" target="_blank">www.rosacomputer.vn</a> |
                        <a href="https://www.rosacomputer.ai" target="_blank">www.rosacomputer.ai</a>
                    </p>
                </div>
            </div>
        </section>
    </div>
</div>

<style>
    /* CSS đã được tối ưu hóa cho SEO, font chữ và hình ảnh */
    :root {
        --font-primary: 'Montserrat', sans-serif;
        --font-secondary: 'Inter', sans-serif;
        --clr-primary: #ff0000;
        --clr-secondary: #0a66c2;
        --clr-text: #333;
        --clr-bg-light: #fafafa;
        --clr-bg-card: #fff;
        --clr-border: #eee;
        --clr-accent-light: #f8f9fa;
        --radius-sm: 4px;
        --radius-md: 8px;
        --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
        --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.1);
        --transition-fast: 0.2s ease-in-out;
        --fs-xs: clamp(0.75rem, 1vw, 1rem);
        --fs-sm: clamp(0.875rem, 1.2vw, 1.1rem);
        --fs-base: clamp(1rem, 1.5vw, 1.2rem);
        --fs-lg: clamp(1.125rem, 1.7vw, 1.3rem);
        --fs-xl: clamp(1.25rem, 2vw, 1.5rem);
        --fs-2xl: clamp(1.5rem, 2.5vw, 1.8rem);
        --fs-3xl: clamp(1.875rem, 3vw, 2.25rem);
        --fs-4xl: clamp(2.25rem, 3.5vw, 2.75rem);
    }
    
    *, *::before, *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    
    html {
        scroll-behavior: smooth;
    }
    
    body {
        font-family: var(--font-primary);
        line-height: 1.7;
        color: var(--clr-text);
        background: var(--clr-bg-light);
        font-size: var(--fs-base);
    }
    
    a {
        text-decoration: none;
        color: var(--clr-primary);
        transition: var(--transition-fast);
    }
    
    a:hover {
        text-decoration: underline;
    }
    
    img {
        max-width: 100%;
        display: block;
        height: auto;
    }
    
    .container-layout {
        max-width: 1350px;
        margin-inline: auto;
        padding: 0 1.5rem;
    }
    
    .main-layout {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
    
    @media (min-width: 992px) {
        .main-layout {
            flex-direction: row;
            align-items: flex-start;
        }
    }
    
    .article {
        flex-grow: 1;
        min-width: 0;
    }
    
    .article__content {
        background: var(--clr-bg-card);
        padding: clamp(1.5rem, 4vw, 3rem);
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-md);
    }
    
    .article-title {
        font-size: var(--fs-3xl);
        font-weight: 700;
        line-height: 1.2;
        margin-bottom: 1.5rem;
        color: #222;
    }
    
    .article-info {
        border-bottom: 1px solid var(--clr-border);
        padding-bottom: 1rem;
        margin-bottom: 1.5rem;
    }
    
    .article-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 1rem;
    }
    
    .article-meta span {
        font-size: var(--fs-sm);
        color: #666;
        font-weight: 500;
    }
    
    .article-body > * {
        margin-bottom: 1.5rem;
    }
    
    .article__context h1, .article__context h2, .article__context h3, .article__context h4, .article__context h5, .article__context h6,
    .article__summary h1, .article__summary h2, .article__summary h3, .article__summary h4, .article__summary h5, .article__summary h6 {
        font-family: var(--font-primary);
        font-weight: 700;
        line-height: 1.3;
        color: #222;
        margin-bottom: 0.8rem;
        margin-top: 2rem;
    }
    
    .article__context h2, .article__summary h2 {
        font-size: var(--fs-2xl);
    }
    
    .article__context h3, .article__summary h3 {
        font-size: var(--fs-xl);
    }
    
    .article__context p, .article__summary p {
        font-size: var(--fs-lg);
        line-height: 1.8;
        text-align: justify;
        margin-bottom: 1.2rem;
    }
    
    .article__context strong, .article__summary strong {
        font-weight: 700;
        color: #000;
    }
    
    .article-image {
        max-width: 100%;
        height: auto;
        margin: 1.5rem auto;
        display: block;
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-sm);
    }
    
    .article__context ul, .article__summary ul,
    .article__context ol, .article__summary ol {
        margin-left: 2rem;
        list-style-position: outside;
        margin-bottom: 1.5rem;
    }
    
    .article__context ul li, .article__summary ul li {
        list-style-type: disc;
        margin-bottom: 0.5rem;
    }
    
    .article__context ol li, .article__summary ol li {
        list-style-type: decimal;
        margin-bottom: 0.5rem;
    }
    
    table.article-table {
        width: 100% !important;
        border-collapse: collapse !important;
        margin: 2rem 0 !important;
        font-size: var(--fs-base) !important;
        background: var(--clr-bg-card) !important;
        box-shadow: var(--shadow-sm) !important;
        border-radius: var(--radius-md) !important;
        overflow: hidden !important;
        border: 1px solid var(--clr-border) !important;
    }
    
    table.article-table th {
        background: var(--clr-accent-light) !important;
        font-weight: 700 !important;
        color: #444 !important;
        text-transform: uppercase !important;
        padding: 1rem 1.25rem !important;
        text-align: left !important;
        border-bottom: 1px solid var(--clr-border) !important;
    }
    
    table.article-table td {
        padding: 1rem 1.25rem !important;
        text-align: left !important;
        border-bottom: 1px solid var(--clr-border) !important;
    }
    
    table.article-table tr:nth-child(even) {
        background: #fcfcfc !important;
    }
    
    .social-icons {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .article__tag {
        margin-top: 2rem;
        padding-top: 1.5rem;
        border-top: 1px solid var(--clr-border);
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.75rem;
    }
    
    .article__tag strong {
        font-size: var(--fs-sm);
        color: #555;
        margin-right: 0.5rem;
    }
    
    .article__tag a {
        background: var(--clr-accent-light);
        color: var(--clr-primary);
        padding: 0.5rem 1rem;
        border-radius: 9999px;
        font-size: var(--fs-sm);
        font-weight: 500;
        transition: transform 0.2s ease-in-out, background 0.2s ease-in-out;
        text-decoration: none;
    }
    
    .article__tag a:hover {
        background: var(--clr-primary);
        color: #fff;
        transform: translateY(-2px);
    }
    
    .rosa-contact {
        margin-top: 3rem;
        padding: 2rem;
        background: #f8f9fa;
        border-radius: var(--radius-md);
        border-left: 4px solid var(--clr-primary);
    }
    
    .rosa-contact h4 {
        font-size: var(--fs-xl);
        color: var(--clr-primary);
        margin-bottom: 1rem;
        font-weight: 700;
    }
    
    .rosa-contact p {
        font-size: var(--fs-base);
        color: #000;
        margin-bottom: 0.75rem;
        line-height: 1.6;
    }

    @media (max-width:768px){
        html{
            font-size:15px;
        }
        .main-layout{
            flex-direction:column;
        }
        .article__content{
            padding:1.5rem;
        }
        .article-title{
            font-size:24px;
        }
        .article__context h1, .article__summary h1 { font-size: 26px !important; }
        .article__context h2, .article__summary h2 { font-size: 24px !important; }
        .article__context h3, .article__summary h3 { font-size: 22px !important; }
        .article__context h4, .article__summary h4 { font-size: 20px !important; }
        .article__context h5, .article__summary h5 { font-size: 19px !important; }
        .article__context h6, .article__summary h6 { font-size: 18px !important; }
        .article-meta{
            align-items:flex-start;
        }
        .social-icons{
            gap:0.75rem;
        }
        .social-icons a{
            font-size:18px;
        }
    }

    @media (max-width:480px){
        html{
            font-size:15px;
        }
        .article__content{
            padding:1rem;
        }
        .article-title{
            font-size:20px;
        }
        .article__context, .article__summary{
            font-size:19px;
        }
        .article__context p, .article__summary p {
            font-size: 19px !important;
        }
        .rosa-contact{
            padding:1.6rem;
        }
    }
</style>

<script>
    function copyLink() {
        const link = "https://rosacomputer.vn/tintuc_test/tintuc/<?= htmlspecialchars($article['article_link']); ?>";
        navigator.clipboard.writeText(link)
            .then(() => {
                const existingNotification = document.querySelector('.copy-notification');
                if (existingNotification) {
                    existingNotification.remove();
                }
                const notification = document.createElement('div');
                notification.className = 'copy-notification';
                const text = document.createElement('span');
                text.className = 'notification-text';
                text.textContent = 'Link copied!';
                notification.appendChild(text);
                const copyLinkIcon = document.querySelector('.social-icons a[onclick="copyLink()"]');
                copyLinkIcon.insertAdjacentElement('afterend', notification);
                setTimeout(() => {
                    notification.remove();
                }, 1000);
            })
            .catch(err => {
                console.error("Lỗi khi sao chép: ", err);
            });
    }

    document.addEventListener('DOMContentLoaded', function() {
        const contexts = document.querySelectorAll('.article__context, .article__summary');
        
        contexts.forEach(context => {
            const paragraphs = context.querySelectorAll('p');
            
            paragraphs.forEach(p => {
                const text = p.textContent.trim();
                
                // Kiểm tra xem đoạn văn bản có nên là một heading hay không
                // Điều kiện: văn bản không rỗng, có độ dài nhất định, không kết thúc bằng dấu chấm hoặc dấu câu khác
                // và đoạn văn bản trước đó không phải là một heading
                if (text && text.length > 20 && text.length < 100 && !/[.?!]$/.test(text) && !p.previousElementSibling.matches('h1, h2, h3, h4, h5, h6')) {
                    const heading = document.createElement('h3');
                    heading.textContent = text;
                    p.parentNode.replaceChild(heading, p);
                }
            });
        });
    });
</script>

<?php require "../footer.php" ?>
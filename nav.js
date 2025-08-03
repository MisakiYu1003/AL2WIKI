// nav.js

// 將導覽列的 HTML 內容直接定義在一個字串變數中。
// 這樣可以讓您在同一個地方輕鬆編輯所有連結。
const navBarHTML = `
    <nav class="top-nav">
        <div class="nav-container">
            <a href="index.html" class="nav-logo">天使之戀找怪</a>
            <ul>
                <li><a href="index.html" class="nav-link">怪物篩選器</a></li>
                <li><a href="Japanese.html" class="nav-link">Japanese(日語版)</a></li>
                <li><a href="English.html" class="nav-link">English(英語版)</a></li>
                <li><a href="rich.html" class="nav-link">飾品數值</a></li>
                <li><a href="about.html" class="nav-link">關於我</a></li>
            </ul>
        </div>
    </nav>
`;

/**
 * 這個函式會將導覽列插入到頁面中，並根據當前頁面的 URL 來標示作用中的連結。
 */
function loadNavigationBar() {
    // 找到用來放置導覽列的容器元素。
    const placeholder = document.getElementById('nav-placeholder');
    
    if (placeholder) {
        // 如果找到了容器，就把導覽列的 HTML 放入其中。
        placeholder.innerHTML = navBarHTML;
    } else {
        // 如果沒有找到容器，就將導覽列直接插入到 <body> 的最前面作為備用方案。
        document.body.insertAdjacentHTML('afterbegin', navBarHTML);
    }

    // 標示作用中的連結。
    try {
        // 獲取當前頁面的檔案名稱，例如 "rich.html"。
        const currentPage = window.location.pathname.split("/").pop();
        // 如果是根目錄，則預設為 "index.html"。
        const activePage = currentPage === '' ? 'index.html' : currentPage;

        // 選取所有導覽列的連結。
        const navLinks = document.querySelectorAll('.top-nav .nav-link');
        
        // 遍歷所有連結，如果連結的 href 和當前頁面對應，就加上 'active-nav-link' class。
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href').split("/").pop();
            if (linkPage === activePage) {
                link.classList.add('active-nav-link');
            }
        });
    } catch (e) {
        console.error("設定導覽列作用中連結時發生錯誤:", e);
    }
}

// 當整個 HTML 文件都載入並解析完成後，再執行 loadNavigationBar 函式。
// 這可以確保所有需要的元素都已經準備好。
document.addEventListener("DOMContentLoaded", loadNavigationBar);
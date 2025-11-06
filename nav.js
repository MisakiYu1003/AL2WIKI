// nav.js (with integrated theme switcher, dropdown menu, and hamburger menu)

document.addEventListener("DOMContentLoaded", () => {
    // --- 1. 導覽列邏輯 ---
    
    // 定義導覽列的 HTML，包含漢堡按鈕和下拉式選單
    const navBarHTML = `
        <nav class="top-nav">
            <div class="nav-container">
                <a href="index.html" class="nav-logo">天使之戀2-WIKI</a>
                <button id="hamburger-btn" aria-label="Toggle Navigation">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <ul id="main-nav-links">
                    <li class="dropdown">
                        <a href="searchmomTw.html" class="nav-link dropdown-toggle">怪物篩選器</a>
                        <ul class="dropdown-menu">
                            <li><a href="searchmomTw.html">繁中版</a></li>
                            <li><a href="searchmomJa.html">日語版</a></li>
                            <li><a href="searchmomEn.html">英語版</a></li>
                        </ul>
                    </li>
                    <li><a href="rich.html" class="nav-link">飾品數值</a></li>
                    <li><a href="aa.html" class="nav-link">寵物技能</a></li>
					<li><a href="achievement.html" class="nav-link">成就查詢</a></li>
                    <li><a href="about.html" class="nav-link">關於我</a></li>
                </ul>
            </div>
        </nav>
    `;

    // 將導覽列插入頁面
    const placeholder = document.getElementById('nav-placeholder');
    if (placeholder) {
        placeholder.innerHTML = navBarHTML;
    } else {
        document.body.insertAdjacentHTML('afterbegin', navBarHTML);
    }

    // 設定當前頁面連結的啟用樣式
    try {
        const currentPage = window.location.pathname.split("/").pop() || 'index.html';
        const navLinks = document.querySelectorAll('#main-nav-links > li > .nav-link');
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href').split("/").pop();
            if (linkPage === currentPage) {
                link.classList.add('active-nav-link');
            }
        });
    } catch (e) {
        console.error("設定導覽列作用中連結時發生錯誤:", e);
    }

    // --- 2. 漢堡選單 & 下拉式選單邏輯 ---
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mainNavLinks = document.getElementById('main-nav-links');
    const dropdownToggle = document.querySelector('.dropdown-toggle');

    if (hamburgerBtn && mainNavLinks) {
        hamburgerBtn.addEventListener('click', () => {
            // 切換漢堡選單的開啟/關閉狀態
            document.querySelector('.top-nav').classList.toggle('nav-open');
        });
    }
    
    if(dropdownToggle) {
        dropdownToggle.addEventListener('click', (e) => {
            // 在小螢幕上，點擊連結時防止頁面跳轉，並展開子選單
            if (window.innerWidth <= 900) {
                e.preventDefault();
                const parentLi = e.currentTarget.parentElement;
                parentLi.classList.toggle('open');
            }
        });
    }

    // --- 3. 主題切換開關邏輯 ---
    
    const navContainer = document.querySelector('.nav-container');
    if (!navContainer) {
        console.error('找不到導覽列容器以放置主題開關!');
        return;
    }

    // 建立開關的 HTML 結構
    const switchWrapper = document.createElement('div');
    switchWrapper.id = 'theme-switch-wrapper';
    const switchLabel = document.createElement('label');
    switchLabel.className = 'theme-switch';
    switchLabel.setAttribute('for', 'theme-toggle');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'theme-toggle';
    const slider = document.createElement('span');
    slider.className = 'slider round';

    // 組合元件並加入導覽列
    switchLabel.appendChild(checkbox);
    switchLabel.appendChild(slider);
    switchWrapper.appendChild(switchLabel);
    navContainer.appendChild(switchWrapper);

    // 根據儲存的設定應用主題
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        checkbox.checked = true;
    } else {
        document.body.classList.remove('dark-mode');
        checkbox.checked = false;
    }

    // 監聽開關事件
    checkbox.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
        let theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
    });

    // --- 4. Back to Top Button Logic ---
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'back-to-top-btn';
    backToTopBtn.innerHTML = '&uarr;'; // Up arrow
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- 5. Back to Home Button Logic ---
    const backToHomeBtn = document.createElement('a');
    backToHomeBtn.id = 'back-to-home-btn';
    backToHomeBtn.href = 'index.html';
    backToHomeBtn.innerHTML = '首'; // Home character
    document.body.appendChild(backToHomeBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            backToHomeBtn.classList.add('show');
        } else {
            backToHomeBtn.classList.remove('show');
        }
    });
});

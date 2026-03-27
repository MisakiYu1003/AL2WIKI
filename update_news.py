import urllib.request
import re
import os
import json
from datetime import datetime

def fetch_news():
    url = "https://al2.uj.com.tw/main.aspx"
    try:
        # Use a User-Agent to avoid potential blocks
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response:
            # UJ often uses utf-8 or big5. The page says charset=utf-8
            html = response.read().decode('utf-8', errors='ignore')
    except Exception as e:
        print(f"Error fetching news: {e}")
        return []

    # News sections A1 to A6
    news_items = []
    # Improved regex to catch date and title/link
    pattern = re.compile(r"<a href='([^']+)' class='[^']+' target='_top'>([^<]+)</a></td><td[^>]*><div[^>]*><span[^>]*>([^<]+)</span>", re.S)

    matches = pattern.findall(html)
    for link, title, date in matches:
        # Full URL
        if not link.startswith('http'):
            link = "https://al2.uj.com.tw/" + link
        news_items.append({
            "title": title.strip(),
            "link": link,
            "date": date.strip()
        })

    return news_items

def update_html(news_items):
    news_file = "news.json"
    if os.path.exists(news_file):
        try:
            with open(news_file, 'r', encoding='utf-8') as f:
                old_news = json.load(f)
        except:
            old_news = []
    else:
        old_news = []

    # Merge and deduplicate by link
    seen_links = {item['link'] for item in old_news}
    new_entries = []
    for item in news_items:
        if item['link'] not in seen_links:
            new_entries.append(item)
            seen_links.add(item['link'])

    # If no new entries AND news.html already exists, don't update to avoid git churn
    if not new_entries and os.path.exists("news.html"):
        print("No new news entries found. Skipping update.")
        return False

    # Prepend new entries
    all_news = new_entries + old_news
    # Keep only the latest 100 items to avoid bloated files
    all_news = all_news[:100]

    with open(news_file, 'w', encoding='utf-8') as f:
        json.dump(all_news, f, ensure_ascii=False, indent=2)

    last_updated = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # Generate news.html
    html_template = """<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>最新佈告 - 天使之戀2-WIKI</title>
    <link rel="icon" href="al2favicon.ico">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="shared-styles.css">
    <style>
        body {{ padding-top: 90px; }}
        .news-item {{
            background-color: var(--card-bg);
            border: 1px solid var(--card-border);
            color: var(--text-color);
            transition: all 0.2s ease;
        }}
        .news-item:hover {{
            border-color: var(--header-color);
            transform: translateX(5px);
            box-shadow: 0 4px 6px -1px var(--card-shadow);
        }}
        .news-date {{ color: var(--header-color); font-weight: bold; }}
        .last-updated {{ color: var(--text-color); opacity: 0.7; font-size: 0.875rem; }}
    </style>
</head>
<body>
<div id="nav-placeholder"></div>
<div class="container mx-auto px-4 py-12">
    <header class="text-center mb-12">
        <h1 class="text-4xl font-bold" style="color: var(--header-color);">最新佈告</h1>
        <p class="text-xl mt-4" style="color: var(--text-color);">自動抓取自官網的最新消息</p>
        <p class="last-updated mt-2">最後更新時間：{last_updated}</p>
    </header>
    <div class="max-w-4xl mx-auto space-y-4">
        {news_list_html}
    </div>
</div>
<script src="nav.js"></script>
</body>
</html>
"""
    news_list_html = ""
    for item in all_news:
        news_list_html += f"""
        <a href="{item['link']}" target="_blank" class="news-item block p-4 rounded-lg shadow-sm no-underline">
            <div class="flex justify-between items-center">
                <span class="text-lg">{item['title']}</span>
                <span class="news-date">{item['date']}</span>
            </div>
        </a>"""

    with open("news.html", "w", encoding='utf-8') as f:
        f.write(html_template.format(news_list_html=news_list_html, last_updated=last_updated))
    return True

if __name__ == "__main__":
    items = fetch_news()
    if items:
        updated = update_html(items)
        if updated:
            print(f"Updated news.html with {len(items)} items.")
    else:
        # If fetch fails, we still might want to regenerate HTML if we have JSON AND it doesn't exist
        news_file = "news.json"
        if os.path.exists(news_file) and not os.path.exists("news.html"):
            with open(news_file, 'r', encoding='utf-8') as f:
                items = json.load(f)
            update_html(items)
            print("Generated news.html from existing news.json.")
        else:
            print("No news items found or error occurred.")

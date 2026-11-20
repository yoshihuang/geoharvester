# 聚禾工程顧問有限公司 官方網站

純靜態網站（HTML + CSS + JS），不需資料庫或伺服器程式，直接以瀏覽器開啟 `index.html` 即可預覽。

## 檔案結構
```
index.html               主頁（關於、服務、實績、技術、團隊、著作、聯絡）
admin.html               工作實績管理頁（管理者使用，網站上不放連結）
assets/data/projects.js  工作實績資料（由 admin.html 產生／覆蓋）
assets/css/style.css     樣式（品牌色定義在 :root）
assets/js/main.js        實績顯示、分類篩選、手機選單、聯絡表單
assets/img/              圖片
材料/                     原始素材（上線時不需上傳）
```

## 維護工作實績（admin.html）
1. 用 Chrome 或 Edge 開啟 `admin.html`。
2. 按「開啟資料檔」，選取 `assets/data/projects.js`（第一次需同意瀏覽器的存取權限）。
3. 新增／編輯／刪除，或用「從 Excel 貼上」批次加入（欄位順序：分類｜年度｜計畫名稱｜委託單位｜履約狀況）。
4. 按「儲存」直接覆蓋資料檔。若沒有先開啟資料檔，會改為下載 `projects.js`，請手動覆蓋 `assets/data/projects.js`。
5. 若網站放在主機上，把更新後的 `projects.js` 上傳覆蓋即可。

說明：
- 網站會依年度自動排序，由新到舊；年度若是區間，例如「104–110」，以最後一年排序。
- 履約狀況不是「已完成」的案件，網站上會加註標籤，例如「結案中」。
- 未儲存的變更會暫存在瀏覽器中，關閉頁面也不會遺失。
- `admin.html` 只能修改本機檔案，無法更動線上網站，放在主機上也不會被他人竄改資料。若不希望被看到，上線時可以不要上傳這個檔案。

## 其他維護
- **聯絡資訊**：修改 `index.html` 的 `#contact` 區塊；表單的收件信箱在 `assets/js/main.js` 的 `initForm()`。
- **圖片**：放入 `assets/img/` 後，修改 `index.html` 中對應的 `src`，圖片寬度建議不超過 1400px。

## 上線方式（擇一）
- **GitHub Pages、Netlify 或 Cloudflare Pages**：上傳整個資料夾（排除 `材料/`），免費，並支援自訂網域。
- **自有主機或 NAS（Synology Web Station）**：把檔案複製到網站根目錄即可。如果 NAS 有對應成網路磁碟，可以用 admin.html 直接開啟、儲存 NAS 上的 `projects.js`，存檔後網站立即更新。

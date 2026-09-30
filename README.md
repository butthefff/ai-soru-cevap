# AI Study — Yapay Zekâ Soru & Cevap

77 soruyu kaynak sohbetin sırasıyla gösteren, soru ve cevabı yan yana sunan statik web sitesi. Kurulum, API anahtarı veya derleme gerektirmez.

## Hemen aç

ZIP dosyasını çıkar ve `index.html` dosyasını Chrome’da aç. Görseller ve veriler proje içinde olduğundan site çevrimdışı çalışır. Kaynak sohbet bağlantısı internet gerektirir.

## GitHub Pages ile yayınla

1. GitHub’da yeni bir repository oluştur. GitHub Free kullanıyorsan görünürlük **Public** olmalıdır. Örnek isim: `ai-soru-cevap`.
2. **Add file → Upload files** ile bu klasörün **içeriğini** repository’ye yükle. `index.html`, `app.js`, `style.css` ve `data.js` repository’nin en üst düzeyinde; `assets/gorseller/` de aynı düzeyde olmalıdır. ZIP dosyasının kendisini yükleme.
3. Yüklemeyi **Commit changes** ile kaydet.
4. **Settings → Pages → Build and deployment** bölümünde **Source: Deploy from a branch**, **Branch: main**, klasör **/(root)** seç ve **Save** düğmesine bas. Dosyaları başka bir branch’e yüklediysen onu seç.
5. Yayın hazır olduğunda Pages bölümündeki **Visit site** bağlantısını aç. Proje adresi genellikle `https://KULLANICI_ADIN.github.io/ai-soru-cevap/` olur. Yayın birkaç dakika sürebilir.

Resmî yönerge: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site

## İçerik ve sıra

- **77 soru**, **8 eşleştirme**, **1 sıralama sorusu**.
- Kaynaktaki **30 görselin tamamı** `assets/gorseller/` klasöründe. Sorulardaki görseller büyütülebilir.
- **Tam sohbet** görünümünde 86 ileti bulunur: sorular, takip istekleri, düzeltmeler, modül bitiş görseli ve site hazırlama istekleri.
- Normal soru görünümünde “just give me the answer” takipleri ve üç düzeltme yeni soru sayılmaz. Modül bitiş ekranı tam sohbette korunur.
- Soru numarası ile sohbet ileti numarası ayrı gösterilir; kaynak sırası değişmez.
- Görsel soruları İngilizce metne aktarılmıştır. Eşleştirme ve sıralama ekranlarının yönergeleri okunabilir çalışma yönergeleri olarak düzenlenmiştir. Asıl görseller ayrıca korunur.
- “DL”, “Recommendations” ve “Inconsistent structure” düzeltmeleri ilgili soruların son yanıtları olarak uygulanmıştır. İlk yanıt ve düzeltme notu açılabilir.
- Cevaplar kaynak sohbetin cevaplarıdır; bağımsız bir doğruluk kontrolü yapılmamıştır. Örneğin bazı kullanıcı düzeltmeleri sorunun metniyle çelişebilir. Bu site konuşmanın son cevabını gösterir ve önceki cevabı da saklar.

Kaynak: https://share.gemini.google/t3WIXPAvfga1

## Kullanım

- **Next · Sonraki** ve **Önceki** ile ilerle.
- Soru listesinden seç veya numarayı yazıp **Git** düğmesine bas / Enter’a bas.
- **Cevabı gizle** ile kendini dene; **Cevabı göster** ile kontrol et.
- Arama, soru, seçenek ve cevap metinlerinde çalışır.
- Sol / sağ ok ile ilerle; boşluk ile cevabı göster veya gizle. Yazı alanında veya düğmede odak varken klavye kısayolları devreye girmez.
- Son soruda **Başa dön** görünür. Son konum bu tarayıcıda hatırlanır.
- Telefonda soru ve cevap alt alta gösterilir.

## Dosyalar

| Dosya | İçerik |
|---|---|
| `index.html` | Sayfa |
| `style.css` | Görünüm ve telefon düzeni |
| `app.js` | Gezinme, arama, arşiv ve görsel büyütme |
| `data.js` | Sitenin kullandığı 77 soru ve 86 sohbet iletisi |
| `sorular.json` | Soruların okunabilir veri kopyası |
| `sohbet-kaynagi.json` | Kaynaktan alınan sorular ve yanıtlar |
| `gorsel-metinleri.json` | Görsellerin metin dökümleri |
| `assets/gorseller/` | 30 PNG görsel |
| `.nojekyll` | GitHub Pages için statik dosya yayınlama işareti |

İçerik değişikliği için `data.js` dosyasını düzenle. JSON dosyaları kayıt kopyalarıdır; bunları değiştirmek siteyi otomatik güncellemez. Proje herhangi bir harici yazı tipi, kütüphane veya sunucu servisine bağlı değildir.

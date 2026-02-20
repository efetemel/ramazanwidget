# 🌙 Ramazan Masaüstü Widget (İftar \& Sahur Sayacı)



Bu proje, masaüstünüzde şeffaf bir widget olarak çalışan, Diyanet İşleri Başkanlığı verileriyle %100 uyumlu İftar ve Sahur geri sayım uygulamasıdır. Electron.js ile geliştirilmiştir ve arka planda sessizce çalışarak sistem tepsisinde (tray) kalan süreyi dinamik olarak gösterir.



## ✨ Özellikler



Tam Uyumlu Veri: `ezanvakti.imsakiyem.com` API'si kullanılarak Diyanet ile birebir uyumlu İmsak ve Akşam vakitleri.

Şeffaf ve Modern Arayüz: TailwindCSS ile tasarlanmış, arkaplanı bulanık (backdrop-blur) ve şık masaüstü widget tasarımı.

Dinamik Sistem Tepsisi (Tray): Uygulama arkaplanda çalışırken, Windows/Mac görev çubuğundaki küçük ikonda iftara veya sahura kalan süreyi (saat veya dakika cinsinden) canlı olarak çizer.

Akıllı Konum Arama: Şehir ve İlçe isimlerini Türkçe karakter veya büyük/küçük harf duyarlılığı olmadan otomatik eşleştirir ve ID'leri belleğe (cache) alır.

Kesintisiz Geçiş: İftar vakti girdiğinde otomatik olarak yarının sahur vaktine; sahur vakti girdiğinde ise bugünün iftar vaktine geri sayımı günceller.

Hata Toleransı (Deep Search): API'den gelen karmaşık JSON verilerinin içinde vakitleri derinlemesine tarayarak bulan akıllı algoritma.


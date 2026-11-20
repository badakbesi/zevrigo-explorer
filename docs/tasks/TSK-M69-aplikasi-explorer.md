# TSK-M69 · Aplikasi Zevrigo Explorer untuk Windows dan Android · 🟡 · Prioritas: Sedang
- **Jenis:** task modul · **Modul:** MOD-14 (`app/`) · **Bergantung pada:** TSK-M44 (explorer publik), TSK-M58 (pola APK wallet)
- **Ditulis:** Quick, 20 November 2026 (pencipta 20.09: "kita buat apk untuk explorer dan untuk app pc"; cara A, explorer untuk
  Windows, izin Tauri di repo explorer)

## Isi
| Hal | Keputusan |
|---|---|
| Bentuk | Jendela Tauri 2 ke explorer publik `https://zevrigo.ratuaurion.store/` (cara A): tampilan selalu sama dengan web, server tidak berubah |
| Kode | `app/src-tauri`: jendela dari `tauri.conf.json` (`create: false`) dibuat di `setup` dengan `on_navigation(allowed_url)`: hanya `https` ke host explorer, port bawaan, tanpa nama pengguna. Tanpa perintah IPC dan tanpa capabilities |
| Dependensi | `tauri =2.12.3`, `tauri-build =2.7.2` (versi wallet MOD-15), tanpa plugin. Workspace dan `Cargo.lock` sendiri; semua paket sama persis dengan Cargo.lock wallet |
| Identitas | `com.zevrigo.explorer`, "Zevrigo Explorer", versi 0.1.0 (Android versionCode 1000), ikon logo resmi (salinan ikon wallet, DEC-40) |
| Android | Proyek Gradle dibuat `npm run tauri -- android init` (tidak di-commit; `app/package.json` hanya berisi skrip `tauri` = Tauri CLI 2.12.2 repo wallet di folder sebelah, tanpa paket npm), ikon peluncur dan Gradle lokal disalin dari proyek wallet; APK 64-bit + 32-bit, ditandatangani kunci rilis yang sama dengan wallet |
| Windows | Workflow `rilis-explorer-app.yml`: installer NSIS, rilis draf dari tag `explorer-app-v<versi>` |

Batas: butuh internet (tanpa VPS jendela menampilkan halaman galat WebView); tautan ke situs lain (blog, GitHub) tidak dibuka.

## Uji
- Rust: `allowed_url` (origin explorer saja: http, port lain, subdomain lain, host mirip, userinfo, `file:`, `javascript:`, `data:`
  ditolak), konfigurasi jendela (`url`, `create: false`, identifier). Gerbang: `make app-check`, clippy Android dua target.
- APK: paket, versi, dua ABI, ikon logo resmi, izin internet tanpa kamera, tidak debuggable, host explorer di pustaka.
- HP dan Windows: dibuka pencipta (blok, transaksi, faucet, tautan luar tidak membuka).

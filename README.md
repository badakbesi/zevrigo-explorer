# Zevrigo Explorer (MOD-14)

Indexer SQLite, API JSON baca saja (`/api/v1/`), dan antarmuka web explorer Zevrigo Coin (Next.js + Tailwind CSS + shadcn/ui,
dua bahasa, tanpa kuki dan analitik). Explorer hanya menyajikan data sistem (DEC-28). Explorer publik demo regtest:
https://demo-explorer.zevrigo.online

Repo ini bagian dari **zevrigo_lab**: crate inti dan salinan RandomX (salt `RandomZVRG\x01`, DEC-01) dari repo inti `zevrigo`
di folder sebelah (`../zevrigo`). Aturan proyek: [AGENTS.md](AGENTS.md).

```bash
make check-all   # Rust: fmt, clippy, larangan unsafe/float, sumber randomx-rs, test (termasuk uji ujung ke ujung FTR-05)
make web-check   # antarmuka web (Node.js >= 22.12), hasil di web/out
cargo run -- --regtest --datadir ~/.zevrigo --web-dir web/out
```

Spesifikasi: [docs/reference/spesifikasi-explorer-v0.1.md](docs/reference/spesifikasi-explorer-v0.1.md),
[docs/reference/spesifikasi-explorer-web-v0.2.md](docs/reference/spesifikasi-explorer-web-v0.2.md). Modul:
[docs/modules/MOD-14-explorer.md](docs/modules/MOD-14-explorer.md).

Favicon dan ikon situs (`web/app/favicon.ico`, `icon.png`, `apple-icon.png`) adalah salinan logo resmi dari `merek/` repo
inti ([SUMBER_RESMI.md](https://github.com/badakbesi/zevrigo/blob/main/SUMBER_RESMI.md), DEC-40); jangan diganti di repo ini.

## Aplikasi Zevrigo Explorer (Windows dan Android)

`app/` berisi aplikasi Tauri 2 yang membuka explorer publik https://zevrigo.ratuaurion.store di jendelanya sendiri (TSK-M69):
tanpa perintah IPC, hanya halaman di origin explorer yang dibuka. Workspace Cargo sendiri (`app/src-tauri/Cargo.lock`), jadi
program explorer, Docker, dan CI di atas tidak berubah. `make app-check` (Linux butuh WebKitGTK 4.1 seperti wallet). Installer
Windows: workflow `Rilis aplikasi explorer` (tag `explorer-app-v<versi>`). APK Android: skrip langkah pencipta di zevrigo_lab (`app/package.json` hanya skrip `tauri` ke Tauri CLI repo
zevrigo-wallet di folder sebelah, tanpa paket npm).

Lisensi: MIT OR Apache-2.0 (DEC-02).

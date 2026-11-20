Aplikasi Zevrigo Explorer {{VERSI}} untuk Windows (x64), dibangun GitHub Actions dari tag `{{TAG}}` (commit `{{COMMIT}}`)
dengan Cargo.lock tetap. Aplikasi membuka explorer resmi https://zevrigo.ratuaurion.store di jendelanya sendiri.

**Jaringan demo regtest untuk belajar.** Koin demo tidak bernilai, tidak bisa dijual, dan bisa hilang saat jaringan
di-reset. Ini bukan penawaran investasi.

| Berkas | SHA-256 |
|---|---|
| `{{BERKAS}}` | `{{SHA256}}` |

Periksa unduhan di PowerShell: `Get-FileHash .\{{BERKAS}} -Algorithm SHA256`. Hasilnya harus sama dengan baris di atas dan
dengan `SHA256SUMS.txt`.

- **Belum ditandatangani.** Windows SmartScreen menampilkan peringatan ("Windows protected your PC"); pilih "More info"
  lalu "Run anyway" hanya jika SHA-256 cocok.
- Butuh internet dan Microsoft Edge WebView2 (sudah ada di Windows 10 dan 11 yang diperbarui).
- Privasi: aplikasi tidak menyimpan dan tidak mengirim data sendiri; teks lengkap tampil saat instalasi.

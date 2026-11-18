# AGENTS.md: Zevrigo Explorer (MOD-14)

Indexer, API HTTP baca saja, dan antarmuka web explorer Zevrigo. Crate `zevrigo-explorer` di akar repo, antarmuka Next.js
(static export) di `web/`. Bergantung pada MOD-01, MOD-02, MOD-04, MOD-08 dari repo inti (DEC-25, DEC-28).

## Hubungan dengan repo inti
Repo ini bagian dari **zevrigo_lab** (pemisahan repo 17 November 2026, AGENDA P1). Repo inti `zevrigo` di folder sebelah
(`../zevrigo`) adalah sumber kebenaran: parameter protokol, aturan konsensus, larangan mutlak, pembagian peran (DEC-16),
keputusan (`docs/decisions`), peta modul, dan penomoran DEC/MOD/TSK. **Baca `../zevrigo/AGENTS.md` dulu; semua aturannya
berlaku di sini.** Bila aturan di file ini dan di repo inti bertentangan, ikuti repo inti dan laporkan.

## Larangan mutlak (ringkas, rincian di repo inti)
- Tanpa `unsafe` dan tanpa floating point di kode proyek, termasuk test. `make check-forbidden` memeriksanya.
- Jumlah koin selalu `u128` quanta di Rust; di TypeScript `bigint` atau `string`, tidak pernah `number`.
- Aturan konsensus hanya di crate `zevrigo-consensus` repo inti. Repo ini tidak menulis aturan konsensus.
- Menambah atau mengubah versi dependensi wajib minta izin pencipta.

## Git
- Conventional Commits. Jangan `git push`, jangan force, jangan mengubah riwayat, remote, identitas, atau `git config`.
  Push dilakukan pencipta (DEC-32). Jangan memakai GitHub CLI atau akun online tanpa izin tertulis.
- Status sekarang: **belum repo git** (keputusan git menunggu pencipta).

## Perintah
```bash
make check-all   # fmt-check + lint + check-forbidden + check-randomx + test
make web-check   # antarmuka web: npm ci, typecheck, vitest, next build ke web/out
```

## Khusus repo ini
- **DEC-01 (wajib):** `[patch.crates-io] randomx-rs` menunjuk salinan `../zevrigo/vendor/randomx-rs` (salt RandomZVRG).
  Jangan dihapus atau diganti; `make check-randomx` gagal bila randomx-rs berasal dari crates.io.
- Hanya data sistem (DEC-28): tanpa alamat, saldo, jumlah per penerima, jejak koin, dan alokasi genesis.
- Uji ujung ke ujung FTR-05 ada di `tests/ftr05_explorer.rs` (sejak 18 November 2026, dulu di repo inti). Node, miner,
  mempool, penyimpanan, dan wallet-core repo inti hanya dev-dependency untuk uji ini; program explorer tidak memakainya.

## Berhenti dan tanya bila
- Ada parameter protokol yang tampak salah, atau tugas butuh dependensi baru, `sudo`, atau perubahan di luar repo ini.
- Perlu mengubah crate di repo inti `zevrigo` (itu tugas terpisah di repo inti).

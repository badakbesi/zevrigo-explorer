//! Aplikasi Zevrigo Explorer untuk Windows dan Android (TSK-M69, RENCANA_T11, pencipta 20 November 2026: cara A).
//!
//! Satu jendela Tauri 2 yang membuka explorer publik [`EXPLORER_URL`] (program MOD-14 di VPS, data dari jaringan demo regtest).
//! Aplikasi tidak menyimpan dan tidak mengirim data sendiri, dan tidak punya perintah IPC: halaman explorer adalah halaman web
//! biasa tanpa akses ke perangkat (tanpa capabilities). Jendela hanya boleh berpindah ke halaman di origin explorer
//! ([`allowed_url`]); tautan ke situs lain tidak dibuka. Tanpa internet, jendela menampilkan halaman galat WebView.
//!
//! - Desktop: program `zevrigo-explorer-app` (`main.rs`) memanggil [`try_run`].
//! - Android: titik masuk aplikasi adalah [`run`] (atribut `tauri::mobile_entry_point`).

#![forbid(unsafe_code)]

/// Host explorer publik demo regtest (`SUMBER_RESMI.md` repo inti; sejak 0.1.1 domain resmi `zevrigo.online`, DEC-42).
pub const EXPLORER_HOST: &str = "demo-explorer.zevrigo.online";

/// Halaman awal jendela, sama dengan `app.windows[0].url` di `tauri.conf.json`.
pub const EXPLORER_URL: &str = "https://demo-explorer.zevrigo.online/";

/// Apakah jendela boleh membuka `url`: hanya `https` ke [`EXPLORER_HOST`] di port bawaan, tanpa nama pengguna atau password
/// di tautan. Navigasi lain (situs lain, `http`, skema lain) ditolak dan jendela tetap di halaman sekarang.
#[must_use]
pub fn allowed_url(url: &tauri::Url) -> bool {
    url.scheme() == "https"
        && url.host_str() == Some(EXPLORER_HOST)
        && url.port().is_none()
        && url.username().is_empty()
        && url.password().is_none()
}

/// Menjalankan aplikasi sampai jendelanya ditutup.
///
/// # Errors
///
/// [`tauri::Error`] jika jendela utama tidak ada di konfigurasi, atau jendela dan WebView gagal dibuat.
pub fn try_run() -> Result<(), tauri::Error> {
    tauri::Builder::default()
        .setup(setup)
        .run(tauri::generate_context!())
}

/// Titik masuk aplikasi Android (dan pemanggilan dari desktop tanpa kode keluar): seperti [`try_run`], galat dicatat ke
/// stderr (logcat di Android).
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    if let Err(error) = try_run() {
        eprintln!("zevrigo-explorer-app: {error}");
    }
}

/// Membuat jendela utama dari `tauri.conf.json` (`create: false`) dengan pemeriksa navigasi [`allowed_url`].
fn setup(app: &mut tauri::App) -> Result<(), Box<dyn std::error::Error>> {
    let config = app
        .config()
        .app
        .windows
        .first()
        .cloned()
        .ok_or("jendela utama tidak ada di tauri.conf.json")?;
    tauri::WebviewWindowBuilder::from_config(app.handle(), &config)?
        .on_navigation(allowed_url)
        .build()?;
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::{EXPLORER_HOST, EXPLORER_URL, allowed_url};

    fn allowed(text: &str) -> bool {
        allowed_url(&tauri::Url::parse(text).unwrap())
    }

    #[test]
    fn only_https_explorer_origin_is_allowed() {
        for ok in [
            EXPLORER_URL,
            "https://demo-explorer.zevrigo.online/tx/?id=abab",
            "https://demo-explorer.zevrigo.online:443/faucet/",
            "https://DEMO-EXPLORER.zevrigo.online/block/?h=1",
        ] {
            assert!(allowed(ok), "{ok}");
        }
        for bad in [
            "http://demo-explorer.zevrigo.online/",
            "https://demo-explorer.zevrigo.online:8443/",
            "https://demo-faucet.zevrigo.online/api/v1/faucet",
            "https://zevrigo.online/",
            "https://demo-explorer.zevrigo.online.example.com/",
            "https://example.com/demo-explorer.zevrigo.online",
            "https://user@demo-explorer.zevrigo.online/",
            "https://user:rahasia@demo-explorer.zevrigo.online/",
            "file:///etc/passwd",
            "javascript:alert(1)",
            "data:text/html,halo",
        ] {
            assert!(!allowed(bad), "{bad}");
        }
    }

    #[test]
    fn config_opens_explorer_window_created_by_setup() {
        let config = include_str!("../tauri.conf.json");
        assert!(EXPLORER_URL.contains(EXPLORER_HOST));
        assert!(
            config.contains(&format!("\"url\": \"{EXPLORER_URL}\"")),
            "{config}"
        );
        assert!(config.contains("\"create\": false"), "{config}");
        assert!(
            config.contains("\"identifier\": \"com.zevrigo.explorer\""),
            "{config}"
        );
    }
}

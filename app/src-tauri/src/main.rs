//! Program aplikasi Zevrigo Explorer untuk desktop (TSK-M69). Isi aplikasi ada di pustaka `zevrigo_explorer_app_lib` (juga
//! titik masuk Android).

#![forbid(unsafe_code)]
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::process::ExitCode;

fn main() -> ExitCode {
    match zevrigo_explorer_app_lib::try_run() {
        Ok(()) => ExitCode::SUCCESS,
        Err(error) => {
            eprintln!("zevrigo-explorer-app: {error}");
            ExitCode::FAILURE
        }
    }
}

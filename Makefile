# Zevrigo Explorer (MOD-14). Crate inti dan salinan randomx-rs dari ../zevrigo (AGENDA P3, P4).
.PHONY: fmt fmt-check lint check-forbidden check-randomx test deps check-all web-check

fmt:
	cargo fmt --all

fmt-check:
	cargo fmt --all -- --check

lint:
	cargo clippy --workspace --all-targets -- -D warnings

check-forbidden:
	bash scripts/check-forbidden.sh

test:
	cargo test --workspace

deps:
	cargo tree --workspace --depth 1 -e normal

# DEC-01 (AGENDA P4): randomx-rs wajib salinan ../zevrigo/vendor (salt "RandomZVRG\x01"), bukan paket crates.io.
check-randomx:
	@grep -q '^name = "randomx-rs"$$' Cargo.lock || { echo "randomx-rs tidak ada di Cargo.lock"; exit 1; }
	@if grep -A3 '^name = "randomx-rs"$$' Cargo.lock | grep -q '^source = '; then echo "randomx-rs BUKAN salinan vendor (DEC-01)"; exit 1; fi
	@echo "randomx-rs: salinan ../zevrigo/vendor (DEC-01)"

check-all: fmt-check lint check-forbidden check-randomx test

# Antarmuka web (DEC-26): npm ci tanpa skrip pasang, typecheck, test, next build (static export ke web/out).
web-check:
	cd web && npm ci --ignore-scripts --no-audit --no-fund && npm run check

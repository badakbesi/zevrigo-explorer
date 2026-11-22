import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

// Q182 (TSK-M72): penjaga tampilan HP. `npm run test` dijalankan dari folder web.
const read = (file: string) => readFileSync(path.join(process.cwd(), file), 'utf8');

describe('tampilan HP (Q182)', () => {
  it('memakai viewport-fit=cover dan jarak aman layar', () => {
    expect(read('app/layout.tsx')).toContain("viewportFit: 'cover'");
    const header = read('components/explorer/header.tsx');
    expect(header).toContain('pt-[env(safe-area-inset-top)]');
    expect(header).toContain('env(safe-area-inset-bottom)');
    expect(read('components/ui/sheet.tsx')).toContain('env(safe-area-inset-top)');
    expect(read('app/globals.css')).toContain('env(safe-area-inset-left)');
  });

  it('menampilkan daftar blok sebagai kartu di layar sempit', () => {
    for (const page of ['app/page.tsx', 'app/blocks/page.tsx']) {
      const source = read(page);
      expect(source).toContain('<BlockRowsView');
      expect(source).not.toContain('<Table>');
    }
    const shared = read('components/explorer/shared.tsx');
    expect(shared).toContain('export function BlockRowsView');
    expect(shared).toContain('<ul className="sm:hidden');
    expect(shared).toContain('<div className="hidden sm:block">');
  });
});

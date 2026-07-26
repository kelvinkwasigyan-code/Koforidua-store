import { NextResponse } from 'next/server';
import { execSync } from 'child_process';

export async function GET() {
  try {
    const cwd = process.cwd();
    const status = execSync('git status --short', { cwd, encoding: 'utf-8' });
    const log = execSync('git log -n 1 --oneline', { cwd, encoding: 'utf-8' });

    return NextResponse.json({
      success: true,
      status: status || 'Clean working tree (All changes committed)',
      latestCommit: log,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || String(error) }, { status: 500 });
  }
}

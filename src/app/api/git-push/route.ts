import { NextResponse } from 'next/server';
import { execSync } from 'child_process';

export async function GET() {
  try {
    const cwd = process.cwd();
    
    // Stage all changes
    execSync('git add .', { cwd });

    // Commit changes
    try {
      execSync('git commit -m "Update Joerich Phones & Accessories features, UI enhancements, and admin portal"', { cwd });
    } catch (e: any) {
      console.log('Commit info (nothing to commit or already committed):', e?.message);
    }

    // Push to remote repository
    const pushResult = execSync('git push', { cwd, encoding: 'utf-8' });

    return NextResponse.json({
      success: true,
      message: 'Successfully pushed all changes to GitHub!',
      output: pushResult,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error?.message || String(error),
    }, { status: 500 });
  }
}

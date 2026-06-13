// Temporary stub — replaced in Phase 3 redesign.
// Static site served from /public/index.html during migration.
import { redirect } from 'next/navigation';
export default function Page() {
  redirect('/index.html');
}

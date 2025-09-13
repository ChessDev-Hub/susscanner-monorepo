import { useState } from "react";
import { scan } from "./api";
import "./index.css";

export default function App() {
  const [u, setU] = useState("");
  const [data, setData] = useState<any>(null);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [showWarn, setShowWarn] = useState(true);

  async function go() {
    setErr(null); setBusy(true); setData(null);
    try {
      const res = await scan(u.trim());
      setData(res);
    } catch (e: any) {
      setErr(e.message ?? "Scan failed");
    } finally {
      setBusy(false);
    }
  }

  const stat = (label: string, value: string | number) => (
    <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm shadow-sm">
      <div className="text-sm text-gray-200">{label}</div>
      <div className="mt-1 text-xl font-semibold text-white">{value}</div>
    </div>
  );

  return (
    <div className="min-h-full text-white">
      {/* Beta warning banner */}
      {showWarn && (
        <div
          role="alert"
          className="sticky top-0 z-50 border-b border-red-700 bg-red-600 text-white"
        >
          <div className="mx-auto flex max-w-5xl items-start gap-3 px-6 py-3">
            <span className="mt-[2px] inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-white/20 text-xs font-bold">
              !
            </span>
            <p className="text-sm leading-5">
              <strong>Warning:</strong> This app is <strong>beta</strong>. Results are
              experimental and <strong>not reliable</strong>.
            </p>
            <button
              aria-label="Dismiss warning"
              className="ml-auto rounded-md px-2 py-1 text-white/80 hover:text-white hover:bg-white/10"
              onClick={() => setShowWarn(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-black/30 backdrop-blur-sm">
        <div className="mx-auto max-w-5xl px-6 py-4">
          <h1 className="text-2xl font-bold tracking-tight">ChessDev-Hub SusScanner</h1>
          <p className="text-white/80">Sus Scanner UI</p>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-5xl px-6 py-8">
        <div className="rounded-2xl bg-white/90 p-6 shadow text-gray-900">
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={u}
              onChange={(e) => setU(e.target.value)}
              placeholder="Enter username…"
              className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
            <button
              onClick={go}
              disabled={!u.trim() || busy}
              className="rounded-xl bg-indigo-600 px-5 py-2 font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              {busy ? "Scanning…" : "Scan"}
            </button>
          </div>

          {err && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
              {err}
            </div>
          )}

          {data && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-900">Summary</h2>
              <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stat(
                  "Recent Win Rate",
                  `${((data.recent_wins / Math.max(1, data.recent_games)) * 100).toFixed(1)}%`
                )}
                {stat("Tournament WR", `${(data.tourn_win_rate * 100).toFixed(1)}%`)}
                {stat("Non-Tournament WR", `${(data.non_tourn_win_rate * 100).toFixed(1)}%`)}
                {stat("WR Gap", `${(data.wr_gap * 100).toFixed(1)} pp`)}
              </div>

              <div className="mt-6">
                <h3 className="mb-2 text-sm font-medium text-gray-900">
                  Raw Response
                </h3>
                <pre className="max-h-96 overflow-auto rounded-xl bg-gray-900 p-4 text-gray-100">
{JSON.stringify(data, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="mt-10 pb-10 text-center text-sm text-white/80">
        © ChessDev
      </footer>
    </div>
  );
}

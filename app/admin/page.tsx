"use client";

import { useEffect, useState } from "react";
import { supabase, type WaitlistEntry } from "../../lib/supabase";

export default function AdminPage() {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);

  // Simple password gate (not for production — just a quick admin view)
  const ADMIN_PASS = process.env.NEXT_PUBLIC_ADMIN_PASS || "SvLk!@dm1n#2026$Cm";

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASS) setAuthed(true);
  };

  useEffect(() => {
    if (!authed) return;
    fetchEntries();
  }, [authed]);

  const fetchEntries = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("waitlist")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setEntries(data);
    setLoading(false);
  };

  const exportCSV = () => {
    const headers = ["id", "name", "email", "phone", "type", "city", "language", "created_at"];
    const rows = entries.map((e) =>
      headers.map((h) => `"${(e as any)[h] ?? ""}"`).join(",")
    );
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `servelink-waitlist-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0F1E2A] flex items-center justify-center px-4">
        <form onSubmit={handleAuth} className="bg-[#1a2e3e] rounded-2xl p-8 w-full max-w-sm border border-white/10">
          <h1 className="text-xl font-bold text-white mb-6 text-center">ServeLink Admin</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#E85D04] mb-4"
            autoFocus
          />
          <button
            type="submit"
            className="w-full rounded-xl bg-[#E85D04] px-4 py-3 text-white font-semibold hover:bg-[#c44e03] transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  const emailCount = entries.filter((e) => e.type === "email").length;
  const phoneCount = entries.filter((e) => e.type === "phone").length;

  return (
    <div className="min-h-screen bg-[#0F1E2A] text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold">ServeLink Waitlist</h1>
            <p className="text-white/50 text-sm mt-1">Admin dashboard</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={fetchEntries}
              className="rounded-xl bg-white/10 border border-white/20 px-4 py-2 text-sm font-medium hover:bg-white/20 transition-colors"
            >
              Refresh
            </button>
            <button
              onClick={exportCSV}
              className="rounded-xl bg-[#1B6B7B] px-4 py-2 text-sm font-medium hover:bg-[#155a68] transition-colors"
            >
              Export CSV
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-[#1a2e3e] rounded-xl border border-white/10 p-5 text-center">
            <div className="text-3xl font-bold text-[#E85D04]">{entries.length}</div>
            <div className="text-sm text-white/50 mt-1">Total Signups</div>
          </div>
          <div className="bg-[#1a2e3e] rounded-xl border border-white/10 p-5 text-center">
            <div className="text-3xl font-bold text-[#1B6B7B]">{emailCount}</div>
            <div className="text-sm text-white/50 mt-1">Email</div>
          </div>
          <div className="bg-[#1a2e3e] rounded-xl border border-white/10 p-5 text-center">
            <div className="text-3xl font-bold text-[#4CAF50]">{phoneCount}</div>
            <div className="text-sm text-white/50 mt-1">Phone</div>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-16 text-white/40">Loading...</div>
        ) : entries.length === 0 ? (
          <div className="text-center py-16 text-white/40">
            <div className="text-4xl mb-4">📋</div>
            <p>No signups yet</p>
          </div>
        ) : (
          <div className="bg-[#1a2e3e] rounded-xl border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left px-4 py-3 text-white/50 font-medium">#</th>
                    <th className="text-left px-4 py-3 text-white/50 font-medium">Name</th>
                    <th className="text-left px-4 py-3 text-white/50 font-medium">Contact</th>
                    <th className="text-left px-4 py-3 text-white/50 font-medium">Type</th>
                    <th className="text-left px-4 py-3 text-white/50 font-medium">Lang</th>
                    <th className="text-left px-4 py-3 text-white/50 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry, i) => (
                    <tr key={entry.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3 text-white/30">{i + 1}</td>
                      <td className="px-4 py-3">{entry.name || "—"}</td>
                      <td className="px-4 py-3">
                        {entry.type === "email" ? (
                          <span className="text-[#1B6B7B]">{entry.email}</span>
                        ) : (
                          <span className="text-[#4CAF50]">+{entry.phone}</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                          entry.type === "email"
                            ? "bg-[#1B6B7B]/20 text-[#1B6B7B]"
                            : "bg-[#4CAF50]/20 text-[#4CAF50]"
                        }`}>
                          {entry.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-white/50">{entry.language?.toUpperCase()}</td>
                      <td className="px-4 py-3 text-white/50">
                        {entry.created_at
                          ? new Date(entry.created_at).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

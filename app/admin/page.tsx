"use client";

import { useEffect, useState } from "react";
import { supabase, type WaitlistEntry, type TestimonialEntry } from "../../lib/supabase";

const ADMIN_PASS = "ServeLink@Admin2026";

type Tab = "waitlist" | "testimonials";

export default function AdminPage() {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<Tab>("waitlist");

  const handleAuth = () => {
    if (password === ADMIN_PASS) {
      setAuthed(true);
      setError("");
    } else {
      setError("Wrong password");
    }
  };

  useEffect(() => {
    if (!authed) return;
    fetchEntries();
    fetchTestimonials();
  }, [authed]);

  const fetchEntries = async () => {
    setLoading(true);
    try {
      const { data, error: dbErr } = await supabase
        .from("waitlist")
        .select("*")
        .order("created_at", { ascending: false });

      if (!dbErr && data) setEntries(data);
    } catch {
      // Supabase not configured yet
    }
    setLoading(false);
  };

  const fetchTestimonials = async () => {
    try {
      const { data, error: dbErr } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

      if (!dbErr && data) setTestimonials(data);
    } catch {
      // Supabase not configured yet
    }
  };

  const approveTestimonial = async (id: string) => {
    await supabase.from("testimonials").update({ approved: true }).eq("id", id);
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, approved: true } : t))
    );
  };

  const deleteTestimonial = async (id: string) => {
    await supabase.from("testimonials").delete().eq("id", id);
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
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

  // ── Login screen ──
  if (!authed) {
    return (
      <div style={{
        minHeight: "100vh", backgroundColor: "#0F1E2A",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "16px",
      }}>
        <div style={{
          backgroundColor: "#1a2e3e", borderRadius: "16px", padding: "32px",
          width: "100%", maxWidth: "400px", border: "1px solid rgba(255,255,255,0.1)",
        }}>
          <h1 style={{ fontSize: "20px", fontWeight: "bold", color: "#fff", textAlign: "center", marginBottom: "24px" }}>
            🔒 ServeLink Admin
          </h1>
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(""); }}
            onKeyDown={(e) => e.key === "Enter" && handleAuth()}
            placeholder="Enter admin password"
            autoFocus
            style={{
              width: "100%", borderRadius: "12px", backgroundColor: "rgba(255,255,255,0.1)",
              border: error ? "2px solid #EF4444" : "1px solid rgba(255,255,255,0.2)",
              padding: "12px 16px", color: "#fff", fontSize: "16px",
              marginBottom: "8px", outline: "none", boxSizing: "border-box",
            }}
          />
          {error && (
            <p style={{ color: "#EF4444", fontSize: "13px", marginBottom: "8px" }}>{error}</p>
          )}
          <button
            onClick={handleAuth}
            style={{
              width: "100%", borderRadius: "12px", backgroundColor: "#E85D04",
              padding: "12px", color: "#fff", fontWeight: "600", fontSize: "16px",
              border: "none", cursor: "pointer", marginTop: "8px",
            }}
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  // ── Dashboard ──
  const emailCount = entries.filter((e) => e.type === "email").length;
  const phoneCount = entries.filter((e) => e.type === "phone").length;
  const pendingCount = testimonials.filter((t) => !t.approved).length;
  const approvedCount = testimonials.filter((t) => t.approved).length;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0F1E2A", color: "#fff" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px 16px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", marginBottom: "24px" }}>
          <div>
            <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>ServeLink Admin</h1>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", marginTop: "4px" }}>Dashboard</p>
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={() => { fetchEntries(); fetchTestimonials(); }}
              style={{
                borderRadius: "12px", backgroundColor: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)", padding: "8px 16px",
                color: "#fff", fontSize: "14px", cursor: "pointer",
              }}
            >
              ↻ Refresh
            </button>
            {tab === "waitlist" && (
              <button
                onClick={exportCSV}
                style={{
                  borderRadius: "12px", backgroundColor: "#1B6B7B",
                  border: "none", padding: "8px 16px",
                  color: "#fff", fontSize: "14px", cursor: "pointer",
                }}
              >
                📥 Export CSV
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "4px", marginBottom: "24px", backgroundColor: "#1a2e3e", borderRadius: "12px", padding: "4px" }}>
          {([
            { key: "waitlist" as Tab, label: `Waitlist (${entries.length})` },
            { key: "testimonials" as Tab, label: `Testimonials (${testimonials.length})` },
          ]).map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              style={{
                flex: 1, borderRadius: "10px", padding: "10px 16px",
                fontSize: "14px", fontWeight: "600", cursor: "pointer",
                border: "none", transition: "all 0.2s",
                backgroundColor: tab === t.key ? "#E85D04" : "transparent",
                color: tab === t.key ? "#fff" : "rgba(255,255,255,0.5)",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── WAITLIST TAB ── */}
        {tab === "waitlist" && (
          <>
            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "32px" }}>
              {[
                { label: "Total Signups", value: entries.length, color: "#E85D04" },
                { label: "Email", value: emailCount, color: "#1B6B7B" },
                { label: "Phone", value: phoneCount, color: "#4CAF50" },
              ].map((stat) => (
                <div key={stat.label} style={{
                  backgroundColor: "#1a2e3e", borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.1)", padding: "20px", textAlign: "center",
                }}>
                  <div style={{ fontSize: "32px", fontWeight: "bold", color: stat.color }}>{stat.value}</div>
                  <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", marginTop: "4px" }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Table */}
            {loading ? (
              <div style={{ textAlign: "center", padding: "64px 0", color: "rgba(255,255,255,0.4)" }}>Loading...</div>
            ) : entries.length === 0 ? (
              <div style={{ textAlign: "center", padding: "64px 0", color: "rgba(255,255,255,0.4)" }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>📋</div>
                <p>No signups yet. Connect Supabase to start collecting waitlist entries.</p>
              </div>
            ) : (
              <div style={{
                backgroundColor: "#1a2e3e", borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.1)", overflow: "hidden",
              }}>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", fontSize: "14px", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                        {["#", "Name", "Contact", "Type", "Lang", "Date"].map((h) => (
                          <th key={h} style={{ textAlign: "left", padding: "12px 16px", color: "rgba(255,255,255,0.5)", fontWeight: "500" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {entries.map((entry, i) => (
                        <tr key={entry.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                          <td style={{ padding: "12px 16px", color: "rgba(255,255,255,0.3)" }}>{i + 1}</td>
                          <td style={{ padding: "12px 16px" }}>{entry.name || "—"}</td>
                          <td style={{ padding: "12px 16px", color: entry.type === "email" ? "#1B6B7B" : "#4CAF50" }}>
                            {entry.type === "email" ? entry.email : `+${entry.phone}`}
                          </td>
                          <td style={{ padding: "12px 16px" }}>
                            <span style={{
                              display: "inline-block", padding: "2px 8px", borderRadius: "999px", fontSize: "12px", fontWeight: "500",
                              backgroundColor: entry.type === "email" ? "rgba(27,107,123,0.2)" : "rgba(76,175,80,0.2)",
                              color: entry.type === "email" ? "#1B6B7B" : "#4CAF50",
                            }}>
                              {entry.type}
                            </span>
                          </td>
                          <td style={{ padding: "12px 16px", color: "rgba(255,255,255,0.5)" }}>{entry.language?.toUpperCase()}</td>
                          <td style={{ padding: "12px 16px", color: "rgba(255,255,255,0.5)" }}>
                            {entry.created_at
                              ? new Date(entry.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
                              : "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}

        {/* ── TESTIMONIALS TAB ── */}
        {tab === "testimonials" && (
          <>
            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "32px" }}>
              {[
                { label: "Total Submitted", value: testimonials.length, color: "#E85D04" },
                { label: "Approved", value: approvedCount, color: "#4CAF50" },
                { label: "Pending", value: pendingCount, color: "#FBBF24" },
              ].map((stat) => (
                <div key={stat.label} style={{
                  backgroundColor: "#1a2e3e", borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.1)", padding: "20px", textAlign: "center",
                }}>
                  <div style={{ fontSize: "32px", fontWeight: "bold", color: stat.color }}>{stat.value}</div>
                  <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", marginTop: "4px" }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {testimonials.length === 0 ? (
              <div style={{ textAlign: "center", padding: "64px 0", color: "rgba(255,255,255,0.4)" }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>💬</div>
                <p>No testimonials submitted yet.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {testimonials.map((t) => (
                  <div
                    key={t.id}
                    style={{
                      backgroundColor: "#1a2e3e", borderRadius: "12px",
                      border: `1px solid ${t.approved ? "rgba(76,175,80,0.3)" : "rgba(255,255,255,0.1)"}`,
                      padding: "20px",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", flexWrap: "wrap" }}>
                      <div style={{ flex: 1, minWidth: "200px" }}>
                        {/* Header row */}
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", flexWrap: "wrap" }}>
                          <span style={{ fontWeight: "600", fontSize: "15px" }}>{t.name}</span>
                          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px" }}>
                            {t.role === "provider" ? "Provider" : "Client"} — {t.city}
                          </span>
                          <span style={{
                            display: "inline-block", padding: "2px 8px", borderRadius: "999px", fontSize: "11px", fontWeight: "600",
                            backgroundColor: t.approved ? "rgba(76,175,80,0.2)" : "rgba(251,191,36,0.2)",
                            color: t.approved ? "#4CAF50" : "#FBBF24",
                          }}>
                            {t.approved ? "Approved" : "Pending"}
                          </span>
                        </div>
                        {/* Stars */}
                        <div style={{ marginBottom: "8px" }}>
                          {Array.from({ length: 5 }).map((_, j) => (
                            <span key={j} style={{ color: j < t.stars ? "#E85D04" : "rgba(255,255,255,0.15)", fontSize: "14px" }}>★</span>
                          ))}
                        </div>
                        {/* Message */}
                        <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "14px", lineHeight: "1.5" }}>
                          &ldquo;{t.message}&rdquo;
                        </p>
                        {/* Date */}
                        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px", marginTop: "8px" }}>
                          {t.created_at
                            ? new Date(t.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })
                            : "—"}
                        </p>
                      </div>
                      {/* Actions */}
                      <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                        {!t.approved && (
                          <button
                            onClick={() => t.id && approveTestimonial(t.id)}
                            style={{
                              borderRadius: "10px", backgroundColor: "#4CAF50",
                              border: "none", padding: "8px 16px",
                              color: "#fff", fontSize: "13px", fontWeight: "600", cursor: "pointer",
                            }}
                          >
                            ✓ Approve
                          </button>
                        )}
                        <button
                          onClick={() => t.id && deleteTestimonial(t.id)}
                          style={{
                            borderRadius: "10px", backgroundColor: "rgba(239,68,68,0.15)",
                            border: "1px solid rgba(239,68,68,0.3)", padding: "8px 16px",
                            color: "#EF4444", fontSize: "13px", fontWeight: "600", cursor: "pointer",
                          }}
                        >
                          ✕ Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

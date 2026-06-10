"use client";

import { useState } from "react";
import { PageHero } from "@/components/public/ui/PageHero";
import { enviarContacto } from "@/lib/actions/contacto.actions";

const INFO = [
  { icon: "📍", label: "Dirección", value: "Av. O'Higgins #208 con Lo Bascuñán, Quilicura" },
  { icon: "📻", label: "Frecuencia", value: "107.7 FM" },
  { icon: "📞", label: "Teléfono", value: "+56 9 7477 3659" },
  { icon: "✉️", label: "Email", value: "radioeclipsefm@hotmail.com" },
  { icon: "🕐", label: "Horario", value: "Lunes a Viernes · 09:00 – 18:00" },
];

export default function ContactoPage() {
  const [form, setForm] = useState({ nombre: "", email: "", asunto: "", mensaje: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await enviarContacto(form);

    if (result.success) {
      setSent(true);
    } else {
      setError(result.error ?? "Error al enviar el mensaje.");
    }
    setLoading(false);
  }

  const inputStyle = {
    background: "rgba(8,4,26,0.6)",
    border: "1px solid rgba(124,58,237,0.2)",
  };

  return (
    <>
      <PageHero
        breadcrumb="Contacto"
        titleWhite="Escríbenos"
        titleYellow="Estamos Aquí"
        subtitle="Cuéntanos tu idea, propuesta o simplemente salúdanos. Siempre es un gusto escucharte."
      />

      <section className="py-14 md:py-20 px-6 bg-space-deep">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 md:gap-14">
          {/* Info */}
          <div>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl text-white tracking-wide mb-6">Información de Contacto</h2>
            <div className="flex flex-col gap-4 mb-8">
              {INFO.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
                    style={{ background: "rgba(232,212,77,0.1)", border: "1px solid rgba(232,212,77,0.2)" }}
                  >{item.icon}</div>
                  <div>
                    <p className="text-[10px] text-gray-mid uppercase tracking-widest">{item.label}</p>
                    <p className="text-gray-soft text-sm mt-0.5">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mapa placeholder */}
            <div
              className="w-full rounded-xl overflow-hidden flex items-center justify-center"
              style={{
                height: "180px",
                background: "linear-gradient(135deg, rgba(21,10,53,0.8), rgba(8,4,26,0.9))",
                border: "1px solid rgba(124,58,237,0.15)",
              }}
            >
              <div className="text-center">
                <span className="text-4xl block mb-2">🗺️</span>
                <p className="text-gray-mid text-xs">Quilicura · Santiago · Chile</p>
                <p className="text-gray-dark text-[11px] mt-1">Eclipse FM 107.7</p>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div>
            {sent ? (
              <div
                className="rounded-2xl p-8 flex flex-col items-center justify-center text-center min-h-[400px]"
                style={{ background: "rgba(21,10,53,0.5)", border: "1px solid rgba(124,58,237,0.15)" }}
              >
                <span className="text-5xl mb-4">✅</span>
                <h3 className="font-display text-2xl text-white tracking-wide mb-3">¡Mensaje enviado!</h3>
                <p className="text-gray-soft text-sm leading-relaxed">
                  Gracias por contactarnos. Te responderemos a la brevedad a <span className="text-yellow-DEFAULT">{form.email}</span>.
                </p>
                <button
                  onClick={() => { setForm({ nombre: "", email: "", asunto: "", mensaje: "" }); setSent(false); }}
                  className="mt-6 text-xs text-gray-mid hover:text-yellow-DEFAULT transition-colors"
                >
                  Enviar otro mensaje →
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl p-6 sm:p-8 flex flex-col gap-4"
                style={{ background: "rgba(21,10,53,0.5)", border: "1px solid rgba(124,58,237,0.15)" }}
              >
                <h3 className="font-display text-xl sm:text-2xl text-white tracking-wide">Envíanos un mensaje</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] text-gray-mid uppercase tracking-widest">Nombre</label>
                    <input
                      name="nombre"
                      value={form.nombre}
                      onChange={handleChange}
                      required
                      placeholder="Tu nombre"
                      className="rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-dark focus:outline-none focus:ring-1 focus:ring-purple-DEFAULT"
                      style={inputStyle}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] text-gray-mid uppercase tracking-widest">Email</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="tu@email.com"
                      className="rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-dark focus:outline-none focus:ring-1 focus:ring-purple-DEFAULT"
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] text-gray-mid uppercase tracking-widest">Asunto</label>
                  <select
                    name="asunto"
                    value={form.asunto}
                    onChange={handleChange}
                    required
                    className="rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-DEFAULT"
                    style={inputStyle}
                  >
                    <option value="" disabled>Selecciona un motivo</option>
                    <option value="publicidad">Publicidad / Auspicios</option>
                    <option value="propuesta">Propuesta de programa</option>
                    <option value="prensa">Prensa / Periodismo</option>
                    <option value="general">Consulta general</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] text-gray-mid uppercase tracking-widest">Mensaje</label>
                  <textarea
                    name="mensaje"
                    value={form.mensaje}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Escribe tu mensaje aquí..."
                    className="rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-dark focus:outline-none focus:ring-1 focus:ring-purple-DEFAULT resize-none"
                    style={inputStyle}
                  />
                </div>

                {error && (
                  <p className="text-red-400 text-xs text-center">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-full font-bold text-space-black text-sm transition-opacity hover:opacity-90 disabled:opacity-60"
                  style={{ background: "linear-gradient(90deg,#E8D44D,#F5E878)" }}
                >
                  {loading ? "Enviando..." : "Enviar mensaje →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

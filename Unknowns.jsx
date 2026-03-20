import { useState, useRef, useCallback } from "react";

const LOGO_SRC = "data:image/png;base64,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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/2Q==";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Space+Mono:wght@400;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #080808;
    --bg2: #0f0f0f;
    --bg3: #141414;
    --card: #111111;
    --border: #1e1e1e;
    --gold: #c9a84c;
    --gold2: #e8c878;
    --gold-dim: rgba(201,168,76,0.12);
    --gold-glow: rgba(201,168,76,0.25);
    --text: #f0ede8;
    --text2: #888880;
    --text3: #444;
    --red: #ff3c3c;
    --font-display: 'Bebas Neue', sans-serif;
    --font-body: 'Cormorant Garamond', serif;
    --font-mono: 'Space Mono', monospace;
  }

  body { background: var(--bg); color: var(--text); font-family: var(--font-body); min-height: 100vh; }

  .app { min-height: 100vh; background: var(--bg); position: relative; overflow-x: hidden; }

  .app::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
    opacity: 0.5;
  }

  .header {
    position: relative;
    z-index: 10;
    padding: 28px 48px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    background: linear-gradient(180deg, rgba(8,8,8,0.98) 0%, rgba(8,8,8,0.9) 100%);
  }

  .logo-img {
    height: 72px;
    width: auto;
    object-fit: contain;
    filter: drop-shadow(0 0 12px rgba(201,168,76,0.4));
    transition: filter 0.3s ease;
  }
  .logo-img:hover { filter: drop-shadow(0 0 20px rgba(201,168,76,0.7)); }

  .header-right {
    text-align: right;
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--text3);
    letter-spacing: 0.2em;
    line-height: 2;
    text-transform: uppercase;
  }

  .main {
    position: relative;
    z-index: 1;
    padding: 48px;
    max-width: 1600px;
    margin: 0 auto;
  }

  .upload-zone {
    border: 1px solid var(--border);
    background: var(--bg2);
    border-radius: 2px;
    padding: 64px 48px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .upload-zone::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, var(--gold-dim) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .upload-zone:hover::before, .upload-zone.drag-over::before { opacity: 1; }

  .upload-zone:hover, .upload-zone.drag-over {
    border-color: var(--gold);
    box-shadow: 0 0 40px var(--gold-glow), inset 0 0 40px var(--gold-dim);
  }

  .upload-zone.drag-over { transform: scale(1.005); }

  .upload-logo { height: 56px; margin: 0 auto 24px; opacity: 0.5; display: block; filter: grayscale(0.3); }

  .upload-title { font-family: var(--font-display); font-size: 32px; letter-spacing: 0.1em; color: var(--text); margin-bottom: 8px; }
  .upload-sub { font-family: var(--font-body); font-size: 16px; color: var(--text2); font-style: italic; }
  .upload-hint { font-family: var(--font-mono); font-size: 10px; color: var(--text3); letter-spacing: 0.2em; margin-top: 24px; text-transform: uppercase; }

  .file-input { display: none; }

  .margin-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;
    flex-wrap: wrap;
    gap: 16px;
  }

  .margin-label { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.3em; color: var(--text2); text-transform: uppercase; }

  .toggle-group {
    display: flex;
    border: 1px solid var(--border);
    background: var(--bg2);
    border-radius: 2px;
    overflow: hidden;
  }

  .toggle-btn {
    padding: 12px 32px;
    font-family: var(--font-display);
    font-size: 20px;
    letter-spacing: 0.1em;
    color: var(--text2);
    background: transparent;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .toggle-btn.active { color: var(--bg); background: var(--gold); }
  .toggle-btn:not(.active):hover { color: var(--gold); background: var(--gold-dim); }

  .product-count { font-family: var(--font-mono); font-size: 10px; color: var(--text3); letter-spacing: 0.2em; text-transform: uppercase; }

  .catalog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2px;
  }

  .product-card {
    background: var(--card);
    border: 1px solid var(--border);
    position: relative;
    overflow: hidden;
    transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    animation: fadeUp 0.5s ease both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .product-card:hover {
    border-color: var(--gold);
    box-shadow: 0 0 30px var(--gold-glow);
    transform: translateY(-2px);
    z-index: 2;
  }

  .card-image {
    height: 180px;
    background: var(--bg3);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .card-image::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
  }

  .card-image-pattern {
    position: absolute;
    inset: 0;
    background-image: repeating-linear-gradient(
      45deg, transparent, transparent 20px,
      rgba(201,168,76,0.03) 20px, rgba(201,168,76,0.03) 21px
    );
  }

  .card-image-num {
    font-family: var(--font-display);
    font-size: 80px;
    color: rgba(201,168,76,0.08);
    position: relative;
    z-index: 1;
    letter-spacing: -0.05em;
    user-select: none;
  }

  .card-badge {
    position: absolute;
    top: 12px;
    right: 12px;
    background: var(--gold);
    color: var(--bg);
    font-family: var(--font-mono);
    font-size: 9px;
    padding: 4px 8px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    font-weight: 700;
    z-index: 2;
  }

  .card-body { padding: 24px; }

  .card-number { font-family: var(--font-mono); font-size: 9px; color: var(--text3); letter-spacing: 0.3em; margin-bottom: 8px; text-transform: uppercase; }
  .card-name { font-family: var(--font-display); font-size: 22px; letter-spacing: 0.05em; color: var(--text); line-height: 1.1; margin-bottom: 8px; }
  .card-desc { font-family: var(--font-body); font-size: 13px; color: var(--text2); line-height: 1.6; font-style: italic; margin-bottom: 16px; min-height: 40px; }

  .card-divider { height: 1px; background: var(--border); margin-bottom: 16px; }

  /* Pricing section - 3 rows */
  .card-prices { display: flex; flex-direction: column; gap: 10px; }

  .price-row { display: flex; align-items: center; justify-content: space-between; }

  .price-row-label { font-family: var(--font-mono); font-size: 9px; color: var(--text3); letter-spacing: 0.2em; text-transform: uppercase; }

  .price-lot { font-family: var(--font-mono); font-size: 12px; color: var(--text3); text-decoration: line-through; }

  .price-unit-base { font-family: var(--font-mono); font-size: 12px; color: var(--text2); }

  .price-sale-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(201,168,76,0.07);
    border: 1px solid rgba(201,168,76,0.2);
    padding: 8px 12px;
    margin-top: 4px;
  }

  .price-sale-label { font-family: var(--font-mono); font-size: 9px; color: var(--gold); letter-spacing: 0.2em; text-transform: uppercase; }
  .price-sale { font-family: var(--font-display); font-size: 28px; letter-spacing: 0.03em; color: var(--gold); line-height: 1; transition: all 0.3s ease; }

  .price-margin-badge {
    background: var(--gold);
    color: var(--bg);
    font-family: var(--font-mono);
    font-size: 8px;
    padding: 2px 6px;
    letter-spacing: 0.15em;
    font-weight: 700;
  }

  .loading-overlay { text-align: center; padding: 80px 48px; }
  .loading-ring { width: 60px; height: 60px; border: 2px solid var(--border); border-top-color: var(--gold); border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 32px; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .loading-logo { height: 52px; margin: 0 auto 24px; display: block; opacity: 0.6; }
  .loading-title { font-family: var(--font-display); font-size: 28px; letter-spacing: 0.1em; color: var(--text); margin-bottom: 8px; }
  .loading-sub { font-family: var(--font-body); font-style: italic; color: var(--text2); font-size: 16px; }
  .loading-dots { display: inline-flex; gap: 6px; margin-top: 24px; }
  .dot { width: 6px; height: 6px; background: var(--gold); border-radius: 50%; animation: pulse 1.4s ease infinite both; }
  .dot:nth-child(2) { animation-delay: 0.2s; }
  .dot:nth-child(3) { animation-delay: 0.4s; }
  @keyframes pulse { 0%, 80%, 100% { transform: scale(0.6); opacity: 0.3; } 40% { transform: scale(1); opacity: 1; } }

  .error-box { border: 1px solid var(--red); background: rgba(255,60,60,0.05); padding: 24px; margin-bottom: 32px; border-radius: 2px; }
  .error-title { font-family: var(--font-display); font-size: 20px; letter-spacing: 0.1em; color: var(--red); margin-bottom: 8px; }
  .error-msg { font-family: var(--font-body); font-size: 15px; color: var(--text2); font-style: italic; }

  .reset-btn {
    background: transparent;
    border: 1px solid var(--border);
    color: var(--text2);
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    padding: 10px 24px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .reset-btn:hover { border-color: var(--gold); color: var(--gold); background: var(--gold-dim); }

  .footer {
    border-top: 1px solid var(--border);
    padding: 20px 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 80px;
  }
  .footer-logo { height: 36px; opacity: 0.4; }
  .footer-note { font-family: var(--font-mono); font-size: 9px; color: var(--text3); letter-spacing: 0.2em; text-transform: uppercase; }

  .deco-line { height: 1px; background: linear-gradient(to right, transparent, var(--gold), transparent); margin: 32px 0; opacity: 0.3; }

  @media (max-width: 768px) {
    .header { padding: 20px 16px; }
    .logo-img { height: 52px; }
    .header-right { display: none; }
    .main { padding: 24px 16px; }
    .catalog-grid { grid-template-columns: 1fr; gap: 1px; }
    .footer { padding: 20px 16px; }
    .upload-zone { padding: 40px 24px; }
    .margin-bar { flex-direction: column; align-items: flex-start; }
  }
`;

export default function Unknowns() {
  const [products, setProducts] = useState([]);
  const [margin, setMargin] = useState(0.30);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef();

  const toBase64 = (file) =>
    new Promise((res, rej) => {
      const r = new FileReader();
      r.onload = () => res(r.result.split(",")[1]);
      r.onerror = () => rej(new Error("Error al leer el archivo"));
      r.readAsDataURL(file);
    });

  const extractProducts = async (file) => {
    setLoading(true);
    setError(null);
    setProducts([]);
    setFileName(file.name);
    try {
      const base64 = await toBase64(file);
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 2000,
          system: `Eres un extractor de catálogos de productos. Tu ÚNICA tarea es analizar el documento PDF y extraer todos los productos listados.
Responde ÚNICAMENTE con un JSON válido, sin texto adicional, sin explicaciones, sin bloques de código markdown.
El formato exacto debe ser: [{"nombre":"...","descripcion":"...","precioLote":0.00}]
- nombre: nombre del producto (string)
- descripcion: descripción breve (string, máx 120 caracteres)
- precioLote: precio numérico del lote sin símbolo de moneda (number) — es el precio tal como aparece en el PDF
Si no encuentras productos con precio, responde: []`,
          messages: [
            {
              role: "user",
              content: [
                { type: "document", source: { type: "base64", media_type: "application/pdf", data: base64 } },
                { type: "text", text: "Extrae todos los productos con nombre, descripción y precio del lote de este PDF. Responde solo con el array JSON." },
              ],
            },
          ],
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || "Error en la API de Anthropic");

      const raw = data.content.map((b) => b.text || "").join("").trim();
      const cleaned = raw.replace(/```json|```/g, "").trim();
      let parsed;
      try { parsed = JSON.parse(cleaned); } catch { throw new Error("La respuesta de la IA no fue un JSON válido. Intenta con otro PDF."); }
      if (!Array.isArray(parsed) || parsed.length === 0) throw new Error("No se encontraron productos con precio en el PDF. Verifica que el archivo contenga un catálogo de productos.");
      setProducts(parsed);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFile = (file) => {
    if (!file || file.type !== "application/pdf") { setError("Solo se aceptan archivos PDF."); return; }
    extractProducts(file);
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  }, []);

  const handleDrag = (e) => { e.preventDefault(); setDragOver(true); };
  const handleDragLeave = () => setDragOver(false);

  const fmt = (n) => `$${Number(n).toLocaleString("es-CO", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

  const reset = () => { setProducts([]); setError(null); setFileName(null); };

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <header className="header">
          <img src={LOGO_SRC} alt="Unknown's Outletshop" className="logo-img" />
          <div className="header-right">
            <div>Precios por unidad</div>
            <div>Catálogo PDF → Digital</div>
            <div>Outletshop ◆ 2025</div>
          </div>
        </header>

        <main className="main">
          {!loading && products.length === 0 && (
            <>
              {error && (
                <div className="error-box">
                  <div className="error-title">⚠ ERROR DE EXTRACCIÓN</div>
                  <div className="error-msg">{error}</div>
                </div>
              )}
              <div
                className={`upload-zone${dragOver ? " drag-over" : ""}`}
                onClick={() => fileRef.current.click()}
                onDrop={handleDrop}
                onDragOver={handleDrag}
                onDragLeave={handleDragLeave}
              >
                <img src={LOGO_SRC} alt="logo" className="upload-logo" />
                <div className="upload-title">SUBE TU CATÁLOGO</div>
                <div className="upload-sub">Arrastra tu PDF aquí o haz clic para seleccionar</div>
                <div className="upload-hint">◆ Solo archivos PDF · Los precios se dividen en 10 unidades · Powered by Claude AI</div>
                <input ref={fileRef} className="file-input" type="file" accept="application/pdf" onChange={(e) => handleFile(e.target.files[0])} />
              </div>
            </>
          )}

          {loading && (
            <div className="loading-overlay">
              <img src={LOGO_SRC} alt="logo" className="loading-logo" />
              <div className="loading-ring" />
              <div className="loading-title">ANALIZANDO CATÁLOGO</div>
              <div className="loading-sub">Claude está extrayendo los productos de <em>"{fileName}"</em></div>
              <div className="loading-dots">
                <div className="dot" /><div className="dot" /><div className="dot" />
              </div>
            </div>
          )}

          {products.length > 0 && (
            <>
              <div className="margin-bar">
                <div>
                  <div className="margin-label">◆ Catálogo: {fileName}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                  <button className="reset-btn" onClick={reset}>← Nuevo PDF</button>
                  <span className="product-count">{products.length} productos · precio por unidad (lote ÷ 10)</span>
                  <div>
                    <div className="margin-label" style={{ marginBottom: 6 }}>Ganancia por unidad</div>
                    <div className="toggle-group">
                      <button className={`toggle-btn${margin === 0.30 ? " active" : ""}`} onClick={() => setMargin(0.30)}>+30%</button>
                      <button className={`toggle-btn${margin === 0.50 ? " active" : ""}`} onClick={() => setMargin(0.50)}>+50%</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="deco-line" />

              <div className="catalog-grid">
                {products.map((p, i) => {
                  const precioUnidad = p.precioLote / 10;
                  const precioVenta = precioUnidad * (1 + margin);
                  return (
                    <div key={i} className="product-card" style={{ animationDelay: `${i * 0.06}s` }}>
                      <div className="card-image">
                        <div className="card-image-pattern" />
                        <div className="card-image-num">{String(i + 1).padStart(2, "0")}</div>
                        <div className="card-badge">x10 uds</div>
                      </div>
                      <div className="card-body">
                        <div className="card-number">Ítem #{String(i + 1).padStart(3, "0")}</div>
                        <div className="card-name">{p.nombre}</div>
                        <div className="card-desc">{p.descripcion}</div>
                        <div className="card-divider" />
                        <div className="card-prices">
                          <div className="price-row">
                            <span className="price-row-label">Precio lote (PDF)</span>
                            <span className="price-lot">{fmt(p.precioLote)}</span>
                          </div>
                          <div className="price-row">
                            <span className="price-row-label">Costo por unidad</span>
                            <span className="price-unit-base">{fmt(precioUnidad)}</span>
                          </div>
                          <div className="price-sale-row">
                            <div>
                              <div className="price-sale-label">Venta por unidad</div>
                              <div className="price-sale">{fmt(precioVenta)}</div>
                            </div>
                            <div className="price-margin-badge">+{margin === 0.30 ? "30" : "50"}%</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </main>

        <footer className="footer">
          <img src={LOGO_SRC} alt="Unknown's Outletshop" className="footer-logo" />
          <div className="footer-note">◆ Powered by Claude AI · Catálogo Inteligente</div>
        </footer>
      </div>
    </>
  );
}

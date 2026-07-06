import re

# 1. FIX INTERACTIVE DIAGRAM MOBILE LAYOUT
diagram_path = "/Users/karolbohdanowicz/my-ai-agents/scharfer-redesign/src/components/InteractiveDiagram.tsx"
with open(diagram_path, 'r') as f:
    content = f.read()

# Replace the mobile render block
mobile_render_start = "  // Render Mobile Version\n  if (isMobile) {\n    return ("
mobile_render_end = "    );\n  }"

new_mobile_render = """  // Render Mobile Version
  if (isMobile) {
    return (
      <div style={{ width: '100%', padding: '10px 15px', boxSizing: 'border-box' }}>
        {/* Proportional scaled drawing container */}
        <div style={{ 
          position: 'relative', 
          width: '100%', 
          aspectRatio: '760 / 260',
          background: 'transparent', 
          marginBottom: '20px',
        }}>
          {/* Zasilacz image scaled properly */}
          <img 
            src="/scharfer/assets/40012.png" 
            alt="Zasilacz Scharfer" 
            style={{ 
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100%', 
              height: 'auto', 
              display: 'block',
              filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.15))',
              pointerEvents: 'none'
            }} 
          />

          {/* Render numbered hotspots exactly proportionally to PC */}
          {features.map((f, idx) => {
            if (idx === 6) return null; // Skip if needed, but PC has it, let's keep all
            // PC Image width=760, centered at x=700 (so left=320)
            // PC Image center y=280, we use a 260px high slice centered at 280 (so top=150)
            const leftPct = ((f.x2 - 320) / 760) * 100;
            const topPct = ((f.y2 - 150) / 260) * 100;
            return (
              <div 
                key={idx}
                style={{
                  position: 'absolute',
                  left: `${leftPct}%`,
                  top: `${topPct}%`,
                  width: '28px',
                  height: '28px',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 10,
                  background: 'var(--c-red)',
                  color: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.85rem',
                  fontWeight: 900,
                  border: '2px solid white',
                  boxShadow: '0 3px 8px rgba(220,38,38,0.6)'
                }}
              >
                {idx + 1}
              </div>
            );
          })}
        </div>

        {/* Feature descriptions list (bloczki) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {features.map((f, idx) => (
            <div key={idx} style={{ background: 'white', border: '1px solid #f1f5f9', borderRadius: '10px', padding: '15px', display: 'flex', gap: '15px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
              <div style={{ flexShrink: 0, width: '28px', height: '28px', background: 'var(--c-red)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 800 }}>
                {idx + 1}
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--c-heading)', margin: '0 0 4px 0', fontFamily: 'Outfit, sans-serif' }}>
                  {f.title}
                </h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--c-text)', margin: 0, lineHeight: 1.45 }}>
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }"""

# A bit hacky string slice extraction
start_idx = content.find(mobile_render_start)
end_idx = content.find(mobile_render_end) + len(mobile_render_end)
if start_idx != -1 and end_idx != -1:
    content = content[:start_idx] + new_mobile_render + content[end_idx:]
    with open(diagram_path, 'w') as f:
        f.write(content)
    print("Updated InteractiveDiagram.tsx")
else:
    print("Could not find mobile render block in InteractiveDiagram.tsx")


# 2. FIX HERO ICONS (DESKTOP)
desktop_page_path = "/Users/karolbohdanowicz/my-ai-agents/scharfer-redesign/src/app/(desktop)/page.tsx"
with open(desktop_page_path, 'r') as f:
    desktop_content = f.read()

# Desktop replace styling of trust items
desktop_old = """style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.8)', padding: '10px 15px', borderRadius: '12px', border: '1px solid rgba(220, 38, 38, 0.1)' }}"""
desktop_new = """style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#ffffff', padding: '12px 18px', borderRadius: '12px', border: '2px solid rgba(220, 38, 38, 0.2)', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}"""
desktop_content = desktop_content.replace(desktop_old, desktop_new)

# Values
desktop_content = desktop_content.replace("fontSize: '1.2rem', fontWeight: 800", "fontSize: '1.5rem', fontWeight: 900")
desktop_content = desktop_content.replace("fontSize: '0.75rem', fontWeight: 700", "fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px'")
# SVG box size 36x36 -> 42x42
desktop_content = desktop_content.replace("width: '36px', height: '36px'", "width: '42px', height: '42px'")

with open(desktop_page_path, 'w') as f:
    f.write(desktop_content)
print("Updated desktop page.tsx")


# 3. FIX HERO ICONS (MOBILE)
mobile_page_path = "/Users/karolbohdanowicz/my-ai-agents/scharfer-redesign/src/app/(mobile)/mobile/page.tsx"
with open(mobile_page_path, 'r') as f:
    mobile_content = f.read()

mobile_old = """style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.95)', padding: '12px 8px', borderRadius: '12px', border: '1px solid rgba(220, 38, 38, 0.15)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}"""
mobile_new = """style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', background: '#ffffff', padding: '14px 8px', borderRadius: '12px', border: '2px solid rgba(220, 38, 38, 0.2)', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}"""
mobile_content = mobile_content.replace(mobile_old, mobile_new)

mobile_content = mobile_content.replace("fontSize: '1.2rem', fontWeight: 800", "fontSize: '1.4rem', fontWeight: 900")
mobile_content = mobile_content.replace("fontSize: '0.75rem', fontWeight: 700", "fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase'")

# SVG Box size 32x32 -> 38x38
mobile_content = mobile_content.replace("width: '32px', height: '32px'", "width: '38px', height: '38px'")

with open(mobile_page_path, 'w') as f:
    f.write(mobile_content)
print("Updated mobile page.tsx")


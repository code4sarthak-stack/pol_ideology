import math
import struct
import zlib
import os

def save_png(width, height, pixel_buffer, out_file):
    # pixel_buffer is list or bytearray of [r, g, b, a] for each pixel
    raw_rows = bytearray()
    row_bytes = width * 4
    for y in range(height):
        raw_rows.append(0)  # filter type 0
        start = y * row_bytes
        raw_rows.extend(pixel_buffer[start:start + row_bytes])

    def chunk(tag, data):
        return (struct.pack(">I", len(data)) +
                tag +
                data +
                struct.pack(">I", zlib.crc32(tag + data) & 0xffffffff))

    png = b"\x89PNG\r\n\x1a\n"
    ihdr_data = struct.pack(">IIBBBBB", width, height, 8, 6, 0, 0, 0)
    png += chunk(b"IHDR", ihdr_data)
    compressed = zlib.compress(bytes(raw_rows), level=6)
    png += chunk(b"IDAT", compressed)
    png += chunk(b"IEND", b"")

    with open(out_file, "wb") as f:
        f.write(png)
    print(f"Saved {out_file} ({width}x{height})")


def render_template_1(w=1024, h=1024, out_path="logo_template_1.png"):
    buf = bytearray(w * h * 4)
    cx, cy = w / 2, h / 2
    
    # Pre-render
    for y in range(h):
        for x in range(w):
            idx = (y * w + x) * 4
            # Background white / subtle off-white
            dx = x - cx
            dy = y - cy
            dist = math.hypot(dx, dy)
            
            # Default white background
            r, g, b, a = 255, 255, 255, 255

            # Outer subtle circle ring at dist = 380, width 3
            if abs(dist - 380) < 2.5:
                # ring
                alpha = max(0.0, 1.0 - abs(dist - 380)/2.5) * 0.4
                r = int(r * (1 - alpha) + 79 * alpha)
                g = int(g * (1 - alpha) + 70 * alpha)
                b = int(b * (1 - alpha) + 229 * alpha)
            
            # Subtle crosshairs: |dx| < 1.5 or |dy| < 1.5 within dist < 410
            if (abs(dx) < 1.5 or abs(dy) < 1.5) and dist < 410 and dist > 40:
                dot_mod = (int(dist) // 16) % 2
                if dot_mod == 0:
                    alpha = 0.35
                    r = int(r * (1 - alpha) + 148 * alpha)
                    g = int(g * (1 - alpha) + 163 * alpha)
                    b = int(b * (1 - alpha) + 184 * alpha)

            # Compass Star geometry
            # North tip (0, -320), South (0, 320), East (320, 0), West (-320, 0)
            # Center diamond points (-68, -68), etc.
            # We can check triangles:
            # North point:
            # Tri 1 (North Left): (0,0), (0, -320), (-64, -64)
            # Tri 2 (North Right): (0,0), (0, -320), (64, -64)
            # South point:
            # Tri 3 (South Left): (0,0), (0, 320), (-64, 64)
            # Tri 4 (South Right): (0,0), (0, 320), (64, 64)
            # East point:
            # Tri 5 (East Top): (0,0), (320, 0), (64, -64)
            # Tri 6 (East Bottom): (0,0), (320, 0), (64, 64)
            # West point:
            # Tri 7 (West Top): (0,0), (-320, 0), (-64, -64)
            # Tri 8 (West Bottom): (0,0), (-320, 0), (-64, 64)

            def in_tri(px, py, x1, y1, x2, y2, x3, y3):
                # Barycentric coordinates
                d = (y2 - y3)*(x1 - x3) + (x3 - x2)*(y1 - y3)
                if abs(d) < 1e-9: return False
                a_b = ((y2 - y3)*(px - x3) + (x3 - x2)*(py - y3)) / d
                b_b = ((y3 - y1)*(px - x3) + (x1 - x3)*(py - y3)) / d
                c_b = 1.0 - a_b - b_b
                return 0 <= a_b <= 1 and 0 <= b_b <= 1 and 0 <= c_b <= 1

            # Check facets
            if in_tri(dx, dy, 0, 0, 0, -320, -64, -64):
                # North Left: Bright Royal Indigo #6366f1
                r, g, b = 99, 102, 241
            elif in_tri(dx, dy, 0, 0, 0, -320, 64, -64):
                # North Right: Deep Royal Indigo #4338ca
                r, g, b = 67, 56, 202
            elif in_tri(dx, dy, 0, 0, 320, 0, 64, -64):
                # East Top: Radiant Gold #fbbf24
                r, g, b = 251, 191, 36
            elif in_tri(dx, dy, 0, 0, 320, 0, 64, 64):
                # East Bottom: Amber Gold #d97706
                r, g, b = 217, 119, 6
            elif in_tri(dx, dy, 0, 0, 0, 320, -64, 64):
                # South Left: Slate Blue #64748b
                r, g, b = 100, 116, 139
            elif in_tri(dx, dy, 0, 0, 0, 320, 64, 64):
                # South Right: Dark Slate #334155
                r, g, b = 51, 65, 85
            elif in_tri(dx, dy, 0, 0, -320, 0, -64, -64):
                # West Top: Pale Slate #cbd5e1
                r, g, b = 203, 213, 225
            elif in_tri(dx, dy, 0, 0, -320, 0, -64, 64):
                # West Bottom: Mid Slate #94a3b8
                r, g, b = 148, 163, 184

            # Center Pivot Pin
            if dist <= 42:
                # White ring
                r, g, b = 255, 255, 255
            if dist <= 36:
                # Indigo disc
                r, g, b = 79, 70, 229
            if dist <= 14:
                # Golden core
                r, g, b = 251, 191, 36

            buf[idx] = r
            buf[idx + 1] = g
            buf[idx + 2] = b
            buf[idx + 3] = a

    save_png(w, h, buf, out_path)


def render_template_5(w=1024, h=1024, out_path="logo_template_5.png"):
    buf = bytearray(w * h * 4)
    cx, cy = w / 2, h / 2 - 20
    
    for y in range(h):
        for x in range(w):
            idx = (y * w + x) * 4
            dx = x - cx
            dy = y - cy
            
            # Default white background
            r, g, b, a = 255, 255, 255, 255

            # Location Pin Shape
            # Head: circle at (0, -40), radius R = 280
            # Bottom tip extends to (0, 380) with tangent curves
            head_cy = -40
            head_dist = math.hypot(dx, dy - head_cy)
            
            in_pin = False
            # Check upper semi-circle
            if head_dist <= 280 and (dy - head_cy) <= 40:
                in_pin = True
            elif (dy - head_cy) > 40 and dy <= 380:
                # Tapering sides down to tip (0, 380)
                # Curve profile: half_width as function of dy
                t = (dy - 0) / 380.0
                t = max(0.0, min(1.0, t))
                # Bezier ease
                half_w = 280 * (1.0 - t**0.85)
                if abs(dx) <= half_w:
                    in_pin = True

            # Shadow at base
            base_dx = dx
            base_dy = y - (cy + 400)
            if math.hypot(base_dx / 120.0, base_dy / 25.0) <= 1.0:
                shadow_alpha = (1.0 - math.hypot(base_dx / 120.0, base_dy / 25.0)) * 0.15
                r = int(r * (1 - shadow_alpha) + 79 * shadow_alpha)
                g = int(g * (1 - shadow_alpha) + 70 * shadow_alpha)
                b = int(b * (1 - shadow_alpha) + 229 * shadow_alpha)

            if in_pin:
                # Indigo pin gradient from #4f46e5 to #312e81
                t_grad = (dy + 320) / 700.0
                t_grad = max(0.0, min(1.0, t_grad))
                r = int(79 * (1 - t_grad) + 49 * t_grad)
                g = int(70 * (1 - t_grad) + 46 * t_grad)
                b = int(229 * (1 - t_grad) + 129 * t_grad)

            # Circular Cutout inside the pin head
            cutout_dist = math.hypot(dx, dy - head_cy)
            if cutout_dist <= 150:
                # White interior
                r, g, b = 255, 255, 255

                # Dial ring inside cutout
                if abs(cutout_dist - 130) < 2.5:
                    r, g, b = 226, 232, 240
                
                # Crosshairs inside cutout
                if (abs(dx) < 1.5 or abs(dy - head_cy) < 1.5) and cutout_dist < 135 and cutout_dist > 25:
                    r, g, b = 203, 213, 225

                # Golden Compass Rose inside cutout
                star_dx = dx
                star_dy = dy - head_cy

                def in_tri(px, py, x1, y1, x2, y2, x3, y3):
                    d = (y2 - y3)*(x1 - x3) + (x3 - x2)*(y1 - y3)
                    if abs(d) < 1e-9: return False
                    a_b = ((y2 - y3)*(px - x3) + (x3 - x2)*(py - y3)) / d
                    b_b = ((y3 - y1)*(px - x3) + (x1 - x3)*(py - y3)) / d
                    c_b = 1.0 - a_b - b_b
                    return 0 <= a_b <= 1 and 0 <= b_b <= 1 and 0 <= c_b <= 1

                # North
                if in_tri(star_dx, star_dy, 0, 0, 0, -100, -24, -24):
                    r, g, b = 251, 191, 36  # Gold light
                elif in_tri(star_dx, star_dy, 0, 0, 0, -100, 24, -24):
                    r, g, b = 245, 158, 11  # Amber
                # East
                elif in_tri(star_dx, star_dy, 0, 0, 100, 0, 24, -24):
                    r, g, b = 245, 158, 11
                elif in_tri(star_dx, star_dy, 0, 0, 100, 0, 24, 24):
                    r, g, b = 217, 119, 6
                # South
                elif in_tri(star_dx, star_dy, 0, 0, 0, 100, -24, 24):
                    r, g, b = 203, 213, 225
                elif in_tri(star_dx, star_dy, 0, 0, 0, 100, 24, 24):
                    r, g, b = 148, 163, 184
                # West
                elif in_tri(star_dx, star_dy, 0, 0, -100, 0, -24, -24):
                    r, g, b = 226, 232, 240
                elif in_tri(star_dx, star_dy, 0, 0, -100, 0, -24, 24):
                    r, g, b = 203, 213, 225

                # Center pin dot
                c_dist = math.hypot(star_dx, star_dy)
                if c_dist <= 18:
                    r, g, b = 255, 255, 255
                if c_dist <= 12:
                    r, g, b = 79, 70, 229

            buf[idx] = r
            buf[idx + 1] = g
            buf[idx + 2] = b
            buf[idx + 3] = a

    save_png(w, h, buf, out_path)

if __name__ == "__main__":
    os.chdir("/Users/sarthak/pol_ideology/assets/img/logos")
    print("Rendering Template 1...")
    render_template_1(1024, 1024, "logo_template_1.png")
    print("Rendering Template 5...")
    render_template_5(1024, 1024, "logo_template_5.png")
    print("All done!")

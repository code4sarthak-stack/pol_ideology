import math
import struct
import zlib

def make_png(width, height, get_pixel_func, output_path):
    raw_data = bytearray()
    for y in range(height):
        raw_data.append(0)  # filter type 0 (None)
        for x in range(width):
            r, g, b, a = get_pixel_func(x, y, width, height)
            raw_data.extend([int(r), int(g), int(b), int(a)])
    
    def chunk(tag, data):
        return (struct.pack(">I", len(data)) +
                tag +
                data +
                struct.pack(">I", zlib.crc32(tag + data) & 0xffffffff))

    png = b"\x89PNG\r\n\x1a\n"
    ihdr_data = struct.pack(">IIBBBBB", width, height, 8, 6, 0, 0, 0)
    png += chunk(b"IHDR", ihdr_data)
    compressed = zlib.compress(bytes(raw_data), level=9)
    png += chunk(b"IDAT", compressed)
    png += chunk(b"IEND", b"")

    with open(output_path, "wb") as f:
        f.write(png)

print("PNG generator helper ready")

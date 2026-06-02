import struct, zlib, base64, os

def make_png(width, height, r, g, b, text=""):
    """Create a simple PNG with a solid color and some pattern."""
    def chunk(name, data):
        c = zlib.crc32(name + data) & 0xffffffff
        return struct.pack('>I', len(data)) + name + data + struct.pack('>I', c)
    
    ihdr = struct.pack('>IIBBBBB', width, height, 8, 2, 0, 0, 0)
    
    raw = b''
    for y in range(height):
        raw += b'\x00'
        for x in range(width):
            # Add gradient/pattern
            px = int(r * (0.7 + 0.3 * x/width))
            py = int(g * (0.7 + 0.3 * y/height))
            pz = int(b * (0.8 + 0.2 * ((x+y) % 20)/20))
            # Diagonal pattern
            if (x + y) % 40 < 2:
                px = min(255, px + 40)
                py = min(255, py + 40)
                pz = min(255, pz + 40)
            raw += bytes([min(255,px), min(255,py), min(255,pz)])
    
    compressed = zlib.compress(raw, 9)
    png = b'\x89PNG\r\n\x1a\n'
    png += chunk(b'IHDR', ihdr)
    png += chunk(b'IDAT', compressed)
    png += chunk(b'IEND', b'')
    return png

os.makedirs('public/images', exist_ok=True)

photos = [
    (30, 80, 200, "photo1"),
    (20, 60, 180, "photo2"),
    (15, 100, 220, "photo3"),
    (40, 70, 190, "photo4"),
    (25, 90, 210, "photo5"),
]

for r, g, b, name in photos:
    png = make_png(400, 300, r, g, b)
    with open(f'public/images/{name}.jpg', 'wb') as f:
        f.write(png)
    print(f"Created {name}.jpg ({len(png)} bytes)")

print("Done!")

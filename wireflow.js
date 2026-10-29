const DEFAULT_SOURCE = `wireflow
  chip mcu "ESP32" at 120,100 size 180x220
  chip imu "BMP280" at 520,100 size 150x130
  chip relay "12V Relay" at 520,300 size 180x100

  mcu.GPIO4 --> imu.SDA
  mcu.GPIO5 --> imu.SCL
  mcu.VCC --> imu.VCC
  mcu.GND --> imu.GND
  mcu.GPIO18 --> relay.COIL
end`;

const svg = document.getElementById('diagram');
const sourceEl = document.getElementById('source');
sourceEl.value = DEFAULT_SOURCE;

document.getElementById('renderBtn').addEventListener('click', () => {
  renderDiagram(sourceEl.value);
});

renderDiagram(DEFAULT_SOURCE);

function parseEndpoint(raw) {
  const match = raw.trim().match(/^([A-Za-z0-9_]+)(?:\.([A-Za-z0-9_]+))?$/);
  if (!match) return null;
  return { chipId: match[1], pin: match[2] || 'p' };
}

function parseDiagram(source) {
  const normalized = source.replace(/\r/g, '').trim();
  if (!normalized) {
    throw new Error('No diagram source provided.');
  }

  const lines = normalized.split(/\n+/).map((line) => line.trim()).filter(Boolean);
  const chips = [];
  const links = [];
  const chipMap = new Map();

  for (const line of lines) {
    if (line === 'wireflow' || line === 'end' || line.startsWith('//')) {
      continue;
    }

    if (line.startsWith('chip ')) {
      const match = line.match(/^chip\s+([A-Za-z0-9_]+)\s+(?:"([^"]+)"|([^\s]+))\s+at\s+(\d+)\s*,\s*(\d+)(?:\s+size\s+(\d+)x(\d+))?$/i);

      if (!match) {
        throw new Error(`Unsupported chip declaration: ${line}`);
      }

      const [, id, labelQuoted, labelPlain, x, y, width = '180', height = '100'] = match;
      const chip = {
        id,
        label: labelQuoted || labelPlain || id,
        x: Number(x),
        y: Number(y),
        width: Number(width),
        height: Number(height),
      };

      chips.push(chip);
      chipMap.set(chip.id, chip);
      continue;
    }

    if (line.startsWith('module ')) {
      const match = line.match(/^module\s+([A-Za-z0-9_]+)\s+(?:"([^"]+)"|([^\s]+))\s+at\s+(\d+)\s*,\s*(\d+)(?:\s+size\s+(\d+)x(\d+))?$/i);

      if (!match) {
        throw new Error(`Unsupported module declaration: ${line}`);
      }

      const [, id, labelQuoted, labelPlain, x, y, width = '220', height = '120'] = match;
      const chip = {
        id,
        label: labelQuoted || labelPlain || id,
        x: Number(x),
        y: Number(y),
        width: Number(width),
        height: Number(height),
      };

      chips.push(chip);
      chipMap.set(chip.id, chip);
      continue;
    }

    if (line.includes('-->')) {
      const [left, right] = line.split('-->').map((p) => p.trim());
      const start = parseEndpoint(left);
      const end = parseEndpoint(right);

      if (!start || !end) {
        throw new Error(`Unsupported connection: ${line}`);
      }

      links.push({ from: start, to: end });
    }
  }

  return { chips, links };
}

function renderDiagram(input) {
  try {
    const { chips, links } = parseDiagram(input);
    const width = 1200;
    const height = 700;

    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.innerHTML = '';

    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    defs.innerHTML = `
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="8.5" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" class="connection-arrow"></polygon>
      </marker>
    `;
    svg.appendChild(defs);

    const allPins = new Map();
    for (const link of links) {
      for (const endpoint of [link.from, link.to]) {
        const bucket = allPins.get(endpoint.chipId) || new Set();
        bucket.add(endpoint.pin);
        allPins.set(endpoint.chipId, bucket);
      }
    }

    for (const chip of chips) {
      const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      group.setAttribute('class', 'node');

      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', chip.x);
      rect.setAttribute('y', chip.y);
      rect.setAttribute('width', chip.width);
      rect.setAttribute('height', chip.height);
      rect.setAttribute('rx', '10');
      group.appendChild(rect);

      const title = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      title.setAttribute('x', chip.x + chip.width / 2);
      title.setAttribute('y', chip.y + 30);
      title.setAttribute('text-anchor', 'middle');
      title.textContent = chip.label;
      group.appendChild(title);

      const sub = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      sub.setAttribute('x', chip.x + chip.width / 2);
      sub.setAttribute('y', chip.y + 48);
      sub.setAttribute('text-anchor', 'middle');
      sub.setAttribute('class', 'subtext');
      sub.textContent = chip.id.toUpperCase();
      group.appendChild(sub);

      const pinNames = Array.from(allPins.get(chip.id) || []);
      pinNames.forEach((pin, index) => {
        const side = index % 2 === 0 ? 'left' : 'right';
        const px = side === 'left' ? chip.x - 16 : chip.x + chip.width + 16;
        const py = chip.y + 72 + (index * 22);

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', px);
        circle.setAttribute('cy', py);
        circle.setAttribute('r', 6);
        circle.setAttribute('class', 'pin');
        group.appendChild(circle);

        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', side === 'left' ? px - 14 : px + 14);
        label.setAttribute('y', py + 4);
        label.setAttribute('text-anchor', side === 'left' ? 'end' : 'start');
        label.setAttribute('class', 'pin-label');
        label.textContent = pin;
        group.appendChild(label);
      });

      svg.appendChild(group);
    }

    for (const link of links) {
      const fromChip = chips.find((chip) => chip.id === link.from.chipId);
      const toChip = chips.find((chip) => chip.id === link.to.chipId);

      if (!fromChip || !toChip) {
        continue;
      }

      const startX = fromChip.x + fromChip.width;
      const startY = fromChip.y + 72 + (() => {
        const pins = Array.from(allPins.get(fromChip.id) || []);
        const idx = pins.indexOf(link.from.pin);
        return idx >= 0 ? idx * 22 : 0;
      })();

      const endX = toChip.x;
      const endY = toChip.y + 72 + (() => {
        const pins = Array.from(allPins.get(toChip.id) || []);
        const idx = pins.indexOf(link.to.pin);
        return idx >= 0 ? idx * 22 : 0;
      })();

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      const dx = Math.max(30, Math.abs(endX - startX) * 0.45);
      const d = `M ${startX} ${startY} C ${startX + dx} ${startY}, ${endX - dx} ${endY}, ${endX} ${endY}`;
      path.setAttribute('d', d);
      path.setAttribute('class', 'connection');
      path.setAttribute('marker-end', 'url(#arrowhead)');
      svg.appendChild(path);
    }
  } catch (error) {
    console.error(error);
    svg.innerHTML = '';
    const message = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    message.setAttribute('x', 24);
    message.setAttribute('y', 52);
    message.setAttribute('fill', '#fca5a5');
    message.setAttribute('font-size', '18');
    message.setAttribute('font-family', 'sans-serif');
    message.textContent = `Parse error: ${error.message}`;
    svg.appendChild(message);
  }
}

sourceEl.addEventListener('input', () => {
  try {
    renderDiagram(sourceEl.value);
  } catch (error) {
    // ignore while typing until the user clicks render.
  }
});


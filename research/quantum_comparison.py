"""Educational, deterministic quantum-inspired comparison.

This is not a quantum computer and does not claim quantum advantage. It compares
one classical score with a simple bounded feature-map score on synthetic data.
"""
import csv, math, random
from pathlib import Path

SEED = 7
ROWS = 40
random.seed(SEED)
rows = []
for i in range(ROWS):
    failed_logins = random.randint(0, 8)
    file_change = random.randint(0, 1)
    label = 1 if failed_logins >= 5 or file_change else 0
    classical = 0.12 * failed_logins + 0.9 * file_change
    simulated_qml = math.sin(failed_logins / 4) ** 2 + 0.8 * file_change
    rows.append({'sample': i + 1, 'label': label, 'classical_score': round(classical, 4), 'simulated_qml_score': round(simulated_qml, 4)})

out = Path(__file__).resolve().parents[1] / 'evidence' / 'quantum-comparison.csv'
out.parent.mkdir(exist_ok=True)
with out.open('w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=rows[0].keys())
    writer.writeheader(); writer.writerows(rows)
print(f'Wrote {len(rows)} synthetic rows to {out}')
print('Limitation: this is a classical simulation with synthetic data; no quantum advantage is demonstrated.')

import React, { useMemo, useState } from 'react';

function normSInv(p) {
  if (p <= 0 || p >= 1) {
    throw new Error('p must be between 0 and 1');
  }

  const a1 = -39.6968302866538;
  const a2 = 220.946098424521;
  const a3 = -275.928510446969;
  const a4 = 138.357751867269;
  const a5 = -30.6647980661472;
  const a6 = 2.50662827745924;

  const b1 = -54.4760987982241;
  const b2 = 161.585836858041;
  const b3 = -155.698979859887;
  const b4 = 66.8013118877197;
  const b5 = -13.2806815528857;

  const c1 = -0.00778489400243029;
  const c2 = -0.322396458041136;
  const c3 = -2.40075827716184;
  const c4 = -2.54973253934373;
  const c5 = 4.37466414146497;
  const c6 = 2.93816398269878;

  const d1 = 0.00778469570904146;
  const d2 = 0.32246712907004;
  const d3 = 2.445134137143;
  const d4 = 3.75440866190742;

  const plow = 0.02425;
  const phigh = 1 - plow;

  let q;
  let r;

  if (p < plow) {
    q = Math.sqrt(-2 * Math.log(p));
    return (
      (((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
      ((((d1 * q + d2) * q + d3) * q + d4) * q + 1)
    );
  }

  if (phigh < p) {
    q = Math.sqrt(-2 * Math.log(1 - p));
    return -(
      (((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
      ((((d1 * q + d2) * q + d3) * q + d4) * q + 1)
    );
  }

  q = p - 0.5;
  r = q * q;

  return (
    (((((a1 * r + a2) * r + a3) * r + a4) * r + a5) * r + a6) * q /
    (((((b1 * r + b2) * r + b3) * r + b4) * r + b5) * r + 1)
  );
}

function estimateTricotSampleSize(effectSize, power = 0.95, alpha = 0.05) {
  const zAlpha = normSInv(1 - alpha / 2);
  const zPower = normSInv(power);

  const nPerGroup = (2 * Math.pow(zAlpha + zPower, 2)) / Math.pow(effectSize, 2);
  const totalMeasured = nPerGroup * 2;
  const totalRankingEquivalent = totalMeasured * 2;

  return Math.ceil(totalRankingEquivalent);
}

function cardStyle() {
  return {
    border: '1px solid var(--ifm-color-emphasis-300)',
    borderRadius: '14px',
    padding: '1.25rem',
    background: 'var(--ifm-background-surface-color)',
    boxShadow: 'var(--ifm-global-shadow-lw)',
    margin: '1rem 0',
  };
}

function gridStyle() {
  return {
    display: 'grid',
    gap: '1rem',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  };
}

function inputStyle() {
  return {
    width: '100%',
    padding: '0.65rem 0.8rem',
    borderRadius: '8px',
    border: '1px solid var(--ifm-color-emphasis-300)',
    background: 'var(--ifm-background-surface-color)',
    color: 'var(--ifm-font-color-base)',
  };
}

function labelStyle() {
  return {
    display: 'block',
    fontWeight: 600,
    marginBottom: '0.35rem',
  };
}

function mutedStyle() {
  return {
    color: 'var(--ifm-color-emphasis-700)',
    fontSize: '0.92rem',
  };
}

function resultBoxStyle() {
  return {
    border: '1px solid var(--ifm-color-emphasis-200)',
    borderRadius: '12px',
    padding: '1rem',
    background: 'var(--ifm-color-emphasis-0)',
  };
}

export function SampleSizeCalculator() {
  const [effectSize, setEffectSize] = useState(0.7);
  const [noptions, setNoptions] = useState(12);

  const samplesNeeded = useMemo(() => {
    return estimateTricotSampleSize(effectSize, 0.95, 0.05);
  }, [effectSize]);

  const replicatesPerOption = Math.max(30, Math.ceil(samplesNeeded / noptions));
  const nfarms = Math.ceil((noptions * replicatesPerOption) / 3);
  const nplots = nfarms * 3;

  return (
    <div style={cardStyle()}>
      <h4 style={{ marginTop: 0 }}>Interactive sample size calculator</h4>
      <p style={mutedStyle()}>
        Assumes a tricot design with blocks of size 3 and calculates the approximate
        sample size needed to detect a given Cohen’s d with 95% probability.
        This version does not include return rate.
      </p>

      <div style={gridStyle()}>
        <div>
          <label htmlFor="effectSize" style={labelStyle()}>
            Cohen’s d
          </label>
          <input
            id="effectSize"
            type="number"
            min="0.1"
            max="2"
            step="0.1"
            value={effectSize}
            onChange={(e) => setEffectSize(Number(e.target.value))}
            style={inputStyle()}
          />
          <div style={mutedStyle()}>
            0.7–1.0 for agronomic trials, 0.2–0.5 for consumer preference
          </div>
        </div>

        <div>
          <label htmlFor="noptions" style={labelStyle()}>
            Number of options
          </label>
          <input
            id="noptions"
            type="number"
            min="3"
            step="1"
            value={noptions}
            onChange={(e) => setNoptions(Number(e.target.value))}
            style={inputStyle()}
          />
          <div style={mutedStyle()}>
            Number of varieties or technologies being compared
          </div>
        </div>
      </div>

      <div style={{ ...gridStyle(), marginTop: '1rem' }}>
        {/*<div style={resultBoxStyle()}>
          <div style={mutedStyle()}>Approximate samples needed</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700 }}>{samplesNeeded}</div>
        </div>*/}

        <div style={resultBoxStyle()}>
          <div style={mutedStyle()}>Replicates per option (n)</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700 }}>{replicatesPerOption}</div>
        </div>

        <div style={resultBoxStyle()}>
          <div style={mutedStyle()}>Total number of participants needed</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700 }}>{nfarms}</div>
        </div>

       {/* <div style={resultBoxStyle()}>
          <div style={mutedStyle()}>Plots required</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700 }}>{nplots}</div>
        </div>*/}
      </div>

      <div style={{ marginTop: '1rem' }}>
        <div style={mutedStyle()}>Formulas used:</div>
        <ul>
          <li><code>Nplots = nfarms × 3 = noptions × n</code></li>
          <li><code>nfarms = (noptions × n) / 3</code></li>
          <li><code>n = (nfarms × 3) / noptions</code></li>
        </ul>
      </div>
    </div>
  );
}

export function SeedNeedsCalculator() {
  const [noptions, setNoptions] = useState(12);
  const [replicatesPerOption, setReplicatesPerOption] = useState(30);
  const [seedPerPlot, setSeedPerPlot] = useState(0.2);
  const [unit, setUnit] = useState('kg');
  const [bufferPercent, setBufferPercent] = useState(10);

  const nfarms = Math.ceil((noptions * replicatesPerOption) / 3);
  const nplots = nfarms * 3;
  const totalSeed = nplots * seedPerPlot;
  const totalSeedWithBuffer = totalSeed * (1 + bufferPercent / 100);

  return (
    <div style={cardStyle()}>
      <h4 style={{ marginTop: 0 }}>Interactive seed needs calculator</h4>
      <p style={mutedStyle()}>
        Assumes a tricot design with blocks of size 3. The units of “Seed quantity per plot”
        are the same as the calculated result.
      </p>

      <div style={gridStyle()}>
        <div>
          <label htmlFor="seed-noptions" style={labelStyle()}>
            Number of options
          </label>
          <input
            id="seed-noptions"
            type="number"
            min="3"
            step="1"
            value={noptions}
            onChange={(e) => setNoptions(Number(e.target.value))}
            style={inputStyle()}
          />
        </div>

        <div>
          <label htmlFor="replicatesPerOption" style={labelStyle()}>
            Replicates per option (n)
          </label>
          <input
            id="replicatesPerOption"
            type="number"
            min="1"
            step="1"
            value={replicatesPerOption}
            onChange={(e) => setReplicatesPerOption(Number(e.target.value))}
            style={inputStyle()}
          />
        </div>

        <div>
          <label htmlFor="seedPerPlot" style={labelStyle()}>
            Seed quantity per plot
          </label>
          <input
            id="seedPerPlot"
            type="number"
            min="0.0001"
            step="0.01"
            value={seedPerPlot}
            onChange={(e) => setSeedPerPlot(Number(e.target.value))}
            style={inputStyle()}
          />
        </div>

        <div>
          <label htmlFor="unit" style={labelStyle()}>
            Unit
          </label>
          <select
            id="unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            style={inputStyle()}
          >
            <option value="kg">kg</option>
            <option value="g">g</option>
            <option value="seeds">seeds</option>
            <option value="plants">plants</option>
            <option value="cuttings">cuttings</option>
          </select>
        </div>

        <div>
          <label htmlFor="bufferPercent" style={labelStyle()}>
            Buffer (%)
          </label>
          <input
            id="bufferPercent"
            type="number"
            min="0"
            step="1"
            value={bufferPercent}
            onChange={(e) => setBufferPercent(Number(e.target.value))}
            style={inputStyle()}
          />
        </div>
      </div>

      <div style={{ ...gridStyle(), marginTop: '1rem' }}>
        <div style={resultBoxStyle()}>
          <div style={mutedStyle()}>Total number of participants needed</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700 }}>{nfarms}</div>
        </div>

        <div style={resultBoxStyle()}>
          <div style={mutedStyle()}>Plots needed</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700 }}>{nplots}</div>
        </div>

        <div style={resultBoxStyle()}>
          <div style={mutedStyle()}>Total seed needed</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700 }}>
            {totalSeed.toLocaleString(undefined, { maximumFractionDigits: 2 })} {unit}
          </div>
        </div>

        <div style={resultBoxStyle()}>
          <div style={mutedStyle()}>Total with buffer</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700 }}>
            {totalSeedWithBuffer.toLocaleString(undefined, { maximumFractionDigits: 2 })} {unit}
          </div>
        </div>
      </div>
    </div>
  );
}
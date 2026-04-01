import React, { useMemo, useState } from 'react';

/**
 * Approximate inverse standard normal CDF.
 * Returns z such that P(Z <= z) = p for Z ~ N(0,1).
 */
function normSInv(p) {
  if (!Number.isFinite(p) || p <= 0 || p >= 1) {
    throw new Error('p must be a finite number between 0 and 1 (exclusive).');
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

  if (p > phigh) {
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

/**
 * Excel-based tricot sample size calculation from the uploaded workbook.
 *
 * Sheet logic:
 * B7  = IF(B3>1, B2*(B3-1)/(B2-1)/B2, 1/B2)
 * B8  = B2*(B2-1)/2
 * B9  = B4*(0.5+0.5/B8)
 * B10 = NORM.INV(1-B9/2,0,1) + NORM.INV(1-B5,0,1)
 * B11 = 0.5*NORMINV(1-B9/2,0,1)^2
 * B12 = ROUND((B10/B1)^2 + B11 + 0.4999, 0)
 * B13 = B12*B2
 * B14 = ROUND(B12/B7 + 0.499, 0)
 * B15 = B14*B3
 */
function estimateTricotFromExcel(effectSize, totalProducts, productsPerSubject = 3, alpha = 0.05, beta = 0.05) {
  if (!Number.isFinite(effectSize) || effectSize <= 0) {
    throw new Error('Effect size must be a positive number.');
  }
  if (!Number.isInteger(totalProducts) || totalProducts < 2) {
    throw new Error('Total number of products must be an integer of at least 2.');
  }
  if (!Number.isInteger(productsPerSubject) || productsPerSubject < 1) {
    throw new Error('Products per subject must be an integer of at least 1.');
  }
  if (!Number.isFinite(alpha) || alpha <= 0 || alpha >= 1) {
    throw new Error('Alpha must be between 0 and 1.');
  }
  if (!Number.isFinite(beta) || beta <= 0 || beta >= 1) {
    throw new Error('Beta must be between 0 and 1.');
  }

  // B7
  const effectivePairs =
    productsPerSubject > 1
      ? (totalProducts * (productsPerSubject - 1)) / (totalProducts - 1) / totalProducts
      : 1 / totalProducts;

  // B8
  const nTests = (totalProducts * (totalProducts - 1)) / 2;

  // B9
  const alphaBH = alpha * (0.5 + 0.5 / nTests);

  // B10
  const zAlpha = normSInv(1 - alphaBH / 2);
  const zBeta = normSInv(1 - beta);
  const fAlphaBeta = zAlpha + zBeta;

  // B11
  const guentherCorrection = 0.5 * Math.pow(zAlpha, 2);

  // B12
  const recordsPerProduct = Math.round(Math.pow(fAlphaBeta / effectSize, 2) + guentherCorrection + 0.4999);

  // B13
  const totalRecordsFullSeqMonadic = recordsPerProduct * totalProducts;

  // B14
  const totalConsumersNeeded = Math.round(recordsPerProduct / effectivePairs + 0.499);

  // B15
  const totalDataRecordsNeeded = totalConsumersNeeded * productsPerSubject;

  return {
    effectivePairs,
    nTests,
    alphaBH,
    fAlphaBeta,
    guentherCorrection,
    recordsPerProduct,
    totalRecordsFullSeqMonadic,
    totalConsumersNeeded,
    totalDataRecordsNeeded,
  };
}

function parsePositiveNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : null;
}

function parseIntegerAtLeast(value, min) {
  const n = Number(value);
  return Number.isInteger(n) && n >= min ? n : null;
}

function parseNumberAtLeast(value, min) {
  const n = Number(value);
  return Number.isFinite(n) && n >= min ? n : null;
}

function formatNumber(value, maxFractionDigits = 2) {
  if (!Number.isFinite(value)) return '—';
  return value.toLocaleString(undefined, { maximumFractionDigits: maxFractionDigits });
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

function inputStyle(hasError = false) {
  return {
    width: '100%',
    padding: '0.65rem 0.8rem',
    borderRadius: '8px',
    border: `1px solid ${
      hasError ? 'var(--ifm-color-danger)' : 'var(--ifm-color-emphasis-300)'
    }`,
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

function errorTextStyle() {
  return {
    color: 'var(--ifm-color-danger)',
    fontSize: '0.85rem',
    marginTop: '0.35rem',
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

function InputHint({ children, error = false }) {
  return <div style={error ? errorTextStyle() : mutedStyle()}>{children}</div>;
}

function ResultBox({ label, value, suffix = '' }) {
  return (
    <div style={resultBoxStyle()}>
      <div style={mutedStyle()}>{label}</div>
      <div style={{ fontSize: '1.8rem', fontWeight: 700 }}>
        {value}
        {suffix ? ` ${suffix}` : ''}
      </div>
    </div>
  );
}

export function SampleSizeCalculator() {
  const [effectSizeInput, setEffectSizeInput] = useState('0.7');
  const [noptionsInput, setNoptionsInput] = useState('12');

  const effectSize = parsePositiveNumber(effectSizeInput);
  const noptions = parseIntegerAtLeast(noptionsInput, 3);

  const calculation = useMemo(() => {
    if (effectSize === null || noptions === null) {
      return {
        effectivePairs: null,
        nTests: null,
        alphaBH: null,
        fAlphaBeta: null,
        guentherCorrection: null,
        recordsPerProduct: null,
        totalRecordsFullSeqMonadic: null,
        totalConsumersNeeded: null,
        totalDataRecordsNeeded: null,
      };
    }

    try {
      return estimateTricotFromExcel(effectSize, noptions, 3, 0.05, 0.05);
    } catch {
      return {
        effectivePairs: null,
        nTests: null,
        alphaBH: null,
        fAlphaBeta: null,
        guentherCorrection: null,
        recordsPerProduct: null,
        totalRecordsFullSeqMonadic: null,
        totalConsumersNeeded: null,
        totalDataRecordsNeeded: null,
      };
    }
  }, [effectSize, noptions]);

  const effectSizeError =
    effectSizeInput.trim() !== '' && effectSize === null
      ? 'Enter a positive number greater than 0.'
      : null;

  const noptionsError =
    noptionsInput.trim() !== '' && noptions === null
      ? 'Enter an integer of 3 or more.'
      : null;

  return (
    <div style={cardStyle()}>
      <h4 style={{ marginTop: 0 }}>Interactive sample size calculator</h4>
      <p style={mutedStyle()}>
        Uses the formulas from the Excel tricot sample size file, assuming 3 products
        per subject, alpha = 0.05, and beta = 0.05. This version does not include return rate.
      </p>

      <div style={gridStyle()}>
        <div>
          <label htmlFor="effectSize" style={labelStyle()}>
            Effect size to be detected
          </label>
          <input
            id="effectSize"
            type="number"
            min="0.1"
            max="2"
            step="0.1"
            inputMode="decimal"
            value={effectSizeInput}
            onChange={(e) => setEffectSizeInput(e.target.value)}
            style={inputStyle(Boolean(effectSizeError))}
          />
          {effectSizeError ? (
            <InputHint error>{effectSizeError}</InputHint>
          ) : (
            <InputHint>Example values: 0.7–1.0 for agronomic trials, 0.2–0.5 for consumer preference</InputHint>
          )}
        </div>

        <div>
          <label htmlFor="noptions" style={labelStyle()}>
            Total number of technologies to be tested
          </label>
          <input
            id="noptions"
            type="number"
            min="3"
            step="1"
            inputMode="numeric"
            value={noptionsInput}
            onChange={(e) => setNoptionsInput(e.target.value)}
            style={inputStyle(Boolean(noptionsError))}
          />
          {noptionsError ? (
            <InputHint error>{noptionsError}</InputHint>
          ) : (
            <InputHint>Number of varieties or technologies being compared</InputHint>
          )}
        </div>
      </div>

      <div style={{ ...gridStyle(), marginTop: '1rem' }}>
       {/*<ResultBox
          label="Replicates per option (n)"
          value={formatNumber(calculation.recordsPerProduct, 0)}
        />*/}

        <ResultBox
          label="Total number of participants needed"
          value={formatNumber(calculation.totalConsumersNeeded, 0)}
        />

        <ResultBox
          label="Plots required"
          value={formatNumber(calculation.totalDataRecordsNeeded, 0)}
        />
      </div>
    </div>
  );
}

export function SeedNeedsCalculator() {
  const [noptionsInput, setNoptionsInput] = useState('12');
  const [replicatesInput, setReplicatesInput] = useState('30');
  const [seedPerPlotInput, setSeedPerPlotInput] = useState('0.2');
  const [unit, setUnit] = useState('kg');
  const [bufferPercentInput, setBufferPercentInput] = useState('10');

  const noptions = parseIntegerAtLeast(noptionsInput, 3);
  const replicatesPerOption = parseIntegerAtLeast(replicatesInput, 1);
  const seedPerPlot = parsePositiveNumber(seedPerPlotInput);
  const bufferPercent = parseNumberAtLeast(bufferPercentInput, 0);

  const calculation = useMemo(() => {
    if (
      noptions === null ||
      replicatesPerOption === null ||
      seedPerPlot === null ||
      bufferPercent === null
    ) {
      return {
        nfarms: null,
        nplots: null,
        totalSeed: null,
        totalSeedWithBuffer: null,
      };
    }

    const nfarms = Math.ceil((noptions * replicatesPerOption) / 3);
    const nplots = nfarms * 3;
    const totalSeed = nplots * seedPerPlot;
    const totalSeedWithBuffer = totalSeed * (1 + bufferPercent / 100);

    return {
      nfarms,
      nplots,
      totalSeed,
      totalSeedWithBuffer,
    };
  }, [noptions, replicatesPerOption, seedPerPlot, bufferPercent]);

  const noptionsError =
    noptionsInput.trim() !== '' && noptions === null
      ? 'Enter an integer of 3 or more.'
      : null;

  const replicatesError =
    replicatesInput.trim() !== '' && replicatesPerOption === null
      ? 'Enter an integer of 1 or more.'
      : null;

  const seedPerPlotError =
    seedPerPlotInput.trim() !== '' && seedPerPlot === null
      ? 'Enter a positive number greater than 0.'
      : null;

  const bufferError =
    bufferPercentInput.trim() !== '' && bufferPercent === null
      ? 'Enter 0 or a positive number.'
      : null;

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
            inputMode="numeric"
            value={noptionsInput}
            onChange={(e) => setNoptionsInput(e.target.value)}
            style={inputStyle(Boolean(noptionsError))}
          />
          {noptionsError && <InputHint error>{noptionsError}</InputHint>}
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
            inputMode="numeric"
            value={replicatesInput}
            onChange={(e) => setReplicatesInput(e.target.value)}
            style={inputStyle(Boolean(replicatesError))}
          />
          {replicatesError && <InputHint error>{replicatesError}</InputHint>}
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
            inputMode="decimal"
            value={seedPerPlotInput}
            onChange={(e) => setSeedPerPlotInput(e.target.value)}
            style={inputStyle(Boolean(seedPerPlotError))}
          />
          {seedPerPlotError && <InputHint error>{seedPerPlotError}</InputHint>}
        </div>

        <div>
          <label htmlFor="unit" style={labelStyle()}>
            Unit
          </label>
          <select
            id="unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            style={inputStyle(false)}
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
            inputMode="decimal"
            value={bufferPercentInput}
            onChange={(e) => setBufferPercentInput(e.target.value)}
            style={inputStyle(Boolean(bufferError))}
          />
          {bufferError && <InputHint error>{bufferError}</InputHint>}
        </div>
      </div>

      <div style={{ ...gridStyle(), marginTop: '1rem' }}>
        <ResultBox
          label="Total number of participants needed"
          value={formatNumber(calculation.nfarms, 0)}
        />
        <ResultBox
          label="Plots needed"
          value={formatNumber(calculation.nplots, 0)}
        />
        <ResultBox
          label="Total seed needed"
          value={formatNumber(calculation.totalSeed, 2)}
          suffix={calculation.totalSeed !== null ? unit : ''}
        />
        <ResultBox
          label="Total with buffer"
          value={formatNumber(calculation.totalSeedWithBuffer, 2)}
          suffix={calculation.totalSeedWithBuffer !== null ? unit : ''}
        />
      </div>
    </div>
  );
}
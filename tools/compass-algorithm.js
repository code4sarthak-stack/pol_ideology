const path = require("path");

const ROOT = path.resolve(__dirname, "..");

// Ensure global window exists for results.js
if (!global.window) {
  global.window = {};
}
if (!global.window.QUIZ) {
  global.window.QUIZ = {};
}
require(path.join(ROOT, "assets/js/results.js"));

/**
 * Validates and computes exact 2D compass mapping for any ideology.
 * Uses ideoMap's 4-domain coordinate engine: [econ, social, civil, world].
 *
 * @param {string} slug - The ideology slug (e.g. 'authoritarian-nationalism')
 * @param {object} config - Grid dimensions and padding configuration
 * @returns {object} Compass data including verified coordinates, quadrant, and validation report
 */
function getCompassModel(slug, config = {}) {
  const {
    gridWidth = 720,
    gridHeight = 720,
    margin = 40,
    tolerancePx = 4
  } = config;

  const ideology = global.window.QUIZ.ideologies.find((i) => i.slug === slug);
  if (!ideology) {
    throw new Error(`[Compass Algorithm] Ideology with slug '${slug}' not found in results.js`);
  }

  const [econ, social, civil, world] = ideology.pos;

  // Determine standard quadrant
  let quadrantKey = "";
  let quadrantName = "";
  let quadrantCorner = "";

  if (civil >= 0) {
    if (econ >= 0) {
      quadrantKey = "auth-right";
      quadrantName = "Authoritarian Right";
      quadrantCorner = "cb-tr";
    } else {
      quadrantKey = "auth-left";
      quadrantName = "Authoritarian Left";
      quadrantCorner = "cb-tl";
    }
  } else {
    if (econ >= 0) {
      quadrantKey = "lib-right";
      quadrantName = "Libertarian Right";
      quadrantCorner = "cb-br";
    } else {
      quadrantKey = "lib-left";
      quadrantName = "Libertarian Left";
      quadrantCorner = "cb-bl";
    }
  }

  // Calculate coordinates
  const centerX = gridWidth / 2;
  const centerY = gridHeight / 2;
  const rangeX = centerX - margin;
  const rangeY = centerY - margin;

  const rawX = centerX + (econ / 100) * rangeX;
  const rawY = centerY - (civil / 100) * rangeY;

  const posX = Math.round(rawX);
  const posY = Math.round(rawY);

  // Assertion & Cross-check validations
  const checks = {
    xWithinBounds: posX >= margin && posX <= gridWidth - margin,
    yWithinBounds: posY >= margin && posY <= gridHeight - margin,
    xQuadrantMatch: econ >= 0 ? posX >= centerX : posX < centerX,
    yQuadrantMatch: civil >= 0 ? posY <= centerY : posY > centerY
  };

  const isValid = Object.values(checks).every(Boolean);
  if (!isValid) {
    console.error(`[Compass Cross-Check FAILED] for '${slug}':`, checks);
    throw new Error(`Compass coordinate verification failed for ${slug}`);
  }

  return {
    slug,
    title: ideology.en.title,
    emoji: ideology.emoji,
    pos: ideology.pos,
    econ,
    civil,
    social,
    world,
    quadrantKey,
    quadrantName,
    quadrantCorner,
    posX,
    posY,
    gridWidth,
    gridHeight,
    rangeX,
    rangeY,
    margin,
    validation: {
      checks,
      passed: true,
      timestamp: new Date().toISOString()
    }
  };
}

/**
 * Cross-checks a rendered pin against official results.js coordinates.
 */
function crossCheckPin(slug, renderedX, renderedY, tolerancePx = 25) {
  const model = getCompassModel(slug);
  const diffX = Math.abs(renderedX - model.posX);
  const diffY = Math.abs(renderedY - model.posY);

  const passed = diffX <= tolerancePx && diffY <= tolerancePx;

  return {
    slug,
    officialPos: model.pos,
    expected: { x: model.posX, y: model.posY },
    rendered: { x: renderedX, y: renderedY },
    diff: { x: diffX, y: diffY },
    passed,
    quadrant: model.quadrantName
  };
}

module.exports = {
  getCompassModel,
  crossCheckPin
};

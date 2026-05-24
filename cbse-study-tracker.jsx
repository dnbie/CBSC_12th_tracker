import React, { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "";
const SUPABASE_READY = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
const supabase = SUPABASE_READY ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

const SUBJECTS = {
  Mathematics: {
    color: "#2563eb",
    accent: "#dbeafe",
    icon: "∑",
    chapters: [
      {
        name: "Relations and Functions",
        concepts: [
          "Types of Relations (Reflexive, Symmetric, Transitive, Equivalence)",
          "One-to-One and Onto Functions",
          "Composite Functions and Inverse of a Function",
          "Binary Operations",
        ],
      },
      {
        name: "Inverse Trigonometric Functions",
        concepts: [
          "Domain, Range and Principal Value Branches",
          "Properties of Inverse Trigonometric Functions",
          "Solving Equations using Inverse Trig",
        ],
      },
      {
        name: "Matrices",
        concepts: [
          "Types of Matrices (Row, Column, Square, Diagonal, Identity, Zero)",
          "Operations on Matrices (Addition, Scalar Multiplication)",
          "Multiplication of Matrices",
          "Transpose, Symmetric and Skew-Symmetric Matrices",
          "Elementary Row/Column Operations",
          "Invertible Matrices",
        ],
      },
      {
        name: "Determinants",
        concepts: [
          "Determinant of a Square Matrix (up to 3×3)",
          "Properties of Determinants",
          "Minors and Cofactors",
          "Adjoint and Inverse of a Matrix",
          "Solving System of Linear Equations (Cramer's Rule)",
          "Consistency and Inconsistency of Systems",
        ],
      },
      {
        name: "Continuity and Differentiability",
        concepts: [
          "Continuity of a Function at a Point and on an Interval",
          "Differentiability and its relation with Continuity",
          "Derivatives of Composite Functions (Chain Rule)",
          "Derivatives of Implicit Functions",
          "Derivatives of Inverse Trigonometric Functions",
          "Exponential and Logarithmic Functions",
          "Logarithmic Differentiation",
          "Derivative of Parametric Functions",
          "Second Order Derivatives",
          "Mean Value Theorem (Rolle's and Lagrange's)",
        ],
      },
      {
        name: "Applications of Derivatives",
        concepts: [
          "Rate of Change of Quantities",
          "Increasing and Decreasing Functions",
          "Tangents and Normals",
          "Maxima and Minima (First & Second Derivative Test)",
          "Approximations using Differentials",
        ],
      },
      {
        name: "Integrals",
        concepts: [
          "Integration as Inverse of Differentiation",
          "Integration by Substitution",
          "Integration using Partial Fractions",
          "Integration by Parts",
          "Standard Integrals involving Trig, Exp, Log",
          "Definite Integrals as Limit of Sum",
          "Fundamental Theorem of Calculus",
          "Properties of Definite Integrals",
        ],
      },
      {
        name: "Applications of Integrals",
        concepts: [
          "Area under Simple Curves (Line, Parabola, Ellipse)",
          "Area between Two Curves",
        ],
      },
      {
        name: "Differential Equations",
        concepts: [
          "Order and Degree of a Differential Equation",
          "Formation of DE (eliminating arbitrary constants)",
          "Variable Separable Method",
          "Homogeneous Differential Equations",
          "Linear Differential Equations (First Order)",
        ],
      },
      {
        name: "Vector Algebra",
        concepts: [
          "Vectors and Scalars, Magnitude, Direction",
          "Types of Vectors (Zero, Unit, Collinear, Equal)",
          "Position Vector, Addition, Scalar Multiplication",
          "Section Formula",
          "Dot Product (Scalar Product) and Properties",
          "Cross Product (Vector Product) and Properties",
        ],
      },
      {
        name: "Three Dimensional Geometry",
        concepts: [
          "Direction Cosines and Direction Ratios",
          "Equation of a Line in 3D (Cartesian & Vector form)",
          "Angle between Two Lines",
          "Shortest Distance between Two Skew Lines",
          "Equation of a Plane (Different forms)",
          "Angle between Two Planes, Line & Plane",
          "Distance of a Point from a Plane",
        ],
      },
      {
        name: "Linear Programming",
        concepts: [
          "Mathematical Formulation of LPP",
          "Graphical Method (Corner Point, Iso-profit/cost Line)",
          "Feasible Region, Optimal Solution",
          "Bounded and Unbounded Solutions",
        ],
      },
      {
        name: "Probability",
        concepts: [
          "Conditional Probability",
          "Multiplication Theorem on Probability",
          "Independent Events",
          "Bayes' Theorem and its Applications",
          "Random Variable and its Probability Distribution",
          "Mean and Variance of Random Variable",
          "Bernoulli Trials and Binomial Distribution",
        ],
      },
    ],
  },
  Physics: {
    color: "#dc2626",
    accent: "#fee2e2",
    icon: "⚛",
    chapters: [
      {
        name: "Electric Charges and Fields",
        concepts: [
          "Coulomb's Law and Superposition Principle",
          "Electric Field and Field Lines",
          "Electric Dipole and Field due to Dipole",
          "Gauss's Theorem and Applications",
          "Continuous Charge Distributions",
        ],
      },
      {
        name: "Electrostatic Potential and Capacitance",
        concepts: [
          "Electric Potential and Potential Difference",
          "Equipotential Surfaces",
          "Potential due to Point Charge, Dipole, System of Charges",
          "Capacitors (Parallel Plate), Capacitance",
          "Combination of Capacitors (Series, Parallel)",
          "Energy Stored in a Capacitor",
          "Effect of Dielectric on Capacitance",
        ],
      },
      {
        name: "Current Electricity",
        concepts: [
          "Ohm's Law, Resistance, V-I Characteristics",
          "Drift Velocity, Mobility, Current Density",
          "Resistivity and its Temperature Dependence",
          "Kirchhoff's Laws and Applications",
          "Wheatstone Bridge and Metre Bridge",
          "Potentiometer – Principle and Applications",
        ],
      },
      {
        name: "Moving Charges and Magnetism",
        concepts: [
          "Biot-Savart Law and Applications",
          "Ampere's Circuital Law",
          "Force on a Moving Charge (Lorentz Force)",
          "Force on a Current-Carrying Conductor in B",
          "Torque on a Current Loop, Magnetic Dipole",
          "Moving Coil Galvanometer",
        ],
      },
      {
        name: "Magnetism and Matter",
        concepts: [
          "Bar Magnet as Magnetic Dipole",
          "Earth's Magnetism and Magnetic Elements",
          "Dia-, Para-, and Ferro-magnetic Substances",
          "Hysteresis Curve",
        ],
      },
      {
        name: "Electromagnetic Induction",
        concepts: [
          "Faraday's Laws of Electromagnetic Induction",
          "Lenz's Law and Conservation of Energy",
          "Motional EMF",
          "Self-Inductance and Mutual Inductance",
          "Eddy Currents",
        ],
      },
      {
        name: "Alternating Current",
        concepts: [
          "AC Voltage applied to R, L, C individually",
          "AC Voltage applied to Series LCR Circuit",
          "Resonance and Quality Factor",
          "Power in AC Circuits (Power Factor)",
          "Transformers",
        ],
      },
      {
        name: "Electromagnetic Waves",
        concepts: [
          "Displacement Current (Maxwell's contribution)",
          "Electromagnetic Spectrum",
          "Properties and Uses of EM Waves",
        ],
      },
      {
        name: "Ray Optics and Optical Instruments",
        concepts: [
          "Reflection and Refraction at Plane/Curved Surfaces",
          "Total Internal Reflection",
          "Lens Maker's Formula and Thin Lens Formula",
          "Power and Combination of Lenses",
          "Prism – Refraction and Dispersion",
          "Microscope and Telescope (Ray Diagrams)",
        ],
      },
      {
        name: "Wave Optics",
        concepts: [
          "Huygens Principle",
          "Interference – Young's Double Slit Experiment",
          "Diffraction – Single Slit",
          "Polarisation – Brewster's Law, Malus' Law",
        ],
      },
      {
        name: "Dual Nature of Radiation and Matter",
        concepts: [
          "Photoelectric Effect and Einstein's Equation",
          "Photon Theory of Light",
          "Matter Waves – de Broglie Hypothesis",
          "Davisson-Germer Experiment",
        ],
      },
      {
        name: "Atoms",
        concepts: [
          "Rutherford's Model and Alpha Scattering",
          "Bohr Model – Postulates, Energy Levels",
          "Hydrogen Spectrum",
          "Line Spectra of Hydrogen Atom",
        ],
      },
      {
        name: "Nuclei",
        concepts: [
          "Nuclear Size, Mass, Binding Energy",
          "Mass-Energy Equivalence",
          "Nuclear Fission and Fusion",
          "Radioactivity – Alpha, Beta, Gamma Decay",
          "Half-Life and Decay Law",
        ],
      },
      {
        name: "Semiconductor Electronics",
        concepts: [
          "Energy Bands (Conductor, Insulator, Semiconductor)",
          "Intrinsic and Extrinsic Semiconductors",
          "p-n Junction Diode (Forward & Reverse Bias)",
          "Diode as Rectifier (Half-wave, Full-wave)",
          "Zener Diode as Voltage Regulator",
          "Logic Gates (OR, AND, NOT, NAND, NOR)",
        ],
      },
    ],
  },
  Chemistry: {
    color: "#16a34a",
    accent: "#dcfce7",
    icon: "⚗",
    chapters: [
      {
        name: "The Solid State",
        concepts: [
          "Types of Solids (Amorphous, Crystalline)",
          "Crystal Lattice and Unit Cells",
          "Packing Efficiency (CCP, HCP, BCC)",
          "Calculations – Density of Unit Cell",
          "Imperfections in Solids (Point Defects)",
          "Electrical and Magnetic Properties",
        ],
      },
      {
        name: "Solutions",
        concepts: [
          "Types of Solutions, Concentration Units",
          "Raoult's Law and Ideal/Non-ideal Solutions",
          "Colligative Properties (RLVP, Elevation of BP, Depression of FP, Osmotic Pressure)",
          "Van't Hoff Factor and Abnormal Molar Mass",
        ],
      },
      {
        name: "Electrochemistry",
        concepts: [
          "Electrolytic and Galvanic Cells",
          "Nernst Equation and Cell Potential",
          "Conductance – Molar, Specific, Equivalent",
          "Kohlrausch's Law",
          "Electrolysis and Faraday's Laws",
          "Batteries (Primary, Secondary), Fuel Cells",
          "Corrosion",
        ],
      },
      {
        name: "Chemical Kinetics",
        concepts: [
          "Rate of Reaction, Factors Affecting Rate",
          "Rate Law, Order and Molecularity",
          "Integrated Rate Equations (Zero, First Order)",
          "Half-Life of a Reaction",
          "Arrhenius Equation and Activation Energy",
          "Collision Theory",
        ],
      },
      {
        name: "Surface Chemistry",
        concepts: [
          "Adsorption (Physisorption vs Chemisorption)",
          "Catalysis (Homogeneous, Heterogeneous, Enzyme)",
          "Colloids – Types, Properties, Applications",
          "Emulsions",
        ],
      },
      {
        name: "General Principles of Isolation of Elements",
        concepts: [
          "Principles of Extraction (Concentration, Reduction, Refining)",
          "Thermodynamic Principles (Ellingham Diagram)",
          "Electrochemical Principles",
          "Specific Extractions (Al, Cu, Zn, Fe)",
        ],
      },
      {
        name: "The p-Block Elements",
        concepts: [
          "Group 15 – Nitrogen Family (N₂, NH₃, HNO₃)",
          "Group 16 – Oxygen Family (O₃, SO₂, H₂SO₄)",
          "Group 17 – Halogens (Cl₂, HCl, Oxoacids)",
          "Group 18 – Noble Gases (Properties, XeF₂, XeF₄)",
          "Interhalogen Compounds",
        ],
      },
      {
        name: "The d- and f-Block Elements",
        concepts: [
          "General Properties of Transition Elements",
          "Electronic Configuration, Oxidation States",
          "Colour, Magnetic Properties, Catalytic Behaviour",
          "Important Compounds (KMnO₄, K₂Cr₂O₇)",
          "Lanthanoids and Actinoids",
        ],
      },
      {
        name: "Coordination Compounds",
        concepts: [
          "Werner's Theory and IUPAC Nomenclature",
          "Coordination Number, Ligands, Isomerism",
          "Bonding – Valence Bond Theory",
          "Crystal Field Theory (CFT)",
          "Applications of Coordination Compounds",
        ],
      },
      {
        name: "Haloalkanes and Haloarenes",
        concepts: [
          "Nomenclature and Nature of C-X Bond",
          "SN1 and SN2 Mechanisms",
          "Elimination Reactions (E1, E2)",
          "Reactions of Haloarenes (Nucleophilic Substitution)",
          "Polyhalogen Compounds (CHCl₃, CCl₄, DDT)",
        ],
      },
      {
        name: "Alcohols, Phenols and Ethers",
        concepts: [
          "Nomenclature, Physical Properties",
          "Preparation and Reactions of Alcohols",
          "Preparation and Reactions of Phenols",
          "Ethers – Preparation and Reactions",
          "Acidic Nature of Phenols vs Alcohols",
        ],
      },
      {
        name: "Aldehydes, Ketones and Carboxylic Acids",
        concepts: [
          "Nomenclature and Preparation Methods",
          "Nucleophilic Addition Reactions",
          "Aldol Condensation, Cannizzaro Reaction",
          "Carboxylic Acids – Acidity, Reactions",
          "Hell-Volhard-Zelinsky Reaction",
        ],
      },
      {
        name: "Amines",
        concepts: [
          "Classification, Nomenclature, Preparation",
          "Physical and Chemical Properties",
          "Basic Strength of Amines",
          "Diazonium Salts – Preparation and Reactions",
        ],
      },
      {
        name: "Biomolecules",
        concepts: [
          "Carbohydrates – Monosaccharides, Polysaccharides",
          "Proteins – Amino Acids, Structure of Proteins",
          "Enzymes and their Mechanism",
          "Nucleic Acids – DNA and RNA",
          "Vitamins and Hormones",
        ],
      },
      {
        name: "Polymers",
        concepts: [
          "Classification of Polymers",
          "Addition and Condensation Polymerisation",
          "Important Polymers (Nylon, Bakelite, Rubber, PVC)",
          "Biodegradable Polymers",
        ],
      },
      {
        name: "Chemistry in Everyday Life",
        concepts: [
          "Drugs and their Classification",
          "Drug-Target Interaction",
          "Chemicals in Food (Preservatives, Sweeteners)",
          "Cleansing Agents – Soaps and Detergents",
        ],
      },
    ],
  },
  "Computer Science": {
    color: "#9333ea",
    accent: "#f3e8ff",
    icon: "⌨",
    chapters: [
      {
        name: "Python Revision Tour",
        concepts: [
          "Data Types, Variables, Operators",
          "Control Flow (if-elif-else, loops)",
          "Strings – Operations, Methods, Slicing",
          "Lists – Creation, Methods, List Comprehension",
          "Tuples – Immutability, Operations",
          "Dictionaries – Methods, Iteration",
        ],
      },
      {
        name: "Functions",
        concepts: [
          "Types of Functions (Built-in, User-defined)",
          "Parameters and Arguments (Default, Keyword, Positional)",
          "Scope of Variables (Local, Global)",
          "Mutable/Immutable Arguments",
          "Recursion",
        ],
      },
      {
        name: "File Handling",
        concepts: [
          "Text Files – Reading, Writing, Appending",
          "Binary Files – Using pickle (dump, load)",
          "CSV Files – Reading and Writing using csv module",
          "File Modes and File Object Methods",
        ],
      },
      {
        name: "Data Structures",
        concepts: [
          "Stacks – Implementation using List",
          "Push, Pop, Peek, Display Operations",
          "Applications of Stacks",
          "Queues – Concept (not in syllabus for coding but theory)",
        ],
      },
      {
        name: "Exception Handling",
        concepts: [
          "try, except, finally, else blocks",
          "Built-in Exceptions",
          "Raising Exceptions",
        ],
      },
      {
        name: "Database Concepts and SQL",
        concepts: [
          "Relational Database Concepts (Table, Row, Column, Key)",
          "SQL – DDL (CREATE, ALTER, DROP)",
          "SQL – DML (INSERT, UPDATE, DELETE)",
          "SQL – SELECT with WHERE, ORDER BY, GROUP BY, HAVING",
          "Aggregate Functions (SUM, AVG, COUNT, MAX, MIN)",
          "Joins – Cartesian Product, Equi-Join",
        ],
      },
      {
        name: "Python-MySQL Connectivity",
        concepts: [
          "mysql.connector Module",
          "connect(), cursor(), execute(), fetchall()/fetchone()",
          "Parameterized Queries",
          "Inserting and Retrieving Data via Python",
        ],
      },
      {
        name: "Computer Networks",
        concepts: [
          "Network Types (LAN, MAN, WAN)",
          "Network Topologies (Star, Bus, Ring, Mesh, Tree)",
          "Transmission Media (Guided, Unguided)",
          "Network Devices (Hub, Switch, Router, Gateway, Modem)",
          "TCP/IP Protocol Stack",
          "Web Services – URL, Domain Name, Website, Web Browser",
        ],
      },
      {
        name: "Cyber Safety and Society",
        concepts: [
          "Cyber Crime – Hacking, Phishing, Identity Theft",
          "Cyber Law – IT Act Provisions",
          "E-Waste Management",
          "Digital Footprint and Net Etiquette",
          "Intellectual Property Rights",
        ],
      },
    ],
  },
};

// Status levels for concept understanding
const STATUS = {
  not_started: { label: "Not Started", color: "#94a3b8", bg: "#f1f5f9" },
  in_progress: { label: "Learning", color: "#f59e0b", bg: "#fef3c7" },
  understood: { label: "Understood", color: "#22c55e", bg: "#dcfce7" },
  mastered: { label: "Mastered", color: "#2563eb", bg: "#dbeafe" },
};

const STATUS_ORDER = ["not_started", "in_progress", "understood", "mastered"];

function getProgress(statuses, subjectKey) {
  let total = 0;
  let score = 0;
  const chapters = SUBJECTS[subjectKey].chapters;
  chapters.forEach((ch, ci) => {
    ch.concepts.forEach((_, coi) => {
      const key = `${subjectKey}-${ci}-${coi}`;
      const s = statuses[key] || "not_started";
      total++;
      if (s === "in_progress") score += 1;
      if (s === "understood") score += 2;
      if (s === "mastered") score += 3;
    });
  });
  return { total, score, pct: Math.round((score / (total * 3)) * 100) };
}

function getChapterProgress(statuses, subjectKey, chapterIdx) {
  const ch = SUBJECTS[subjectKey].chapters[chapterIdx];
  let total = ch.concepts.length;
  let score = 0;
  ch.concepts.forEach((_, coi) => {
    const key = `${subjectKey}-${chapterIdx}-${coi}`;
    const s = statuses[key] || "not_started";
    if (s === "in_progress") score += 1;
    if (s === "understood") score += 2;
    if (s === "mastered") score += 3;
  });
  return { total, score, pct: Math.round((score / (total * 3)) * 100) };
}

function CircularProgress({ pct, color, size = 80, stroke = 6 }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--border)" strokeWidth={stroke} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color}
        strokeWidth={stroke} strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.6s cubic-bezier(.4,0,.2,1)" }}
      />
      <text
        x={size / 2} y={size / 2}
        textAnchor="middle" dominantBaseline="central"
        style={{ transform: "rotate(90deg)", transformOrigin: "center", fontSize: size * 0.22, fontWeight: 700, fill: color, fontFamily: "'JetBrains Mono', monospace" }}
      >
        {pct}%
      </text>
    </svg>
  );
}

function BarProgress({ pct, color, height = 6 }) {
  return (
    <div style={{ width: "100%", height, borderRadius: height, background: "var(--border)", overflow: "hidden" }}>
      <div style={{
        width: `${pct}%`, height: "100%", borderRadius: height,
        background: `linear-gradient(90deg, ${color}, ${color}cc)`,
        transition: "width 0.5s cubic-bezier(.4,0,.2,1)"
      }} />
    </div>
  );
}

function AuthScreen({
  email,
  password,
  setEmail,
  setPassword,
  authMode,
  setAuthMode,
  onSubmit,
  onDemoMode,
  authLoading,
  authError,
}) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 20, background: "#e8eef5" }}>
      <div style={{ width: "min(100%, 900px)", display: "grid", gridTemplateColumns: "minmax(280px, 1fr) minmax(280px, 0.95fr)", gap: 28 }}>
        <div style={{ padding: 40, borderRadius: 28, background: "#e8eef5", boxShadow: "8px 8px 16px #c5cee1, -8px -8px 16px #ffffff", color: "#2c3e50" }}>
          <div style={{ fontSize: 11, letterSpacing: 2.5, textTransform: "uppercase", color: "#7a8fa6", marginBottom: 16, fontWeight: 800 }}>CBSE Study Tracker</div>
          <h1 style={{ fontSize: 36, lineHeight: 1.2, margin: 0, maxWidth: 320, fontWeight: 800, color: "#2c3e50" }}>Track Your Progress</h1>
          <p style={{ marginTop: 16, fontSize: 14, lineHeight: 1.8, color: "#5a6f8a", maxWidth: 520 }}>
            Sign in to track and sync your CBSE study progress across all your devices in real time.
          </p>
          <div style={{ display: "grid", gap: 12, marginTop: 28 }}>
            {[
              "Secure login",
              "Real-time sync",
              "Track progress",
            ].map((item) => (
              <div key={item} style={{ display: "flex", gap: 12, alignItems: "center", color: "#5a6f8a", fontSize: 13, fontWeight: 500 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4B70E2", flexShrink: 0 }} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: 40, borderRadius: 28, background: "#e8eef5", boxShadow: "8px 8px 20px #c5cee1, -8px -8px 20px #ffffff", transition: "all 0.3s ease" }}>
          <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
            <button
              type="button"
              onClick={() => setAuthMode("signIn")}
              style={{
                flex: 1,
                border: "none",
                borderRadius: 16,
                padding: "12px 16px",
                background: authMode === "signIn" ? "#4B70E2" : "#e8eef5",
                color: authMode === "signIn" ? "#fff" : "#7a8fa6",
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: authMode === "signIn" ? "0 4px 12px rgba(75, 112, 226, 0.3)" : "inset 3px 3px 8px #c5cee1, inset -3px -3px 8px #ffffff",
              }}
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => setAuthMode("signUp")}
              style={{
                flex: 1,
                border: "none",
                borderRadius: 16,
                padding: "12px 16px",
                background: authMode === "signUp" ? "#4B70E2" : "#e8eef5",
                color: authMode === "signUp" ? "#fff" : "#7a8fa6",
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: authMode === "signUp" ? "0 4px 12px rgba(75, 112, 226, 0.3)" : "inset 3px 3px 8px #c5cee1, inset -3px -3px 8px #ffffff",
              }}
            >
              Create account
            </button>
          </div>

          <form onSubmit={onSubmit} style={{ display: "grid", gap: 14 }}>
            <label style={{ display: "grid", gap: 8, fontSize: 12, fontWeight: 700, color: "#5a6f8a" }}>
              Email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                style={{
                  padding: "14px 16px",
                  borderRadius: 14,
                  border: "none",
                  background: "#e8eef5",
                  color: "#2c3e50",
                  fontSize: 13,
                  boxShadow: "inset 4px 4px 10px #c5cee1, inset -4px -4px 10px #ffffff",
                  transition: "all 0.3s ease",
                  outline: "none",
                }}
                onFocus={(e) => (e.target.style.boxShadow = "inset 4px 4px 10px #c5cee1, inset -4px -4px 10px #ffffff, 0 0 0 3px rgba(75, 112, 226, 0.1)")}
                onBlur={(e) => (e.target.style.boxShadow = "inset 4px 4px 10px #c5cee1, inset -4px -4px 10px #ffffff")}
              />
            </label>
            <label style={{ display: "grid", gap: 8, fontSize: 12, fontWeight: 700, color: "#5a6f8a" }}>
              Password
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                style={{
                  padding: "14px 16px",
                  borderRadius: 14,
                  border: "none",
                  background: "#e8eef5",
                  color: "#2c3e50",
                  fontSize: 13,
                  boxShadow: "inset 4px 4px 10px #c5cee1, inset -4px -4px 10px #ffffff",
                  transition: "all 0.3s ease",
                  outline: "none",
                }}
                onFocus={(e) => (e.target.style.boxShadow = "inset 4px 4px 10px #c5cee1, inset -4px -4px 10px #ffffff, 0 0 0 3px rgba(75, 112, 226, 0.1)")}
                onBlur={(e) => (e.target.style.boxShadow = "inset 4px 4px 10px #c5cee1, inset -4px -4px 10px #ffffff")}
              />
            </label>

            {authError ? (
              <div style={{ padding: 14, borderRadius: 14, background: "#ffe8e8", color: "#c41e1e", fontSize: 12, lineHeight: 1.6, fontWeight: 500 }}>
                {authError}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={authLoading}
              style={{
                border: "none",
                borderRadius: 14,
                padding: "14px 16px",
                background: authLoading ? "#a8c5f0" : "#4B70E2",
                color: "#fff",
                fontWeight: 800,
                fontSize: 13,
                cursor: authLoading ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 6px 16px rgba(75, 112, 226, 0.35)",
                transform: "translateY(0)",
              }}
              onMouseDown={(e) => (e.currentTarget.style.transform = "translateY(2px)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              {authLoading ? "Working..." : authMode === "signIn" ? "Sign in" : "Create account"}
            </button>
          </form>

          {!SUPABASE_READY ? (
            <div style={{ marginTop: 16, padding: 14, borderRadius: 14, background: "#fef5e8", color: "#8b5c00", fontSize: 12, lineHeight: 1.6 }}>
              Supabase env vars not set. Try demo mode or configure <code style={{ fontFamily: "monospace", fontSize: 11 }}>VITE_SUPABASE_URL</code> and <code style={{ fontFamily: "monospace", fontSize: 11 }}>VITE_SUPABASE_ANON_KEY</code>.
            </div>
          ) : null}

          {!SUPABASE_READY ? (
            <button
              type="button"
              onClick={onDemoMode}
              style={{
                marginTop: 14,
                width: "100%",
                border: "none",
                borderRadius: 14,
                padding: "13px 16px",
                background: "#e8eef5",
                color: "#4B70E2",
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "inset 3px 3px 8px #c5cee1, inset -3px -3px 8px #ffffff",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 12px rgba(75, 112, 226, 0.2)")}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "inset 3px 3px 8px #c5cee1, inset -3px -3px 8px #ffffff")}
            >
              Continue in demo mode
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [session, setSession] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [authMode, setAuthMode] = useState("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [demoMode, setDemoMode] = useState(false);
  const [statuses, setStatuses] = useState({});
  const [activeSubject, setActiveSubject] = useState(null);
  const [expandedChapter, setExpandedChapter] = useState(null);
  const [studyLog, setStudyLog] = useState([]);
  const [view, setView] = useState("dashboard"); // dashboard | subject | schedule
  const [loaded, setLoaded] = useState(false);
  const isRemoteMode = Boolean(supabase && session && !demoMode);
  const activeUserId = session?.user?.id || (demoMode ? "demo-user" : null);

  const loadLocalData = () => {
    try {
      const s = localStorage.getItem("cbse-statuses");
      setStatuses(s ? JSON.parse(s) : {});
    } catch (error) {
      setStatuses({});
    }

    try {
      const l = localStorage.getItem("cbse-study-log");
      setStudyLog(l ? JSON.parse(l) : []);
    } catch (error) {
      setStudyLog([]);
    }

    setLoaded(true);
  };

  const loadRemoteData = async (userId) => {
    if (!supabase || !userId) return;

    try {
      const [progressResult, activityResult] = await Promise.all([
        supabase.from("study_progress").select("concept_key,status").eq("user_id", userId),
        supabase.from("study_activity").select("concept_key,from_status,to_status,created_at").eq("user_id", userId).order("created_at", { ascending: false }).limit(200),
      ]);

      if (progressResult.error) throw progressResult.error;
      if (activityResult.error) throw activityResult.error;

      const nextStatuses = {};
      (progressResult.data || []).forEach((row) => {
        nextStatuses[row.concept_key] = row.status;
      });

      setStatuses(nextStatuses);
      setStudyLog(
        (activityResult.data || []).map((row) => ({
          key: row.concept_key,
          from: row.from_status,
          to: row.to_status,
          time: row.created_at,
        }))
      );
    } catch (error) {
      console.error("Failed to load remote study data", error);
      setStatuses({});
      setStudyLog([]);
      setAuthError("Connected to Supabase, but the study tables could not be loaded. Check the SQL schema setup.");
    } finally {
      setLoaded(true);
    }
  };

  useEffect(() => {
    if (!supabase) {
      setAuthReady(true);
      return;
    }

    let mounted = true;

    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (!mounted) return;
        setSession(data.session ?? null);
        setAuthReady(true);
      })
      .catch(() => {
        if (!mounted) return;
        setAuthReady(true);
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setDemoMode(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (isRemoteMode || !loaded) return;
    localStorage.setItem("cbse-statuses", JSON.stringify(statuses));
  }, [statuses, loaded, isRemoteMode]);

  useEffect(() => {
    if (isRemoteMode || !loaded) return;
    localStorage.setItem("cbse-study-log", JSON.stringify(studyLog));
  }, [studyLog, loaded, isRemoteMode]);

  useEffect(() => {
    if (!authReady) return;

    if (isRemoteMode && activeUserId) {
      setLoaded(false);
      loadRemoteData(activeUserId);
      return;
    }

    if (demoMode) {
      loadLocalData();
      return;
    }

    setLoaded(false);
  }, [authReady, activeUserId, isRemoteMode, demoMode]);

  useEffect(() => {
    if (!isRemoteMode || !activeUserId) return;

    let alive = true;

    const reload = async () => {
      if (!alive) return;
      await loadRemoteData(activeUserId);
    };

    const channel = supabase
      .channel(`cbse-sync-${activeUserId}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "study_progress", filter: `user_id=eq.${activeUserId}` }, reload)
      .on("postgres_changes", { event: "*", schema: "public", table: "study_activity", filter: `user_id=eq.${activeUserId}` }, reload)
      .subscribe();

    return () => {
      alive = false;
      supabase.removeChannel(channel);
    };
  }, [activeUserId, isRemoteMode]);

  const handleAuthSubmit = async (event) => {
    event.preventDefault();

    if (!supabase) {
      setAuthError("Add Supabase env vars or use demo mode to enter the app.");
      return;
    }

    setAuthLoading(true);
    setAuthError("");

    try {
      const result =
        authMode === "signIn"
          ? await supabase.auth.signInWithPassword({ email, password })
          : await supabase.auth.signUp({ email, password });

      if (result.error) {
        throw result.error;
      }

      if (authMode === "signUp" && !result.data.session) {
        setAuthError("Account created. Check your email to confirm sign-in, or disable email confirmations in Supabase for local testing.");
      }
    } catch (error) {
      setAuthError(error.message || "Authentication failed.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleDemoMode = () => {
    setDemoMode(true);
    setSession(null);
    setAuthError("");
    setLoaded(false);
  };

  const handleSignOut = async () => {
    if (supabase && session && !demoMode) {
      await supabase.auth.signOut();
    }
    setDemoMode(false);
    setSession(null);
    setLoaded(false);
    setStatuses({});
    setStudyLog([]);
    setView("dashboard");
    setActiveSubject(null);
    setExpandedChapter(null);
  };

  const cycleStatus = async (key) => {
    let nextStatus = "not_started";
    let entry = null;

    setStatuses((prev) => {
      const curr = prev[key] || "not_started";
      const idx = STATUS_ORDER.indexOf(curr);
      nextStatus = STATUS_ORDER[(idx + 1) % STATUS_ORDER.length];
      entry = {
        key,
        from: curr,
        to: nextStatus,
        time: new Date().toISOString(),
      };
      return { ...prev, [key]: nextStatus };
    });

    if (entry) {
      setStudyLog((logs) => [entry, ...logs].slice(0, 200));
    }

    if (isRemoteMode && activeUserId && supabase && entry) {
      const [progressResult, activityResult] = await Promise.all([
        supabase.from("study_progress").upsert(
          {
            user_id: activeUserId,
            concept_key: key,
            status: nextStatus,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "user_id,concept_key" }
        ),
        supabase.from("study_activity").insert({
          user_id: activeUserId,
          concept_key: key,
          from_status: entry.from,
          to_status: entry.to,
        }),
      ]);

      if (progressResult.error) {
        console.error(progressResult.error);
      }
      if (activityResult.error) {
        console.error(activityResult.error);
      }
    }
  };

  const resetAll = async () => {
    if (!confirm("Reset all progress? This cannot be undone.")) {
      return;
    }

    setStatuses({});
    setStudyLog([]);

    if (isRemoteMode && activeUserId && supabase) {
      await Promise.all([
        supabase.from("study_progress").delete().eq("user_id", activeUserId),
        supabase.from("study_activity").delete().eq("user_id", activeUserId),
      ]);
    }
  };

  // Overall stats
  const overallStats = Object.keys(SUBJECTS).reduce(
    (acc, sk) => {
      const p = getProgress(statuses, sk);
      acc.total += p.total;
      acc.score += p.score;
      return acc;
    },
    { total: 0, score: 0 }
  );
  const overallPct = overallStats.total ? Math.round((overallStats.score / (overallStats.total * 3)) * 100) : 0;

  // Exam countdown
  const examDate = new Date("2027-03-01");
  const today = new Date();
  const daysLeft = Math.max(0, Math.ceil((examDate - today) / (1000 * 60 * 60 * 24)));
  const weeksLeft = Math.floor(daysLeft / 7);

  const totalConcepts = Object.keys(SUBJECTS).reduce((a, sk) => a + SUBJECTS[sk].chapters.reduce((b, ch) => b + ch.concepts.length, 0), 0);
  const masteredCount = Object.values(statuses).filter((s) => s === "mastered").length;
  const understoodCount = Object.values(statuses).filter((s) => s === "understood").length;

  // Suggested daily schedule
  const schedule = [
    { time: "6:00 – 7:30 AM", subject: "Mathematics", note: "Fresh mind → tackle problem-solving", icon: "∑" },
    { time: "7:30 – 8:00 AM", subject: "Break", note: "Breakfast + freshen up", icon: "☕" },
    { time: "8:00 – 9:15 AM", subject: "Physics", note: "Concepts + numericals together", icon: "⚛" },
    { time: "9:15 – 9:30 AM", subject: "Break", note: "Short walk / stretch", icon: "🚶" },
    { time: "9:30 – 10:30 AM", subject: "Chemistry", note: "Organic/Inorganic/Physical rotation", icon: "⚗" },
    { time: "10:30 – 11:15 AM", subject: "Computer Science", note: "Theory + coding practice", icon: "⌨" },
    { time: "Evening", subject: "Revision", note: "30 min revisit what you learned today", icon: "📝" },
  ];

  if (!authReady) {
    return (
      <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "var(--bg)", color: "var(--text)" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 16, fontWeight: 700 }}>Loading secure session...</div>
          <div style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 8 }}>Preparing your study data.</div>
        </div>
      </div>
    );
  }

  if (!session && !demoMode) {
    return (
      <AuthScreen
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        authMode={authMode}
        setAuthMode={setAuthMode}
        onSubmit={handleAuthSubmit}
        onDemoMode={handleDemoMode}
        authLoading={authLoading}
        authError={authError}
      />
    );
  }

  const styles = {
    app: {
      fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif",
      minHeight: "100vh",
      background: "var(--bg)",
      color: "var(--text)",
      padding: 0,
      margin: 0,
    },
    header: {
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      color: "#fff",
      padding: "28px 24px 20px",
      position: "relative",
      overflow: "hidden",
    },
    headerGrid: {
      position: "absolute",
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)`,
      backgroundSize: "24px 24px",
    },
    nav: {
      display: "flex",
      gap: 6,
      background: "#1e293b",
      padding: "4px",
      borderRadius: 10,
      margin: "0 16px",
      position: "sticky",
      top: 0,
      zIndex: 100,
      borderBottom: "1px solid rgba(255,255,255,0.05)",
    },
    navBtn: (active) => ({
      flex: 1,
      padding: "10px 8px",
      border: "none",
      borderRadius: 8,
      background: active ? "#334155" : "transparent",
      color: active ? "#fff" : "#94a3b8",
      fontWeight: active ? 700 : 500,
      fontSize: 13,
      cursor: "pointer",
      transition: "all 0.2s",
      fontFamily: "inherit",
    }),
    card: {
      background: "var(--card-bg, #fff)",
      borderRadius: 14,
      padding: 18,
      margin: "12px 16px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
      border: "1px solid var(--border, #e2e8f0)",
    },
  };

  const cssVars = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap');
    :root {
      --bg: #f8fafc;
      --text: #0f172a;
      --text-secondary: #64748b;
      --card-bg: #ffffff;
      --border: #e2e8f0;
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --bg: #0f172a;
        --text: #f1f5f9;
        --text-secondary: #94a3b8;
        --card-bg: #1e293b;
        --border: #334155;
      }
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: var(--bg); }
    button { cursor: pointer; font-family: inherit; }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-thumb { background: #475569; border-radius: 4px; }
  `;

  return (
    <div style={styles.app}>
      <style>{cssVars}</style>

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerGrid} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
            <div>
              <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 2, color: "#94a3b8", fontWeight: 600 }}>CBSE Class 12</div>
              <h1 style={{ fontSize: 24, fontWeight: 700, margin: "4px 0", letterSpacing: -0.5 }}>Concept Tracker</h1>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 28, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", color: "#60a5fa" }}>{daysLeft}</div>
              <div style={{ fontSize: 10, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1 }}>days to boards</div>
              <div style={{ marginTop: 10, display: "flex", justifyContent: "flex-end", gap: 8, alignItems: "center" }}>
                <span style={{ fontSize: 10, color: "#cbd5e1", background: "rgba(255,255,255,0.08)", padding: "6px 8px", borderRadius: 999 }}>
                  {demoMode ? "Demo mode" : session?.user?.email || "Signed in"}
                </span>
                <button
                  type="button"
                  onClick={handleSignOut}
                  style={{ border: "none", borderRadius: 999, padding: "6px 10px", background: "#334155", color: "#fff", fontSize: 11, fontWeight: 700 }}
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 14 }}>
            <div style={{ flex: 1, background: "rgba(255,255,255,0.06)", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>{totalConcepts}</div>
              <div style={{ fontSize: 10, color: "#94a3b8" }}>Total Concepts</div>
            </div>
            <div style={{ flex: 1, background: "rgba(34,197,94,0.1)", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#22c55e", fontFamily: "'JetBrains Mono', monospace" }}>{understoodCount + masteredCount}</div>
              <div style={{ fontSize: 10, color: "#94a3b8" }}>Concepts Clear</div>
            </div>
            <div style={{ flex: 1, background: "rgba(37,99,235,0.1)", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#60a5fa", fontFamily: "'JetBrains Mono', monospace" }}>{overallPct}%</div>
              <div style={{ fontSize: 10, color: "#94a3b8" }}>Mastery</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div style={styles.nav}>
        <button style={styles.navBtn(view === "dashboard")} onClick={() => { setView("dashboard"); setActiveSubject(null); }}>Dashboard</button>
        <button style={styles.navBtn(view === "subject")} onClick={() => { if (!activeSubject) setActiveSubject("Mathematics"); setView("subject"); }}>Subjects</button>
        <button style={styles.navBtn(view === "schedule")} onClick={() => setView("schedule")}>Schedule</button>
      </div>

      {/* Dashboard View */}
      {view === "dashboard" && (
        <div style={{ padding: "4px 0 20px" }}>
          {/* Subject Cards */}
          {Object.keys(SUBJECTS).map((sk) => {
            const sub = SUBJECTS[sk];
            const prog = getProgress(statuses, sk);
            const chapCount = sub.chapters.length;
            const conceptCount = sub.chapters.reduce((a, c) => a + c.concepts.length, 0);
            return (
              <div
                key={sk}
                style={{ ...styles.card, cursor: "pointer", transition: "transform 0.15s" }}
                onClick={() => { setActiveSubject(sk); setView("subject"); setExpandedChapter(null); }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.01)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <CircularProgress pct={prog.pct} color={sub.color} size={64} stroke={5} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 20 }}>{sub.icon}</span>
                      <span style={{ fontSize: 16, fontWeight: 700 }}>{sk}</span>
                    </div>
                    <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 4 }}>
                      {chapCount} chapters · {conceptCount} concepts
                    </div>
                    <BarProgress pct={prog.pct} color={sub.color} height={5} />
                  </div>
                  <span style={{ fontSize: 18, color: "var(--text-secondary)" }}>→</span>
                </div>
              </div>
            );
          })}

          {/* Recent Activity */}
          {studyLog.length > 0 && (
            <div style={styles.card}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>Recent Activity</span>
                <button onClick={resetAll} style={{ fontSize: 11, color: "#ef4444", background: "none", border: "none", padding: "4px 8px" }}>Reset All</button>
              </div>
              {studyLog.slice(0, 5).map((log, i) => {
                const parts = log.key.split("-");
                const subj = parts.slice(0, -2).join("-");
                const chIdx = parseInt(parts[parts.length - 2]);
                const coIdx = parseInt(parts[parts.length - 1]);
                const sub = SUBJECTS[subj];
                if (!sub) return null;
                const ch = sub.chapters[chIdx];
                if (!ch) return null;
                const concept = ch.concepts[coIdx] || "";
                const st = STATUS[log.to];
                const time = new Date(log.time);
                const mins = Math.round((Date.now() - time.getTime()) / 60000);
                const timeStr = mins < 60 ? `${mins}m ago` : mins < 1440 ? `${Math.floor(mins / 60)}h ago` : `${Math.floor(mins / 1440)}d ago`;
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderTop: i ? "1px solid var(--border)" : "none" }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: st.color, flexShrink: 0 }} />
                    <div style={{ flex: 1, fontSize: 12, lineHeight: 1.4 }}>
                      <span style={{ fontWeight: 600 }}>{concept.slice(0, 40)}{concept.length > 40 ? "…" : ""}</span>
                      <span style={{ color: "var(--text-secondary)" }}> → {st.label}</span>
                    </div>
                    <span style={{ fontSize: 10, color: "var(--text-secondary)", flexShrink: 0 }}>{timeStr}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Subject Detail View */}
      {view === "subject" && activeSubject && (
        <div style={{ padding: "4px 0 20px" }}>
          {/* Subject Tabs */}
          <div style={{ display: "flex", gap: 6, padding: "8px 16px", overflowX: "auto" }}>
            {Object.keys(SUBJECTS).map((sk) => (
              <button
                key={sk}
                onClick={() => { setActiveSubject(sk); setExpandedChapter(null); }}
                style={{
                  padding: "8px 14px",
                  borderRadius: 20,
                  border: sk === activeSubject ? `2px solid ${SUBJECTS[sk].color}` : "1px solid var(--border)",
                  background: sk === activeSubject ? SUBJECTS[sk].accent : "transparent",
                  color: sk === activeSubject ? SUBJECTS[sk].color : "var(--text-secondary)",
                  fontWeight: sk === activeSubject ? 700 : 500,
                  fontSize: 12,
                  whiteSpace: "nowrap",
                  fontFamily: "inherit",
                }}
              >
                {SUBJECTS[sk].icon} {sk}
              </button>
            ))}
          </div>

          {/* Status Legend */}
          <div style={{ display: "flex", gap: 8, padding: "8px 16px", flexWrap: "wrap" }}>
            {STATUS_ORDER.map((s) => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: "var(--text-secondary)" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: STATUS[s].color }} />
                {STATUS[s].label}
              </div>
            ))}
            <div style={{ fontSize: 10, color: "var(--text-secondary)", marginLeft: "auto" }}>tap concept to cycle →</div>
          </div>

          {/* Chapter List */}
          {SUBJECTS[activeSubject].chapters.map((ch, ci) => {
            const chProg = getChapterProgress(statuses, activeSubject, ci);
            const isExpanded = expandedChapter === ci;
            return (
              <div key={ci} style={{ ...styles.card, padding: 0, overflow: "hidden" }}>
                <div
                  onClick={() => setExpandedChapter(isExpanded ? null : ci)}
                  style={{
                    padding: "14px 16px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    background: isExpanded ? `${SUBJECTS[activeSubject].color}08` : "transparent",
                  }}
                >
                  <div style={{
                    width: 32, height: 32, borderRadius: 8,
                    background: `${SUBJECTS[activeSubject].color}15`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, fontWeight: 700, color: SUBJECTS[activeSubject].color,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}>
                    {ci + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.3 }}>{ch.name}</div>
                    <div style={{ fontSize: 11, color: "var(--text-secondary)", marginTop: 2 }}>
                      {ch.concepts.length} concepts · {chProg.pct}% mastery
                    </div>
                    <div style={{ marginTop: 6 }}>
                      <BarProgress pct={chProg.pct} color={SUBJECTS[activeSubject].color} height={4} />
                    </div>
                  </div>
                  <span style={{
                    fontSize: 14, color: "var(--text-secondary)",
                    transform: isExpanded ? "rotate(90deg)" : "none",
                    transition: "transform 0.2s",
                  }}>▶</span>
                </div>

                {isExpanded && (
                  <div style={{ padding: "0 12px 12px", borderTop: "1px solid var(--border)" }}>
                    {ch.concepts.map((concept, coi) => {
                      const key = `${activeSubject}-${ci}-${coi}`;
                      const st = statuses[key] || "not_started";
                      const stInfo = STATUS[st];
                      return (
                        <div
                          key={coi}
                          onClick={() => cycleStatus(key)}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 10,
                            padding: "10px 6px",
                            borderBottom: coi < ch.concepts.length - 1 ? "1px dashed var(--border)" : "none",
                            cursor: "pointer",
                            borderRadius: 6,
                            transition: "background 0.15s",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--border)")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                        >
                          <span style={{
                            width: 22, height: 22, borderRadius: 6,
                            background: stInfo.bg, border: `2px solid ${stInfo.color}`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 11, fontWeight: 700, color: stInfo.color,
                            flexShrink: 0, marginTop: 1,
                          }}>
                            {st === "mastered" ? "★" : st === "understood" ? "✓" : st === "in_progress" ? "◐" : ""}
                          </span>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 13, lineHeight: 1.4, fontWeight: st === "mastered" ? 600 : 400 }}>{concept}</div>
                          </div>
                          <span style={{
                            fontSize: 9,
                            padding: "2px 6px",
                            borderRadius: 4,
                            background: stInfo.bg,
                            color: stInfo.color,
                            fontWeight: 600,
                            whiteSpace: "nowrap",
                            flexShrink: 0,
                          }}>
                            {stInfo.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Schedule View */}
      {view === "schedule" && (
        <div style={{ padding: "4px 0 20px" }}>
          <div style={styles.card}>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Daily Study Plan</div>
            <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 14 }}>
              4–5 hours · concept-first approach · {weeksLeft} weeks to boards
            </div>

            {schedule.map((s, i) => (
              <div key={i} style={{
                display: "flex", gap: 12, padding: "12px 0",
                borderTop: i ? "1px solid var(--border)" : "none",
                opacity: s.subject === "Break" ? 0.6 : 1,
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: s.subject === "Break" ? "var(--border)" : `${SUBJECTS[s.subject]?.color || "#64748b"}15`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 16, flexShrink: 0,
                }}>
                  {s.icon}
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", color: SUBJECTS[s.subject]?.color || "var(--text-secondary)" }}>
                    {s.time}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>{s.subject}</div>
                  <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }}>{s.note}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={styles.card}>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>Weekly Rotation Strategy</div>
            <div style={{ fontSize: 13, lineHeight: 1.7, color: "var(--text-secondary)" }}>
              <p style={{ marginBottom: 8 }}>
                <strong style={{ color: "var(--text)" }}>Rule #1: Understand, Don't Memorize.</strong> For every concept, he should be able to explain it in his own words without looking at the book. If he can't, he hasn't understood it yet.
              </p>
              <p style={{ marginBottom: 8 }}>
                <strong style={{ color: "var(--text)" }}>Rule #2: Rotate Chapters Weekly.</strong> Don't finish one subject then move to the next. Each week, cover 1-2 chapters across all 4 subjects to keep everything fresh.
              </p>
              <p style={{ marginBottom: 8 }}>
                <strong style={{ color: "var(--text)" }}>Rule #3: The "Teach Back" Test.</strong> After studying a concept, explain it out loud as if teaching someone. Gaps in understanding become obvious instantly.
              </p>
              <p>
                <strong style={{ color: "var(--text)" }}>Rule #4: Track Honestly.</strong> Mark a concept "Understood" only when he can solve problems using it without help. "Mastered" means he can handle tricky variations too.
              </p>
            </div>
          </div>

          <div style={styles.card}>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>Phase Plan (10 months)</div>
            {[
              { phase: "Phase 1 — Foundation", period: "Jun–Aug 2026", desc: "Cover all chapters at concept level. Goal: 100% at 'Learning' or above." },
              { phase: "Phase 2 — Deep Dive", period: "Sep–Nov 2026", desc: "Move everything to 'Understood'. Focus on problem-solving and connections between topics." },
              { phase: "Phase 3 — Mastery", period: "Dec 2026–Jan 2027", desc: "Push key chapters to 'Mastered'. Practice previous year questions. Identify weak spots." },
              { phase: "Phase 4 — Revision", period: "Feb–Mar 2027", desc: "Full revision cycles. Sample papers. Only focused review of weak concepts." },
            ].map((p, i) => (
              <div key={i} style={{ padding: "10px 0", borderTop: i ? "1px solid var(--border)" : "none" }}>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{p.phase}</div>
                <div style={{ fontSize: 11, color: "#60a5fa", fontFamily: "'JetBrains Mono', monospace", margin: "2px 0" }}>{p.period}</div>
                <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useRef, useState, useMemo, useCallback, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "../../../context/ThemeContext";
import { useLanguage } from "../../../context/LanguageContext";

// ═══════════════════════════════════════════════════════════════════════════════
// Rubik's Cube Solver / Game — 3x3 interactive cube
// ═══════════════════════════════════════════════════════════════════════════════

// Standard Rubik's cube colors
const FACE_COLORS = {
    U: "#FFFFFF", // White - top
    D: "#FFD500", // Yellow - bottom
    F: "#009B48", // Green - front
    B: "#0045AD", // Blue - back
    R: "#B90000", // Red - right
    L: "#FF5900", // Orange - left
};

// Face index mapping for BoxGeometry: +X=0, -X=1, +Y=2, -Y=3, +Z=4, -Z=5
const FACE_INDEX = { R: 0, L: 1, U: 2, D: 3, F: 4, B: 5 };

// Initial solved state: 6 faces × 9 stickers
function createSolvedState() {
    const state = {};
    Object.keys(FACE_COLORS).forEach((face) => {
        state[face] = Array(9).fill(face);
    });
    return state;
}

// ─── Cube State Logic ───────────────────────────────────────────────────────

// Rotate a face clockwise (the 9 stickers on that face)
function rotateFaceCW(faceArr) {
    const f = [...faceArr];
    return [f[6], f[3], f[0], f[7], f[4], f[1], f[8], f[5], f[2]];
}

function rotateFaceCCW(faceArr) {
    const f = [...faceArr];
    return [f[2], f[5], f[8], f[1], f[4], f[7], f[0], f[3], f[6]];
}

// Apply a single move to the cube state (mutates a copy)
function applyMove(state, move) {
    const s = {};
    Object.keys(state).forEach((k) => (s[k] = [...state[k]]));

    const face = move[0]; // R, L, U, D, F, B
    const prime = move.includes("'");
    const double = move.includes("2");

    const times = double ? 2 : 1;

    for (let t = 0; t < times; t++) {
        // Rotate the face itself
        if (prime) {
            s[face] = rotateFaceCCW(s[face]);
        } else {
            s[face] = rotateFaceCW(s[face]);
        }

        // Cycle the adjacent edge stickers
        let temp;
        switch (face) {
            case "R":
                if (!prime) {
                    temp = [s.F[2], s.F[5], s.F[8]];
                    [s.F[2], s.F[5], s.F[8]] = [s.D[2], s.D[5], s.D[8]];
                    [s.D[2], s.D[5], s.D[8]] = [s.B[6], s.B[3], s.B[0]];
                    [s.B[6], s.B[3], s.B[0]] = [s.U[2], s.U[5], s.U[8]];
                    [s.U[2], s.U[5], s.U[8]] = temp;
                } else {
                    temp = [s.F[2], s.F[5], s.F[8]];
                    [s.F[2], s.F[5], s.F[8]] = [s.U[2], s.U[5], s.U[8]];
                    [s.U[2], s.U[5], s.U[8]] = [s.B[6], s.B[3], s.B[0]];
                    [s.B[6], s.B[3], s.B[0]] = [s.D[2], s.D[5], s.D[8]];
                    [s.D[2], s.D[5], s.D[8]] = temp;
                }
                break;
            case "L":
                if (!prime) {
                    temp = [s.F[0], s.F[3], s.F[6]];
                    [s.F[0], s.F[3], s.F[6]] = [s.U[0], s.U[3], s.U[6]];
                    [s.U[0], s.U[3], s.U[6]] = [s.B[8], s.B[5], s.B[2]];
                    [s.B[8], s.B[5], s.B[2]] = [s.D[0], s.D[3], s.D[6]];
                    [s.D[0], s.D[3], s.D[6]] = temp;
                } else {
                    temp = [s.F[0], s.F[3], s.F[6]];
                    [s.F[0], s.F[3], s.F[6]] = [s.D[0], s.D[3], s.D[6]];
                    [s.D[0], s.D[3], s.D[6]] = [s.B[8], s.B[5], s.B[2]];
                    [s.B[8], s.B[5], s.B[2]] = [s.U[0], s.U[3], s.U[6]];
                    [s.U[0], s.U[3], s.U[6]] = temp;
                }
                break;
            case "U":
                if (!prime) {
                    temp = [s.F[0], s.F[1], s.F[2]];
                    [s.F[0], s.F[1], s.F[2]] = [s.R[0], s.R[1], s.R[2]];
                    [s.R[0], s.R[1], s.R[2]] = [s.B[0], s.B[1], s.B[2]];
                    [s.B[0], s.B[1], s.B[2]] = [s.L[0], s.L[1], s.L[2]];
                    [s.L[0], s.L[1], s.L[2]] = temp;
                } else {
                    temp = [s.F[0], s.F[1], s.F[2]];
                    [s.F[0], s.F[1], s.F[2]] = [s.L[0], s.L[1], s.L[2]];
                    [s.L[0], s.L[1], s.L[2]] = [s.B[0], s.B[1], s.B[2]];
                    [s.B[0], s.B[1], s.B[2]] = [s.R[0], s.R[1], s.R[2]];
                    [s.R[0], s.R[1], s.R[2]] = temp;
                }
                break;
            case "D":
                if (!prime) {
                    temp = [s.F[6], s.F[7], s.F[8]];
                    [s.F[6], s.F[7], s.F[8]] = [s.L[6], s.L[7], s.L[8]];
                    [s.L[6], s.L[7], s.L[8]] = [s.B[6], s.B[7], s.B[8]];
                    [s.B[6], s.B[7], s.B[8]] = [s.R[6], s.R[7], s.R[8]];
                    [s.R[6], s.R[7], s.R[8]] = temp;
                } else {
                    temp = [s.F[6], s.F[7], s.F[8]];
                    [s.F[6], s.F[7], s.F[8]] = [s.R[6], s.R[7], s.R[8]];
                    [s.R[6], s.R[7], s.R[8]] = [s.B[6], s.B[7], s.B[8]];
                    [s.B[6], s.B[7], s.B[8]] = [s.L[6], s.L[7], s.L[8]];
                    [s.L[6], s.L[7], s.L[8]] = temp;
                }
                break;
            case "F":
                if (!prime) {
                    temp = [s.U[6], s.U[7], s.U[8]];
                    [s.U[6], s.U[7], s.U[8]] = [s.L[8], s.L[5], s.L[2]];
                    [s.L[2], s.L[5], s.L[8]] = [s.D[0], s.D[1], s.D[2]];
                    [s.D[0], s.D[1], s.D[2]] = [s.R[6], s.R[3], s.R[0]];
                    [s.R[0], s.R[3], s.R[6]] = temp;
                } else {
                    temp = [s.U[6], s.U[7], s.U[8]];
                    [s.U[6], s.U[7], s.U[8]] = [s.R[0], s.R[3], s.R[6]];
                    [s.R[0], s.R[3], s.R[6]] = [s.D[2], s.D[1], s.D[0]];
                    [s.D[0], s.D[1], s.D[2]] = [s.L[2], s.L[5], s.L[8]];
                    [s.L[2], s.L[5], s.L[8]] = temp;
                }
                break;
            case "B":
                if (!prime) {
                    temp = [s.U[0], s.U[1], s.U[2]];
                    [s.U[0], s.U[1], s.U[2]] = [s.R[2], s.R[5], s.R[8]];
                    [s.R[2], s.R[5], s.R[8]] = [s.D[8], s.D[7], s.D[6]];
                    [s.D[6], s.D[7], s.D[8]] = [s.L[0], s.L[3], s.L[6]];
                    [s.L[0], s.L[3], s.L[6]] = temp;
                } else {
                    temp = [s.U[0], s.U[1], s.U[2]];
                    [s.U[0], s.U[1], s.U[2]] = [s.L[6], s.L[3], s.L[0]];
                    [s.L[0], s.L[3], s.L[6]] = [s.D[6], s.D[7], s.D[8]];
                    [s.D[6], s.D[7], s.D[8]] = [s.R[8], s.R[5], s.R[2]];
                    [s.R[2], s.R[5], s.R[8]] = temp;
                }
                break;
            default:
                break;
        }
    }

    return s;
}

// Check if cube is solved
function isSolved(state) {
    return Object.keys(state).every((face) =>
        state[face].every((s) => s === state[face][0])
    );
}

// Generate random scramble (20 moves)
function generateScramble(length = 20) {
    const faces = ["R", "L", "U", "D", "F", "B"];
    const mods = ["", "'", "2"];
    const moves = [];
    let lastFace = "";
    for (let i = 0; i < length; i++) {
        let face;
        do {
            face = faces[Math.floor(Math.random() * faces.length)];
        } while (face === lastFace);
        lastFace = face;
        moves.push(face + mods[Math.floor(Math.random() * mods.length)]);
    }
    return moves;
}

// Simple solver: reverse the scramble (for demo purposes)
// A real solver would use Kociemba algorithm
function solveFromHistory(history) {
    return history.reverse().map((m) => {
        if (m.includes("2")) return m;
        if (m.includes("'")) return m[0];
        return m[0] + "'";
    });
}

// ─── 3D Cube Rendering ─────────────────────────────────────────────────────

// Create sticker texture for a single color
function createColorTexture(colorKey) {
    const size = 128;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, size, size);

    const r = 12;
    ctx.beginPath();
    ctx.roundRect(4, 4, size - 8, size - 8, r);
    ctx.fillStyle = FACE_COLORS[colorKey] || "#333333";
    ctx.fill();

    ctx.beginPath();
    ctx.roundRect(4, 4, size - 8, size - 8, r);
    ctx.strokeStyle = "rgba(0,0,0,0.3)";
    ctx.lineWidth = 2;
    ctx.stroke();

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
}

// Interior (hidden) face color
function createInteriorTexture() {
    const size = 32;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(0, 0, size, size);
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
}

// Cache textures
const textureCache = {};
function getTexture(colorKey) {
    if (!textureCache[colorKey]) {
        textureCache[colorKey] = createColorTexture(colorKey);
    }
    return textureCache[colorKey];
}

let interiorTex = null;
function getInteriorTexture() {
    if (!interiorTex) interiorTex = createInteriorTexture();
    return interiorTex;
}

// Single small cube in the 3x3
function SolverSmallCube({ position, faceColors }) {
    const meshRef = useRef();
    const [hovered, setHovered] = useState(false);

    // faceColors: { 0: "U", 1: "D", ... } mapping face index to color key (or null for interior)
    const materials = useMemo(() => {
        return [0, 1, 2, 3, 4, 5].map((idx) => {
            const colorKey = faceColors[idx];
            if (colorKey) {
                const tex = getTexture(colorKey);
                tex.colorSpace = THREE.SRGBColorSpace;
                return new THREE.MeshBasicMaterial({ map: tex });
            }
            return new THREE.MeshLambertMaterial({ map: getInteriorTexture() });
        });
    }, [faceColors]);

    return (
        <mesh
            ref={meshRef}
            position={position}
            scale={hovered ? 1.04 : 1}
            onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
            onPointerOut={() => setHovered(false)}
        >
            <boxGeometry args={[0.93, 0.93, 0.93]} />
            {materials.map((mat, i) => (
                <primitive key={i} object={mat} attach={`material-${i}`} />
            ))}
        </mesh>
    );
}

// Build the 27 cubies from the cube state
function SolverRubiksCube({ cubeState, animatingMove, animProgress }) {
    const groupRef = useRef();
    const animGroupRef = useRef();

    // Build cubie data from state
    const cubies = useMemo(() => {
        const result = [];
        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                for (let z = -1; z <= 1; z++) {
                    const faceColors = {};

                    // +X face (R) → matIdx 0
                    if (x === 1) {
                        const row = 1 - y; // y=1→row0, y=-1→row2
                        const col = 1 - z; // z=1→col0, z=-1→col2
                        faceColors[0] = cubeState.R[row * 3 + col];
                    }
                    // -X face (L) → matIdx 1
                    if (x === -1) {
                        const row = 1 - y;
                        const col = z + 1;
                        faceColors[1] = cubeState.L[row * 3 + col];
                    }
                    // +Y face (U) → matIdx 2
                    if (y === 1) {
                        const row = 1 - z;
                        const col = x + 1;
                        faceColors[2] = cubeState.U[row * 3 + col];
                    }
                    // -Y face (D) → matIdx 3
                    if (y === -1) {
                        const row = z + 1;
                        const col = x + 1;
                        faceColors[3] = cubeState.D[row * 3 + col];
                    }
                    // +Z face (F) → matIdx 4
                    if (z === 1) {
                        const row = 1 - y;
                        const col = x + 1;
                        faceColors[4] = cubeState.F[row * 3 + col];
                    }
                    // -Z face (B) → matIdx 5
                    if (z === -1) {
                        const row = 1 - y;
                        const col = 1 - x;
                        faceColors[5] = cubeState.B[row * 3 + col];
                    }

                    result.push({ position: [x, y, z], faceColors });
                }
            }
        }
        return result;
    }, [cubeState]);

    // Determine which cubies belong to the animating layer
    const getAnimatingCubies = useCallback((move) => {
        if (!move) return { animated: [], stationary: cubies };
        const face = move[0];
        const animated = [];
        const stationary = [];
        cubies.forEach((c) => {
            const [x, y, z] = c.position;
            let inLayer = false;
            if (face === "R" && x === 1) inLayer = true;
            if (face === "L" && x === -1) inLayer = true;
            if (face === "U" && y === 1) inLayer = true;
            if (face === "D" && y === -1) inLayer = true;
            if (face === "F" && z === 1) inLayer = true;
            if (face === "B" && z === -1) inLayer = true;
            (inLayer ? animated : stationary).push(c);
        });
        return { animated, stationary };
    }, [cubies]);

    const { animated, stationary } = getAnimatingCubies(animatingMove);

    // Compute rotation axis and angle for animation
    const animRotation = useMemo(() => {
        if (!animatingMove) return null;
        const face = animatingMove[0];
        const prime = animatingMove.includes("'");
        const double = animatingMove.includes("2");
        const totalAngle = double ? Math.PI : Math.PI / 2;

        let axis;
        switch (face) {
            case "R": axis = new THREE.Vector3(-1, 0, 0); break;
            case "L": axis = new THREE.Vector3(1, 0, 0); break;
            case "U": axis = new THREE.Vector3(0, -1, 0); break;
            case "D": axis = new THREE.Vector3(0, 1, 0); break;
            case "F": axis = new THREE.Vector3(0, 0, -1); break;
            case "B": axis = new THREE.Vector3(0, 0, 1); break;
            default: axis = new THREE.Vector3(0, 1, 0);
        }
        if (prime) axis.negate();
        return { axis, totalAngle };
    }, [animatingMove]);

    // Animate the layer rotation
    useFrame(() => {
        if (animGroupRef.current && animRotation && animProgress != null) {
            const angle = animRotation.totalAngle * animProgress;
            animGroupRef.current.setRotationFromAxisAngle(animRotation.axis, angle);
        }
    });

    return (
        <group ref={groupRef}>
            {stationary.map((c, i) => (
                <SolverSmallCube key={`s-${i}`} position={c.position} faceColors={c.faceColors} />
            ))}
            <group ref={animGroupRef}>
                {animated.map((c, i) => (
                    <SolverSmallCube key={`a-${i}`} position={c.position} faceColors={c.faceColors} />
                ))}
            </group>
        </group>
    );
}

// ─── Animation Controller ───────────────────────────────────────────────────

function AnimationController({ moveQueue, cubeState, setCubeState, onMoveComplete }) {
    const animProgressRef = useRef(0);
    const currentMoveRef = useRef(null);
    const [animMove, setAnimMove] = useState(null);
    const [animProgress, setAnimProgress] = useState(0);

    useFrame((_, delta) => {
        // Pick next move from queue
        if (!currentMoveRef.current && moveQueue.length > 0) {
            const next = moveQueue[0];
            currentMoveRef.current = next;
            animProgressRef.current = 0;
            setAnimMove(next);
        }

        // Animate current move
        if (currentMoveRef.current) {
            animProgressRef.current = Math.min(1, animProgressRef.current + delta * 5);
            setAnimProgress(animProgressRef.current);

            if (animProgressRef.current >= 1) {
                // Apply move to state
                const newState = applyMove(cubeState, currentMoveRef.current);
                setCubeState(newState);
                onMoveComplete(currentMoveRef.current);
                currentMoveRef.current = null;
                setAnimMove(null);
                setAnimProgress(0);
            }
        }
    });

    return (
        <SolverRubiksCube
            cubeState={cubeState}
            animatingMove={animMove}
            animProgress={animProgress}
        />
    );
}

// ─── Scene ──────────────────────────────────────────────────────────────────

function SolverScene({ moveQueue, cubeState, setCubeState, onMoveComplete }) {
    return (
        <>
            <ambientLight intensity={1.0} />
            <directionalLight position={[5, 5, 5]} intensity={1.0} />
            <directionalLight position={[-3, -3, -3]} intensity={0.4} />
            <pointLight position={[0, 5, 0]} intensity={0.5} />
            <AnimationController
                moveQueue={moveQueue}
                cubeState={cubeState}
                setCubeState={setCubeState}
                onMoveComplete={onMoveComplete}
            />
            <OrbitControls enablePan={false} enableZoom={true} minDistance={4} maxDistance={12} />
        </>
    );
}

// ─── Move Button ────────────────────────────────────────────────────────────

function MoveButton({ move, onClick, isDark, color }) {
    return (
        <button
            onClick={() => onClick(move)}
            className="px-2 py-1.5 rounded text-xs sm:text-sm font-bold transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
            style={{
                backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
                color: color || (isDark ? "#e2e8f0" : "#1e293b"),
                border: `1px solid ${isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)"}`,
                minWidth: "36px",
            }}
        >
            {move}
        </button>
    );
}

// ─── Main Component ─────────────────────────────────────────────────────────

const CubeSolver = () => {
    const { isDark } = useTheme();
    const { t } = useLanguage();
    const [cubeState, setCubeState] = useState(createSolvedState);
    const [moveQueue, setMoveQueue] = useState([]);
    const [moveHistory, setMoveHistory] = useState([]);
    const [moveCount, setMoveCount] = useState(0);
    const [solved, setSolved] = useState(true);
    const [isSolving, setIsSolving] = useState(false);

    // Check solved state on every state change
    useEffect(() => {
        setSolved(isSolved(cubeState));
    }, [cubeState]);

    const addMove = useCallback((move) => {
        if (isSolving) return;
        setMoveQueue((q) => [...q, move]);
        setMoveHistory((h) => [...h, move]);
        setMoveCount((c) => c + 1);
    }, [isSolving]);

    const onMoveComplete = useCallback((move) => {
        setMoveQueue((q) => q.slice(1));
    }, []);

    const handleScramble = useCallback(() => {
        if (isSolving) return;
        const scramble = generateScramble(20);
        setMoveHistory([]);
        setMoveCount(0);
        // Apply scramble instantly
        let state = createSolvedState();
        scramble.forEach((m) => { state = applyMove(state, m); });
        setCubeState(state);
        setMoveHistory([...scramble]);
        setMoveCount(0); // Reset after scramble — user moves start from 0
        setMoveHistory([]); // Clear history for solving
        // Actually, let's keep the scramble for solve:
        setMoveHistory([...scramble]);
    }, [isSolving]);

    const handleSolve = useCallback(() => {
        if (isSolving || solved) return;
        setIsSolving(true);
        const solution = solveFromHistory([...moveHistory]);
        // Queue solution moves with animation
        let state = { ...cubeState };
        Object.keys(state).forEach((k) => (state[k] = [...state[k]]));

        // Apply all solution moves instantly
        solution.forEach((m) => { state = applyMove(state, m); });
        setCubeState(state);
        setMoveCount((c) => c + solution.length);
        setMoveHistory([]);
        setIsSolving(false);
    }, [isSolving, solved, moveHistory, cubeState]);

    const handleReset = useCallback(() => {
        setCubeState(createSolvedState());
        setMoveQueue([]);
        setMoveHistory([]);
        setMoveCount(0);
        setIsSolving(false);
    }, []);

    const moves = ["R", "L", "U", "D", "F", "B"];
    const moveColors = {
        R: FACE_COLORS.R,
        L: FACE_COLORS.L,
        U: "#888",
        D: FACE_COLORS.D,
        F: FACE_COLORS.F,
        B: FACE_COLORS.B,
    };

    return (
        <div className="relative w-full">
            {/* Canvas container */}
            <div
                style={{
                    width: "100%",
                    height: "min(50vw, 420px)",
                    minHeight: "280px",
                    maxHeight: "500px",
                    padding: "12px",
                    borderRadius: "1rem",
                    border: "1px solid var(--border-theme)",
                    boxSizing: "border-box",
                    boxShadow: isDark
                        ? "0 20px 60px rgba(250,250,250,0.3), inset 0 1px 0 rgba(255,255,255,0.06)"
                        : "0 4px 30px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.7)",
                    backgroundColor: isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.45)",
                }}
                className="backdrop-blur-xl transition-colors duration-300"
            >
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        overflow: "hidden",
                        borderRadius: ".75rem",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                    }}
                >
                    <Canvas
                        camera={{ position: [4.5, 3.5, 4.5], fov: 45 }}
                        gl={{ antialias: true, alpha: true, toneMapping: THREE.NoToneMapping, outputColorSpace: THREE.SRGBColorSpace }}
                        style={{ background: "transparent" }}
                    >
                        <SolverScene
                            moveQueue={moveQueue}
                            cubeState={cubeState}
                            setCubeState={setCubeState}
                            onMoveComplete={onMoveComplete}
                        />
                    </Canvas>
                </div>
            </div>

            {/* Status bar */}
            <div className="flex items-center justify-between mt-3 px-2">
                <div className="flex items-center gap-3">
                    <span className={`text-xs sm:text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                        {t("skills.solver.moves")}: <strong>{moveCount}</strong>
                    </span>
                    {solved && moveCount > 0 && (
                        <span className="text-xs sm:text-sm font-bold text-green-500 animate-pulse">
                            🎉 {t("skills.solver.solved")}
                        </span>
                    )}
                </div>
            </div>

            {/* Controls */}
            <div className="mt-3 space-y-3">
                {/* Face rotation buttons - CW */}
                <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
                    {moves.map((m) => (
                        <MoveButton key={m} move={m} onClick={addMove} isDark={isDark} color={moveColors[m]} />
                    ))}
                </div>

                {/* Face rotation buttons - CCW (prime) */}
                <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
                    {moves.map((m) => (
                        <MoveButton key={m + "'"} move={m + "'"} onClick={addMove} isDark={isDark} color={moveColors[m]} />
                    ))}
                </div>

                {/* Double moves */}
                <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
                    {moves.map((m) => (
                        <MoveButton key={m + "2"} move={m + "2"} onClick={addMove} isDark={isDark} color={moveColors[m]} />
                    ))}
                </div>

                {/* Action buttons */}
                <div className="flex justify-center gap-2 sm:gap-3 mt-2">
                    <button
                        onClick={handleScramble}
                        disabled={isSolving}
                        className="px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50"
                        style={{
                            backgroundColor: "#f59e0b",
                            color: "#fff",
                        }}
                    >
                        🔀 {t("skills.solver.scramble")}
                    </button>
                    <button
                        onClick={handleSolve}
                        disabled={isSolving || solved}
                        className="px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50"
                        style={{
                            backgroundColor: "#10b981",
                            color: "#fff",
                        }}
                    >
                        ✨ {t("skills.solver.solve")}
                    </button>
                    <button
                        onClick={handleReset}
                        className="px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                        style={{
                            backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
                            color: isDark ? "#e2e8f0" : "#1e293b",
                        }}
                    >
                        🔄 {t("skills.solver.reset")}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CubeSolver;

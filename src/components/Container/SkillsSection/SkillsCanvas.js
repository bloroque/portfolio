import React, { useRef, useState, useMemo, useCallback, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "../../../context/ThemeContext";
import { useLanguage } from "../../../context/LanguageContext";
import useScrollReveal from "../../../hooks/useScrollReveal";
import { renderToStaticMarkup } from "react-dom/server";

// react-icons
import { FaPhp, FaReact, FaDocker, FaGitAlt, FaLinux, FaGithub, FaNpm, FaHandshake } from "react-icons/fa";
import {
  SiLaravel, SiSymfony, SiCodeigniter, SiJavascript, SiTypescript,
  SiVuedotjs, SiMysql, SiPostgresql, SiMongodb, SiRedis, SiGraphql,
  SiTailwindcss, SiBootstrap, SiJira, SiTrello, SiJsonwebtokens,
  SiNextdotjs, SiVite, SiFramer, SiVisualstudiocode
} from "react-icons/si";
import { TbFileTypeSql, TbComponents } from "react-icons/tb";
import { DiScrum } from "react-icons/di";
import { MdDataObject, MdEmojiObjects, MdRocketLaunch } from "react-icons/md";
import { PiCodeBold, PiInfinityDuotone, PiCubeLight, PiUsersFourFill } from "react-icons/pi";
import { VscDebugAll } from "react-icons/vsc";
import { RiUserStarFill } from "react-icons/ri";
import { TfiCommentsSmiley } from "react-icons/tfi";
import { BsEmojiSunglassesFill } from "react-icons/bs";

// Skills data per face
// name: string (same in both languages) or { en, fr } for translated names
const faceSkills = {
  frontend: [
    { name: "JavaScript", color: "#F7DF1E", Icon: SiJavascript },
    { name: "TypeScript", color: "#3178C6", Icon: SiTypescript },
    { name: "React", color: "#61DAFB", Icon: FaReact },
    { name: "Vue.js", color: "#4FC08D", Icon: SiVuedotjs },
    { name: "Tailwind CSS", color: "#06B6D4", Icon: SiTailwindcss },
    { name: "Bootstrap", color: "#7952B3", Icon: SiBootstrap },
    { name: "shadcn/ui", color: "#888888", Icon: TbComponents },
    { name: "Framer Motion", color: "#0055FF", Icon: SiFramer },
    { name: "Next.js", color: "#555555", Icon: SiNextdotjs },
  ],
  backend: [
    { name: "PHP", color: "#777BB4", Icon: FaPhp },
    { name: "Laravel", color: "#FF2D20", Icon: SiLaravel },
    { name: "Symfony", color: "#6c6c6c", Icon: SiSymfony },
    { name: "CodeIgniter", color: "#EF4223", Icon: SiCodeigniter },
    { name: "REST API", color: "#009688", Icon: MdDataObject },
    { name: "GraphQL", color: "#E10098", Icon: SiGraphql },
    { name: "JWT", color: "#fb015b", Icon: SiJsonwebtokens },
  ],
  database: [
    { name: "MySQL", color: "#4479A1", Icon: SiMysql },
    { name: "PostgreSQL", color: "#4169E1", Icon: SiPostgresql },
    { name: "MongoDB", color: "#47A248", Icon: SiMongodb },
    { name: "Redis", color: "#DC382D", Icon: SiRedis },
    { name: "SQL", color: "#CC7832", Icon: TbFileTypeSql },
    { name: "ORM", color: "#FF2D20", Icon: PiCubeLight },
    // { name: "Prisma",     color: "#2D3748", iconText: "PR" },
    // { name: "Migration",  color: "#607D8B", iconText: "MG" },
    // { name: "Indexing",   color: "#795548", iconText: "IX" },
  ],
  tools: [
    { name: "Git", color: "#F05032", Icon: FaGitAlt },
    { name: "GitHub", color: "#6e5494", Icon: FaGithub },
    { name: "npm", color: "#CB3837", Icon: FaNpm },
    { name: "Vite", color: "#646CFF", Icon: SiVite },
    { name: "Docker", color: "#2496ED", Icon: FaDocker },
    { name: "Linux", color: "#FCC624", Icon: FaLinux },
    { name: "VS Code", color: "#007ACC", Icon: SiVisualstudiocode },
    { name: "Jira", color: "#0052CC", Icon: SiJira },
    { name: "Trello", color: "#0052CC", Icon: SiTrello },
  ],
  architecture: [
    { name: "Clean Code", color: "#8BC34A", Icon: PiCodeBold },
    { name: "SOLID", color: "#E91E63", Icon: PiCodeBold },
    { name: "Clean Archi", color: "#00BCD4", Icon: PiCodeBold },
    // { name: { en: "Design Pat.", fr: "Patrons conc." }, color: "#9C27B0", iconText: "DP" },
    { name: { en: "OOP", fr: "POO" }, color: "#4A90D9", iconText: { en: "OOP", fr: "POO" } },
    { name: "DDD", color: "#FF9800", iconText: "DDD" },
    { name: "TDD", color: "#4CAF50", iconText: "TDD" },
    { name: "MVC", color: "#8BC34A", iconText: "MVC" },
    { name: "CI/CD", color: "#FF5722", Icon: PiInfinityDuotone },
    { name: "Scrum", color: "#3F51B5", Icon: DiScrum },

  ],
  softskills: [
    { name: "Communication", color: "#E91E63", Icon: TfiCommentsSmiley },
    { name: { en: "Teamwork", fr: "Travail d'équipe" }, color: "#2196F3", Icon: PiUsersFourFill },
    { name: { en: "Adaptability", fr: "Adaptabilité" }, color: "#FF9800", Icon: FaHandshake },
    { name: { en: "Problem Solving", fr: "Résolution pb." }, color: "#4CAF50", Icon: VscDebugAll },
    { name: { en: "Curiosity", fr: "Curiosité" }, color: "#9C27B0", Icon: RiUserStarFill },
    { name: { en: "Autonomy", fr: "Autonomie" }, color: "#00BCD4", Icon: BsEmojiSunglassesFill },
    // { name: { en: "Rigor", fr: "Rigueur" },          color: "#795548", iconText: "\uD83D\uDCD0" },
    { name: { en: "Creativity", fr: "Créativité" }, color: "#FF5722", Icon: MdEmojiObjects },
    { name: "Leadership", color: "#607D8B", Icon: MdRocketLaunch },
  ],
};

// Resolve skill name and iconText by language
function resolveSkill(skill, lang) {
  return {
    ...skill,
    name: typeof skill.name === "object" ? (skill.name[lang] || skill.name.en) : skill.name,
    iconText: typeof skill.iconText === "object" ? (skill.iconText[lang] || skill.iconText.en) : skill.iconText,
  };
}

const faceConfig = [
  { key: "frontend", normal: [0, 0, 1], label: "Frontend", color: "#a855f7" },
  { key: "backend", normal: [0, 0, -1], label: "Backend", color: "#3b82f6" },
  { key: "tools", normal: [1, 0, 0], label: "Tools & DevOps", color: "#f59e0b" },
  { key: "database", normal: [-1, 0, 0], label: "Database", color: "#10b981" },
  { key: "architecture", normal: [0, 1, 0], label: "Architecture", color: "#e11d48" },
  { key: "softskills", normal: [0, -1, 0], label: "Soft Skills", color: "#d97706" },
];

// Render react-icon to SVG data URL
function iconToDataURL(IconComponent, color, size) {
  if (!IconComponent) return null;
  try {
    const svgMarkup = renderToStaticMarkup(
      React.createElement(IconComponent, { color: color, size: size })
    );
    return "data:image/svg+xml," + encodeURIComponent(svgMarkup);
  } catch (e) {
    return null;
  }
}



function drawFallbackIcon(ctx, cx, size, skill) {
  const iconY = size * 0.38;
  const radius = size * 0.2;
  ctx.fillStyle = skill.color;
  ctx.beginPath();
  ctx.arc(cx, iconY, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  const text = skill.iconText || "?";
  const fSize = text.length > 2 ? radius * 0.6 : radius * 0.85;
  ctx.font = "bold " + fSize + "px Inter, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, cx, iconY + 2);
}

// Texture vide : même fond et bordure que les autres cellules, sans icône ni label
function createEmptyStickerTexture(faceColor, isDark) {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  // Effacer le canvas en transparent (évite les points noirs dans les coins arrondis)
  ctx.clearRect(0, 0, size, size);

  const r = 18;

  ctx.beginPath();
  ctx.roundRect(0, 0, size, size, r);
  ctx.fillStyle = isDark ? "#0f172a" : "#ffffff";
  ctx.fill();

  ctx.beginPath();
  ctx.roundRect(4, 4, size - 8, size - 8, r - 2);
  ctx.strokeStyle = faceColor;
  ctx.lineWidth = 8;
  ctx.stroke();

  ctx.beginPath();
  ctx.roundRect(12, 12, size - 24, size - 24, r - 6);
  ctx.strokeStyle = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";
  ctx.lineWidth = 1;
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// ═══════════════════════════════════════════════════════════════════════════════
// createStickerTextureAsync — Génère la texture (sticker) d'une cellule du cube
// ─────────────────────────────────────────────────────────────────────────────────
// Chaque cellule visible sur une face du Rubik's cube affiche :
//   1. Un fond blanc (#fff) ou sombre selon le thème
//   2. Une bordure colorée correspondant à la catégorie (faceColor)
//   3. L'icône du skill (SVG react-icon ou fallback texte dans un cercle)
//   4. Le libellé (nom du skill) en dessous de l'icône
//
// Retourne une Promise<THREE.CanvasTexture> car le chargement SVG → Image est async
// ═══════════════════════════════════════════════════════════════════════════════
function createStickerTextureAsync(skill, faceColor, isDark) {
  return new Promise((resolve) => {
    // Taille du canvas de la texture (256x256 pixels)
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    // Effacer le canvas en transparent (évite les points noirs dans les coins arrondis)
    ctx.clearRect(0, 0, size, size);

    // ── Étape 1 : Dessiner le fond + bordures de la cellule ──
    const r = 18;
    const drawBase = () => {
      // Fond blanc (clair) ou sombre selon le thème — coins arrondis
      ctx.beginPath();
      ctx.roundRect(0, 0, size, size, r);
      ctx.fillStyle = isDark ? "#0f172a" : "#ffffff";
      ctx.fill();

      // Bordure extérieure colorée (couleur de la catégorie/face)
      ctx.beginPath();
      ctx.roundRect(4, 4, size - 8, size - 8, r - 2);
      ctx.strokeStyle = faceColor;
      ctx.lineWidth = 8;
      ctx.stroke();

      // Bordure intérieure subtile pour effet de profondeur
      ctx.beginPath();
      ctx.roundRect(12, 12, size - 24, size - 24, r - 6);
      ctx.strokeStyle = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    // ── Étape 2 : Dessiner le libellé (nom du skill) en bas de la cellule ──
    const drawLabel = () => {
      const cx = size / 2;
      ctx.fillStyle = isDark ? "#f1f5f9" : "#0f172a";
      const fontSize = 22;
      ctx.font = "700 " + fontSize + "px Inter, system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Text wrapping: split into lines that fit within maxWidth
      const maxWidth = size - 50; // 20px padding each side
      const words = skill.name.split(/\s+/);
      const lines = [];
      let currentLine = words[0];
      for (let i = 1; i < words.length; i++) {
        const testLine = currentLine + " " + words[i];
        if (ctx.measureText(testLine).width > maxWidth) {
          lines.push(currentLine);
          currentLine = words[i];
        } else {
          currentLine = testLine;
        }
      }
      lines.push(currentLine);

      // Draw lines centered vertically around the label zone
      const lineHeight = fontSize + 4;
      const totalHeight = lines.length * lineHeight;
      const startY = size * 0.7 - totalHeight / 2 + lineHeight / 2;
      lines.forEach((line, i) => {
        ctx.fillText(line, cx, startY + i * lineHeight);
      });
    };

    // ── Étape 3 : Finaliser — ajouter le label puis créer la texture Three.js ──
    const finalize = () => {
      drawLabel();
      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      resolve(texture);
    };

    drawBase();
    const cx = size / 2;

    // ── Étape 4 : Dessiner l'icône du skill ──
    if (skill.Icon) {
      // Si le skill a un composant react-icon, on le convertit en SVG data URL
      const dataURL = iconToDataURL(skill.Icon, skill.color, 80);
      if (dataURL) {
        // Charger le SVG comme Image pour le dessiner sur le canvas
        const img = new Image();
        img.onload = () => {
          // Dessiner l'icône SVG centrée dans la partie haute de la cellule
          ctx.drawImage(img, cx - 40, size * 0.18, 80, 80);
          finalize();
        };
        img.onerror = () => {
          // En cas d'erreur, utiliser le fallback (cercle + texte)
          drawFallbackIcon(ctx, cx, size, skill);
          finalize();
        };
        img.src = dataURL;
        return;
      }
    }
    // Pas d'icône react-icon → utiliser le fallback (cercle coloré + texte abrégé)
    drawFallbackIcon(ctx, cx, size, skill);
    finalize();
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// SmallCube — Un petit cube individuel du Rubik's cube 3x3
// ─────────────────────────────────────────────────────────────────────────────────
// Au montage, chaque cube part d'une position/rotation aléatoire (scramble)
// et s'anime vers sa position finale (solve).
// ═══════════════════════════════════════════════════════════════════════════════
function SmallCube({ position, faceTextures, isDark, scrambleOffset, scrambleDelay, isVisible }) {
  const groupRef = useRef();
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const solveProgressRef = useRef(0);
  const solveDelayRef = useRef(scrambleDelay || 0);
  const directionRef = useRef(0);       // 0 = idle, 1 = solving, -1 = unsolving
  const prevVisibleRef = useRef(false);
  const hasEverStartedRef = useRef(false);

  // Créer les 6 matériaux du cube (un par face)
  const materials = useMemo(() => {
    const defaultColor = isDark ? "#141425" : "#ffffff";
    const mats = Array(6).fill(null).map(() =>
      new THREE.MeshLambertMaterial({ color: defaultColor })
    );
    if (faceTextures) {
      Object.entries(faceTextures).forEach(([faceIdx, texture]) => {
        const idx = parseInt(faceIdx);
        texture.colorSpace = THREE.SRGBColorSpace;
        mats[idx] = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
      });
    }
    return mats;
  }, [faceTextures, isDark]);

  // Géométrie + contours pour l'effet Rubik's cube (arêtes noires)
  // const edgesGeo = useMemo(() => {
  //   const box = new THREE.BoxGeometry(0.93, 0.93, 0.93);
  //   return new THREE.EdgesGeometry(box);
  // }, []);

  // Scramble animation data
  const scramble = useMemo(() => {
    if (!scrambleOffset) return null;
    return {
      posOffset: new THREE.Vector3(...scrambleOffset.pos),
      rotOffset: new THREE.Euler(...scrambleOffset.rot),
      startQuat: new THREE.Quaternion().setFromEuler(new THREE.Euler(...scrambleOffset.rot)),
      endQuat: new THREE.Quaternion(), // identity = solved
    };
  }, [scrambleOffset]);

  // Animate solve (forward) and scramble (reverse) based on scroll visibility
  useFrame((_, delta) => {
    if (!groupRef.current || !scramble) return;

    // Detect visibility transitions
    if (isVisible !== prevVisibleRef.current) {
      if (isVisible) {
        // Section entered viewport → solve forward
        directionRef.current = 1;
        solveDelayRef.current = scrambleDelay || 0;
        hasEverStartedRef.current = true;
      } else if (hasEverStartedRef.current) {
        // Section left viewport → reverse back to scrambled
        directionRef.current = -1;
      }
      prevVisibleRef.current = isVisible;
    }

    // Not yet triggered — stay scrambled
    if (!hasEverStartedRef.current) {
      groupRef.current.position.set(
        position[0] + scramble.posOffset.x,
        position[1] + scramble.posOffset.y,
        position[2] + scramble.posOffset.z
      );
      groupRef.current.quaternion.copy(scramble.startQuat);
      return;
    }

    // Fully solved and not reversing — hold
    if (directionRef.current >= 0 && solveProgressRef.current >= 1) return;
    // Fully scrambled after reverse — hold
    if (directionRef.current <= 0 && solveProgressRef.current <= 0) {
      groupRef.current.position.set(
        position[0] + scramble.posOffset.x,
        position[1] + scramble.posOffset.y,
        position[2] + scramble.posOffset.z
      );
      groupRef.current.quaternion.copy(scramble.startQuat);
      return;
    }

    // Wait for staggered delay (forward only)
    if (directionRef.current === 1 && solveDelayRef.current > 0) {
      solveDelayRef.current -= delta;
      groupRef.current.position.set(
        position[0] + scramble.posOffset.x,
        position[1] + scramble.posOffset.y,
        position[2] + scramble.posOffset.z
      );
      groupRef.current.quaternion.copy(scramble.startQuat);
      return;
    }

    // Animate progress (forward = 1.2, reverse = 1.8 slightly faster)
    const speed = directionRef.current === 1 ? 1.2 : 1.8;
    solveProgressRef.current = Math.max(0, Math.min(1,
      solveProgressRef.current + delta * speed * directionRef.current
    ));
    const p = solveProgressRef.current;
    // Ease out cubic
    const t = 1 - Math.pow(1 - p, 3);

    // Lerp position
    groupRef.current.position.set(
      position[0] + scramble.posOffset.x * (1 - t),
      position[1] + scramble.posOffset.y * (1 - t),
      position[2] + scramble.posOffset.z * (1 - t)
    );

    // Slerp rotation
    groupRef.current.quaternion.slerpQuaternions(
      scramble.startQuat,
      scramble.endQuat,
      t
    );
  });

  return (
    <group
      ref={groupRef}
      position={position}
      scale={hovered ? 1.06 : 1}
    >
      <mesh
        ref={meshRef}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[0.93, 0.93, 0.93]} />
        {materials.map((mat, i) => (
          <primitive key={i} object={mat} attach={"material-" + i} />
        ))}
      </mesh>
      {/* Contour noir sur les arêtes = ombre/profondeur entre les cellules */}
      {/* <lineSegments geometry={edgesGeo}>
        <lineBasicMaterial color={isDark ? "#000000" : "#c0c0c0"} linewidth={1} />
      </lineSegments> */}
    </group>
  );
}

// -- RubiksCube --
function RubiksCube({ isDark, targetFace, onAnimDone, lang, isVisible }) {
  const groupRef = useRef();
  const { camera } = useThree();
  const autoRotateRef = useRef(true);
  const isPointerDownRef = useRef(false);
  const isHoveredRef = useRef(false);
  const resumeTimerRef = useRef(null);
  const animatingRef = useRef(false);
  const targetQuatRef = useRef(null);
  const startQuatRef = useRef(new THREE.Quaternion());
  const animProgressRef = useRef(0);
  const [texturesReady, setTexturesReady] = useState(false);
  const [asyncTextures, setAsyncTextures] = useState(null);

  // Helper: schedule auto-rotate resume after delay
  const scheduleResume = useCallback((delay = 3000) => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      if (!isPointerDownRef.current && !isHoveredRef.current) {
        autoRotateRef.current = true;
      }
    }, delay);
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => { if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current); };
  }, []);

  // ═══════════════════════════════════════════════════════════════════════════
  // Construction des 27 cellules du Rubik's cube 3x3x3
  // ─────────────────────────────────────────────────────────────────────────────
  // On parcourt toutes les positions (x, y, z) de -1 à 1 → 3x3x3 = 27 cubes.
  // Pour chaque petit cube, on vérifie s'il est sur une face extérieure :
  //   - Si oui, on détermine quel skill afficher (position dans la grille 3x3)
  //   - On génère la texture (sticker) correspondante de manière asynchrone
  //   - On l'assigne au bon index de matériau (face du BoxGeometry)
  //
  // Mapping des normales vers les index de matériau Three.js BoxGeometry :
  //   normal [1,0,0]  → matIdx 0 (face droite   +X) → catégorie "tools"
  //   normal [-1,0,0] → matIdx 1 (face gauche   -X) → catégorie "database"
  //   normal [0,1,0]  → matIdx 2 (face haut     +Y) → catégorie "architecture"
  //   normal [0,-1,0] → matIdx 3 (face bas      -Y) → catégorie "softskills"
  //   normal [0,0,1]  → matIdx 4 (face avant    +Z) → catégorie "frontend"
  //   normal [0,0,-1] → matIdx 5 (face arrière  -Z) → catégorie "backend"
  // ═══════════════════════════════════════════════════════════════════════════
  useEffect(() => {
    let cancelled = false;
    async function buildTextures() {
      const cubes = [];

      // Parcourir les 27 positions du cube 3x3x3
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          for (let z = -1; z <= 1; z++) {
            const texPromises = {};

            // Pour chaque face du Rubik's cube (6 catégories)
            faceConfig.forEach((face) => {
              const [nx, ny, nz] = face.normal;

              // Vérifier si ce petit cube est situé sur cette face extérieure
              // Ex: si la face a normal [1,0,0] (+X), seuls les cubes avec x=1 sont dessus
              let isOnFace = false;
              if (nx === 1 && x === 1) isOnFace = true;
              if (nx === -1 && x === -1) isOnFace = true;
              if (ny === 1 && y === 1) isOnFace = true;
              if (ny === -1 && y === -1) isOnFace = true;
              if (nz === 1 && z === 1) isOnFace = true;
              if (nz === -1 && z === -1) isOnFace = true;

              if (isOnFace) {
                const skills = faceSkills[face.key].map((s) => resolveSkill(s, lang));

                // Calculer la position (row, col) dans la grille 3x3 de cette face
                // pour déterminer quel skill (parmi les 9) afficher
                let row, col;
                if (nx !== 0) {
                  // Face droite (+X) ou gauche (-X) : col dépend de z, row de y
                  col = nx === 1 ? (1 - z) : (z + 1);
                  row = 1 - y; // y=1 → row 0 (haut), y=-1 → row 2 (bas)
                } else if (ny !== 0) {
                  // Face haut (+Y) ou bas (-Y) : col dépend de x, row de z
                  col = x + 1;
                  row = ny === 1 ? (1 - z) : (z + 1);
                } else {
                  // Face avant (+Z) ou arrière (-Z) : col dépend de x, row de y
                  col = nz === 1 ? (x + 1) : (1 - x);
                  row = 1 - y;
                }

                // Clamper dans [0, 2] et calculer l'index du skill (0-8)
                row = Math.max(0, Math.min(2, Math.round(row)));
                col = Math.max(0, Math.min(2, Math.round(col)));
                const skillIdx = row * 3 + col; // Grille 3x3 → index 0 à 8
                const skill = skills[skillIdx];

                // Mapper la normale vers l'index de matériau Three.js
                let matIdx;
                if (nx === 1) matIdx = 0;       // face +X
                else if (nx === -1) matIdx = 1; // face -X
                else if (ny === 1) matIdx = 2;  // face +Y
                else if (ny === -1) matIdx = 3; // face -Y
                else if (nz === 1) matIdx = 4;  // face +Z
                else matIdx = 5;                // face -Z

                if (skill) {
                  // Créer la texture (sticker) du skill pour cette face
                  texPromises[matIdx] = createStickerTextureAsync(skill, face.color, isDark);
                } else {
                  // Cellule vide : même fond + bordure, sans icône ni label
                  texPromises[matIdx] = Promise.resolve(createEmptyStickerTexture(face.color, isDark));
                }
              }
            });

            // Attendre que toutes les textures de ce petit cube soient prêtes
            const resolvedTextures = {};
            for (const [k, p] of Object.entries(texPromises)) {
              resolvedTextures[k] = await p;
            }

            // Ajouter le cube avec sa position et ses textures
            cubes.push({ position: [x, y, z], faceTextures: resolvedTextures });
          }
        }
      }

      if (!cancelled) {
        // Generate scramble offsets for each cube (solve animation on mount)
        const scrambledCubes = cubes.map((cube, i) => {
          const angle1 = Math.random() * Math.PI * 2;
          const angle2 = Math.random() * Math.PI * 2;
          const dist = 3 + Math.random() * 4; // scatter distance
          return {
            ...cube,
            scrambleOffset: {
              pos: [
                Math.cos(angle1) * Math.sin(angle2) * dist,
                (Math.random() - 0.5) * dist * 1.5,
                Math.sin(angle1) * Math.sin(angle2) * dist,
              ],
              rot: [
                (Math.random() - 0.5) * Math.PI * 4,
                (Math.random() - 0.5) * Math.PI * 4,
                (Math.random() - 0.5) * Math.PI * 4,
              ],
            },
            scrambleDelay: 0.3 + Math.random() * 1.2, // staggered 0.3s – 1.5s
          };
        });
        setAsyncTextures(scrambledCubes);
        setTexturesReady(true);
      }
    }
    buildTextures();
    return () => { cancelled = true; };
  }, [isDark, lang]);

  // Handle target face change — compute quaternion that aligns face normal toward
  // camera AND keeps texture text upright (not reversed/flipped)
  useEffect(() => {
    if (targetFace && groupRef.current) {
      const face = faceConfig.find(f => f.key === targetFace);
      if (!face) return;

      // Direction from cube center to camera
      const camDir = camera.position.clone().normalize();
      const faceNormal = new THREE.Vector3(...face.normal);

      // "Up" direction on the texture at identity rotation for each face
      // (what direction in world space corresponds to "top of the text")
      const faceUpMap = {
        frontend: [0, 1, 0],   // +Z face: text up = +Y
        backend: [0, 1, 0],   // -Z face: text up = +Y
        tools: [0, 1, 0],   // +X face: text up = +Y
        database: [0, 1, 0],   // -X face: text up = +Y
        architecture: [0, 0, -1],  // +Y face: text up = -Z (Three.js UV mapping)
        softskills: [0, 0, 1],   // -Y face: text up = +Z (Three.js UV mapping)
      };
      const faceUp = new THREE.Vector3(...faceUpMap[face.key]);

      // --- Source frame: face orientation at identity rotation ---
      const srcZ = faceNormal.clone();       // face forward = its normal
      const srcY = faceUp.clone();           // face texture up
      const srcX = new THREE.Vector3().crossVectors(srcY, srcZ).normalize();

      // --- Target frame: face pointing at camera, text upright ---
      const tgtZ = camDir.clone();           // face normal should point at camera
      // Project world-up onto plane perpendicular to tgtZ → keeps text upright
      const worldUp = new THREE.Vector3(0, 1, 0);
      let tgtY = worldUp.clone().sub(tgtZ.clone().multiplyScalar(worldUp.dot(tgtZ)));
      if (tgtY.lengthSq() < 0.001) {
        // Camera nearly vertical — use -Z as fallback up
        tgtY.set(0, 0, -1);
      }
      tgtY.normalize();
      const tgtX = new THREE.Vector3().crossVectors(tgtY, tgtZ).normalize();

      // Rotation = targetFrame × inverse(sourceFrame)
      const srcMat = new THREE.Matrix4().makeBasis(srcX, srcY, srcZ);
      const tgtMat = new THREE.Matrix4().makeBasis(tgtX, tgtY, tgtZ);
      const rotMat = tgtMat.clone().multiply(srcMat.clone().invert());
      const targetQuat = new THREE.Quaternion().setFromRotationMatrix(rotMat);

      targetQuatRef.current = targetQuat;
      startQuatRef.current.copy(groupRef.current.quaternion);
      animProgressRef.current = 0;
      animatingRef.current = true;
      autoRotateRef.current = false;
    }
  }, [targetFace, camera]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Animate to target face using quaternion slerp (shortest path, no gimbal lock)
    if (animatingRef.current && targetQuatRef.current) {
      animProgressRef.current = Math.min(1, animProgressRef.current + delta * 2.5);
      // Ease in-out cubic for smooth animation
      const p = animProgressRef.current;
      const t = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;

      groupRef.current.quaternion.slerpQuaternions(
        startQuatRef.current,
        targetQuatRef.current,
        t
      );

      if (animProgressRef.current >= 1) {
        groupRef.current.quaternion.copy(targetQuatRef.current);
        animatingRef.current = false;
        targetQuatRef.current = null;
        if (onAnimDone) onAnimDone();
        // Resume auto-rotate after a pause so user can read the face
        scheduleResume(4000);
      }
      return;
    }

    // Auto rotate only if not interacting
    if (autoRotateRef.current && !isPointerDownRef.current && !isHoveredRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
      groupRef.current.rotation.x += delta * 0.05;
    }
  });

  if (!texturesReady || !asyncTextures) {
    return null;
  }

  return (
    <group
      ref={groupRef}
      onPointerDown={() => { isPointerDownRef.current = true; autoRotateRef.current = false; }}
      onPointerUp={() => { isPointerDownRef.current = false; scheduleResume(2000); }}
      onPointerLeave={() => { isPointerDownRef.current = false; isHoveredRef.current = false; scheduleResume(1500); }}
      onPointerOver={() => { isHoveredRef.current = true; autoRotateRef.current = false; }}
      onPointerOut={() => { isHoveredRef.current = false; scheduleResume(1500); }}
    >
      {asyncTextures.map((cube, i) => (
        <SmallCube
          key={i}
          position={cube.position}
          faceTextures={cube.faceTextures}
          isDark={isDark}
          scrambleOffset={cube.scrambleOffset}
          scrambleDelay={cube.scrambleDelay}
          isVisible={isVisible}
        />
      ))}
    </group>
  );
}

// -- FrameController: only invalidate the canvas when section is visible --
function FrameController({ isVisible }) {
  const { invalidate } = useThree();
  useEffect(() => {
    if (!isVisible) return;
    let running = true;
    const tick = () => {
      if (running) {
        invalidate();
        requestAnimationFrame(tick);
      }
    };
    requestAnimationFrame(tick);
    return () => { running = false; };
  }, [isVisible, invalidate]);
  return null;
}

// -- Legend --
function FaceLegend({ activeFace, onFaceClick, t }) {
  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-4">
      {faceConfig.map((face) => {
        const isActive = activeFace === face.key;
        return (
          <button
            key={face.key}
            onClick={() => onFaceClick(face.key)}
            className={
              "flex items-center gap-1.5 px-2.5 py-1.5 rounded border transition-all duration-300 cursor-pointer " +
              (isActive
                ? "border-current shadow-md scale-105"
                : "border-[var(--border-theme)] hover:border-current hover:shadow-sm")
            }
            style={{ color: face.color }}
          >
            <span
              className="inline-block w-3 h-3 rounded-sm"
              style={{ backgroundColor: face.color }}
            />
            <span className={"text-xs sm:text-sm font-semibold " + (isActive ? "" : "text-[var(--text-secondary)]")}>
              {t("skills.cubeFaces." + face.key)}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// -- Main --
const SkillsCanvas = () => {
  const { isDark } = useTheme();
  const { t, lang } = useLanguage();
  const [scrollRef, isVisible] = useScrollReveal({ threshold: 0.2, once: false });
  const [activeFace, setActiveFace] = useState(null);
  const [targetFace, setTargetFace] = useState(null);

  const handleFaceClick = useCallback((faceKey) => {
    setActiveFace(faceKey);
    setTargetFace(faceKey);
  }, []);

  const handleAnimDone = useCallback(() => {
    setTargetFace(null);
  }, []);

  return (
    <div className="relative w-full" ref={scrollRef}>
      {/* Outer wrapper: handles border + shadow + border-radius */}
      <div
        style={{
          width: "100%",
          height: "min(60vw, 520px)",
          minHeight: "300px",
          maxHeight: "600px",
          padding: "15px",
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
        {/* Inner wrapper: handles background, overflow-hidden, and matching inner border-radius */}
        <div
          style={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
            // backgroundImage: isDark
            //   ? "radial-gradient(circle, rgba(255,255,255,0.07) 1.5px, transparent 1px)"
            //   : "radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)",
            // backgroundColor: isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.45)",
            borderRadius: ".75rem",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          <Canvas
            frameloop="demand"
            camera={{ position: [4.5, 3.5, 4.5], fov: 45 }}
            gl={{ antialias: true, alpha: true, toneMapping: THREE.NoToneMapping, outputColorSpace: THREE.SRGBColorSpace }}
            style={{ background: "transparent" }}
          >
            <FrameController isVisible={isVisible} />
            <ambientLight intensity={1.0} />
            <directionalLight position={[5, 5, 5]} intensity={1.0} />
            <directionalLight position={[-3, -3, -3]} intensity={0.4} />
            <pointLight position={[0, 5, 0]} intensity={0.5} />
            <RubiksCube isDark={false} targetFace={targetFace} onAnimDone={handleAnimDone} lang={lang} isVisible={isVisible} />
            <OrbitControls
              enablePan={false}
              enableZoom={true}
              minDistance={4}
              maxDistance={12}
            />
          </Canvas>
        </div>
      </div>
      <FaceLegend activeFace={activeFace} onFaceClick={handleFaceClick} t={t} />


    </div>
  );
};

export default SkillsCanvas;
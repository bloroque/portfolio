import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../../context/LanguageContext";
import ExperienceCSS from "./ExperienceSection.module.css";
import { FaBriefcase, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const ExperienceSection = (props) => {
  const classeCSS = props.className;
  const idSection = props.id;
  const sectionStyle = props.style;
  const { t, lang } = useLanguage();

  const experiences = t("experience.jobs");

  /* ── Date helpers ─────────────────────────────────────────────────────── */
  const monthNamesEn = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const monthNamesFr = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
  ];

  const parseDate = (str) => {
    if (!str) return null;
    const [month, year] = str.split("-").map(Number);
    return { month, year };
  };

  const formatDate = (str) => {
    const d = parseDate(str);
    if (!d) return lang === "fr" ? "Présent" : "Present";
    const names = lang === "fr" ? monthNamesFr : monthNamesEn;
    return `${names[d.month - 1]} ${d.year}`;
  };

  const calcDuration = (startStr, finishStr) => {
    const start = parseDate(startStr);
    if (!start) return "";
    const end = finishStr
      ? parseDate(finishStr)
      : { month: new Date().getMonth() + 1, year: new Date().getFullYear() };
    let total = (end.year - start.year) * 12 + (end.month - start.month);
    if (total < 0) total = 0;
    const years = Math.floor(total / 12);
    const months = total % 12;
    if (lang === "fr") {
      if (years === 0) return `${months} mois`;
      if (months === 0) return `${years} an${years > 1 ? "s" : ""}`;
      return `${years} an${years > 1 ? "s" : ""} ${months} mois`;
    }
    if (years === 0) return `${months} mo${months > 1 ? "s" : ""}`;
    if (months === 0) return `${years} yr${years > 1 ? "s" : ""}`;
    return `${years} yr${years > 1 ? "s" : ""} ${months} mo${months > 1 ? "s" : ""}`;
  };

  /* ── Motion variants ──────────────────────────────────────────────────── */
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const titleVariants = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const cardVariants = {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  /* ── Current month/year label ─────────────────────────────────────────── */
  const now = new Date();
  const currentMonthYear =
    lang === "fr"
      ? `${monthNamesFr[now.getMonth()]} ${now.getFullYear()}`
      : `${monthNamesEn[now.getMonth()]} ${now.getFullYear()}`;

  return (
    <motion.section
      id={idSection}
      className={`${classeCSS} ${ExperienceCSS.Experience}`}
      style={sectionStyle}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1 }}
      variants={containerVariants}
    >
      <div className="mx-auto max-w-screen-lg w-full flex flex-col justify-center px-3 sm:px-4 py-2 sm:py-3">

        {/* ── Section title ───────────────────────────────────────────────── */}
        <motion.div
          variants={titleVariants}
          className="px-1 sm:px-3 md:pe-7 space-y-1.5 sm:space-y-2 mb-2 sm:my-4 lg:mb-10 relative"
        >
          <h2 className="text-heading font-bold text-fluid-3xl tracking-wide relative inline-block">
            {t("experience.title")}

            {/* Curved arrow decoration */}
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 30"
              className="absolute -right-10 sm:-right-14 top-0 w-8 sm:w-12 md:w-14 pointer-events-none"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.4 }}
            >
              <motion.path
                d="M 3 22 C 8 8, 22 2, 38 5 M 33 1 L 39 5 L 33 10"
                stroke="var(--svg-deco-arrow)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="transparent"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 1, ease: "easeInOut" }}
              />
            </motion.svg>
          </h2>


          <motion.p variants={cardVariants} className="text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed">
            {t("experience.subtitle")}
          </motion.p>

        </motion.div>

        {/* ── Timeline ────────────────────────────────────────────────────── */}
        <div className="relative px-1 sm:px-3">
          <div className={ExperienceCSS.timelineCenterLine} />

          <div className="flex flex-col gap-0">
            {experiences.map((job, index) => {
              const isCurrent = job.current;
              const isLooking = job.isLooking;
              const realIndex = isLooking ? 0 : index;
              const isLeft = realIndex % 2 === 0;

              /* ── "Looking" card ─────────────────────────────────────── */
              if (isLooking) {
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className={`relative pb-6 ${ExperienceCSS.timelineItem}`}
                  >
                    {/* Dot */}
                    <div className={`${ExperienceCSS.timelineDotCenter} ${ExperienceCSS.dotCurrent}`}>
                      <span className={ExperienceCSS.dotPing} />
                      {/* Star / sparkle icon */}
                      <span className="text-emerald-700 dark:text-emerald-300 text-xs font-bold">✦</span>
                    </div>

                    {/* Card — left side */}
                    <div className={ExperienceCSS.cardLeft}>
                      <div className={`${ExperienceCSS.card} ${ExperienceCSS.cardLooking}`}>
                        <p className="text-emerald-700 dark:text-emerald-300 text-fluid-xs mb-1 tracking-wide">
                          {currentMonthYear}
                        </p>
                        <h3 className="text-emerald-700 dark:text-emerald-300 font-semibold text-fluid-sm leading-snug mb-1.5">
                          {job.role}
                        </h3>
                        <div className="flex justify-center flex-wrap gap-x-3 text-fluid-xs text-emerald-700 dark:text-emerald-300 opacity-80">
                          {job.type && <span>{job.type}</span>}
                          {job.location && (
                            <span className="flex items-center gap-1">
                              <FaMapMarkerAlt className="text-[9px] shrink-0" />
                              {job.location}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              }

              /* ── Regular job card ───────────────────────────────────── */
              const duration = calcDuration(job.dateStart, job.dateFinish);

              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`relative pb-12 last:pb-0 ${ExperienceCSS.timelineItem}`}
                >
                  {/* Dot */}
                  <div
                    className={`${ExperienceCSS.timelineDotCenter} ${
                      isCurrent ? ExperienceCSS.dotCurrent : ExperienceCSS.dotPast
                    }`}
                  >
                    {isCurrent && <span className={ExperienceCSS.dotPing} />}
                    <FaBriefcase className="text-[var(--text-secondary)] text-[13px]" />
                  </div>

                  {/* Card */}
                  <div className={isLeft ? ExperienceCSS.cardLeft : ExperienceCSS.cardRight}>
                    <div
                      className={`${ExperienceCSS.card} ${
                        isCurrent ? ExperienceCSS.cardCurrent : ""
                      }`}
                    >
                      {/* Date range */}
                      <p className="text-[var(--text-muted)] text-fluid-xs mb-1.5 flex items-center gap-1.5 flex-wrap">
                        <span>
                          {formatDate(job.dateStart)} – {formatDate(job.dateFinish)}
                        </span>
                      </p>

                      {/* Duration badge */}
                      {duration && (
                        <div className={ExperienceCSS.durationBadge}>
                          <FaClock className="text-[9px]" />
                          <span>{duration}</span>
                        </div>
                      )}

                      {/* Role */}
                      <h3 className="text-heading font-semibold text-fluid-base leading-snug mb-1">
                        {job.role}
                      </h3>

                      {/* Company + type */}
                      <div className="mb-2 space-y-1">
                        <p className="text-primary text-fluid-sm font-medium">
                          {job.company}
                          {job.type && (
                            <span className="text-secondary font-normal">
                              {" "}· {job.type}
                            </span>
                          )}
                        </p>

                        {/* Location */}
                        {job.location && (
                          <p className="text-secondary text-fluid-xs flex items-center gap-1">
                            <FaMapMarkerAlt className="text-[9px] shrink-0" />
                            <span>{job.location}</span>
                            {job.remote && (
                              <span className="opacity-60"> · {job.remote}</span>
                            )}
                          </p>
                        )}
                      </div>

                      {/* Description */}
                      {job.description && job.description.length > 0 && (
                        <p className="text-primary text-fluid-xs leading-relaxed mb-2">
                          {job.description}
                        </p>
                      )}

                      {/* Achievements */}
                      {job.achievements && job.achievements.length > 0 && (
                        <ul className="space-y-1.5 mb-3">
                          {job.achievements.map((item, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-fluid-xs text-primary"
                            >
                              <span className="mt-[6px] w-[5px] h-[5px] rounded-full bg-[var(--color-accent)] shrink-0" />
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Skills */}
                      {job.skills && job.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {job.skills.map((skill, i) => (
                            <span
                              key={i}
                              className="px-2 py-[3px] text-fluid-xs font-medium rounded-full
                                         bg-[var(--color-accent)]/10 text-[var(--color-accent)]
                                         border border-[var(--color-accent)]/20
                                         shimmer"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </motion.section>
  );
};

export default ExperienceSection;
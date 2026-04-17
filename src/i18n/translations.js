import nav from './sections/nav';
import header from './sections/header';
import home from './sections/home';
import about from './sections/about';
import skills from './sections/skills';
import projects from './sections/projects';
import experience from './sections/experience';
import contact from './sections/contact';
import footer from './sections/footer';

const sections = [nav, header, home, about, skills, projects, experience, contact, footer];

const translations = {
  en: {},
  fr: {},
};

sections.forEach((section) => {
  Object.assign(translations.en, section.en);
  Object.assign(translations.fr, section.fr);
});

export default translations;

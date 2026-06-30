import { ThemeProvider } from '@/context/ThemeContext';
import { FontScaleProvider } from '@/context/FontScaleContext';
import { Navbar } from '@/components/layout/Navbar';
import { AccessibilityPanel } from '@/components/ui/AccessibilityPanel';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/sections/Footer';

export default function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <FontScaleProvider>
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ExperienceSection />
          <ContactSection />
        </main>
        <Footer />
        <AccessibilityPanel />
      </FontScaleProvider>
    </ThemeProvider>
  );
}

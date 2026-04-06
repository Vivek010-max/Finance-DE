import {
  AudienceSection,
  CompareSection,
  CopilotSection,
  CtaSection,
  HeroSection,
  LandingFooter,
  ProblemSection,
  SolutionSection,
} from "../components/landing/LandingSections";
import { landingStyles as S } from "../components/landing/landingShared";
import { useLandingPageEffects } from "../components/landing/useLandingPageEffects";

// Navbar Component with Apple-like Glassmorphism
const Navbar = () => {
  return (
    <nav 
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        width: '100%',
        height: '52px', // Apple's standard height is usually around 44px-52px
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.72)', 
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
      }}
    >
      <div style={{ 
        width: '100%', 
        maxWidth: '1024px', // Standard Apple content width
        padding: '0 22px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        {/* Logo Container */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src="/Logo2.png" // Replace with your actual path
            alt="Logo"
            style={{ 
              height: '40px', 
              width: 'auto',
              // This turns a white PNG into black
              filter: 'invert(1)',
              display: 'block'
            }} 
          />
        </div>

        {/* Navigation Links */}
        <div style={{ 
          display: 'flex', 
          gap: '30px', 
          fontSize: '12px', 
          fontWeight: 400,
          color: '#1d1d1f', // Apple's dark grey/black
          opacity: 0.8 
        }}>
          <a href="#features" style={{ textDecoration: 'none', color: 'inherit' }}>Features</a>
          <a href="#solutions" style={{ textDecoration: 'none', color: 'inherit' }}>Solutions</a>
          <a href="#compare" style={{ textDecoration: 'none', color: 'inherit' }}>Compare</a>
        </div>

        {/* Action Button */}
        <button style={{
          backgroundColor: 'rgba(0, 0, 0, .75)', // Apple Blue
          color: '#fff',
          padding: '4px 12px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: 400,
          border: 'none',
          cursor: 'pointer'
        }}>
          Buy
        </button>
      </div>
    </nav>
  );
};

export function LandingPage() {
  const { curRef, ringRef } = useLandingPageEffects();

  return (
    <div>
      <Navbar /> 
      <div style={S.page}>
        <div ref={curRef} className="of-cur" />
        <div ref={ringRef} className="of-cur-ring" />
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <CopilotSection />
        <AudienceSection />
        <CompareSection />
        <CtaSection />
        <LandingFooter />
      </div>
    </div>
  );
}

export default LandingPage;
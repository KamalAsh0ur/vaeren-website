import CanvasSequence from '../components/CanvasSequence';
import OverlayUI from '../components/OverlayUI';
import Cursor from '../components/Cursor';
import PhilosophySection from '../components/PhilosophySection';
import ContentSection from '../components/ContentSection';
import CollaborationSection from '../components/CollaborationSection';
import SocialSection from '../components/SocialSection';
import FooterSection from '../components/FooterSection';

export default function Home() {
  return (
    <main className="relative w-full bg-black min-h-screen">
      <Cursor />
      
      {/* 8000px spacer for the sticky cinematic sequence */}
      <div id="sequence-spacer" className="relative w-full h-[8000px] bg-black">
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
          <CanvasSequence>
            <OverlayUI />
          </CanvasSequence>
        </div>
      </div>
      
      {/* Philosophy acts as the curtain reveal overlapping the hero */}
      <div className="relative z-20 -mt-[100vh]">
         <PhilosophySection />
      </div>

      {/* Case Studies / Work Portfolio */}
      <ContentSection />

      {/* Collaboration Models */}
      <CollaborationSection />

      {/* The Instagram infinite marquee feed */}
      <SocialSection />

      {/* Final Call to Action */}
      <FooterSection />
    </main>
  );
}

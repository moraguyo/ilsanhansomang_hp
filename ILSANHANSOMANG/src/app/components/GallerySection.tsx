import sundayWorshipImg from "figma:asset/61ecdd1e6a0d4dc87cb2481a6a9304d5744a88aa.png";
import missionBgImg from "figma:asset/5b0a8feaef4217e425516a9bf369592310de3b98.png";
import wednesdayThumb from "figma:asset/a643fde8dd8002ef7da30276b3f55227921ac771.png";
import prayMeetingThumb from "figma:asset/44c8a6aebbc84727c55e2e6d7c642d14484f4ce2.png";
import sundaySermonThumb from "figma:asset/4e3a2c304d66e962d04b543c5ea42cc92cd3e08e.png";
import nextGenImg from "figma:asset/f2322b4c979f55cbc1bd5e3710293e66c2bd3092.png";
import missionImg1 from "figma:asset/13fcfe4a423320304c375613681f9ece08692553.png";
import missionImg2 from "figma:asset/b31b4ef018cc5abfcc9d24855b3ec760b609a26d.png";
import missionImg3 from "figma:asset/26d20063ef5b8340954172ff327de7988411f6e4.png";

const communityImg = "https://images.unsplash.com/photo-1765947382559-93260e5d6c89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBjaHVyY2glMjBmZWxsb3dzaGlwJTIwZ2F0aGVyaW5nfGVufDF8fHx8MTc3MzgzNTc3N3ww&ixlib=rb-4.1.0&q=80&w=1080";
const praiseImg = "https://images.unsplash.com/photo-1745357081650-e0857e7cd6ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBwcmFpc2UlMjBtdXNpYyUyMHdvcnNoaXAlMjBiYW5kfGVufDF8fHx8MTc3MzgzNTc4NHww&ixlib=rb-4.1.0&q=80&w=1080";
const volunteerImg = "https://images.unsplash.com/photo-1751666526244-40239a251eae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjB2b2x1bnRlZXIlMjBzZXJ2aWNlfGVufDF8fHx8MTc3MzgzNTc4NHww&ixlib=rb-4.1.0&q=80&w=1080";
const prayerImg = "https://images.unsplash.com/photo-1566855189670-7502f9c7f03b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHJpc3RpYW4lMjBwcmF5ZXIlMjBoYW5kcyUyMGJpYmxlfGVufDF8fHx8MTc3MzgzNTc4N3ww&ixlib=rb-4.1.0&q=80&w=1080";
const churchBuildingImg = "https://images.unsplash.com/photo-1750109060920-4624a080570d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBidWlsZGluZyUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NzM3MDkxNDF8MA&ixlib=rb-4.1.0&q=80&w=1080";
const childrenImg = "https://images.unsplash.com/photo-1702905709201-0950a1a3190f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHdvcnNoaXAlMjBzdW5kYXklMjBzY2hvb2x8ZW58MXx8fHwxNzczODM1Nzg3fDA&ixlib=rb-4.1.0&q=80&w=1080";

interface Props {
  variant?: 'first' | 'second';
}

const row1Images = [
  sundayWorshipImg, missionBgImg, wednesdayThumb, prayMeetingThumb,
  communityImg, praiseImg, volunteerImg, prayerImg,
];

const row2Images = [
  nextGenImg, sundaySermonThumb, missionImg1, missionImg2, missionImg3,
  communityImg, churchBuildingImg, childrenImg,
];

export default function GallerySection({ variant = 'first' }: Props) {
  // Duplicate images for seamless loop
  const track1 = [...row1Images, ...row1Images];
  const track2 = [...row2Images, ...row2Images];

  // Second gallery gets different speed and image order
  const galleryTrack1 = variant === 'second' ? [...row2Images, ...row2Images] : track1;
  const galleryTrack2 = variant === 'second' ? [...row1Images, ...row1Images] : track2;
  const duration1 = variant === 'second' ? '25s' : '30s';
  const duration2 = variant === 'second' ? '28s' : '35s';

  const imgStyle: React.CSSProperties = {
    flex: 'none',
    width: 'clamp(200px, 20vw, 320px)',
    height: 'clamp(140px, 14vw, 220px)',
    objectFit: 'cover',
    borderRadius: 12,
    marginRight: 16,
  };

  const fontSerif = "'Playfair Display', Georgia, serif";

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: '#0e0e0e', paddingTop: 100, paddingBottom: 100 }}
    >
      {/* GALLERY 타이틀 */}
      <div style={{ textAlign: 'center', marginBottom: 64 }}>
        <h2 style={{
          fontFamily: fontSerif,
          fontWeight: 700,
          fontSize: 'clamp(2.2rem, 5vw, 4.5rem)',
          letterSpacing: '0.04em',
          color: '#ffffff',
          margin: 0,
        }}>
          GALLERY
        </h2>
      </div>

      {/* Row 1: left scroll */}
      <div className="mb-4 overflow-hidden">
        <div className="gallery-track-left" style={{ animationDuration: duration1 }}>
          {galleryTrack1.map((src, i) => (
            <img key={i} src={src} alt="" style={imgStyle} />
          ))}
        </div>
      </div>

      {/* Row 2: right scroll */}
      <div className="overflow-hidden">
        <div className="gallery-track-right" style={{ animationDuration: duration2 }}>
          {galleryTrack2.map((src, i) => (
            <img key={i} src={src} alt="" style={imgStyle} />
          ))}
        </div>
      </div>
    </section>
  );
}
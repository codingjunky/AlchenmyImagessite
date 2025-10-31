// app/studio/page.tsx
// This serves the Studio interface

export default function StudioPage() {
  return (
    <iframe 
      src="/studio.html" 
      className="w-full h-screen border-0"
      title="AMP'd Images Studio"
    />
  );
}
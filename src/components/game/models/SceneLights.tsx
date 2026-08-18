export function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 5, 2]} intensity={1.05} />
    </>
  );
}

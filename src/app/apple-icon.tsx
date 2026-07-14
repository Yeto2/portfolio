import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

/** Raster Apple touch icon — iOS home-screen friendly. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#050816',
        }}
      >
        <div
          style={{
            width: 152,
            height: 152,
            borderRadius: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(145deg, #152038 0%, #0c1224 55%, #070b16 100%)',
            border: '3px solid rgba(96, 165, 250, 0.55)',
            boxShadow: '0 0 40px rgba(59, 130, 246, 0.35)',
          }}
        >
          <div
            style={{
              fontSize: 92,
              fontWeight: 700,
              letterSpacing: '-0.06em',
              background: 'linear-gradient(160deg, #eff6ff 0%, #93c5fd 40%, #3b82f6 100%)',
              backgroundClip: 'text',
              color: 'transparent',
              lineHeight: 1,
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            Y
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}

'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>
            Application Error
          </h2>
          <p style={{ marginBottom: '16px', color: '#666' }}>
            A critical error occurred. Please refresh the page.
          </p>
          <button
            onClick={reset}
            style={{
              padding: '12px 24px',
              backgroundColor: '#000',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}

'use client';

export default function SkyGradient() {
    return (
        <div
            className="fixed inset-0 pointer-events-none overflow-hidden z-0"
            style={{ background: 'linear-gradient(to bottom, var(--sky-gradient-top), var(--sky-gradient-bottom))' }}
            aria-hidden="true"
        />
    );
}

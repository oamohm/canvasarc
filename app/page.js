'use client'
import { useState, useEffect } from 'react'

export default function ArcCanvas() {
  const [session, setSession] = useState({ email: null, wallet: null })
  const [stream, setStream] = useState(['System Ready', 'Waiting for Auth...'])

  const handleAuth = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    setSession({...session, email});
    setStream(prev => [...prev, `Authenticated: ${email}`]);
  }

  return (
    <main style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '2rem', fontFamily: 'monospace' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '2rem', borderBottom: '1px solid #333' }}>
        <h1>ARCCANVAS // ENGINE</h1>
        <button onClick={() => setSession({...session, wallet: '0x88...Af2'})} style={{ padding: '0.5rem 1rem' }}>
          {session.wallet ? `Wallet: ${session.wallet}` : 'Connect Wallet'}
        </button>
      </header>

      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2rem' }}>
        <div style={{ border: '1px solid #444', padding: '2rem', borderRadius: '8px' }}>
          {!session.email ? (
            <form onSubmit={handleAuth}>
              <h3>Email Authentication</h3>
              <input name="email" type="email" placeholder="enter email" required style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }} />
              <button type="submit" style={{ width: '100%' }}>Login</button>
            </form>
          ) : (
            <div>
              <h3>USDC Settlement Layer</h3>
              <input type="number" placeholder="amount" style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }} />
              <button style={{ width: '100%' }}>Execute Deterministic Transfer</button>
            </div>
          )}
        </div>

        <div style={{ border: '1px solid #444', padding: '2rem', borderRadius: '8px' }}>
          <h3>Deterministic Stream Feed</h3>
          <div style={{ height: '200px', overflowY: 'auto', background: '#111', padding: '1rem', color: '#0f0' }}>
            {stream.map((s, i) => <p key={i}>{`> ${s}`}</p>)}
          </div>
        </div>
      </section>
    </main>
  )
}

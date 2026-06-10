'use client'
import { useState } from 'react'

export default function ArcCanvas() {
  const [auth, setAuth] = useState({ email: null, wallet: null, status: 'idle' })
  const [stream, setStream] = useState(['System initialized: Arc Engine v1', 'Waiting for Auth...'])

  const connectWallet = () => {
    setAuth(prev => ({ ...prev, wallet: '0x71C...3F9', status: 'connected' }))
    setStream(prev => [...prev, 'Wallet Connected successfully'])
  }

  const handleTransfer = (e) => {
    e.preventDefault()
    setStream(prev => [...prev, 'Verification pending...', 'Transfer initiated: USDC settlement'])
  }

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#000', color: '#fff', padding: '40px', fontFamily: 'monospace' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #333', paddingBottom: '20px', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '24px' }}>arccanvas // builder-ready</h1>
        <button onClick={connectWallet} style={{ background: '#fff', color: '#000', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>
          {auth.wallet ? auth.wallet : 'Connect Wallet'}
        </button>
      </nav>

      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        <div style={{ border: '1px solid #333', padding: '20px', borderRadius: '8px' }}>
          <h2>Fund Transfer / Verification</h2>
          <form onSubmit={handleTransfer}>
            <input type="email" placeholder="Verification Email" style={{ width: '100%', padding: '10px', background: '#111', color: '#fff', border: '1px solid #444', marginBottom: '10px' }} required />
            <input type="number" placeholder="USDC Amount" style={{ width: '100%', padding: '10px', background: '#111', color: '#fff', border: '1px solid #444', marginBottom: '10px' }} required />
            <button type="submit" style={{ width: '100%', padding: '12px', background: '#2563eb', color: '#fff', border: 'none' }}>Execute Settlement</button>
          </form>
        </div>

        <div style={{ border: '1px solid #333', padding: '20px', borderRadius: '8px' }}>
          <h2>Live Deterministic Stream</h2>
          <div style={{ height: '200px', overflowY: 'auto', background: '#111', padding: '10px', color: '#0f0' }}>
            {stream.map((line, i) => <p key={i}>{`> ${line}`}</p>)}
          </div>
        </div>
      </section>
      
      <footer style={{ marginTop: '40px', textAlign: 'center', color: '#666', fontSize: '12px' }}>
        Arc Deterministic Infrastructure | Production Mode
      </footer>
    </main>
  )
}

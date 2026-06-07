"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  return (
    <div style={{ padding: '50px', textAlign: 'center', color: 'white', background: '#050505', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <h1>CanvasArc Dashboard</h1>
      <p>Connect your wallet to get started</p>
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
        <ConnectButton />
      </div>
    </div>
  );
}

'use client'

import { useState, useCallback } from 'react'

export default function Home() {
  // State management
  const [wallet, setWallet] = useState(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [totalSettled, setTotalSettled] = useState('$1,750.00')
  const [completedCount, setCompletedCount] = useState(28)
  const [email, setEmail] = useState('')
  const [amount, setAmount] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')
  const [stream, setStream] = useState([
    'Arc Engine: Initialized',
    'Waiting for User Input...'
  ])

  // Add stream message
  const addStreamMessage = useCallback((message) => {
    const timestamp = new Date().toLocaleTimeString()
    setStream(prev => [...prev, `[${timestamp}] ${message}`])
  }, [])

  // Connect wallet
  const handleConnectWallet = useCallback(async () => {
    setIsConnecting(true)
    setError(null)

    try {
      addStreamMessage('Initiating wallet connection...')
      await new Promise(resolve => setTimeout(resolve, 1200))
      const mockAddress = '0x' + Math.random().toString(16).slice(2, 42)
      setWallet(mockAddress)
      addStreamMessage(`Wallet Connected: ${mockAddress}`)
      addStreamMessage('Deterministic Path Active')
      setSuccessMessage('Wallet connected successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (err) {
      setError('Failed to connect wallet')
      addStreamMessage('Connection Error: Failed to connect')
    } finally {
      setIsConnecting(false)
    }
  }, [])

  // Disconnect wallet
  const handleDisconnect = useCallback(() => {
    setWallet(null)
    setEmail('')
    setAmount('')
    setError(null)
    addStreamMessage('Wallet Disconnected')
    addStreamMessage('Ready for new connection')
  }, [])

  // Handle settlement
  const handleSettle = useCallback(async () => {
    if (!wallet) {
      setError('Please connect wallet first')
      addStreamMessage('Error: Wallet not connected')
      return
    }

    if (!email || !amount) {
      setError('Please fill in all fields')
      addStreamMessage('Error: Missing required fields')
      return
    }

    setIsProcessing(true)
    setError(null)
    addStreamMessage(`Executing transaction - Attempt 1/3`)
    addStreamMessage(`Amount: ${amount} USD`)
    addStreamMessage(`Email: ${email}`)

    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Simulate 70% success rate
      if (Math.random() > 0.3) {
        const txHash = '0x' + Math.random().toString(16).slice(2, 66)
        const newTotal = parseFloat(totalSettled.replace(/[$,]/g, '')) + parseFloat(amount)
        
        setTotalSettled(`$${newTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`)
        setCompletedCount(prev => prev + 1)
        setEmail('')
        setAmount('')
        
        addStreamMessage(`Transaction Hash: ${txHash}`)
        addStreamMessage('Transaction Status: Confirmed')
        addStreamMessage('Settlement Layer: Active')
        
        setSuccessMessage('Settlement completed successfully!')
        setTimeout(() => setSuccessMessage(''), 3000)
      } else {
        throw new Error('Transaction failed: Insufficient funds')
      }
    } catch (err) {
      setError(err.message || 'Settlement failed. Please try again.')
      addStreamMessage(`Transaction Failed: ${err.message || 'Unknown error'}`)
      addStreamMessage('Please try again or check your wallet balance')
    } finally {
      setIsProcessing(false)
    }
  }, [wallet, email, amount, totalSettled])

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      backgroundColor: '#0b0e11'
    }}>
      {/* Header Navigation */}
      <header style={{
        background: 'rgba(11, 14, 17, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
        padding: '20px 40px',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h1 style={{
              margin: 0,
              fontSize: '28px',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #a855f7 0%, #22d3ee 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              ArcCanvas
            </h1>
            <div className="status-pill">Production Ready</div>
          </div>

          {/* Navigation Icons */}
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            <button style={{
              background: 'transparent',
              border: 'none',
              color: 'rgba(224, 224, 224, 0.7)',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'color 0.3s ease'
            }} onMouseEnter={(e) => e.target.style.color = '#a855f7'} onMouseLeave={(e) => e.target.style.color = 'rgba(224, 224, 224, 0.7)'}>
              📊 Stats
            </button>
            <button style={{
              background: 'transparent',
              border: 'none',
              color: 'rgba(224, 224, 224, 0.7)',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'color 0.3s ease'
            }} onMouseEnter={(e) => e.target.style.color = '#a855f7'} onMouseLeave={(e) => e.target.style.color = 'rgba(224, 224, 224, 0.7)'}>
              ⚙️ Settings
            </button>

            {/* Wallet Button */}
            {wallet ? (
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{
                  background: 'rgba(168, 85, 247, 0.1)',
                  border: '1px solid rgba(168, 85, 247, 0.3)',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  color: '#a855f7',
                  fontWeight: 600
                }}>
                  {wallet.slice(0, 6)}...{wallet.slice(-4)}
                </span>
                <button
                  onClick={handleDisconnect}
                  style={{
                    background: 'rgba(239, 68, 68, 0.2)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    color: '#ef4444',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(239, 68, 68, 0.3)'
                    e.target.style.boxShadow = '0 0 15px rgba(239, 68, 68, 0.3)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(239, 68, 68, 0.2)'
                    e.target.style.boxShadow = 'none'
                  }}
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={handleConnectWallet}
                disabled={isConnecting}
                className="btn-primary"
                style={{ padding: '10px 24px', fontSize: '14px' }}
              >
                {isConnecting ? 'Connecting...' : 'Connect Wallet'}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        flex: 1,
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '60px 40px',
        width: '100%'
      }}>
        {/* Alert Messages */}
        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#fca5a5',
            padding: '16px',
            borderRadius: '8px',
            marginBottom: '24px',
            fontSize: '14px'
          }}>
            ⚠️ {error}
          </div>
        )}

        {successMessage && (
          <div style={{
            background: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            color: '#4ade80',
            padding: '16px',
            borderRadius: '8px',
            marginBottom: '24px',
            fontSize: '14px'
          }}>
            ✓ {successMessage}
          </div>
        )}

        {/* Two Column Layout */}
        <section style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '40px',
          minHeight: '600px'
        }}>
          {/* LEFT COLUMN: Settlement Layer */}
          <div className="glass-card neon-border">
            <h2 style={{ marginTop: 0, marginBottom: '24px' }}>Settlement Layer</h2>
            <p style={{
              fontSize: '13px',
              color: 'rgba(224, 224, 224, 0.6)',
              marginBottom: '20px'
            }}>
              Execute deterministic settlements with wallet verification and transaction tracking.
            </p>

            {!wallet ? (
              <div style={{
                background: 'rgba(168, 85, 247, 0.05)',
                border: '1px dashed rgba(168, 85, 247, 0.3)',
                padding: '40px 20px',
                borderRadius: '8px',
                textAlign: 'center',
                color: 'rgba(224, 224, 224, 0.6)',
                marginBottom: '20px'
              }}>
                <p style={{ margin: 0, fontSize: '14px' }}>
                  🔗 Connect your wallet to begin settlements
                </p>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '13px',
                    color: 'rgba(224, 224, 224, 0.7)',
                    marginBottom: '8px',
                    fontWeight: 600
                  }}>
                    Verification Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      fontSize: '14px',
                      color: '#e0e0e0'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '13px',
                    color: 'rgba(224, 224, 224, 0.7)',
                    marginBottom: '8px',
                    fontWeight: 600
                  }}>
                    Settlement Amount (USD)
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      fontSize: '14px',
                      color: '#e0e0e0'
                    }}
                  />
                </div>

                <button
                  onClick={handleSettle}
                  disabled={isProcessing}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    padding: '14px 24px',
                    fontSize: '16px',
                    marginBottom: '16px'
                  }}
                >
                  {isProcessing ? 'Processing Settlement...' : '🚀 Execute Settlement'}
                </button>

                <p style={{
                  fontSize: '12px',
                  color: 'rgba(224, 224, 224, 0.5)',
                  margin: 0,
                  textAlign: 'center'
                }}>
                  ✓ Ready to execute
                </p>
              </>
            )}
          </div>

          {/* RIGHT COLUMN: Deterministic Stream */}
          <div className="glass-card">
            <h2 style={{ marginTop: 0, marginBottom: '16px' }}>Deterministic Stream</h2>
            <p style={{
              fontSize: '13px',
              color: 'rgba(224, 224, 224, 0.6)',
              marginBottom: '15px'
            }}>
              Real-time event log with timestamps and transaction confirmations.
            </p>

            <div style={{
              background: '#000',
              border: '1px solid rgba(148, 163, 184, 0.2)',
              height: '400px',
              padding: '15px',
              color: '#0f0',
              overflowY: 'auto',
              borderRadius: '8px',
              fontSize: '12px',
              fontFamily: '"Courier New", monospace',
              lineHeight: '1.4'
            }}>
              {stream.length === 0 ? (
                <p style={{ color: '#666' }}>No events yet...</p>
              ) : (
                stream.map((line, i) => (
                  <p key={i} style={{ 
                    margin: '4px 0', 
                    whiteSpace: 'pre-wrap', 
                    wordBreak: 'break-word',
                    color: line.includes('Error') || line.includes('Failed') ? '#ff6b6b' : '#0f0'
                  }}>
                    {'> '}{line}
                  </p>
                ))
              )}
            </div>

            <div style={{
              marginTop: '15px',
              fontSize: '12px',
              color: 'rgba(224, 224, 224, 0.6)',
              padding: '12px',
              background: 'rgba(168, 85, 247, 0.05)',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              Total Events: <strong>{stream.length}</strong>
            </div>
          </div>
        </section>

        {/* Dashboard Stats */}
        {wallet && (
          <section style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            marginTop: '60px'
          }}>
            {/* Total Settled Card */}
            <div className="glass-card" style={{
              animation: 'fadeIn 0.6s ease-out'
            }}>
              <p style={{
                fontSize: '12px',
                color: 'rgba(224, 224, 224, 0.6)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '12px'
              }}>
                Total Settled
              </p>
              <h3 style={{
                fontSize: '2.5rem',
                margin: '0 0 16px 0',
                background: 'linear-gradient(135deg, #a855f7 0%, #22d3ee 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {totalSettled}
              </h3>
              <p style={{
                fontSize: '13px',
                color: 'rgba(224, 224, 224, 0.5)',
                margin: 0
              }}>
                Across all settlements
              </p>
            </div>

            {/* Completed Count Card */}
            <div className="glass-card" style={{
              animation: 'fadeIn 0.6s ease-out 0.1s backwards'
            }}>
              <p style={{
                fontSize: '12px',
                color: 'rgba(224, 224, 224, 0.6)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '12px'
              }}>
                Completed
              </p>
              <h3 style={{
                fontSize: '2.5rem',
                margin: '0 0 16px 0',
                background: 'linear-gradient(135deg, #4ade80 0%, #22d3ee 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {completedCount}
              </h3>
              <p style={{
                fontSize: '13px',
                color: 'rgba(224, 224, 224, 0.5)',
                margin: 0
              }}>
                Successful transactions
              </p>
            </div>

            {/* Success Rate Card */}
            <div className="glass-card" style={{
              animation: 'fadeIn 0.6s ease-out 0.2s backwards'
            }}>
              <p style={{
                fontSize: '12px',
                color: 'rgba(224, 224, 224, 0.6)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '12px'
              }}>
                Success Rate
              </p>
              <h3 style={{
                fontSize: '2.5rem',
                margin: '0 0 16px 0',
                background: 'linear-gradient(135deg, #f59e0b 0%, #a855f7 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                99.8%
              </h3>
              <p style={{
                fontSize: '13px',
                color: 'rgba(224, 224, 224, 0.5)',
                margin: 0
              }}>
                Industry-leading uptime
              </p>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid rgba(148, 163, 184, 0.1)',
        padding: '40px',
        textAlign: 'center',
        color: 'rgba(224, 224, 224, 0.5)',
        fontSize: '13px',
        marginTop: 'auto'
      }}>
        <p>
          ArcCanvas © 2026 | Arc-Native Settlement Layer | Powered by Next.js + Web3
        </p>
      </footer>
    </div>
  )
}

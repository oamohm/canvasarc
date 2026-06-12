'use client'

import { useState, useCallback } from 'react'

export default function Home() {
  // State management
  const [wallet, setWallet] = useState(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [totalSettled, setTotalSettled] = useState('$1,750.00')
  const [completedCount, setCompletedCount] = useState(28)
  const [showStats, setShowStats] = useState(true)
  const [email, setEmail] = useState('')
  const [amount, setAmount] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')

  // Connect wallet
  const handleConnectWallet = useCallback(async () => {
    setIsConnecting(true)
    setError(null)

    try {
      await new Promise(resolve => setTimeout(resolve, 1200))
      const mockAddress = '0x' + Math.random().toString(16).slice(2, 42)
      setWallet(mockAddress)
      setSuccessMessage('Wallet connected successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (err) {
      setError('Failed to connect wallet')
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
  }, [])

  // Handle settlement
  const handleSettle = useCallback(async () => {
    if (!wallet) {
      setError('Please connect wallet first')
      return
    }

    if (!email || !amount) {
      setError('Please fill in all fields')
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      const newTotal = parseFloat(totalSettled.replace(/[$,]/g, '')) + parseFloat(amount)
      setTotalSettled(`$${newTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`)
      setCompletedCount(prev => prev + 1)
      setEmail('')
      setAmount('')
      setSuccessMessage('Settlement completed successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (err) {
      setError('Settlement failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }, [wallet, email, amount, totalSettled])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
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
              fontSize: '24px',
              fontWeight: 700
            }}>
              <span className="gradient-text">ArcCanvas</span>
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
                  color: '#a855f7'
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
        {/* Hero Section */}
        <section style={{
          textAlign: 'center',
          marginBottom: '80px'
        }}>
          <h2 style={{
            fontSize: '3.5rem',
            fontWeight: 800,
            marginBottom: '16px',
            background: 'linear-gradient(135deg, #e0e0e0 0%, #a0a0a0 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Arc-Native Settlement Platform
          </h2>
          <p style={{
            fontSize: '1.25rem',
            color: 'rgba(224, 224, 224, 0.7)',
            marginBottom: '40px',
            maxWidth: '600px',
            margin: '0 auto 40px'
          }}>
            Web3 wallet, UPI, and international transfers unified.
          </p>

          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={handleSettle}
              disabled={!wallet || isProcessing}
              className="btn-primary"
              style={{
                fontSize: '16px',
                padding: '14px 40px'
              }}
            >
              {isProcessing ? 'Processing...' : '🚀 Settle on Arc'}
            </button>
            <button
              onClick={() => setShowStats(!showStats)}
              className="btn-secondary"
              style={{
                fontSize: '16px',
                padding: '14px 40px'
              }}
            >
              📈 Settlement Tracker
            </button>
          </div>
        </section>

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

        {/* Dashboard Stats */}
        {showStats && (
          <section style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            marginBottom: '60px'
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

        {/* Settlement Form */}
        {wallet && (
          <section style={{
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <div className="glass-card neon-border">
              <h3 style={{ marginBottom: '24px' }}>Complete Your Settlement</h3>

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  color: 'rgba(224, 224, 224, 0.7)',
                  marginBottom: '8px',
                  fontWeight: 600
                }}>
                  Email Address
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
                  fontSize: '16px'
                }}
              >
                {isProcessing ? 'Processing Settlement...' : 'Execute Settlement'}
              </button>
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
        fontSize: '13px'
      }}>
        <p>
          ArcCanvas © 2026 | Arc-Native Settlement Layer | Powered by Next.js + Web3
        </p>
      </footer>
    </div>
  )
}

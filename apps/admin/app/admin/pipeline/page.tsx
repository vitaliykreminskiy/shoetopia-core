'use client'

import { useState } from 'react'
import { FEEDS, REGIONS } from '@/lib/feeds'

interface LogEntry {
  time: string
  message: string
  type: 'info' | 'success' | 'error' | 'warning'
}

export default function PipelinePage() {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [running, setRunning] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState<string>('all')
  const [selectedFeed, setSelectedFeed] = useState<number | null>(null)

  const addLog = (message: string, type: LogEntry['type'] = 'info') => {
    setLogs(prev => [...prev, { 
      time: new Date().toLocaleTimeString(), 
      message, 
      type 
    }])
  }

  const clearLogs = () => setLogs([])

  // Filter feeds by region
  const filteredFeeds = selectedRegion === 'all' 
    ? FEEDS 
    : FEEDS.filter(f => f.region === selectedRegion)

  // Import a single feed
  const importFeed = async (feedId: number) => {
    const feed = FEEDS.find(f => f.id === feedId)
    if (!feed) return

    addLog(`Starting import: ${feed.name} (${feed.country})...`, 'info')
    
    try {
      const res = await fetch('/api/admin/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feedId })
      })
      
      const data = await res.json()
      
      if (data.success) {
        addLog(`Imported ${data.imported} products from ${feed.name}`, 'success')
        addLog(`  Types: ${data.stats.shoes} shoes, ${data.stats.apparel} apparel, ${data.stats.accessories} accessories`, 'info')
        addLog(`  Genders: ${data.stats.kids} kids, ${data.stats.mens} mens, ${data.stats.womens} womens`, 'info')
      } else {
        addLog(`Error importing ${feed.name}: ${data.error}`, 'error')
      }
    } catch (e: any) {
      addLog(`Failed to import ${feed.name}: ${e.message}`, 'error')
    }
  }

  // Import all feeds (one by one)
  const importAllFeeds = async () => {
    setRunning(true)
    addLog('=== Starting Full Import ===', 'info')
    
    const feedsToImport = selectedRegion === 'all' ? FEEDS : FEEDS.filter(f => f.region === selectedRegion)
    
    for (const feed of feedsToImport) {
      await importFeed(feed.id)
    }
    
    addLog('=== Import Complete ===', 'success')
    setRunning(false)
  }

  // Full pipeline: import all feeds
  const runFullPipeline = async () => {
    setRunning(true)
    clearLogs()

    addLog('=== FULL PIPELINE START ===', 'info')
    addLog(`Region: ${selectedRegion === 'all' ? 'All Regions' : REGIONS[selectedRegion]?.name}`, 'info')

    // Import all feeds (quality runs as part of daily sync)
    await importAllFeeds()

    addLog('=== FULL PIPELINE COMPLETE ===', 'success')
    setRunning(false)
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl text-[#2D2D2D] mb-2">Pipeline Control</h1>
          <p className="text-[#666]">Import feeds, run quality checks, and manage product data</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg border border-[#E8E4DE] p-6 mb-6">
          <h2 className="font-semibold text-lg mb-4">Region Filter</h2>
          
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setSelectedRegion('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedRegion === 'all' 
                  ? 'bg-[#2D2D2D] text-white' 
                  : 'bg-[#F5F3F0] text-[#666] hover:bg-[#E8E4DE]'
              }`}
            >
              All Regions
            </button>
            {Object.entries(REGIONS).map(([key, region]) => (
              <button
                key={key}
                onClick={() => setSelectedRegion(key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedRegion === key 
                    ? 'bg-[#2D2D2D] text-white' 
                    : 'bg-[#F5F3F0] text-[#666] hover:bg-[#E8E4DE]'
                }`}
              >
                {region.name} ({region.subdomain || 'default'})
              </button>
            ))}
          </div>

          <h2 className="font-semibold text-lg mb-4">Actions</h2>
          
          <div className="flex flex-wrap gap-3">
            <button
              onClick={runFullPipeline}
              disabled={running}
              className="px-6 py-3 bg-[#C17C74] text-white rounded-lg font-medium hover:bg-[#A96960] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {running ? 'Running...' : 'Run Full Pipeline'}
            </button>
            
            <button
              onClick={importAllFeeds}
              disabled={running}
              className="px-6 py-3 bg-[#2D2D2D] text-white rounded-lg font-medium hover:bg-[#444] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Import All Feeds
            </button>
            
            <button
              onClick={clearLogs}
              className="px-6 py-3 bg-[#F5F3F0] text-[#666] rounded-lg font-medium hover:bg-[#E8E4DE] transition-colors"
            >
              Clear Logs
            </button>
          </div>
        </div>

        {/* Feed List */}
        <div className="bg-white rounded-lg border border-[#E8E4DE] p-6 mb-6">
          <h2 className="font-semibold text-lg mb-4">Feeds ({filteredFeeds.length})</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto">
            {filteredFeeds.map(feed => (
              <div 
                key={feed.id}
                className="flex items-center justify-between p-3 bg-[#FAFAF8] rounded-lg border border-[#E8E4DE]"
              >
                <div>
                  <div className="font-medium text-sm">{feed.name}</div>
                  <div className="text-xs text-[#888]">
                    {feed.country} | {feed.sourceCount.toLocaleString()} products
                  </div>
                </div>
                <button
                  onClick={() => importFeed(feed.id)}
                  disabled={running}
                  className="px-3 py-1.5 text-xs bg-[#2D2D2D] text-white rounded font-medium hover:bg-[#444] disabled:opacity-50 transition-colors"
                >
                  Import
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Logs */}
        <div className="bg-[#1a1a1a] rounded-lg p-6">
          <h2 className="font-semibold text-lg mb-4 text-white">Logs</h2>
          
          <div className="font-mono text-sm h-[400px] overflow-y-auto">
            {logs.length === 0 ? (
              <div className="text-[#666]">No logs yet. Run a pipeline action to see output.</div>
            ) : (
              logs.map((log, i) => (
                <div 
                  key={i} 
                  className={`py-1 ${
                    log.type === 'success' ? 'text-green-400' :
                    log.type === 'error' ? 'text-red-400' :
                    log.type === 'warning' ? 'text-yellow-400' :
                    'text-gray-300'
                  }`}
                >
                  <span className="text-[#666]">[{log.time}]</span> {log.message}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

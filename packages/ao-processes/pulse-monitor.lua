-- X Pulse Monitor — Real AO Agent

PulseConfig = PulseConfig or {
  query = "AO Arweave",
  interval = 1800
}

Handlers.add("Monitor",
  Handlers.utils.hasMatchingTag("Action", "Monitor"),
  function(msg)
    local query = msg.Data.query or PulseConfig.query
    local voice = msg.Data.voice or false

    print("🔍 [AO] Monitoring: " .. query)

    -- Send to Bridge for Claude analysis
    ao.send({
      Target = BridgeProcessID or "BRIDGE-PROCESS-ID",
      Action = "FromAO",
      Data = json.encode({
        query = query,
        voice = voice,
        source = "ao_pulse_agent"
      })
    })

    -- Send confirmation back
    ao.send({
      Target = msg.From,
      Action = "MonitorResult",
      Data = json.encode({
        status = "monitoring",
        query = query,
        message = "AO Agent is active. Insights stored permanently on Arweave."
      })
    })
  end
)

print("🚀 AO Pulse Monitor Agent is Live!")
print("Default Query: " .. PulseConfig.query)

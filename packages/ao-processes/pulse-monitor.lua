-- AO Pulse Monitor Agent

Handlers.add("Monitor",
  Handlers.utils.hasMatchingTag("Action", "Monitor"),
  function(msg)
    local query = msg.Data.query or "AO Arweave"
    local voice = msg.Data.voice or false

    print("🔍 [AO Agent] Monitoring: " .. query)

    -- Forward to Bridge
    ao.send({
      Target = "BRIDGE-PROCESS",   -- placeholder
      Action = "FromAO",
      Data = json.encode({
        query = query,
        voice = voice,
        source = "ao_pulse"
      })
    })

    -- Send confirmation
    ao.send({
      Target = msg.From,
      Action = "MonitorResult",
      Data = json.encode({
        status = "monitoring",
        query = query,
        message = "AO Agent is active. Insights stored on Arweave."
      })
    })
  end
)

print("🚀 AO Pulse Monitor Agent is ready!")

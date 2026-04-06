-- X Pulse Monitor AO Process
-- Persistent autonomous agent

PulseConfig = PulseConfig or {
  query = "AO Arweave",
  interval = 1800  -- 30 minutes in seconds
}

Handlers.add("Monitor",
  Handlers.utils.hasMatchingTag("Action", "Monitor"),
  function(msg)
    local query = msg.Data.query or PulseConfig.query
    
    print("🔍 AO Agent monitoring: " .. query)
    
    -- Send request to Bridge (which talks to Claude + X)
    ao.send({
      Target = BridgeProcessID or "BRIDGE-PROCESS-ID-HERE",
      Action = "Monitor",
      Data = json.encode({
        query = query,
        voice = msg.Data.voice or false
      })
    })
    
    print("📤 Sent monitoring task to Bridge")
  end
)

-- Cron handler for autonomous running
Handlers.add("Cron",
  Handlers.utils.hasMatchingTag("Action", "Cron"),
  function(msg)
    ao.send({
      Target = ao.id,
      Action = "Monitor",
      Data = json.encode({ query = PulseConfig.query })
    })
  end
)

print("🚀 AO Pulse Monitor Agent started successfully!")
print("Query: " .. PulseConfig.query)

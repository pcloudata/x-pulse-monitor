-- X Pulse Monitor AO Agent - v0.2

PulseConfig = PulseConfig or {
  query = "AO Arweave",
  interval = 1800
}

Handlers.add("Monitor",
  Handlers.utils.hasMatchingTag("Action", "Monitor"),
  function(msg)
    local query = msg.Data.query or PulseConfig.query
    local voice = msg.Data.voice or false

    print("🔍 AO Pulse Agent received task: " .. query)

    -- Send to Bridge for Claude analysis
    ao.send({
      Target = "BRIDGE-PROCESS-ID",   -- We'll replace with real ID later
      Action = "FromAO",
      Data = json.encode({
        query = query,
        voice = voice,
        from_ao = true
      })
    })

    -- Reply to sender
    ao.send({
      Target = msg.From,
      Action = "MonitorResult",
      Data = json.encode({
        status = "accepted",
        query = query,
        message = "AO Agent is monitoring and will store insights on Arweave"
      })
    })
  end
)

print("🚀 AO Pulse Monitor Agent is ready!")
print("Query: " .. PulseConfig.query)

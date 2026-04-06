-- X Pulse Monitor AO Agent

Handlers.add("Monitor",
  Handlers.utils.hasMatchingTag("Action", "Monitor"),
  function(msg)
    local query = msg.Data.query or "AO Arweave"
    local voice = msg.Data.voice or false

    print("🔍 AO Agent received monitoring request for: " .. query)

    -- Send to Bridge for Claude analysis
    ao.send({
      Target = "BRIDGE-PROCESS-ID",  -- Will be replaced later
      Action = "FromAO",
      Data = json.encode({
        query = query,
        voice = voice,
        source = "ao_agent"
      })
    })

    -- Acknowledge back
    ao.send({
      Target = msg.From,
      Action = "MonitorResult",
      Data = json.encode({
        status = "monitoring",
        query = query,
        message = "AO Agent is active and storing insights on Arweave"
      })
    })
  end
)

print("🚀 AO Pulse Monitor Agent Loaded!")

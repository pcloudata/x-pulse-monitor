-- X Pulse Monitor AO Agent

Handlers.add("Monitor",
  Handlers.utils.hasMatchingTag("Action", "Monitor"),
  function(msg)
    local query = msg.Data.query or "AO Arweave"
    local voice = msg.Data.voice or false

    print("🔍 AO Agent received task: " .. query)

    -- Forward to Bridge for Claude analysis
    ao.send({
      Target = "BRIDGE-PROCESS-ID",   -- Replace later with real ID
      Action = "FromAO",
      Data = json.encode({
        query = query,
        voice = voice,
        source = "ao_pulse_agent"
      })
    })

    -- Send acknowledgment
    ao.send({
      Target = msg.From,
      Action = "MonitorResult",
      Data = json.encode({
        status = "accepted",
        query = query,
        message = "AO Agent is monitoring and storing on Arweave"
      })
    })
  end
)

print("🚀 AO Pulse Monitor Agent is active!")

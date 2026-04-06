-- AO Pulse Monitor Agent

Handlers.add("Monitor",
  Handlers.utils.hasMatchingTag("Action", "Monitor"),
  function(msg)
    local query = msg.Data.query or "AO Arweave"
    print("🔍 AO Agent monitoring: " .. query)

    -- Forward to Bridge
    ao.send({
      Target = "BRIDGE-PROCESS",  -- placeholder
      Action = "FromAO",
      Data = json.encode({
        query = query,
        source = "ao_pulse_agent"
      })
    })

    -- Send confirmation
    ao.send({
      Target = msg.From,
      Action = "MonitorResult",
      Data = json.encode({
        status = "monitoring",
        query = query,
        message = "AO Agent active - insights will be stored on Arweave"
      })
    })
  end
)

print("🚀 AO Pulse Monitor Agent Ready")

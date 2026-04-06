-- X Pulse Monitor - Simplified & Test-Friendly AO Agent

PulseConfig = PulseConfig or {
  query = "AO Arweave",
  interval = 1800
}

-- Main handler
Handlers.add("Monitor",
  Handlers.utils.hasMatchingTag("Action", "Monitor"),
  function(msg)
    local query = msg.Data.query or PulseConfig.query
    local voice = msg.Data.voice or false
    
    print("🔍 [AO Agent] Monitoring: " .. query)
    print("🗣️  Voice mode: " .. tostring(voice))
    
    -- Send result back to sender (for testing)
    ao.send({
      Target = msg.From,
      Action = "MonitorResult",
      Data = json.encode({
        status = "success",
        query = query,
        timestamp = os.time(),
        message = "Pulse monitoring completed for " .. query
      })
    })
    
    print("✅ [AO Agent] Monitor task completed and replied.")
  end
)

-- Auto cron handler (for autonomous behavior)
Handlers.add("CronTick",
  Handlers.utils.hasMatchingTag("Action", "Cron"),
  function(msg)
    print("⏰ [AO Agent] Cron triggered - Running scheduled monitor")
    ao.send({
      Target = ao.id,
      Action = "Monitor",
      Data = json.encode({ query = PulseConfig.query })
    })
  end
)

print("🚀 AO Pulse Monitor Agent Loaded Successfully!")
print("   Default Query: " .. PulseConfig.query)
print("   Ready to receive Monitor messages.")

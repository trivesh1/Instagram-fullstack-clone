// system.js
import { createSystem, defaultConfig } from "@chakra-ui/react"

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#f5f5f5" },
          900: { value: "#1a202c" },
        },
      },
    },
  },
})
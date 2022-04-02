<script lang="ts">
  // "white" | "g10" | "g80" | "g90" | "g100"
  const themes = { light: 'white', dark: 'g100' }
  let theme = themes.light

  const query = window.matchMedia('(prefers-color-scheme: dark)')
  const selectTheme = query => {
    const mode = localStorage.getItem('theme') || (query.matches ? 'dark' : 'light')
    theme = themes[mode]
  }

  query.addEventListener('change', selectTheme)
  selectTheme(query)
  $: document.documentElement.setAttribute('theme', theme)
</script>

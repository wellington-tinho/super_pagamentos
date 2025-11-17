import { ref } from 'vue'

const isCollapsed = ref(false)

export function useMenu() {
  const toggleSidebar = () => {
    isCollapsed.value = !isCollapsed.value
  }
  
  const openSidebar = () => {
    isCollapsed.value = false
  }
  
  const closeSidebar = () => {
    isCollapsed.value = true
  }
  
  return {
    isCollapsed,
    toggleSidebar,
    openSidebar,
    closeSidebar
  }
}


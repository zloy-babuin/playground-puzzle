<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const puzzle = ref<SVGSVGElement | null>(null)

onMounted(() => {
  const svg = puzzle.value!
  const container = svg.parentElement!

  // Сохраняем фиксированные размеры контейнера
  const containerWidth = container.clientWidth
  const containerHeight = container.clientHeight

  let viewX = 0
  let viewY = 0
  let viewW = containerWidth
  let viewH = containerHeight

  function updateViewBox() {
    svg.setAttribute('viewBox', `${viewX} ${viewY} ${viewW} ${viewH}`)
  }

  // Зум на колесо
  const handleWheel = (e: WheelEvent) => {
    e.preventDefault()

    const rect = svg.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const zoomFactor = 1.1
    const delta = e.deltaY < 0 ? 1 / zoomFactor : zoomFactor

    // Используем containerWidth и containerHeight как в панорамировании
    const pointX = viewX + (mouseX / containerWidth) * viewW
    const pointY = viewY + (mouseY / containerHeight) * viewH

    // Применяем зум
    viewW *= delta
    viewH *= delta

    // Пересчитываем viewX и viewY
    viewX = pointX - (mouseX / containerWidth) * viewW
    viewY = pointY - (mouseY / containerHeight) * viewH

    // Ограничения
    const min = 200, max = 5000
    if (viewW < min) viewW = min
    if (viewH < min) viewH = min
    if (viewW > max) viewW = max
    if (viewH > max) viewH = max

    updateViewBox()
  }

  // Панорамирование
  let isPanning = false
  let lastX = 0
  let lastY = 0

  const onMouseMove = (e: MouseEvent) => {
    if (!isPanning) return

    const dx = e.clientX - lastX
    const dy = e.clientY - lastY

    // Коэффициент масштаба: насколько viewBox больше/меньше исходного контейнера
    const scaleX = viewW / containerWidth
    const scaleY = viewH / containerHeight

    const deltaX = dx * scaleX
    const deltaY = dy * scaleY

    viewX -= deltaX
    viewY -= deltaY

    updateViewBox()

    lastX = e.clientX
    lastY = e.clientY
  }


  const onMouseUp = () => {
    if (isPanning) {
      isPanning = false
      svg.style.cursor = 'grab'
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }
  }

  const onMouseDown = (e: MouseEvent) => {
    // Средняя кнопка — всегда пан
    if (e.button === 1) {
      e.preventDefault()
      isPanning = true
      lastX = e.clientX
      lastY = e.clientY
      svg.style.cursor = 'grabbing'

      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
      return
    }

    // Левая кнопка — только если не на элементе
    if (e.button === 0 && e.target === svg) {
      e.preventDefault()
      isPanning = true
      lastX = e.clientX
      lastY = e.clientY
      svg.style.cursor = 'grabbing'

      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
    }
  }

  // Курсоры
  const onMouseEnter = () => { if (!isPanning) svg.style.cursor = 'grab' }
  const onMouseLeave = () => { if (!isPanning) svg.style.cursor = 'default' }
  const onContextMenu = (e: Event) => e.preventDefault()

  // Инициализация
  svg.addEventListener('wheel', handleWheel, { passive: false })
  svg.addEventListener('mousedown', onMouseDown)
  svg.addEventListener('mouseenter', onMouseEnter)
  svg.addEventListener('mouseleave', onMouseLeave)
  svg.addEventListener('contextmenu', onContextMenu)

  // Инициализация viewBox с правильными пропорциями
  const W = containerWidth
  const H = containerHeight

  // Сохраняем пропорции контейнера
  const scale = 3
  viewX = -W
  viewY = -H
  viewW = W * scale
  viewH = H * scale

  console.log('Initial viewBox:', {
    viewX, viewY, viewW, viewH,
    containerWidth: W,
    containerHeight: H
  })
  updateViewBox()

  // Сетка 3x3
  const grid = document.createElementNS('http://www.w3.org/2000/svg', 'g')
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
      rect.setAttribute('x', String(i * W))
      rect.setAttribute('y', String(j * H))
      rect.setAttribute('width', String(W))
      rect.setAttribute('height', String(H))
      rect.setAttribute('fill', 'none')
      rect.setAttribute('stroke', '#ccc')
      rect.setAttribute('stroke-width', '1')
      grid.appendChild(rect)
    }
  }
  svg.appendChild(grid)

  // Очистка слушателей
  onUnmounted(() => {
    svg.removeEventListener('wheel', handleWheel)
    svg.removeEventListener('mousedown', onMouseDown)
    svg.removeEventListener('mouseenter', onMouseEnter)
    svg.removeEventListener('mouseleave', onMouseLeave)
    svg.removeEventListener('contextmenu', onContextMenu)
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  })
})
</script>

<template>
  <svg
    ref="puzzle"
    class="absolute inset-0 w-full h-full"
    xmlns="http://www.w3.org/2000/svg"
  />
</template>

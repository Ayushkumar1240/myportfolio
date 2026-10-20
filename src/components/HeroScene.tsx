import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { prefersReducedMotion } from '../lib/motion'
import { cssVar } from '../lib/themes'

export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100,
    )
    camera.position.z = 7

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    } catch {
      return
    }
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    const group = new THREE.Group()
    scene.add(group)

    // Wireframe core
    const coreGeo = new THREE.IcosahedronGeometry(2.1, 1)
    const coreMat = new THREE.MeshBasicMaterial({
      color: cssVar('--color-accent') || 0xffb454,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    })
    const core = new THREE.Mesh(coreGeo, coreMat)
    group.add(core)

    // Inner faint fill sphere
    const fillGeo = new THREE.IcosahedronGeometry(2.08, 1)
    const fillMat = new THREE.MeshBasicMaterial({
      color: cssVar('--color-accent-2') || 0xff7a45,
      transparent: true,
      opacity: 0.05,
    })
    group.add(new THREE.Mesh(fillGeo, fillMat))

    // Point cloud shell
    const pointsGeo = new THREE.IcosahedronGeometry(3.1, 6)
    const pointsMat = new THREE.PointsMaterial({
      color: cssVar('--color-ink') || 0xf3f2ec,
      size: 0.028,
      transparent: true,
      opacity: 0.55,
    })
    const points = new THREE.Points(pointsGeo, pointsMat)
    group.add(points)

    // Scattered background particles
    const particleCount = 260
    const particlePositions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 16
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 16
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2
    }
    const particleGeo = new THREE.BufferGeometry()
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
    const particleMat = new THREE.PointsMaterial({
      color: cssVar('--color-muted') || 0x8b8d92,
      size: 0.02,
      transparent: true,
      opacity: 0.5,
    })
    const particles = new THREE.Points(particleGeo, particleMat)
    scene.add(particles)

    // --- Pointer parallax + drag-to-spin with inertia ---
    let mouseX = 0
    let mouseY = 0
    let parallaxX = 0
    let parallaxY = 0

    let dragging = false
    let lastPointerX = 0
    let lastPointerY = 0
    let dragVelX = 0
    let dragVelY = 0
    let spinX = 0
    let spinY = 0

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1
      mouseY = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('mousemove', onMouseMove)

    const onPointerDown = (e: PointerEvent) => {
      dragging = true
      lastPointerX = e.clientX
      lastPointerY = e.clientY
      renderer.domElement.style.cursor = 'grabbing'
    }
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return
      const dx = e.clientX - lastPointerX
      const dy = e.clientY - lastPointerY
      lastPointerX = e.clientX
      lastPointerY = e.clientY
      dragVelX = dx * 0.005
      dragVelY = dy * 0.005
      spinY += dragVelX
      spinX += dragVelY
    }
    const endDrag = () => {
      dragging = false
      renderer.domElement.style.cursor = 'grab'
    }
    renderer.domElement.style.cursor = 'grab'
    renderer.domElement.style.touchAction = 'none'
    renderer.domElement.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', endDrag)
    window.addEventListener('pointerleave', endDrag)

    let frameId = 0
    let visible = true
    const startTime = performance.now()
    const drift = prefersReducedMotion() ? 0 : 1

    const animate = () => {
      if (!visible) {
        frameId = 0
        return
      }
      const elapsed = ((performance.now() - startTime) / 1000) * drift

      parallaxX += (mouseX * 0.6 - parallaxX) * 0.03
      parallaxY += (mouseY * 0.4 - parallaxY) * 0.03

      if (!dragging) {
        dragVelX *= 0.94
        dragVelY *= 0.94
        spinY += dragVelX
        spinX += dragVelY
      }

      group.rotation.y = elapsed * 0.12 + parallaxX + spinY
      group.rotation.x = elapsed * 0.05 + parallaxY + spinX
      points.rotation.y = -elapsed * 0.06

      particles.rotation.y = elapsed * 0.015
      particles.rotation.x = elapsed * 0.008

      renderer.render(scene, camera)
      frameId = requestAnimationFrame(animate)
    }
    animate()

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && !frameId) animate()
    })
    io.observe(mount)

    // Keep the sketch clear of the headline: right-hand side on desktop, small and high on phones.
    const place = () => {
      const w = mount.clientWidth
      if (w >= 1024) {
        group.position.set(2.6, 0.1, 0)
        group.scale.setScalar(1)
      } else if (w >= 640) {
        group.position.set(1.6, 0.6, 0)
        group.scale.setScalar(0.85)
      } else {
        group.position.set(0.9, 1.9, 0)
        group.scale.setScalar(0.62)
      }
    }
    place()

    const onResize = () => {
      if (!mount) return
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
      place()
    }
    window.addEventListener('resize', onResize)

    const onTheme = () => {
      coreMat.color.set(cssVar('--color-accent'))
      fillMat.color.set(cssVar('--color-accent-2'))
      pointsMat.color.set(cssVar('--color-ink'))
      particleMat.color.set(cssVar('--color-muted'))
      if (!frameId) renderer.render(scene, camera)
    }
    window.addEventListener('themechange', onTheme)

    return () => {
      cancelAnimationFrame(frameId)
      io.disconnect()
      window.removeEventListener('resize', onResize)
      window.removeEventListener('themechange', onTheme)
      window.removeEventListener('mousemove', onMouseMove)
      renderer.domElement.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', endDrag)
      window.removeEventListener('pointerleave', endDrag)
      mount.removeChild(renderer.domElement)
      coreGeo.dispose()
      coreMat.dispose()
      fillGeo.dispose()
      fillMat.dispose()
      pointsGeo.dispose()
      pointsMat.dispose()
      particleGeo.dispose()
      particleMat.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      data-cursor="link"
      data-cursor-text="DRAG"
      className="pointer-events-auto absolute inset-0"
    />
  )
}

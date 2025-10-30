import { onMounted, onUnmounted, ref } from 'vue'
import { throttle } from 'lodash'
import { storeToRefs } from 'pinia'
import { useSlidesStore } from '@/store'
import { KEYS } from '@/configs/hotkey'
import { ANIMATION_CLASS_PREFIX } from '@/configs/animation'
import message from '@/utils/message'

export default () => {
  const slidesStore = useSlidesStore()
  const { slides, slideIndex, formatedAnimations } = storeToRefs(slidesStore)

  // Current element animation execution position on the current slide
  const animationIndex = ref(0)

  // Animation execution status
  const inAnimation = ref(false)

  // Minimum played slide index
  const playedSlidesMinIndex = ref(slideIndex.value)

  // Execute element animations
  const runAnimation = () => {
    // Prevent new animations from starting if one is already running
    if (inAnimation.value) return

    const { animations, autoNext } = formatedAnimations.value[animationIndex.value]
    animationIndex.value += 1

    // Mark animation as started
    inAnimation.value = true

    let endAnimationCount = 0

    // Execute all animations at this position sequentially
    for (const animation of animations) {
      const elRef: HTMLElement | null = document.querySelector(`#screen-element-${animation.elId} [class^=base-element-]`)
      if (!elRef) {
        endAnimationCount += 1
        continue
      }

      const animationName = `${ANIMATION_CLASS_PREFIX}${animation.effect}`
      
      // Remove previous animation state (if any) before running a new animation
      elRef.style.removeProperty('--animate-duration')
      for (const classname of elRef.classList) {
        if (classname.indexOf(ANIMATION_CLASS_PREFIX) !== -1) elRef.classList.remove(classname, `${ANIMATION_CLASS_PREFIX}animated`)
      }
      
      // Run the animation
      elRef.style.setProperty('--animate-duration', `${animation.duration}ms`)
      elRef.classList.add(animationName, `${ANIMATION_CLASS_PREFIX}animated`)

      // After animation ends, remove state for non-"exit" animations
      const handleAnimationEnd = () => {
        if (animation.type !== 'out') {
          elRef.style.removeProperty('--animate-duration')
          elRef.classList.remove(animationName, `${ANIMATION_CLASS_PREFIX}animated`)
        }

        // When all animations at this position are finished, mark animation as done and continue if needed
        endAnimationCount += 1
        if (endAnimationCount === animations.length) {
          inAnimation.value = false
          if (autoNext) runAnimation()
        }
      }
      elRef.addEventListener('animationend', handleAnimationEnd, { once: true })
    }
  }

  onMounted(() => {
    const firstAnimations = formatedAnimations.value[0]
    if (firstAnimations && firstAnimations.animations.length) {
      const autoExecFirstAnimations = firstAnimations.animations.every(item => item.trigger === 'auto' || item.trigger === 'meantime')
      if (autoExecFirstAnimations) runAnimation()
    }
  })

  // Revoke element animation: not only move the index backward but also clear animation state
  const revokeAnimation = () => {
    animationIndex.value -= 1
    const { animations } = formatedAnimations.value[animationIndex.value]

    for (const animation of animations) {
      const elRef: HTMLElement | null = document.querySelector(`#screen-element-${animation.elId} [class^=base-element-]`)
      if (!elRef) continue
      
      elRef.style.removeProperty('--animate-duration')
      for (const classname of elRef.classList) {
        if (classname.indexOf(ANIMATION_CLASS_PREFIX) !== -1) elRef.classList.remove(classname, `${ANIMATION_CLASS_PREFIX}animated`)
      }
    }

    // If only "attention" animations exist at this position when revoking, execute revoke again
    if (animations.every(item => item.type === 'attention')) execPrev()
  }

  // Stop autoplay
  const autoPlayTimer = ref(0)
  const closeAutoPlay = () => {
    if (autoPlayTimer.value) {
      clearInterval(autoPlayTimer.value)
      autoPlayTimer.value = 0
    }
  }
  onUnmounted(closeAutoPlay)

  // Loop playback
  const loopPlay = ref(false)
  const setLoopPlay = (loop: boolean) => {
    loopPlay.value = loop
  }

  const throttleMassage = throttle(function(msg) {
    message.success(msg)
  }, 1000, { leading: true, trailing: false })

  // Play previous/next
  // When encountering element animations, prioritize running the animation; if none, turn slides
  // When going backward and encountering an animation, only revoke to the state before animation; do not reverse play the animation
  // When returning to the previous slide, if the slide has never played (no animation state), set animation index to minimum (initial state); otherwise, set to maximum (final state)
  const execPrev = () => {
    if (formatedAnimations.value.length && animationIndex.value > 0) {
      revokeAnimation()
    }
    else if (slideIndex.value > 0) {
      slidesStore.updateSlideIndex(slideIndex.value - 1)
      if (slideIndex.value < playedSlidesMinIndex.value) {
        animationIndex.value = 0
        playedSlidesMinIndex.value = slideIndex.value
      }
      else animationIndex.value = formatedAnimations.value.length
    }
    else {
      if (loopPlay.value) turnSlideToIndex(slides.value.length - 1)
      else throttleMassage('Already the first slide')
    }
    inAnimation.value = false
  }
  const execNext = () => {
    if (formatedAnimations.value.length && animationIndex.value < formatedAnimations.value.length) {
      runAnimation()
    }
    else if (slideIndex.value < slides.value.length - 1) {
      slidesStore.updateSlideIndex(slideIndex.value + 1)
      animationIndex.value = 0
      inAnimation.value = false
    }
    else {
      if (loopPlay.value) turnSlideToIndex(0)
      else {
        throttleMassage('Already the last slide')
        closeAutoPlay()
      }
      inAnimation.value = false
    }
  }

  // Autoplay
  const autoPlayInterval = ref(2500)
  const autoPlay = () => {
    closeAutoPlay()
    message.success('Autoplay started')
    autoPlayTimer.value = setInterval(execNext, autoPlayInterval.value)
  }

  const setAutoPlayInterval = (interval: number) => {
    closeAutoPlay()
    autoPlayInterval.value = interval
    autoPlay()
  }

  // Mouse wheel page turning
  const mousewheelListener = throttle(function(e: WheelEvent) {
    if (e.deltaY < 0) execPrev()
    else if (e.deltaY > 0) execNext()
  }, 500, { leading: true, trailing: false })

  // Touchscreen swipe up/down page turning
  const touchInfo = ref<{ x: number; y: number; } | null>(null)

  const touchStartListener = (e: TouchEvent) => {
    touchInfo.value = {
      x: e.changedTouches[0].pageX,
      y: e.changedTouches[0].pageY,
    }
  }
  const touchEndListener = (e: TouchEvent) => {
    if (!touchInfo.value) return

    const offsetX = Math.abs(touchInfo.value.x - e.changedTouches[0].pageX)
    const offsetY = e.changedTouches[0].pageY - touchInfo.value.y

    if ( Math.abs(offsetY) > offsetX && Math.abs(offsetY) > 50 ) {
      touchInfo.value = null

      if (offsetY > 0) execPrev()
      else execNext()
    }
  }

  // Keyboard shortcut page turning
  const keydownListener = (e: KeyboardEvent) => {
    const key = e.key.toUpperCase()

    if (key === KEYS.UP || key === KEYS.LEFT || key === KEYS.PAGEUP) execPrev()
    else if (
      key === KEYS.DOWN || 
      key === KEYS.RIGHT ||
      key === KEYS.SPACE || 
      key === KEYS.ENTER ||
      key === KEYS.PAGEDOWN
    ) execNext()
  }

  onMounted(() => document.addEventListener('keydown', keydownListener))
  onUnmounted(() => document.removeEventListener('keydown', keydownListener))

  // Switch to previous/next slide (ignoring element entrance animations)
  const turnPrevSlide = () => {
    slidesStore.updateSlideIndex(slideIndex.value - 1)
    animationIndex.value = 0
  }
  const turnNextSlide = () => {
    slidesStore.updateSlideIndex(slideIndex.value + 1)
    animationIndex.value = 0
  }

  // Switch to a slide by index or ID
  const turnSlideToIndex = (index: number) => {
    slidesStore.updateSlideIndex(index)
    animationIndex.value = 0
  }
  const turnSlideToId = (id: string) => {
    const index = slides.value.findIndex(slide => slide.id === id)
    if (index !== -1) {
      slidesStore.updateSlideIndex(index)
      animationIndex.value = 0
    }
  }

  return {
    autoPlayTimer,
    autoPlayInterval,
    setAutoPlayInterval,
    autoPlay,
    closeAutoPlay,
    loopPlay,
    setLoopPlay,
    mousewheelListener,
    touchStartListener,
    touchEndListener,
    turnPrevSlide,
    turnNextSlide,
    turnSlideToIndex,
    turnSlideToId,
    execPrev,
    execNext,
    animationIndex,
  }
}

export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    onNuxtReady(() => { window._replayEvents?.() })
  }

  if (import.meta.server) {
    useHead({
      script: [
        {
          tagPosition: 'bodyOpen',
          tagPriority: -20,
          innerHTML: `(${registerReplay.toString()})()`
        }
      ]
    })
  }
})

function registerReplay () {
  const events: Event[] = []
  const capture = (e: Event) => {
    if (e.target?.value) {
      e._value = e.target.value
    }
    events.push(e)
  }
  const types = [
    'abort', 'animationcancel', 'animationend', 'animationiteration', 'animationstart', 'auxclick', 'beforeinput', 'beforetoggle', 'blur', 'cancel', 'canplay', 'canplaythrough', 'change', 'click', 'close', 'compositionend', 'compositionstart', 'compositionupdate', 'contextmenu', 'copy', 'cuechange', 'cut', 'dblclick', 'drag', 'dragend', 'dragenter', 'dragleave', 'dragover', 'dragstart', 'drop', 'durationchange', 'emptied', 'ended', 'error', 'focus', 'focusin', 'focusout', 'formdata', 'gotpointercapture', 'input', 'invalid', 'keydown', 'keypress', 'keyup', /* 'load', */ 'loadeddata', 'loadedmetadata', 'loadstart', 'lostpointercapture', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'paste', 'pause', 'play', 'playing', 'pointercancel', 'pointerdown', 'pointerenter', 'pointerleave', 'pointermove', 'pointerout', 'pointerover', 'pointerup', 'progress', 'ratechange', 'reset', 'resize', 'scroll', 'scrollend', 'securitypolicyviolation', 'seeked', 'seeking', 'select', 'selectionchange', 'selectstart', 'slotchange', 'stalled', 'submit', 'suspend', 'timeupdate', 'toggle', 'touchcancel', 'touchend', 'touchmove', 'touchstart', 'transitioncancel', 'transitionend', 'transitionrun', 'transitionstart', 'volumechange', 'waiting', 'webkitanimationend', 'webkitanimationiteration', 'webkitanimationstart', 'webkittransitionend', 'wheel',
  ] as const
  globalThis._replayEvents = function () {
    for (const t of types) {
      removeEventListener(t, capture)
    }
    for (const event of events) {
      if (event._value) {
        event.target!.value = event._value
      }
      (event.target || globalThis).dispatchEvent(event)
    }
  }
  for (const t of types) {
    addEventListener(t, capture)
  }
}

declare global {
  // eslint-disable-next-line
  var _replayEvents: () => void
}

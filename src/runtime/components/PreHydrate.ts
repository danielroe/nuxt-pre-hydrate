import { createStaticVNode, defineComponent } from 'vue'
import { useHead } from '#imports'

const SERVER_HELPER = createStaticVNode(`<script>__PREHYDRATE()</script>`, 1)

export default defineComponent({
  name: 'PreHydrate',
  inheritAttrs: false,
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    strategyName: {
      type: String,
      required: true
    },
    renderContent: {
      type: Function,
      required: true
    }
  },
  setup(props, { slots, attrs }) {
    if (process.server) {
      useHead({
        script: [
          {
            key: 'prehydrate-helper',
            innerHTML: `
              window.__PREHYDRATE = () => {
                document.querySelectorAll('[data-pre-hydratable]').forEach(el => {
                  const runner = window.__PREHYDRATE[el.dataset.preHydratable];
                  el.removeAttribute('data-pre-hydratable');
                  el.innerHTML = runner(el.dataset);
                })
              }`.replace(/\s+/g, ' ')
          },
          {
            key: 'strategy',
            innerHTML:
              `window.__PREHYDRATE['${props.strategyName}'] = ${props.renderContent.toString()};`
          }
        ]
      })
    }

    return () => {
      const vnodes = slots.default?.()

      if (process.client || !vnodes || !vnodes.length) return h(props.tag, vnodes)

      const renderedAttrs: Record<string, any> = {
        'data-pre-hydratable': props.strategyName
      }

      for (const prop in renderedAttrs) {
        renderedAttrs[`data-${prop}`] = attrs[prop]
      }

      return h(props.tag, renderedAttrs, [
        vnodes,
        SERVER_HELPER
      ])
    }
  }
})

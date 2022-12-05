<script setup>
import Hammer from 'hammerjs';
import {computed, ref, onMounted, defineAsyncComponent, watch} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import debounce from 'lodash/debounce';
import PageWrapper from './PageWrapper.vue'

const props = defineProps({order: Array}),
    router = useRouter(),
    route = useRoute();
const isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;

let prefersReducedMotion = ref(false),
    currentIndex = ref(0),
    upcomingIndex = ref(0),
    translateX = ref(0),
    maxTranslateX = ref(0),
    transformStyle = ref("translateX(0)"),
    transitionClass = ref("transition-initial"),
    isTransitioning = ref(false),
    leftEdgeScale = ref(0),
    rightEdgeScale = ref(0);


function updateCurrentIndex() {
  let name = route.name.substring(4); // delete ege- prefix
  currentIndex.value = props.order.indexOf(name)
  if (currentIndex.value === -1) currentIndex.value = 0;
}

watch(() => route.fullPath, updateCurrentIndex)

let infoItems = computed(() => {
  let arr = [...props.order];
  if (arr.length === 2) {
    arr = [...arr, ...arr];
  }

  return arr.map((id, index) => ({id, index}));
})

let renderedItems = computed(() => {
  if (infoItems.value.length === 1) {
    return [infoItems.value[0]];
  }

  let i = currentIndex.value;
  const lastIndex = infoItems.value.length - 1;
  const prevIndex = i === 0 ? lastIndex : i - 1;
  const nextIndex = i === lastIndex ? 0 : i + 1;

  return [infoItems.value[prevIndex], infoItems.value[i], infoItems.value[nextIndex]];
})

let isNextAvailable = computed(() => {
  return currentIndex.value < props.order.length - 1;
})

let isPreviousAvailable = computed(() => {
  return currentIndex.value > 0
})

onMounted(() => {
  updateCurrentIndex()

  if (!isMobile) {
    return;
  }

  const touchContainer = document.getElementById('app');
  const hammer = new Hammer.Manager(touchContainer, {
    recognizers: [
      [Hammer.Pan, {direction: Hammer.DIRECTION_HORIZONTAL}],
      [Hammer.Swipe, {direction: Hammer.DIRECTION_HORIZONTAL}]
    ],
    // cssProps: {
    //   userSelect: 'auto',
    // }
  });
  hammer.on("pan swipe", handleTouchEvents);

  const itemsContainer = document.getElementById("rendered-items-flexbox");

  itemsContainer.addEventListener("transitionstart", (e) => {
    if (e.target === itemsContainer) {
      isTransitioning.value = true;
    }
  });
  itemsContainer.addEventListener("transitionend", (e) => {
    if (e.target === itemsContainer) {
      updateCurrentItem();
    }
  });

  prefersReducedMotion.value = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
  ).matches;
})

function handleTouchEvents(e) {
  const {deltaX, deltaY, isFinal} = e;

  if (isTransitioning.value) {
    return;
  }

  // Don't respond to gestures that are more vertical than horizontal
  // (browser will handle vertical scroll)
  // Unless the gesture started horizontal, then respond as normal
  if (
      (Math.abs(deltaX) < 8 || Math.abs(deltaY) - Math.abs(deltaX) > -1) &&
      !translateX.value &&
      !leftEdgeScale.value &&
      !rightEdgeScale.value
  ) {
    return;
  }

  if (
      (!isPreviousAvailable.value && deltaX > 0) ||
      (!isNextAvailable.value && deltaX < 0)
  ) {
    updateEdgeEffect(deltaX, isFinal);
  } else if (isFinal) {
    handleGestureEnd(deltaX);
  } else {
    handleGestureMove(deltaX);
  }
}

function handleGestureMove(deltaX) {
  // Record farthest distance in one direction so can check if gesture goes in
  // opposite direction, indicating user doesn't want to change slides
  if (Math.abs(deltaX) > Math.abs(maxTranslateX.value)) {
    maxTranslateX.value = deltaX;
  }

  translateX.value = deltaX;
  transitionClass.value = "transition-initial";
  transformStyle.value = `translateX(${deltaX}px)`;
}

function handleGestureEnd() {
  if (Math.abs(translateX.value) - Math.abs(maxTranslateX.value) < -1 || Math.abs(maxTranslateX.value) < 60) {
    // If gesture goes too much in opposite direction, stay on current slide
    transitionClass.value = 'transition-item';
    transformStyle.value = 'translateX(0)';
  } else if (translateX.value > 0) {
    previous();
  } else if (translateX.value < 0) {
    next();
  }
}

function updateEdgeEffect(deltaX = 0, isFinal = false) {
  if (isFinal) {
    transitionClass.value = "transition-edge";
    leftEdgeScale.value = 0;
    rightEdgeScale.value = 0;
  } else {
    transitionClass.value = "transition-initial";
    const scaleVal = Math.min(0.2 + Math.abs(deltaX) / 50, 1);
    if (deltaX > 0) {
      leftEdgeScale.value = scaleVal;
    }
    if (deltaX < 0) {
      rightEdgeScale.value = scaleVal;
    }
  }
}


let previous = debounce(
    function () {
      if (isTransitioning.value) {
        return;
      }

      if (!isPreviousAvailable.value) {
        updateEdgeEffect(100, false);
        setTimeout(() => {
          updateEdgeEffect(0, true);
        }, 100);
        return;
      }

      transitionClass.value = "transition-item";
      transformStyle.value = "translateX(100vw)";

      upcomingIndex.value = currentIndex.value === 0 ? props.order.length - 1 : currentIndex.value - 1;

      if (prefersReducedMotion.value) {
        updateCurrentItem();
      }
    },
    100,
    {leading: true, trailing: false}
)

let next = debounce(
    function () {
      if (isTransitioning.value) {
        return;
      }

      if (!isNextAvailable.value) {
        updateEdgeEffect(-100, false);
        setTimeout(() => {
          updateEdgeEffect(0, true);
        }, 100);
        return;
      }

      transitionClass.value = "transition-item";
      transformStyle.value = "translateX(-100vw)";

      upcomingIndex.value = currentIndex.value === props.order.length - 1 ? 0 : currentIndex.value + 1;

      if (prefersReducedMotion.value) {
        updateCurrentItem();
      }
    },
    100,
    {leading: true, trailing: false}
)

function updateCurrentItem() {
  currentIndex.value = upcomingIndex.value;
  router.push(props.order[currentIndex.value]);
  resetTranslate();
}

function resetTranslate() {
  isTransitioning.value = false;
  transitionClass.value = "transition-initial";
  transformStyle.value = "translateX(0)";
  translateX.value = 0;
  maxTranslateX.value = 0;
}

let componentGetters = props.order.map(name => computed(() => {
  return defineAsyncComponent(() => import(`../pages/${name}.md`));
}))
</script>

<template>
  <div id="rendered-items-flexbox" :class="transitionClass" :style="{transform: transformStyle}">
    <div v-for="item in renderedItems" :id="item.id" :key="item.id" class="rendered-item vertical-scroll">
      <PageWrapper
        :component="componentGetters[item.index].value"
        :next-route="item.index < props.order.length - 1 ? props.order[item.index + 1] : undefined"
      />
    </div>
  </div>

  <div class="touch-tap-left" role="button" aria-label="Previous" tabindex="0" @click="previous"
       @keyup.enter="previous" @keyup.space="previous">

    <!-- left edge animation shape -->
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 10 100" height="100%" width="40px"
         preserveAspectRatio="none" class="left-edge-shape" :class="transitionClass"
         :style="{transform: 'scaleX(' + leftEdgeScale + ')'}">
      <path d="M0,0v100h5.2c3-14.1,4.8-31.4,4.8-50S8.2,14.1,5.2,0H0z"/>
    </svg>
  </div>

  <div class="touch-tap-right" role="button" aria-label="Next" tabindex="0" @click="next" @keyup.enter="next"
       @keyup.space="next">

    <!-- right edge animation shape -->
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 10 100" height="100%" width="40px"
         preserveAspectRatio="none" class="right-edge-shape" :class="transitionClass"
         :style="{transform: 'scaleX(' + rightEdgeScale + ')'}">
      <path d="M10,100V0L4.8,0C1.8,14.1,0,31.4,0,50c0,18.6,1.8,35.9,4.8,50H10z"/>
    </svg>
  </div>
</template>

<style scoped>
#rendered-items-flexbox {
  display: flex;
  justify-content: center;
  height: 100vh;
  align-items: stretch;
  min-height: fit-content;
  width: 100vw;
  box-sizing: border-box;
}

@media (prefers-reduced-motion: reduce) {
  #rendered-items-flexbox {
    transform: none !important;
  }
}

.transition-initial {
  transition: transform 0s ease;
}

.transition-item {
  transition: transform 250ms cubic-bezier(0.0, 0.0, 0.2, 1); /* ease-out timing function */
}

.transition-edge {
  transition: transform 500ms ease-out;
}

.rendered-item {
  height: 100%;
  min-width: 100%;
  width: 100%;
  box-sizing: border-box;
}

.vertical-scroll {
  height: 100%;
  overflow-y: scroll;
  touch-action: pan-y; /* Disables automatic browser control of touches, except vertical scrolling */
}

.end-button {
  margin-top: 2rem;
}

/* ?????????? */
/*.item-content {*/
/*  min-height: 500px;*/
/*  height: 100%;*/
/*  width: 100vw;*/
/*  margin: 0 auto;*/
/*  box-sizing: border-box;*/
/*}*/

.touch-tap-left,
.touch-tap-right {
  /* todo: no event of transition end */
  display: none;

  position: absolute;
  top: 0;
  width: 20%;
  height: 100%;
}

.touch-tap-left {
  left: 0;
}

.touch-tap-right {
  right: 0;
}

.touch-tap-left:focus, .touch-tap-right:focus {
  outline: none;
}

.left-edge-shape, .right-edge-shape {
  position: absolute;
  fill: #000;
  opacity: 0.1;
}

.left-edge-shape {
  left: 0;
  transform-origin: left;
}

.right-edge-shape {
  right: 0;
  transform-origin: right;
}
</style>